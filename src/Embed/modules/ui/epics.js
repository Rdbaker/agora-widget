import { combineEpics, ofType } from 'redux-observable';
import { switchMap, mapTo, delay, filter } from 'rxjs/operators';
import { path } from 'ramda';

import * as SharedActionTypes from 'shared/eventTypes';
import * as UIActions from 'modules/ui/actions';


const hideDuringTransitionEpic = (action$, store) => action$.pipe(
  ofType(SharedActionTypes.CHANGE_CONTAINER_CLASS),
  filter(action => path(['value', 'ui', 'lastSentContainerClass'], store) !== action.classnames),
  switchMap(({ classnames }) => ([
    UIActions.hideUI(),
    UIActions.setLastSentContainerClass(classnames),
  ]))
)

const showAfterTransitionEpic = action$ => action$.pipe(
  ofType(SharedActionTypes.CHANGE_CONTAINER_CLASS_DONE),
  delay(120),
  mapTo(UIActions.showUI())
)

export default combineEpics(
  hideDuringTransitionEpic,
  showAfterTransitionEpic,
)