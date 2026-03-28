"use server"

import { ApplicationStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateApplicationStatus(
  id: string,
  formData: FormData
) {

  const status = formData.get("status") as ApplicationStatus

  await prisma.application.update({
    where: { id },
    data: { status }
  })

  revalidatePath("/admin/applications")
}