import { createContext, useEffect, useReducer, useState } from 'react'
import reducers from './Reducers'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'
export const Store = createContext()

export const DataProvider = ({ children }) => {
    const initialState = {
        notify: {},
        posts: [],
        users: [],
        isLoading: false

    }
    const [state, dispatch] = useReducer(reducers, initialState)

    const usersCollectionRef = collection(db, "posts");

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
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(usersCollectionRef);
            dispatch({
                type: 'GET_ALL',
                payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            })

        };

        getPosts()
    }, []);


    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}