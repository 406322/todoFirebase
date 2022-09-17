import { CreateTodo } from "../components/CreateTodo"
import { TodoList } from "../components/TodoList"
import { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import { TopNav } from "../components/TopNav"
import { auth, db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { orderBy, query } from "firebase/firestore";
import { BsPlusLg } from 'react-icons/bs';



export default function Home() {

  const [todos, setTodos] = useState<Todo[]>();

  const [user, setUser] = useState<any>({});

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
        console.log(doc)
        todos.push({ ...doc.data(), id: doc.id })
      }
    });
    setTodos(todos)
  });

  return (
    <div className="bg-[#201c1b]">
      <TopNav />
      {/* <CreateTodo /> */}
      <TodoList todos={todos} />
    </div>
  )
}

