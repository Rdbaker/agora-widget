import { ActionTypes } from './constants';


export const login = ({ username, password }) => ({
  type: ActionTypes.LOGIN,
  payload: { username, password }
})

export const loginPending = () => ({
  type: ActionTypes.LOGIN_PENDING,
})

export const loginSuccess = token => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: { token },
})

export const loginFailed = err => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: { err },
})