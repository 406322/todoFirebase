import { useState, useEffect } from 'react'
import Link from 'next/link'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    interface Signup {
        email: string,
        password: string
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

    const signUp = (event: React.FormEvent) => {
        event.preventDefault()
        const email = formValue.email
        const password = formValue.password
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log('user created:', cred.user)
                setFormValue({ email: "", password: "" })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div>
            <form onSubmit={signUp} className='flex flex-col items-center justify-center gap-3 mt-10'>
                <label>email:</label>
                <input
                    className='border'
                    type="text"
                    name='email'
                    onChange={handleChange} />
                <label>password:</label>
                <input className='border' type="text" name='password' onChange={handleChange} />
                <button className='p-1 bg-green-400 rounded-sm' type='submit'>signup</button>
                <Link href="/">Back to home</Link>
                <input type="text" placeholder="Type here" className="w-full max-w-xs input input-bordered" />
            </form>



        </div>
    )
}

export default Signup
