import React from "react";
import { useRef } from "react";
import { ReactComponent as CogIcon } from '../../icons/cog.svg';


export const DropdownMenu = () => {
    const dropdownRef = useRef(null);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="menu">

                <a className="menu-item">
                    <span className="icon-button"></span>
                    My Profile
                </a>

                <a className="menu-item">
                    <span className="icon-button"><CogIcon /></span>
                    Settings
                </a>

            </div>
        </div>
    );
}