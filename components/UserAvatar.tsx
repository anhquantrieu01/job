import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOut } from "./SignOut"
import SignIn from "./SignIn"
import Link from "next/link"

export async function UserAvatar() {
    const session = await auth()

    let user = null

    if (session?.user?.email) {
        user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })
    }

    if (!session?.user) {
        return <SignIn />
    }

    const initials =
        session.user.name
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none">
                <Avatar className="size-8 cursor-pointer">
                    <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name ?? "avatar"}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-36">
                <DropdownMenuGroup>

                    <DropdownMenuItem>
                        <Link href="/my-applications">Hồ sơ ứng tuyển</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/saved-jobs">Công việc đã lưu</Link>
                    </DropdownMenuItem>

                    

                    {user?.role === "ADMIN" && (
                        <DropdownMenuItem>
                            <Link href="/dashboard/admin">Trang quản trị</Link>
                        </DropdownMenuItem>
                    )}
                    {user?.role === "EMPLOYER" && (
                        <DropdownMenuItem>
                            <Link href="/dashboard/employer">Trang quản trị</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <SignOut />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}