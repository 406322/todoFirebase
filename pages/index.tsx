import { TodoList } from "../components/TodoList"
import { useEffect, useState } from "react";
import { auth, db } from '../firebase/firebaseConfig';
import { collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useAtom } from 'jotai'
import { todosAtom } from "../atoms";
import { Navigation } from "../components/Navigation";
import { loadingAtom } from "../atoms";
import { NavBar } from '../components/Navigation/NavBar'
import { LoginModal } from "../components/Login/LoginModal";
import { RegisterModal } from "../components/Register/RegisterModal";
import { ResetPasswordModal } from "../components/ResetPassword/ResetPasswordModal";


export default function Home() {

  const [todos, setTodos] = useAtom(todosAtom);
  const [loading, setLoading] = useAtom(loadingAtom)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
      <NavBar />
      {/* <Navigation /> */}
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

