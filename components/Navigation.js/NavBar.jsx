import { openAtom } from '../../atoms'
import { useAtom } from 'jotai'
import { DropdownMenu } from './DropdownMenu';
import OutsideClickHandler from 'react-outside-click-handler';
import { GoPlus } from 'react-icons/go';
import { BsFillCaretDownFill } from 'react-icons/bs';


export const NavBar = () => {

    const [open, setOpen] = useAtom(openAtom);

    return (
        <div className="h-16 pr-5 bg-white border-b-2 border-white dark:bg-gray-900">

            <div className="flex justify-end w-full h-full">

                <div className="flex items-center justify-center w-16">
                    <div
                        className="w-10 h-10 bg-[#484a4d] rounded-full flex justify-center items-center"
                        onClick={() => console.log('Pluss')}>
                        <GoPlus />
                    </div>
                </div>

                <OutsideClickHandler
                    display="contents"
                    onOutsideClick={() => { setOpen(false) }}>
                    <div
                        className="flex items-center justify-center ">
                        <div
                            className="w-10 h-10 bg-[#484a4d] rounded-full flex justify-center items-center"
                            onClick={() => setOpen(!open)}
                        >
                            <BsFillCaretDownFill />
                        </div>
                        {open && <DropdownMenu></DropdownMenu>}
                    </div>
                </OutsideClickHandler>

            </div>

        </div>
    )
}



