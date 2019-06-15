import { IframeViews } from './constants';


const root = state => state.ui || {};

export const uiView = state => root(state).view;
export const uiHidden = state => root(state).hidden;
export const lastSentContainerClass = state => root(state).lastSentContainerClass;
export const showChatButton = state => uiView(state) === IframeViews.CHAT_BUTTON;
export const showSidebar = state => uiView(state) === IframeViews.SIDEBAR;
export const uiType = state => root(state).type;
export const uiMeta = state => root(state).meta;
