"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DUMMY_ANALYTICS } from "@/lib/analytics";
import { getSession } from "@/lib/auth";
import { SessionNavBar, MobileNavBar } from "@/components/ui/sidebar";
import { RangeCalendar } from "@/components/ui/calendar-rac";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateRange } from "react-aria-components";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle, Search, Bell, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { text: "HAI Analytics revolutionized our operations, streamlining finance and inventory.", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Briana Patton", role: "Operations Manager" },
  { text: "Implementing this platform was smooth and quick. Team training was effortless.", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "Bilal Ahmed", role: "IT Manager" },
  { text: "The support team is exceptional — guiding us every step of the way.", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Saman Malik", role: "Customer Support Lead" },
  { text: "Seamless integration enhanced our business operations and efficiency.", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "Omar Raza", role: "CEO" },
  { text: "Robust features and quick support transformed our workflow significantly.", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Zainab Hussain", role: "Project Manager" },
  { text: "The smooth implementation exceeded every expectation we had.", image: "https://randomuser.me/api/portraits/women/6.jpg", name: "Aliza Khan", role: "Business Analyst" },
  { text: "Our business functions improved with the user-friendly design.", image: "https://randomuser.me/api/portraits/men/7.jpg", name: "Farhan Siddiqui", role: "Marketing Director" },
  { text: "They delivered a solution that truly understood our needs.", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Sana Sheikh", role: "Sales Manager" },
  { text: "Our online presence and conversions improved significantly with HAI.", image: "https://randomuser.me/api/portraits/men/9.jpg", name: "Hassan Ali", role: "E-commerce Manager" },
];

const subscriptions = [
  { id: "SUB001", customer: "John Doe", plan: "Pro", status: "Active", renewal: "Feb 15, 2025", amount: "$49.99" },
  { id: "SUB002", customer: "Jane Smith", plan: "Basic", status: "Cancelled", renewal: "Jan 10, 2025", amount: "$19.99" },
  { id: "SUB003", customer: "Michael Brown", plan: "Enterprise", status: "Pending", renewal: "Mar 1, 2025", amount: "$99.99" },
  { id: "SUB004", customer: "Emily Johnson", plan: "Pro", status: "Active", renewal: "Feb 20, 2025", amount: "$49.99" },
  { id: "SUB005", customer: "David Wilson", plan: "Basic", status: "Active", renewal: "Feb 5, 2025", amount: "$19.99" },
];

const data = DUMMY_ANALYTICS;

function StatCard({ icon: Icon, label, value, change, positive, color, delay }: { icon: React.ElementType; label: string; value: string; change: string; positive: boolean; color: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-xs font-semibold flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: positive ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: positive ? "#059669" : "#dc2626" }}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{change}
        </span>
      </div>
      <div className="text-2xl font-bold mb-1" style={{ fontFamily: "Georgia,serif", color: "#1a1714" }}>{value}</div>
      <div className="text-xs" style={{ color: "#9a9490" }}>{label}</div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ name: string; email: string; role: string } | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const now = today(getLocalTimeZone());
  const [dateRange, setDateRange] = useState<DateRange | null>({
    start: now.subtract({ months: 1 }),
    end: now,
  });
  const calendarRef = useRef<HTMLDivElement>(null);
  const isReal = !!process.env.NEXT_PUBLIC_ANALYTICS_API_KEY;

  useEffect(() => {
    const s = getSession();
    if (!s) { router.replace("/"); return; }
    setSession(s);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  const formatDate = (date: any) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date.toDate(getLocalTimeZone()));
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(155deg,#fdfcfb 0%,#f4efe8 45%,#f9f8f5 100%)" }}>
      <SessionNavBar />
      <MobileNavBar />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10 lg:ml-[3.5rem]">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[72px] opacity-40" style={{ background: "#dbeafe", top: "-100px", left: "-80px" }} />
          <div className="absolute w-[380px] h-[380px] rounded-full blur-[72px] opacity-35" style={{ background: "#fce7f3", bottom: "10%", right: "-80px" }} />
          <div className="absolute w-[340px] h-[340px] rounded-full blur-[72px] opacity-30" style={{ background: "#d1fae5", bottom: "-80px", left: "35%" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-4 px-7 h-16 flex-shrink-0 relative z-50"
          style={{ background: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.88)", backdropFilter: "blur(24px)" }}>
          <div className="flex items-center gap-3 pl-10 lg:pl-0">
            <span className="text-lg font-medium" style={{ fontFamily: "Georgia,serif", color: "#1a1714" }}>Overview</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 rounded-full text-xs outline-none border transition-all focus:ring-1 focus:ring-blue-200" style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(26,23,20,0.1)" }} />
            </div>
            
            <button className="p-2 rounded-full hover:bg-black/5 transition-colors relative hidden sm:flex">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>

            {!isReal && (
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg" style={{ background: "rgba(245,158,11,0.1)", color: "#d97706", border: "1px solid rgba(245,158,11,0.2)" }}>
                <AlertCircle className="w-3 h-3" /> <span className="hidden xs:inline">Demo Data</span>
              </div>
            )}
            
            {/* Date Range Picker Trigger */}
            <div className="relative" ref={calendarRef}>
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors" 
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(26,23,20,0.08)", color: "#4a4540" }}>
                <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{formatDate(dateRange?.start)} – {formatDate(dateRange?.end)}, 2025</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", showCalendar && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showCalendar && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 p-3 bg-white rounded-2xl border shadow-2xl z-[100]"
                  >
                    <RangeCalendar 
                      value={dateRange}
                      onChange={setDateRange}
                      className="bg-white"
                    />
                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                      <button onClick={() => setShowCalendar(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-black/5">Cancel</button>
                      <button onClick={() => setShowCalendar(false)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-black text-white">Apply Range</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: "Georgia,serif" }}>Welcome, <em className="font-light">{session?.name?.split(' ')[0] || 'Admin'}</em></h1>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "#9a9490" }}>Everything looks good in your workspace.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-black text-white hover:opacity-80 transition-opacity">Export Analytics</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={DollarSign} label="Monthly Recurring Revenue" value="$84,290" change="+12.4%" positive delay={0.4} color="#3b82f6" />
            <StatCard icon={TrendingUp} label="Annual Recurring Revenue" value="$1.01M" change="+8.7%" positive delay={0.5} color="#10b981" />
            <StatCard icon={Users} label="Active Customers" value="2,847" change="+23" positive delay={0.6} color="#8b5cf6" />
            <StatCard icon={Activity} label="Churn Rate" value="2.8%" change="+0.3%" positive={false} delay={0.7} color="#ef4444" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="lg:col-span-2 rounded-2xl p-4 sm:p-6" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
              <h3 className="font-semibold mb-1" style={{ fontFamily: "Georgia,serif", fontSize: "18px" }}>Revenue Trends</h3>
              <p className="text-xs mb-6" style={{ color: "#9a9490" }}>MRR performance vs monthly growth targets</p>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.revenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,23,20,0.05)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9a9490" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9a9490" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.95)", fontSize: 12 }} formatter={(v) => [`$${v}K`]} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#9a9490", paddingTop: 20 }} iconType="circle" />
                    <Line type="monotone" dataKey="mrr" stroke="#1a1714" strokeWidth={3} dot={{ r: 4, fill: "white", stroke: "#1a1714", strokeWidth: 2 }} activeDot={{ r: 6 }} name="MRR ($K)" />
                    <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="rounded-2xl p-4 sm:p-6" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
              <h3 className="font-semibold mb-1" style={{ fontFamily: "Georgia,serif", fontSize: "18px" }}>Plan Distribution</h3>
              <p className="text-xs mb-4" style={{ color: "#9a9490" }}>Subscriber share per plan</p>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                      {data.planDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.95)", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {data.planDistribution.map((d) => (
                  <div key={d.name} className="flex items-center gap-3 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                    <span className="flex-1 text-muted-foreground">{d.name}</span>
                    <span className="font-bold" style={{ color: "#1a1714" }}>{d.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }} className="rounded-2xl p-4 sm:p-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold" style={{ fontFamily: "Georgia,serif", fontSize: "18px" }}>Recent Activity</h3>
                <p className="text-xs mt-0.5" style={{ color: "#9a9490" }}>Latest customer subscriptions</p>
              </div>
              <button className="text-xs font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Renewal</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id} className="group cursor-pointer">
                      <TableCell><span className="font-mono text-[10px] text-muted-foreground">{sub.id}</span></TableCell>
                      <TableCell className="font-medium text-xs sm:text-sm">{sub.customer}</TableCell>
                      <TableCell className="hidden sm:table-cell"><span className={cn("text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded", sub.plan === "Pro" && "bg-blue-50 text-blue-600", sub.plan === "Enterprise" && "bg-purple-50 text-purple-600", sub.plan === "Basic" && "bg-slate-50 text-slate-600")}>{sub.plan}</span></TableCell>
                      <TableCell><div className="flex items-center gap-1.5"><div className={cn("w-1.5 h-1.5 rounded-full", sub.status === "Active" ? "bg-green-500" : sub.status === "Cancelled" ? "bg-red-500" : "bg-amber-500")} /><span className="text-[10px] sm:text-xs">{sub.status}</span></div></TableCell>
                      <TableCell className="hidden md:table-cell text-[10px] sm:text-xs text-muted-foreground">{sub.renewal}</TableCell>
                      <TableCell className="text-right font-semibold text-xs sm:text-sm">{sub.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }} className="rounded-2xl p-4 sm:p-8" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2" style={{ fontFamily: "Georgia,serif" }}>User Feedback</h3>
              <p className="text-xs sm:text-sm max-w-lg mx-auto" style={{ color: "#9a9490" }}>Real-time sentiment from our global user base.</p>
            </div>
            <div className="flex justify-center gap-6 h-[300px] sm:h-[400px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
              <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={20} />
              <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden sm:block" duration={25} />
              <TestimonialsColumn testimonials={testimonials.slice(6, 9)} className="hidden lg:block" duration={22} />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
