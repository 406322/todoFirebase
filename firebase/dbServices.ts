import { updateDoc, doc, deleteDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { Todo } from '../models/todo'


export const addTodo = async (event: React.FormEvent, todo: string, isComplete: boolean, isEdit: boolean, user: string, id: string, date: Timestamp) => {
    event.preventDefault()
    await setDoc(doc(db, 'TodoList', id), {
        todo: todo,
        isComplete: isComplete,
        isEdit: isEdit,
        user: user,
        date: date
    })
}

export const updateTodo = async (id: Todo["id"], todo: string) => {
    const docRef = doc(db, 'TodoList', id)
    await updateDoc(docRef, {
        todo: todo
    })
}

export const deleteTodo = async (event: React.FormEvent, todo: Todo) => {
    event.preventDefault()
    const docRef = doc(db, 'TodoList', todo.id)
    await deleteDoc(docRef)
}

export const toggleComplete = async (id: string, isComplete: boolean) => {
    const docRef = doc(db, 'TodoList', id)
    await updateDoc(docRef, {
        isComplete: !isComplete
    })
}

export const toggleEditBlur = async (id: string) => {
    const docRef = doc(db, 'TodoList', id)
    await updateDoc(docRef, { isEdit: false })
}

export const toggleEditFocus = (todos: Todo[], todo: Todo) => {
    todos.forEach(async element => {
        const docRef = doc(db, 'TodoList', element.id)
        if (element.id === todo.id) {
            await updateDoc(docRef, {
                isEdit: true
            })
        } else {
            await updateDoc(docRef, {
                isEdit: false
            })
        }
    });
}