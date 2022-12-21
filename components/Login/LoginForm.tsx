import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { showLoginModalAtom, showRegisterModalAtom, showResetPasswordAtom } from "../../atoms";
import { login } from "../../firebase/authServices";
import { auth } from "../../firebase/firebaseConfig";

export const LoginForm = () => {

    const [, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [, setShowRegisterModal] = useAtom(showRegisterModalAtom)
    const [showResetpassword, setShowResetPassword] = useAtom(showResetPasswordAtom)
    const [authPersistence, setAuthPersistence] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = async (data: FieldValues) => {
        if (!authPersistence) { setPersistence(auth, browserSessionPersistence) }
        const response = await login(data.email, data.password)
        if (response === 'Firebase: Error (auth/invalid-email).') { alert('Wrong Email') }
        if (response === 'Firebase: Error (auth/wrong-password).') { alert('Wrong Password') }
        if (response === 'ok') {
            reset()
            setShowLoginModal(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
            </h1>

            <div>
                <div className="block mb-2">
                    <label className="text-sm text-gray-200" htmlFor="email">Your email</label>
                </div>

                <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    autoComplete="on"
                    {...register("email", { required: true })}
                    className="w-full p-3 text-sm text-gray-900 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />


            </div>

            <div>
                <div className="block mb-2">

                    <label
                        className="text-sm text-gray-200"
                        htmlFor="password">
                        Your password
                    </label>

                </div>


                <input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                    className="w-full p-3 text-sm text-gray-900 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />


            </div>

            <div className="flex items-center gap-2">

                <input
                    type="checkbox"
                    id="remember"
                    onClick={() => setAuthPersistence(!authPersistence)}
                    className="text-blue-600 bg-gray-700 border-gray-300 rounded-sm"

                />

                <label
                    className="text-sm text-gray-200"
                    htmlFor="remember">
                    Remember me
                </label>

            </div>

            <div className="w-full">
                <button
                    type="submit"
                    className="w-48 py-2 text-sm font-medium text-white bg-blue-600 rounded-md h-11 px-46 hover:bg-blue-700"
                >
                    Log in to your account
                </button>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => {
                        setShowLoginModal(false)
                        setShowResetPassword(true)
                    }}
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                    Lost Password?
                </button>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={(event) => {
                        event.preventDefault()
                        login("test@test.no", "abc123")
                        reset()
                        setShowLoginModal(false)
                    }}
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                    Login with testuser
                </button>
            </div>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{' '}
                <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                    onClick={() => {
                        setShowLoginModal(false)
                        setShowRegisterModal(true)
                    }}>
                    Create account
                </a>
            </div>
        </form>
    )
}


