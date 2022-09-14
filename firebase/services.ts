import { collection, addDoc, getDocs, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
import { Todo } from '../models/todo'

const colRef = collection(db, 'TodoList')

export const getTodos = (): Todo[] => {
    let Temptodos: any = [];
    getDocs(colRef)
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                Temptodos.push({ ...doc.data(), id: doc.id })
            })
            let todos: Todo[] = { ...Temptodos }
            return todos
        })
    return Temptodos
}

export const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    const todos: any = [];
    querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id })
    });
    return todos
});

export const addTodo = async (event: React.FormEvent, todo: string, isComplete: boolean, isEdit: boolean) => {
    event.preventDefault()
    await addDoc(colRef, {
        todo: todo,
        isComplete: isComplete,
        isEdit: isEdit
    }).then(() => event.target as HTMLFormElement)
        .then((resetForm) => resetForm.reset())
}

export const deleteTodo = async (event: React.FormEvent, todo: Todo) => {
    event.preventDefault()
    const docRef = doc(db, 'TodoList', todo.id)
    await deleteDoc(docRef)
}

export const updateTodo = async (id: string, todo: string) => {
    const docRef = doc(db, 'TodoList', id)
    await updateDoc(docRef, {
        todo: todo
    })
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