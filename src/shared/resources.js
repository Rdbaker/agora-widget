let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://agorachatapi.herokuapp.com',
    API_URL: 'https://agorachatapi.herokuapp.com',
    IFRAME_URL: 'https://js.agorachat.org/embed/index.html',
    WWW_URL: 'https://www.agorachat.org',
    APP_URL: 'https://app.agorachat.org',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://lcl.agorachat.org:4000',
    API_URL: 'http://lcl.agorachat.org:4000',
    IFRAME_URL: 'http://lcl.agorachat.org:9001/index-embed.html',
    WWW_URL: 'https://lcl.agorachat.org:4000',
    APP_URL: 'http://localhost:3000',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const IFRAME_URL = ResourcesConstants.IFRAME_URL
export const APP_URL = ResourcesConstants.APP_URL
export const WWW_URL = ResourcesConstants.WWW_URL
export const WS_URL = ResourcesConstants.WS_URL