import { auth } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const register = async (registerEmail: string, registerPassword: string) => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        console.log(user);
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        reportError({ message })
    }
}

export const login = async (loginEmail: string, loginPassword: string) => {
    try {
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        return 'ok'
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        return message
    }
}

export const logout = async () => {
    await signOut(auth);
}


export const lostPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}