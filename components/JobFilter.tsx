"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function JobFilter({
  locations,
}: {
  locations: { id: string; name: string }[]
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [search, setSearch] = useState(params.get("search") || "")
  const [locationId, setLocationId] = useState(params.get("locationId") || "")
  const [jobType, setJobType] = useState(params.get("jobType") || "")

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = new URLSearchParams()

      if (search) query.set("search", search)
      if (locationId) query.set("locationId", locationId)
      if (jobType) query.set("jobType", jobType)

      router.replace(`/jobs?${query.toString()}`)
    }, 500) // delay 500ms

    return () => clearTimeout(timeout)
  }, [search, locationId, jobType, router])

  return (
    <div className="flex flex-wrap gap-4 items-center bg-green-50 p-4 rounded-xl shadow-sm">
      
      {/* Search Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs..."
        className="flex-1 min-w-45 p-2.5 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none transition"
      />

      {/* Location */}
      <select
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        className="p-2.5 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none transition"
      >
        <option value="">Tất cả địa điểm</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Job Type */}
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="p-2.5 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none transition"
      >
        <option value="">All types</option>
        <option value="FULLTIME">Fulltime</option>
        <option value="PARTTIME">Parttime</option>
        <option value="REMOTE">Remote</option>
      </select>
    </div>
  )
}