"use client";
import { motion } from "motion/react";
import { Users, TrendingUp, TrendingDown, Activity, ArrowUpRight, BarChart3, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const performanceData = [
  { name: "Jan", hai: 4000, compA: 2400, compB: 2400 },
  { name: "Feb", hai: 3000, compA: 1398, compB: 2210 },
  { name: "Mar", hai: 2000, compA: 9800, compB: 2290 },
  { name: "Apr", hai: 2780, compA: 3908, compB: 2000 },
  { name: "May", hai: 1890, compA: 4800, compB: 2181 },
  { name: "Jun", hai: 2390, compA: 3800, compB: 2500 },
  { name: "Jul", hai: 3490, compA: 4300, compB: 2100 },
];

const competitors = [
  { id: 1, name: "NexusAI", marketShare: 28, trend: "up", growth: "+12.4%", status: "High Threat" },
  { id: 2, name: "Synthetix", marketShare: 15, trend: "down", growth: "-3.2%", status: "Monitoring" },
  { id: 3, name: "Aura Logic", marketShare: 8, trend: "up", growth: "+4.1%", status: "Emerging" },
];

export default function CompetitorsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Competitor Intelligence</h1>
          <p className="text-muted-foreground text-sm">Real-time market share and performance tracking.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Globe className="w-4 h-4" /> Add Competitor
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Competitor Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +15.3%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground font-medium">Market Leader</p>
            <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "Georgia,serif" }}>NexusAI</h3>
            <p className="text-sm mt-2 text-indigo-600 font-medium">28% Market Share</p>
          </div>
        </motion.div>

        {/* Fastest Growing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +22.4%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground font-medium">Fastest Growing</p>
            <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "Georgia,serif" }}>Aura Logic</h3>
            <p className="text-sm mt-2 text-amber-600 font-medium">8% Market Share</p>
          </div>
        </motion.div>

        {/* Losing Traction Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-rose-600" />
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -5.1%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground font-medium">Losing Traction</p>
            <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "Georgia,serif" }}>Synthetix</h3>
            <p className="text-sm mt-2 text-rose-600 font-medium">15% Market Share</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-6 rounded-3xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
          <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "Georgia,serif" }}>Share of Voice (vs Top Competitors)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCompA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="hai" name="HAI Dashboard" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHai)" />
                <Area type="monotone" dataKey="compA" name="NexusAI" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorCompA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Competitor List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
          <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "Georgia,serif" }}>Watchlist</h3>
          
          <div className="space-y-4">
            {competitors.map((comp) => (
              <motion.div 
                key={comp.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-white/50 border border-black/5 hover:border-black/10 transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm">{comp.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{comp.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{comp.marketShare}%</p>
                  <p className={cn("text-xs font-bold mt-0.5", comp.trend === "up" ? "text-green-600" : "text-rose-600")}>
                    {comp.growth}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-black/20 text-sm font-semibold text-muted-foreground hover:bg-black/5 transition-colors">
            View Full Report
          </button>
        </motion.div>
      </div>
    </div>
  );
}
