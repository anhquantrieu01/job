import { FiUsers, FiBriefcase, FiFileText } from "react-icons/fi"

export default function StatsCards() {
  const stats = [
    {
      title: "Total Jobs",
      value: "124",
      icon: FiBriefcase,
    },
    {
      title: "Applications",
      value: "892",
      icon: FiFileText,
    },
    {
      title: "Users",
      value: "2,430",
      icon: FiUsers,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">

      {stats.map((s) => {
        const Icon = s.icon

        return (
          <div
            key={s.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {s.title}
                </p>

                <p className="text-2xl font-bold">
                  {s.value}
                </p>
              </div>

              <Icon className="text-2xl text-green-600" />

            </div>
          </div>
        )
      })}

    </div>
  )
}