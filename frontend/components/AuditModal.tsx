import React from 'react';
import { X, ShieldCheck, Target, Zap, Activity, Info, CheckCircle2, AlertCircle, HelpCircle, TrendingUp } from 'lucide-react';

interface StockData {
  ticker: string;
  price: number;
  roe: number;
  growth: number;
  volume_surge: number;
  dist_pct: number | string;
  high_52: number;
}

interface AuditModalProps {
  stock: StockData | null;
  isOpen: boolean;
  onClose: () => void;
}

const AuditModal: React.FC<AuditModalProps> = ({ stock, isOpen, onClose }) => {
  if (!isOpen || !stock) return null;

  // Analysis Logic for 'S' Level
  const getSLevelStatus = () => {
    const surge = stock.volume_surge;
    const dist = typeof stock.dist_pct === 'string' ? parseFloat(stock.dist_pct) : stock.dist_pct;

    // A+ Level: Sirf tab jab Volume 5x+ ho AUR stock 52W High ke ekdum paas (0-5%) ho
    if (surge >= 5 && Math.abs(dist) <= 5) {
        return { 
            status: 'PASS', 
            grade: 'A+',
            stage: 'Institutional Climax',
            color: 'text-emerald-400', 
            bg: 'bg-emerald-500/10', 
            border: 'border-emerald-500/20', 
            desc: 'Extreme Institutional Cornering.',
            verdict: 'The stock is in a rare high-demand zone. Supply is virtually non-existent at current levels.'
        };
    }
    
    // B Level: Healthy volume (2x to 5x) aur price thoda door (5-15%)
    if (surge >= 2) {
        return { 
            status: 'MODERATE', 
            grade: 'B',
            stage: 'Constructive Setup',
            color: 'text-indigo-400', 
            bg: 'bg-indigo-500/10', 
            border: 'border-indigo-500/20', 
            desc: 'Absorption in Progress.',
            verdict: 'Accumulation is evident but the stock needs to clear immediate overhead supply to trigger a breakout.'
        };
    }

    // C Level: Low volume ya High supply (52W high se bohot door)
    return { 
        status: 'FAIL', 
        grade: 'C',
        stage: 'High Supply Risk',
        color: 'text-red-400', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/20', 
        desc: 'Significant Overhead Resistance.',
        verdict: 'Heavy supply is capping the price action. Buying interest is currently too weak to sustain a move.'
    };
  };

  const audit = getSLevelStatus();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
      <div className="bg-[#05070a] border border-white/10 w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_0_80px_-15px_rgba(79,70,229,0.4)]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="bg-indigo-500/10 p-4 rounded-2xl ring-1 ring-indigo-500/30">
              <Zap className="text-indigo-400" size={32} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">{stock.ticker}</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">Live Audit Mode</p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-red-500/10 rounded-3xl transition-all border border-white/5 group">
            <X size={24} className="group-hover:text-red-400 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[700px]">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 p-8 bg-black/40 border-r border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Info size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Baseline Stats</span>
            </div>
            <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase mb-1">ROE</p>
              <p className="text-3xl font-black text-white">{stock.roe}%</p>
            </div>
            <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase mb-1">EPS Growth</p>
              <p className="text-3xl font-black text-white">{stock.growth}%</p>
            </div>
            <div className="p-8 bg-indigo-600 rounded-[2.5rem] relative overflow-hidden">
               <p className="text-2xl font-black text-white italic tracking-tighter relative z-10">{stock.volume_surge}x</p>
               <p className="text-[10px] text-white/70 font-bold mt-2 uppercase tracking-widest relative z-10">Relative Vol</p>
               <TrendingUp className="absolute -right-4 -bottom-4 text-white/10" size={100} />
            </div>
          </div>

          {/* Right Panel: Analysis Dashboard */}
          <div className="flex-1 p-10 overflow-y-auto bg-[#05070a] space-y-8">
            
            {/* 1. LEVEL S MAIN CARD (BACK AS REQUESTED) */}
            <div className={`p-10 rounded-[3.5rem] border ${audit.border} ${audit.bg} relative overflow-hidden group`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="text-white" size={24} />
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Level S: Supply & Demand</h3>
                  </div>
                  <div className={`px-6 py-2 rounded-2xl font-black text-sm tracking-widest ${audit.color} border ${audit.border} bg-black/40 uppercase`}>
                    {audit.status}
                  </div>
                </div>
                <p className="text-white/70 text-lg leading-relaxed font-medium italic max-w-2xl">
                  Analysis indicates <span className="text-white font-bold">{stock.ticker}</span> is experiencing <span className="text-white underline decoration-indigo-500 underline-offset-4">{audit.desc}</span> 
                  Absorption rate is {stock.volume_surge}x vs 50D average.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                {audit.status === 'PASS' ? <CheckCircle2 size={120} /> : audit.status === 'FAIL' ? <AlertCircle size={120} /> : <HelpCircle size={120} />}
              </div>
            </div>

            {/* 2. DETAIL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                <ShieldCheck className="text-indigo-400 mb-4" size={24} />
                <h4 className="text-lg font-bold text-white uppercase italic tracking-tight mb-2">Institutional Entry</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Large block orders are being executed, indicating strong hands are replacing weak retail supply.</p>
              </div>
              <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                <Target className="text-purple-400 mb-4" size={24} />
                <h4 className="text-lg font-bold text-white uppercase italic tracking-tight mb-2">Supply Scarcity</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Stock is {stock.dist_pct}% from highs. Minimal resistance expected as the overhead supply has been absorbed.</p>
              </div>
            </div>

            {/* 3. FINAL VERDICT SECTION (NEW BOTTOM UI) */}
            <div className={`p-10 rounded-[3rem] border ${audit.border} bg-gradient-to-br from-white/[0.03] to-transparent`}>
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-8 bg-indigo-500 rounded-full"></div>
                      <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Final S-Phase Analysis</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic">Phase: <span className={audit.color}>{audit.stage}</span></h3>
                    <p className="text-slate-400 text-base italic border-l-2 border-white/10 pl-6 max-w-lg">"{audit.verdict}"</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-[2.5rem] border border-white/10 min-w-[160px]">
                    <span className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-widest">S-Grade</span>
                    <span className={`text-7xl font-black italic ${audit.color} tracking-tighter`}>{audit.grade}</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditModal;