import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { showLoginModalAtom, showResetPasswordAtom } from "../../atoms";
import { FieldValues, useForm } from "react-hook-form";

// import { TextInput } from "flowbite-react";

import { Header } from "../FormComponents/Header";
import { Label } from "../FormComponents/Label";
import { TextInput } from "../FormComponents/TextInput";
import { Button } from "../FormComponents/Button";


export const ResetPasswordForm = () => {

    const [loginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [message, setMessage] = useState(false)
    const [showResetpassword, setShowResetPassword] = useAtom(showResetPasswordAtom)

    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();

    const onSubmit = async (data: FieldValues) => {
        await sendPasswordResetEmail(auth, data.email)
            .then(() => {
                reset()
                setMessage(true)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/user-not-found') {
                    alert('Email not found')
                }
                reset()

            });
    }

    return (
        <form
            className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8"
            onSubmit={handleSubmit(onSubmit)}>

            <Header children={'Lost Password'} />

            <div>
                <div className="block mb-2">
                    <Label
                        htmlFor="email"
                        label={"Email"}
                    />
                </div>

                {/* <TextInput
                    id="email"
                    placeholder="name@company.com"
                    type="email"
                    {...register("email", { required: true })}
                />
                {errors?.email?.type === "required" && <p>This field is required</p>} */}
                
                <TextInput />   



                
            </div>

            {message && <p>E-Mail sent. Please check your inbox</p>}

            <Button type="submit" children={'Reset Password'} variant="primary" />

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <Button 
                children={'Login to account'} 
                variant="secondary"
                onClick={() => {
                    setShowResetPassword(false)
                    setShowLoginModal(true)
                    setMessage(false)
                }}
                />
            </div>
        </form>
    )
}
