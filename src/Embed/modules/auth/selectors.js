import { ActionTypes } from './constants';


const root = state => state.auth || {};

const jwt = state => root(state).jwt;

export const authError = state => jwt(state).error
export const loginOrSignupFailed = state => [ActionTypes.SIGNUP_FAILED, ActionTypes.LOGIN_FAILED].indexOf(jwt(state).status) !== -1