import { onAuthStateChanged } from "firebase/auth";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { register } from "../firebase/authServices";
import { auth } from "../firebase/firebaseConfig";


export const RegisterModal = ({ registerModal, setRegisterModal }: { registerModal: boolean, setRegisterModal: Dispatch<SetStateAction<boolean>> }) => {

    const [user, setUser] = useState<any>({});

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
        } else {
            register(registerEmail, registerPassword)
            resetForm()
            setRegisterModal(false)
        }
    }

    return (
        <>
            <Modal
                show={registerModal}
                size="md"
                popup={true}
                onClose={() => setRegisterModal(!registerModal)}
            >
                <Modal.Header />
                <Modal.Body>
                    <form className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
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


                        <div className="w-full">
                            <Button type="submit" onClick={handleRegister}>
                                Create an account
                            </Button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
