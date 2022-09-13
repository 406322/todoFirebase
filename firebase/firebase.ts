import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCxVdikPvtrpuwr4uxc90Jsf8a74x06cg0",
    authDomain: "fir-df0a9.firebaseapp.com",
    projectId: "fir-df0a9",
    storageBucket: "fir-df0a9.appspot.com",
    messagingSenderId: "289664701284",
    appId: "1:289664701284:web:e922d47fdfd9e60a7d2071"
};

export const firebase = initializeApp(firebaseConfig)

export const db = getFirestore()
