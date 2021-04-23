import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';

const ChatSection = styled.section`
    display: flex;
    justify-content: flex-start;
    margin: 20vh auto 0;
    border: 1px solid #d4cecd;
    border-radius: 10px;
    height: 50vh;
    width: 50vw;
`;

const RoomActions = styled.div`
    display: flex;
    align-item: center;
    justify-content: space-between;
    border-bottom: 1px solid #696a6f;
    padding-bottom: .5rem;
    margin-bottom: 1rem;
    color: #0719d1;
    a {
        text-decoration: none;
        color: inherit;
    };
    button {
        color: inherit;
        border: none;
        background-color: #d4cecd;
        font-family: inherit;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
    }
`;

const UserList = styled.div`
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #d4cecd;
    padding: 1.5rem;
    overflow-y: scroll;
    margin-right: 5vw;
    max-width: 25%;
    word-wrap: break-word;
    
    li {
        padding: .5rem;
        margin-top: .5rem;
        background-color: white;
        border-radius: 10px;
    }
 
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
            color: white;
            border: none;
            border-radius: 15px;
            padding: .7rem;
            max-width: 100px; 
            background-color: #2a0ad0;
            font-family: inherit;
            font-weight: bold;
        }
    }
    padding: 1.5rem;
`;

const NewMessage = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 50%;
    margin-bottom: 1rem;
`;

const MessageContent = styled.div`
    color: white;
    background-color: #630fd7;
    padding: 1rem 1rem .5rem;
    border-radius: 15px;
    span {
        font-size: .7rem;
    }
    p {
        margin-bottom: .5rem;
    }
    margin-bottom: .5rem;
`;

const WriteMessage = styled.textarea`
    width: 25vw;
    &:focus {
        outline-color: #2a0ad0;
    }
    font-family: inherit;
    font-weight: bold;
    margin-bottom: .5rem;
    height: 7vh;
    border: 1px solid #d4cecd;
    font-size: 1rem;
    padding: .5rem;
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
                <i>Online (10000): {/*users ? users.length : 0*/}</i>
                <ul>
                    <li>User1tyrtyrtyrttrrtytewtrtrtetwerwerwrere</li>
                    <li>User2</li>
                    <li>User3</li>
                    <li>User4</li>
                    <li>User5</li>
                    <li>User6</li>
                    <li>User7</li>
                    <li>User8</li>
                    <li>User9</li>
                    <li>User10</li>
                    <li>User11</li>
                    <li>User12</li>

                    { /*users && users.map((e, i) => <li key={i.toString()}>{e}</li>) */}
                </ul>
            </UserList>
            <Messages>
                <MessagesList ref={messageRef}>
                <NewMessage>
                                <MessageContent>
                                    <p>ewrwerwerwerrefgergerger rgherh rgher rt rgh erer ertge</p>
                                    <span>9:27</span>
                                </MessageContent>
                                <span>Alex</span>   
                            </NewMessage>
                            <NewMessage >
                                <MessageContent>
                                    <p>Hello</p>
                                    <span>11:55</span>
                                </MessageContent>
                                <span>wpojeewrwerweewr</span>   
                            </NewMessage>
                            <NewMessage >
                                <MessageContent>
                                    <p>Hi</p>
                                    <span>00:55</span>
                                </MessageContent>
                                <span>K</span>   
                            </NewMessage>
                {
                   /*messages && messages.map((e, i) => {
                        return(
                            <NewMessage key={i.toString()}>
                                <MessageContent>
                                    <p>{e.text}</p>
                                    <span>{e.date}</span>
                                </MessageContent>
                                <span>{e.userName}</span>   
                            </NewMessage>
                        );
                    })*/
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