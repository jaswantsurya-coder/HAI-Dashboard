"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"
import {
  Blocks,
  ChevronsUpDown,
  FileClock,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  MessagesSquare,
  Plus,
  Settings,
  UserCircle,
  UserCog,
  UserSearch,
  Users,
  BarChart3,
  Star,
  ShieldCheck,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.5rem" },
};

const textVariants = {
  open: { opacity: 1, x: 0, display: "block" },
  closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/reports", icon: FileClock },
  { label: "AI Chat", href: "/dashboard/chat", icon: MessagesSquare, badge: "BETA" },
  { type: "separator" },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: ShieldCheck },
  { label: "Accounts", href: "/dashboard/accounts", icon: UserCircle },
  { label: "Competitors", href: "/dashboard/competitors", icon: UserSearch },
  { type: "separator" },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Feedbacks", href: "/dashboard/feedbacks", icon: MessageSquareText },
];

export function NavContent({ isCollapsed = false, onAction = () => {} }) {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex grow flex-col">
        {/* Org Switcher */}
        <div className="flex h-14 w-full shrink-0 items-center border-b px-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex w-full items-center justify-start gap-2 px-1 hover:bg-transparent">
                <div className="flex size-6 shrink-0 items-center justify-center rounded bg-black text-[10px] font-bold text-white">H</div>
                {!isCollapsed && (
                  <motion.div initial="closed" animate="open" variants={textVariants} className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-black">
                    <span className="text-sm font-semibold">HAI Analytics</span>
                    <ChevronsUpDown className="size-3 opacity-50" />
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild onClick={onAction}>
                <Link href="/dashboard/settings/members" className="flex items-center gap-2"><UserCog className="size-4" /> Members</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={onAction}>
                <Link href="/dashboard/settings/integrations" className="flex items-center gap-2"><Blocks className="size-4" /> Integrations</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild onClick={onAction}>
                <Link href="/dashboard/select-org" className="flex items-center gap-2"><Plus className="size-4" /> New Org</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Nav Menu */}
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              if (item.type === "separator") return <Separator key={index} className="my-2 bg-black/5" />;
              const Icon = item.icon!;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={onAction}
                  className={cn(
                    "flex h-9 items-center gap-3 rounded-md px-2 text-[#4a4540] transition-all hover:bg-black/5 hover:text-black",
                    isActive && "bg-black/5 text-blue-600 font-semibold"
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", isActive ? "text-blue-600" : "text-[#9a9490]")} />
                  {!isCollapsed && (
                    <motion.div initial="closed" animate="open" variants={textVariants} className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap text-sm">
                      {item.label}
                      {item.badge && (
                        <Badge className="ml-2 h-4 border-none bg-blue-100 px-1 text-[10px] text-blue-700">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="mt-auto border-t p-2 space-y-1">
          <Link
            href="/dashboard/settings"
            onClick={onAction}
            className={cn(
              "flex h-9 items-center gap-3 rounded-md px-2 text-[#4a4540] transition-all hover:bg-black/5 hover:text-black",
              pathname === "/dashboard/settings" && "bg-black/5 text-blue-600 font-semibold"
            )}
          >
            <Settings className="size-4 shrink-0 text-[#9a9490]" />
            {!isCollapsed && <motion.span initial="closed" animate="open" variants={textVariants} className="text-sm">Settings</motion.span>}
          </Link>
          
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-full justify-start gap-3 px-2 hover:bg-black/5">
                <Avatar className="size-5">
                  <AvatarFallback className="bg-blue-600 text-[10px] text-white">A</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <motion.div initial="closed" animate="open" variants={textVariants} className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap text-sm font-normal text-[#4a4540]">
                    <span>Account</span>
                    <ChevronsUpDown className="size-3 opacity-50" />
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isCollapsed ? "right" : "top"} align="center" sideOffset={16} className="w-56 pb-2 shadow-2xl rounded-xl border-black/10">
              <div className="flex items-center gap-2 p-3 border-b border-black/5 mb-1">
                <Avatar className="size-8"><AvatarFallback className="bg-blue-600 text-white font-semibold">AD</AvatarFallback></Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold">Admin User</span>
                  <span className="text-[10px] font-medium text-muted-foreground">admin@hai.com</span>
                </div>
              </div>
              <DropdownMenuItem asChild onClick={onAction} className="mx-1 cursor-pointer rounded-lg">
                <Link href="/dashboard/profile" className="flex items-center gap-2"><UserCircle className="size-4" /> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-2 my-1" />
              <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 mx-1 cursor-pointer rounded-lg font-medium" onClick={() => {
                localStorage.removeItem("hai_session");
                window.location.href = "/";
              }}>
                <LogOut className="size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 h-screen border-r bg-white shadow-xl hidden lg:block"
      initial={false}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <NavContent isCollapsed={isCollapsed} />
    </motion.aside>
  );
}

export function MobileNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-md">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
           <NavContent onAction={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
