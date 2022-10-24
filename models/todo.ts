import { Timestamp } from "firebase/firestore"

export interface Todo {
    todo: string,
    id: string,
    isComplete: boolean,
    isEdit: boolean,
    user: string,
    date: Timestamp
}

export interface SignupInputs {
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginInputs {
    loginEmail: string,
    loginPassword: string,
}