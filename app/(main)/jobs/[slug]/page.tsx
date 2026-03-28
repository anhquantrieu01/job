import { auth } from "@/auth";
import ApplyForm from "@/components/jobs/ApplyForm";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      company: {
        select: { name: true },
      },
    },
  });

  if (!job) {
    return {
      title: "Job not found",
    };
  }

  const title = `${job.title} tại ${job.company.name}`;
  const description =
    job.description?.slice(0, 150) || "Ứng tuyển ngay";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    select: { slug: true },
  });

  return jobs.map((job) => ({
    slug: job.slug,
  }));
}


export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
      location: true,
      category: true,
      skills: {
        include: {
          skill: true,
        },
      },
      savedBy: session?.user?.id
        ? {
          where: {
            userId: session.user.id,
          },
          select: { id: true },
        }
        : false,

    },
  });
  if (!job || !job.isActive) return notFound();
  const isSaved = job?.savedBy?.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
              <span className="font-medium text-gray-800">
                {job.company.name}
              </span>
              <span>•</span>
              <span>{job.location.name}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs">
                {job.jobType}
              </span>
            </div>

            {/* Salary */}
            <p className="mt-4 text-lg font-semibold text-green-600">
              {job.salaryMin && job.salaryMax
                ? `${job.salaryMin} - ${job.salaryMax} ${job.currency}`
                : "Negotiable"}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Kỹ năng yêu cầu
            </h2>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s.skillId}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                >
                  {s.skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              About Company
            </h2>

            <p className="font-semibold text-gray-800 mb-1">
              {job.company.name}
            </p>

            <p className="text-gray-500 text-sm mb-3">
              {job.company.location}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {job.company.description || "No description"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* APPLY BOX */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Ứng tuyển công việc
            </h3>

            {userId ? (
              <>
                <ApplyForm jobId={job.id} />

                <div className="mt-4">
                  <SaveJobButton jobId={job.id} initialSaved={isSaved} />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Bạn cần đăng nhập để ứng tuyển hoặc lưu công việc
                </p>

                <a
                  href="/login"
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Đăng nhập ngay
                </a>
              </div>
            )}
          </div>

          {/* JOB INFO */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Job Overview
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Job Type</span>
                <span className="font-medium text-gray-800">
                  {job.jobType}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-medium text-gray-800">
                  {job.location.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-medium text-gray-800">
                  {job.category?.name || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Posted</span>
                <span className="font-medium text-gray-800">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}