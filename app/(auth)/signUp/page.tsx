"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  const users = Object.fromEntries(formData.entries())as {email:string,password:string,name:string,}
const { data, error } = await authClient.signUp.email({
        email:users.email, // user email address
        password:users.password,
        name:users.name ,// user display name
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    })
    if(data){
      console.log("Sign Up succecfull",data)
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-8 max-w-md w-full">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name
            </label>
            <Input
              placeholder="John Doe"
              type="name"
              name="name"
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
              placeholder="••••••••"
              className="bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 font-medium text-white shadow-lg transition-all hover:opacity-90"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-zinc-400 text-sm">
          <a href="/signIn" className="underline hover:text-orange-400">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  )
}