import React from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Bookmark,
  Send,
  Building2,
  ShieldCheck,
  Clock,
  TrendingUp,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Job {
  _id: string
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
  applicantsCount?: number
  status?: string
  responsibilities: string
  qualifications: string
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobsDetailsPage({ params }: PageProps) {
  const { id } = await params

  // ব্যাকএন্ড থেকে নির্দিষ্ট জবের ডেটা ফেচ করা
  let job: Job | null = null
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    const res = await fetch(`${backendUrl}/jobs/${id}`, {
      cache: "no-store",
    })
    if (res.ok) {
      job = await res.json()
    }
  } catch (error) {
    console.error("Failed to fetch job details:", error)
  }

  // জব খুঁজে না পাওয়া গেলে
  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-200">Job Not Found</h2>
        <p className="text-zinc-500 max-w-md">
          The job posting you are looking for might have been removed or the link is invalid.
        </p>
        <Link href="/browsJobs">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Browse Jobs
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Link */}
        <div>
          <Link 
            href="/browsJobs" 
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all jobs
          </Link>
        </div>

        {/* 1. Top Header Banner Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span className="font-semibold text-zinc-200">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-xs border border-emerald-500/20 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Employer
                </span>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="outline" 
              className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl py-6 px-4 cursor-pointer"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl py-6 px-7 shadow-lg shadow-indigo-600/20 cursor-pointer">
              <Send className="w-4 h-4 mr-2" /> Apply Now
            </Button>
          </div>
        </div>

        {/* 2. Quick Stat Overview Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl space-y-1 shadow-md">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-medium">
              <DollarSign className="w-4 h-4 text-indigo-400" /> Salary Range
            </div>
            <p className="text-base sm:text-lg font-bold text-white pt-1">
              €{job.minSalary?.toLocaleString()} - €{job.maxSalary?.toLocaleString()}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl space-y-1 shadow-md">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-medium">
              <MapPin className="w-4 h-4 text-indigo-400" /> Location
            </div>
            <p className="text-base sm:text-lg font-bold text-white pt-1 truncate">
              {job.isRemote ? `Remote (${job.location})` : job.location}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl space-y-1 shadow-md">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-medium">
              <Clock className="w-4 h-4 text-indigo-400" /> Job Type
            </div>
            <p className="text-base sm:text-lg font-bold text-white pt-1">
              {job.jobType}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl space-y-1 shadow-md">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-medium">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Category
            </div>
            <p className="text-base sm:text-lg font-bold text-white pt-1 truncate">
              {job.category}
            </p>
          </div>
        </div>

        {/* Main Content Layout (Left Details + Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Job Description, Responsibilities, Requirements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Job Description Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
              <h2 className="text-xl font-bold text-white">Job Description</h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                At {job.company}, we are building the next generation of digital platforms and scalable solutions. 
                We are looking for a passionate professional for the position of <strong className="text-white">{job.title}</strong> who 
                thrives in dynamic environments and values clean code, responsive UI, and robust backend architecture. 
                You will be a key member of our team working closely with product leadership to drive impactful features.
              </p>
            </div>

            {/* Responsibilities Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
              <h2 className="text-xl font-bold text-white">Responsibilities</h2>
              <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                {job.responsibilities ? (
                  job.responsibilities.split('.').filter(Boolean).map((resp, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <p>{resp.trim()}.</p>
                    </div>
                  ))
                ) : (
                  <p>Lead the end-to-end process for major platform features from discovery to production deployment.</p>
                )}
              </div>
            </div>

            {/* Requirements / Qualifications Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-5 shadow-md">
              <h2 className="text-xl font-bold text-white">Requirements</h2>
              
              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {[job.category, job.jobType, job.isRemote ? "Remote Work" : "On-site", "REST APIs", "Modern Toolchain"].map((tag, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg font-medium">
                    ✦ {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p>{job.qualifications}</p>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
              <h2 className="text-xl font-bold text-white">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">Full Health & Dental Coverage</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">Competitive Salary & Bonus</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">Latest Hardware Stipend</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">Flexible Working Hours & PTO</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Company Overview Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-md sticky top-6">
              <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-3">
                Company Overview
              </h3>

              {/* Company banner mockup */}
              <div className="w-full h-36 rounded-xl bg-gradient-to-br from-zinc-900 to-indigo-950/40 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                <Building2 className="w-12 h-12 text-indigo-500/40" />
                <span className="absolute bottom-3 text-xs font-semibold text-zinc-400">{job.company}</span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Company Size</span>
                  <span className="font-semibold text-zinc-200">250 - 500 Employees</span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Industry</span>
                  <span className="font-semibold text-zinc-200">{job.category} / Technology</span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Deadline</span>
                  <span className="font-semibold text-zinc-200">{job.deadline}</span>
                </div>

                <div className="flex items-center justify-between pb-1">
                  <span className="text-zinc-500">Applicants</span>
                  <span className="font-semibold text-indigo-400">{job.applicantsCount ?? 42} Applied</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white rounded-xl py-5 font-medium cursor-pointer">
                <Globe className="w-4 h-4 mr-2" /> Visit Website
              </Button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}