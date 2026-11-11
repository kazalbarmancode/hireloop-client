import { JobsFormData } from "@/app/dashboard/recruiter/jobs/new-jobs/page"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000" // আপনার ব্যাকএন্ড ইউআরএল দিন
export async function JobsPost(data:JobsFormData) {
  try {
    
    const res = await fetch(`${backendUrl}/jobs`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Failed to post job")
    }

    return await res.json()
  } catch (error) {
    console.error("Error in JobsPost action:", error)
    throw error
  }
}
export async function deletePost(id: string) {
  try {
    const res = await fetch(`${backendUrl}/jobs/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      throw new Error("Failed to delete job post")
    }

    return await res.json()
  } catch (error) {
    console.error("Error in deletePost action:", error)
    throw error
  }
}
