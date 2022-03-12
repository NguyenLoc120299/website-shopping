import { createContext, useEffect, useReducer, useState } from 'react'
import reducers from './Reducers'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'

export const Store = createContext()

export const DataProvider = ({ children }) => {
    const initialState = {
        notify: {},
        posts: [],
        users: [],
        isLoading: false,
        callBack: false

    }
    const [state, dispatch] = useReducer(reducers, initialState)



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            dispatch({
                type: 'LOGIN',
                payload: user && user
            })
        })
        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}