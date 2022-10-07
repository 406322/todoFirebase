import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { NavBar } from "../../components/Navigation/NavBar"
import { updateUserName } from '../../firebase/authServices';
import { useRouter } from "next/router";
import { auth } from '../../firebase/firebaseConfig';
import ImageUpload from "../../components/image/imageUpload";
import { imageAtom, showImageUploadAtom, userAtom } from '../../atoms';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { addImageToDB } from '../../firebase/dbServices';
import { updateUserPhoto } from '../../firebase/authServices';
import { onAuthStateChanged } from 'firebase/auth';


const Edit = () => {

    const { handleSubmit, reset, register, setFocus, formState: { errors } } = useForm()
    const router = useRouter()
    const [showImageUpload, setShowImageUpload] = useAtom(showImageUploadAtom)
    const [image, setImage] = useAtom(imageAtom);
    const [user, setUser] = useAtom(userAtom)

    const bilde = "/dummy-profile-pic.png"


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
    }, [])

    useEffect(() => {
        console.log(user.photoURL)
    }, []);


    useEffect(() => {
        setFocus("name")
    }, [setFocus]);


    const onSubmit = async (data: any) => {
        try {
            if (data.name) { await updateUserName(user, data.name) }
            if (image && user) {
                updateUserPhoto(image)
            }
            reset()
        } catch (error) {
            console.log(error)
        }
        router.push("/profile")
    }

    return (
        <>
            <NavBar />
            <ImageUpload />

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


            <div className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900">
                <button
                    className='p-2 px-5 m-2 text-white bg-red-500 rounded-md'
                    onClick={() => setShowImageUpload(true)}
                >
                    Upload Image
                </button>
                {user.photoURL
                    ? <Image src={user.photoURL} width={96} height={96} className="rounded-full " />
                    : <Image src={bilde} width={96} height={96} className="rounded-full " />
                }

            </div>

        </>
    )
}

export default Edit
