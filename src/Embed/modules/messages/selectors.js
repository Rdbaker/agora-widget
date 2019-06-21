const root = state => state.messages

const byConversationIdRoot = state => root(state).idsByConversationId
const byIdRoot = state => root(state).byId

export const messagesNeverFetched = (state, conversationId) => !byConversationIdRoot(state)[conversationId]
export const conversationMessageIds = (state, conversationId) => [...(byConversationIdRoot(state)[conversationId] || { data: new Set()}).data]

export const getMessage = (state, messageId) => byIdRoot(state)[messageId];