import { Timestamp } from "firebase/firestore"

export type Todo = {
    todo: string,
    id: string,
    isComplete: boolean,
    isEdit: boolean,
    user: string,
    date: Timestamp
}

export interface Signup {
    registerEmail: string,
    registerPassword: string,
    confirmPassword: string
}