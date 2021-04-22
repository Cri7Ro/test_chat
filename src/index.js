import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import App from './App';
import {createGlobalStyle} from 'styled-components';

const GlobalFont = createGlobalStyle`
  @font-face {
    src: url(./CirceRounded-Regular.ttf);
    font-family: 'CirceRounded';
    font-weight: normal;
  }
  body {
    width: 100%;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalFont />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

