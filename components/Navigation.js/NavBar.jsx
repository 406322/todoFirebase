import React from "react";
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { openAtom } from '../../atoms'
import { useAtom } from 'jotai'
import { DropdownMenu } from './DropdownMenu';
import OutsideClickHandler from 'react-outside-click-handler';
import Image from "next/image";

export const NavBar = () => {

    const [open, setOpen] = useAtom(openAtom);

    return (
        <nav className="h-[60px] bg-white dark:bg-gray-700 px-1 border-b-2 border-white">

            <ul className="flex justify-end h-full max-w-full">

                <li className="w-[48px] flex justify-center items-center">
                    <a href="#" className="w-[30px] h-[30px] bg-[#484a4d] rounded-full p-[5px] m-[2px] flex justify-center items-center" onClick={() => console.log('Pluss')}>
                        <Image src="/icons/plus.svg" layout="fill" />
                    </a>
                </li>

                <OutsideClickHandler
                    display="contents"
                    onOutsideClick={() => { setOpen(false) }}>
                    <li className="w-[48px] flex justify-center items-center">
                        <a href="#" className="w-[30px] h-[30px] bg-[#484a4d] rounded-full p-[5px] m-[2px] flex justify-center items-center" onClick={() => setOpen(!open)}>
                            <Image src="/icons/plus.svg" layout="fill" />
                        </a>
                        {open && <DropdownMenu></DropdownMenu>}
                    </li>
                </OutsideClickHandler>

            </ul>

        </nav>
    )
}



