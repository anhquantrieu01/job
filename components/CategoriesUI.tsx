"use client"

import { JobCategory } from "@/generated/prisma/client"
import { useSearchParams } from "next/navigation"


type CategoryWithCount = JobCategory & {
  _count: {
    jobs: number;
  };
}
export default function CategoriesUI({
  categories,
}: {
  categories: CategoryWithCount[]
}) {
  const params = useSearchParams()

  const active = params.get("categoryId")

  return (
    <section className="py-16 bg-green-50/40">
      <div className="mx-auto max-w-6xl px-4">

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Ngành nghề phổ biến
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tìm việc theo lĩnh vực phù hợp với bạn
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {categories.map((cat) => {
            const isActive = active === cat.id

            return (
              <div
                key={cat.id}
                
                className={`
                  group cursor-pointer
                  rounded-xl border
                  p-4
                  bg-white

                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        border-green-500
                        bg-green-50
                        shadow-sm
                      `
                      : `
                        border-gray-200
                        hover:border-green-400
                        hover:shadow-md
                        hover:-translate-y-0.5
                      `
                  }
                `}
              >
                {/* Name */}
                <p className={`
                  text-sm font-semibold leading-snug
                  ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-900 group-hover:text-green-700"
                  }
                `}>
                  {cat.name}
                </p>

                {/* Jobs count */}
                <p className="text-xs text-gray-500 mt-2">
                  {cat._count?.jobs} jobs
                </p>

                {/* underline accent */}
                <div className={`
                  mt-3 h-0.5 w-6
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-green-500 w-10"
                      : "bg-gray-200 group-hover:bg-green-400 group-hover:w-10"
                  }
                `} />
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}