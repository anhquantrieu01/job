"use server";

import { getJobs } from "@/lib/jobs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
type GetJobsParams = {
  cursorId?: string;
  search?: string;
  locationId?: string;
  jobType?: string;
};
export async function getJobsAction(params: GetJobsParams) {
  return await getJobs(params);
}

// SAVE JOB
export async function saveJob(jobId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  await prisma.savedJob.create({
    data: {
      userId: user!.id,
      jobId,
    },
  });

  revalidatePath("/jobs"); // optional
}

export async function getSavedJobs() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const savedJobs = await prisma.savedJob.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      job: {
        include: {
          company: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return savedJobs;
}
export async function unsaveJob(jobId: string) {
  const session = await auth();
if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  await prisma.savedJob.delete({
    where: {
      userId_jobId: {
        userId: session!.user.id,
        jobId,
      },
    },
  });
}
export async function applyJobWithCV(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const jobId = formData.get("jobId") as string;
  const file = formData.get("cv") as File;

  if (!file) throw new Error("CV is required");

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF allowed");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadRes = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "cv_files",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });

  const fileUrl = uploadRes.secure_url;
  const publicId = uploadRes.public_id;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  await prisma.$transaction(async (tx) => {
    // ❗ tránh duplicate
    const existed = await tx.application.findUnique({
      where: {
        userId_jobId: {
          userId: user.id,
          jobId,
        },
      },
    });

    if (existed) {
      throw new Error("Already applied");
    }

    // 🔥 tạo resume
    const resume = await tx.resume.create({
      data: {
        title: file.name,
        fileUrl,
        filePublicId: publicId,
        userId: user.id,
      },
    });

    // 🔥 tạo application
    const application = await tx.application.create({
      data: {
        userId: user.id,
        jobId,
        resumeId: resume.id,
      },
    });

    // 🔥 lấy job + employer
    const job = await tx.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!job) return;

    const employers = job.company.users.filter(
      (u) => u.role === "EMPLOYER"
    );

    // 🔥 tạo notification cho tất cả employer
    if (employers.length > 0) {
      await tx.notification.createMany({
        data: employers.map((emp) => ({
          userId: emp.id,
          type: "APPLY_JOB",
          title: "New Job Application",
          message: `${user.name || "A user"} applied to "${job.title}"`,
          entityId: application.id,
        })),
      });
    }
  });

  revalidatePath("/jobs");
}
