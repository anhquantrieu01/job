import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteCompany } from "./actions"
import Image from "next/image"
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  const userId = session?.user.id
  const companies = await prisma.company.findMany({
    where: {ownerId: userId},
  })

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Companies
        </h1>

        <Link
          href="/dashboard/admin/companies/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Company
        </Link>
      </div>

      {/* List */}
      <div className="bg-white shadow rounded-xl border border-gray-100">

        {companies.length === 0 && (
          <p className="p-6 text-gray-500">No companies yet.</p>
        )}

        {companies.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-5 border-b last:border-none hover:bg-green-50 transition"
          >

            {/* Left */}
            <div className="flex items-center gap-4">

              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover border"
                />
              ) : (
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-lg text-green-700 font-semibold">
                  {c.name[0]}
                </div>
              )}

              <p className="font-medium text-gray-800">
                {c.name}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

              <Link
                href={`/dashboard/admin/companies/${c.id}/edit`}
                className="px-3 py-1.5 text-sm rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
              >
                Edit
              </Link>

              <form action={deleteCompany.bind(null, c.id)}>
                <button
                  className="px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
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