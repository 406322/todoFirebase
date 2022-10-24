import { Todo } from "../models/todo";
import { DeleteIcon } from "./icons";
import { useState, useEffect } from "react";
import { toggleEditBlur } from "../firebase/dbServices";
import * as api from "../firebase/dbServices";

import { useAtom } from "jotai";
import { todosAtom } from "../atoms";
import { useForm } from "react-hook-form";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const TodoListItem = ({ todo }: { todo: Todo }) => {

    const [todos, setTodos] = useAtom(todosAtom);

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

    const [value, setValue] = useState(todo.todo)

    const handleChange = (event: React.FormEvent) => {
        if (event.target instanceof HTMLInputElement) setValue(event.target.value)
    }

    useEffect(() => {
        if (todo.isEdit === true) { setFocus("todo") }
    }, []);

    const onBlur = () => {
        if (value.length < 1) {
            const docRef = doc(db, 'TodoList', todo.id)
            deleteDoc(docRef)
            const newArray = todos.filter(element => todo.id !== element.id);
            setTodos(newArray)
        }
        else {
            if (document.activeElement instanceof HTMLElement) { document.activeElement.blur() }
            api.updateTodo(todo.id, value)
            const newArray = todos.filter(element => todo.id !== element.id);
            todo.todo = value
            setTodos([...newArray, todo])
            toggleEditBlur(todo.id)
        }
    }

    const handleDelete = (event: React.FormEvent) => {
        api.deleteTodo(event, todo)
        const newArray = todos.filter(element => todo.id !== element.id);
        setTodos(newArray)
    }

    const handleToggleComplete = () => {
        api.toggleComplete(todo.id, todo.isComplete)
        const newArray = todos.filter(element => todo.id !== element.id);
        todo.isComplete = !todo.isComplete
        setTodos([...newArray, todo])
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onBlur)}
                className="flex justify-between mb-3 bg-white rounded-md dark:bg-slate-900 ">

                <div className="flex items-center justify-center w-full gap-4">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="rounded-full cursor-pointer focus:ring-0 w-7 h-7 focus:ring-offset-0 focus:decoration-none"
                        onChange={handleToggleComplete}
                    />

                    <div className="flex justify-end w-full">
                        <div className="relative z-0 w-full">
                            <input
                                type="text"
                                {...register("todo")}
                                onChange={handleChange}
                                onBlur={onBlur}
                                value={value}
                                className="block py-2.5 focus:text-[16px] px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                spellCheck="false"
                            />
                        </div>

                        <div className="absolute pr-5 ">
                            <DeleteIcon
                                title="Delete Todo"
                                className="w-8 h-8 text-black cursor-pointer dark:text-white"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>

                </div>
            </form>
        </>
    );
};
