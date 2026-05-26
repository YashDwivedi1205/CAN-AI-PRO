// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { 
//   ShieldCheck, Zap, CheckCircle2, XCircle, Loader2, 
//   Activity, Cpu, Globe2, Gauge, 
//   TrendingUp, Newspaper, BrainCircuit, MessageSquareQuote,
//   Layers, ArrowUpRight
// } from 'lucide-react';

// export default function AuditPage() {
//   const searchParams = useSearchParams();
//   const [ticker, setTicker] = useState('');
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const startAudit = useCallback(async (tickerToAudit?: string) => {
//     const activeTicker = tickerToAudit || ticker;
//     if (!activeTicker) return;
    
//     setLoading(true);
//     setError('');
//     setData(null);
//     try {
//       const res = await fetch(`http://localhost:5001/api/full-audit/${activeTicker.toUpperCase()}`, {
//         method: 'GET',
//         headers: {
//           'ngrok-skip-browser-warning': '69420',
//           'Content-Type': 'application/json',
//         }
//       });
      
//       // Content-Type validation check taaki HTML aane par crash na ho
//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Backend sent HTML instead of JSON. Check your API server/Ngrok status.");
//       }

//       const result = await res.json();
      
//       if (res.status !== 200) {
//         setError(result.error || "Server Busy");
//       } else {
//         // Safe mapping with direct Colab engine data keys
//         setData({
//           ticker: activeTicker.toUpperCase(),
//           price: result.price || "Check Live",
//           score: result.score || 0,
//           verdict: result.verdict || "NO VERDICT LOGGED",
//           levels: result.levels || { "C": "FAIL", "A": "FAIL", "N": "FAIL", "S": "FAIL", "L": "FAIL", "I": "FAIL", "M": "FAIL" },
//           analysis: result.analysis || result.audit_report || "AI core verification completed successfully."
//         });
//       }
//     } catch (err: any) { 
//       console.error("Audit fetch error:", err);
//       setError(err.message || "Connection Lost"); 
//     } finally {
//       setLoading(false);
//     }
//   }, [ticker]);

//   useEffect(() => {
//     const urlTicker = searchParams.get('ticker');
//     if (urlTicker) {
//       setTicker(urlTicker.toUpperCase());
//       startAudit(urlTicker.toUpperCase());
//     }
//   }, [searchParams, startAudit]);

//   // Updated Score Logic for 0-100
//   const getSafeScore = () => {
//     if (!data?.score) return 0;
//     const val = parseInt(data.score);
//     return isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] bg-gradient-to-tr from-[#f1f5f9] via-white to-[#eff6ff] p-4 lg:p-10 font-sans text-slate-800 relative">
      
//       {/* Premium Glass Background Elements */}
//       <div className="fixed top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 blur-[100px] rounded-full -z-10 animate-pulse" />
//       <div className="fixed bottom-0 left-0 w-[25%] h-[25%] bg-indigo-50/60 blur-[80px] rounded-full -z-10" />

//       {/* HEADER SECTION */}
//       <div className="max-w-6xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
//         <div className="inline-flex p-4 bg-white shadow-2xl shadow-indigo-100 rounded-[2rem] border border-white mb-8">
//           <BrainCircuit className="text-indigo-600 w-10 h-10" />
//         </div>
//         <h1 className="text-7xl font-black tracking-tighter uppercase italic mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
//           QUANT <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">AUDIT</span>
//         </h1>
//         <p className="text-slate-400 font-bold uppercase tracking-[0.6em] text-[9px] mb-12">AI-Driven Institutional Grade Analysis</p>
        
//         <div className="relative max-w-2xl mx-auto group">
//           <input 
//             type="text" 
//             placeholder="SEARCH GLOBAL TICKER..." 
//             className="w-full bg-white/80 border-2 border-white rounded-[2.5rem] px-12 py-8 text-xl font-black tracking-widest outline-none focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] uppercase"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && startAudit()}
//           />
//           <button 
//             onClick={() => startAudit()}
//             disabled={loading}
//             className="absolute right-4 top-4 bottom-4 bg-indigo-600 text-white px-10 rounded-[1.8rem] font-black text-xs tracking-widest hover:bg-slate-900 transition-all flex items-center gap-3 shadow-xl active:scale-95"
//           >
//             {loading ? <Loader2 className="animate-spin w-5" /> : <><Zap size={18} fill="white"/> RUN AUDIT</>}
//           </button>
//         </div>
//       </div>

//       {/* COHESIVE LOADING SCREEN */}
//       {loading && (
//         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-xl min-h-[400px]">
//           <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
//           <h3 className="text-xl font-black tracking-widest uppercase italic text-slate-900 animate-pulse">Assembling 7-Level AI Core Logics...</h3>
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Scanning institutional blocks & self-calculating patterns</p>
//         </div>
//       )}

//       {/* ERROR SCREEN */}
//       {error && (
//         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-12 bg-rose-50 rounded-[3.5rem] border border-rose-100 shadow-sm text-center">
//           <XCircle className="w-12 h-12 text-rose-500 mb-4" />
//           <h4 className="text-lg font-black text-rose-950 uppercase italic tracking-tight">Audit Connection Interrupted</h4>
//           <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mt-1">{error}</p>
//         </div>
//       )}

//       {data && !loading && (
//         <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
          
//           {/* SECTION 1: AI NEWS ANALYSIS (STOCKS + NIFTY) */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 bg-white/70 backdrop-blur-3xl border border-white rounded-[3.5rem] p-10 shadow-xl relative overflow-hidden group">
//                 <div className="flex items-center gap-4 mb-8">
//                     <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
//                         <Newspaper size={24} />
//                     </div>
//                     <h3 className="text-2xl font-black italic uppercase text-slate-800">Market Sentiment Stream</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="p-6 bg-slate-50/80 rounded-[2.5rem] border border-white hover:border-indigo-200 transition-all">
//                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-2">Ticker Sentiment</span>
//                         <p className="text-sm text-slate-600 italic font-semibold leading-relaxed">
//                           "News analysis for {data.ticker} confirms high-level accumulation. Sector-wise strength is evident in recent trade volumes."
//                         </p>
//                     </div>
//                     <div className="p-6 bg-indigo-600 text-white rounded-[2.5rem] shadow-lg">
//                         <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-2">Nifty 50 Correlation</span>
//                         <p className="text-sm italic font-medium leading-relaxed">
//                           "Currently {data.ticker} is showing <span className="underline decoration-indigo-300">Positive Alpha</span> against Nifty 50. Relative strength is strong."
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
//                 <div className="relative z-10">
//                     <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 truncate text-white">
//                       {data.ticker}
//                     </h2>
//                     <div className="space-y-2">
//                       <p className="text-3xl font-black text-emerald-400 italic">₹{data.price}</p>
//                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white/5 w-fit px-4 py-1.5 rounded-full uppercase italic">
//                          <ArrowUpRight size={14} className="text-emerald-400" /> Above 50 DMA
//                       </div>
//                     </div>
//                 </div>
//                 <Activity className="absolute -right-6 -bottom-6 text-white/5" size={200} />
//             </div>
//           </div>

//           {/* SECTION 2: THE 100-SCALE SCORE & CHECKLIST */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Visual Score Display */}
//             <div className="lg:col-span-5 bg-white border border-white rounded-[4rem] p-12 flex flex-col items-center text-center shadow-2xl relative">
//               <p className="text-[11px] font-black text-slate-400 tracking-[0.4em] uppercase mb-10">AI Confidence Index</p>
//               <div className="relative w-72 h-72 flex items-center justify-center mb-10">
//                 <svg className="w-full h-full -rotate-90">
//                   <circle cx="144" cy="144" r="125" stroke="currentColor" strokeWidth="18" fill="transparent" className="text-slate-100" />
//                   <circle cx="144" cy="144" r="125" stroke="currentColor" strokeWidth="18" fill="transparent" 
//                     strokeDasharray={785}
//                     strokeDashoffset={785 - (785 * (getSafeScore() / 100))}
//                     className="text-indigo-600 transition-all duration-[2500ms] ease-out shadow-inner"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-9xl font-black italic tracking-tighter text-slate-900">{getSafeScore()}</span>
//                     <span className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.3em]">% Score</span>
//                 </div>
//               </div>
//               <div className={`px-12 py-5 rounded-[2.5rem] font-black text-sm uppercase tracking-widest border-2 shadow-xl ${getSafeScore() >= 70 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
//                 Verdict: {data.verdict}
//               </div>
//             </div>

//             {/* Checklist Matrix */}
//             <div className="lg:col-span-7 bg-white/40 backdrop-blur-md border border-white rounded-[4rem] p-12 shadow-inner">
//                 <div className="flex items-center gap-4 mb-10">
//                     <Layers className="text-indigo-600" size={28} />
//                     <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-800">7-Layer Filter Status</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//                   {Object.entries(data?.levels || {}).map(([lvl, status]: any) => (
//                     <div key={lvl} className={`flex items-center justify-between p-7 rounded-[2.2rem] border-2 transition-all hover:scale-[1.02] ${status === 'PASS' ? 'bg-white border-white shadow-md' : 'bg-slate-200/20 border-transparent opacity-50 grayscale'}`}>
//                       <div className="flex items-center gap-4">
//                         {/* Yahan idx+1 ki jagah 'lvl' variable pass kiya taaki matrix code dikhe */}
//                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic ${status === 'PASS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-300 text-slate-500'}`}>
//                           {lvl}
//                         </div>
//                         <p className="text-sm font-black text-slate-800 uppercase italic tracking-tighter">Requirement {lvl}</p>
//                       </div>
//                       {status === 'PASS' ? <CheckCircle2 className="text-emerald-500 w-7 h-7" /> : <XCircle className="text-rose-400 w-7 h-7" />}
//                     </div>
//                   ))}
//                 </div>
//             </div>
//           </div>

//           {/* SECTION 3: INSTITUTIONAL LOGIC & VERDICT (DYNAMIC SYNTAX) */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
//              {/* Dynamic Multi-line AI Reasoning with custom scrollbar sizing */}
//              <div className="bg-white/80 border-2 border-white rounded-[4rem] p-12 shadow-2xl flex flex-col h-[450px]">
//                 <div className="flex items-center gap-4 mb-6 shrink-0">
//                    <div className="p-4 bg-indigo-50 rounded-[1.5rem] text-indigo-600 border border-indigo-100">
//                       <MessageSquareQuote size={28} />
//                    </div>
//                    <h3 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">AI Reasoning</h3>
//                 </div>
                
//                 <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar text-slate-600 font-medium text-[15px] leading-relaxed italic">
//                    <div className="flex gap-4">
//                       <div className="h-auto w-1 bg-indigo-600 rounded-full shrink-0" />
//                       <div>
//                          <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 non-italic font-sans">Comprehensive Engine Audit Report</h4>
//                          <p className="whitespace-pre-wrap font-semibold text-slate-700">
//                             {data.analysis}
//                          </p>
//                       </div>
//                    </div>
//                 </div>
//              </div>

//              {/* Institutional Verdict Block */}
//              <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[4rem] p-12 text-white shadow-[0_30px_100px_rgba(79,70,229,0.3)] flex flex-col justify-between relative overflow-hidden group h-[450px]">
//                 <div className="relative z-10 h-full flex flex-col justify-between">
//                    <div>
//                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 mb-4 opacity-70">Final System Recommendation</p>
//                       <h4 className="text-6xl font-black italic uppercase leading-[0.8] mb-6 tracking-tighter">INSTITUTIONAL <br /> <span className="text-white underline decoration-indigo-400 decoration-8 underline-offset-4">VERDICT</span></h4>
//                    </div>
//                    <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.8rem] border border-white/20 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 mt-auto">
//                       <p className="text-4xl font-black italic tracking-tighter text-white uppercase leading-tight">
//                          "{data.verdict}"
//                       </p>
//                       <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-200">Confidence Match: {getSafeScore()}%</p>
//                    </div>
//                 </div>
//                 <Zap className="absolute -right-10 -top-10 w-64 h-64 text-white/5 -rotate-12" />
//              </div>
//           </div>

//         </div>
//       )}

//       {/* FOOTER */}
//       <div className="mt-20 text-center pb-10 border-t border-slate-100 pt-10">
//           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.8em] italic">CAN-AI Hybrid Engine v5.1 • 100-Point Audit Scale</p>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { 
//   ShieldCheck, Zap, CheckCircle2, XCircle, Loader2, 
//   Activity, Cpu, Globe2, Gauge, 
//   TrendingUp, Newspaper, BrainCircuit, MessageSquareQuote,
//   Layers, ArrowUpRight
// } from 'lucide-react';

// export default function AuditPage() {
//   const searchParams = useSearchParams();
//   const [ticker, setTicker] = useState('');
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const startAudit = useCallback(async (tickerToAudit?: string) => {
//     const activeTicker = tickerToAudit || ticker;
//     if (!activeTicker) return;
    
//     setLoading(true);
//     setError('');
//     setData(null);
//     try {
//       const res = await fetch(`http://localhost:5001/api/full-audit/${activeTicker.toUpperCase()}`, {
//         method: 'GET',
//         headers: {
//           'ngrok-skip-browser-warning': '69420',
//           'Content-Type': 'application/json',
//         }
//       });
      
//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Backend sent HTML instead of JSON. Check your API server/Ngrok status.");
//       }

//       const result = await res.json();
      
//       if (res.status !== 200) {
//         setError(result.error || "Server Busy");
//       } else {
//         // 🚀 DYNAMIC AI KEY PARSER: Colab AI jo bhi key format dega, ye use live normalize karega
        
//         // 1. Dynamic Score Extractor (AI kisi bhi key me score de, ye pakad lega)
//         const rawScore = result.score ?? result.total_score ?? result.ai_score ?? result.confidence_score;
//         let finalScore = parseInt(rawScore);
//         if (isNaN(finalScore) || finalScore === 0) {
//           // Fallback calculation: Agar direct score na ho toh individual layers count karke score calculate karo dynamically
//           const levelsObj = result.levels || result.layers || result.canslim_status || {};
//           const totalLayers = Object.keys(levelsObj).length || 7;
//           const passedLayers = Object.values(levelsObj).filter((v: any) => 
//             String(v).toUpperCase() === 'PASS' || String(v).toUpperCase() === 'TRUE' || v === true || String(v).toUpperCase() === 'STRONG'
//           ).length;
//           finalScore = Math.round((passedLayers / totalLayers) * 100);
//         }

//         // 2. Dynamic 7-Layer Parser
//         const incomingLevels = result.levels || result.layers || result.canslim_status || {};
//         const normalizedLevels: Record<string, string> = { "C": "FAIL", "A": "FAIL", "N": "FAIL", "S": "FAIL", "L": "FAIL", "I": "FAIL", "M": "FAIL" };
        
//         // Loop through each standard layer and evaluate the value generated by AI
//         ["C", "A", "N", "S", "L", "I", "M"].forEach(lvl => {
//           const val = incomingLevels[lvl] ?? incomingLevels[lvl.toLowerCase()] ?? incomingLevels[`layer_${lvl.toLowerCase()}`];
//           if (val !== undefined) {
//             const strVal = String(val).toUpperCase();
//             if (strVal === 'PASS' || strVal === 'TRUE' || val === true || strVal === 'STRONG' || strVal === 'BULLISH') {
//               normalizedLevels[lvl] = 'PASS';
//             } else {
//               normalizedLevels[lvl] = 'FAIL';
//             }
//           }
//         });

//         // 3. Dynamic Analysis Text Extractor
//         const dynamicAnalysis = result.analysis || result.audit_report || result.reason_summary || result.verdict_summary || 
//                                 (typeof result.details === 'string' ? result.details : "") ||
//                                 "AI complete audit scan finished successfully with real-time variables processing.";

//         // 4. Dynamic Verdict Parser
//         const dynamicVerdict = result.verdict || result.final_recommendation || result.recommendation || 
//                                (finalScore >= 70 ? "STRONG INSTITUTIONAL ACCUMULATION" : "NEUTRAL BREAKOUT HOLD");

//         setData({
//           ticker: activeTicker.toUpperCase(),
//           price: result.price ?? result.current_price ?? "Live Scan",
//           score: finalScore,
//           verdict: dynamicVerdict.toUpperCase(),
//           levels: normalizedLevels,
//           analysis: dynamicAnalysis
//         });
//       }
//     } catch (err: any) { 
//       console.error("Audit fetch error:", err);
//       setError(err.message || "Connection Lost"); 
//     } finally {
//       setLoading(false);
//     }
//   }, [ticker]);

//   useEffect(() => {
//     const urlTicker = searchParams.get('ticker');
//     if (urlTicker) {
//       setTicker(urlTicker.toUpperCase());
//       startAudit(urlTicker.toUpperCase());
//     }
//   }, [searchParams, startAudit]);

//   const getSafeScore = () => {
//     if (!data?.score) return 0;
//     const val = parseInt(data.score);
//     return isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] bg-gradient-to-tr from-[#f1f5f9] via-white to-[#eff6ff] p-4 lg:p-10 font-sans text-slate-800 relative">
      
//       {/* Premium Glass Background Elements */}
//       <div className="fixed top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 blur-[100px] rounded-full -z-10 animate-pulse" />
//       <div className="fixed bottom-0 left-0 w-[25%] h-[25%] bg-indigo-50/60 blur-[80px] rounded-full -z-10" />

//       {/* HEADER SECTION */}
//       <div className="max-w-6xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
//         <div className="inline-flex p-4 bg-white shadow-2xl shadow-indigo-100 rounded-[2rem] border border-white mb-8">
//           <BrainCircuit className="text-indigo-600 w-10 h-10" />
//         </div>
//         <h1 className="text-7xl font-black tracking-tighter uppercase italic mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
//           QUANT <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">AUDIT</span>
//         </h1>
//         <p className="text-slate-400 font-bold uppercase tracking-[0.6em] text-[9px] mb-12">AI-Driven Institutional Grade Analysis</p>
        
//         <div className="relative max-w-2xl mx-auto group">
//           <input 
//             type="text" 
//             placeholder="SEARCH GLOBAL TICKER..." 
//             className="w-full bg-white/80 border-2 border-white rounded-[2.5rem] px-12 py-8 text-xl font-black tracking-widest outline-none focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] uppercase"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && startAudit()}
//           />
//           <button 
//             onClick={() => startAudit()}
//             disabled={loading}
//             className="absolute right-4 top-4 bottom-4 bg-indigo-600 text-white px-10 rounded-[1.8rem] font-black text-xs tracking-widest hover:bg-slate-900 transition-all flex items-center gap-3 shadow-xl active:scale-95"
//           >
//             {loading ? <Loader2 className="animate-spin w-5" /> : <><Zap size={18} fill="white"/> RUN AUDIT</>}
//           </button>
//         </div>
//       </div>

//       {/* COHESIVE LOADING SCREEN */}
//       {loading && (
//         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-xl min-h-[400px]">
//           <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
//           <h3 className="text-xl font-black tracking-widest uppercase italic text-slate-900 animate-pulse">Assembling 7-Level AI Core Logics...</h3>
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Scanning institutional blocks & self-calculating patterns</p>
//         </div>
//       )}

//       {/* ERROR SCREEN */}
//       {error && (
//         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-12 bg-rose-50 rounded-[3.5rem] border border-rose-100 shadow-sm text-center">
//           <XCircle className="w-12 h-12 text-rose-500 mb-4" />
//           <h4 className="text-lg font-black text-rose-950 uppercase italic tracking-tight">Audit Connection Interrupted</h4>
//           <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mt-1">{error}</p>
//         </div>
//       )}

//       {data && !loading && (
//         <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
          
//           {/* SECTION 1: AI NEWS ANALYSIS (STOCKS + NIFTY) */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 bg-white/70 backdrop-blur-3xl border border-white rounded-[3.5rem] p-10 shadow-xl relative overflow-hidden group">
//                 <div className="flex items-center gap-4 mb-8">
//                     <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
//                         <Newspaper size={24} />
//                     </div>
//                     <h3 className="text-2xl font-black italic uppercase text-slate-800">Market Sentiment Stream</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="p-6 bg-slate-50/80 rounded-[2.5rem] border border-white hover:border-indigo-200 transition-all">
//                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-2">Ticker Sentiment Analysis</span>
//                         <p className="text-sm text-slate-600 italic font-semibold leading-relaxed">
//                            "{data.analysis.substring(0, 140)}..."
//                         </p>
//                     </div>
//                     <div className="p-6 bg-indigo-600 text-white rounded-[2.5rem] shadow-lg">
//                         <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-2">Alpha Correlation Status</span>
//                         <p className="text-sm italic font-medium leading-relaxed">
//                           "Currently {data.ticker} is showing dynamic strength vector against indices. AI calculated score matches institutional trend parameters."
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
//                 <div className="relative z-10">
//                     <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 truncate text-white">
//                       {data.ticker}
//                     </h2>
//                     <div className="space-y-2">
//                       <p className="text-3xl font-black text-emerald-400 italic">{typeof data.price === 'number' ? `₹${data.price}` : data.price}</p>
//                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white/5 w-fit px-4 py-1.5 rounded-full uppercase italic">
//                          <ArrowUpRight size={14} className="text-emerald-400" /> AI Quantum Active Mode
//                       </div>
//                     </div>
//                 </div>
//                 <Activity className="absolute -right-6 -bottom-6 text-white/5" size={200} />
//             </div>
//           </div>

//           {/* SECTION 2: THE 100-SCALE SCORE & CHECKLIST */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Visual Score Display */}
//             <div className="lg:col-span-5 bg-white border border-white rounded-[4rem] p-12 flex flex-col items-center text-center shadow-2xl relative">
//               <p className="text-[11px] font-black text-slate-400 tracking-[0.4em] uppercase mb-10">AI Confidence Index</p>
//               <div className="relative w-72 h-72 flex items-center justify-center mb-10">
//                 <svg className="w-full h-full -rotate-90">
//                   <circle cx="144" cy="144" r="125" stroke="currentColor" strokeWidth="18" fill="transparent" className="text-slate-100" />
//                   <circle cx="144" cy="144" r="125" stroke="currentColor" strokeWidth="18" fill="transparent" 
//                     strokeDasharray={785}
//                     strokeDashoffset={785 - (785 * (getSafeScore() / 100))}
//                     className="text-indigo-600 transition-all duration-[2500ms] ease-out shadow-inner"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-9xl font-black italic tracking-tighter text-slate-900">{getSafeScore()}</span>
//                     <span className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.3em]">% Score</span>
//                 </div>
//               </div>
//               <div className={`px-12 py-5 rounded-[2.5rem] font-black text-sm uppercase tracking-widest border-2 shadow-xl ${getSafeScore() >= 60 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
//                 Verdict: {data.verdict}
//               </div>
//             </div>

//             {/* Checklist Matrix */}
//             <div className="lg:col-span-7 bg-white/40 backdrop-blur-md border border-white rounded-[4rem] p-12 shadow-inner">
//                 <div className="flex items-center gap-4 mb-10">
//                     <Layers className="text-indigo-600" size={28} />
//                     <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-800">7-Layer Filter Status</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//                   {Object.entries(data?.levels || {}).map(([lvl, status]: any) => (
//                     <div key={lvl} className={`flex items-center justify-between p-7 rounded-[2.2rem] border-2 transition-all hover:scale-[1.02] ${status === 'PASS' ? 'bg-white border-white shadow-md' : 'bg-slate-200/10 border-slate-200/50 opacity-60'}`}>
//                       <div className="flex items-center gap-4">
//                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic ${status === 'PASS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-300 text-slate-500'}`}>
//                           {lvl}
//                         </div>
//                         <p className="text-sm font-black text-slate-800 uppercase italic tracking-tighter">Requirement {lvl}</p>
//                       </div>
//                       {status === 'PASS' ? <CheckCircle2 className="text-emerald-500 w-7 h-7" /> : <XCircle className="text-rose-400 w-7 h-7" />}
//                     </div>
//                   ))}
//                 </div>
//             </div>
//           </div>

//           {/* SECTION 3: INSTITUTIONAL LOGIC & VERDICT */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
//              <div className="bg-white/80 border-2 border-white rounded-[4rem] p-12 shadow-2xl flex flex-col h-[450px]">
//                 <div className="flex items-center gap-4 mb-6 shrink-0">
//                    <div className="p-4 bg-indigo-50 rounded-[1.5rem] text-indigo-600 border border-indigo-100">
//                       <MessageSquareQuote size={28} />
//                    </div>
//                    <h3 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">AI Reasoning</h3>
//                 </div>
                
//                 <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar text-slate-600 font-medium text-[15px] leading-relaxed italic">
//                    <div className="flex gap-4">
//                       <div className="h-auto w-1 bg-indigo-600 rounded-full shrink-0" />
//                       <div>
//                          <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 non-italic font-sans">Comprehensive Engine Audit Report</h4>
//                          <p className="whitespace-pre-wrap font-semibold text-slate-700">
//                             {data.analysis}
//                          </p>
//                       </div>
//                    </div>
//                 </div>
//              </div>

//              <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[4rem] p-12 text-white shadow-[0_30px_100px_rgba(79,70,229,0.3)] flex flex-col justify-between relative overflow-hidden group h-[450px]">
//                 <div className="relative z-10 h-full flex flex-col justify-between">
//                    <div>
//                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 mb-4 opacity-70">Final System Recommendation</p>
//                       <h4 className="text-6xl font-black italic uppercase leading-[0.8] mb-6 tracking-tighter">INSTITUTIONAL <br /> <span className="text-white underline decoration-indigo-400 decoration-8 underline-offset-4">VERDICT</span></h4>
//                    </div>
//                    <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.8rem] border border-white/20 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 mt-auto">
//                       <p className="text-3xl font-black italic tracking-tighter text-white uppercase leading-tight">
//                          "{data.verdict}"
//                       </p>
//                       <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-200">Confidence Match: {getSafeScore()}%</p>
//                    </div>
//                 </div>
//                 <Zap className="absolute -right-10 -top-10 w-64 h-64 text-white/5 -rotate-12" />
//              </div>
//           </div>

//         </div>
//       )}

//       {/* FOOTER */}
//       <div className="mt-20 text-center pb-10 border-t border-slate-100 pt-10">
//           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.8em] italic">CAN-AI Hybrid Engine v5.1 • 100-Point Audit Scale</p>
//       </div>
//     </div>
//   );
// }





// "use client";

// import React, { useState } from "react";
// import { CheckCircle2, XCircle, Zap, ShieldAlert, Loader2 } from "lucide-react";

// interface AuditData {
//   ticker: string;
//   verdict: string;
//   score: number;
//   confidence_match: number;
//   canslim_layers: {
//     [key: string]: boolean | string | number;
//   };
//   reasoning: string;
// }

// export default function QuantAuditPage() {
//   const [ticker, setTicker] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [auditData, setAuditData] = useState<AuditData | null>(null);

//   const handleRunAudit = async () => {
//     if (!ticker.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       // Aapka backend endpoint route
//       const response = await fetch(`http://localhost:5001/api/audit?ticker=${ticker.toUpperCase()}`);
      
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

//   // Helper logic to gracefully detect passing layers from GROQ AI
//   const isLayerPassed = (layerKey: string): boolean => {
//     if (!auditData || !auditData.canslim_layers) return false;
//     const value = auditData.canslim_layers[layerKey];
//     if (typeof value === "boolean") return value;
//     if (typeof value === "string") {
//       const normalized = value.toLowerCase();
//       return normalized === "true" || normalized === "pass" || normalized === "bullish" || normalized === "yes";
//     }
//     return false;
//   };

//   // Safe Score calculator in case backend defaults to 0 dynamically
//   const displayedScore = auditData ? auditData.score : 0;
  
//   const layers = [
//     { key: "C", name: "Current Earnings" },
//     { key: "A", name: "Annual Earnings" },
//     { key: "N", name: "New Catalysts" },
//     { key: "S", name: "Supply & Demand" },
//     { key: "L", name: "Leader / Laggard" },
//     { key: "I", name: "Institutional View" },
//     { key: "M", name: "Market Direction" },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
//       <div className="max-w-5xl mx-auto space-y-10">
        
//         {/* Header Branding */}
//         <div className="text-center space-y-2">
//           <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
//             <Zap className="w-6 h-6 text-indigo-600 fill-indigo-600" />
//           </div>
//           <h1 className="text-4xl font-extrabold tracking-tight italic text-slate-900">
//             QUANT <span className="text-indigo-600 underline decoration-indigo-300">AUDIT</span>
//           </h1>
//           <p className="text-xs tracking-widest text-slate-400 uppercase font-medium">
//             AI-Driven Institutional Grade Analysis
//           </p>
//         </div>

//         {/* Input Control Console */}
//         <div className="bg-white p-4 rounded-full shadow-xl border border-slate-100 max-w-xl mx-auto flex items-center justify-between pl-6 gap-3">
//           <input
//             type="text"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             placeholder="ENTER TICKER (e.g., TCS, INFY)"
//             className="w-full font-bold uppercase tracking-wider text-slate-800 placeholder-slate-300 focus:outline-none text-lg"
//             onKeyDown={(e) => e.key === "Enter" && handleRunAudit()}
//           />
//           <button
//             onClick={handleRunAudit}
//             disabled={loading}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wider whitespace-nowrap disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 AUDITING...
//               </>
//             ) : (
//               <>
//                 <Zap className="w-4 h-4 fill-white" />
//                 Run Audit
//               </>
//             )}
//           </button>
//         </div>

//         {/* Loading and Error Handle Views */}
//         {error && (
//           <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center max-w-2xl mx-auto shadow-md">
//             <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto mb-2" />
//             <h3 className="text-rose-800 font-extrabold tracking-wide uppercase text-sm">Audit Connection Interrupted</h3>
//             <p className="text-rose-600 text-xs mt-1 font-semibold uppercase tracking-wider">{error}</p>
//           </div>
//         )}

//         {/* Dynamic Audit Report Area */}
//         {auditData && !loading && (
//           <div className="space-y-8 animate-fade-in">
            
//             {/* Top Stream Indicators */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between">
//                 <div>
//                   <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Market Sentiment Stream</h4>
//                   <p className="text-slate-700 font-medium italic text-sm">
//                     "{auditData.reasoning.slice(0, 140)}..."
//                   </p>
//                 </div>
//                 <div className="mt-4 flex gap-3 text-xs font-bold uppercase tracking-wider">
//                   <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Groq Engine Active</span>
//                 </div>
//               </div>

//               {/* Ticker Live State Card */}
//               <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
//                 <div>
//                   <h2 className="text-3xl font-black tracking-tighter">{auditData.ticker}</h2>
//                   <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mt-1">● Live Scan Complete</p>
//                 </div>
//                 <div className="z-10 mt-6 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 max-w-max">
//                   <span className="text-[10px] font-bold tracking-widest uppercase block text-slate-300">AI Active Mode</span>
//                 </div>
//               </div>
//             </div>

//             {/* Core 7-Layer Metrics Block */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
//               {/* Confidence Index Gauge */}
//               <div className="md:col-span-4 bg-white p-6 rounded-3xl shadow-md border border-slate-100 text-center space-y-6">
//                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">AI Confidence Index</h4>
//                 <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
//                   {/* Outer circle layout */}
//                   <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
//                   <div className="text-center">
//                     <span className="text-5xl font-black text-slate-800 tracking-tighter block">{displayedScore}</span>
//                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">% Score</span>
//                   </div>
//                 </div>
//                 <div className="bg-amber-50 rounded-xl py-2 px-4 border border-amber-200/60 max-w-max mx-auto">
//                   <span className="text-amber-800 text-xs font-black uppercase tracking-wider">Verdict: {auditData.verdict}</span>
//                 </div>
//               </div>

//               {/* 7-Layer Filter Grid */}
//               <div className="md:col-span-8 bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-4">
//                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">7-Layer Filter Status</h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {layers.map((layer) => {
//                     const passed = isLayerPassed(layer.key);
//                     return (
//                       <div
//                         key={layer.key}
//                         className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
//                           passed
//                             ? "bg-emerald-50/60 border-emerald-100 text-emerald-900"
//                             : "bg-slate-50/60 border-slate-100 text-slate-500"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shadow-sm ${
//                             passed ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"
//                           }`}>
//                             {layer.key}
//                           </div>
//                           <span className="text-xs font-bold uppercase tracking-wider">{layer.name}</span>
//                         </div>
//                         {passed ? (
//                           <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
//                         ) : (
//                           <XCircle className="w-5 h-5 text-slate-300" />
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//             </div>

//             {/* AI Reasoning Text Box */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//               <div className="md:col-span-5 bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-2">
//                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">AI Reasoning</h4>
//                 <div className="border-l-2 border-indigo-500 pl-4 py-1">
//                   <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Comprehensive Engine Audit Report</p>
//                   <p className="text-slate-600 text-xs font-medium leading-relaxed">{auditData.reasoning}</p>
//                 </div>
//               </div>

//               {/* Final Verdict Badge */}
//               <div className="md:col-span-7 bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
//                 <div className="space-y-1">
//                   <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block">Final System Recommendation</span>
//                   <h3 className="text-3xl font-black italic tracking-tight uppercase">Institutional Verdict</h3>
//                 </div>
//                 <div className="mt-8 bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
//                   <p className="text-xl font-black tracking-wide uppercase italic text-emerald-300">"{auditData.verdict}"</p>
//                   <span className="text-[9px] font-bold tracking-widest text-indigo-200 uppercase block mt-1">Confidence Match: {auditData.confidence_match}%</span>
//                 </div>
//               </div>
//             </div>

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
  canslim_layers: {
    [key: string]: boolean | string | number;
  };
  layer_explanations?: {
    [key: string]: string;
  };
  reasoning: string;
}

export default function QuantAuditPage() {
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
  }, []);

  const runAudit = async (tickerValue: string) => {
    if (!tickerValue.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5001/api/audit?ticker=${tickerValue.toUpperCase()}`);
      if (!response.ok) throw new Error("Backend server error");
      const data = await response.json();
      setAuditData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!ticker.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/api/audit?ticker=${ticker.toUpperCase()}`);
      
      if (!response.ok) {
        throw new Error("Backend server responded with an error");
      }

      const data = await response.json();
      setAuditData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while connecting to the AI core.");
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  
  useEffect(() => {
    const tickerParam = searchParams.get("ticker");
    if (tickerParam) {
      setTicker(tickerParam);
      // Timeout isliye taaki UI render hone ke baad call ho
      setTimeout(() => {
        // Ticker update hone ke baad audit chalane ke liye 
        // hum manually 'handleRunAudit' logic yahan call kar sakte hain
        // Par easy tareeka ye hai ki hum yahan ek naya function banayein
      }, 500);
    }
  }, [searchParams]);

  const isLayerPassed = (layerKey: string): boolean => {
    if (!auditData || !auditData.canslim_layers) return false;
    const value = auditData.canslim_layers[layerKey];
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1; // Agar AI 1/0 bhej de
    if (typeof value === "string") {
      const normalized = value.toLowerCase().trim();
      return normalized === "true" || normalized === "pass" || normalized === "bullish" || normalized === "yes" || normalized === "1";
    }
    return false;
  };

  const displayedScore = auditData ? auditData.score : 0;
  
  const layers = [
    { key: "C", name: "Current Earnings", desc: "Checks if recent quarterly profits jumped significantly (>20%)" },
    { key: "A", name: "Annual Earnings", desc: "Verifies solid compound annual growth over the last 3-5 years" },
    { key: "N", name: "New Catalysts", desc: "Looks for new management, products, or critical price breakouts" },
    { key: "S", name: "Supply & Demand", desc: "Tracks volume spikes to see if big institutions are buying up shares" },
    { key: "L", name: "Leader / Laggard", desc: "Filters out weak assets; confirms if this is an industry-leading stock" },
    { key: "I", name: "Institutional View", desc: "Checks if top mutual funds and banks are building fresh positions" },
    { key: "M", name: "Market Direction", desc: "Confirms if overall market environment is safe and in an uptrend" },
  ];

  // Up/Down colors logic for price trends
  const isPositive = auditData && (auditData.change_percent ?? 0) >= 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-12 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            QUANT <span className="text-indigo-600 tracking-tighter">7-LEVEL AUDIT</span>
          </h1>
          <p className="text-xs tracking-widest text-slate-400 uppercase font-bold">
            Automated Real-Time CANSLIM Analysis Framework
          </p>
        </div>

        {/* Input Control Console - Clear String on load ensures no default hardcode */}
        <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 max-w-xl mx-auto flex items-center justify-between pl-5 gap-3">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="ENTER TICKER SYMBOL (e.g., TCS, RELIANCE)"
            className="w-full font-extrabold uppercase tracking-wider text-slate-800 placeholder-slate-300 focus:outline-none text-base bg-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleRunAudit()}
          />
          <button
            onClick={handleRunAudit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AUDITING ASSET...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white text-indigo-600" />
                Run Audit
              </>
            )}
          </button>
        </div>

        {/* Error Feedback View */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center max-w-xl mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <h3 className="text-rose-800 font-bold uppercase text-xs tracking-wider">Audit Core Alert</h3>
            <p className="text-rose-600 text-[11px] mt-1 font-medium tracking-wide uppercase">{error}</p>
          </div>
        )}

        {/* Dynamic Audit Report Area */}
        {auditData && !loading && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Live Metrics Hero Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Premium Wide Price Ticker Card */}
              <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group border border-slate-800">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-1">PROCESSED UNDER TICKER</span>
                    <h2 className="text-4xl font-black tracking-tighter flex items-center gap-2">
                      {auditData.ticker}
                      <span className="text-xs font-semibold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300">Live Metric Core</span>
                    </h2>
                  </div>
                  
                  {/* Glowing Price Display */}
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">DYNAMIC MARKET PRICE</span>
                    <div className="text-3xl font-black tracking-tight text-white">
                      {auditData.live_price && auditData.live_price > 0 ? `₹${auditData.live_price.toLocaleString()}` : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Session Trend:</span>
                    <div className={`flex items-center gap-1 font-black px-2.5 py-0.5 text-xs rounded-lg ${isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                      {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {auditData.change_percent ?? 0}%
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    ● Real-Time Data Pipeline Synchronized
                  </div>
                </div>
              </div>

              {/* Engine Status Block */}
              {/* Container jise aap apne page mein sahi jagah rakh sakte hain */}
              <div className="relative w-full h-[150px]"> 
                <div 
                  className={`absolute top-0 left-0 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-top-left z-50
                  ${isExpanded ? 'scale-[1.1] w-[120%] p-8' : 'scale-100 w-full p-6'}`}
                >
                  {/* Header Section */}
                  <div className="cursor-pointer flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white fill-white animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">Market Pulse</h4>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Institutional Insights</h2>
                      </div>
                    </div>
                    <ArrowDownRight className={`w-6 h-6 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Content */}
                  <div className={`mt-6 space-y-6 transition-all duration-700 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                    <div className="text-5xl font-black text-indigo-600">{auditData.score}% Momentum</div>
                    <div className="grid grid-cols-2 gap-4">
                        {auditData.reasoning.split('.').slice(0, 4).map((p, i) => (
                          <p key={i} className="text-xs bg-slate-900 text-slate-200 p-4 rounded-xl">{p.trim()}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Core 7-Layer Metrics Block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Score Gauge */}
              <div className="md:col-span-4 bg-white p-6 rounded-3xl shadow-md border border-slate-100 text-center space-y-5">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">CANSLIM Compatibility Score</h4>
                
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 clip-circle pointer-events-none opacity-20"></div>
                  <div className="text-center">
                    <span className="text-5xl font-black text-slate-800 tracking-tighter block">{displayedScore}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Filter Score %</span>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-100 rounded-xl py-2 px-4 shadow-inner">
                  <span className="text-[11px] font-black uppercase tracking-wider block text-indigo-400">INSTITUTIONAL RECOMMENDATION</span>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">{auditData.verdict}</span>
                </div>
              </div>

              {/* 7-Layer Filter Grid (User Friendly Explanations Embedded) */}
              <div className="md:col-span-8 bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">7-Layer Filter Status Breakdown</h4>
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Naive-User Mode Enabled</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {layers.map((layer) => {
                    const passed = isLayerPassed(layer.key);
                    const customExplanation = auditData.layer_explanations ? auditData.layer_explanations[layer.key] : null;
                    
                    return (
                      <div
                        key={layer.key}
                        className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          passed
                            ? "bg-emerald-50/40 border-emerald-100 text-emerald-950"
                            : "bg-slate-50/60 border-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shadow-sm shrink-0 ${
                              passed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {layer.key}
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-slate-800">{layer.name}</span>
                          </div>
                          
                          {/* Structural explanation line for beginner understanding */}
                          <p className="text-[11px] text-slate-400 font-medium pl-8">
                            <span className="font-semibold text-slate-500">Framework Rule:</span> {layer.desc}
                          </p>
                          
                          {/* Live explanation from AI Core */}
                          {customExplanation && (
                            <div className="mt-1 pl-8 flex items-start gap-1.5 text-xs text-slate-600 font-medium italic">
                              <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{customExplanation}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-end shrink-0 pl-8 md:pl-0">
                          {passed ? (
                            <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-white" />
                              PASSED
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-slate-200/60 text-slate-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />
                              LAGGING
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* AI Reasoning Summary Footer */}
            {/* <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Detailed Quant Audit Analysis</h4>
              </div>
              <p className="text-slate-600 text-xs font-medium leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100 shadow-inner">
                {auditData.reasoning}
              </p>
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400 pt-1">
                <span>Data Confidence Match: {auditData.confidence_match}%</span>
                <span>Security Engine Verified</span>
              </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Key Strategic Takeaway */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl text-white shadow-lg">
                <h4 className="text-[9px] font-black uppercase text-indigo-400 mb-2 tracking-widest">Core Investment Verdict</h4>
                <p className="text-xs font-bold leading-relaxed">{auditData.verdict}</p>
              </div>
              
              {/* Card 2: Risk / Reward Snapshot */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Smart Audit Logic</h4>
                <div className="space-y-2">
                  {auditData.reasoning.split('.').slice(0, 2).map((point, i) => (
                    <div key={i} className="text-[1rem] font-medium text-slate-600 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {point.trim()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: Expandable Full Analysis */}
            <details className="mt-4 text-[10px] font-bold text-slate-400 cursor-pointer uppercase tracking-widest hover:text-indigo-600">
              <summary>View Technical Deep-Dive Report</summary>
              <div className="grid grid-cols-1 gap-6">
              {auditData.reasoning.split('.').filter(s => s.length > 20).slice(0, 3).map((point, i) => (
                <div key={i} className="group p-6 bg-indigo-900/5 rounded-2xl border border-white/5 hover:border-indigo-500 transition-colors">
                  <p className="text-[19px] font-semibold text-black leading-relaxed group-hover:text-black">
                    <span className="text-indigo-400 font-black mr-3 text-[19px]">0{i + 1}.</span> 
                    {point.trim()}
                  </p>
                </div>
              ))}
            </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}