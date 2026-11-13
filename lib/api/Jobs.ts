const baseURL =process.env.NEXT_PUBLIC_BACKEND_URL ||'http://localhost:5000'

export const getJobs =async({ query, jobType, category }: { query: string; jobType?: string; category?: string }) => {
  let url = `${baseURL}/jobs`
  const params = new URLSearchParams()
  
  if (query) params.append('search', query)
  if (jobType) params.append('jobType', jobType)
  if (category) params.append('category', category)
  
  url += `?${params.toString()}`
  
  const res = await fetch(url)
  return res.json()
}