import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function NotificationsPage() {
    const session = await auth();
    if (!session?.user?.email) {
        return redirect("/login");
    }
    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    const notifications = await prisma.notification.findMany({
        where: { userId: user!.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-xl font-bold mb-6">Notifications</h1>

            <div className="space-y-4">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className={`p-4 rounded-xl border ${n.isRead ? "bg-white" : "bg-green-50 border-green-300"
                            }`}
                    >
                        <p className="font-medium">{n.title}</p>
                        <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}