import React from 'react'
import Link from 'next/link'

const SignUp = () => {
    return (
        <div>
            <form className='flex flex-col items-center justify-center gap-3 mt-10'>
                <div>
                    <label>email:</label>
                    <input className='border' type="email" name='email' />
                </div>
                <div>
                    <label>password:</label>
                    <input className='border' type="password" name='password' />
                </div>
                <button className='p-1 bg-green-400 rounded-sm'>signup</button>
                <Link href="/">Back to home</Link>
            </form>

        </div>
    )
}

export default SignUp
