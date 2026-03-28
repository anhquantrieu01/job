import StatsCards from "@/components/dashboard/StatsCards"
import JobChart from "@/components/dashboard/JobChart"
import ApplicationTable from "@/components/dashboard/ApplicationTable"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">

        <JobChart />

        <ApplicationTable />

      </div>

    </div>
  )
}