import React from 'react'

export const SignUp = () => {
    return (
        <div>
            <form>
                <label>email</label>
                <input type="email" name='email' />
                <label>password</label>
                <input type="password" name='password' />
                <button>signup</button>
            </form>

        </div>
    )
}
