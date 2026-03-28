import slugify from "slugify";
import { prisma } from "@/lib/prisma";

export async function generateUniqueSlug(
  name: string,
  model: "job"| "company",
) {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });

  let slug = baseSlug;
  let count = 1;

  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (prisma as any)[model].findUnique({
      where: { slug },
    });

    if (!existing) break;

    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}