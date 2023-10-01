"use client"
import { useTheme } from "next-themes"
import LightModeIcon from "/public/icons/LightModeIcon";
import DarkModeIcon from "/public/icons/DarkModeIcon";
import { useState } from "react";
import Link from "next/link";

export function ToggleTheme() {
    const { setTheme } = useTheme()
    const [themeStatus, setThemeStatus] = useState('light')

    const lightTheme = (e) => {
        e.preventDefault()
        setTheme("dark")
        setThemeStatus("dark")
    }

    const darkTheme = (e) => {
        e.preventDefault()
        setTheme("light")
        setThemeStatus("light")
    }

    return (
        <div>
            {
                themeStatus == 'light' ? (
                    <Link href="/" onClick={lightTheme}>
                        <LightModeIcon />
                    </Link>
                )
                    :
                    (
                        <Link href="/" onClick={darkTheme}>
                            <DarkModeIcon />
                        </Link>
                    )
            }

        </div>
    )
}
