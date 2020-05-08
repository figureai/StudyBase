const addAction = () => {
    return {
        type: 'COUNTER_ADD',
        payload: {}
    }
}

const reduceAction = () =>{
    return {
        type: 'COUNTER_REDUCE',
        payload: {}
    }
}

export {
    addAction,
    reduceAction,
}