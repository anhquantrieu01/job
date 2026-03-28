// components/jobs/JobCardSkeleton.tsx
export default function JobCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="animate-pulse">
        
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

        {/* Company */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />

        {/* Location */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />

        {/* Salary */}
        <div className="h-4 bg-green-100 rounded w-2/3 mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          
          {/* Tag */}
          <div className="h-6 w-20 bg-green-100 rounded-full" />

          {/* CTA */}
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}