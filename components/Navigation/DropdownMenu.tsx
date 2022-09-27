import { useEffect, useRef } from "react";
import Image from "next/image";
import { BiLogIn } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from "jotai";
import { openAtom, showLoginModalAtom, todosAtom, userAtom } from "../../atoms";
import { logout } from '../../firebase/authServices';



export const DropdownMenu = () => {

    const dropdownRef = useRef(null);
    const [user, setUser] = useAtom(userAtom);
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [todos, setTodos] = useAtom(todosAtom);
    const [open, setOpen] = useAtom(openAtom)


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const handleLogout = () => {
        logout()
        setShowLoginModal(false)
        setTodos([])
        setOpen(false)
    }

    const handleLogin = () => {
        setShowLoginModal(true)
        setOpen(false)
    }

    return (
        <div
            className=" absolute right-1 top-[58px] w-[300px] bg-white dark:bg-gray-900 border border-gray-800 rounded-md p-1  z-10 "
            ref={dropdownRef}>
            <div className="w-full">

                <div className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                    <span className="mr-1"></span>
                    <Image src="/dummy-profile-pic.png" width={32} height={32} className="rounded-full" />
                    My Profile
                </div>

                <div className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                    <span className="mr-1"></span>
                    <BiCog className="w-8 h-8" />
                    Settings
                </div>

                {user
                    ? <div
                        className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={handleLogout}>
                        <span className="mr-1"></span>
                        <BiLogOut className="w-8 h-8" />
                        Log Out
                    </div>
                    : <div
                        className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={handleLogin}>
                        <span className="mr-1"></span>
                        <BiLogIn className="w-8 h-8" />
                        Log In
                    </div>
                }

            </div>
        </div>
    );
}