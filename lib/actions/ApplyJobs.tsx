"use server"

export default async function ApplyJob(applicationData: {
  jobId?: string
  userId?: string
  userEmail?: string
  userName?: string
  jobTitle?: string
  company?: string
  appliedAt: Date
}) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

    const res = await fetch(`${backendUrl}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to apply for job:", error)
    return { success: false, message: "Something went wrong" }
  }
}