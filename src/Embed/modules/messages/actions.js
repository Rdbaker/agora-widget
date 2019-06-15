import { ActionTypes } from './constants';


export const fetchMessages = ({ conversationId }) => ({
  type: ActionTypes.FETCH_MESSAGES,
  payload: { conversationId },
})

export const fetchMessagesPending = ({ conversationId }) => ({
  type: ActionTypes.FETCH_MESSAGES_PENDING,
  payload: { conversationId },
})

export const fetchMessagesSuccess = ({ conversationId, messages }) => ({
  type: ActionTypes.FETCH_MESSAGES_SUCCESS,
  payload: { conversationId, messages },
})

export const fetchMessagesFailed = ({ conversationId, err }) => ({
  type: ActionTypes.FETCH_MESSAGES_FAILED,
  payload: { conversationId, err },
})
