'use client';

import { use, useEffect, useState } from "react";
import {Sun , Moon} from "lucide-react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        

        const storedTheme = localStorage.getItem("theme");
        if(storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }else if(storedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }else{
            // if no theme set it to light by default
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if(darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        }else{
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }

    }

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}