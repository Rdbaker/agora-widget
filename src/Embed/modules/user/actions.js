import *  as SharedEventTypes from 'shared/eventTypes';


export const fetchCurrentUserSuccess = (data) => ({
  type: SharedEventTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: data,
});

export const fetchCurrentUserFailed = (err) => ({
  type: SharedEventTypes.FETCH_CURRENT_USER_FAILED,
  payload: err,
});

