"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createSkill(formData: FormData) {
  const name = formData.get("name") as string

  await prisma.skill.create({
    data: { name }
  })

  revalidatePath("/admin/skills")
}

export async function updateSkill(id: string, formData: FormData) {
  const name = formData.get("name") as string

  await prisma.skill.update({
    where: { id },
    data: { name }
  })

  revalidatePath("/admin/skills")
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: { id }
  })

  revalidatePath("/admin/skills")
}