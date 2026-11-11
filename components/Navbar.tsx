"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"

export default function Navbar() {
  const { data: session } = useSession()

  const rolePath = session?.user?.role ? `/dashboard/${session.user.role}` : "/dashboard"

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: rolePath },
  ]

  const handleSignOut = async () => {
    await signOut({
      callbackURL: "/",
    })
  }

  // কম্পোনেন্ট না বানিয়ে সাধারণ Helper Function বানাবো
  const renderAuthButtons = (isMobile = false) => {
    if (session?.user) {
      return (
        <div className={`flex ${isMobile ? "flex-col items-start gap-4" : "items-center gap-4"}`}>
          <div className="text-sm text-zinc-300">
            <span className="text-xs text-zinc-500 block">Logged in as</span>
            <span className="font-medium text-white truncate  inline-block">
              {session.user.name || session.user.email}
            </span>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-xs font-medium rounded-xl gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </Button>
        </div>
      )
    }

    return (
      <div className={`flex ${isMobile ? "flex-col w-full gap-3" : "items-center gap-3"}`}>
        <Link
          href="/signIn"
          className={`text-sm font-medium text-[#8b5cf6] transition-colors hover:text-[#a78bfa] ${
            isMobile ? "py-2 px-1" : ""
          }`}
        >
          Sign In
        </Link>
        <Link href="/signUp" className={isMobile ? "w-full" : ""}>
          <Button className={`rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-5 text-sm font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-purple-500/20 cursor-pointer ${
            isMobile ? "w-full py-2.5" : ""
          }`}>
            Get Started
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0c10]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="HireLoop Logo"
            width={80}
            height={48}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation & Auth */}
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

          <div className="h-4 w-px bg-zinc-800" />

          {/* Helper function হিসেবে কল করা হলো */}
          {renderAuthButtons()}
        </div>

        {/* Mobile Sidebar Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger >
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-300 hover:text-white hover:bg-zinc-800/60"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent
              side="right"
              className="w-70 sm:w-87.5 border-zinc-800 bg-[#0b0c10] text-white p-6"
            >
              <SheetHeader className="text-left border-b border-zinc-800/80 pb-4">
                <SheetTitle className="text-left font-bold text-white text-xl">
                  <span className="text-[#0080ff]">hire</span>
                  <span className="text-[#ff6600]">loop</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col justify-between h-[calc(100vh-120px)]">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base font-medium text-zinc-300 transition-colors hover:text-white py-2 px-3 rounded-lg hover:bg-zinc-900/60"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Bottom Auth Buttons */}
                <div className="border-t border-zinc-800/80 pt-6">
                  {/* Helper function হিসেবে কল করা হলো */}
                  {renderAuthButtons(true)}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}