"use client";
import { motion } from "motion/react";
import { MessageSquarePlus } from "lucide-react";

export default function FeedbacksPage() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia,serif" }}>Feedbacks</h1>
        <p className="text-muted-foreground text-sm">Analyze direct user feedback and feature requests.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-12 text-center"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(32px)" }}>
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-2xl flex items-center justify-center">
          <MessageSquarePlus className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Georgia,serif" }}>Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          The Feedbacks collection system is currently under development. This area will help you track and prioritize direct user input.
        </p>
      </motion.div>
    </div>
  );
}
