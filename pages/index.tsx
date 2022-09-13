import { Form } from "../components/form"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav.jsx"
import { db } from '../firebase/firebase';
import { collection, QueryDocumentSnapshot, DocumentData, getDocs, } from "@firebase/firestore";

export default function Home() {

  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>();

  const colRef = collection(db, "TodoList");

  const getTodos = () => {
    getDocs(colRef)
      .then((snapshot) => {
        let todos: any = [];
        snapshot.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id })
        })
        setTodos(todos)
      })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="bg-[#201c1b]">
      <TopNav />
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

