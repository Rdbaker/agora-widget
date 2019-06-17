import *  as SharedEventTypes from 'shared/eventTypes';
import { ActionTypes } from './constants';


export const fetchCurrentUserSuccess = (data) => ({
  type: SharedEventTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: data,
});

export const fetchCurrentUserFailed = (err) => ({
  type: SharedEventTypes.FETCH_CURRENT_USER_FAILED,
  payload: err,
});

export const bulkGetEndUsersSuccess = data => ({
  type: ActionTypes.BULK_GET_END_USERS_SUCESS,
  payload: data,
});

export const bulkGetEndUsersFailed = err => ({
  type: ActionTypes.BULK_GET_END_USERS_FAILED,
  payload: { err },
});