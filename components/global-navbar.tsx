"use client"

import Link from "next/link"
import { SearchCommand } from "@/components/search-command"
import { usePathname } from "next/navigation"
import { NavRankBadge } from "@/components/leaderboard/nav-rank-badge"

export function GlobalNavbar() {
    const pathname = usePathname()

    // Optional: Hide navbar on specific paths if needed, e.g. if root is strictly login
    // if (pathname === '/') return null 

    return (
        <nav className="border-b sticky top-0 z-50 w-full bg-white">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
                <div className="flex items-center gap-6 md:gap-8">
                    <Link href="/" className="flex items-center gap-2 font-bold pointer-events-auto">
                        <span className="text-xl tracking-tight">Bounties</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/bounty" className={pathname?.startsWith('/bounty') ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                            Explore
                        </Link>
                        <Link href="/projects" className={pathname?.startsWith('/projects') ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                            Projects
                        </Link>
                        <Link href="/leaderboard" className={pathname?.startsWith('/leaderboard') ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                            Leaderboard
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <NavRankBadge userId="user-1" className="hidden sm:flex" /> {/* TODO: Replace with actual auth user ID */}
                    <SearchCommand />
                </div>
            </div>
        </nav>
    )
}
