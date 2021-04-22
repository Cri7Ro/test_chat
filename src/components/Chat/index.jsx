import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';

const ChatSection = styled.section`
    display: flex;
    margin: 20vh auto 0;
    border: 1px solid red;
    height: 50vh;
    width: 70vw;
    padding: 1.5rem;
`;

const UserList = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 15vw;
`;

const MessagesList = styled.div`
    height: 75%;
    overflow-y: scroll;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    form {
        display: flex;
        flex-direction: column;
        button {
            width: 50px; 
        }
    }
`;

const NewMessage = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 50%;
`;

const MessageContent = styled.div`
    color: white;
    background-color: #630fd7;
    padding: 1rem;
    border-radius: 50px;
`;

const WriteMessage = styled.textarea`
    width: 50vw;
    &:focus {
        outline-color: #0fc9d7;
    }
    font-family: inherit;
    font-weight: bold;
`;

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
            console.log('copied ')
        }, function() {
        });
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
                <a href={`http://localhost:3000/rooms/${roomId}`} onClick={copyLink}>Invited Room</a>
                <i>Online: {users ? users.length : 0}</i>
                <ul>
                    { users && users.map((e, i) => <li key={i.toString()}>{e}</li>) }
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