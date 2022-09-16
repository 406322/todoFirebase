import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';

export const TopNav = () => {

    const [user, setUser] = useState<any>({});

    const [loginModal, setLoginModal] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)

    useEffect(() => {
        if (user === null) {
            setLoginModal(true)
        }
    }, [user])


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
            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setRegisterModal={setRegisterModal} />
            <RegisterModal registerModal={registerModal} setLoginModal={setLoginModal} setRegisterModal={setRegisterModal} />
        </div >
    )
}
