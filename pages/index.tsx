import { TodoList } from "../components/TodoList"
import { useEffect, useState } from "react";
import { auth, db } from '../firebase/firebaseConfig';
import { collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useAtom } from 'jotai'
import { todosAtom } from "../atoms";
import { Navigation } from "../components/Navigation";
import { Spinner } from "flowbite-react";


export default function Home() {

  const [todos, setTodos] = useAtom(todosAtom);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

  }, []);

  // setTimeout(() => console.log('Initial timeout!'), 1000);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) { getAllTodos(currentUser.email!) }
    });
  }, [])

  const getAllTodos = async (currentUser: string) => {
    const q = query(collection(db, 'TodoList'), where('user', '==', currentUser), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const todos: any = [];
    querySnapshot.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id })
    });
    setTodos(todos)
  }

  return (
    <div className="">
      <Navigation />

      {loading
        ? <div className="flex justify-center h-screen pt-10 text-left bg-white dark:bg-gray-900 text-bg-gray-900 dark:text-white">
          <Spinner aria-label="Left-aligned spinner example" />
        </div>
        : <TodoList />

      }
    </div>
  )
}

