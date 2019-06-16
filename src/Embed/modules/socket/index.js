import { Socket } from 'phoenix';

let socket = new Socket('ws://lcl.agora.co:4000/socket');

socket.connect();

let channel = socket.channel('conversation:1ca66e02-99a0-459c-9936-5393c94b36ce', {});
channel.join()
  .receive("ok", res => console.log('joined success', res))
  .receive("error", res => console.log('joined failed', res));
console.log(socket);
console.log(channel);