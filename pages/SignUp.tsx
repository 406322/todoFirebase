import { useState, useEffect } from 'react'
import Link from 'next/link'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { register, login, logout } from '../firebase/authServices'
import React from 'react'


const Signup = () => {

    const [user, setUser] = useState<any>({});

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

    const { loginEmail, loginPassword, registerEmail, registerPassword } = formValue

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

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault()
        register(registerEmail, registerPassword)
        let resetForm = event.target as HTMLFormElement
        resetForm.reset()
    }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        login(loginEmail, loginPassword)
        let resetForm = event.target as HTMLFormElement
        resetForm.reset()
    }

    const onClose = () => {
        console.log('Close')
    }

    const onClick = () => {
        console.log('Click')
    }

    return (
        <div className='flex flex-col items-center gap-5 text-center'>

            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-2"
            >
                <header className='mb-3 font-bold'> Login </header>
                <input
                    placeholder="Email..."
                    className="w-full mb-2 input input-bordered"
                    name='loginEmail'
                    type="email"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password..."
                    className="w-full max-w-xs input input-bordered"
                    name='loginPassword'
                    type="password"
                    onChange={handleChange}
                />
                <button
                    className="btn"
                    type='submit'>
                    Login
                </button>
            </form>

            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-2">
                <header className='my-3 font-bold'> Register User </header>
                <input
                    placeholder="Email..."
                    name='registerEmail'
                    type="email"
                    className="w-full max-w-xs mb-2 input input-bordered"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password..."
                    name='registerPassword'
                    type="password"
                    className="w-full max-w-xs input input-bordered"
                    onChange={handleChange}
                />

                <button
                    className="block btn"
                    type='submit'>
                    Create User
                </button>
            </form>

            {user && <p> Currently logged in as: </p>}
            {user?.email}

            {user &&
                <button
                    className="btn"
                    onClick={logout}>
                    Sign Out
                </button>}

            <div>
                <Link href="/">Back to home</Link>
            </div>



        </div>

    )
}

export default Signup
