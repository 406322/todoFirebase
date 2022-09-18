import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { useState, useRef, useEffect } from "react";
import { toggleEditBlur } from "../firebase/dbServices";
import { deleteTodo } from "../firebase/dbServices";
import { updateTodo } from "../firebase/dbServices";
import { toggleComplete } from "../firebase/dbServices";
import { useAtom } from "jotai";
import { todosAtom } from "../atoms";



export const TodoListItem = ({ todo }: { todo: Todo }) => {

    const [todos, setTodos] = useAtom(todosAtom);

    const [formValue, setFormValue] = useState({
        todo: todo.todo,
    });

    useEffect(() => {
        if (todo.isEdit === true) { inputRef.current!.focus(); }
    }, []);

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

    const onBlur = (event: React.FormEvent) => {
        event.preventDefault()
        if (formValue.todo.length < 1) { deleteTodo(event, todo) }
        else {
            inputRef.current!.blur()
            updateTodo(todo.id, formValue.todo)
            const newArray = todos.filter(element => todo.id !== element.id);
            todo.todo = formValue.todo
            setTodos([...newArray, todo])
            toggleEditBlur(todo.id)
        }
    }

    const handleDelete = (event: any) => {
        deleteTodo(event, todo)
        const newArray = todos.filter(element => todo.id !== element.id);
        setTodos(newArray)
    }

    const handleToggleComplete = (event: any) => {
        toggleComplete(todo.id, todo.isComplete)
        const newArray = todos.filter(element => todo.id !== element.id);
        todo.isComplete = !todo.isComplete
        setTodos([...newArray, todo])
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
                        className="rounded-full cursor-pointer focus:ring-0 w-7 h-7 focus:ring-offset-0 focus:decoration-none"
                        onChange={handleToggleComplete}
                    />

                    <div className="flex justify-end w-full">
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
                                className="block py-2.5 focus:text-[16px] px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                spellCheck="false"

                            />
                        </div>

                        <div className="absolute ">
                            <TiDeleteOutline
                                title="Delete Todo"
                                className="text-white cursor-pointer w-7 h-7"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>

                </div>
            </form>
        </>
    );
};


