import React from 'react'

export const TopNav = () => {
    return (
        <div className='flex justify-between'>
            <h1 className="p-5 text-3xl font-bold text-white bg-[#201c1b]">
                TodoList
            </h1>
            <button className='p-5 text-white'>+ Add Todo</button>
        </div>
    )
}
