import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import * as SocketActions from 'modules/socket/actions';
import * as UIActions from 'modules/ui/actions';
import { IframeViews } from 'modules/ui/constants';
import * as OrgActions from 'modules/org/actions';
import { ActionTypes as OrgActionTypes } from 'modules/org/constants';
import * as ShimActions from 'modules/shim/actions';
import *  as SharedEventTypes from 'shared/eventTypes';
import { CHAT_BUTTON_CLASSNAME } from 'shared/iframeClasses';
import { getCookie } from 'shared/helpers';


const startWidgetBootstrap = (action$) => action$.pipe(
  ofType(SharedEventTypes.INIT_IFRAME),
  mergeMap(({ payload }) => {
    global.clientId = payload.clientId;
    return [
      OrgActions.fetchPublicOrg({ clientId: payload.clientId }),
      ShimActions.fetchCurrentUser(getCookie()),
    ];
  }),
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
      mergeMap(([{ payload: { conversations } }, _]) => {
        return [
          { type: SharedEventTypes.BOOTSTRAP_DONE },
          UIActions.changeContainerClass(CHAT_BUTTON_CLASSNAME),
          UIActions.setViewAndType({ view: IframeViews.CHAT_BUTTON, type: undefined }),
          SocketActions.joinChannel({ channelName: `conversation:${conversations[0].id}` })
        ];
      })
    );
  }),
)

export default combineEpics(
  startWidgetBootstrap,
  bootstrapping,
)