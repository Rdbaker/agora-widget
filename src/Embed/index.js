import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import AgoraEmbed from './AgoraEmbed';

import postMessageMiddleware from 'modules/shim/middleware';

import authReducer from 'modules/auth/reducer';
import orgReducer from 'modules/org/reducer';
import uiReducer from 'modules/ui/reducer';
import shimReducer from 'modules/shim/reducer';
import userReducer from 'modules/user/reducer';
import messageReducer from 'modules/messages/reducer';

import uiEpic from 'modules/ui/epics';
import authEpic from 'modules/auth/epics';
import shimEpic from 'modules/shim/epics';
import orgEpic from 'modules/org/epics';
import messageEpic from 'modules/messages/epics';
import userEpic from 'modules/user/epics';
import socketEpic from 'modules/socket/epics';

import { DEBUG } from 'shared/resources';

document.domain = 'agorachat.org';

library.add(faCheck, faLock);

const mountSentry = () => {
  global.Sentry && global.Sentry.init && global.Sentry.init({ dsn: 'https://97578fdc26a2424083c16574e4d96091@sentry.io/1311809' });
};
setTimeout(mountSentry, 0);

const epicMiddleware = createEpicMiddleware();
const loggingMiddleware = store => next => action => {
  if (DEBUG || store.getState().shim.debug) {
    console.info('[Agora] applying action', action);
  }
  next(action);
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    ui: uiReducer,
    org: orgReducer,
    shim: shimReducer,
    user: userReducer,
    messages: messageReducer,
  }),
  compose(
    applyMiddleware(loggingMiddleware),
    applyMiddleware(epicMiddleware),
    applyMiddleware(postMessageMiddleware),
    // DEBUG && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

if (DEBUG) {
  window.store = store;
}

epicMiddleware.run(
  combineEpics(
    uiEpic,
    shimEpic,
    authEpic,
    orgEpic,
    messageEpic,
    userEpic,
    socketEpic,
  )
)

ReactDOM.render(
  <Provider store={store}>
    <AgoraEmbed />
  </Provider>,
  document.getElementById('app')
);
