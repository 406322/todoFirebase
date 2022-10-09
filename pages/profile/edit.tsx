import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { NavBar } from "../../components/Navigation/NavBar"
import { updateUserName } from '../../firebase/authServices';
import { useRouter } from "next/router";
import { auth } from '../../firebase/firebaseConfig';
import { ImageUpload } from "../../components/imageUpload"
import { userAtom } from '../../atoms';
import { useAtom } from 'jotai';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { uploadToStorage } from '../../firebase/storageServices';


const Edit = () => {

    const { handleSubmit, reset, register, setFocus, formState: { errors } } = useForm()
    const router = useRouter()
    const [user, setUser] = useAtom(userAtom)
    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
    }, [])

    useEffect(() => {
        setFocus("name")
    }, [setFocus]);


    const getBase64 = (file: File) => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result)
            };
            reader.readAsDataURL(file);
        })
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files![0]
        if (!file) return
        const base64 = await getBase64(file)
        setPreview(base64 as string);
        setFile(file)
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            if (data.name) { await updateUserName(user, data.name) }
            if (file) {
                const downloadURL = await uploadToStorage(file)
                await updateProfile(user, { photoURL: downloadURL as string })
            }
            router.push("/profile")
            reset()
        } catch (error) { console.log(error) }
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

                <div className='flex flex-col mb-2'>
                    <label className='my-2 text-sm font-semibold text-gray-600 dark:text-gray-300'>Profile Photo</label>
                    <ImageUpload handleChange={handleChange} preview={preview} setPreview={setPreview} />
                </div>

                <button className='p-2 px-5 my-2 text-white bg-blue-600 rounded-md'>
                    Update
                </button>

                <Link href="/profile">
                    <button className='p-2 px-5 m-2 text-white bg-red-500 rounded-md'>
                        Cancel
                    </button>
                </Link>

            </form>
        </>
    )
}

export default Edit
