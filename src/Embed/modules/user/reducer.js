import produce from 'immer';
import { merge } from 'ramda';

import *  as SharedEventTypes from 'shared/eventTypes';
import { ActionTypes } from './constants';


const defaultState = {
  currentUser: {
    data: null,
    status: null,
    lastFetched: null,
  },
  byId: {},
};

const receiveBulkUsers = (newState, users) => {
  users.forEach(user => {
    newState.byId[user.id] = user;
  });
  return newState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SharedEventTypes.GET_CURRENT_USER_VIA_JWT:
      return merge(
        state,
        { currentUser: merge(state.currentUser, { status: action.type, lastFetched: Date.now() })}
      );
    case SharedEventTypes.FETCH_CURRENT_USER_FAILED:
      return merge(
        state,
        { currentUser: merge(state.currentUser, { status: action.type })}
      );
    case SharedEventTypes.FETCH_CURRENT_USER_SUCCESS:
      return merge(
        state,
        { currentUser: merge(state.currentUser, { status: action.type, data: action.payload })},
      );
    case ActionTypes.BULK_GET_END_USERS_SUCESS:
      return produce(state, draftState => receiveBulkUsers(draftState, action.payload));
    default:
      return state;
  }
};