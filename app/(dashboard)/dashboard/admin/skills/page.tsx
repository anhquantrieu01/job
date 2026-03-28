import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteSkill } from "./actions"

export default async function Page() {

  const skills = await prisma.skill.findMany({
    include:{
      _count:{
        select:{ jobs:true }
      }
    }
  })

  return (
    <div>

      <Link href="/dashboard/admin/skills/create">
        Create Skill
      </Link>

      {skills.map(skill => (

        <div key={skill.id} className="flex gap-4">

          <p>{skill.name}</p>
          <p>{skill._count.jobs} jobs</p>

          <Link href={`/dashboard/admin/skills/${skill.id}/edit`}>
            Edit
          </Link>

          <form action={deleteSkill.bind(null, skill.id)}>
            <button>Delete</button>
          </form>

        </div>

      ))}

    </div>
  )
}