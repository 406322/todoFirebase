import { useRef } from "react";
import Image from "next/image";


export const DropdownMenu = () => {
    const dropdownRef = useRef(null);

    return (
        <div
            className="absolute top-[58px] w-[300px] bg-[#242526] border border-[#474a4d] rounded-sm p-1 overflow-hidden "
            ref={dropdownRef}>
            <div className="w-full">

                <a className="h-[50px] flex items-center rounded-sm p-1">
                    <span className="mr-1"></span>
                    My Profile
                </a>

                <a className="h-[50px] flex items-center rounded-sm p-1">
                    <span className="mr-1">
                        <Image src="/icons/cog.svg" layout="fill" />
                    </span>
                    Settings
                </a>

            </div>
        </div>
    );
}