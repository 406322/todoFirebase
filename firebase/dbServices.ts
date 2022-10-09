import { updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { Todo } from '../models/todo'

export const addTodo = async (event: React.FormEvent, newTodo: Todo) => {
    event.preventDefault()
    await setDoc(doc(db, 'TodoList', newTodo.id), {
        todo: newTodo.todo,
        isComplete: newTodo.isComplete,
        isEdit: newTodo.isEdit,
        user: newTodo.user,
        date: newTodo.date
    })
}

export const addImageToDB = async (image: string, id: string) => {
    await setDoc(doc(db, 'UserImages', id), {
        image: image,
        UserId: id,
    })
}

export const updateTodo = async (id: Todo["id"], todo: Todo["todo"]) => {
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

export const toggleComplete = async (id: Todo["id"], isComplete: Todo["isComplete"]) => {
    const docRef = doc(db, 'TodoList', id)
    await updateDoc(docRef, {
        isComplete: !isComplete
    })
}

export const toggleEditBlur = async (id: Todo["id"]) => {
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