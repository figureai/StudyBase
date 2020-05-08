import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from './App';
import * as serviceWorker from '../serviceWorker';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {get} from 'axios'
import thunk from 'redux-thunk'
// redux 中三个重要的部分：action reducer action(storage)

// 创建一个 reducer， reducer接收两个参数，state和action
// 如果需要修改reducer的值，需要使用store的dispatch 派发一个action；action接收两个参数，type：区分对store做什么操作，payload：传递的数据
const counterReducer = function(state={count:1}, action) {
    switch(action.type) {
        case 'COUNT_ADD':
            return {...state, count: state.count+1}

        case 'COUNT_REDUCE':
            return {...state, count: state.count-1}
        default:
            return state
    }
}

const postReducer = function(state = {list: [{title: '你好'}]}, action) {
    switch (action.type) {
        case 'LOAD_POSTS':
            return {
                ...state, list: action.payload
            }
        default: 
            return state
    }
}

// 通过 combineReducers 把多个 reducer 进行合并
const rootReducers = combineReducers({
    counter: counterReducer,
    post: postReducer
})

// 创建一个storage storage 接收一个参数，reducer
const store = createStore(
    rootReducers,
    // counterReducer,
    compose(
        applyMiddleware(...[thunk,]),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)


const getPostRequest = ()=>{
    return get('https://jsonplaceholder.typicode.com/posts')
}

store.dispatch(async (dispatch)=>{
    const {data} = await getPostRequest()
    dispatch({
        type: 'LOAD_POSTS',
        payload: {list: data}
    })
})

// store.dispatch({
//     type: 'COUNT_ADD',
//     payload: {}
// })



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
