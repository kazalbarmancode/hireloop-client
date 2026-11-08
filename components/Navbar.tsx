import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import Image from "next/image"
import { DialogTrigger } from "./ui/dialog"
import { Menu } from "lucide-react"

export default function Navbar() {
  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0c10]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={48}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-4 w-1 bg-zinc-800" />

          <div className="flex items-center gap-4">
            <Link
              href="/signIn"
              className="text-sm font-medium text-[#8b5cf6] transition-colors hover:text-[#a78bfa]"
            >
              Sign In
            </Link>
            <Button className="rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-5 font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-purple-500/20">
              Get Started
            </Button>
          </div>
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <DialogTrigger >
              <Menu></Menu>
            </DialogTrigger>
            <SheetContent
              side="right"
              className="border-zinc-800 bg-[#0b0c10] text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-white">
                  <span className="text-[#0080ff]">hire</span>
                  <span className="text-[#ff6600]">loop</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <hr className="border-zinc-800" />
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="py-2 text-center font-medium text-[#8b5cf6] hover:text-[#a78bfa]"
                  >
                    Sign In
                  </Link>
                  <Button className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
