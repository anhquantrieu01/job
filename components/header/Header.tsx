import Link from "next/link"
import MobileMenu from "./MobileMenu"
import SearchBar from "./SearchBar"
import { UserAvatar } from "@/components/UserAvatar"
import UserNotificationBell from "./UserNotificationBell"
import { auth } from "@/auth"

export default async function Header() {
  const session = await auth();
  return (
    <header className="w-full border-b bg-green-600 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            JobFinder
          </Link>

          {/* Search desktop */}
          <div className="hidden flex-1 px-6 md:block">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/jobs" className="hover:text-green-200 whitespace-nowrap">
              Việc làm
            </Link>

            

            {/* Avatar */}
            <UserAvatar />
            {session?.user && <UserNotificationBell />}
          </nav>

          {/* Mobile */}
          <div className="flex items-center space-x-3 md:hidden">
            <UserAvatar />

            <MobileMenu />

          </div>

        </div>
      </div>
    </header>
  )
}