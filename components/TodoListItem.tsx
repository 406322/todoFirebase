import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { GrEdit } from 'react-icons/gr';
import { BiSave } from 'react-icons/bi';
import { useState } from "react";
import axios from "axios";


export const TodoListItem = ({ props }: { props: Todo }) => {

    const [todoList, setTodoList] = useState<Todo[]>([]);

    const [formValue, setFormValue] = useState({
        todo: props.todo,
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

    const deleteTodo = () => {
        const response = axios.delete('/api', { data: { id: props.id } })
    }

    const handleDelete = () => {
        deleteTodo()
        // const newState = todoList.filter((todo: Todo) => todo.id !== props.id);
        // setTodoList(newState);
    };

    const handleEdit = () => {
        toggleEdit();
    };

    const handleSave = () => {
        setTodoList(
            todoList.map((todo: Todo) => {
                if (todo.id === props.id) {
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
        setTodoList(
            todoList.map((todo: Todo) => {
                if (todo.id === props.id) {
                    const tempTodo = { ...todo };
                    tempTodo.isComplete = !tempTodo.isComplete;
                    return tempTodo;
                }
                return todo;
            })
        );
    };

    const toggleEdit = () => {
        setTodoList(
            todoList.map((todo: Todo) => {
                if (todo.id === props.id) {
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
                        checked={props.isComplete}
                        className="cursor-pointer w-7 h-7"
                        onChange={handleToggleComplete}
                    />

                    {props.isEdit
                        ? <input
                            name="description"
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            onChange={handleChange}
                            value={formValue.todo}
                        />
                        : <p
                            className="mb-3 font-normal text-center text-black">
                            {props.todo}
                        </p>
                    }

                </div>

                <div className="flex gap-3">
                    <TiDeleteOutline
                        title="Delete Todo"
                        className="cursor-pointer w-7 h-7"
                        onClick={() => handleDelete()}
                    />

                    {props.isEdit
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


