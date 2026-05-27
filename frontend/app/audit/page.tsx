// "use client";

// import React, { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, XCircle, Zap, ShieldAlert, Loader2, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

// interface AuditData {
//   ticker: string;
//   live_price?: number;
//   change_percent?: number;
//   verdict: string;
//   score: number;
//   confidence_match: number;
//   canslim_layers: {
//     [key: string]: boolean | string | number;
//   };
//   layer_explanations?: {
//     [key: string]: string;
//   };
//   reasoning: string;
// }

// export default function QuantAuditPage() {
//   const [ticker, setTicker] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [auditData, setAuditData] = useState<AuditData | null>(null);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const tickerFromUrl = searchParams.get("ticker");
//     if (tickerFromUrl) {
//       setTicker(tickerFromUrl);
//       runAudit(tickerFromUrl);
//     }
//   }, []);

//   const runAudit = async (tickerValue: string) => {
//     if (!tickerValue.trim()) return;
//     setLoading(true);
//     setError(null);
//     try {
//       // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit?ticker=${tickerValue.toUpperCase()}`);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit?ticker=${tickerValue.toUpperCase()}`);
//       if (!response.ok) throw new Error("Backend server error");
//       const data = await response.json();
//       setAuditData(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRunAudit = async () => {
//     if (!ticker.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit?ticker=${ticker.toUpperCase()}`);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit?ticker=${ticker.toUpperCase()}`);
      
//       if (!response.ok) {
//         throw new Error("Backend server responded with an error");
//       }

//       const data = await response.json();
//       setAuditData(data);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Something went wrong while connecting to the AI core.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchParams = useSearchParams();
  
//   useEffect(() => {
//     const tickerParam = searchParams.get("ticker");
//     if (tickerParam) {
//       setTicker(tickerParam);
//       setTimeout(() => {
//       }, 500);
//     }
//   }, [searchParams]);

//   const isLayerPassed = (layerKey: string): boolean => {
//     if (!auditData || !auditData.canslim_layers) return false;
//     const value = auditData.canslim_layers[layerKey];
//     if (typeof value === "boolean") return value;
//     if (typeof value === "number") return value === 1; // Agar AI 1/0 bhej de
//     if (typeof value === "string") {
//       const normalized = value.toLowerCase().trim();
//       return normalized === "true" || normalized === "pass" || normalized === "bullish" || normalized === "yes" || normalized === "1";
//     }
//     return false;
//   };

//   const displayedScore = auditData ? auditData.score : 0;
  
//   const layers = [
//     { key: "C", name: "Current Earnings", desc: "Checks if recent quarterly profits jumped significantly (>20%)" },
//     { key: "A", name: "Annual Earnings", desc: "Verifies solid compound annual growth over the last 3-5 years" },
//     { key: "N", name: "New Catalysts", desc: "Looks for new management, products, or critical price breakouts" },
//     { key: "S", name: "Supply & Demand", desc: "Tracks volume spikes to see if big institutions are buying up shares" },
//     { key: "L", name: "Leader / Laggard", desc: "Filters out weak assets; confirms if this is an industry-leading stock" },
//     { key: "I", name: "Institutional View", desc: "Checks if top mutual funds and banks are building fresh positions" },
//     { key: "M", name: "Market Direction", desc: "Confirms if overall market environment is safe and in an uptrend" },
//   ];

//   // Up/Down colors logic for price trends
//   const isPositive = auditData && (auditData.change_percent ?? 0) >= 0;

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-12 selection:bg-indigo-500 selection:text-white">
//       <div className="max-w-5xl mx-auto space-y-10">
        
//         {/* Header Branding */}
//         <div className="text-center space-y-2">
//           <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
//             <Zap className="w-6 h-6 text-white fill-white" />
//           </div>
//           <h1 className="text-4xl font-black tracking-tight text-slate-900">
//             QUANT <span className="text-indigo-600 tracking-tighter">7-LEVEL AUDIT</span>
//           </h1>
//           <p className="text-xs tracking-widest text-slate-400 uppercase font-bold">
//             Automated Real-Time CANSLIM Analysis Framework
//           </p>
//         </div>

//         {/* Input Control Console - Clear String on load ensures no default hardcode */}
//         <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 max-w-xl mx-auto flex items-center justify-between pl-5 gap-3">
//           <input
//             type="text"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             placeholder="ENTER TICKER SYMBOL (e.g., TCS, RELIANCE)"
//             className="w-full font-extrabold uppercase tracking-wider text-slate-800 placeholder-slate-300 focus:outline-none text-base bg-transparent"
//             onKeyDown={(e) => e.key === "Enter" && handleRunAudit()}
//           />
//           <button
//             onClick={handleRunAudit}
//             disabled={loading}
//             className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 AUDITING ASSET...
//               </>
//             ) : (
//               <>
//                 <Zap className="w-4 h-4 fill-white text-indigo-600" />
//                 Run Audit
//               </>
//             )}
//           </button>
//         </div>

//         {/* Error Feedback View */}
//         {error && (
//           <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center max-w-xl mx-auto shadow-sm">
//             <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto mb-2" />
//             <h3 className="text-rose-800 font-bold uppercase text-xs tracking-wider">Audit Core Alert</h3>
//             <p className="text-rose-600 text-[11px] mt-1 font-medium tracking-wide uppercase">{error}</p>
//           </div>
//         )}

//         {/* Dynamic Audit Report Area */}
//         {auditData && !loading && (
//           <div className="space-y-6 animate-fade-in">
            
//             {/* Live Metrics Hero Banner */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
//               {/* Premium Wide Price Ticker Card */}
//               <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group border border-slate-800">
//                 <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-1">PROCESSED UNDER TICKER</span>
//                     <h2 className="text-4xl font-black tracking-tighter flex items-center gap-2">
//                       {auditData.ticker}
//                       <span className="text-xs font-semibold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300">Live Metric Core</span>
//                     </h2>
//                   </div>
                  
//                   {/* Glowing Price Display */}
//                   <div className="text-right">
//                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">DYNAMIC MARKET PRICE</span>
//                     <div className="text-3xl font-black tracking-tight text-white">
//                       {auditData.live_price && auditData.live_price > 0 ? `₹${auditData.live_price.toLocaleString()}` : "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-slate-400 font-medium">Session Trend:</span>
//                     <div className={`flex items-center gap-1 font-black px-2.5 py-0.5 text-xs rounded-lg ${isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
//                       {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
//                       {auditData.change_percent ?? 0}%
//                     </div>
//                   </div>
//                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
//                     ● Real-Time Data Pipeline Synchronized
//                   </div>
//                 </div>
//               </div>

//               {/* Engine Status Block */}
//               {/* Container jise aap apne page mein sahi jagah rakh sakte hain */}
//               <div className="relative w-full h-[150px]"> 
//                 <div 
//                   className={`absolute top-0 left-0 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-top-left z-50
//                   ${isExpanded ? 'scale-[1.1] w-[120%] p-8' : 'scale-100 w-full p-6'}`}
//                 >
//                   {/* Header Section */}
//                   <div className="cursor-pointer flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
//                         <Zap className="w-7 h-7 text-white fill-white animate-pulse" />
//                       </div>
//                       <div>
//                         <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">Market Pulse</h4>
//                         <h2 className="text-xl font-black text-slate-900 tracking-tight">Institutional Insights</h2>
//                       </div>
//                     </div>
//                     <ArrowDownRight className={`w-6 h-6 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
//                   </div>

//                   {/* Expanded Content */}
//                   <div className={`mt-6 space-y-6 transition-all duration-700 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
//                     <div className="text-5xl font-black text-indigo-600">{auditData.score}% Momentum</div>
//                     <div className="grid grid-cols-2 gap-4">
//                         {auditData.reasoning.split('.').slice(0, 4).map((p, i) => (
//                           <p key={i} className="text-xs bg-slate-900 text-slate-200 p-4 rounded-xl">{p.trim()}</p>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

//             {/* Core 7-Layer Metrics Block */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
//               {/* Score Gauge */}
//               <div className="md:col-span-4 bg-white p-6 rounded-3xl shadow-md border border-slate-100 text-center space-y-5">
//                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">CANSLIM Compatibility Score</h4>
                
//                 <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
//                   <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
//                   <div className="absolute inset-0 rounded-full border-4 border-indigo-600 clip-circle pointer-events-none opacity-20"></div>
//                   <div className="text-center">
//                     <span className="text-5xl font-black text-slate-800 tracking-tighter block">{displayedScore}</span>
//                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Filter Score %</span>
//                   </div>
//                 </div>

//                 <div className="bg-slate-900 text-slate-100 rounded-xl py-2 px-4 shadow-inner">
//                   <span className="text-[11px] font-black uppercase tracking-wider block text-indigo-400">INSTITUTIONAL RECOMMENDATION</span>
//                   <span className="text-xs font-bold text-white tracking-wide uppercase">{auditData.verdict}</span>
//                 </div>
//               </div>

//               {/* 7-Layer Filter Grid (User Friendly Explanations Embedded) */}
//               <div className="md:col-span-8 bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-4">
//                 <div className="flex items-center justify-between border-b border-slate-100 pb-2">
//                   <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">7-Layer Filter Status Breakdown</h4>
//                   <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Naive-User Mode Enabled</span>
//                 </div>

//                 <div className="grid grid-cols-1 gap-3">
//                   {layers.map((layer) => {
//                     const passed = isLayerPassed(layer.key);
//                     const customExplanation = auditData.layer_explanations ? auditData.layer_explanations[layer.key] : null;
                    
//                     return (
//                       <div
//                         key={layer.key}
//                         className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
//                           passed
//                             ? "bg-emerald-50/40 border-emerald-100 text-emerald-950"
//                             : "bg-slate-50/60 border-slate-100 text-slate-700"
//                         }`}
//                       >
//                         <div className="space-y-1 flex-1">
//                           <div className="flex items-center gap-2.5">
//                             <div className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shadow-sm shrink-0 ${
//                               passed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
//                             }`}>
//                               {layer.key}
//                             </div>
//                             <span className="text-xs font-black uppercase tracking-wider text-slate-800">{layer.name}</span>
//                           </div>
                          
//                           {/* Structural explanation line for beginner understanding */}
//                           <p className="text-[11px] text-slate-400 font-medium pl-8">
//                             <span className="font-semibold text-slate-500">Framework Rule:</span> {layer.desc}
//                           </p>
                          
//                           {/* Live explanation from AI Core */}
//                           {customExplanation && (
//                             <div className="mt-1 pl-8 flex items-start gap-1.5 text-xs text-slate-600 font-medium italic">
//                               <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
//                               <span>{customExplanation}</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex items-center justify-end shrink-0 pl-8 md:pl-0">
//                           {passed ? (
//                             <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
//                               <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-white" />
//                               PASSED
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-1.5 bg-slate-200/60 text-slate-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
//                               <XCircle className="w-3.5 h-3.5 text-slate-400" />
//                               LAGGING
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//             </div>

//             {/* AI Reasoning Summary Footer */}
//             {/* <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-3">
//               <div className="flex items-center gap-2">
//                 <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
//                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Detailed Quant Audit Analysis</h4>
//               </div>
//               <p className="text-slate-600 text-xs font-medium leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100 shadow-inner">
//                 {auditData.reasoning}
//               </p>
//               <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400 pt-1">
//                 <span>Data Confidence Match: {auditData.confidence_match}%</span>
//                 <span>Security Engine Verified</span>
//               </div>
//             </div> */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Card 1: Key Strategic Takeaway */}
//               <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl text-white shadow-lg">
//                 <h4 className="text-[9px] font-black uppercase text-indigo-400 mb-2 tracking-widest">Core Investment Verdict</h4>
//                 <p className="text-xs font-bold leading-relaxed">{auditData.verdict}</p>
//               </div>
              
//               {/* Card 2: Risk / Reward Snapshot */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
//                 <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Smart Audit Logic</h4>
//                 <div className="space-y-2">
//                   {auditData.reasoning.split('.').slice(0, 2).map((point, i) => (
//                     <div key={i} className="text-[1rem] font-medium text-slate-600 flex items-start gap-2">
//                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
//                       {point.trim()}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Footer: Expandable Full Analysis */}
//             <details className="mt-4 text-[10px] font-bold text-slate-400 cursor-pointer uppercase tracking-widest hover:text-indigo-600">
//               <summary>View Technical Deep-Dive Report</summary>
//               <div className="grid grid-cols-1 gap-6">
//               {auditData.reasoning.split('.').filter(s => s.length > 20).slice(0, 3).map((point, i) => (
//                 <div key={i} className="group p-6 bg-indigo-900/5 rounded-2xl border border-white/5 hover:border-indigo-500 transition-colors">
//                   <p className="text-[19px] font-semibold text-black leading-relaxed group-hover:text-black">
//                     <span className="text-indigo-400 font-black mr-3 text-[19px]">0{i + 1}.</span> 
//                     {point.trim()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             </details>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Zap, ShieldAlert, Loader2, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

interface AuditData {
  ticker: string;
  live_price?: number;
  change_percent?: number;
  verdict: string;
  score: number;
  confidence_match: number;
  canslim_layers: { [key: string]: boolean | string | number; };
  layer_explanations?: { [key: string]: string; };
  reasoning: string;
}

// Ye component pura tumhara original logic handle karega
function AuditContent() {
  const searchParams = useSearchParams();
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const tickerFromUrl = searchParams.get("ticker");
    if (tickerFromUrl) {
      setTicker(tickerFromUrl);
      runAudit(tickerFromUrl);
    }
  }, [searchParams]);

  const runAudit = async (tickerValue: string) => {
    if (!tickerValue.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      // 1. Task start request
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/full-audit/${tickerValue.toUpperCase()}`);
      if (!res.ok) throw new Error("Backend failed to start audit.");
      
      const { task_id } = await res.json();

      // 2. Polling start karo
      const interval = setInterval(async () => {
        const statusRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit-status/${task_id}`);
        const data = await statusRes.json();

        if (data.status === 'completed') {
          clearInterval(interval);
          setAuditData(data.result);
          setLoading(false);
        } else if (data.status === 'failed') {
          clearInterval(interval);
          setError("AI Audit failed.");
          setLoading(false);
        }
      }, 3000); // Har 3 second
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!ticker.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/full-audit/${ticker.toUpperCase()}`);
      if (!response.ok) throw new Error("Backend server responded with an error");
      const data = await response.json();
      setAuditData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while connecting to the AI core.");
    } finally {
      setLoading(false);
    }
  };

  const isLayerPassed = (layerKey: string): boolean => {
    if (!auditData || !auditData.canslim_layers) return false;
    const value = auditData.canslim_layers[layerKey];
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (typeof value === "string") {
      const normalized = value.toLowerCase().trim();
      return normalized === "true" || normalized === "pass" || normalized === "bullish" || normalized === "yes" || normalized === "1";
    }
    return false;
  };

  const layers = [
    { key: "C", name: "Current Earnings", desc: "Checks if recent quarterly profits jumped significantly (>20%)" },
    { key: "A", name: "Annual Earnings", desc: "Verifies solid compound annual growth over the last 3-5 years" },
    { key: "N", name: "New Catalysts", desc: "Looks for new management, products, or critical price breakouts" },
    { key: "S", name: "Supply & Demand", desc: "Tracks volume spikes to see if big institutions are buying up shares" },
    { key: "L", name: "Leader / Laggard", desc: "Filters out weak assets; confirms if this is an industry-leading stock" },
    { key: "I", name: "Institutional View", desc: "Checks if top mutual funds and banks are building fresh positions" },
    { key: "M", name: "Market Direction", desc: "Confirms if overall market environment is safe and in an uptrend" },
  ];

  const displayedScore = auditData ? auditData.score : 0;
  const isPositive = auditData && (auditData.change_percent ?? 0) >= 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-12 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            QUANT <span className="text-indigo-600 tracking-tighter">7-LEVEL AUDIT</span>
          </h1>
        </div>

        <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 max-w-xl mx-auto flex items-center justify-between pl-5 gap-3">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="ENTER TICKER SYMBOL (e.g., TCS, RELIANCE)"
            className="w-full font-extrabold uppercase tracking-wider text-slate-800 placeholder-slate-300 focus:outline-none text-base bg-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleRunAudit()}
          />
          <button onClick={handleRunAudit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> AUDITING...</> : <><Zap className="w-4 h-4 fill-white text-indigo-600" /> Run Audit</>}
          </button>
        </div>

        {error && <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center max-w-xl mx-auto shadow-sm"><ShieldAlert className="w-8 h-8 text-rose-500 mx-auto mb-2" /><p className="text-rose-600 text-[11px] font-medium uppercase">{error}</p></div>}

        {auditData && !loading && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-xl">
                 <h2 className="text-4xl font-black">{auditData.ticker}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Final Export: Ye Next.js ke error ko solve kar dega
export default function QuantAuditPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Audit Core...</div>}>
      <AuditContent />
    </Suspense>
  );
}