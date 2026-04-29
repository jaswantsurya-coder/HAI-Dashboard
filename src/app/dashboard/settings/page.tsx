"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Key, RefreshCw, Plus, Trash2, CheckCircle2, ShieldCheck, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences and API integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar (Local) */}
        <div className="space-y-1">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-black/5 font-medium text-sm">General</button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-black/5 text-sm">Integrations</button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-black/5 text-sm">Security</button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-black/5 text-sm">Team</button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-black/5 text-sm">Billing</button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* API Integrations Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 28px rgba(0,0,0,0.05)" }}>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">API Configuration</h2>
                <p className="text-xs text-muted-foreground">Enable real-time analytics by adding your provider keys.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Analytics API Key</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="hai_xxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-4 py-2.5 bg-white/50 border border-black/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-mono text-sm"
                    />
                    {savedKey && apiKey === savedKey && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <button 
                    onClick={generateNewKey}
                    className="p-2.5 rounded-xl border border-black/10 hover:bg-black/5 transition-colors"
                    title="Generate New Key"
                  >
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Adding a valid API key will automatically switch the dashboard from **Demo Mode** to **Live Mode**. 
                  We currently support Posthog, Mixpanel, and custom HAI endpoints.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={() => { setApiKey(""); localStorage.removeItem("HAI_ANALYTICS_API_KEY"); }}
                  className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Key
                </button>
                <button 
                  disabled={isSaving || apiKey === savedKey}
                  onClick={handleSave}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300",
                    apiKey === savedKey ? "bg-black/10 text-black/40 cursor-not-allowed" : "bg-black text-white hover:opacity-80"
                  )}
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="absolute top-6 right-6 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Changes saved successfully
              </motion.div>
            )}
          </motion.div>

          {/* Database Status Card */}
          <div 
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.85)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Database className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">System Health</h3>
                  <p className="text-[11px] text-muted-foreground">Connected to Global Node US-East</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Stable
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
