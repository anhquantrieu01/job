"use server";

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCompany(formData: FormData) {
  const session = await auth();
  const userId = session?.user.id;
  const file = formData.get("logo") as File;

  let logoUrl = null;
  let logoPublicId = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "companies" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    logoUrl = upload.secure_url;
    logoPublicId = upload.public_id;
  }

  await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: formData.get("name") as string,
        website: formData.get("website") as string,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        logoUrl,
        logoPublicId,
        ownerId: userId!,
      },
    });

    await tx.user.update({
      where: { id: userId! },
      data: { companyId: company.id },
    });
  });

  revalidatePath("/dashboard/employer/companies");
}

export async function updateCompany(id: string, formData: FormData) {
  const file = formData.get("logo") as File;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
  let data: any = {
    name: formData.get("name"),
    website: formData.get("website"),
    location: formData.get("location"),
    description: formData.get("description"),
  };

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "companies" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    data.logoUrl = upload.secure_url;
    data.logoPublicId = upload.public_id;
  }

  await prisma.company.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/employer/companies");
}

export async function deleteCompany(id: string) {
  const company = await prisma.company.findUnique({
    where: { id },
  });

  if (company?.logoPublicId) {
    await cloudinary.uploader.destroy(company.logoPublicId);
  }

  await prisma.company.delete({
    where: { id },
  });

  revalidatePath("/dashboard/employer/companies");
}
