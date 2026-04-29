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
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.5rem",
  },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/reports", icon: FileClock },
  { label: "AI Chat", href: "/dashboard/chat", icon: MessagesSquare, badge: "BETA" },
  { type: "separator" },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: Users },
  { label: "Accounts", href: "/dashboard/accounts", icon: UserCircle },
  { label: "Competitors", href: "/dashboard/competitors", icon: UserSearch },
  { type: "separator" },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Feedbacks", href: "/dashboard/feedbacks", icon: MessageSquareText },
  { label: "Users", href: "/dashboard/users", icon: ShieldCheck },
];

export function NavContent({ isCollapsed = false, onAction = () => {} }) {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full flex-col">
      <div className="flex grow flex-col items-center">
        {/* Org Switcher */}
        <div className="flex h-[54px] w-full shrink-0 border-b p-2">
          <div className="mt-[1.5px] flex w-full">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="w-full" asChild>
                <Button variant="ghost" size="sm" className="flex w-fit items-center gap-2 px-2">
                  <Avatar className='rounded size-4'>
                    <AvatarFallback className="bg-black text-white text-[10px]">H</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <motion.div variants={variants} className="flex items-center gap-2">
                      <p className="text-sm font-medium">HAI Analytics</p>
                      <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
                    </motion.div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild onClick={onAction}>
                  <Link href="/dashboard/settings/members" className="flex items-center gap-2">
                    <UserCog className="h-4 w-4" /> Manage members
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={onAction}>
                  <Link href="/dashboard/settings/integrations" className="flex items-center gap-2">
                    <Blocks className="h-4 w-4" /> Integrations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild onClick={onAction}>
                  <Link href="/dashboard/select-org" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Create organization
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Nav Menu */}
        <div className="flex h-full w-full flex-col">
          <div className="flex grow flex-col gap-4">
            <ScrollArea className="grow p-2">
              <div className="flex w-full flex-col gap-1">
                {navItems.map((item, index) => {
                  if (item.type === "separator") {
                    return <Separator key={index} className="my-2" />;
                  }
                  const Icon = item.icon!;
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      onClick={onAction}
                      className={cn(
                        "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        pathname === item.href && "bg-muted text-blue-600",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <motion.div variants={variants} className="ml-2 flex items-center justify-between w-full">
                          <p className="text-sm font-medium">{item.label}</p>
                          {item.badge && (
                            <Badge className="h-fit rounded border-none bg-blue-50 px-1.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" variant="outline">
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
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col p-2 gap-1 border-t">
            <Link
              href="/dashboard/settings"
              onClick={onAction}
              className={cn(
                "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                pathname === "/dashboard/settings" && "bg-muted text-blue-600"
              )}
            >
              <Settings className="h-4 w-4 shrink-0" />
              {!isCollapsed && <motion.p variants={variants} className="ml-2 text-sm font-medium">Settings</motion.p>}
            </Link>
            
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="w-full">
                <div className="flex h-9 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-blue-600 text-white text-[10px]">A</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <motion.div variants={variants} className="flex w-full items-center gap-2">
                      <p className="text-sm font-medium">Account</p>
                      <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                    </motion.div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isCollapsed ? "right" : "top"} align="end" sideOffset={12} className="w-56">
                <div className="flex flex-row items-center gap-2 p-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-blue-600 text-white">AL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">admin@hai.com</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild onClick={onAction}>
                  <Link href="/dashboard/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600" onClick={() => {
                  localStorage.removeItem("hai_session");
                  window.location.href = "/";
                }}>
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r bg-white dark:bg-black hidden lg:flex",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all w-full" animate={{ opacity: 1 }}>
        <motion.ul variants={staggerVariants} className="flex h-full flex-col w-full">
          <NavContent isCollapsed={isCollapsed} />
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export function MobileNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full shadow-md bg-white/80 backdrop-blur-md">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-white">
          <div className="h-full py-4">
             <NavContent onAction={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
