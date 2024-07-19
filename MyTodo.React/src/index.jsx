// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './redux/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
