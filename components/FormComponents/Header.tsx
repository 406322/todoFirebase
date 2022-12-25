import React from 'react'

interface HeaderProps {
    children: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
    return (
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
            {children}
        </h1>
    )
}
