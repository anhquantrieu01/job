"use server";

import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";



// UPDATE
export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as Role;

  await prisma.user.update({
    where: { id },
    data: { name, role },
  });

  redirect("/dashboard/admin/users");
}