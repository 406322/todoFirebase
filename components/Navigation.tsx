import { onAuthStateChanged } from 'firebase/auth';
import { Dropdown, Avatar, Navbar } from 'flowbite-react'
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import { showLoginModalAtom, todosAtom, userAtom } from '../atoms';
import { logout } from '../firebase/authServices';
import { addTodo } from '../firebase/dbServices';
import { auth } from '../firebase/firebaseConfig';
import { Todo } from '../models/todo';
import { LoginModal } from './LoginModal';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { RegisterModal } from './RegisterModal';


let ProfilePicture = '/dummy-profile-pic.png';

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


    const newTodo = (event: any) => {
        event.preventDefault()
        if (!user) {
            setShowLoginModal(true)
        } else {
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
            addTodo(event, newTodo.todo, newTodo.isComplete, newTodo.isEdit, user.email, newTodo.id, newTodo.date)
        }
    }

    return (
        <div className="p-5 bg-slate-900">
            <LoginModal />
            <RegisterModal />

            <Navbar
                fluid={true}
                rounded={true}
            >
                <div
                    className='flex items-center gap-3 text-black cursor-pointer'
                    onClick={newTodo}>
                    <GoPlus
                        name='AddNewTodo'
                        className='ml-5 text-black w-7 h-7'
                    />
                    Add new Todo
                </div>
                <div className="flex md:order-2">

                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={ProfilePicture} rounded={true} />}
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

