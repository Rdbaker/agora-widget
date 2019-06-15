import { produce } from 'immer';

import { ActionTypes } from 'modules/messages/constants';


const defaultState = {
  byConversationId: {},
};

const fetchMessagesPending = (newState, { conversationId }) => {
  const alreadyHasMessageInState = !!newState.byConversationId[conversationId];
  if (!alreadyHasMessageInState) {
    newState.byConversationId[conversationId] = {
      status: ActionTypes.FETCH_MESSAGES_PENDING,
      data: [],
    };
  } else {
    newState.byConversationId[conversationId].status = ActionTypes.FETCH_MESSAGES_PENDING;
  }
  return newState;
}

const fetchMessagesSuccess = (newState, { conversationId, messages }) => {
  const conversationMessages = newState.byConversationId[conversationId].data
  newState.byConversationId[conversationId].data = [...conversationMessages, ...messages.reverse()];
  newState.byConversationId[conversationId].status = ActionTypes.FETCH_MESSAGES_SUCCESS;

  return newState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES_PENDING:
      return produce(state, draftState => fetchMessagesPending(draftState, action.payload));
    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return produce(state, draftState => fetchMessagesSuccess(draftState, action.payload));
    default:
      return state;
  }
};