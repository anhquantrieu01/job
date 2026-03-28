import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import StatusSelect from "./StatusSelect";

export default async function ApplicationsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 🔥 lấy company của employer
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { company: true },
  });

  if (!user?.companyId) {
    return <div>You don&apos;t have a company</div>;
  }

  // 🔥 lấy applications của job thuộc company đó
  const applications = await prisma.application.findMany({
    where: {
      job: {
        companyId: user.companyId,
      },
    },
    include: {
      user: true,
      job: true,
      resume: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Applications</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Candidate</th>
            <th className="border p-2">Job</th>
            <th className="border p-2">Resume</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="border p-2">{app.user.email}</td>
              <td className="border p-2">{app.job.title}</td>

              <td className="border p-2">
                {app.resume?.fileUrl ? (
                  <a
                    href={app.resume.fileUrl}
                    target="_blank"
                    className="text-blue-500"
                  >
                    View CV
                  </a>
                ) : (
                  "No CV"
                )}
              </td>

              <td className="border p-2">
                <StatusSelect id={app.id} status={app.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}