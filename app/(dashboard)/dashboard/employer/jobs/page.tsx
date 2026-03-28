import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteJob } from "./actions"

export default async function Page() {

  const jobs = await prisma.job.findMany({
    include: {
      company: true,
      category: true,
      location: true
    }
  })

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-2xl font-bold text-gray-800">
          Jobs
        </h1>

        <Link
          href="/dashboard/employer/jobs/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Job
        </Link>

      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow border border-gray-100">

        {jobs.length === 0 && (
          <p className="p-6 text-gray-500">
            No jobs yet.
          </p>
        )}

        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-5 border-b last:border-none hover:bg-green-50 transition"
          >

            {/* Job Info */}
            <div className="flex flex-col gap-1">

              <h3 className="font-semibold text-gray-800">
                {job.title}
              </h3>

              <p className="text-sm text-gray-600">
                {job.company.name} • {job.location.name}
              </p>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit">
                {job?.category?.name}
              </span>

            </div>

            {/* Actions */}
            <div className="flex gap-3">

              <Link
                href={`/dashboard/employer/jobs/${job.id}/edit`}
                className="px-3 py-1.5 text-sm border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Edit
              </Link>

              <form action={deleteJob.bind(null, job.id)}>
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