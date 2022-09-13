import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../models/todo"
import { GoDiffAdded } from 'react-icons/go';
import axios from "axios";
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase/firebase";

export const Form = ({ todos, setTodos }: { todos: any, setTodos: any }) => {
    const collectionRef = collection(db, 'TodoList')

    const [formValue, setFormValue] = useState({
        todo: "",
        id: "",
        id2: "",
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


    const addTodo = async (event: React.FormEvent) => {
        event.preventDefault()
        await addDoc(collectionRef, {
            todo: formValue.todo,
            id2: uuidv4(),
            isComplete: formValue.isComplete,
            isEdit: formValue.isEdit
        }).then(() => event.target as HTMLFormElement)
            .then((resetForm) => resetForm.reset())
    }

    return (
        <div className="bg-[#201c1b]">
            <form
                onSubmit={addTodo}
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
