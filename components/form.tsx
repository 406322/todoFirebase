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
        <div className="bg-[#201c1b]">
            <form
                onSubmit={handleSubmit}
                className="flex gap-3 p-5 mx-5 bg-[#201c1b] rounded-md">

                <input
                    name="todo"
                    type="text"
                    onChange={handleChange}
                    className=" border border-gray-300 outline-none text-white bg-[#201c1b] text-sm rounded-lg block w-full p-2.5"
                    placeholder="Add Todo..."
                    required
                />

                <GoDiffAdded
                    title="Add Todo"
                    type="submit"
                    className="h-10 text-white cursor-pointer w-7"
                />
            </form>
        </div>
    );
};
