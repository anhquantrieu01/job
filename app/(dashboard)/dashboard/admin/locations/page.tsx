import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteLocation } from "./actions"

export default async function Page() {

  const locations = await prisma.location.findMany()

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-2xl font-bold text-gray-800">
          Location
        </h1>

        <Link
          href="/dashboard/admin/locations/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Location
        </Link>

      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow border border-gray-100">

        {locations.length === 0 && (
          <p className="p-6 text-gray-500">
            No Location yet.
          </p>
        )}

        {locations.map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between p-5 border-b last:border-none hover:bg-green-50 transition"
          >

            {/* Left */}
            <div className="flex items-center gap-6">

              <p className="font-medium text-gray-800">
                {l.name}
              </p>
             
            </div>

            {/* Right */}
            <div className="flex gap-3">

              <Link
                href={`/dashboard/admin/locations/${l.id}/edit`}
                className="px-3 py-1.5 text-sm border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Edit
              </Link>

              <form action={deleteLocation.bind(null, l.id)}>
                <button
                  className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </form>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}