"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

type MenuItem = {
  label: string
  href?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
  children?: {
    label: string
    href: string
  }[]
}

type MenuSection = {
  title: string
  items: MenuItem[]
}

export default function SidebarContent({ menu }: { menu: MenuSection[] }) {
  const pathname = usePathname()

  const [openSection, setOpenSection] = useState<string | null>(menu[0]?.title)
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title))
  }

  const toggleItem = (label: string) => {
    setOpenItem((prev) => (prev === label ? null : label))
  }

  return (
    <div className="flex h-full flex-col">
      
      {/* LOGO */}
      <div className="border-b p-6 text-xl font-bold text-green-600">
        <Link href={'/'}>JobBoard</Link>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-6 p-4">

        {menu.map((section) => {
          const isOpen = openSection === section.title

          return (
            <div key={section.title}>

              {/* SECTION TITLE */}
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between text-sm font-semibold text-gray-500"
              >
                {section.title}

                <ChevronDown
                  size={16}
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* SECTION ITEMS */}
              {isOpen && (
                <div className="mt-2 space-y-1">

                  {section.items.map((item) => {
                    const Icon = item.icon

                    // ITEM có children
                    if (item.children) {
                      const open = openItem === item.label

                      return (
                        <div key={item.label}>

                          <button
                            onClick={() => toggleItem(item.label)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              {Icon && <Icon size={18} />}
                              {item.label}
                            </div>

                            <ChevronDown
                              size={14}
                              className={`transition ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {open && (
                            <div className="ml-6 mt-1 space-y-1">

                              {item.children.map((child) => {
                                const active = pathname.startsWith(child.href)

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block rounded-lg px-3 py-2 text-sm ${
                                      active
                                        ? "bg-green-100 text-green-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              })}

                            </div>
                          )}
                        </div>
                      )
                    }

                    // ITEM thường
                    const active =
                      item.href && pathname.startsWith(item.href)

                    return (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className={`
                        flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                        ${
                          active
                            ? "bg-green-100 text-green-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                        `}
                      >
                        {Icon && <Icon size={18} />}
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}