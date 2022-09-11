import { Form } from "../components/Form"
import { TodoList } from "../components/TodoList"
import { useState } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav.jsx"


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <div className="bg-[#201c1b]">
      <TopNav />
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}