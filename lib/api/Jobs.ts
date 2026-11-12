const baseURL =process.env.NEXT_PUBLIC_BACKEND_URL ||'http://localhost:5000'

export const getJobs =async({ query }: { query: string })=>{
    const res = await fetch(`${baseURL}/jobs?&${query}`)
    return res.json()
}