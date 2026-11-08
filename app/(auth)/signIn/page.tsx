"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-8 max-w-md w-full">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-white">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email address
            </label>
            <Input
            name="email"
              type="email"
              placeholder="name@company.com"
              className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <Input
            name="password"
              type="password"
              placeholder="••••••••"
              className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 font-medium text-white shadow-lg transition-all hover:opacity-90"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-zinc-400 text-sm">
          <a href="/signUp" className="underline hover:text-orange-400">
            Create an account
          </a>
        </div>
      </div>
    </div>
  )
}