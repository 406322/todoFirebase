import { onAuthStateChanged } from "firebase/auth";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { register } from "../firebase/authServices";
import { auth } from "../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom } from "../atoms";
import { loginModalAtom } from '../atoms';
import { registerModalAtom } from '../atoms';


export const RegisterModal = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setLoginModal] = useAtom(loginModalAtom)
    const [registerModal, setRegisterModal] = useAtom(registerModalAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])

    const [formValue, setFormValue] = useState({
        registerEmail: "",
        registerPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, [])

    const { registerEmail, registerPassword, confirmPassword } = formValue

    interface Signup {
        registerEmail: string,
        registerPassword: string,
        confirmPassword: string
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
            registerEmail: "",
            registerPassword: "",
            confirmPassword: ""
        })
    }

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault()
        if (registerPassword !== confirmPassword) {
            alert('Passwords not matching')
        }
        if (registerPassword.length < 5) {
            alert('Password need to be at least 6 characters')
        } else {
            register(registerEmail, registerPassword)
            resetForm()
            setRegisterModal(false)
        }
    }

    const backToLogin = () => {
        setRegisterModal(false)
        setLoginModal(true)
    }

    return (
        <>
            <Modal
                show={registerModal}
                size="md"
                popup={true}
                onClose={() => user && setRegisterModal(!registerModal)}
            >
                <Modal.Header />
                <Modal.Body>
                    <form
                        className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8"
                        onSubmit={handleRegister}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Create and account
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
                                type="email"
                                name="registerEmail"
                                onChange={handleChange}
                                required={true}
                                value={registerEmail}
                            />
                        </div>

                        <div>
                            <div className="block mb-2">
                                <Label
                                    htmlFor="registerPassword"
                                    value="Password"
                                />
                            </div>
                            <TextInput
                                id="registerPassword"
                                type="password"
                                name="registerPassword"
                                onChange={handleChange}
                                required={true}
                                value={registerPassword}
                            />
                        </div>

                        <div>
                            <div className="block mb-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    value="Confirm Password"
                                />
                            </div>
                            <TextInput
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                required={true}
                                value={confirmPassword}
                            />
                        </div>

                        <Button type="submit">
                            Create an account
                        </Button>


                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already registered?{' '}
                            <a
                                href="#"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                                onClick={backToLogin}
                            >
                                Login to account
                            </a>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
