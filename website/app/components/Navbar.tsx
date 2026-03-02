"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 border-b border-white/10 bg-[#090912]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-44 md:w-56">
            <Image
              src="/brand-logo-horizontal.png"
              alt="ScrimFlow Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/bots" className="hover:text-white transition-colors">
            Bots
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors">
            Docs
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="/bots#custom"
          className="hidden md:inline-flex bg-[#00F0FF] text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#00c8d6] transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          Get a Custom Bot
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#090912] px-6 pb-6 space-y-4 text-sm font-medium">
          <Link href="/bots" className="block py-2 text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
            Bots
          </Link>
          <Link href="/docs" className="block py-2 text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
            Docs
          </Link>
          <Link href="/privacy" className="block py-2 text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
            Privacy
          </Link>
          <Link href="/terms" className="block py-2 text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
            Terms
          </Link>
          <Link
            href="/bots#custom"
            className="inline-block bg-[#00F0FF] text-black px-6 py-2.5 rounded-full text-sm font-bold"
            onClick={() => setOpen(false)}
          >
            Get a Custom Bot
          </Link>
        </div>
      )}
    </nav>
  );
}
