import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSideBar } from "../component/DashboardSideBar"
import { Toaster } from "react-hot-toast"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black text-white overflow-hidden">
        {/* সাইডবার */}
        <DashboardSideBar />
        
        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* ট্রিগার বাটন এবং হেডার স্পেস */}
          <div className="flex items-center px-4 py-3 border-b border-zinc-900 bg-zinc-950/40 md:hidden">
            <SidebarTrigger className="text-white hover:bg-zinc-800" />
            <span className="ml-3 font-semibold text-sm">Dashboard Menu</span>
          </div>

          {/* পেজের মূল চিলড্রেন কন্টেন্ট */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto">
            {children}
          </div>
          <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1 border-zinc-800',
            },
          }} 
        />
        </main>
        
      </div>
    </SidebarProvider>
  )
};

export default DashboardLayout;