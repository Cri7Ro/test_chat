import React, { useEffect, useState } from 'react';

const SignIn = ({onLogin})  => {
  // имя вошедшего пользователя
  const [userName, setUserName] = useState('');
  // id комнаты
  const [roomId, setRoomId] = useState(0);

  // при монтаже если уже в комнате то берем ее id из url, иначем заходим в комнату со случайным id
  useEffect(() => {
    window.location.href.split('/')[4] ? setRoomId (window.location.href.split('/')[4]) : setRoomId (Math.random().toFixed(32).toString().slice(2));
  }, []);

  function handlSigninClick() {
    if (!userName) {
      return alert ('Input all fields!');
    };
    // отправляем запрос на сервер с текущим roomId (если такой комнаты нет, то создвется новая)
    fetch("https://my-test-chat-task.herokuapp/rooms", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({roomId})
    // выполняется onLogin из компонента App(там же и описание фнкции)
    }).then((res) => onLogin({roomId, userName}));

    // перенапрявляем страницу на url с roomId
    if (!window.location.href.includes('rooms')) window.history.pushState({}, null, window.location.href + 'rooms/' + roomId);
  };

  // рендер формы входа
  return (
    <div>
      <input type="text" placeholder='name' value={userName} onChange={e => setUserName(e.target.value)}/>
      <button onClick={handlSigninClick}>sign in</button>
    </div> 
  );
}
      
export default SignIn;
      