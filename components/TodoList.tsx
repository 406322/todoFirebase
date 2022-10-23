import { Todo } from "../models/todo";
import { TodoListItem } from "./TodoListItem"
import { todosAtom } from "../atoms";
import { useAtom } from 'jotai'

export const TodoList = () => {

    const [todos] = useAtom(todosAtom)

    if (todos) { let sorted = todos.sort((a, b) => Number(a.date) - Number(b.date))}

    return (
        <div className="min-h-screen p-5 bg-white dark:bg-slate-900 divide-cyan-100">
            {todos &&
                todos
                    .reverse()
                    .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
                    .map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} />)}
        </div>

    );
};
