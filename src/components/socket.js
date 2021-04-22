import io from 'socket.io-client';

const socket = io("http://my-test-chat-task.herokuapp", { transports: ['websocket'] });

export default socket;