"use client"

import { useState, useEffect } from "react"
import { Bookmark, Briefcase, Search } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Job {
  _id?: string
  title: string
  company: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number
  maxSalary: number
  frequency: string
}

export default function BrowseJobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get("search") || ""
  const currentJobType = searchParams.get("jobType") || ""
  const currentCategory = searchParams.get("category") || ""
  const currentIsRemote = searchParams.get("isRemote") || ""

  const [searchQuery, setSearchQuery] = useState(currentSearch)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
        const res = await fetch(`${backendUrl}/jobs?${searchParams.toString()}`)
        const data = await res.json()
        
        if (Array.isArray(data)) {
          setJobs(data)
        } else {
          setJobs([])
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [searchParams])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    router.push(`/browsJobs?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Search Bar */}
        <form onSubmit={handleSearchSubmit} className="bg-zinc-950 p-4 sm:p-6 rounded-2xl border border-zinc-900 flex flex-col md:flex-row gap-3 shadow-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, category, keywords..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-600 transition-all"
            />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition-all cursor-pointer">
            Search Jobs
          </Button>
        </form>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900 h-fit">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="font-semibold text-base">Filters</h2>
              <Link href="/browsJobs" className="text-xs text-indigo-400 hover:underline cursor-pointer">
                Reset All
              </Link>
            </div>

            {/* Workplace Type */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Workplace Type</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Remote", value: "true" },
                  { label: "On-site / Office", value: "false" }
                ].map((item) => {
                  const isChecked = currentIsRemote === item.value
                  const params = new URLSearchParams(searchParams.toString())
                  if (isChecked) params.delete("isRemote")
                  else params.set("isRemote", item.value)

                  return (
                    <Link
                      key={item.label}
                      href={`/browsJobs?${params.toString()}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        isChecked 
                          ? "bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 font-medium" 
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? "border-indigo-600 bg-indigo-600/20" : "border-zinc-700"}`}>
                        {isChecked && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                      </span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Job Type</h3>
              <div className="space-y-2 text-sm">
                {["Full-time", "Part-time", "Contract", "Internship"].map((type) => {
                  const isChecked = currentJobType === type
                  const params = new URLSearchParams(searchParams.toString())
                  if (isChecked) params.delete("jobType")
                  else params.set("jobType", type)

                  return (
                    <Link
                      key={type}
                      href={`/browsJobs?${params.toString()}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        isChecked 
                          ? "bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 font-medium" 
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? "border-indigo-600 bg-indigo-600/20" : "border-zinc-700"}`}>
                        {isChecked && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                      </span>
                      {type}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</h3>
              <div className="space-y-2 text-sm">
                {["Engineering", "Design", "Marketing", "Infrastructure"].map((cat) => {
                  const isChecked = currentCategory === cat
                  const params = new URLSearchParams(searchParams.toString())
                  if (isChecked) params.delete("category")
                  else params.set("category", cat)

                  return (
                    <Link
                      key={cat}
                      href={`/browsJobs?${params.toString()}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        isChecked 
                          ? "bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 font-medium" 
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? "border-indigo-600 bg-indigo-600/20" : "border-zinc-700"}`}>
                        {isChecked && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                      </span>
                      {cat}
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                Found <span className="text-white font-semibold">{jobs?.length || 0}</span> Professional Jobs
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16 text-zinc-500">Loading jobs...</div>
            ) : jobs?.length === 0 ? (
              <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-900 text-zinc-500">
                No jobs found matching your criteria.
              </div>
            ) : (
              jobs.map((job, index) => (
                <Link 
                  key={job._id || index} 
                  href={`/browsJobs/${job._id}`}
                  className="block bg-zinc-950/85 border border-zinc-900 p-5 rounded-2xl hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0 group-hover:border-indigo-500/40 transition-colors">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {job.company} • {job.isRemote ? `Remote (${job.location})` : job.location}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <span className="text-xs px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg">
                            💶 €{job.minSalary} - €{job.maxSalary} / {job.frequency}
                          </span>
                          <span className="text-xs px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg font-medium">
                            {job.jobType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.preventDefault(); }} 
                      className="text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              ))
            )}
          </main>

        </div>
      </div>
    </div>
  )
}