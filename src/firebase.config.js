import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDXwx_vc76nrXf_zd2nkmJbe_Ff_axr_UI",
    authDomain: "bubbly-mission-313508.firebaseapp.com",
    projectId: "bubbly-mission-313508",
    storageBucket: "bubbly-mission-313508.appspot.com",
    messagingSenderId: "484373774891",
    appId: "1:484373774891:web:7403665a888df5b3c7606e",
    measurementId: "G-6QNEE61R6M"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const provierGoogle = new GoogleAuthProvider()
export const provierFacebook = new FacebookAuthProvider()