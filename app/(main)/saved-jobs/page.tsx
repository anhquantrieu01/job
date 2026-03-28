import { getSavedJobs } from "@/actions/jobs";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import Link from "next/link";

export default async function SavedJobsPage() {
    const savedJobs = await getSavedJobs();

    if (savedJobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Chưa lưu công việc nào
                </h2>
                <p className="text-gray-500 mt-2">
                    Bắt đầu tìm kiếm công việc của bạn tại đây
                </p>

                <Link
                    href="/jobs"
                    className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                    Khám phá công việc
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Công việc đã lưu</h1>

            <div className="space-y-4">
                {savedJobs.map((item) => {
                    const job = item.job;

                    return (
                        <div
                            key={item.id}
                            className="p-5 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <Link
                                        href={`/jobs/${job.slug}`}
                                        className="text-lg font-semibold text-gray-800 hover:text-green-600"
                                    >
                                        {job.title}
                                    </Link>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {job.company.name} • {job.location.name}
                                    </p>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {job.jobType}
                                    </p>

                                    {(job.salaryMin || job.salaryMax) && (
                                        <p className="text-sm text-green-600 mt-2 font-medium">
                                            💰 {job.salaryMin ?? "?"} - {job.salaryMax ?? "?"}{" "}
                                            {job.currency}
                                        </p>
                                    )}
                                </div>

                                {/* 👇 gom lại 1 cột */}
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs text-gray-400">
                                        Saved {new Date(item.createdAt).toLocaleDateString()}
                                    </span>

                                    <SaveJobButton
                                        jobId={job.id}
                                        initialSaved={true} // 👈 FIX
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}