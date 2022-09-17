import { onAuthStateChanged } from "firebase/auth";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { login, logout } from "../firebase/authServices";
import { auth } from "../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom } from "../atoms";
import { loginModalAtom } from '../atoms';
import { registerModalAtom } from '../atoms';


export const LoginModal = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setLoginModal] = useAtom(loginModalAtom)
    const [registerModal, setRegisterModal] = useAtom(registerModalAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])

    const [formValue, setFormValue] = useState({
        loginEmail: "",
        loginPassword: "",
        registerEmail: "",
        registerPassword: ""
    });

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])

    const { loginEmail, loginPassword } = formValue

    interface Signup {
        loginEmail: string,
        loginPassword: string,
        registerEmail: string,
        registerPassword: string
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState: Signup) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const resetForm = () => {
        setFormValue({
            loginEmail: "",
            loginPassword: "",
            registerEmail: "",
            registerPassword: ""
        })
    }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        login(loginEmail, loginPassword)
        resetForm()
        setLoginModal(false)
    }

    const handleRegister = () => {
        setLoginModal(false)
        setRegisterModal(true)
    }

    return (
        <>
            <div className='flex gap-5 p-5 text-white'>
                {user && <p className='text-white'>{user.email}</p>}
                {user
                    ? <p className='text-white cursor-pointer' onClick={logout}>Sign out</p>

                    : <button onClick={() => setLoginModal(!loginModal)}>
                        Sign in
                    </button>
                }
            </div>
            <Modal
                show={loginModal}
                size="md"
                popup={true}
                onClose={() => { user && setLoginModal(!loginModal) }}
            >
                <Modal.Header />
                <Modal.Body>
                    <form className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Sign in to our platform
                        </h3>
                        <div>
                            <div className="block mb-2">
                                <Label
                                    htmlFor="email"
                                    value="Your email"
                                />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@company.com"
                                name="loginEmail"
                                onChange={handleChange}
                                required={true}
                                value={loginEmail}
                            />
                        </div>
                        <div>
                            <div className="block mb-2">
                                <Label
                                    htmlFor="password"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="loginPassword"
                                onChange={handleChange}
                                required={true}
                                value={loginPassword}
                            />
                        </div>
                        <div className="w-full">
                            <Button type="submit" onClick={handleLogin}>
                                Log in to your account
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => alert('Not implemented')}
                                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Lost Password?
                            </button>
                        </div>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{' '}
                            <a
                                href="#"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                                onClick={handleRegister}
                            >
                                Create account
                            </a>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
