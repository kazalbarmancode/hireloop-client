const baseURL =process.env.NEXT_PUBLIC_BACKEND_URL ||'http://localhost:5000'

export const getJobs =async()=>{
    const res = await fetch(`${baseURL}/jobs`)
    return res.json()
}