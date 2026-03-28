import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteCategory } from "./actions"

export default async function Page() {

  const categories = await prisma.jobCategory.findMany({
    include: {
      _count: {
        select: { jobs: true }
      }
    }
  })

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-2xl font-bold text-gray-800">
          Job Categories
        </h1>

        <Link
          href="/dashboard/admin/job-categories/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Category
        </Link>

      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow border border-gray-100">

        {categories.length === 0 && (
          <p className="p-6 text-gray-500">
            No categories yet.
          </p>
        )}

        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-5 border-b last:border-none hover:bg-green-50 transition"
          >

            {/* Left */}
            <div className="flex items-center gap-6">

              <p className="font-medium text-gray-800">
                {c.name}
              </p>

              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {c._count.jobs} jobs
              </span>

            </div>

            {/* Right */}
            <div className="flex gap-3">

              <Link
                href={`/dashboard/admin/job-categories/${c.id}/edit`}
                className="px-3 py-1.5 text-sm border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Edit
              </Link>

              <form action={deleteCategory.bind(null, c.id)}>
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