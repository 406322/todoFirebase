import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { BiSave } from 'react-icons/bi';
import { useState, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { toggleEditBlur, toggleEditFocus } from "../firebase/dbServices";
import { deleteTodo } from "../firebase/dbServices";
import { updateTodo } from "../firebase/dbServices";
import { toggleComplete } from "../firebase/dbServices";

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

    const onFocus = () => {
        inputRef.current!.focus()
        toggleEditFocus(todos, todo)
    }

    const onBlur = (event: React.FormEvent) => {
        event.preventDefault()
        inputRef.current!.blur()
        updateTodo(todo.id, formValue.todo)
        toggleEditBlur(todo.id)
    }

    return (
        <>
            <form
                onSubmit={onBlur}
                className="flex justify-between mb-3 bg-[#201c1b] rounded-md ">

                <div className="flex items-center justify-center w-full gap-4">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="rounded-full cursor-pointer w-7 h-7"
                        onChange={() => toggleComplete(todo.id, todo.isComplete)}
                    />

                    {/* < input
                        name="todo"
                        type="text"
                        ref={inputRef}
                        className="block w-full outline-none border-none text-white bg-[#201c1b] rounded-lg"
                        onChange={handleChange}
                        onBlur={onBlur}
                        value={formValue.todo}
                        onFocus={focus}
                    /> */}
                    <div className="relative z-0 w-full">
                        <input
                            type="text"
                            name="todo"
                            id="floating_standard"
                            ref={inputRef}
                            onChange={handleChange}
                            onFocus={focus}
                            onBlur={onBlur}
                            value={formValue.todo}
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        {/* <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{formValue.todo}</label> */}
                    </div>
                </div>




                <div className="flex items-center justify-center gap-3">
                    <TiDeleteOutline
                        title="Delete Todo"
                        className="text-white cursor-pointer w-7 h-7"
                        onClick={(event) => deleteTodo(event, todo)}
                    />

                    {/* {todo.isEdit
                        ? <BiSave
                            title="Save Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={onBlur}
                        />

                        : <BiPencil
                            title="Edit Todo"
                            className="text-white cursor-pointer w-7 h-7"
                            onClick={onFocus}
                        />
                    } */}
                </div>
            </form>
        </>
    );
};


