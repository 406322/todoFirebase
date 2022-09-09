import { Form } from "../components/Form"
import { TodoList } from "../components/TodoList"


export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center underline">
        TodoList
      </h1>
      <Form />
      <TodoList />
    </>
  )
}