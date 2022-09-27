import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { IoMdMoon } from 'react-icons/io';
import { IoMdSunny } from 'react-icons/io';


export const ThemeSwitch = () => {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark'
                ? <IoMdMoon />
                : <IoMdSunny />
            }
        </button>
    )
}