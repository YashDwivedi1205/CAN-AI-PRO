'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import C from '@/components/canslim/C'; 
import A from '@/components/canslim/A'; 
import N from '@/components/canslim/N';
import SLayer from '@/components/canslim/S'; 
import L from '@/components/canslim/L'; 
import I from '@/components/canslim/I'; 
import M from '@/components/canslim/M';

export default function CanslimPage() {
  const router = useRouter();
  const [activeLetter, setActiveLetter] = useState('C');
  const [activeSubTab, setActiveSubTab] = useState('STOCKS LIST'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [stocksList, setStocksList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const BACKEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://aifsa.onrender.com' 
    : 'http://localhost:5001';

  const loadInitialData = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch(`${BACKEND_URL}/api/bulk-canslim`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setStocksList(data);
    } catch (e) {
      console.error("Failed to load list", e);
    } finally {
      setLoadingList(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSearch = async (tickerParam?: string) => {
    const ticker = tickerParam || searchQuery;
    if (!ticker) return;

    setIsSearching(true);
    setShowResult(false);

    try {
      // FIX: Naya route call kar rahe hain jo humne app.py aur Colab mein banaya hai
      const response = await fetch(`${BACKEND_URL}/api/canslim-detail?symbol=${ticker}`);
      
      if (!response.ok) {
        throw new Error('Stock not found or Backend Error');
      }

      const data = await response.json();

      if (data.ticker || data.symbol) {
        // Humne saara data (C aur A dono ka) ek hi route 'canslim-detail' mein daal diya hai
        setAuditData({
          ticker: data.ticker || ticker.toUpperCase(),
          price: data.price || "N/A",
          growth: data.annual_eps_growth || 0,
          prevEps: data.prev_eps || "N/A", 
          currentEps: data.current_value || data.price, 
          score: data.score || 70, // Default score agar DB mein na ho
          status: data.status || "MATCHED",
          // Agar database mein 'annualData' alag se hai toh wo uthayega, nahi toh pura data
          annualData: data.annualData || data 
        });
        
        setShowResult(true);
      } else {
        alert("Ticker not found in CANSLIM database.");
      }
    } catch (error) {
      console.error("Audit Error:", error);
      alert("Search failed: Backend logic missing or Stock not in cache.");
    } finally {
      setIsSearching(false);
    }
  };

  const triggerAudit = (ticker: string) => {
    router.push(`/audit?ticker=${ticker.toUpperCase()}`);
  };

  const letters = ['C', 'A', 'N', 'S', 'L', 'I', 'M'];

  const getLetterDesc = (l: string) => {
    const descMap: Record<string, string> = {
      'C': "Current Earnings",
      'A': "Annual Growth",
      'N': "New Highs & News",
      'S': "Supply & Demand",
      'L': "Leader or Laggard",
      'I': "Institutional Support",
      'M': "Market Direction"
    };
    return descMap[l] || "Financial Metrics";
  };

  const getMainHeading = (l: string) => {
    const headMap: Record<string, string> = {
      'C': "Current Quarterly Earnings",
      'A': "Annual Earnings (ROE & EPS)",
      'N': "New Highs, News & Breakouts",
      'S': "Supply & Demand (Volume Surge)",
      'L': "Market Leader vs Laggard",
      'I': "Institutional Sponsorship Analysis",
      'M': "Market Direction & Trend Pulse"
    };
    return headMap[l] || `Layer ${l} Analysis`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-[0.92rem]">
      {/* Header Section */}
      <header className="bg-white border-b p-4 flex items-center shadow-sm sticky top-0 z-20">
        <Link href="/" className="mr-4 p-2 hover:bg-slate-100 rounded-full transition text-indigo-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-black text-slate-800 tracking-tight italic">
          CANSLIM <span className="text-indigo-600">Insight</span>
        </h1>
      </header>

      {/* Main Content Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-28 md:w-72 bg-white border-r overflow-y-auto">
          <nav className="p-4 space-y-3">
            {letters.map((letter) => (
              <button 
                key={letter} 
                onClick={() => { 
                  setActiveLetter(letter); 
                  setActiveSubTab('STOCKS LIST'); 
                  setShowResult(false); 
                }}
                className={`w-full flex items-center p-4 rounded-xl font-bold transition-all border-2 ${activeLetter === letter ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg scale-[1.02]' : 'text-slate-500 bg-white border-transparent hover:bg-indigo-50 hover:text-indigo-600'}`}
              >
                <span className="text-3xl font-black w-10 italic">{letter}</span>
                <span className="hidden md:block ml-4 text-left text-[10px] uppercase tracking-[0.15em] font-black">
                  {getLetterDesc(letter)}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 min-h-full">
            <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                <div className="flex items-center">
                  <span className="text-6xl font-black text-indigo-600 mr-6 italic">{activeLetter}</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-widest">
                    {getMainHeading(activeLetter)}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">Live Engine Active</span>
                </div>
            </div>

            {/* Content Logic with proper Fragment or Single Parent */}
            <div className="content-wrapper">
              {activeLetter === 'C' && (
                <C activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSearching={isSearching} showResult={showResult} auditData={auditData} stocksList={stocksList} loadingList={loadingList} handleSearch={handleSearch} backendUrl={BACKEND_URL} />
              )}
              {activeLetter === 'A' && (
                <A backendUrl={BACKEND_URL} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSearching={isSearching} showResult={showResult} auditData={auditData} stocksList={stocksList} loadingList={loadingList} handleSearch={handleSearch} />
              )}
              {activeLetter === 'N' && (
                <N backendUrl={BACKEND_URL} />
              )}
              {activeLetter === 'S' && (
                <SLayer onAuditAction={triggerAudit} />
              )}
              {activeLetter === 'L' && (
                <L stocksList={stocksList} onAuditAction={triggerAudit} />
              )}
              {activeLetter === 'I' && (
                <I stocksList={stocksList} onAuditAction={triggerAudit} />
              )}
              {activeLetter === 'M' && (
                <M onAuditAction={triggerAudit} />
              )}
              {!letters.includes(activeLetter) && (
                <div className="py-32 text-center flex flex-col items-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-100 mb-6" />
                    <p className="font-black text-slate-300 uppercase tracking-[0.4em] italic text-xl">Syncing {activeLetter} Layer...</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}