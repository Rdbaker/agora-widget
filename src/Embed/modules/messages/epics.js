import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { path } from 'ramda';

import { MessagesAPI } from 'api/messages';
import * as MessageActions from './actions';
import { ActionTypes } from './constants';
import { createBeforeServerMessage } from 'utils/messages';


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


const sendMessage = (action$, store$) => action$.pipe(
  ofType(ActionTypes.SEND_MESSAGE),
  pluck('payload'),
  map(msg => createBeforeServerMessage(msg, store$.value.shim.userContext)),
  flatMap((message) =>
    from(MessagesAPI.sendMessage(message.conversation_id, message, path(['auth', 'jwt', 'data'], store$.value)))
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(MessageActions.sendMessageSuccess({ conversationId: message.conversation_id, message: data }))),
        catchError(err => of(MessageActions.sendMessageFailed({ conversationId: message.conversation_id, err, message }))),
        startWith(MessageActions.sendMessagePending({ conversationId: message.conversation_id, message })),
      )
  )
)


export default combineEpics(
  fetchMessages,
  sendMessage,
)