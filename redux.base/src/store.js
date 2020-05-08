import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers/index'

// 创建一个storage storage 接收一个参数，reducer
const store = createStore(
    rootReducers,
    // counterReducer,
    compose(
        applyMiddleware(...[thunk,]),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)

export default store