import { Todo } from "../models/todo";
import { useState, useEffect } from "react";
import { TodoListItem } from "./TodoListItem"
import axios from "axios";

export const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>()

    // const getAllTodos = async () => {
    //     const response = await axios.get('/api')
    //     setTodos(response.data)
    // }

    useEffect(() => {
        const getAllTodos = async () => {
            const response = await axios.get('/api')
            setTodos(response.data)
        }
        getAllTodos()
    }, [])


    return (
        <>
            {todos &&
                todos.map((todo) => <TodoListItem key={todo.id} props={todo} />)}
        </>
    );
};
