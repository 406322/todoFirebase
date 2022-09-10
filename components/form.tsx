import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../models/todo"
import { GoDiffAdded } from 'react-icons/go';
import axios from "axios";


export const Form = ({ todos, setTodos }: { todos: any, setTodos: any }) => {

    const [formValue, setFormValue] = useState({
        todo: "",
        id: "",
        isComplete: false,
        isEdit: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState: Todo) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        formValue.id = uuidv4();
        axios.post('/api', formValue)
        setTodos([...todos, formValue]);
        const resetForm = event.target as HTMLFormElement;
        resetForm.reset();
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-3 p-5 m-5 bg-gray-200 rounded-md">

            <input
                name="todo"
                type="text"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Add Todo..."
                required
            />

            <GoDiffAdded
                title="Add Todo"
                type="submit"
                className="h-10 cursor-pointer w-7"
            />
        </form>
    );
};
