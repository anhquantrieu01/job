"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!search) return

    const t = setTimeout(() => {
      router.push(`/jobs?search=${encodeURIComponent(search)}`)

      // ✅ clear ngay sau khi navigate
      setSearch("")
    }, 500)

    return () => clearTimeout(t)
  }, [search, router])

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search jobs..."
      className="w-full px-4 py-2.5 bg-white text-green-600 rounded-full border border-green-300 focus:ring-2 focus:ring-green-400 outline-none"
    />
  )
}