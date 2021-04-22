import React, {useEffect, useState} from 'react';
import SignIn from './components/SignIn';
import socket from './components/socket';
import Chat from './components/Chat';

function App() {
  // вошли/не вошли в комнату
  const [isLogin, setIsLogin] = useState(false);
  // id комнаты
  const [roomId, setRoomId] = useState(null);
  // имя вошедшего пользователя
  const [userName, setUserName] = useState(null);
  // все пользователи в комнате
  const [users, setUsers] = useState([]);
  // все сообщения в комнате
  const [messages, setMessages] = useState([]);

  // выполняется после успешного выполнения post запроса из компонениа SignIn
  // устанавливает состояниям roomId и userName значения соответствуюших полей из SignIn для передачи в чат 
  const onLogin = (obj) => {
    setIsLogin(true); 
    setRoomId(obj.roomId);
    setUserName(obj.userName);
    // подключаемся к комнате roomId и запоминаем на сервере что userName находится в комнате roomId
    socket.emit('room login', obj);
  };

  useEffect(() => {
    // получаем текущих онлайн пользователей и сообщения этой комнаты
    socket.on('room logined', ({users, messages}) => {
      setUsers(users);
      setMessages(messages);
    });

    // добавляем обработчик новых сообщений и добавляем их ко всем сообщениям комнаты
    socket.on('room newMessage', message => {
      setMessages(prev => [...prev, message])
    });
  }, []);
  
  // рендерим вход или чат в зависмотсти от того вошел или не вошел user
  return (
    <div className="App">
      {!isLogin ? <SignIn onLogin={onLogin}/> : <Chat users={users} messages={messages} userName={userName} roomId={roomId}/>}
    </div>
  );
}

export default App;
