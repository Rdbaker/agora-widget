import { ofType, combineEpics } from 'redux-observable';
import { flatMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EndUserAPI } from 'api/endUser';
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


export default combineEpics(
  getCurrentUser,
)