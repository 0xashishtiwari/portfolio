'use client'

import { GitHubCalendar } from 'react-github-calendar'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
export default function GitHubSection() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="border rounded-xl p-4 overflow-hidden bg-background shadow-sm">
            {mounted && (
                <GitHubCalendar
                    username="0xashishtiwari"
                    colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                    theme={{
                        light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#71717a", "#27272a",], 
                        dark: ["#18181b", "#3f3f46", "#71717a", "#a1a1aa", "#e4e4e7",],
                    }}
                />
            )}
        </div>
    )
}