import { Todo } from "../models/todo";
import { useState, useEffect, useRef } from "react";
import { TodoListItem } from "./TodoListItem"
import axios from "axios";


export const TodoList = ({ todos, setTodos }: { todos: any, setTodos: any }) => {

    return (
        <div className="min-h-screen pb-1 bg-[#201c1b] divide-y divide-cyan-100">
            {todos &&
                todos.map((todo: Todo) => <TodoListItem key={todo.id2} todo={todo} todos={todos} setTodos={setTodos} />)}
        </div>

    );
};
