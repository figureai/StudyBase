
import counterReducer from './counter_reducers'

import postReducer from './post_reducers'

import {combineReducers} from 'redux'

// 通过 combineReducers 把多个 reducer 进行合并
const rootReducers = combineReducers({
    counter: counterReducer,
    post: postReducer
})

export default rootReducers