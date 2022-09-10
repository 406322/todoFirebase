import { Todo } from "../models/todo";
import { useState, useEffect } from "react";
import { TodoListItem } from "./TodoListItem"
import axios from "axios";


export const TodoList = ({ todos, setTodos }: { todos: any, setTodos: any }) => {

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
                todos.map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />)}
        </>
    );
};
