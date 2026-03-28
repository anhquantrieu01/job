import { createCategory } from "../actions"

export default function Page() {
  return (
    <div className="max-w-xl mx-auto p-8">

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create Job Category
      </h1>

      {/* Form */}
      <form
        action={createCategory}
        className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
      >

        {/* Category name */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Category Name
          </label>

          <input
            name="name"
            placeholder="e.g. Frontend Development"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Category
          </button>

        </div>

      </form>

    </div>
  )
}