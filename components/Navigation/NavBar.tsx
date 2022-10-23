import { loadingAtom, openAtom, showLoginModalAtom, todosAtom, userAtom } from '../../atoms'
import { useAtom } from 'jotai'
import { DropdownMenu } from './DropdownMenu';
import { GoPlus } from 'react-icons/go';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { ThemeSwitch } from '../themeSwitch';
import { MdApps } from 'react-icons/md';
import { Todo } from '../../models/todo';
import { addTodo } from '../../firebase/dbServices';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { Spinner } from './Spinner';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useOutsideClick } from './customHooks';


export const NavBar = () => {

    const [open, setOpen] = useAtom(openAtom)
    const [user, ] = useAtom(userAtom);
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [todos, setTodos] = useAtom(todosAtom);
    const [isLoading, setIsLoading] = useAtom(loadingAtom)

    const router = useRouter()

    const isHomepage = () => { return router.pathname === '/' }

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

    const handleClickOutside = () => setOpen(false)

    const ref = useOutsideClick(handleClickOutside)

    return (
        <div className="flex h-16 bg-gray-100 border-gray-300 border-b-1 px-9 dark:bg-gray-900">

            <Link href="/">
                <a className='flex flex-col justify-center'>
                    <h1 className='text-2xl font-bold bg-gray-100 dark:bg-gray-900'>Home</h1>
                </a>
            </Link>

            <div className="flex justify-end w-full h-full gap-3">

                {isLoading
                    ? <div className='flex items-center'>
                        <Spinner />
                    </div>
                    : null
                }

                {isHomepage()
                    ? <div
                        id='PlusIcon'
                        className="flex items-center justify-center">
                        <div
                            className="flex items-center justify-center w-10 h-10 border border-black rounded-full dark:border-white"
                            onClick={newTodo}>
                            <GoPlus />
                        </div>
                    </div>
                    : null
                }

                <div
                    id='ThemeSwitch'
                    className="flex items-center justify-center">
                    <div id='ThemeSwitch'
                        className="flex items-center justify-center w-10 h-10 border border-black rounded-full dark:border-white">
                        <ThemeSwitch />
                    </div>
                </div>

                <div
                    id='AppsButton'
                    className="flex items-center justify-center">
                    <div
                        className="flex items-center justify-center w-10 h-10 border border-black rounded-full dark:border-white"
                        onClick={() => console.log('Not implemented')}>
                        <MdApps />
                    </div>
                </div>

                <div
                    id='Dropdown'
                    className="flex items-center justify-center "
                    ref={ref}>
                    <div
                        className="flex items-center justify-center w-10 h-10 border border-black rounded-full dark:border-white"
                        onClick={() => setOpen(!open)}

                    >
                        <BsFillCaretDownFill />
                    </div>
                    {open && <DropdownMenu></DropdownMenu>}
                </div>
            </div>
        </div>
    )
}



