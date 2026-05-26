'use client';

import { Search, Loader2, AlertCircle, ArrowLeft, ArrowUp, ArrowDown, Home, Activity, Target } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

// --- API FETCH FUNCTION ---
async function getFullAnalysis(ticker: string) {
  const NGROK_URL = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const response = await fetch(`${NGROK_URL}/api/full-analysis/${ticker}`, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default function SingleStockPage() {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTf, setActiveTf] = useState('1 Day');

  const handleSearch = async (t: string) => {
    if (!t) return;
    setLoading(true);
    setError(null);
    window.history.pushState({}, '', `?ticker=${t.toUpperCase()}`);
    
    const result = await getFullAnalysis(t.toUpperCase());
    if (result) {
      setData(result);
      setActiveTf('1 Day');
    } else {
      setError("Stock not found or Server is Offline!");
    }
    setLoading(false);
  };

  const goBack = () => {
    setData(null);
    setTicker('');
    window.history.pushState({}, '', window.location.pathname);
  };

  // --- SEQUENCE CHECK LOGIC ---
  const renderTimeframeButtons = () => {
    if (!data || !data.historical_data) return null;

    const timeframes = [
      { id: '1 Day', minPoints: 2 },
      { id: '1 Week', minPoints: 5 },
      { id: '1 Month', minPoints: 15 },
      { id: '3 Month', minPoints: 50 },
      { id: '6 Month', minPoints: 100 },
      { id: '1 Year', minPoints: 200 },
      { id: '5 Year', minPoints: 800 }
    ];

    const visibleButtons = [];
    
    // Check sequence: Agar ek bhi fail hua, toh uske aage ke sab fail.
    for (let tf of timeframes) {
      const actualPoints = data.historical_data[tf.id]?.length || 0;
      if (actualPoints >= tf.minPoints) {
        visibleButtons.push(tf.id);
      } else {
        // Break the loop! Agar 1 Month ka data nahi hai, toh 3M, 6M, 1Y nahi dikhayenge.
        break; 
      }
    }

    return visibleButtons.map(tfId => (
      <button 
        key={tfId}
        onClick={() => setActiveTf(tfId)}
        className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
          activeTf === tfId ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        {tfId}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans selection:bg-indigo-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <Home className="w-4 h-4" /> 
            <span className="text-sm font-medium">Home</span>
          </Link>
          {data && (
            <button onClick={goBack} className="group flex items-center gap-2 text-indigo-600 font-medium">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-sm">New Search</span>
            </button>
          )}
        </div>

        {!data ? (
          /* Search View */
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
            <div className="w-full max-w-xl text-center">
              <h1 className="text-4xl font-semibold text-slate-900 mb-3 tracking-tight">Live Market Analysis</h1>
              <p className="text-slate-500 mb-10 text-lg font-light">Get professional insights for any NSE stock instantly.</p>
              
              <div className="relative group">
                <input 
                  className="w-full p-6 pl-8 bg-white rounded-3xl shadow-sm border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none font-medium text-xl text-slate-900 uppercase placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 transition-all"
                  placeholder="Enter Ticker (e.g. RELIANCE)"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(ticker)}
                />
                <button 
                  onClick={() => handleSearch(ticker)}
                  className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Search className="w-5 h-5" /> Search</>}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Dashboard */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">LIVE DATA</span>
                  <h2 className="text-4xl font-semibold tracking-tight text-slate-900">{ticker.toUpperCase()}</h2>
                </div>
                <p className="text-slate-500 font-light flex items-center gap-1.5 text-lg">
                  <Activity className="w-4 h-4 text-indigo-400" /> Real-time market data
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-light text-slate-900 mb-2 leading-none">
                  ₹{data.latest_price ? data.latest_price.toLocaleString('en-IN') : '0.00'}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-lg font-medium text-sm ${
                  (data.today_change_percent ?? 0) >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {(data.today_change_percent ?? 0) >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {Math.abs(data.today_change_percent ?? 0).toFixed(2)}% Today
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl"><Target className="w-5 h-5 text-indigo-500" /></div>
                  <h3 className="font-semibold text-slate-700">AI Analysis Verdict</h3>
                </div>
                <span className={`text-sm font-semibold tracking-wide uppercase px-5 py-2 rounded-full ${
                  data.advice.includes('BUY') ? 'bg-emerald-500 text-white' : 
                  data.advice.includes('SELL') ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'
                }`}>
                  {data.advice}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-base italic border-l-2 border-indigo-100 pl-6">
                "{data.reason_summary}"
              </p>
            </div>

            {/* Price Chart Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                    Price Action History
                </h3>
                <div className="flex bg-slate-50 p-1 rounded-xl overflow-x-auto gap-1">
                  {/* Dynamic Sequential Buttons */}
                  {renderTimeframeButtons()}
                </div>
              </div>

              <div className="h-[350px] w-full">
                {data.historical_data && data.historical_data[activeTf] ? (
                  <Line 
                    data={{
                      labels: data.historical_data[activeTf].map((d: any) => {
                        // Agar d.date ek number hai (yaani 1 Day ka timestamp hai)
                        if (typeof d.date === 'number') {
                          // Isko clean local time string mein badal do (e.g., "09:15 AM")
                          return new Date(d.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                        }
                        // Agar string hai (baaki long-term slabs ke liye), toh purana split logic chalne do
                        return d.date && typeof d.date === 'string' ? d.date.split(' ')[0] : d.date;
                      }),
                      datasets: [{
                        data: data.historical_data[activeTf].map((d: any) => d.price),
                        borderColor: '#4F46E5',
                        borderWidth: 2,
                        tension: 0.3,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        fill: true,
                        backgroundColor: (context) => {
                          const ctx = context.chart.ctx;
                          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.1)');
                          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                          return gradient;
                        },
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
                      scales: {
                        x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                        y: { border: { display: false }, grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 10 } } }
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm italic">
                    Select a valid timeframe.
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Market Cap', value: data.fundamentals?.MarketCap ?? 'N/A' },
                { label: '52W High', value: data.additional_metrics?.['52W High'] ?? 'N/A', color: 'text-emerald-600' },
                { label: '52W Low', value: data.additional_metrics?.['52W Low'] ?? 'N/A', color: 'text-rose-600' },
                { label: 'P/E Ratio', value: data.fundamentals?.TrailingPE ? `${data.fundamentals.TrailingPE}x` : 'N/A' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:border-indigo-100 transition-colors">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">{item.label}</p>
                  <p className={`text-lg font-semibold ${item.color || 'text-slate-800'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 font-medium flex items-center justify-center gap-3 animate-bounce">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}