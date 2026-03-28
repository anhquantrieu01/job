"use server";

import { ApplicationStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as ApplicationStatus;

  if (!id || !status) {
    throw new Error("Invalid data");
  }

  // 🎯 message theo status
  const statusMessages: Record<string, string> = {
    ACCEPTED: "🎉 Chúc mừng! Nhà tuyển dụng đánh giá CV đạt!",
    REJECTED: "❌ Rất tiếc, CV bạn đã bị từ chối.",
    REVIEWING: "👀 CV bạn đang được nhà tuyển dụng xem xét",
    PENDING: "⏳ CV bạn đang được xử lý.",
  };

  await prisma.$transaction(async (tx) => {
    // 🔥 update + lấy data
    const application = await tx.application.update({
      where: { id },
      data: { status },
      include: {
        job: true,
      },
    });

    // 🔥 tạo notification
    await tx.notification.create({
      data: {
        userId: application.userId,
        type: "APPLICATION_STATUS", // nhớ dùng enum trong schema
        title: "Application Update",
        message:
          statusMessages[status] ||
          `Your application for "${application.job.title}" is now ${status}`,

        entityId: application.id,
      },
    });
  });

  revalidatePath("/dashboard/employer/applications");
}
