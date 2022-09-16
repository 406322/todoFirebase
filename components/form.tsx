import { useEffect, useState } from "react";
import { Todo } from "../models/todo"
import { GoDiffAdded } from 'react-icons/go';
import { addTodo } from "../firebase/dbServices";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const Form = () => {

    const [user, setUser] = useState<any>();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])


    const [formValue, setFormValue] = useState({
        todo: "",
        id: "",
        isComplete: false,
        isEdit: false,
        user: user
    });

    const { todo, isComplete, isEdit } = formValue

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState: Todo) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className="bg-[#201c1b]">
            <form
                onSubmit={(event) => addTodo(event, todo, isComplete, isEdit, user.email)}
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
