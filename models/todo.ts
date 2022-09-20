import { Timestamp } from "firebase/firestore"

export type Todo = {
    todo: string,
    id: string,
    isComplete: boolean,
    isEdit: boolean,
    user: string,
    date: Timestamp
}

export interface SignupInputs {
    registerEmail: string,
    registerPassword: string,
    confirmPassword: string
}

export interface LoginInputs {
    loginEmail: string,
    loginPassword: string,
}