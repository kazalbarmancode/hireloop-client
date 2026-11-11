"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Globe, 
  ArrowRight 
} from "lucide-react"
import { JobsPost } from "@/lib/actions/JobsPost"
import toast from "react-hot-toast"

// টাইপ ডিফিনিশন
export interface JobsFormData {
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
  responsibilities: string
  qualifications: string
}

export default function PostNewJobPage() {
  const router = useRouter()
  const [jobType, setJobType] = useState("Full-time")
  const [isRemote, setIsRemote] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    // ফর্ম থেকে ডেটা কালেক্ট করে সঠিক টাইপে রূপান্তর করা
    const jobsData: JobsFormData = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      category: formData.get("category") as string,
      jobType,
      isRemote,
      location: formData.get("location") as string,
      deadline: formData.get("deadline") as string,
      minSalary: Number(formData.get("minSalary")) || 0,
      maxSalary: Number(formData.get("maxSalary")) || 0,
      frequency: formData.get("frequency") as string,
      responsibilities: formData.get("responsibilities") as string,
      qualifications: formData.get("qualifications") as string,
    }

      // JobsPost ফাংশনে ডেটা পাঠানো
      const result = await JobsPost(jobsData)
      if(result){
        console.log("Job posted successfully:", result)
        toast.success("Job posted successfully!")

        router.push('/dashboard/recruiter/jobs')
      }else{
      toast.error("Failed to post job. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        
        {/* Header & Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <p className="text-xs text-zinc-400 mb-1">
              Manage Jobs &gt; <span className="text-white font-medium">Create New Listing</span>
            </p>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Post a New Job</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            {loading ? "Publishing..." : <>Publish Job <ArrowRight className="w-4 h-4" /></>}
          </Button>
        </div>

        {/* SECTION 1: Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 1. Basic Information
          </h3>

          <div className="space-y-4 bg-zinc-950/40 p-4 sm:p-6 rounded-2xl border border-zinc-900">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Job Title *</label>
              <Input 
                name="title" 
                required 
                placeholder="Frontend Developer" 
                className="bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Company Name *</label>
                <div className="relative flex items-center">
                  <Building2 className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input 
                    name="company" 
                    required 
                    placeholder="HirePulse Network" 
                    className="bg-zinc-900/60 border-zinc-800 text-white pl-10 placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Job Category *</label>
                <select 
                  name="category"
                  className="w-full bg-zinc-900/60 border border-zinc-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Job Type *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`py-2.5 text-xs font-medium rounded-xl border transition-all ${
                      jobType === type 
                        ? "bg-zinc-800 border-zinc-700 text-white shadow" 
                        : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Location, Compensation & Timeline */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 2. Location, Compensation & Timeline
          </h3>

          <div className="space-y-4 bg-zinc-950/40 p-4 sm:p-6 rounded-2xl border border-zinc-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-white">Remote Work Allowed (isRemote)</h4>
                  <p className="text-xs text-zinc-400">Enable worldwide or distributed candidate applications</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors self-start sm:self-auto ${
                  isRemote ? "bg-indigo-600" : "bg-zinc-800"
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isRemote ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Job Location (location)</label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input 
                    name="location" 
                    placeholder="New York, USA" 
                    className="bg-zinc-900/60 border-zinc-800 text-white pl-10 placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Application Deadline (deadline)</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input 
                    name="deadline" 
                    type="text" 
                    placeholder="05/30/2025" 
                    className="bg-zinc-900/60 border-zinc-800 text-white pl-10 placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Min Salary / Rate</label>
                <Input 
                  name="minSalary" 
                  type="number"
                  placeholder="25" 
                  className="bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Max Salary / Rate</label>
                <Input 
                  name="maxSalary" 
                  type="number"
                  placeholder="40" 
                  className="bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500 rounded-xl py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Frequency</label>
                <select 
                  name="frequency"
                  className="w-full bg-zinc-900/60 border border-zinc-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="per hour">per hour</option>
                  <option value="per month">per month</option>
                  <option value="per year">per year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Responsibilities & Requirements */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 3. Responsibilities & Requirements
          </h3>

          <div className="space-y-4 bg-zinc-950/40 p-4 sm:p-6 rounded-2xl border border-zinc-900">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Key Responsibilities *</label>
              <textarea 
                name="responsibilities"
                rows={4}
                placeholder="Showcase your commitment..."
                className="w-full bg-zinc-900/60 border border-zinc-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Qualifications & Requirements *</label>
              <textarea 
                name="qualifications"
                rows={4}
                placeholder="• 3+ years of experience..."
                className="w-full bg-zinc-900/60 border border-zinc-800 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-indigo-500 resize-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}