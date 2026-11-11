import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Briefcase, 
  MapPin, 
  Users, 
  Pencil, 
  Trash2, 
  Globe 
} from "lucide-react"
import { getJobs } from "@/lib/api/Jobs"
import { DeleteJobsDiolog } from "@/app/component/DeleteJobsDiolog"

export interface Job {
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
  applicantsCount?: number
  status?: "Active" | "Expired"
}

export default async function ManageJobsPage() {
  // ডাটা ফেচ করা (ধরে নিচ্ছি এটি একটি অ্যারে রিটার্ন করে)
  const result: Job[] = await getJobs()
  const loading = false // Server Component-এ চাইলে রিমूव করতে পারেন বা প্রপস থেকে হ্যান্ডেল করতে পারেন

  return (
    <div className="bg-black text-white p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      
      {/* Top Header & New Job Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-6">
        <div>
          <p className="text-xs text-zinc-400 mb-1">
            Manage Jobs &gt; <span className="text-white font-medium">Job Listings & Postings</span>
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Manage Job Posts</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>

        {/* সঠিক রিক্রুটার পাথ সহ New Job Button */}
        <Button 
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <Link href="/dashboard/recruiter/jobs/new-jobs">
            <Plus className="w-4 h-4" /> New Job Post
          </Link>
        </Button>
      </div>

      {/* Responsive Container */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-900/40">
                <th className="py-4 px-6">Job Title & Dept</th>
                <th className="py-4 px-6">Company & Location</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Compensation</th>
                <th className="py-4 px-6">Applicants</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Deadline</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-900/80 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-zinc-500">Loading job posts...</td>
                </tr>
              ) : !result || result.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-zinc-500">No job posts found.</td>
                </tr>
              ) : (
                result.map((job, index) => (
                  <tr key={job._id || index} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{job.title}</p>
                          <p className="text-xs text-indigo-400 capitalize">{job.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-medium text-zinc-200">{job.company}</p>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        {job.isRemote ? <Globe className="w-3 h-3 text-indigo-400" /> : <MapPin className="w-3 h-3 text-zinc-500" />}
                        {job.isRemote ? `Remote (${job.location})` : job.location}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg">
                        {job.jobType}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-medium text-zinc-200">
                      €{job.minSalary} - €{job.maxSalary} / {job.frequency}
                    </td>

                    <td className="py-4 px-6 text-zinc-300">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{job.applicantsCount || 0} Candidates</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {job.status || "Active"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-zinc-300">{job.deadline}</td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs gap-1.5 cursor-pointer">
                          <Pencil className="w-3.5 h-3.5" /> Update
                        </Button>
                        <DeleteJobsDiolog job={job}></DeleteJobsDiolog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="block md:hidden divide-y divide-zinc-900">
          {loading ? (
            <div className="text-center py-8 text-zinc-500 text-sm">Loading job posts...</div>
          ) : !result || result.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-sm">No job posts found.</div>
          ) : (
            result.map((job, index) => (
              <div key={job._id || index} className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base">{job.title}</h3>
                      <p className="text-xs text-indigo-400">{job.category} • {job.company}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {job.status || "Active"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                  <div>
                    <span className="text-zinc-500 block">Location:</span>
                    <span className="text-zinc-200 font-medium">{job.location}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Compensation:</span>
                    <span className="text-zinc-200 font-medium">€{job.minSalary} - €{job.maxSalary}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Type:</span>
                    <span className="text-zinc-200 font-medium">{job.jobType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Applicants:</span>
                    <span className="text-zinc-200 font-medium">{job.applicantsCount || 0} Candidates</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-zinc-400">Deadline: {job.deadline}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs gap-1">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 bg-zinc-900 hover:bg-red-500/10 text-red-400 rounded-lg text-xs gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}