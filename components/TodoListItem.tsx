import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { GrEdit } from 'react-icons/gr';
import { BiSave } from 'react-icons/bi';
import { useState } from "react";
import axios from "axios";


export const TodoListItem = ({ todo, todos, setTodos }: { todo: Todo, todos: Todo[], setTodos: any }) => {

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

    const handleDelete = async () => {
        const newState = todos.filter((element: Todo) => element.id !== todo.id);
        await axios.delete('/api', { data: { id: todo.id } });
        setTodos(newState);
    };

    const handleEdit = () => {
        toggleEdit();
    };

    const handleSave = () => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id === todo.id) {
                    const tempTodo = { ...todo };
                    tempTodo.todo = formValue.todo;
                    tempTodo.isEdit = !tempTodo.isEdit;
                    return tempTodo;
                }
                return todo;
            })
        );
    }

    const handleToggleComplete = (): void => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id === todo.id) {
                    const tempTodo = { ...todo };
                    tempTodo.isComplete = !tempTodo.isComplete;
                    return tempTodo;
                }
                return todo;
            })
        );
    };

    const toggleEdit = () => {
        setTodos(
            todos.map((element: Todo) => {
                if (element.id === todo.id) {
                    const tempTodo = { ...todo };
                    tempTodo.isEdit = !tempTodo.isEdit;
                    return tempTodo;
                }
                return todo;
            })
        );
    }

    return (
        <>
            <form
                onSubmit={handleSave}
                className="flex justify-between p-5 m-5 bg-gray-200 rounded-md ">

                <div className="flex gap-3">
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="cursor-pointer w-7 h-7"
                        onChange={handleToggleComplete}
                    />

                    {todo.isEdit
                        ? <input
                            name="description"
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            onChange={handleChange}
                            value={formValue.todo}
                        />
                        : <p
                            className="mb-3 font-normal text-center text-black">
                            {todo.todo}
                        </p>
                    }

                </div>

                <div className="flex gap-3">
                    <TiDeleteOutline
                        title="Delete Todo"
                        className="cursor-pointer w-7 h-7"
                        onClick={() => handleDelete()}
                    />

                    {todo.isEdit
                        ? <BiSave
                            title="Save Todo"
                            className="cursor-pointer w-7 h-7"
                            onClick={handleSave}
                        />

                        : <GrEdit
                            title="Edit Todo"
                            className="cursor-pointer w-7 h-7"
                            onClick={handleEdit}
                        />
                    }

                </div>

            </form>
        </>
    );
};


