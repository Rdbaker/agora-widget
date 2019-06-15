const root = state => state.messages

const byConversationIdRoot = state => root(state).byConversationId

export const messagesNeverFetched = (state, conversationId) => !byConversationIdRoot(state)[conversationId]
export const conversationMessages = (state, conversationId) => (byConversationIdRoot(state)[conversationId] || { data: []}).data