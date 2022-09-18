import { Todo } from "../models/todo";
import { TodoListItem } from "./TodoListItem"
import { todosAtom } from "../atoms";
import { useAtom } from 'jotai'

export const TodoList = () => {

    const [todos] = useAtom(todosAtom);

    let sorted = todos.sort((a, b) => a.date - b.date)

    return (
        <div className="min-h-screen bg-[#201c1b] divide-cyan-100 px-10">
            {todos &&
                todos
                    .reverse()
                    .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
                    .map((todo: Todo) => <TodoListItem key={todo.id} todo={todo} />)}
        </div>

    );
};
