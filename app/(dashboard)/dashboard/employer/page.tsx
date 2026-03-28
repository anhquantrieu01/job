import StatsCards from "@/components/dashboard/StatsCards"
import ApplicationTable from "@/components/dashboard/ApplicationTable"

export default function EmployerDashboard() {
  return (
    <div className="space-y-6">

      <StatsCards />

      <ApplicationTable />

    </div>
  )
}