import React, { useEffect, useRef, useState } from 'react';
import {MessageContent, Messages, ChatSection, MessagesList, WriteMessage, NewMessage, RoomActions, UserList} from './ChatStyles';
import socket from '../socket';

const Chat = ({users, messages, userName, roomId}) => {
    // ввод нового сообщения
    const [currMessage, setCurrMessage] = useState('');
    // ссылка на список сообщения для контроля его размера
    const messageRef = useRef(null);

    // отправка сообщения
    function sendMessage(event) {
        event.preventDefault();
        // запоминаем дату отправки 
        let date = new Date();
        // сохраняем новое сообщение с автором и датой на сервере и показывем его всем онлайн пользователям
        socket.emit('room newMessage', {
            text: currMessage,
            userName,
            date: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()} : ${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}` ,
            roomId
        });
        setCurrMessage('');
    };

    // функция копирует текущий url комнаты в буфер обмена для отправки другому человеку для инвайта
    function copyLink(event) {
        event.preventDefault();
        navigator.clipboard.writeText(event.target.href).then(function() {
            alert('room link copied')
        }, function() {
        });
    };

    // перекидываем пользователя на главную
    function handleLeaveClick() {
        window.location = 'https://my-test-chat-task.herokuapp.com/';
    };

    // прм новом сообщении прокручивать список сообщений вниз, чтобы пользоваиели видели последнее полученное/отправленное сообщение
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        };
    });

    // рендер страницы чата
    return (
        <ChatSection>
            <UserList>
                <RoomActions>
                    <a href={window.location.href} onClick={copyLink}>Invited Room</a>
                    <button onClick={handleLeaveClick}>Leave Room</button>
                </RoomActions>
                <i>Online ({users ? users.length : 0}): </i>
                <ul>
                    {users && users.map((e, i) => <li key={i.toString()}>{e}</li>)}
                </ul>
            </UserList>
            <Messages>
                <MessagesList ref={messageRef}>
                {
                   messages && messages.map((e, i) => {
                        return(
                            <NewMessage key={i.toString()}>
                                <MessageContent>
                                    <p>{e.text}</p>
                                    <span>{e.date}</span>
                                </MessageContent>
                                <span>{e.userName}</span>   
                            </NewMessage>
                        );
                    })
                }
                </MessagesList>
                <form>
                    <WriteMessage rows="3" value={currMessage} onChange={e => setCurrMessage(e.target.value)} placeholder='Enter your message'></WriteMessage>
                    <button onClick={sendMessage}>Send</button>
                </form>
            </Messages>
        </ChatSection>
    );
};

export default Chat;