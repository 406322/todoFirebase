import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { showLoginModalAtom, showRegisterModalAtom, showResetPasswordAtom } from "../../atoms";
import { login } from "../../firebase/authServices";
import { auth } from "../../firebase/firebaseConfig";

import { Label } from "../FormComponents/Label";
import { Button } from "../FormComponents/Button";
import { TextInput } from "../FormComponents/TextInput";
import { Checkbox } from "../FormComponents/Checkbox";
import { Header } from "../FormComponents/Header";

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
                
            <Header children={'Sign in to our platform'} />

            <div className="flex flex-col gap-2">
                <Label htmlFor="email" label="Your email" />
                <TextInput
                    fieldName="email"
                    id="email"
                    type="text"
                    register={register}
                    errors={errors}
                    placeHolder="name@company.com"
                    isRequired={true}
                    maximLength={20}
                    minimLength={2}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password" label="Your password" />
                <TextInput
                    fieldName="password"
                    id="password"
                    type="password"
                    register={register}
                    errors={errors}
                    isRequired={true}
                    maximLength={20}
                    minimLength={2}
                />
            </div>

            <div className="flex items-center gap-2">
                <Label htmlFor={"remember"} label={"Remember me"} />
                <Checkbox 
                id={"remember"} 
                onClick={() => setAuthPersistence(!authPersistence)} 
                />
            </div>

            <div className="w-full">
                <Button
                    children={'Log in to your account'}
                    type="submit"
                    variant="primary"
                />
            </div>

            <div className="flex justify-between">
                <Button
                    children={'Lost Password?'}
                    variant="secondary"
                    onClick={() => {
                        setShowLoginModal(false)
                        setShowResetPassword(true)
                    }}
                />

            </div>

            <div className="flex justify-between">
                <Button
                    children={'Login with testuser'}
                    variant="secondary"
                    onClick={(event) => {
                        event.preventDefault()
                        login("test@test.no", "abc123")
                        reset()
                        setShowLoginModal(false)
                    }}
                />
            </div>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{' '}
                <Button
                    children={'Create account'}
                    variant="secondary"
                    onClick={() => {
                        setShowLoginModal(false)
                        setShowRegisterModal(true)
                    }}
                />
            </div>
        </form>
    )
}


