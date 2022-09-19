import { TodoList } from "../components/TodoList"
import { useEffect } from "react";
import { auth, db } from '../firebase/firebaseConfig';
import { collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useAtom } from 'jotai'
import { todosAtom } from "../atoms";
import { Navigation } from "../components/Navigation";


export default function Home() {

  const [todos, setTodos] = useAtom(todosAtom);

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
      <TodoList />
    </div>
  )
}

