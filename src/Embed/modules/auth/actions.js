import { ActionTypes } from './constants';


export const login = ({ username, password }) => ({
  type: ActionTypes.LOGIN,
  payload: { username, password }
});

export const loginPending = () => ({
  type: ActionTypes.LOGIN_PENDING,
});

export const loginSuccess = ({ token }) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: { token },
});

export const loginFailed = ({ err }) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: { err },
});

export const signup = ({ username, password }) => ({
  type: ActionTypes.SIGNUP,
  payload: { username, password },
});

export const signupPending = () => ({
  type: ActionTypes.SIGNUP_PENDING,
});

export const signupSuccess = ({ token }) => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  payload: { token },
});

export const signupFailed = ({ err })=> ({
  type: ActionTypes.SIGNUP_FAILED,
  payload: { err },
})