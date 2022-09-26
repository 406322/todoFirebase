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
        <nav className="navbar">

            <ul className="navbar-nav">

                <li className="nav-item">
                    <a href="#" className="icon-button" onClick={() => console.log('Pluss')}>
                        <Image src="/icons/plus.svg" height={30} width={30} />
                    </a>
                </li>

                <OutsideClickHandler
                    display="contents"
                    onOutsideClick={() => { setOpen(false) }}>
                    <li className="nav-item">
                        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                            <Image src="/icons/plus.svg" height={30} width={30} />
                        </a>
                        {open && <DropdownMenu></DropdownMenu>}
                    </li>
                </OutsideClickHandler>

            </ul>

        </nav>
    )
}



