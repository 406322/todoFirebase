import { Todo } from "../models/todo";
import { TodoListItem } from "./TodoListItem"


export const TodoList = ({ todos }: { todos: any }) => {

    return (
        <div className="min-h-screen pb-1 bg-[#201c1b] divide-y divide-cyan-100">
            {todos &&
                todos.map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} todos={todos} />)}
        </div>

    );
};
