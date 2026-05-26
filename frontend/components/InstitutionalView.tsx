import React from 'react';
import { 
  Users, BarChart, Activity, ShieldCheck, 
  ArrowLeft, Info, TrendingUp, Globe, Landmark, 
  UserCheck, ChevronUp, ChevronDown, Percent
} from 'lucide-react';

interface InstitutionalViewProps {
  data: any;
  ticker: string;
  onBack: () => void;
}

const InstitutionalView: React.FC<InstitutionalViewProps> = ({ data, ticker, onBack }) => {
  if (!data) return null;

  // DEBUG: Bhai console check karo agar trend nahi dikh raha
  console.log("CHECK_THIS_DATA:", data);

  // 1. Key Flexibility: Check multiple possible keys for trend data
  let trend = data?.historical_trend || data?.trend || [];
  
  // 2. Data Type Safety
  const getSafeVal = (val: any) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // 3. Fallback Logic: Agar trend khali hai, toh current data se 1 bar bana do
  if (trend.length === 0 && data.shareholding) {
     trend = [{
        quarter: "Current",
        fii: getSafeVal(data.shareholding.fii),
        dii: getSafeVal(data.shareholding.dii)
     }];
  }

  const isFiiIncreasing = trend.length >= 2 && 
    getSafeVal(trend[trend.length - 1].fii) > getSafeVal(trend[trend.length - 2].fii);

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      
      {/* 1. REFINED HEADER */}
      <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]"></div>
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" /> EXIT TERMINAL
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">
              {ticker}
            </h1>
            <div className="flex items-center gap-3 mt-2">
               <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                 Sponsorship Verified
               </span>
               <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest italic">Live Exchange Data</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-center md:items-end">
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Sentiment</p>
             <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isFiiIncreasing ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-indigo-400'}`}></div>
                <p className={`text-3xl font-black italic uppercase ${isFiiIncreasing ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {isFiiIncreasing ? 'Accumulating' : 'Neutral'}
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. OWNERSHIP GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Promoters", val: getSafeVal(data?.shareholding?.promoter), color: "bg-slate-950", icon: <UserCheck className="w-5 h-5" /> },
          { label: "FII (Foreign)", val: getSafeVal(data?.shareholding?.fii), color: "bg-indigo-600", icon: <Globe className="w-5 h-5" /> },
          { label: "DII (Domestic)", val: getSafeVal(data?.shareholding?.dii), color: "bg-cyan-500", icon: <Landmark className="w-5 h-5" /> },
          { label: "Public", val: getSafeVal(data?.shareholding?.public), color: "bg-slate-500", icon: <Users className="w-5 h-5" /> }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${item.color} text-white`}>{item.icon}</div>
              <span className="text-[10px] font-black text-slate-300">CORE</span>
            </div>
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-widest mb-1">{item.label}</p>
            <h4 className="text-4xl font-black text-slate-900 italic">{item.val}%</h4>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
               <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. GRAPH TERMINAL */}
      <div className="bg-white p-10 rounded-[4rem] border-2 border-slate-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-16 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><BarChart className="w-7 h-7" /></div>
            <div>
               <h5 className="font-black text-slate-950 text-[14px] uppercase tracking-[0.2em]">Institutional Holding Matrix</h5>
               <p className="text-slate-500 text-[12px] font-bold">Comprehensive FII vs DII Quarterly Pulse</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 bg-slate-50 p-5 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-3"><div className="w-4 h-4 bg-indigo-600 rounded-sm"></div><span className="text-[11px] font-black uppercase text-slate-700">Foreign (FII)</span></div>
             <div className="flex items-center gap-3"><div className="w-4 h-4 bg-cyan-400 rounded-sm"></div><span className="text-[11px] font-black uppercase text-slate-700">Domestic (DII)</span></div>
          </div>
        </div>

        <div className="relative h-[500px] w-full mt-10 flex items-end justify-between px-10">
          {/* Y-AXIS MARKERS */}
          <div className="absolute left-0 h-full flex flex-col justify-between text-[12px] font-black text-slate-300 w-full pointer-events-none">
            {[50, 40, 30, 20, 10, 0].map(val => (
              <div key={val} className="flex items-center w-full">
                <span className="w-10">{val}%</span>
                <div className="flex-1 border-t-2 border-slate-50"></div>
              </div>
            ))}
          </div>

          {/* DYNAMIC BARS */}
          {trend.map((hData: any, i: number) => {
            const fiiVal = getSafeVal(hData.fii);
            const diiVal = getSafeVal(hData.dii);
            const total = (fiiVal + diiVal).toFixed(1);
            const prevTotal = i > 0 ? (getSafeVal(trend[i-1].fii) + getSafeVal(trend[i-1].dii)) : 0;
            const isIncreasing = i > 0 && parseFloat(total) > prevTotal;

            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative max-w-[150px] z-10">
                <div className="mb-6 text-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter block mb-1">Total Stake</span>
                  <div className={`px-4 py-2 rounded-xl text-[14px] font-black shadow-sm ${isIncreasing ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {total}%
                  </div>
                </div>

                <div className="flex items-end gap-3 h-[280px] px-4">
                  <div className="relative flex flex-col items-center group/bar">
                    <span className="absolute -top-8 text-[12px] font-black text-indigo-700 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100">{fiiVal}%</span>
                    <div className="w-7 md:w-10 bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-xl shadow-lg" style={{ height: `${fiiVal * 5.6}px` }}></div>
                  </div>
                  <div className="relative flex flex-col items-center group/bar">
                    <span className="absolute -top-8 text-[12px] font-black text-cyan-600 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100">{diiVal}%</span>
                    <div className="w-7 md:w-10 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-xl shadow-lg" style={{ height: `${diiVal * 5.6}px` }}></div>
                  </div>
                </div>

                <div className="mt-8 text-center w-full pt-5 border-t-2 border-slate-100">
                  <p className="text-[14px] font-black text-slate-900 uppercase italic tracking-tight">{hData.quarter}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {i > 0 ? (
                      isIncreasing ? 
                        <span className="text-emerald-600 flex items-center text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded"><ChevronUp className="w-3.5 h-3.5 mr-1"/> GROWTH</span> : 
                        <span className="text-rose-500 flex items-center text-[10px] font-black bg-rose-50 px-2 py-0.5 rounded"><ChevronDown className="w-3.5 h-3.5 mr-1"/> DILUTION</span>
                    ) : <span className="text-slate-400 text-[10px] font-black uppercase">BASELINE</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SUMMARY VERDICT */}
      <div className="bg-indigo-600 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Percent className="w-64 h-64" /></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[3px] bg-indigo-300"></div>
                <p className="text-indigo-200 font-black text-[12px] uppercase tracking-[0.4em]">Algorithm Verdict</p>
             </div>
             <h3 className="text-5xl font-black italic tracking-tighter mb-4">CANSLIM Verification</h3>
             <p className="text-indigo-100 font-bold leading-relaxed text-xl">
                FII/DII total exposure is <span className="text-white text-4xl">{(getSafeVal(data?.shareholding?.fii) + getSafeVal(data?.shareholding?.dii)).toFixed(2)}%</span>.
                <br/>
                <span className="mt-5 inline-block px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-lg shadow-inner">
                  {isFiiIncreasing 
                    ? "🚀 Accumulation phase detected. Large institutions are building positions which is a bullish indicator for growth stocks." 
                    : "💎 Stable ownership. Large players are holding their positions steady without significant liquidation."}
                </span>
             </p>
          </div>
          <div className="bg-slate-950/40 p-10 rounded-[3rem] border border-white/10 flex flex-col gap-8 min-w-[340px] shadow-2xl backdrop-blur-md">
             <div>
                <p className="text-[11px] font-black text-indigo-300 uppercase mb-3 tracking-[0.2em] text-center">Quarterly Swing</p>
                <div className={`text-4xl font-black text-center italic tracking-tight ${isFiiIncreasing ? 'text-emerald-400' : 'text-slate-300'}`}>
                   {isFiiIncreasing ? '+ TRENDING' : 'NEUTRAL'}
                </div>
             </div>
             <div className="h-px bg-white/10 w-full"></div>
             <div className="flex justify-between items-center px-2">
                <span className="text-[11px] font-black uppercase text-indigo-200 tracking-widest">Sponsorship</span>
                <span className="bg-white/10 px-4 py-1.5 rounded-xl text-sm font-black uppercase border border-white/10">
                  {getSafeVal(data?.shareholding?.fii) > 10 ? 'Elite' : 'Standard'}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalView;