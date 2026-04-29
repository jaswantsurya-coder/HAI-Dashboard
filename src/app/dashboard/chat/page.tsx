"use client";
import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>AI Chat</h1>
        <p className="text-muted-foreground text-sm">Interact with your data through our intelligent assistant.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-12 text-center flex-1 flex flex-col items-center justify-center"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Georgia,serif" }}>HAI Assistant Beta</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          The AI Chat interface is currently offline for model fine-tuning. This will allow you to query your analytics data using natural language.
        </p>
      </motion.div>
    </div>
  );
}
