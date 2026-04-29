"use client";
import { motion } from "motion/react";
import { Building2 } from "lucide-react";

export default function AccountsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Accounts</h1>
        <p className="text-muted-foreground text-sm">Manage client accounts and organizational structures.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-12 text-center"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-2xl flex items-center justify-center">
          <Building2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Georgia,serif" }}>Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          The Accounts management module is currently under development. This area will provide a CRM-like interface for managing organizational entities.
        </p>
      </motion.div>
    </div>
  );
}
