import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteSkill } from "./actions";

export default async function Page() {
  const skills = await prisma.skill.findMany({
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              🧠 Skills Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all skills in the system
            </p>
          </div>

          <Link
            href="/dashboard/admin/skills/create"
            className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-sm"
          >
            + Create Skill
          </Link>
        </div>

        {/* EMPTY STATE */}
        {skills.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <p className="text-gray-500">No skills yet</p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold text-gray-800">
                  {skill.name}
                </p>
                <p className="text-sm text-gray-500">
                  {skill._count.jobs} jobs
                </p>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/dashboard/admin/skills/${skill.id}/edit`}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:border-green-500 hover:text-green-600 transition"
                >
                  Edit
                </Link>

                <form action={deleteSkill.bind(null, skill.id)}>
                  <button
                    className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}