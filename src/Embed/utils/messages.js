export const createBeforeServerMessage = ({
  conversationId,
  attributes = {},
  user_context = {},
  event = {},
  ...rest
}) => ({
  conversation_id: conversationId,
  event,
  user_context: {
    pageURL: window.location.href,
    pageTitle: document.title,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    languages: navigator.languages,
    ...user_context,
  },
  attributes: {
    client_timestamp: Date.now(),
    sentFromWidget: true,
    ...attributes,
  },
  ...rest,
})