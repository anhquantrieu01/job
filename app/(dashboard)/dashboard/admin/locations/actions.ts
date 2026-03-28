"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string

  await prisma.location.create({
    data: { name }
  })

  revalidatePath("/dashboard/admin/locations")
}

export async function updateLocation(id: string, formData: FormData) {
  const name = formData.get("name") as string

  await prisma.location.update({
    where: { id },
    data: { name }
  })

  revalidatePath("/dashboard/admin/locations")
}

export async function deleteLocation(id: string) {
  await prisma.location.delete({
    where: { id }
  })

  revalidatePath("/dashboard/admin/locations")
}