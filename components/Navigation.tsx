import { useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import { Dropdown, Avatar, Navbar } from 'flowbite-react'
import { useAtom } from 'jotai';
import { showLoginModalAtom, todosAtom, userAtom } from '../atoms';
import { Todo } from '../models/todo';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../firebase/authServices';
import { addTodo } from '../firebase/dbServices';
import { auth } from '../firebase/firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { ThemeSwitch } from './themeSwitch';
import { MdApps } from 'react-icons/md';
import { ResetPasswordModal } from './ResetPasswordModal';


export const Navigation = () => {

    const [user, setUser] = useAtom(userAtom);
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [todos, setTodos] = useAtom(todosAtom);


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const handleLogout = () => {
        logout()
        setShowLoginModal(false)
        setTodos([])
    }

    const newTodo = (event: React.FormEvent) => {
        if (!user) { setShowLoginModal(true) }
        else {
            const newTodo: Todo = {
                todo: "",
                isComplete: false,
                isEdit: true,
                id: uuidv4(),
                user: user.email,
                date: Timestamp.now()
            }
            todos.unshift(newTodo)
            setTodos([...todos])
            addTodo(event, newTodo)
        }
    }

    return (
        <div className="p-5 bg-white dark:bg-gray-900">
            <LoginModal />
            <RegisterModal />
            <ResetPasswordModal />

            <Navbar
                fluid={true}
                rounded={true}
            >

                <div
                    id='Header'
                    className='flex items-center gap-3 text-white dark:text-black'>
                    <h1 className='text-2xl font-bold text-black dark:text-white'>Todo</h1>
                </div>


                <div className="flex gap-3 md:order-2">

                    <div
                        id='AddTodoButton'
                        className='flex items-center'
                        onClick={newTodo}>
                        <GoPlus
                            name='AddNewTodo'
                            className='text-black dark:text-white w-7 h-7'
                        />
                    </div>

                    <div
                        id="AppsButton"
                        className='flex items-center text-white cursor-pointer dark:text-black '>
                        <MdApps
                            className='text-black dark:text-white w-7 h-7'
                        />
                    </div>

                    <div id='ThemeSwitch'
                        className="mt-2">
                        <ThemeSwitch />
                    </div>

                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img='/dummy-profile-pic.png' rounded={true} />}
                    >
                        {user &&
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.email}
                                </span>
                                <span className="block text-sm font-medium truncate">
                                </span>
                            </Dropdown.Header>
                        }

                        <Dropdown.Divider />
                        {user
                            ? <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                            : <Dropdown.Item onClick={() => setShowLoginModal(true)}>Sign inn</Dropdown.Item>
                        }
                    </Dropdown>

                </div>


            </Navbar >

        </div >
    )
}

