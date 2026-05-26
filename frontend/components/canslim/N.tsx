'use client';

import React, { useEffect, useState } from 'react';
import { 
  Loader2, Zap, Newspaper, X, ExternalLink, 
  BookOpen, Rocket, LineChart, Globe, Sparkles,
  Search, CheckCircle2, ShieldCheck, Terminal, Calendar, ArrowRight
} from 'lucide-react';

interface NProps {
  backendUrl: string;
}

export default function N({ backendUrl }: NProps) {
  const [loading, setLoading] = useState(true);
  const [nStocks, setNStocks] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [selectedStockNews, setSelectedStockNews] = useState<any>(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'guide' | 'main' | 'search'>('main');

  // Search Tab States
  const [searchTicker, setSearchTicker] = useState("");
  const [searchResultNews, setSearchResultNews] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 1. Stocks fetch karne wala logic (Intact)
  useEffect(() => {
    let isMounted = true;
    const fetchNLayer = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${backendUrl}/api/scan-nifty-n`, {
          headers: { "ngrok-skip-browser-warning": "69420" }
        });
        if (!res.ok) throw new Error('Backend connection failed');
        const data = await res.json();
        if (isMounted) setNStocks(data);
      } catch (e) {
        console.error("Fetch Error:", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchNLayer();
    return () => { isMounted = false; };
  }, [backendUrl]);

  // 2. News fetch karne wala logic (Intact)
  const handleNewsClick = async (ticker: string) => {
    setNewsLoading(true);
    setSelectedStockNews({ ticker, data: { summary: "Fetching...", details: [] } });
    try {
      const res = await fetch(`${backendUrl}/api/get-single-news/${ticker}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "any-value", 
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error(`Server Response Error: ${res.status}`);
      const data = await res.json();
      setSelectedStockNews({ ticker, data });
    } catch (e: any) {
      console.error("News Fetch Error:", e);
      alert(`News load nahi hui: ${e.message}`);
    } finally {
      setNewsLoading(false);
    }
  };

  // 3. New Live 7-Day Search Logic (Sorted & Visibility Fixed)
  const handleLiveSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicker) return;

    setIsSearching(true);
    setSearchResultNews([]);
    try {
      const res = await fetch(`${backendUrl}/api/get-7day-news/${searchTicker.toUpperCase()}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "any-value",
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      
      // Sorting Logic: Descending Order (Latest First)
      const sortedNews = (data.details || []).sort((a: any, b: any) => {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      });

      setSearchResultNews(sortedNews);
    } catch (e) {
      console.error("Search Error:", e);
      alert("Search failed. Check if ticker is valid.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- SUB-NAV --- */}
      <div className="flex flex-wrap p-2 bg-slate-900/5 backdrop-blur-md rounded-[2.5rem] w-fit mx-auto md:mx-0 border border-slate-200 shadow-inner gap-2">
        <button 
          onClick={() => setViewMode('guide')}
          className={`px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'guide' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> Methodology
        </button>
        <button 
          onClick={() => setViewMode('main')}
          className={`px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'main' ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Sparkles className="w-4 h-4 mr-2" /> Live Scanner
        </button>
        <button 
          onClick={() => setViewMode('search')}
          className={`px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'search' ? 'bg-emerald-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Search className="w-4 h-4 mr-2" /> 7D News Search
        </button>
      </div>

      {/* --- VIEW: GUIDE --- */}
      {viewMode === 'guide' && (
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-500">
          <div className="bg-gradient-to-br from-slate-950 to-indigo-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden border-b-8 border-indigo-500 shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-indigo-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block italic">Scanner Algorithm v1.0</span>
                <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-tight mb-6">How We Identify <br/><span className="text-indigo-400">'N' Factor Stocks</span></h4>
                <p className="text-slate-400 text-lg font-bold italic">We combine technical price proximity with real-time news catalysts.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                 <div>
                    <h5 className="text-indigo-300 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center"><Terminal className="w-4 h-4 mr-2" /> Selection Formula</h5>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-sm text-emerald-400">Proximity = ((52W_High - LTP) / 52W_High) * 100</div>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase italic">* Only stocks with Proximity &lt; 15% are selected</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-sm">
                <div className="flex items-center space-x-4 mb-6"><div className="p-3 bg-indigo-50 rounded-2xl"><Search className="text-indigo-600" /></div><h6 className="text-xl font-black italic text-slate-900 uppercase tracking-tighter">The Screening Process</h6></div>
                <ul className="space-y-4">
                    {["Scanner pulls Nifty universe data from yFinance.", "Calculates the rolling 52-week peak.", "Filters stocks near these peaks.", "New Highs = Institutional signal."].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm font-bold text-slate-500 uppercase"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>{text}</span></li>
                    ))}
                </ul>
             </div>
             <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 text-white">
                <div className="flex items-center space-x-4 mb-6"><div className="p-3 bg-white/5 rounded-2xl"><Globe className="text-indigo-400" /></div><h6 className="text-xl font-black italic text-white uppercase tracking-tighter">Real-Time News Edge</h6></div>
                <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase">We perform an <span className="text-white italic">on-demand live scan</span> of Google News.</p>
                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center"><Zap className="w-5 h-5 text-yellow-400 mr-3 animate-pulse" /><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Status: Live Google API Sync Active</p></div>
             </div>
          </div>
        </div>
      )}

      {/* --- VIEW: MAIN SCANNER --- */}
      {viewMode === 'main' && (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
          {loading ? (
            <div className="py-32 text-center flex flex-col items-center justify-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100">
              <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mb-6" />
              <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Scanning Engine...</h3>
            </div>
          ) : error ? (
            <div className="py-20 text-center bg-red-50 rounded-[3.5rem] border border-red-100"> Connection Error. Check Backend. </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nStocks.map((stock, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-100 p-8 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all group border-b-8 border-b-indigo-500/10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-5xl font-black italic text-slate-900 leading-none tracking-tighter">{stock.ticker}</h3>
                      <div className="flex items-center mt-3 space-x-2">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-4 py-1 rounded-full uppercase">Near 52W High</span>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">{stock.dist_pct}% away</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Current Price</p>
                      <p className="text-3xl font-black text-slate-900">₹{stock.price}</p>
                    </div>
                  </div>
                  <div onClick={() => handleNewsClick(stock.ticker)} className="bg-slate-950 p-7 rounded-[2.5rem] text-slate-50 cursor-pointer hover:bg-indigo-900 transition-all border border-slate-800 relative overflow-hidden group/box">
                    <div className="flex items-center mb-4"><div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping mr-3"></div><span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-300">Live News Sync</span></div>
                    <p className="text-sm font-bold leading-relaxed pr-6 uppercase italic relative z-10">Fetch Latest News for {stock.ticker} →</p>
                    <Newspaper className="absolute -right-4 -bottom-4 w-20 h-20 opacity-10 -rotate-12 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- NEW VIEW: 7-DAY LIVE SEARCH --- */}
      {viewMode === 'search' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-xl max-w-4xl mx-auto">
             <form onSubmit={handleLiveSearch} className="relative flex items-center">
                <input 
                  type="text" 
                  value={searchTicker}
                  onChange={(e) => setSearchTicker(e.target.value)}
                  placeholder="Enter Ticker (e.g. RELIANCE)..."
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] px-10 py-6 text-xl font-black italic text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white outline-none transition-all pr-40 shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-4 bg-emerald-600 text-white px-8 py-4 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 transition-all flex items-center disabled:opacity-50"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Scan 7D News <ArrowRight className="ml-2 w-4 h-4" /></>}
                </button>
             </form>
             <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center justify-center">
                <Calendar className="w-3 h-3 mr-2" /> Live Fetching last 168 hours of news data
             </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
             {isSearching ? (
               <div className="py-20 text-center flex flex-col items-center">
                 <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                 <p className="font-black text-slate-500 uppercase text-xs tracking-[0.3em]">Querying Global News Engines...</p>
               </div>
             ) : searchResultNews.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                 <h5 className="text-slate-900 font-black italic uppercase tracking-tighter text-2xl px-6">Top {searchResultNews.length} Headlines found:</h5>
                 {searchResultNews.map((news, i) => (
                   <a key={i} href={news.link} target="_blank" rel="noreferrer" className="group block bg-white p-8 rounded-[3rem] border-2 border-slate-50 hover:border-emerald-500 transition-all shadow-sm hover:shadow-xl">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 pr-10">
                           <div className="flex items-center gap-3 mb-3">
                              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">{news.source}</span>
                              <span className="text-[10px] text-slate-400 font-black uppercase">{news.time}</span>
                           </div>
                           <h4 className="text-xl font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors uppercase italic">{news.title}</h4>
                        </div>
                        <ExternalLink className="w-6 h-6 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                      </div>
                   </a>
                 ))}
               </div>
             ) : searchTicker && !isSearching && (
               <div className="py-20 text-center bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase italic">No news found for "{searchTicker}" in the last 7 days.</p>
               </div>
             )}
          </div>
        </div>
      )}

      {/* --- MODAL --- */}
      {selectedStockNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" onClick={() => setSelectedStockNews(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-10 pb-6 flex items-center justify-between border-b border-slate-50">
              <div>
                <p className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.3em] mb-2 italic">Intelligence Engine</p>
                <h3 className="text-4xl font-black italic text-slate-900 uppercase leading-none">{selectedStockNews.ticker} <span className="text-slate-300">/ Headlines</span></h3>
              </div>
              <button onClick={() => setSelectedStockNews(null)} className="bg-slate-100 text-slate-800 p-5 rounded-full hover:bg-red-500 hover:text-white transition-all border border-slate-200 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 pt-6 space-y-5">
              {newsLoading ? (
                <div className="py-24 text-center flex flex-col items-center"><Loader2 className="w-14 h-14 text-indigo-600 animate-spin mb-6" /><p className="font-black text-slate-400 uppercase text-[10px] tracking-[0.4em]">Scanning...</p></div>
              ) : (
                selectedStockNews.data.details && selectedStockNews.data.details.length > 0 ? (
                  selectedStockNews.data.details.map((news: any, i: number) => (
                    <a key={i} href={news.link} target="_blank" rel="noreferrer" className="group block bg-slate-50 p-8 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-500 hover:bg-white transition-all shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-6">
                          <div className="flex items-center space-x-3 mb-3"><span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{news.source}</span><span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{news.time}</span></div>
                          <h4 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600">{news.title}</h4>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0"><ExternalLink className="w-6 h-6" /></div>
                      </div>
                    </a>
                  ))
                ) : ( <div className="text-center py-20"><p className="text-slate-400 font-bold uppercase italic">No news found.</p></div> )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}