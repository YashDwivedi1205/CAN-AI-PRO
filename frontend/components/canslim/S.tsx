'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  TrendingUp, BarChart3, Database, Zap, ArrowUpRight, 
  RefreshCcw, BookOpen, Sparkles, CheckCircle2, Search, 
  ShieldCheck, Terminal, Activity 
} from 'lucide-react';
import AuditModal from '../AuditModal';

interface SStock {
  ticker: string;
  price: number;
  volume_surge: number;
  current_vol: number;
  demand_status: string;
  high_52: number;
  roe: number;
  growth: number;
  dist_pct: number | string;
}

interface SLayerProps {
  onAuditAction: (ticker: string) => void;
}

const SLayer: React.FC<SLayerProps> = ({ onAuditAction }) => {
  const [stocks, setStocks] = useState<SStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'guide' | 'main'>('main');

  const [selectedStock, setSelectedStock] = useState<SStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}/api/scan-nifty-s?t=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      const validatedData = data.map((stock: any) => ({
        ticker: stock.ticker || "N/A",
        price: Number(stock.price || 0),
        volume_surge: Number(stock.volume_surge || 0),
        current_vol: Number(stock.current_vol || 0),
        demand_status: stock.demand_status || 'Monitoring',
        high_52: Number(stock.high_52 || 0),
        roe: Number(stock.roe || 0),
        growth: Number(stock.growth || 0),
        dist_pct: stock.dist_pct || 0
      }));

      setStocks(validatedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSData();
  }, [fetchSData]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[60vh] space-y-6">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10 border-t-indigo-600 animate-spin"></div>
        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 animate-pulse" size={32} />
      </div>
      <div className="text-center">
        <p className="text-slate-900 font-black tracking-tighter italic text-2xl uppercase">Syncing Live Volume...</p>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-2">Connecting to Upstox Market Feed</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- PREMIUM SUB-NAV --- */}
      <div className="flex p-2 bg-slate-900/5 backdrop-blur-md rounded-[2.5rem] w-fit mx-auto md:mx-0 border border-slate-200 shadow-inner">
        <button 
          onClick={() => setViewMode('guide')}
          className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'guide' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> Supply Logic
        </button>
        <button 
          onClick={() => setViewMode('main')}
          className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all flex items-center ${viewMode === 'main' ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Sparkles className="w-4 h-4 mr-2" /> Volume Scanner
        </button>
      </div>

      {viewMode === 'guide' ? (
        /* --- TRANSPARENCY GUIDE --- */
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-500">
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden border-b-8 border-indigo-500 shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-indigo-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block italic">Supply/Demand Core</span>
                <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-tight mb-6">Tracking the <br/><span className="text-indigo-400">Institutional Footprint.</span></h4>
                <p className="text-slate-400 text-lg font-bold italic max-w-md">Stocks don't move without big money. 'S' monitors unusual volume spikes that indicate heavy accumulation.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                 <div>
                    <h5 className="text-indigo-300 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center">
                       <Terminal className="w-4 h-4 mr-2" /> Surge Calculation
                    </h5>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-sm text-emerald-400">
                       Volume_Surge = ((Current_Vol / Avg_10D_Vol) - 1) * 100
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase italic">* Alerts trigger when Surge &gt; 50%</p>
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase">Primary Data</p>
                       <p className="text-sm font-black italic">Upstox Live SDK</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase">Audit Engine</p>
                       <p className="text-sm font-black italic">Fundamental Cross-Check</p>
                    </div>
                 </div>
              </div>
            </div>
            <BarChart3 className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                   <div className="p-3 bg-indigo-50 rounded-2xl"><Search className="text-indigo-600" /></div>
                   <h6 className="text-xl font-black italic text-slate-900 uppercase tracking-tighter">Scanning Method</h6>
                </div>
                <ul className="space-y-4">
                   {[
                     "Real-time connection with Upstox for live tick data.",
                     "Comparison of current volume against 10-day moving average.",
                     "Identification of 'High Demand' zones via price-volume action.",
                     "Immediate filtering of low-liquidity noise."
                   ].map((text, i) => (
                     <li key={i} className="flex items-start space-x-3 text-sm font-bold text-slate-500 uppercase">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{text}</span>
                     </li>
                   ))}
                </ul>
             </div>

             <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 text-white">
                <div className="flex items-center space-x-4 mb-6">
                   <div className="p-3 bg-white/5 rounded-2xl"><ShieldCheck className="text-emerald-400" /></div>
                   <h6 className="text-xl font-black italic text-white uppercase tracking-tighter">Supply Verification</h6>
                </div>
                <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase">
                   We ensure that volume spikes are not just retail frenzy. Every stock is passed through an <span className="text-indigo-400 italic font-black">Institutional Audit</span> to check if the demand is sustainable.
                </p>
                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center">
                   <RefreshCcw className="w-5 h-5 text-indigo-400 mr-3 animate-reverse-spin" />
                   <p className="text-[10px] font-black text-slate-300 uppercase italic">Live Engine: Polling Every 60 Seconds</p>
                </div>
             </div>
          </div>
        </div>
      ) : (
        /* --- MAIN LIST --- */
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
            <div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Volume <span className="text-indigo-600">Pulse</span></h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span> Live Upstox Data Feed
              </p>
            </div>
            <button 
              onClick={fetchSData}
              className="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-900 px-8 py-4 rounded-[2rem] font-black text-[10px] tracking-widest transition-all active:scale-95 shadow-sm uppercase italic"
            >
              <RefreshCcw size={14} className={loading ? "animate-spin" : ""} /> Refresh Engine
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock, index) => (
              <div key={index} className="group bg-white border-2 border-slate-50 rounded-[3rem] p-8 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 relative overflow-hidden border-b-8 border-b-indigo-500/10">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 uppercase italic">{stock.ticker}</h3>
                      <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase italic tracking-widest">
                        {stock.demand_status} Demand
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-black italic tracking-tighter ${stock.volume_surge > 0 ? 'text-emerald-600' : 'text-amber-500'}`}>
                        {stock.volume_surge > 0 ? `+${stock.volume_surge.toFixed(1)}%` : '0.0%'}
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Surge</p>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2 text-slate-400">
                        <BarChart3 size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase italic tracking-widest">Live Volume</span>
                      </div>
                      <span className="text-xl font-black text-slate-900 tracking-tighter">
                        {stock.current_vol > 0 ? (stock.current_vol / 100000).toFixed(2) : "0.00"} <span className="text-xs text-slate-400 font-bold uppercase">Lakhs</span>
                      </span>
                    </div>
                    
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-[1px]">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${stock.volume_surge > 0 ? 'bg-gradient-to-r from-indigo-500 to-violet-600' : 'bg-slate-300'}`} 
                        style={{ width: `${stock.volume_surge > 0 ? Math.min(stock.volume_surge, 100) : 5}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Database size={14} />
                        <span className="text-[10px] font-black uppercase italic">52W High</span>
                      </div>
                      <span className="text-sm font-black text-slate-600">₹{stock.high_52 > 0 ? stock.high_52.toLocaleString() : '---'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic text-indigo-600">LTP (Upstox)</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">₹{stock.price > 0 ? stock.price.toLocaleString() : '---'}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedStock(stock);
                        setIsModalOpen(true);
                      }}
                      className="bg-slate-950 text-white hover:bg-indigo-600 p-5 rounded-[1.5rem] transition-all shadow-xl active:scale-90 group/btn"
                    >
                      <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={24} />
                    </button>
                  </div>
                </div>
                <Zap className="absolute -right-6 -top-6 w-24 h-24 text-slate-500/5 rotate-12" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Audit Modal --- */}
      <AuditModal 
        key={selectedStock ? selectedStock.ticker : 'empty'} 
        stock={selectedStock} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStock(null);
        }} 
      />
    </div>
  );
};

export default SLayer;