import styled from 'styled-components';

const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    width: 15vw;
    margin: 20vh auto 0;
    color: white;
    font-family: inherit;
    font-weight: bold;
    font-size: 1rem;
    input {
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        padding: .5rem;
        margin-bottom: .5rem;
        border: none;
        &:focus {
            outline-color: #189806;
        }
    }
    button {
        padding: .5rem;
        border: none;
        background-color: #189806;
        color: inherit;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        cursor: pointer;
    }
    
    @media screen and (max-width: 650px) {
        width: 50vw;
    }
`;

export default StyledForm;