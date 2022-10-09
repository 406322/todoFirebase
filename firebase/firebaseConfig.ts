import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD9enElehAflMUHeQcqHIZGsccLeTOdyTQ",
    authDomain: "todo2-9d3ff.firebaseapp.com",
    projectId: "todo2-9d3ff",
    storageBucket: "todo2-9d3ff.appspot.com",
    messagingSenderId: "99658098602",
    appId: "1:99658098602:web:686543278ea291482aadd3"
};

export const firebase = initializeApp(firebaseConfig)

export const db = getFirestore()

export const auth = getAuth()

export const storage = getStorage(firebase);