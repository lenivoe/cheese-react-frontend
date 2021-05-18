import './styles/sass/main.sass';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import API from './utils/API';

API.apiConfig.baseURL = 'http://localhost:8081';
API.apiConfig.defaultTimeout = 30000;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
