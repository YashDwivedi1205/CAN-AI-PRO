'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Activity, ShieldAlert, BarChart3, Gauge, Zap, 
  Search, Sparkles, Loader2, ArrowUpRight, TrendingUp as BullishIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Custom Markdown Parser Function for Headers and Bold Text
const renderParsedMarkdown = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, idx) => {
    let cleanLine = line.trim();
    if (cleanLine.startsWith('###')) {
      return (
        <h3 key={idx} className="text-xl font-black text-indigo-400 uppercase italic mt-6 mb-3 tracking-tight">
          {cleanLine.replace('###', '').trim()}
        </h3>
      );
    }
    if (cleanLine.startsWith('**') && cleanLine.endsWith('**')) {
      return (
        <p key={idx} className="text-sm font-black text-white uppercase tracking-wider mt-4 mb-2">
          {cleanLine.replace(/\*\*/g, '').trim()}
        </p>
      );
    }
    // Baaki normal text ke liye asterisks parse karna
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={idx} className="text-slate-300 text-sm font-bold leading-relaxed italic mb-2">
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="text-white font-black not-italic bg-white/10 px-1.5 py-0.5 rounded mx-0.5">{part.replace(/\*\*/g, '')}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
};

interface MarketDirectionProps {
  onAuditAction: (ticker: string) => void;
}

const getDetailedMAnalysis = (report: any) => {
  if (!report) return [];

  // Dynamic values based on current active report
  const ticker = report.ticker || "STOCK";
  const pattern = report.pattern || "Breakout Setup";
  const confidence = report.confidence || 88;
  const rsRank = report.rsRating || "85+";

  return [
    {
      title: "CURRENT CHART POSITIONING",
      desc: `The main interactive line chart shows a clear visual structure of a ${pattern}. The price is tightly consolidating in the 'Supply Gone' zone, pressing against the upper resistance line where selling pressure has completely dried up.`
    },
    {
      title: "RIGHT METRICS BREAKDOWN",
      desc: `The dynamic cards on the right side freeze the key validation metrics: AI Confidence stands at a strong ${confidence}% for this asset, while the Relative Strength (RS Rank) sits at an elite ${rsRank}, meaning this stock is outperforming the vast majority of the broad market.`
    },
    {
      title: "MARKET DIRECTION (M) INTERPRETATION",
      desc: "Since previous letters (C, A, N, S, L, I) are already validated in earlier stages, this level strictly assesses 'M'. Broad market indices and Nifty 50 direction are currently acting as a critical filter. The system requires the market direction to stay aligned before confirming the ultimate move."
    },
    {
      title: "INSTITUTIONAL ACCUMULATION CHECK",
      desc: `Volume distribution reveals heavy accumulation patterns over the last few weeks. Institutional blocks are quietly building positions without driving the price up aggressively, ensuring minimal risk before the actual volume breakout happens.`
    },
    {
      title: "BREAKOUT ENTRY TRIGGER PLAN",
      desc: `As the strategy dictates 'WAIT FOR BREAKOUT', users should avoid chasing early spikes. The precise trigger point requires a strong daily close above the pivot resistance on high institutional volume, validating that 'M' and the asset are in perfect sync.`
    }
  ];
};

export default function MarketDirection({ onAuditAction }: MarketDirectionProps) {
  const router = useRouter();
  // --- REAL STATES ---
  const [marketData, setMarketData] = useState<any>({
    status: "Loading...",
    dist_days: 0,
    color: "slate",
    nifty_price: 0
  });
  const [loadingMarket, setLoadingMarket] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  // 1. Fetch Real Market Direction from Backend
  useEffect(() => {
    const fetchMarketPulse = async () => {
      try {
        // const res = await fetch(`http://localhost:5001/api/market-direction`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market-direction`);
        const data = await res.json();
        setMarketData(data);
      } catch (err) {
        console.error("Market Pulse fetch failed", err);
        setMarketData({ status: "Data Unavailable", dist_days: 0, color: "red", nifty_price: 0 });
      } finally {
        setLoadingMarket(false);
      }
    };
    fetchMarketPulse();
  }, []);

  // 2. Real Analysis using Backend Logic
  const runAnalysis = async (ticker: string) => {
    if (!ticker) return;
    setIsAnalyzing(true);
    setSearchQuery(ticker.toUpperCase());
    setReport(null); // Purana report clear karein
    
    try {
      // Backend se AI Deep Audit fetch karna
      const res = await fetch(`http://localhost:5001/api/deep-audit/${ticker}`);
      const data = await res.json();

      if (data.status === "success") {
        const aiText = data.audit_report;

        setReport({
          ticker: ticker.toUpperCase(),
          rsRating: "85+", // Static benchmark
          stage: "Stage 2 (Growth Phase)",
          // AI Report ke text se patterns aur confidence dhoondna
          pattern: aiText.includes("Cup") ? "Cup & Handle" : aiText.includes("VCP") ? "VCP Squeeze" : "Trend Breakout",
          pivot: "Check Report",
          confidence: aiText.includes("High-Conviction") ? 95 : 88,
          strategy: aiText.includes("BUY") || aiText.includes("Buy") ? "BEST TIME TO BUY" : "WAIT FOR BREAKOUT",
          detailedConclusion: aiText
        });
      } else {
        alert("Stock data not found: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Analysis failed", err);
      alert("Backend connection error. Make sure server is on port 5001.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) runAnalysis(searchQuery);
  };

  const topLeaders = [
    { ticker: 'TATAELXSI', gain: '+4.2%' },
    { ticker: 'HAL', gain: '+3.8%' },
    { ticker: 'RELIANCE', gain: '+1.5%' },
    { ticker: 'ADANIENT', gain: '+5.1%' },
    { ticker: 'RVNL', gain: '+6.4%' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* --- MARKET PULSE SECTION (Real Data) --- */}
      <section className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10"><Gauge className="w-64 h-64 rotate-12" /></div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-3">
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/30 italic">Step 5: Market Direction</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">Market <span className={`text-${marketData.color}-400 font-outline-2 text-transparent`} style={{ WebkitTextStroke: `1px ${marketData.color === 'red' ? '#ef4444' : '#34d399'}` }}>Pulse</span></h3>
              <p className="text-slate-400 text-lg font-medium max-w-md italic">Nifty 50 at ₹{marketData.nifty_price?.toLocaleString()}. Strategy adjusted for current trend.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 flex flex-col items-center text-center">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Current Outlook</p>
                {loadingMarket ? (
                  <Loader2 className="animate-spin text-emerald-400" />
                ) : (
                  <>
                    <h4 className={`text-4xl font-black text-${marketData.color}-400 uppercase italic mb-2`}>{marketData.status}</h4>
                    <div className={`flex items-center space-x-2 text-${marketData.color}-500/80 animate-pulse`}>
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {marketData.status === "Confirmed Uptrend" ? "Market is Safe" : "Proceed with Caution"}
                      </span>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* --- TOP STOCKS SECTION --- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest italic flex items-center"><Sparkles className="w-4 h-4 mr-2 text-yellow-400" /> Top Stocks Today</h4>
          <span className="text-[9px] font-bold text-slate-400 uppercase italic">Click to see Chart</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topLeaders.map((stock, i) => (
            <div key={i} onClick={() => runAnalysis(stock.ticker)} className="bg-white border-2 border-slate-100 p-6 rounded-[2.5rem] hover:border-indigo-600 transition-all cursor-pointer group shadow-sm active:scale-95">
              <h5 className="text-xl font-black text-slate-900 italic tracking-tighter">{stock.ticker}</h5>
              <p className="text-[10px] font-black text-emerald-600 mt-1">{stock.gain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEARCH SECTION --- */}
      <section>
        <form onSubmit={handleSearch} className="relative group">
          <div className="relative bg-white border-2 border-slate-100 p-3 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 flex items-center px-6 py-2 w-full">
              <Search className="w-6 h-6 text-slate-300 mr-4" />
              <input type="text" placeholder="Enter stock name (e.g. HAL, RELIANCE)..." className="w-full bg-transparent outline-none font-black italic text-lg uppercase text-slate-800 placeholder:text-slate-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button type="submit" disabled={isAnalyzing} className="bg-slate-900 text-white px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest italic hover:bg-indigo-600 transition-all min-w-[200px]">
              {isAnalyzing ? <Loader2 className="animate-spin" /> : "Analyze Now"}
            </button>
          </div>
        </form>
      </section>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
            <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-widest flex items-center mb-8"><ShieldAlert className="w-5 h-5 mr-3 text-red-500" /> Selling Pressure</h5>
            <div className="flex items-end space-x-3 mb-6">
              <span className="text-7xl font-black italic text-slate-900">
                {marketData.dist_days !== undefined && marketData.dist_days !== null ? marketData.dist_days : 0}
              </span>
              <span className="text-sm font-black text-red-500 uppercase tracking-tighter">Days</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full" style={{ width: `${(marketData.dist_days / 6) * 100}%` }}></div>
            </div>
            <p className="text-[9px] font-bold text-slate-400 mt-4 uppercase italic">
              {marketData.dist_days > 4 ? "Heavy Institutional Selling" : "Institutions are holding positions"}
            </p>
        </div>
        
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
            <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-8 flex items-center"><Activity className="w-5 h-5 mr-3 text-indigo-600" /> Market Health</h5>
            <div className="flex justify-between items-end mb-6">
                <div><p className="text-[10px] font-black text-emerald-500 italic">Trend</p><p className="text-2xl font-black italic text-slate-800">BULLISH</p></div>
                <div className="text-right"><p className="text-[10px] font-black text-slate-400 italic">Benchmark</p><p className="text-2xl font-black italic text-slate-800">NIFTY 50</p></div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
              <div className="bg-indigo-600 h-full" style={{ width: '75%' }}></div>
            </div>
        </div>

        <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between">
            <h5 className="font-black text-indigo-200 text-[11px] uppercase tracking-widest flex items-center"><Zap className="w-5 h-5 mr-3 text-yellow-400 fill-yellow-400" /> Key Benchmark</h5>
            <h4 className="text-5xl font-black italic tracking-tighter uppercase">Nifty 50</h4>
            <button className="w-full bg-white/10 py-4 rounded-2xl font-black text-[10px] uppercase border border-white/10 italic">Real-time Feed</button>
        </div>
      </div>

      {/* --- ANALYSIS REPORT SECTION --- */}
      {(isAnalyzing || report) && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h4 className="font-black text-slate-800 text-2xl uppercase italic tracking-tighter px-2">
              {report ? `${report.ticker} Chart Analysis` : "Technical Analysis Engine"}
          </h4>

          <div className="bg-white border-2 border-slate-100 p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden group">
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-slate-900 font-black italic uppercase tracking-widest text-[10px]">Processing AI Audit...</p>
                </div>
              )}

              {report && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-black text-indigo-600 uppercase italic tracking-widest">Visual Chart Guide</span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{report.ticker} Pattern</span>
                      </div>
                      <div className="relative w-full h-[350px] bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 flex items-end justify-between overflow-hidden">
                         <div className="absolute top-10 left-10 text-[9px] font-black text-slate-300 uppercase leading-loose">Price Level (₹)<br/>2400 —<br/>2200 —<br/>2000 —<br/>1800 —</div>
                         <div className="flex items-end space-x-2 w-full h-full relative z-10 opacity-30">
                            {[30, 35, 25, 15, 10, 8, 10, 15, 25, 40, 50, 48, 46, 70, 65, 90].map((h, i) => (
                               <div key={i} className={`flex-1 w-full rounded-sm ${i > 13 ? 'bg-emerald-400' : 'bg-slate-400'}`} style={{ height: `${h}%` }}></div>
                            ))}
                         </div>
                         <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 800 300">
                            <path d={report.pattern === "Cup & Handle" ? "M 50 100 Q 300 350 550 100 L 700 120 L 780 50" : "M 50 250 L 150 50 L 300 180 L 450 70 L 600 120 L 780 40"} stroke="#4f46e5" fill="transparent" strokeWidth="5" strokeLinecap="round" className="animate-pulse" />
                            <g className="text-[16px] font-black italic fill-indigo-600 uppercase">
                              <text x="300" y="280" textAnchor="middle">Collection Zone</text>
                              <text x="680" y="150" textAnchor="middle" fill="#f59e0b">Supply Gone</text>
                              <circle cx="780" cy="50" r="10" fill="#10b981" />
                              <text x="770" y="30" textAnchor="end" fill="#10b981">Trend Check</text>
                            </g>
                         </svg>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase mb-2">AI Pattern</p>
                          <h5 className="text-lg font-black text-slate-900 italic uppercase">{report.pattern}</h5>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-center">
                          <p className="text-[9px] font-black text-indigo-600 uppercase mb-2 italic">RS Rank</p>
                          <h5 className="text-4xl font-black text-indigo-600 italic leading-none">{report.rsRating}</h5>
                      </div>
                      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center">
                          <p className="text-[9px] font-black text-emerald-600 uppercase mb-2 italic">AI Confidence</p>
                          <h5 className="text-2xl font-black text-emerald-600 italic leading-none">{report.confidence}%</h5>
                      </div>
                    </div>
                  </div>

                  {/* --- AI VERDICT BOX --- */}
                  <div className="bg-slate-900 p-8 md:p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><BullishIcon className="w-48 h-48" /></div>
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 border-b border-white/10 pb-10">
                        <div>
                          <h6 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-3">AI Reasoning Output</h6>
                          <h5 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-400">{report.strategy}</h5>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        {/* AI Report Render Area - Replaced with Clean, Professional English M-Analysis */}
                        <div className="mt-8 space-y-6">
                          {report.strategy === "WAIT FOR BREAKOUT" ? (
                            <div className="grid grid-cols-1 gap-4">
                              {getDetailedMAnalysis(report).map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/30 group"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 border-b border-white/5 pb-2">
                                    <h4 className="text-xs font-black tracking-wider text-indigo-400 uppercase italic">
                                      {item.title}
                                    </h4>
                                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-amber-400 transition-colors uppercase tracking-widest">
                                      Stage Phase [M.{idx + 1}]
                                    </span>
                                  </div>
                                  <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                                    {item.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Fallback default parser if strategy is not WAIT FOR BREAKOUT
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-2">
                              {renderParsedMarkdown(report.detailedConclusion)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        // Pehle original prop function ko trigger karein backup ke liye
                        if (report?.ticker) {
                          onAuditAction(report.ticker);
                          // Ab direct user ko 7-Level Audit page par redirect karein with uppercase ticker query
                          router.push(`/audit?ticker=${report.ticker.toUpperCase()}`);
                        }
                      }}
                      className="w-full bg-slate-900 text-white py-10 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-sm hover:bg-indigo-600 transition-all flex items-center justify-center group shadow-2xl active:scale-95"
                    >
                      GENERATE FINAL VERDICT <ArrowUpRight className="ml-5 w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}