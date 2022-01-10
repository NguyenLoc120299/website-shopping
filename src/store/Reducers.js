const reducers = (state, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return {
                ...state,
                posts: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                isLogin: action.payload
            }
        case 'NOTIFY':
            return {
                ...state,
                notify: action.payload
            }
        default:
            return state
    }
}

export default reducers