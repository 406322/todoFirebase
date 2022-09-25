import { useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom, showLoginModalAtom, showRegisterModalAtom } from "../../atoms";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../../firebase/authServices";


export const RegisterForm = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [registerModal, setShowRegisterModal] = useAtom(showRegisterModalAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User | null) => {
            if (currentUser) { setUser(currentUser) }
        });
    }, [])

    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
        registerUser(data.email, data.password)
        reset()
        setShowRegisterModal(false)
    }

    return (
        <form
            className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8"
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create and account
            </h3>
            <div>
                <div className="block mb-2">
                    <Label
                        htmlFor="email"
                        value="Your email"
                    />
                </div>
                <TextInput
                    id="email"
                    placeholder="name@company.com"
                    type="email"
                    {...register("email", { required: true })}
                />
                {errors?.email?.type === "required" && <p>This field is required</p>}
            </div>

            <div>
                <div className="block mb-2">
                    <Label
                        htmlFor="registerPassword"
                        value="Password"
                    />
                </div>
                <TextInput
                    id="registerPassword"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors?.password?.type === "required" && <p>This field is required</p>}
                {errors?.password?.type === "minLength" && (<p>password cannot be less than 6 characters</p>)}
            </div>

            <div>
                <div className="block mb-2">
                    <Label
                        htmlFor="confirmPassword"
                        value="Confirm Password"
                    />
                </div>
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

            <Button type="submit">
                Create an account
            </Button>


            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already registered?{' '}
                <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                    onClick={() => {
                        setShowRegisterModal(false)
                        setShowLoginModal(true)
                    }}>
                    Login to account
                </a>
            </div>
        </form>
    )
}
