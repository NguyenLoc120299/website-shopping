const EditData = (data, id, post) => {
    const newData = data.map(item =>
        (item._id === id ? post : item)
    )
    return newData;
}
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
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case 'UPDATE_POST':

            return {
                ...state,
                callBack: !state.callBack
            }
        default:
            return state
    }
}

export default reducers