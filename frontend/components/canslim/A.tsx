'use client';

import React, { useEffect, useState } from 'react';
import { 
  Loader2, CheckCircle2, TrendingUp, Percent, ShieldCheck, 
  AlertTriangle, BookOpen, Search, Database, Globe, BarChart2, 
  Zap, ArrowRight, Star
} from 'lucide-react';

interface AProps {
  backendUrl: string;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  isSearching?: boolean;
  showResult?: boolean;
  auditData?: any;
  stocksList?: any[];
  loadingList?: boolean;
  handleSearch?: (tickerParam?: string) => Promise<void>;
}

// Aur function ki pehli line ko aise likhein taaki props access ho sakein
export default function A({ 
  backendUrl, 
  searchQuery, 
  handleSearch, 
  isSearching, 
  auditData 
}: AProps) {
  const [loading, setLoading] = useState(true);
  const [aStocks, setAStocks] = useState<any[]>([]);
  const [error, setError] = useState(false);
  
  // Default 'main' tab khulega as per request
  const [viewMode, setViewMode] = useState<'guide' | 'main'>('main');

  useEffect(() => {
    let isMounted = true;
    const scanStocks = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${backendUrl}/api/scan-nifty-a`);
        if (!res.ok) throw new Error("Server Error");
        const data = await res.json();
        if (isMounted) setAStocks(data);
      } catch (e) {
        console.error("Scan failed", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    scanStocks();
    return () => { isMounted = false; };
  }, [backendUrl]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- PREMIUM SUB-NAV --- */}
      <div className="flex p-2 bg-slate-900/5 backdrop-blur-md rounded-[2.5rem] w-fit mx-auto md:mx-0 border border-slate-200 shadow-inner">
        <button 
          onClick={() => setViewMode('guide')}
          className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'guide' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> What is 'A'?
        </button>
        <button 
          onClick={() => setViewMode('main')}
          className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'main' ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Zap className="w-4 h-4 mr-2" /> A-Grade Monsters
        </button>
      </div>

      {viewMode === 'guide' ? (
        /* --- HIGH-EXPRESSIVE VISUAL GUIDE --- */
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-500">
          
          {/* Header Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3.5rem] p-12 text-white relative overflow-hidden border-b-8 border-indigo-500 shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-indigo-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic tracking-widest mb-6 inline-block">The "Annual" Filter</span>
                <h4 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">Hunting for <br/><span className="text-indigo-400">Consistency.</span></h4>
                <p className="text-slate-400 text-lg font-bold italic max-w-md">In CANSLIM, 'A' ensures you don't buy "One-Hit Wonders". We only want companies that grow profits every single year.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 <div className="bg-white/5 backdrop-blur-lg p-8 rounded-[2.5rem] border border-white/10 flex items-center space-x-6">
                    <div className="text-4xl font-black text-indigo-400 italic">01</div>
                    <div>
                       <h5 className="font-black uppercase text-xs tracking-widest text-indigo-300">Annual EPS Growth</h5>
                       <div className="h-2 w-48 bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[85%] animate-pulse shadow-[0_0_10px_#6366f1]"></div>
                       </div>
                       <p className="text-[10px] font-bold text-slate-300 mt-2">Target: +25% Year-over-Year</p>
                    </div>
                 </div>
                 <div className="bg-white/5 backdrop-blur-lg p-8 rounded-[2.5rem] border border-white/10 flex items-center space-x-6">
                    <div className="text-4xl font-black text-emerald-400 italic">02</div>
                    <div>
                       <h5 className="font-black uppercase text-xs tracking-widest text-emerald-300">Return on Equity (ROE)</h5>
                       <div className="flex space-x-1 mt-2">
                          {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i<5 ? 'fill-emerald-400 text-emerald-400' : 'text-white/20'}`} />)}
                       </div>
                       <p className="text-[10px] font-bold text-slate-300 mt-2">Target: 17% Minimum Efficiency</p>
                    </div>
                 </div>
              </div>
            </div>
            <BarChart2 className="absolute -bottom-20 -right-20 w-96 h-96 opacity-5 text-white" />
          </div>

          {/* Infographic Steps - NOW ALWAYS VISIBLE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: <Database />, title: "Data Mining", desc: "We pull last 3-5 years of audited financial results.", color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
               { icon: <TrendingUp />, title: "Trend Check", desc: "Is the profit line going up? We kill the flat ones.", color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
               { icon: <ShieldCheck />, title: "Quality Audit", desc: "Management must prove they use capital wisely.", color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" }
             ].map((item, i) => (
               <div key={i} className={`bg-white p-8 rounded-[3rem] border-2 ${item.border} shadow-md flex flex-col items-center text-center group hover:scale-105 transition-all duration-300`}>
                  <div className={`${item.color} p-5 rounded-[2rem] mb-6 shadow-inner`}>{item.icon}</div>
                  <h6 className="font-black uppercase italic tracking-tighter text-slate-900 text-xl mb-2">{item.title}</h6>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase">{item.desc}</p>
               </div>
             ))}
          </div>

          {/* Source Verification Footer - UPDATED SOURCE */}
          <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between border-2 border-dashed border-slate-200">
             <div className="flex items-center space-x-4 mb-6 md:mb-0">
                <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
                   <Globe className="text-indigo-600 w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Primary Data Engine</p>
                  <p className="text-xl font-black italic text-slate-900">Yahoo Finance (yFinance)</p>
                </div>
             </div>
             <ArrowRight className="hidden md:block text-slate-300" />
             <div className="text-center md:text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Backend Infrastructure</p>
                <p className="text-xl font-black italic text-indigo-600">Google Colab + Ngrok Tunneling</p>
             </div>
          </div>
        </div>
      ) : (
        /* --- MAIN: A-GRADE MONSTERS TAB --- */
        <div className="animate-in slide-in-from-right-8 duration-500">
          {loading ? (
            <div className="py-32 text-center flex flex-col items-center justify-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 shadow-inner">
              <div className="relative mb-8">
                <Loader2 className="w-24 h-24 animate-spin text-indigo-600" />
                <Zap className="w-10 h-10 text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-yellow-400" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">Hunting Monsters...</h3>
              <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.4em]">Screening Annual Financials via yFinance Engine</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center bg-red-50 rounded-[3rem] border-2 border-red-100">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h5 className="text-xl font-black uppercase italic text-red-900">Connection Interrupted</h5>
              <button onClick={() => window.location.reload()} className="mt-6 px-10 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-red-700 shadow-xl transition-all">Re-Initialize Scan</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aStocks.length > 0 ? (
                aStocks.map((stock, idx) => (
                  <div key={idx} className="bg-white border-4 border-slate-50 p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                       <Zap className="w-32 h-32 -rotate-12" />
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div>
                        <h3 className="text-4xl font-black italic text-slate-900 leading-none tracking-tighter">{stock.ticker}</h3>
                        <div className="flex items-center mt-2 space-x-2">
                           <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-2 py-0.5 rounded uppercase italic">A-Pass</span>
                           <span className="text-[9px] font-black text-slate-300 tracking-widest uppercase italic">Nifty 50</span>
                        </div>
                      </div>
                      <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-5 relative z-10">
                      <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors shadow-sm">
                        <div className="flex items-center text-slate-400 group-hover:text-indigo-600 mb-2">
                          <Percent className="w-3.5 h-3.5 mr-2" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Return on Equity</span>
                        </div>
                        <span className="text-3xl font-black text-slate-900 italic">{stock.roe}%</span>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 group-hover:bg-emerald-50/50 group-hover:border-emerald-100 transition-colors shadow-sm">
                        <div className="flex items-center text-slate-400 group-hover:text-emerald-700 mb-2">
                          <TrendingUp className="w-3.5 h-3.5 mr-2" />
                          <span className="text-[10px] font-black uppercase tracking-widest">3Y EPS Growth</span>
                        </div>
                        <span className="text-3xl font-black text-slate-900 italic">{stock.eps_growth}%</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center relative z-10">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">LTP</span>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter italic">₹{stock.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-24 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100 shadow-inner">
                  <div className="mb-6 opacity-20"><Zap className="w-20 h-20 mx-auto" /></div>
                  <p className="text-slate-400 font-black italic uppercase tracking-[0.2em] text-sm">No Stocks Cleared the Monster Filter Today</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}