import { prisma } from "@/lib/prisma"
import { updateJob } from "../../actions"
import Link from "next/link"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const job = await prisma.job.findUnique({
        where: { id },
        include: {
            skills: true,
            location: true
        }
    })

    const allSkills = await prisma.skill.findMany({
        orderBy: { name: "asc" }
    })

    const locations = await prisma.location.findMany()

    if (!job) return null

    return (
        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Job
            </h1>

            <form
                action={updateJob.bind(null, job.id)}
                className="bg-white p-8 rounded-xl shadow border border-gray-100 space-y-6"
            >

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">
                        Job Title
                    </label>

                    <input
                        name="title"
                        defaultValue={job.title}
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
                        defaultValue={job.description ?? ""}
                        rows={4}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">
                        Location
                    </label>

                    <select
                        name="locationId"
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        defaultValue={job.locationId}
                    >
                        {locations.map((l) => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Salary */}
                <div className="grid grid-cols-2 gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700">
                            Min Salary
                        </label>

                        <input
                            name="salaryMin"
                            type="number"
                            defaultValue={job.salaryMin ?? ""}
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
                            defaultValue={job.salaryMax ?? ""}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                </div>

                {/* Skills */}
                <div className="flex flex-col gap-3">
                    <label className="font-medium text-gray-700">
                        Skills
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        {allSkills.map((skill) => {

                            const checked = job.skills.some(
                                (s) => s.skillId === skill.id
                            )

                            return (
                                <label
                                    key={skill.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        name="skills"
                                        value={skill.id}
                                        defaultChecked={checked}
                                    />

                                    {skill.name}
                                </label>
                            )
                        })}

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    <Link
                        href="/admin/jobs"
                        className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Update Job
                    </button>

                </div>

            </form>

        </div>
    )
}