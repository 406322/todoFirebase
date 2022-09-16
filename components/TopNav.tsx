import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { logout } from '../firebase/authServices';
import Link from 'next/link';

export const TopNav = () => {

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])

    return (
        <div className='flex justify-between'>
            <h1 className="p-5 text-3xl font-bold text-white bg-[#201c1b]">
                TodoList
            </h1>

            <div className='flex gap-5 p-5'>
                {user && <p className='text-white'>{user.email}</p>}

                {user
                    ? <p className='text-white cursor-pointer' onClick={logout}>Sign out</p>

                    : <Link href="/signup">
                        <a className="text-white cursor-pointer ">Sign in</a>
                    </Link>
                }
            </div>

        </div >
    )
}
