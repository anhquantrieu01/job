import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserForm from "../UserForm";

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!id) return notFound();

    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) return notFound();

    return (
        <div className="p-6">
            <h1>Edit User</h1>
            <UserForm user={user} />
        </div>
    );
}