import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addAction} from './actions/counter_action'
import {loadPostsAction} from './actions/post_action'
import store from './store'
import {Provider} from 'react-redux'


ReactDOM.render(
    // 通过Proveder把redux和react建立连接，将store传递到react项目中
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
