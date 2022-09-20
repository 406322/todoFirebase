import { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { register } from "../firebase/authServices";
import { auth } from "../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom, showLoginModalAtom, showRegisterModalAtom } from "../atoms";
import { SignupInputs } from "../models/todo";

export const RegisterForm = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [registerModal, setShowRegisterModal] = useAtom(showRegisterModalAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User | null) => {
            if (currentUser) { setUser(currentUser) }
        });
    }, [])

    const [formValue, setFormValue] = useState({
        registerEmail: "",
        registerPassword: "",
        confirmPassword: ""
    });

    const { registerEmail, registerPassword, confirmPassword } = formValue

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState: SignupInputs) => {
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

    const passwordMatchCheck = () => { return registerPassword === confirmPassword }
    const passwordLengthCheck = () => { return registerPassword.length < 5 }

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault()
        if (!passwordMatchCheck()) { alert('Passwords not matching') }
        if (!passwordLengthCheck()) { alert('Password need to be at least 6 characters') }
        else {
            console.log('Hei')
            register(registerEmail, registerPassword)
            resetForm()
            setShowRegisterModal(false)
        }
    }

    const backToLogin = () => {
        setShowRegisterModal(false)
        setShowLoginModal(true)
    }

    return (
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
                    onClick={backToLogin}>
                    Login to account
                </a>
            </div>
        </form>
    )
}
