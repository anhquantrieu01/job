"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 text-black">

            {/* Close */}
            <button
              className="mb-6"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>



            {/* Search */}
            <div className="mb-6">
              <SearchBar />
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-4">
              <Link href="/jobs">Công việc</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}