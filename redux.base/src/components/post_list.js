import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadPostsAction} from '../actions/post_action'

class post_list extends Component {
    constructor(props) {
        super(props)
        console.log('lch--00--', props)
    }

    componentDidMount() {
        // this.props.dispatch(loadPostsAction)
        this.props.test()
    }

    render() {
        const {list} = this.props.post
        return (
            <div>
                {
                    list.map((item, index)=>{
                        return <li key={index}>{item.title}</li>
                    })
                }  
            </div>
        )
    }
}

// 将 指定 的 store 合并到 props 传给组件
const mapStateToProps = (state, ownProps) => {
    return {
        post: state.postReducer
    }
} 

// 将 指定的 dispatch 合并到 props 传给组件
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        test: ()=>{
            dispatch(loadPostsAction)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(post_list) 