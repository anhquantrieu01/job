"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { adminMenu, employerMenu } from "./menu"
import SidebarContent from "./SidebarContent"
import { Role } from "@/generated/prisma/enums"



export default function Sidebar({ role }: { role: Role }) {
  const menu = role === "ADMIN" ? adminMenu : employerMenu
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* sidebar */}
        <aside className="relative h-full w-64 bg-white shadow-xl">

          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4"
          >
            <X size={22} />
          </button>

          <SidebarContent menu={menu} />

        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white md:block">

        <SidebarContent menu={menu} />

      </aside>
    </>
  )
}