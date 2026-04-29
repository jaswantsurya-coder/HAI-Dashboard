"use client";

import { SessionNavBar, MobileNavBar } from "@/components/ui/sidebar"

export default function SidebarDemo() {
  return (
    <div className="flex h-screen w-screen flex-row bg-slate-50">
      <SessionNavBar />
      <MobileNavBar />
      <main className="flex h-screen grow flex-col overflow-auto p-6 sm:p-12 lg:ml-[3.5rem]">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Responsive Sidebar Demo</h1>
            <p className="text-muted-foreground">
              On **Desktop**, hover over the left edge to expand the sidebar. <br />
              On **Mobile/Tablet**, click the floating menu button at the top-left to open the navigation drawer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Updated Labels</h2>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                <li>Analytics</li>
                <li>Reviews</li>
                <li>Users</li>
                <li>Subscribers</li>
                <li>Accounts</li>
                <li>Competitors</li>
                <li>Reports</li>
                <li>Feedbacks</li>
                <li>Settings</li>
                <li>Account</li>
                <li>AI Chat</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white border shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Responsive Logic</h2>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                <li>Desktop: Fixed, hover-to-expand</li>
                <li>Mobile: Radix UI Sheet (Drawer)</li>
                <li>Shared: NavContent component</li>
                <li>Animations: Framer Motion</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
