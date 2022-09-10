import { Form } from "../components/Form"
import { TodoList } from "../components/TodoList"
import { useState } from "react";
import { Todo } from "../models/todo";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <>
      <h1 className="text-3xl font-bold text-center underline">
        TodoList
      </h1>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}