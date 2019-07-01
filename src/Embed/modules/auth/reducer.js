import produce from 'immer';
import { flatten } from 'ramda';

import { ActionTypes } from 'modules/auth/constants';
import *  as SharedEventTypes from 'shared/eventTypes';


const defaultState = {
  jwt: {
    error: undefined,
    data: undefined,
    status: undefined,
  }
};

const setToken = (newState, token) => {
  newState.jwt.data = token;
  return newState;
}

const loginSuccess = (newState, { token }) => {
  newState.jwt.data = token;
  newState.jwt.status = ActionTypes.LOGIN_SUCCESS;

  return newState;
}

const loginFailed = (newState, { err }) => {
  newState.jwt.status = ActionTypes.LOGIN_FAILED;
  if (typeof err === 'object') {
    const errors = flatten(
      Object
        .entries(err.errors)
        .map(([ field, errorList ]) => errorList.map(error => `${field} ${error}`))
    );
    newState.jwt.error = errors;
  } else {
    newState.jwt.error = err;
  }
}


const signupFailed = (newState, { err }) => {
  newState.jwt.status = ActionTypes.SIGNUP_FAILED;
  if (typeof err === 'object') {
    const errors = flatten(
      Object
        .entries(err.errors)
        .map(([ field, errorList ]) => errorList.map(error => `${field} ${error}`))
    );
    newState.jwt.error = errors;
  } else {
    newState.jwt.error = err;
  }
}

const signupSuccess = (newState, { token }) => {
  newState.jwt.data = token;
  newState.jwt.status = ActionTypes.SIGNUP_SUCCESS;

  return newState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SharedEventTypes.GET_CURRENT_USER_VIA_JWT:
    case ActionTypes.SET_TOKEN:
      return produce(state, draftState => setToken(draftState, action.payload));
    case ActionTypes.LOGIN_SUCCESS:
      return produce(state, draftState => loginSuccess(draftState, action.payload));
    case ActionTypes.LOGIN_FAILED:
      return produce(state, draftState => loginFailed(draftState, action.payload))
    case ActionTypes.SIGNUP_SUCCESS:
      return produce(state, draftState => signupSuccess(draftState, action.payload))
    case ActionTypes.SIGNUP_FAILED:
      return produce(state, draftState => signupFailed(draftState, action.payload))
    default:
      return state;
  }
};