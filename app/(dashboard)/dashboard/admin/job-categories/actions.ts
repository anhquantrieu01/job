"use server"

import { clearJobCache } from "@/lib/categories"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string

  await prisma.jobCategory.create({
    data: { name }
  })

  await clearJobCache()

  revalidatePath("/admin/job-categories")
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string

  await prisma.jobCategory.update({
    where: { id },
    data: { name }
  })

  revalidatePath("/admin/job-categories")
  await clearJobCache()
}

export async function deleteCategory(id: string) {
  await prisma.jobCategory.delete({
    where: { id }
  })

  revalidatePath("/admin/job-categories")
  await clearJobCache()
}