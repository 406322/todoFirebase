import { useAtom } from 'jotai';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { userAtom } from '../../atoms';
import { NavBar } from "../../components/Navigation/NavBar"
import { updateUserName } from '../../firebase/authServices';
import { useRouter } from "next/router";
import { auth } from '../../firebase/firebaseConfig';


const Edit = () => {

    const { handleSubmit, reset, register, formState: { errors } } = useForm()
    const router = useRouter()
    const user = auth.currentUser;

    if (!user) { router.push("/") }


    const onSubmit = async (data: any) => {
        try {
            if (data.name) { await updateUserName(user, data.name) }
            if (data.phone) { console.log('') }
            reset()
        } catch (error) {
            console.log(error)
        }
        router.push("/profile")
    }

    return (
        <>
            <NavBar />

            <form
                className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900"
                onSubmit={handleSubmit(onSubmit)}
            >

                <p className='mb-3 text-lg font-bold'>Edit info</p>

                <div className='flex flex-col'>
                    <label htmlFor="name" className='my-2 text-sm font-semibold text-gray-600 dark:text-gray-300'>Name</label>
                    <input
                        id='name'
                        type="text"
                        className='mb-2 rounded-md dark:bg-gray-800 dark:focus:bg-gray-900'
                        autoCorrect='false'
                        {...register("name")}
                    />
                </div>

                {/* <div className='flex flex-col'>
                    <label htmlFor="name" className='my-2 text-sm font-semibold text-gray-600 dark:text-gray-300'>Phone</label>
                    <input
                        type="text"
                        className='mb-2 rounded-md dark:bg-gray-800 dark:focus:bg-gray-900'
                        autoCorrect='false'
                        {...register("phone")}
                    />
                </div> */}

                <button
                    className='p-2 px-5 my-2 text-white bg-blue-600 rounded-md'
                >
                    Update
                </button>

                <Link href="/profile">
                    <button
                        className='p-2 px-5 m-2 text-white bg-red-500 rounded-md'
                    >
                        Cancel
                    </button>
                </Link>

            </form>
        </>
    )
}

export default Edit
