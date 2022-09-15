import { Form } from "../components/Form"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav"
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "@firebase/firestore";
import { getTodos } from "../firebase/dbServices";

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>();

  const colRef = collection(db, "TodoList");

  useEffect(() => {
    const response = getTodos()
    setTodos(response)
  }, [])

  const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    const todos: any = [];
    querySnapshot.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id })
    });
    setTodos(todos)
  });

  return (
    <div className="bg-[#201c1b]">
      <TopNav />
      <Form />
      <TodoList todos={todos} />
    </div>
  )
}

