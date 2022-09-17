import { Form } from "../components/Form"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav"
import { auth, db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>();

  const colRef = collection(db, "TodoList");

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [])

  const unsubscribe = onSnapshot(colRef, snapshot => {
    const todos: any = [];
    snapshot.forEach((doc) => {
      if (user && doc.data().user === user.email) {
        todos.push({ ...doc.data(), id: doc.id })
      }
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

