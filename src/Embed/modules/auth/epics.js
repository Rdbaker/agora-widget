import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, tap, ignoreElements } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { AuthAPI } from 'api/auth';
import * as AuthActions from './actions';
import { ActionTypes } from './constants';
import { setCookie } from 'shared/helpers';


const login = action$ => action$.pipe(
  ofType(ActionTypes.LOGIN),
  pluck('payload'),
  flatMap(({ username, password }) =>
    from(AuthAPI.login(username, password))
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ token }) => of(AuthActions.loginSuccess({ token }))),
        catchError(err => of(AuthActions.loginFailed({ err }))),
        startWith(AuthActions.loginPending()),
      )
  )
)

const setJWTCookie = action$ => action$.pipe(
  ofType(ActionTypes.LOGIN_SUCCESS),
  pluck('payload'),
  tap(({ token }) => setCookie(token)),
  ignoreElements(),
)


export default combineEpics(
  login,
  setJWTCookie,
)