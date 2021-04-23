import styled from 'styled-components';

export const ChatSection = styled.section `
    display: flex;
    justify-content: flex-start;
    margin: 20vh auto 0;
    border: 1px solid #d4cecd;
    border-radius: 10px;
    height: 50vh;
    width: 50vw;

    @media screen and (max-width: 1151px) {
        width: 90vw;
        height: 100vh;
        justify-content: flex-end;
        flex-direction: column;
        margin: 0 auto 0;
    }
`;

export const RoomActions = styled.div `
    display: flex;
    align-items: center;
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

export const UserList = styled.div `
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
    };

    @media screen and (max-width: 1151px) {
        max-width: 100%;
        max-height: 10rem;
        margin-right: 0;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
        ul {
            display: flex;
            flex-wrap: wrap;
        }
        li {
            margin-right: .5rem;
        }
    }
`;

export const MessagesList = styled.div `
    height: 75%;
    overflow-y: scroll;
`;

export const Messages = styled.div `
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

    @media screen and (max-width: 1151px) {
        flex-grow: 1;
    }
`;

export const NewMessage = styled.div `
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 50%;
    margin-bottom: 1rem;
`;

export const MessageContent = styled.div `
    color: white;
    background-color: #630fd7;
    padding: .5rem;
    border-radius: 15px;
    span {
        font-size: .7rem;
    }
    p {
        margin-bottom: .5rem;
    }
    margin-bottom: .5rem;
`;

export const WriteMessage = styled.textarea `
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

    @media screen and (max-width: 1151px) {
        width: 70vw;
    }
`;