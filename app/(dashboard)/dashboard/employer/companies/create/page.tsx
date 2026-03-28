import { createCompany } from "../actions"

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create Company
      </h1>

      <form
        action={createCompany}
        className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
      >

        {/* Company name */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Company name
          </label>
          <input
            name="name"
            placeholder="Google"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Website */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Website
          </label>
          <input
            name="website"
            placeholder="https://company.com"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Location
          </label>
          <input
            name="location"
            placeholder="Ho Chi Minh City"
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
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Logo upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Company logo
          </label>
          <input
            type="file"
            name="logo"
            className="border rounded-lg px-3 py-2 file:bg-green-600 file:text-white file:border-0 file:px-4 file:py-1.5 file:rounded-md file:mr-4"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end gap-3">

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Company
          </button>

        </div>

      </form>
    </div>
  )
}