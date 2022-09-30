import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteUseraccount } from "../../firebase/authServices";
import { useRouter } from "next/router";
import { auth } from "../../firebase/firebaseConfig";


const Delete = () => {

    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm()
    const [showMessage, setShowMessage] = useState(false)
    const router = useRouter()
    const user = auth.currentUser;

    if (!user) { router.push("/") }


    const onSubmit = (data: any) => {
        if (data.delete !== "delete my account") { setShowMessage(true) }
        else {
            deleteUseraccount()
            router.push("/profile")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900">

            <header
                className="mb-5 text-3xl font-bold text-center">
                Are you sure you want to delete your account?
            </header>

            <p className="mb-5 text-center text-red-500">Your account and all your data will be deleted</p>

            <label
                htmlFor="delete"
                className="text-sm text-gray-200"
            >
                To verify, type delete my account:
            </label>
            <input
                className='w-full mb-2 rounded-md dark:bg-gray-800 dark:focus:bg-gray-900'
                type="text"
                placeholder="delete my account"
                autoCorrect="false"
                onFocus={() => setShowMessage(false)}
                {...register("delete", { required: true })}
            />
            {errors?.delete?.type === "required" && <p className="mb-3 text-sm text-red-500">This field is required</p>}
            {showMessage ? <p className="mb-3 text-sm text-red-500">Type "Delete my account"</p> : null}

            <button
                type="submit"
                className="p-2 px-5 text-white bg-red-500 rounded-md">
                Delete My Account
            </button>

            <Link href="/profile">
                <button
                    className='p-2 px-5 m-2 text-white bg-white border rounded-md border-gray-50 dark:bg-gray-900'
                >
                    Cancel
                </button>
            </Link>


        </form>
    )
}

export default Delete