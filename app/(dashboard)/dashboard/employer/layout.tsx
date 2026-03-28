import Sidebar from "@/components/dashboard/Sidebar"
import NotificationBell from "@/components/dashboard/NotificationBell"
import { auth } from "@/auth"

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const role = session?.user?.role
  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar role={role!} />

      <main className="flex-1 md:ml-64">

        <header className="flex items-center justify-between border-b bg-white px-6 py-4">

          <h1 className="font-semibold">
            Employer Dashboard
          </h1>

          <NotificationBell />

        </header>

        <div className="p-6">{children}</div>

      </main>

    </div>
  )
}