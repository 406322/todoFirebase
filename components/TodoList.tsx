import { Todo } from "../models/todo";
import { useState } from "react";
import { TodoListItem } from "./TodoListItem"

export const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>()

    return (
        <>
            {todos &&
                todos.map((todo) => <TodoListItem key={todo.id} props={todo} />)}
        </>
    );
};
