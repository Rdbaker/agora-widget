import { ActionTypes } from './constants';


export const login = ({ username, password }) => ({
  type: ActionTypes.LOGIN,
  payload: { username, password }
})