import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { BiSave } from 'react-icons/bi';
import { useState, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";


export const TodoListItem = ({ todo, todos }: { todo: Todo, todos: Todo[] }) => {

    const [formValue, setFormValue] = useState({
        todo: todo.todo,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const focus = () => {
        inputRef.current!.focus(); //
        toggleEditFocus()
    }

    const blur = () => {
        inputRef.current!.blur();
        saveEdit()
        toggleEditBlur()
    }

    const toggleEditFocus = () => {
        todos.forEach(element => {
            const docRef = doc(db, 'TodoList', element.id)
            if (element.id === todo.id) {
                updateDoc(docRef, {
                    isEdit: true
                })
            } else {
                updateDoc(docRef, {
                    isEdit: false
                })
            }
        });
    }

    const toggleEditBlur = () => {
        const docRef = doc(db, 'TodoList', todo.id)
        updateDoc(docRef, { isEdit: false })
    }

    const deleteTodo = (event: React.FormEvent) => {
        event.preventDefault()
        const docRef = doc(db, 'TodoList', todo.id)
        deleteDoc(docRef)
    }

    const toggleComplete = () => {
        const docRef = doc(db, 'TodoList', todo.id)
        updateDoc(docRef, {
            isComplete: !todo.isComplete
        })
    }

    const saveEdit = () => {
        const docRef = doc(db, 'TodoList', todo.id)
        updateDoc(docRef, {
            todo: formValue.todo
        })
    }

    return (
        <>
            <form
                onSubmit={blur}
                className="flex justify-between gap-3 p-5 m-5 bg-[#201c1b] rounded-md ">

                <div className="flex gap-3">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="rounded-full cursor-pointer w-7 h-7"
                        onChange={toggleComplete}
                    />

                    < input
                        name="todo"
                        type="text"
                        ref={inputRef}
                        className="block w-full outline-none text-white bg-[#201c1b] rounded-lg"
                        onChange={handleChange}
                        onBlur={blur}
                        value={formValue.todo}
                        onFocus={focus}
                    />
                </div>

                <div className="flex gap-3">
                    <TiDeleteOutline
                        title="Delete Todo"
                        className="text-white cursor-pointer w-7 h-7"
                        onClick={deleteTodo}
                    />

                    {todo.isEdit
                        ? <BiSave
                            title="Save Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={blur}
                        />

                        : <BiPencil
                            title="Edit Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={focus}
                        />
                    }
                </div>
            </form>
        </>
    );
};


