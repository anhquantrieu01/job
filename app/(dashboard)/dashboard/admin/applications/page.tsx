import { prisma } from "@/lib/prisma"
import { updateApplicationStatus } from "./actions"

export default async function Page() {

  const apps = await prisma.application.findMany({
    include: {
      job: true,
      user: true,
      resume: true
    }
  })

  return (
    <div>

      {apps.map(app => (

        <div key={app.id} className="border p-4">

          <p>{app.user.name}</p>

          <p>{app.job.title}</p>

          <a
            href={app.resume?.fileUrl}
            target="_blank"
          >
            View CV
          </a>

          <form action={updateApplicationStatus.bind(null, app.id)}>

            <select name="status" defaultValue={app.status}>

              <option>PENDING</option>
              <option>REVIEWING</option>
              <option>ACCEPTED</option>
              <option>REJECTED</option>

            </select>

            <button>Update</button>

          </form>

        </div>

      ))}

    </div>
  )
}