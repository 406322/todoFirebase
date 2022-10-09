import { browserSessionPersistence, onAuthStateChanged, setPersistence, User } from "firebase/auth";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { showLoginModalAtom, showRegisterModalAtom, showResetPasswordAtom, userAtom } from "../../atoms";
import { login } from "../../firebase/authServices";
import { auth } from "../../firebase/firebaseConfig";

export const LoginForm = () => {

    const [, setUser] = useAtom(userAtom);
    const [, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [, setShowRegisterModal] = useAtom(showRegisterModalAtom)
    const [showResetpassword, setShowResetPassword] = useAtom(showResetPasswordAtom)
    const [authPersistence, setAuthPersistence] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User | null) => {
            setUser(currentUser);
        });
    }, [])

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
                    <Label
                        htmlFor="email"
                        value="Your email"
                    />
                </div>
                <TextInput
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="on"
                    {...register("email", { required: true })}
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
                    required={true}
                    {...register("password", { required: true })}
                />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="remember"
                    onClick={() => setAuthPersistence(!authPersistence)} />
                <Label htmlFor="remember">
                    Remember me
                </Label>
            </div>

            <div className="w-full">
                <Button
                    type="submit">
                    Log in to your account
                </Button>
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


