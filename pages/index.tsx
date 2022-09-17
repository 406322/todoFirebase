import { CreateTodo } from "../components/CreateTodo"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav"
import { auth, db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { orderBy, query } from "firebase/firestore";
import { useAtom } from 'jotai'
import { userAtom } from "../styles/atoms";
import { todosAtom } from "../styles/atoms";


export default function Home() {

  const [user, setUser] = useAtom(userAtom);
  const [todos, setTodos] = useAtom(todosAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [])

  const q = query(collection(db, 'TodoList'), orderBy('date', 'desc'));

  const unsubscribe = onSnapshot(q, snapshot => {
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
      <TodoList todos={todos} />
    </div>
  )
}

