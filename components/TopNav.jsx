import React from 'react'
import Link from 'next/link';

export const TopNav = () => {
    return (
        <div className='flex justify-between'>
            <h1 className="p-5 text-3xl font-bold text-white bg-[#201c1b]">
                TodoList
            </h1>

            <Link href="/signup">
                <a className="m-5 text-white">Sign up</a>
            </Link>

        </div >
    )
}
