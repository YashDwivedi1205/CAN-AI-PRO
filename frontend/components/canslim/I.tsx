'use client';

import React, { useState } from 'react';
import { 
  Building2, Search, Globe, Loader2,
  ShieldCheck, TrendingUp, Activity
} from 'lucide-react';
import InstitutionalView from '../InstitutionalView'; 

interface IProps {
  onAuditAction: (ticker: string) => void;
  stocksList: any[];
}

export default function I({ onAuditAction, stocksList = [] }: IProps) {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [tickerSearch, setTickerSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [instiData, setInstiData] = useState<any>(null);

  const fetchStockData = async (ticker: string) => {
    if (!ticker) return;
    setLoading(true);
    const symbol = ticker.toUpperCase();
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!baseUrl) {
        alert("Bhai, .env mein NEXT_PUBLIC_BACKEND_URL missing hai!");
        setLoading(false);
        return;
      }

      const finalUrl = `${baseUrl.replace(/\/$/, '')}/api/full-analysis/${symbol}`;
      
      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      console.log("MY_BACKEND_DATA:", data);
      
      if (data.error || !data.success) {
        alert("Backend Error: " + (data.error || "Data fetch fail ho gaya"));
        setLoading(false);
        return;
      }

      // Backend se jo data aa raha hai usko direct set kar rahe hain
      setInstiData(data);
      setSelectedStock(symbol);
    } catch (error: any) {
      console.error("Error fetching I-Layer data:", error);
      alert("Backend Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedStock(null);
    setInstiData(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {selectedStock && instiData ? (
          <InstitutionalView 
            ticker={selectedStock} 
            onBack={handleBack}
            data={instiData} 
          />
        ) : (
        <>
          <section className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="bg-cyan-500/20 backdrop-blur-md text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-cyan-400 border border-cyan-500/30 italic">Step 4: Institutional</span>
                </div>
                <h3 className="text-6xl font-black mb-6 italic uppercase tracking-tighter leading-none">
                  Track the <span className="text-cyan-400">Giants</span>
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-md">
                  Retailers don't move markets. Banks, Mutual Funds, and FIIs do. If the "Big Money" is buying, you should be too.
                </p>
              </div>
              <div className="flex justify-center relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full"></div>
                <Building2 className="w-40 h-40 text-cyan-400 relative z-10 animate-pulse" />
              </div>
            </div>
          </section>

          <div className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-32 h-32" />
            </div>
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-[0.3em] mb-8 flex items-center">
              <Search className="w-5 h-5 mr-3 text-indigo-600" /> Institution Radar
            </h4>
            <div className="flex flex-col md:flex-row gap-4 relative z-20">
              <input 
                type="text" 
                placeholder="Search Ticker (RELIANCE, TCS...)"
                className="flex-1 bg-slate-50 border-2 border-slate-100 py-6 px-10 rounded-[2rem] focus:border-indigo-600 outline-none transition-all font-black text-slate-700 text-xl uppercase placeholder:text-slate-300"
                value={tickerSearch}
                onChange={(e) => setTickerSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchStockData(tickerSearch)}
              />
              <button 
                disabled={loading}
                onClick={() => fetchStockData(tickerSearch)}
                className="bg-indigo-600 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center min-w-[200px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Deep Check"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-emerald-50 rounded-2xl"><ShieldCheck className="w-6 h-6 text-emerald-600" /></div>
                <span className="font-black text-xs text-slate-400 uppercase tracking-widest">Quality</span>
              </div>
              <h5 className="text-2xl font-black text-slate-800 mb-2 italic uppercase">Strong Hands</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Top-tier Mutual Funds must hold significant stake.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl"><TrendingUp className="w-6 h-6 text-blue-600" /></div>
                <span className="font-black text-xs text-slate-400 uppercase tracking-widest">Trend</span>
              </div>
              <h5 className="text-2xl font-black text-slate-800 mb-2 italic uppercase">Increasing</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Institutional owner count should rise every quarter.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-cyan-50 rounded-2xl"><Activity className="w-6 h-6 text-cyan-600" /></div>
                <span className="font-black text-xs text-slate-400 uppercase tracking-widest">Footprint</span>
              </div>
              <h5 className="text-2xl font-black text-slate-800 mb-2 italic uppercase">Heavy Vol</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Live volume reveals hidden accumulation.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}