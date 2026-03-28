import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MyApplicationsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const applications = await prisma.application.findMany({
    where: { userId: user!.id },
    include: {
      job: {
        include: {
          company: true,
          location: true,
        },
      },
      resume: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Công việc đã ứng tuyển
        </h1>

        {/* EMPTY */}
        {applications.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border text-center">
            <p className="text-gray-500">
              Bạn chưa ứng tuyển công việc nào cả
            </p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border p-5 hover:shadow-sm transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {app.job.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {app.job.company.name} • {app.job.location.name}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    app.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : app.status === "REVIEWING"
                      ? "bg-blue-100 text-blue-700"
                      : app.status === "ACCEPTED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }
                  `}
                >
                  {app.status}
                </span>
              </div>

              {/* INFO */}
              <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
                <span>
                  📅Ứng tuyển:{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>

                {app.resume && (
                  <a
                    href={app.resume.fileUrl}
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    📄 Xem CV
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}