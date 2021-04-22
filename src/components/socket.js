import io from 'socket.io-client';

const socket = io("http://my-test-chat-task.herokuapp.com", { transports: ['websocket'] });

export default socket;