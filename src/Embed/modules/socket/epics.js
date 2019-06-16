import { Socket } from 'phoenix';

import * as SocketActions from './actions';
import { ActionTypes } from './constants';
import { WS_URL } from 'shared/resources';
import { pluck, filter, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';


const socket = new Socket(`${WS_URL}/socket`);
socket.connect();


const joinChannel = action$ => action$.pipe(
  ofType(ActionTypes.JOIN_CHANNEL),
  pluck('payload'),
  mergeMap(({ channelName }) => {
    //'conversation:1ca66e02-99a0-459c-9936-5393c94b36ce'

    const pushToChannel$ = action$.pipe(
      ofType(ActionTypes.PUSH_TO_CHANNEL),
      pluck('payload'),
      filter(({ channelName: pushChannel }) => pushChannel === channelName)
    );

    const observable = Observable.create(observer => {

      const channel = socket.channel(channelName, {});

      observer.next(SocketActions.joinChannelPending({ channelName }));
      channel.join()
        .receive("ok", () => observer.next(SocketActions.joinChannelSuccess({ channelName })))
        .receive("error", () => observer.next(SocketActions.joinChannelFailed({ channelName })));

      pushToChannel$.subscribe(({ data }) => channel.push(channelName, data));

      channel.onMessage = (event, payload, ref) => {
        console.log(event, payload, ref);
        // observer.next({
        //   event,
        //   payload,
        //   ref,
        // })
        return payload
      };


    });

    return observable;
  }),
)


export default combineEpics(
  joinChannel,
)