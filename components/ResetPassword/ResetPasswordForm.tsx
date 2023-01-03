import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { showLoginModalAtom, showResetPasswordAtom } from "../../atoms";
import { FieldValues, useForm } from "react-hook-form";

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

            <Header>Lost Password</Header>

            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="email"
                    label={"Email"}
                />
                <TextInput
                    fieldName="email"
                    id="email"
                    type="text"
                    register={register}
                    errors={errors}
                    placeHolder="name@company.com"
                    isRequired={true}
                    maximLength={40}
                    minimLength={2}
                />
            </div>

            {message && <p>E-Mail sent. Please check your inbox</p>}

            <Button type="submit" variant="primary">Reset Password</Button>

            <div>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShowResetPassword(false)
                        setShowLoginModal(true)
                        setMessage(false)
                    }}
                >
                    Login to account
                </Button>

            </div>
        </form>
    )
}
