"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/browsJobs"
  
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")
    
    const formData = new FormData(e.currentTarget)
    const users = Object.fromEntries(formData.entries()) as { email: string; password: string }

    const { error } = await authClient.signIn.email({
      email: users.email,
      password: users.password,
      callbackURL: redirectTo, // ⬅️ বড় হাতের URL নিশ্চিত করা হলো
    }, {
      onSuccess: () => {
        router.push(redirectTo)
      },
      onError: (ctx) => {
        setErrorMessage(ctx.error.message || "Failed to sign in")
        setLoading(false)
      }
    })

    if (error) {
      setErrorMessage(error.message || "Failed to sign in")
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-8 max-w-md w-full">
      <h2 className="mb-6 text-2xl font-extrabold text-center text-white">
        Sign In
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Email address
          </label>
          <Input
            name="email"
            type="email"
            required
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
            required
            placeholder="••••••••"
            className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 font-medium text-white shadow-lg transition-all hover:opacity-90 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-zinc-400 text-sm">
        <a href="/signUp" className="underline hover:text-orange-400">
          Create an account
        </a>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  )
}