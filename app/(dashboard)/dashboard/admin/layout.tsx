import Sidebar from "@/components/dashboard/Sidebar"
import NotificationBell from "@/components/dashboard/NotificationBell"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar role="ADMIN" />

      <main className="flex-1 md:ml-64">

        <header className="flex items-center justify-between border-b bg-green-600 text-white px-6 py-4 pl-14 md:pl-6">

          <h1 className="font-semibold">
            Admin Dashboard
          </h1>

          <NotificationBell />

        </header>

        <div className="p-6">{children}</div>

      </main>

    </div>
  )
}