import { useAtom } from 'jotai'
import { showLoginModalAtom, showRegisterModalAtom } from "../../atoms";
import { FieldValues, useForm } from "react-hook-form";
import { register as registerUser } from "../../firebase/authServices";

import { TextInput } from "flowbite-react";

import { Header } from "../FormComponents/Header";
import { Label } from "../FormComponents/Label";
import { Button } from "../FormComponents/Button";

export const RegisterForm = () => {

    const [loginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [registerModal, setShowRegisterModal] = useAtom(showRegisterModalAtom)


    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();

    const onSubmit = (data: FieldValues) => {
        registerUser(data.email, data.password)
        reset()
        setShowRegisterModal(false)
    }

    return (
        <form
            className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8"
            onSubmit={handleSubmit(onSubmit)}>

            <Header children={'Create an account'} />

            <div className='flex flex-col gap-2'>
                <Label
                    htmlFor="email"
                    label="Your email"
                />
                <TextInput
                    id="email"
                    placeholder="name@company.com"
                    type="email"
                    {...register("email", { required: true })}
                />
                {errors?.email?.type === "required" && <p>This field is required</p>}
            </div>


            <div className='flex flex-col gap-2'>
                <Label
                    htmlFor="registerPassword"
                    label="Password"
                />
                <TextInput
                    id="registerPassword"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors?.password?.type === "required" && <p>This field is required</p>}
                {errors?.password?.type === "minLength" && (<p>password cannot be less than 6 characters</p>)}
            </div>



            <div className='flex flex-col gap-2'>
                <Label
                    htmlFor="confirmPassword"
                    label="Confirm Password"
                />
                <TextInput
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        },
                    })}
                />
                {watch("confirmPassword") !== watch("password") &&
                    getValues("confirmPassword") ? (
                    <p>passwords do not match</p>
                ) : null}
            </div>



            <Button
                type="submit"
                variant="primary"
                children="Create an account"
            />

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already registered?{' '}
                <Button
                    variant="secondary"
                    children="Login to account"
                    onClick={() => {
                        setShowRegisterModal(false)
                        setShowLoginModal(true)
                    }}
                />
            </div>
        </form>
    )
}
