import { prisma } from "@/lib/prisma"
import { updateSkill } from "../../actions"

export default async function Page({
  params
}:{params:{id:string}}) {

  const skill = await prisma.skill.findUnique({
    where:{ id: params.id }
  })

  if(!skill) return null

  return (
    <form action={updateSkill.bind(null, skill.id)}>

      <input
        name="name"
        defaultValue={skill.name}
      />

      <button>Update</button>

    </form>
  )
}