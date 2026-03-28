"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Mon", jobs: 5 },
  { name: "Tue", jobs: 9 },
  { name: "Wed", jobs: 6 },
  { name: "Thu", jobs: 11 },
  { name: "Fri", jobs: 7 },
]

export default function JobChart() {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h3 className="mb-4 font-semibold">
        Job Analytics
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="jobs"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}