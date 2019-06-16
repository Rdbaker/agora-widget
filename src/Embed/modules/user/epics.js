import { ofType, combineEpics } from 'redux-observable';
import { flatMap, catchError, mapTo } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EndUserAPI } from 'api/endUser';
import { ActionTypes as AuthActionTypes } from 'modules/auth/constants';
import * as UserActions from 'modules/user/actions';
import *  as SharedEventTypes from 'shared/eventTypes';


const getCurrentUser = action$ => action$.pipe(
  ofType(SharedEventTypes.GET_CURRENT_USER_VIA_JWT),
  flatMap(() =>
    from(EndUserAPI.getMe())
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(UserActions.fetchCurrentUserSuccess(data))),
        catchError(err => of(UserActions.fetchCurrentUserFailed(err))),
      )
  )
);


const getUserAfterLogin = action$ => action$.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.SIGNUP_SUCCESS),
  mapTo({ type: SharedEventTypes.GET_CURRENT_USER_VIA_JWT })
)

export default combineEpics(
  getCurrentUser,
  getUserAfterLogin,
)