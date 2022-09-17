import { Todo } from "../models/todo";
import { TodoListItem } from "./TodoListItem"


export const TodoList = ({ todos }: { todos: any }) => {

    return (
        <div className="min-h-screen bg-[#201c1b] divide-cyan-100 px-10">
            {todos &&
                todos
                    .sort((a: Todo, b: Todo) => Number(a.isComplete) - Number(b.isComplete))
                    .map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} todos={todos} />)}
        </div>

    );
};
