import { useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { addTodo } from '../firebase/dbServices';
import { GoPlus } from 'react-icons/go';
import { useAtom } from 'jotai'
import { userAtom } from "../atoms";
import { loginModalAtom } from '../atoms';
import { Dropdown } from './DropDown';

export const TopNav = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setLoginModal] = useAtom(loginModalAtom)

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
        addTodo(event, data.todo, data.isComplete, data.isEdit, user.email)
    }

    return (
        <div
            className='flex items-center justify-between mx-5 mb-5'
        >
            <div
                className='flex items-center gap-3 text-white cursor-pointer'
                onClick={newTodo}>
                <GoPlus
                    name='AddNewTodo'
                    className='ml-10 text-white w-7 h-7'
                />
                Add new Todo
            </div>
            <Dropdown />
            <LoginModal />
            <RegisterModal />
        </div >
    )
}
