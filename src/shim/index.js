import * as EventTypes from 'shared/eventTypes';
import {
  UnmountedError,
  ResponseError,
  DomainVerificationError
} from 'shared/errors';
import { IFRAME_URL } from 'shared/resources';
import {
  TAKEOVER_CLASSNAME,
  INFO_MSG_CLASSNAME,
} from 'shared/iframeClasses';

import './style.css';


const AGORA_WRAPPER_ID = 'agora-container';
const IFRAME_ID = 'agora-iframe-element';


class Agora {

  constructor(onloadFunc = function() {}) {
    this.debugMode = false;
    this.onloadFunc = onloadFunc;
    this.domainAllowed = true; // optimistically assume for now
  }

  // PUBLIC API

  init = (clientId) => {
    this.clientId = clientId;
    this.initializeIframe();
    this.mountIframe();
  }

  getCurrentUser = () => {
    this.ensureAllowed();
    this.ensureMounted()
    const getUserPromise = new Promise((res, rej) => {
      this.onSuccessfulCurrentUserFetch = res
      this.onFailedCurrentUserFetch = rej
    });
    this.iframe.contentWindow.postMessage({type: EventTypes.GET_CURRENT_USER_VIA_JWT}, '*');
    return getUserPromise;
  }

  debug = () => {
    this.ensureAllowed();
    this.debugMode = !this.debugMode
    console.info(`[Agora] debug mode ${this.debugMode ? 'enabled' : 'disabled'}`)
    this.iframe.contentWindow.postMessage({type: EventTypes.SET_DEBUG_MODE, value: this.debugMode}, '*');
  }

  // PRIVATE METHODS

  onChangeContainerClass = (classnames) => {
    this.iframe.className = classnames;
    this.iframe.contentWindow.postMessage({ type: EventTypes.CHANGE_CONTAINER_CLASS_DONE }, '*');
  }

  ensureMounted = () => {
    if (!document.getElementById(IFRAME_ID)) {
      throw new UnmountedError('agora.init needs to be called first')
    }
  }

  ensureAllowed = () => {
    if (!this.domainAllowed) {
      throw new DomainVerificationError(`${window.location.host} is not permitted to use client ID ${this.clientId}`);
    }
  }

  receiveMessage = (event) => {
    if(!!event && !!event.data && !!event.data.type) {
      switch(event.data.type) {
        case EventTypes.CHANGE_CONTAINER_CLASS:
          this.onChangeContainerClass(event.data.value);
          break;
        case EventTypes.FETCH_CURRENT_USER_FAILED:
          const err = typeof event.data.value === 'string' ? new ResponseError('Internal error') : new ResponseError(event.data.value.error_message, event.data.value);
          this.onFailedCurrentUserFetch && this.onFailedCurrentUserFetch(err);
        case EventTypes.FETCH_CURRENT_USER_SUCCESS:
          this.onSuccessfulCurrentUserFetch && this.onSuccessfulCurrentUserFetch(event.data.value);
          if (this.onSuccessfulFlow) this.onSuccessfulFlow(event.data.value);
          break;
        case EventTypes.DOMAIN_NOT_ALLOWED:
          this.handleDomainNotAllowed();
          break;
        case EventTypes.BOOTSTRAP_DONE:
          this.handleBootstrapDone();
          break;
      }
    }
  }

  handleBootstrapDone = () => {
    const agoraApi = window.agora;
    agoraApi.getCurrentUser = this.getCurrentUser;
    agoraApi.debug = this.debug;
    agoraApi._c = window.agora._c;

    this.runPriorCalls();
    window.agora = agoraApi;
  }

  handleDomainNotAllowed = () => {
    this.domainAllowed = false;
  }

  initializeIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      const iframe = document.createElement('iframe');
      iframe.onload = () => {
        this.iframe.contentWindow.postMessage({ type: EventTypes.INIT_IFRAME, value: {
          clientId: this.clientId,
          topHost: window.location.host,
        }}, '*');
      }
      iframe.src = IFRAME_URL
      iframe.id = IFRAME_ID
      iframe.crossorigin = "anonymous"
      this.iframe = iframe
    }
  }

  runPriorCalls = () => {
    const allowedCalls = ['getCurrentUser', 'debug'];
    const priorCalls = (window.agora && window.agora._c && typeof window.agora._c === 'object') ? window.agora._c : [];
    priorCalls.forEach(call => {
      const method = call[0];
      const args = call[1];
      if (allowedCalls.includes(method)) {
        this[method].apply(this, args);
      }
    });
    this.onloadFunc.call(window.agora, window.agora);
    if (this.verifyEmailAfterMount) {
      this.verifyEmailAfterMount = false;
      this.verifyEmailToken();
    }
  }

  mountIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", this.receiveMessage, false);
      const wrapper = document.createElement('div')
      wrapper.id = AGORA_WRAPPER_ID
      wrapper.style = `z-index: ${Number.MAX_SAFE_INTEGER}; width: 0; height: 0; position: relative;`
      wrapper.appendChild(this.iframe)
      document.body.appendChild(wrapper)
    }
  }
}


export default ((window) => {
  const onloadFunc = (window.agora && window.agora.onload && typeof window.agora.onload === 'function') ? window.agora.onload : function(){};
  const initCall = window.agora._c.filter(call => call[0] === 'init')[0];
  const agoraApi = () => {};
  const agora = new Agora(onloadFunc);

  agoraApi.init = agora.init;

  initCall && agoraApi[initCall[0]].apply(agoraApi, initCall[1]);
})(global)