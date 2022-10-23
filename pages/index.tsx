import { TodoList } from "../components/TodoList"
import { useEffect } from "react";
import { auth, db } from '../firebase/firebaseConfig';
import { collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useAtom } from 'jotai'
import { todosAtom, userAtom } from "../atoms";
import { loadingAtom } from "../atoms";
import { NavBar } from '../components/Navigation/NavBar'
import { LoginModal } from "../components/Login/LoginModal";
import { RegisterModal } from "../components/Register/RegisterModal";
import { ResetPasswordModal } from "../components/ResetPassword/ResetPasswordModal";
import { Todo } from "../models/todo";


export default function Home() {

  const [todos, setTodos] = useAtom(todosAtom);
  const [loading, setLoading] = useAtom(loadingAtom)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) { getAllTodos(currentUser.email!) }
    });
  }, [])


  const getAllTodos = async (currentUser: string) => {
    if (todos.length !== 0) return false
    setLoading(true)
    const q = query(collection(db, 'TodoList'), where('user', '==', currentUser), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const arr: any = [];
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id })
    });
    setTimeout(() => setLoading(false), 1000);
    setTodos(arr)
  }

  return (
    <div className="">
      <NavBar />
      <LoginModal />
      <RegisterModal />
      <ResetPasswordModal />
      {loading
        ? <div className="h-screen bg-white dark:bg-gray-900"></div>
        : <TodoList />
      }
    </div>
  )
}

