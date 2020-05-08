import {getPosts} from '../services/post_api'

const loadPostsAction = async (dispatch)=>{
    const {data} = await getPosts()
    dispatch({
        type: 'LOAD_POSTS',
        payload: data
    })
}

export {
    loadPostsAction
}