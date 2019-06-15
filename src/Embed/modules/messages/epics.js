import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { MessagesAPI } from 'api/messages';
import * as MessageActions from './actions';
import { ActionTypes } from './constants';


const fetchMessages = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_MESSAGES),
  pluck('payload'),
  flatMap(({ conversationId, before }) =>
    from(MessagesAPI.getConversationMessages(conversationId, before))
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(MessageActions.fetchMessagesSuccess({ conversationId, messages: data }))),
        catchError(err => of(MessageActions.fetchMessagesFailed({ conversationId, err }))),
        startWith(MessageActions.fetchMessagesPending({ conversationId })),
      )
  )
)


export default combineEpics(
  fetchMessages,
)