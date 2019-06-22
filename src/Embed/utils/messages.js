export const createBeforeServerMessage = ({
  conversationId,
  attributes = {},
  user_context = {},
  event = {},
  ...rest
}, extraUserContext = {}) => ({
  conversation_id: conversationId,
  event,
  user_context: {
    userAgent: navigator.userAgent,
    languages: navigator.languages,
    ...extraUserContext,
    ...user_context,
  },
  attributes: {
    client_timestamp: Date.now(),
    sentFromWidget: true,
    ...attributes,
  },
  ...rest,
})