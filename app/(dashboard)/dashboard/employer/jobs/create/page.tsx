import { prisma } from "@/lib/prisma"
import { createJob } from "../actions"
import { JobType } from "@/generated/prisma/enums"

export default async function Page() {
  const companies = await prisma.company.findMany()
  const categories = await prisma.jobCategory.findMany()
  const locations = await prisma.location.findMany()

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create Job
      </h1>

      <form
        action={createJob}
        className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
      >

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Job Title
          </label>
          <input
            name="title"
            placeholder="Senior Frontend Developer"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Job description..."
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        

        {/* Salary */}
        <div className="grid grid-cols-3 gap-4">

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Min Salary
            </label>
            <input
              name="salaryMin"
              type="number"
              placeholder="1000"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Max Salary
            </label>
            <input
              name="salaryMax"
              type="number"
              placeholder="3000"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Currency
            </label>
            <input
              name="currency"
              defaultValue="USD"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

        </div>

        {/* Job type */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Job Type
          </label>

          <select
            name="jobType"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Object.values(JobType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Company
          </label>

          <select
            name="companyId"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

         {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Location
          </label>

          <select
            name="locationId"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Category
          </label>

          <select
            name="categoryId"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Expire date */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Expiration Date
          </label>

          <input
            name="expiresAt"
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Job
          </button>

        </div>

      </form>

    </div>
  )
}