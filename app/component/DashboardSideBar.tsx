"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Briefcase, 
  BookmarkCheck, 
  FileText, 
  CreditCard, 
  Settings, 
  Users, 
  Building2, 
  PlusCircle
} from "lucide-react"
import Link from "next/link"

// রোল অনুযায়ী আলাদা আলাদা মেনু এবং আইকন লিস্ট
const menuItemByRole = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: BookmarkCheck },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Add Jobs", url: "/dashboard/recruiter/jobs/new-jobs", icon: PlusCircle },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ]
}

export function DashboardSideBar() {
  const { data: session } = useSession()
  const router = useRouter()
  
  // ইউজার রোল ফেচ করা, না থাকলে ডিফল্ট seeker ধরা
  const role = (session?.user?.role as keyof typeof menuItemByRole) || "seeker"
  const currentMenuItems = menuItemByRole[role] || menuItemByRole.seeker

  return (
    <Sidebar className="bg-black border-zinc-800 text-white">
      {/* লোগো ও হেডার অংশ */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-sky-400">
            hire<span className="text-orange-500">loop</span>
          </span>
        </div>

        {/* ইউজার কার্ড ইনফো */}
        <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center font-bold text-white">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate text-white">
              {session?.user?.name || "User"}
            </h4>
            <p className="text-xs text-zinc-400 capitalize">
              {role === "seeker" ? "Job Seeker" : role}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {currentMenuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <SidebarMenuItem key={item.name}>
                  {/* এখানে asChild প্রপটি যোগ করা হয়েছে */}
                  <SidebarMenuButton 
                    
                    className="hover:bg-zinc-800/60 text-zinc-300 hover:text-white transition-all rounded-lg py-2.5 h-auto"
                  >
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <IconComponent className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        {role === "seeker" && (
          <button 
            onClick={() => router.push("/dashboard/post-resume")}
            className="w-full py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Post Resume
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}