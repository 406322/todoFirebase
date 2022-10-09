import { useEffect, useRef } from "react";
import Image from "next/image";
import { BiLogIn } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from "jotai";
import { openAtom, showLoginModalAtom, todosAtom, userAtom } from "../../atoms";
import { logout } from '../../firebase/authServices';
import Link from "next/link"
import { useRouter } from "next/router";

export const DropdownMenu = () => {

    const dropdownRef = useRef(null);
    const [user, setUser] = useAtom(userAtom);
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [todos, setTodos] = useAtom(todosAtom);
    const [open, setOpen] = useAtom(openAtom)

    const router = useRouter()


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const handleLogout = () => {
        router.push("/")
        logout()
        setShowLoginModal(true)
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
                {user &&
                    <Link href="/profile">
                        <a>
                            <div
                                onClick={() => setOpen(false)}
                                className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                                {/* {user.photoURL
                                ? <Image src={user.photoURL} width={32} height={32} className="rounded-full " />
                                : <Image src="/dummy-profile-pic.png" width={32} height={32} className="rounded-full" />
                            } */}
                                <Image src="/dummy-profile-pic.png" width={32} height={32} className="rounded-full" />
                                My Profile
                            </div>
                        </a>
                    </Link>
                }

                {user
                    ? <div
                        className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={handleLogout}>
                        <BiLogOut className="w-8 h-8" />
                        Log Out
                    </div>
                    : <div
                        className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={handleLogin}>
                        <BiLogIn className="w-8 h-8" />
                        Log In
                    </div>
                }

            </div>
        </div>
    );
}