import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { BiSave } from 'react-icons/bi';
import { useState, useRef, useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { toggleEditBlur, toggleEditFocus } from "../firebase/dbServices";
import { deleteTodo } from "../firebase/dbServices";
import { updateTodo } from "../firebase/dbServices";
import { toggleComplete } from "../firebase/dbServices";

export const TodoListItem = ({ todo, todos }: { todo: Todo, todos: Todo[] }) => {

    const [formValue, setFormValue] = useState({
        todo: todo.todo,
    });

    useEffect(() => {
        console.log(todo)
    }, [todo])


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
        inputRef.current!.focus(); //
        toggleEditFocus(todos, todo)
    }

    const onBlur = (event: React.FormEvent) => {
        event.preventDefault()
        inputRef.current!.blur();
        updateTodo(todo.id, formValue.todo)
        toggleEditBlur(todo.id)
    }

    return (
        <>
            <form
                onSubmit={onBlur}
                className="flex justify-between gap-3 p-5 m-5 bg-[#201c1b] rounded-md ">

                <div className="flex gap-3">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="rounded-full cursor-pointer w-7 h-7"
                        onChange={() => toggleComplete(todo.id, todo.isComplete)}
                    />

                    < input
                        name="todo"
                        type="text"
                        ref={inputRef}
                        className="block w-full outline-none border-none text-white bg-[#201c1b] rounded-lg"
                        onChange={handleChange}
                        onBlur={onBlur}
                        value={formValue.todo}
                        onFocus={focus}
                    />
                </div>

                <div className="flex gap-3">
                    <TiDeleteOutline
                        title="Delete Todo"
                        className="text-white cursor-pointer w-7 h-7"
                        onClick={(event) => deleteTodo(event, todo)}
                    />

                    {todo.isEdit
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
                    }
                </div>
            </form>
        </>
    );
};


