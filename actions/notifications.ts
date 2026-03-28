"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMyNotifications() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return [];

  const notifications = await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // limit
  });

  return notifications;
}

export async function markAsRead(id: string) {
  if (!id) throw new Error("Invalid id");

  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}