import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBn-hPuu5GUAkDx5bFoDtz0NianR3KKx6I",
    authDomain: "project-1-ec48e.firebaseapp.com",
    projectId: "project-1-ec48e",
    storageBucket: "project-1-ec48e.appspot.com",
    messagingSenderId: "314691492284",
    appId: "1:314691492284:web:6d2e2beccd6e3d6600b3b9",
    measurementId: "G-FCTZRMJTG1"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app)

export const storage = getStorage(app)
