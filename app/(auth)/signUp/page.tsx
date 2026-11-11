"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserIcon, BuildingIcon, ShieldIcon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<"seeker" | "recruiter" | "admin">("seeker")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    // React State থেকে সরাসরি সিলেক্ট করা রোল নিব
    const roleToSend = selectedRole

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        role: roleToSend, // সরাসরি এখানেও দেওয়া যায়
        callbackURL: "/", 
      },
     
    )

    if (error) {
      setErrorMsg(error.message || "Something went wrong during sign up.")
      return
    }

    if (data) {
      console.log("Sign Up successful", data)
      router.refresh()
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-8 max-w-md w-full shadow-2xl">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-white">
          Create Account
        </h2>

        {errorMsg && (
          <div className="mb-4 p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name
            </label>
            <Input
              placeholder="John Doe"
              type="text"
              name="name"
              required
              className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email address
            </label>
            <Input
              type="email"
              name="email"
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
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
            />
          </div>

          {/* Role Selection UI with Active Highlights */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              I want to join as a
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Job Seeker Option */}
              <button
                type="button"
                onClick={() => setSelectedRole("seeker")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  selectedRole === "seeker"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                <UserIcon className={`h-5 w-5 mb-1 ${selectedRole === "seeker" ? "text-indigo-400" : ""}`} />
                <span className="text-xs font-medium">Seeker</span>
              </button>

              {/* Recruiter Option */}
              <button
                type="button"
                onClick={() => setSelectedRole("recruiter")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  selectedRole === "recruiter"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                <BuildingIcon className={`h-5 w-5 mb-1 ${selectedRole === "recruiter" ? "text-indigo-400" : ""}`} />
                <span className="text-xs font-medium">Recruiter</span>
              </button>

              {/* Admin Option */}
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  selectedRole === "admin"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                <ShieldIcon className={`h-5 w-5 mb-1 ${selectedRole === "admin" ? "text-indigo-400" : ""}`} />
                <span className="text-xs font-medium">Admin</span>
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:opacity-95 cursor-pointer"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-zinc-400 text-sm">
          <a href="/signIn" className="underline hover:text-orange-400 transition-colors">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  )
}