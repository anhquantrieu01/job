"use server"

import { JobType } from "@/generated/prisma/enums"
import { generateUniqueSlug } from "@/lib/generateSlug"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redis } from "@/lib/redis"
import { auth } from "@/auth"
export async function createJob(formData: FormData) {
  const session = await auth()
  const ownerId = session?.user.id as string
  const title = formData.get("title") as string
    const slug = await generateUniqueSlug(title, "job");
  await prisma.job.create({
    data: {
      title,
      slug,
      ownerId,
      description: formData.get("description") as string,
      locationId: formData.get("locationId") as string,

      salaryMin: Number(formData.get("salaryMin")),
      salaryMax: Number(formData.get("salaryMax")),

      currency: formData.get("currency") as string,

      jobType: formData.get("jobType") as JobType,

      companyId: formData.get("companyId") as string,
      categoryId: formData.get("categoryId") as string,

      expiresAt: new Date(formData.get("expiresAt") as string),
    },
  })
   await redis.del("jobs:*")
  revalidatePath("/dashboard/admin/jobs")
}

export async function updateJob(id: string, formData: FormData) {

  const skills = formData.getAll("skills") as string[]

  await prisma.job.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,

      locationId: formData.get("locationId") as string,

      salaryMin: Number(formData.get("salaryMin")),
      salaryMax: Number(formData.get("salaryMax")),
    },
  })

  // reset skills
  await prisma.jobSkill.deleteMany({
    where: { jobId: id }
  })

  if (skills.length) {
    await prisma.jobSkill.createMany({
      data: skills.map((skillId) => ({
        jobId: id,
        skillId
      }))
    })
  }

  revalidatePath("/dashboard/admin/jobs")


}

export async function deleteJob(id: string) {
    await prisma.jobSkill.deleteMany({
    where: { jobId: id }
  })

  await prisma.job.delete({ where: { id } })
  revalidatePath("/dashboard/admin/jobs")
}

export async function addSkillToJob(jobId: string, skillId: string) {

  await prisma.jobSkill.create({
    data:{
      jobId,
      skillId
    }
  })

}

export async function removeSkillFromJob(jobId: string, skillId: string) {

  await prisma.jobSkill.delete({
    where:{
      jobId_skillId:{
        jobId,
        skillId
      }
    }
  })

}