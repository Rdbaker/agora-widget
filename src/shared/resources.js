let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://lcl.agora.co:4000',
    API_URL: 'https://api.weasl.in',
    IFRAME_URL: 'https://js.weasl.in/embed/index.html',
    WWW_URL: 'https://www.weasl.in',
    APP_URL: 'https://app.weasl.in',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://lcl.agora.co:4000',
    API_URL: 'http://lcl.agora.co:4000',
    IFRAME_URL: 'http://lcl.agora.co:9001/index-embed.html',
    WWW_URL: 'https://lcl.agora.in:4000',
    APP_URL: 'http://localhost:3000',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const IFRAME_URL = ResourcesConstants.IFRAME_URL
export const APP_URL = ResourcesConstants.APP_URL
export const WWW_URL = ResourcesConstants.WWW_URL
export const WS_URL = ResourcesConstants.WS_URL