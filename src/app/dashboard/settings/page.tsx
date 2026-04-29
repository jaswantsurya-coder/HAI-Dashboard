"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Save, Key, RefreshCw, Plus, Trash2, CheckCircle2, ShieldCheck, Database, Users, Mail, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const key = localStorage.getItem("HAI_ANALYTICS_API_KEY");
    if (key) {
      setApiKey(key);
      setSavedKey(key);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("HAI_ANALYTICS_API_KEY", apiKey);
      setSavedKey(apiKey);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const generateNewKey = () => {
    const newKey = "hai_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "integrations", label: "Integrations" },
    { id: "security", label: "Security" },
    { id: "team", label: "Team" },
    { id: "billing", label: "Billing" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences and API integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2 md:col-span-1 flex flex-row md:flex-col overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
            <motion.button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 0.98 }} 
              whileTap={{ scale: 0.95 }} 
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors",
                activeTab === tab.id 
                  ? "bg-black/5 text-black" 
                  : "text-muted-foreground hover:bg-black/5 hover:text-black"
              )}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            
            {activeTab === "general" && (
              <motion.div key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {/* General Settings */}
                <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
                  <h2 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia,serif" }}>Workspace Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase">Workspace Name</label>
                      <input type="text" defaultValue="HAI Production" className="w-full mt-1 px-4 py-2 bg-white/60 border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "integrations" && (
              <motion.div key="integrations" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                
                {/* API Integrations Card */}
                <motion.div 
                  className="rounded-3xl p-5 sm:p-7 relative overflow-hidden transition-all duration-300 group"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)", boxShadow: "0 8px 28px rgba(0,0,0,0.04)" }}>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Key className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl" style={{ fontFamily: "Georgia,serif" }}>API Configuration</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Enable real-time analytics by adding your provider keys.</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Analytics API Key</label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 group/input">
                          <input 
                            type="password" 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="hai_xxxxxxxxxxxxxxxxxxxxxxxx"
                            className="w-full px-4 py-3 bg-white/60 border border-black/5 hover:border-black/15 focus:border-blue-300 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 transition-all font-mono text-sm shadow-sm"
                          />
                          {savedKey && apiKey === savedKey && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
                          onClick={generateNewKey}
                          className="p-3 sm:px-4 rounded-2xl border border-black/10 bg-white hover:bg-black/5 shadow-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5 text-muted-foreground" />
                          <span className="sm:hidden text-sm font-semibold text-muted-foreground">Generate</span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/5">
                      <button 
                        onClick={() => { setApiKey(""); localStorage.removeItem("HAI_ANALYTICS_API_KEY"); setSavedKey(""); }}
                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Key
                      </button>
                      <motion.button 
                        whileHover={!(isSaving || apiKey === savedKey) ? { scale: 1.02, y: -1 } : {}}
                        whileTap={!(isSaving || apiKey === savedKey) ? { scale: 0.98 } : {}}
                        disabled={isSaving || apiKey === savedKey}
                        onClick={handleSave}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition-all duration-300",
                          apiKey === savedKey ? "bg-black/5 text-black/30 cursor-not-allowed border border-black/5" : "bg-black text-white hover:shadow-lg hover:shadow-black/10"
                        )}
                      >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Available Integrations List */}
                <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
                  <h2 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia,serif" }}>Available Apps</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Google Workspace", desc: "Sync docs, sheets, and auth with Google accounts", icon: "G", color: "bg-red-50 text-red-600" },
                      { name: "Slack", desc: "Receive notifications and reports directly in Slack", icon: "#", color: "bg-purple-50 text-purple-600" },
                      { name: "GitHub", desc: "Link repositories for codebase analytics", icon: "GH", color: "bg-gray-100 text-gray-700" },
                      { name: "Notion", desc: "Export reports to Notion pages automatically", icon: "N", color: "bg-black/5 text-black" },
                    ].map(app => (
                      <div key={app.name} className="flex items-center justify-between p-4 rounded-2xl border border-black/5 hover:border-black/10 bg-white/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${app.color}`}>{app.icon}</div>
                          <div>
                            <h3 className="font-bold text-sm">{app.name}</h3>
                            <p className="text-xs text-muted-foreground">{app.desc}</p>
                          </div>
                        </div>
                        <button className="px-4 py-1.5 rounded-lg border border-black/10 text-xs font-bold hover:bg-black hover:text-white transition-colors">Connect</button>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
                  <h2 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia,serif" }}>Security Options</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-black/5">
                      <div>
                        <h3 className="font-bold text-sm">Two-Factor Authentication</h3>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                      <Users className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl" style={{ fontFamily: "Georgia,serif" }}>Team Members</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Invite colleagues to your workspace.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="email" 
                          placeholder="colleague@company.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-black/5 hover:border-black/15 focus:border-teal-300 rounded-xl outline-none focus:ring-4 focus:ring-teal-100/50 transition-all text-sm"
                        />
                      </div>
                      <button className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                        Invite Member
                      </button>
                    </div>

                    <div className="pt-6 border-t border-black/5 mt-6">
                      <h3 className="text-sm font-bold mb-4">Active Members (1)</h3>
                      <div className="flex items-center justify-between p-4 rounded-2xl border border-black/5 bg-white/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">AD</div>
                          <div>
                            <p className="text-sm font-bold">Admin User</p>
                            <p className="text-xs text-muted-foreground">admin@hai.com</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-black/5 text-xs font-bold text-muted-foreground">Owner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                 <div className="rounded-3xl p-10 text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-2xl flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Georgia,serif" }}>Pro Plan</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      You are currently on the Pro plan with all premium features unlocked. Your next billing cycle starts on the 1st of next month.
                    </p>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-6 right-6 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 z-[100]">
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Changes saved successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
