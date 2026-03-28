import { prisma } from "@/lib/prisma"
import { updateCompany } from "../../actions"
import Image from "next/image"

export default async function Page({ params }: { params: { id: string } }) {

  const company = await prisma.company.findUnique({
    where: { id: params.id }
  })

  if (!company) return null

  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Company
      </h1>

      <form
        action={updateCompany.bind(null, company.id)}
        className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
      >

        {/* Company name */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Company name
          </label>
          <input
            name="name"
            defaultValue={company.name}
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
            defaultValue={company.website ?? ""}
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
            defaultValue={company.location ?? ""}
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
            defaultValue={company.description ?? ""}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Current logo */}
        {company.logoUrl && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Current Logo
            </label>

            <Image
              src={company.logoUrl}
              alt={company.name}
              width={80}
              height={80}
              className="rounded-lg border"
            />
          </div>
        )}

        {/* Upload new logo */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Upload new logo
          </label>

          <input
            type="file"
            name="logo"
            className="border rounded-lg px-3 py-2 file:bg-green-600 file:text-white file:border-0 file:px-4 file:py-1.5 file:rounded-md file:mr-4"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Company
          </button>
        </div>

      </form>
    </div>
  )
}