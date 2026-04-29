"use client";
import { motion } from "motion/react";
import { User, Mail, Shield, Smartphone, Globe, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Your Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your personal information and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Identity Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-xl shadow-blue-600/20">
              AD
            </div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "Georgia,serif" }}>Admin User</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-6">admin@hai.com</p>
            
            <button className="w-full py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-sm font-semibold transition-colors">
              Edit Avatar
            </button>
          </div>

          <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
            <h3 className="font-bold text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium hover:bg-black/5 transition-colors text-left">
                <Globe className="w-4 h-4 text-muted-foreground" /> Language: English
              </button>
              <button 
                onClick={() => { localStorage.removeItem("hai_session"); window.location.href = "/"; }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-50 text-red-600 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          {/* Personal Info */}
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold" style={{ fontFamily: "Georgia,serif" }}>Personal Information</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                  <p className="mt-1 text-sm font-medium">Admin</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <p className="mt-1 text-sm font-medium">User</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-black/5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium">admin@hai.com</p>
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[10px] font-bold ml-2">Verified</span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <div className="flex items-center gap-2 mt-1">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Summary */}
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "Georgia,serif" }}>Account Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">Not enabled</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl text-xs font-bold border border-black/10 hover:bg-black/5 transition-colors">Setup</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-black/5">
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm">Password</h4>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-black/80 transition-colors">Update</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
