const orgRoot = state => state.org || {};
export const getConversations = state => orgRoot(state).conversations || [];
