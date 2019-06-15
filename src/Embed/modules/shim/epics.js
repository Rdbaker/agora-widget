import { ofType, combineEpics } from 'redux-observable';
import { tap, ignoreElements, flatMap, catchError, mergeMap, first } from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';

import { EndUserAPI } from 'api/endUser';
import * as UserActions from 'modules/user/actions';
import * as UIActions from 'modules/ui/actions';
import { IframeViews } from 'modules/ui/constants';
import * as OrgActions from 'modules/org/actions';
import { ActionTypes as OrgActionTypes } from 'modules/org/constants';
import * as ShimActions from 'modules/shim/actions';
import *  as SharedEventTypes from 'shared/eventTypes';
import { CHAT_BUTTON_CLASSNAME } from 'shared/iframeClasses';


const startWidgetBootstrap = (action$) => action$.pipe(
  ofType(SharedEventTypes.INIT_IFRAME),
  mergeMap(({ payload }) => {
    global.clientId = payload.clientId;
    return [
      OrgActions.fetchPublicOrg({ clientId: payload.clientId }),
      ShimActions.fetchCurrentUser(payload.jwt),
    ];
  }),
);

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

const getCurrentUserDone = action$ => action$.pipe(
  ofType(SharedEventTypes.FETCH_CURRENT_USER_SUCCESS, SharedEventTypes.FETCH_CURRENT_USER_FAILED),
  tap(({ type, payload }) => {
    if (payload instanceof Error) {
      window.parent.postMessage({type, value: String(payload)}, '*')
    } else {
      window.parent.postMessage({type, value: payload}, '*')
    }
  }),
  ignoreElements(),
);

const bootstrapping = action$ => action$.pipe(
  ofType(SharedEventTypes.INIT_IFRAME),
  mergeMap(() => {
    const fetchOrgSuccess = action$.pipe(
      ofType(OrgActionTypes.fetchPublicOrgSuccess),
      first(),
    );

    const getCurrentUserDone$ = action$.pipe(
      ofType(SharedEventTypes.FETCH_CURRENT_USER_SUCCESS, SharedEventTypes.FETCH_CURRENT_USER_FAILED),
      first(),
    );

    return forkJoin([
      fetchOrgSuccess,
      getCurrentUserDone$,
    ])
    .pipe(
      first(),
      mergeMap(() => {
        window.parent.postMessage({ type: SharedEventTypes.BOOTSTRAP_DONE }, '*');
        return [
          UIActions.changeContainerClass(CHAT_BUTTON_CLASSNAME),
          UIActions.setViewAndType({ view: IframeViews.CHAT_BUTTON, type: undefined })
        ];
      })
    );
  }),
)

export default combineEpics(
  startWidgetBootstrap,
  getCurrentUser,
  getCurrentUserDone,
  bootstrapping,
)