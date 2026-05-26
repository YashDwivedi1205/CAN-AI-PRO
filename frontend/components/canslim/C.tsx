"use client";

import React from 'react';
import { Target, HelpCircle, BarChart3, Zap, Calculator, Database, Activity, ShieldCheck, Loader2, Search } from 'lucide-react';

interface CProps {
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  showResult: boolean;
  auditData: any;
  stocksList: any[];
  loadingList: boolean;
  handleSearch: (ticker?: string) => void;
  backendUrl: string; // <-- Ye line add karo
}

const C = ({
  activeSubTab, setActiveSubTab, searchQuery, setSearchQuery,
  isSearching, showResult, auditData, stocksList, loadingList, 
  handleSearch, backendUrl // <-- Yahan bhi add karo
}: CProps) => {
  return (
    <div className="space-y-10">
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        {['C IN CANSLIM', 'STOCKS LIST', 'DETAILED SEARCH'].map((tab) => (
          <button key={tab} onClick={() => setActiveSubTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeSubTab === tab ? 'bg-white text-indigo-600 shadow-md scale-[1.05]' : 'text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: C IN CANSLIM */}
      {activeSubTab === 'C IN CANSLIM' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 max-w-6xl">
          
          {/* HERO SECTION: The Core Philosophy */}
          <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                    <span className="bg-indigo-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Core Principle</span>
                </div>
                <h3 className="text-5xl font-black mb-6 italic uppercase tracking-tighter leading-none">
                  Quarterly <span className="text-indigo-500">Earnings</span> Surge
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  Stock prices don't move in a vacuum. They follow the money. In the CANSLIM model, **"C"** is the primary filter that identifies companies experiencing a sudden, explosive turnaround in their business operations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                      <p className="text-indigo-400 font-black text-[10px] uppercase mb-2 tracking-widest">Success Benchmark</p>
                      <p className="text-4xl font-black italic">25%+</p>
                      <p className="text-slate-500 text-[10px] mt-2">Minimum required growth for institutional attention.</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                      <p className="text-emerald-400 font-black text-[10px] uppercase mb-2 tracking-widest">Model Precision</p>
                      <p className="text-4xl font-black italic">Real-Time</p>
                      <p className="text-slate-500 text-[10px] mt-2">Data synced directly with exchange reporting cycles.</p>
                  </div>
              </div>
            </div>
            <Target className="absolute -right-16 -bottom-16 w-96 h-96 text-white opacity-[0.03]" />
          </section>

          {/* MATHEMATICAL AUDIT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em] mb-8 flex items-center">
                <Calculator className="w-5 h-5 mr-3 text-indigo-600" /> Mathematical Growth Formula
              </h4>
              
              <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 mb-8">
                <p className="text-slate-400 text-xs font-bold uppercase mb-8 text-center tracking-widest">Quarter-over-Quarter (QoQ) YoY Basis</p>
                
                {/* Clean HTML-based Mathematical Formula */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 font-serif italic text-slate-800">
                  <span className="text-2xl font-black">Growth % =</span>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-light">(</span>
                    <div className="flex flex-col items-center">
                      <span className="px-4 border-b-2 border-slate-800 text-base md:text-lg pb-1">
                        EPS<sub>Current</sub> - EPS<sub>Prev Year Qtr</sub>
                      </span>
                      <span className="px-4 text-base md:text-lg pt-1">
                        | EPS<sub>Prev Year Qtr</sub> |
                      </span>
                    </div>
                    <span className="text-3xl font-light">)</span>
                  </div>
                  
                  <span className="text-2xl font-black">× 100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shrink-0 text-xs">1</div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We bypass simple sequential quarters to avoid seasonal noise (e.g., Diwali sales spikes).
                    </p>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shrink-0 text-xs">2</div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Absolute values are used in the denominator to handle recovery from negative earnings (turnaround plays).
                    </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <Database className="w-12 h-12 mb-6 text-indigo-300" />
              <h4 className="font-black text-xs uppercase tracking-widest mb-4">Data Source Pipeline</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Our engine pulls raw financial filings via <strong>Yahoo Finance (YF) API</strong>, specifically targeting the <code>quarterly_financials</code> and <code>Basic EPS</code> vectors.
              </p>
              <ul className="space-y-3">
                {['NSE/BSE Filings', 'Consolidated Income Statements', 'Adjusted Trailing EPS'].map((item) => (
                  <li key={item} className="flex items-center text-[10px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> {item}
                  </li>
                ))}
              </ul>
              <Zap className="absolute -right-8 -bottom-8 w-40 h-40 text-white opacity-10" />
            </div>
          </div>

          {/* GRADING SYSTEM DIAGRAM */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200">
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em] mb-10 text-center">Live Grading Logic Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Connection Line (Hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
              
              {[
                { label: 'GRADE C', range: '0-15%', desc: 'Speculative Growth', color: 'bg-slate-100', text: 'text-slate-400' },
                { label: 'GRADE B', range: '15-25%', desc: 'Baseline Setup', color: 'bg-indigo-50', text: 'text-indigo-600' },
                { label: 'GRADE A', range: '25-50%', desc: 'Institutional Entry', color: 'bg-emerald-50', text: 'text-emerald-600' },
                { label: 'GRADE A+', range: '50%+', desc: 'High Velocity Lead', color: 'bg-emerald-500', text: 'text-white' },
              ].map((tier, i) => (
                <div key={i} className={`${tier.color} p-6 rounded-[2rem] border border-white relative z-10 text-center shadow-sm`}>
                  <p className={`font-black text-[10px] uppercase mb-1 ${tier.text}`}>{tier.label}</p>
                  <p className={`text-2xl font-black mb-2 ${tier.text === 'text-white' ? 'text-white' : 'text-slate-800'}`}>{tier.range}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* THREE PILLARS OF C */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
              <div className="group hover:bg-white p-8 rounded-[2.5rem] transition-all duration-500 border border-transparent hover:border-slate-200">
                  <Activity className="w-10 h-10 text-indigo-600 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-4">Acceleration Factor</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">It’s not just about profit; it's about speed. If a company grew 20% last quarter and 40% this quarter, the "C" rating explodes.</p>
              </div>
              <div className="group hover:bg-white p-8 rounded-[2.5rem] transition-all duration-500 border border-transparent hover:border-slate-200">
                  <BarChart3 className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-4">Earnings Quality</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">We filter for operational profit. One-time gains (selling property, etc.) are manually penalized by our scoring engine.</p>
              </div>
              <div className="group hover:bg-white p-8 rounded-[2.5rem] transition-all duration-500 border border-transparent hover:border-slate-200">
                  <ShieldCheck className="w-10 h-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-4">The "25/25" Rule</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">William O'Neil's gold standard: 25% increase in earnings AND 25% increase in sales. This creates a bulletproof "C" score.</p>
              </div>
          </div>
        </div>
      )}

      {/* TAB 2: STOCKS LIST */}
      {activeSubTab === 'STOCKS LIST' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
          {loadingList ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600 mb-4" />
              <p className="font-black text-slate-400 uppercase tracking-widest">Scanning Database...</p>
            </div>
          ) : (
            stocksList
              .filter(stock => {
                // STRICT VALIDATION (Ye nahi badlega): Data complete hona chahiye
                const hasValidTicker = stock.ticker && stock.ticker !== "";
                const hasValidPrice = stock.price !== null && stock.price !== undefined && stock.price > 0;
                const hasValidGrowth = stock.growth !== null && stock.growth !== undefined;
                
                // LOOSENED CRITERIA: 5% Growth par bhi stock qualify karega
                const passesCriteria = stock.growth >= 0.1; 

                return hasValidTicker && hasValidPrice && hasValidGrowth && passesCriteria;
              })
              .sort((a, b) => b.growth - a.growth) // Ranking best to average
              .map((stock, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 transition-all duration-300 hover:bg-slate-900 group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl font-black text-indigo-600/20 group-hover:text-indigo-400 italic">#{idx+1}</span>
                    <div className="bg-indigo-50 group-hover:bg-indigo-600 px-4 py-2 rounded-2xl transition-colors">
                      <span className="font-black text-indigo-600 group-hover:text-white uppercase text-[10px] tracking-widest">
                        {/* Dynamic Grading based on growth */}
                        {stock.growth >= 40 ? 'Grade A+' : stock.growth >= 20 ? 'Grade A' : 'Grade B'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-black text-slate-800 text-xl uppercase group-hover:text-white">{stock.ticker}</h4>
                    <p className="text-slate-500 group-hover:text-slate-400 font-bold">₹{stock.price}</p>
                  </div>

                  <div className="flex justify-between border-t border-slate-100 group-hover:border-white/10 pt-6 mb-8">
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-black mb-1">QoQ Growth</p>
                        <p className={`font-black text-lg ${stock.growth >= 20 ? 'text-emerald-500' : 'text-indigo-400'}`}>
                          +{stock.growth}%
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-black mb-1">C-Rating</p>
                        <div className="flex justify-end space-x-0.5">
                          {[...Array(5)].map((_, i) => {
                            // Logic for star rating: 40%+ (5 stars), 20%+ (4 stars), 5%+ (3 stars)
                            const rating = stock.growth >= 40 ? 5 : stock.growth >= 20 ? 4 : 3;
                            return (
                              <span key={i} className={`text-sm ${i < rating ? 'text-amber-400' : 'text-slate-200 group-hover:text-slate-700'}`}>
                                ★
                              </span>
                            );
                          })}
                        </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { 
                      setSearchQuery(stock.ticker); 
                      setActiveSubTab('DETAILED SEARCH'); 
                      handleSearch(stock.ticker); 
                    }} 
                    className="w-full bg-slate-900 group-hover:bg-indigo-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-500/10"
                  >
                    View Deep Analysis
                  </button>
                </div>
              ))
          )}
        </div>
      )}

      {/* TAB 3: DETAILED SEARCH */}
      {activeSubTab === 'DETAILED SEARCH' && (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white p-4 shadow-2xl rounded-[2.5rem] border-2 border-slate-100 focus-within:border-indigo-500">
              <div className="flex-1 flex items-center px-6">
                  <Search className="w-6 h-6 text-slate-400 mr-4" />
                  <input type="text" value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="ENTER TICKER (e.g. RELIANCE)" 
                      className="w-full py-4 bg-transparent outline-none font-black text-xl text-slate-700 tracking-widest" 
                  />
              </div>
              <button onClick={() => handleSearch()} className="bg-slate-900 text-white px-12 py-4 rounded-[1.8rem] font-black text-sm tracking-[0.2em] hover:bg-indigo-600 transition-all">
                {isSearching ? 'ANALYZING...' : 'RUN AUDIT'}
              </button>
          </div>

          {showResult && auditData ? (
            <div className="animate-in slide-in-from-bottom-10 duration-700 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                      <div className="relative z-10">
                          <h4 className="text-5xl font-black italic mb-8 uppercase">{auditData.ticker}</h4>
                          <div className="flex flex-wrap gap-12">
                              <div>
                                  <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Live Price</p>
                                  <p className="text-4xl font-black text-emerald-400">₹{auditData.price}</p>
                              </div>
                              <div>
                                  <p className="text-slate-400 text-[10px] font-black uppercase mb-1">YoY Growth</p>
                                  <p className="text-4xl font-black text-indigo-400">{auditData.growth}%</p>
                              </div>
                          </div>
                      </div>
                      <Activity className="absolute -right-10 -bottom-10 w-64 h-64 text-indigo-500 opacity-10" />
                  </div>

                  <div className="bg-white border-2 border-indigo-100 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center shadow-xl">
                      <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center mb-4">
                          <span className="text-3xl font-black text-slate-800">{auditData.score}</span>
                      </div>
                      <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">C-Score</h5>
                  </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
                  <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-8 flex items-center">
                      <Calculator className="mr-3 text-indigo-600 w-5 h-5" /> Detailed Calculation Audit
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                          <div className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <span className="font-black text-slate-500 text-[10px] uppercase italic">Current Period EPS</span>
                              <span className="text-xl font-black text-slate-800">
                                  {auditData.currentEps !== "N/A" ? `₹${auditData.currentEps}` : "Data N/A"}
                              </span>
                          </div>
                          <div className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <span className="font-black text-slate-500 text-[10px] uppercase italic">Prev Year (Same Quarter)</span>
                              <span className="text-xl font-black text-slate-800">
                                  {auditData.prevEps !== "N/A" ? `₹${auditData.prevEps}` : "N/A (Missing in API)"}
                              </span>
                          </div>
                      </div>

                      <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 text-center">
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 italic">Live Logic Output</p>
                          <p className="text-5xl font-black text-indigo-600 mb-2">
                              {auditData.growth !== "N/A" ? `${auditData.growth}%` : "Data N/A"} 
                              {auditData.growth !== "N/A" && <span className="text-2xl"> Growth</span>}
                          </p>
                          <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase ${auditData.growth !== "N/A" && auditData.growth >= 25 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                              Result: {auditData.growth !== "N/A" ? (auditData.growth >= 25 ? 'PASS (Benchmark > 25%)' : 'FAIL (Below Benchmark)') : 'INSUFFICIENT DATA'}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-pulse">
              <Database className="w-16 h-16 text-indigo-200" />
              <p className="text-slate-300 text-sm font-medium italic max-w-md">Enter any NSE ticker to run a live fundamental audit against CANSLIM parameters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default C;