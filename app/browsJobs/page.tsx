import { getJobs } from "@/lib/api/Jobs"
import React from "react"

const BrowseJobsPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const search= await searchParams
    const searchParamsString= new URLSearchParams(search as Record<string, string>)
    const query = searchParamsString.toString()
    console.log("searchParams:", query)
    const jobsData =await getJobs({query})

  return (
    <div>
        <h1 className="text-2xl font-bold text-black">Browse Jobs</h1>
        {
            jobsData.map(job=>{
return (
  <div key={job._id} className="border p-4 mb-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">{job.jobType}</h2>
    <p className="text-gray-600">{job.description}</p>
    <p className="text-gray-500 text-sm">Location: {job.location}</p>
    <p className="text-gray-500 text-sm">Salary: {job.salary}</p>
  </div>
)
            })
        }
    </div>
  )
}

export default BrowseJobsPage
