import { useEffect, useRef } from "react";
import Image from "next/image";
import { GoPlus } from 'react-icons/go';
import { BiCog } from 'react-icons/bi';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";


export const DropdownMenu = () => {

    const dropdownRef = useRef(null);
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

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
                    ? <div className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                        <span className="mr-1"></span>
                        <BiCog className="w-8 h-8" />
                        Log Out
                    </div>
                    : <div className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                        <span className="mr-1"></span>
                        <BiCog className="w-8 h-8" />
                        Log Out
                    </div>
                }



            </div>
        </div>
    );
}