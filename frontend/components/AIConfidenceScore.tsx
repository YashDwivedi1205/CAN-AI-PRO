"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AIConfidenceProps {
  score: number; // Score 0 to 100
  analysis: string;
}

const AIConfidenceScore: React.FC<AIConfidenceProps> = ({ score, analysis }) => {
  // Score ke basis pr color decide karne ke liye
  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 50) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 my-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-gray-400">
          AI Confidence Analysis
        </h3>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"
          }`}
        />
      </div>

      <div className="space-y-3">
        <p className="text-gray-300 text-sm leading-relaxed leading-6 italic">
          <span className="text-white font-semibold">AI Insights:</span> "{analysis}"
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-tight">
        <span>Model: Gemini 1.5 Flash</span>
        <span>Verified Audit Data</span>
      </div>
    </motion.div>
  );
};

export default AIConfidenceScore;