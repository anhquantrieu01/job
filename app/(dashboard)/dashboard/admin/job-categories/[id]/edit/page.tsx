import { prisma } from "@/lib/prisma"
import { updateCategory } from "../../actions"
import Link from "next/link"

export default async function Page({
  params
}:{
  params:{id:string}
}) {

  const category = await prisma.jobCategory.findUnique({
    where:{ id: params.id }
  })

  if(!category) return null

  return (
    <div className="max-w-xl mx-auto p-8">

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Job Category
      </h1>

      {/* Form */}
      <form
        action={updateCategory.bind(null, category.id)}
        className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
      >

        {/* Category name */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Category Name
          </label>

          <input
            name="name"
            defaultValue={category.name}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <Link
            href="/admin/job-categories"
            className="px-6 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Category
          </button>

        </div>

      </form>

    </div>
  )
}