import { Todo } from "../models/todo";
import { useState, useEffect, useRef } from "react";
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
        <div className="min-h-screen pb-1 bg-[#201c1b] divide-y divide-cyan-100">
            {todos &&
                todos.map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />)}
        </div>

    );
};
