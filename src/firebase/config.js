import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCbIr-xR1dOoFxvMK2YSLujC4AvwHW-LpA",
    authDomain: "fir-demo-9ff7e.firebaseapp.com",
    projectId: "fir-demo-9ff7e",
    storageBucket: "fir-demo-9ff7e.appspot.com",
    messagingSenderId: "272996922646",
    appId: "1:272996922646:web:cb4978d6329df7834f0c37",
    measurementId: "G-J8G43VH201"
};

const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase)
export const auth = getAuth(Firebase)

const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => signInWithPopup(auth, provider)

export const storage=getStorage(Firebase)


