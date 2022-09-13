import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { GrEdit } from 'react-icons/gr';
import { BiSave } from 'react-icons/bi';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { doc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";


export const TodoListItem = ({ todo, todos, setTodos }: { todo: Todo, todos: Todo[], setTodos: any }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [hasFocus, setFocus] = useState(false);

    const focus = () => {
        inputRef.current!.focus();
        setFocus(true)
    }

    const blur = () => {
        inputRef.current!.blur();
        handleSave()
        toggleEditToSaved()
        setFocus(false)
    }

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

    const deleteTodo = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(todo)
        const docRef = doc(db, 'TodoList', todo.id)
        deleteDoc(docRef)
    }

    const handleEdit = () => {
        toggleEditToSaved()
        toggleEdit();
    };

    const handleSave = async () => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id2 === todo.id2) {
                    const tempTodo = { ...element };
                    tempTodo.todo = formValue.todo;
                    tempTodo.isEdit = !tempTodo.isEdit;
                    const data = { todo: tempTodo.todo, id: tempTodo.id2 }
                    const response = axios.put("/api", data);
                    return tempTodo;
                }
                return element;
            })
        );
    }

    const handleToggleComplete = (): void => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id2 === todo.id2) {
                    const tempTodo = { ...element };
                    tempTodo.isComplete = !tempTodo.isComplete;
                    const data = { isComplete: tempTodo.isComplete, id: tempTodo.id2 }
                    const response = axios.put("/api", data);
                    return tempTodo;
                }
                return element;
            })
        );
    };

    const toggleEdit = () => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id2 === todo.id2) {
                    const tempTodo = { ...element };
                    tempTodo.isEdit = !tempTodo.isEdit;
                    return tempTodo;
                }
                return element;
            })
        );
    }


    const toggleEditToSaved = () => {
        todos.map((element: Todo) => {
            if (element.id2 !== todo.id2) {
                console.log(element)
                const tempTodo = { ...element };
                console.log(tempTodo.isEdit)
                tempTodo.isEdit = !tempTodo.isEdit;
                console.log(tempTodo.isEdit)
                return tempTodo;
            }
            return element;
        })
    }

    return (
        <>
            <form
                onSubmit={handleSave}
                className="flex justify-between gap-3 p-5 m-5 bg-[#201c1b] rounded-md ">

                <div className="flex gap-3">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="rounded-full cursor-pointer w-7 h-7"
                        onChange={handleToggleComplete}
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

                    {hasFocus
                        ? <BiSave
                            title="Save Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={handleSave}
                        />

                        : <BiPencil
                            title="Edit Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={handleEdit}
                        />
                    }

                </div>

            </form>
        </>
    );
};


