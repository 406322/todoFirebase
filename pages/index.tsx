import { Form } from "../components/form"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav.jsx"
import { db } from '../firebase/firebase';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";

const todosCollection = collection(db, 'TodoList');


export default function Home() {

  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>();

  const getTodos = async () => {
    const todosQuery = query(todosCollection);

    const querySnapshot = await getDocs(todosQuery);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      console.log(snapshot)
      // result.push(snapshot);
    });
    setTodos(result);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // useEffect(() => {
  //   console.log(todos)
  // }, [todos])


  // const [todos, setTodos] = useState<Todo[]>([])

  return (
    <div className="bg-[#201c1b]">
      <TopNav />
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

