import { useRef } from "react";
import Image from "next/image";
import { GoPlus } from 'react-icons/go';
import { BiCog } from 'react-icons/bi';



export const DropdownMenu = () => {
    const dropdownRef = useRef(null);

    return (
        <div
            className=" absolute right-1 top-[58px] w-[300px] bg-gray-900 border border-gray-800 rounded-sm p-1  z-10 "
            ref={dropdownRef}>
            <div className="w-full">

                <a className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-800 cursor-pointer">
                    <span className="mr-1"></span>
                    <Image src="/dummy-profile-pic.png" width={32} height={32} className="rounded-full" />
                    My Profile
                </a>

                <a className="h-[50px] flex items-center rounded-sm p-1 gap-1 hover:bg-gray-800 cursor-pointer">
                    <span className="mr-1"></span>
                    <BiCog className="w-8 h-8" />
                    Settings
                </a>

            </div>
        </div>
    );
}