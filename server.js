const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

// коллекция всех комнат
const rooms = new Map();

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.get('/rooms', (req, res) => {
    res.status();
});

// обработка post запроса (если не найдена комната roomId, то создать её)
app.post('/rooms', (req, res) => {
    const { roomId } = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]));
    };
    res.send();
});

io.on('connection', socket => {
    socket.on('room login', ({ roomId, userName }) => {
        // подключаемся к комнате roomId
        socket.join(roomId);
        // сохраняем пользователя с переданным userName и его socket.id в списке пользователей комнаты roomId
        rooms.get(roomId).get('users').set(socket.id, userName);
        // получаем находящихся онлайн пользователей и сообщения из комнаты roomId
        const users = [...rooms.get(roomId).get('users').values()];
        const messages = rooms.get(roomId).get('messages');
        // передаем онлайн пользователей и собщения комнаты roomId
        io.to(roomId).emit('room logined', { users, messages });
    });

    socket.on('room newMessage', ({ roomId, userName, text, date }) => {
        const messages_obj = {
            userName,
            text,
            date
        };
        // сохраняем новое сообщение в сообщениях комнаты roomId
        rooms.get(roomId).get('messages').push(messages_obj);
        // передаем сообщение в обработчик новых сообщений комнаты roomId
        io.to(roomId).emit('room newMessage', messages_obj);
    });

    socket.on('disconnect', () => {
        // в случае дисконнекта удаляем пользователя из списка онлайн пользователей комнаты roomId
        rooms.forEach((e, roomId) => {
            if (e.get('users').delete(socket.id)) {
                const users = [...e.get('users').values()];
                const messages = e.get('messages');
                socket.to(roomId).emit('room logined', { users, messages });
            };
        });
    });
});

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('server start');
});