"use client"

import { useState } from "react"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/actions/JobsPost"

// প্রপসের ইন্টারফেস ডিফাইন করা
interface JobItem {
  _id?: string
  title: string
}

export function DeleteJobsDiolog({ job }: { job: JobItem }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDeleteJob = async () => {
    if (!job._id) return
    try {
      setLoading(true)
     const res= await deletePost(job._id)
      console.log(job._id,res)
      router.refresh() // পেজ ডেটা রিফ্রেশ করার জন্য
    } catch (error) {
      console.error("Failed to delete job:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger >
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-zinc-900 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-zinc-400 cursor-pointer">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="border-zinc-800 bg-[#0b0c10] text-white">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-500/10 text-red-400">
            <Trash2Icon className="w-5 h-5" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job Post?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            This will permanently delete &quot;<span className="text-white font-medium">{job.title}</span>&quot;. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteJob}
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}