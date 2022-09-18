import { useState } from "react";
import { useAtom } from 'jotai'
import { userAtom } from "../atoms";
import { logout, login } from "../firebase/authServices";
import Image, { ImageProps } from 'next/image'
import { loginModalAtom, showDropdownListModal } from '../atoms';
import { useRef } from 'react';


let ProfilePicture = '/dummy-profile-pic.png';

export const Dropdown = () => {

    const [show, setShow] = useAtom(showDropdownListModal)

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setLoginModal] = useAtom(loginModalAtom)
    const ref = useRef<any>();


    const handle = () => {
        setTimeout(function () {
            setShow(!show)
        }, 5000);
    }

    const handleLogout = () => {
        logout()
        setShow(false)
    }

    const handleClick = () => {
        setShow(!show)
        ref.current.focus()

    }

    const xxx = () => {
        console.log('Focus')
        // setShow(!show)
        // ref.current.focus()

    }



    return (

        <div
            className="w-[180px]"
        >

            <div ref={ref} onFocus={xxx} onBlur={handle} className="flex justify-end m-3">
                <Image
                    alt="Avatar"
                    src={ProfilePicture}
                    width={48}
                    height={48}
                    className="rounded-full"
                    onClick={handleClick}
                    onFocus={() => console.log('Focus')}
                    onBlur={handle}

                />
            </div>

            {show &&
                <div onBlur={() => setShow(false)} id="dropdownList"
                    className="absolute z-20 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    {user
                        ? <div>
                            <div className="block px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                                {user.email}
                            </div>
                            {/* <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            </div> */}
                        </div>
                        : null
                    }

                    <div className="py-1">
                        {user
                            ? <p
                                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={handleLogout}>
                                Sign out
                            </p>
                            : <p
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={() => setLoginModal(true)}>
                                Sign in
                            </p>
                        }
                    </div>

                </div>
            }
        </div>
    )
};

