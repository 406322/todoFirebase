import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { addTodo } from '../firebase/dbServices';
import { GoPlus } from 'react-icons/go';


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

    const newTodo = (event: any) => {
        event.preventDefault()
        const data = {
            todo: "",
            isComplete: false,
            isEdit: true,
        }
        addTodo(event, data.todo, data.isComplete, data.isEdit, "test@test.no")
    }

    return (
        <div
            className='flex items-center justify-between mx-5 mb-5'
            onClick={newTodo}
        >

            <div className='flex items-center gap-3 text-white cursor-pointer'>
                <GoPlus
                    name='AddNewTodo'
                    className='ml-10 text-white w-7 h-7'
                />
                Add new Todo</div>

            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setRegisterModal={setRegisterModal} />
            <RegisterModal registerModal={registerModal} setLoginModal={setLoginModal} setRegisterModal={setRegisterModal} />
        </div >
    )
}
