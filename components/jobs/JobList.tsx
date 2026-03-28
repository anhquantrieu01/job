import JobCard from "./JobCard";
import { JobExpanded } from "@/types";

interface JobListProps {
  jobs: JobExpanded[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

export default function JobList({
  jobs,
  hasMore,
  onLoadMore,
  loading,
}: JobListProps) {
  return (
    <div className="mt-8">
      {/* Job Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-green-200 transition-all">
              <JobCard job={job} />
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No jobs found
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="
              inline-flex items-center gap-2
              px-6 py-3
              rounded-xl
              bg-green-600 text-white font-medium
              shadow-md
              hover:bg-green-700 hover:shadow-lg
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {loading ? "Loading..." : "Load More"}
            {!loading && <span className="text-lg">→</span>}
          </button>
        </div>
      )}
    </div>
  );
}