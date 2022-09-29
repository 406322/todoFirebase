import { useAtom } from "jotai"
import { loadingAtom } from "../atoms"
import { NavBar } from "../components/Navigation/NavBar"
import { useEffect } from "react"
import Image from "next/image"
import { BiPencil } from 'react-icons/bi';


const ProfilePage = () => {

    const [loading, setLoading] = useAtom(loadingAtom)

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <>
            <NavBar />

            <div className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900">

                <div className="flex justify-between mb-3">

                    <Image src="/dummy-profile-pic.png" width={96} height={96} className="rounded-full " />

                    <button
                        className="flex items-center h-10 gap-2 p-2 px-5 bg-blue-600 cursor-pointer rounded-3xl">
                        <BiPencil className="w-4 h-4" />
                        Edit
                    </button>

                </div>

                <div className="flex flex-col">
                    <p className="text-xs font-semibold text-gray-600">Name</p>
                    <p
                        id="name"
                        className="mt-0.5 text-md dark:text-white text-black  bg-gray-100 dark:bg-gray-900">
                        Ludwig Slettingdalen
                    </p>

                    <div className="flex gap-8 mt-8">
                        <div>
                            <p className="text-xs font-semibold text-gray-600">Phone</p>
                            <p
                                id="phone"
                                className="text-black bg-gray-100 rounded dark:bg-gray-900 dark:text-white ">
                                91520848
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-600">Email</p>
                            <p
                                id="email"
                                className="text-black bg-gray-100 rounded dark:text-white dark:bg-gray-900">
                                ludwig.slettingdalen@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
