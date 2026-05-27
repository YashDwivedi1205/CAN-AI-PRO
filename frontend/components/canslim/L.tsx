// 'use client';

// import React, { useState } from 'react';
// import { 
//   Crown, TrendingUp, Trophy, Layers, Calculator, Zap, 
//   Activity, ShieldCheck, Search, X, ChevronRight, Globe, Landmark,
//   ArrowLeft, CheckCircle2, Star
// } from 'lucide-react';

// interface LProps {
//   onAuditAction: (ticker: string) => void;
//   stocksList: any[];
// }

// export default function L({ onAuditAction, stocksList = [] }: LProps) {
//   const [activeSubTab, setActiveSubTab] = useState('LEADERSHIP RULES');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedStock, setSelectedStock] = useState<string | null>(null);
//   const [categorySearch, setCategorySearch] = useState('');

//   const subTabs = ['LEADERSHIP RULES', 'RS INDICATORS'];

//   const categories = [
//     { name: "Banking", icon: <Landmark />, stocks: ["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"] },
//     { name: "IT Services", icon: <Globe />, stocks: ["TCS", "INFY", "HCLTECH", "WIPRO", "LTIM"] },
//     { name: "Automobile", icon: <Activity />, stocks: ["MARUTI", "TATAMOTORS", "M&M", "EICHERMOT", "BAJAJ-AUTO"] },
//     { name: "Energy", icon: <Zap />, stocks: ["RELIANCE", "NTPC", "ONGC", "POWERGRID", "BPCL"] },
//     { name: "Pharma", icon: <ShieldCheck />, stocks: ["SUNPHARMA", "DRREDDY", "CIPLA", "APOLLOHOSP", "DIVISLAB"] },
//     { name: "FMCG", icon: <Trophy />, stocks: ["HINDUNILVR", "ITC", "NESTLEIND", "BRITANNIA", "TATACONSUM"] },
//     { name: "Metals", icon: <Layers />, stocks: ["TATASTEEL", "JINDALSTEL", "HINDALCO", "JSWSTEEL", "COALINDIA"] },
//     { name: "Chemicals", icon: <Activity />, stocks: ["PIDILITIND", "SRF", "LINDEINDIA", "SOLARINDS", "GUJGASLTD"] },
//     { name: "Consumer Durables", icon: <Activity />, stocks: ["TITAN", "HAVELLS", "VOLTAS", "DIXON", "CROMPTON"] },
//     { name: "Infrastructure", icon: <Landmark />, stocks: ["LT", "ADANIPORTS", "GRASIM", "ULTRACEMCO", "BEL"] },
//   ];

//   const getFilteredResults = () => {
//     const searchLower = categorySearch.toLowerCase().trim();
//     if (!searchLower) return [];
//     let results: { ticker: string }[] = [];
//     const matchedCategory = categories.find(cat => cat.name.toLowerCase().includes(searchLower));
//     if (matchedCategory) {
//       results = matchedCategory.stocks.map(s => ({ ticker: s }));
//     } else {
//       const tickerResults: string[] = [];
//       categories.forEach(cat => {
//         cat.stocks.forEach(s => {
//           if (s.toLowerCase().includes(searchLower)) tickerResults.push(s);
//         });
//       });
//       results = Array.from(new Set(tickerResults)).map(s => ({ ticker: s }));
//     }
//     return results;
//   };

//   const filteredStocks = getFilteredResults();
//   const closeModal = () => {
//     setSelectedCategory(null);
//     setSelectedStock(null);
//   };

//   return (
//     <div className="space-y-10 animate-in fade-in duration-700">
//       {/* SUB-NAV */}
//       <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-[2rem] w-fit border border-slate-200/50">
//         {subTabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveSubTab(tab)}
//             className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black tracking-[0.15em] transition-all ${
//               activeSubTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeSubTab === 'LEADERSHIP RULES' && (
//         <div className="space-y-12 animate-in fade-in duration-500">
//           <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
//             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <div className="flex items-center space-x-3 mb-6">
//                   <span className="bg-white/10 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest text-white border border-white/10">Market Dominance</span>
//                 </div>
//                 <h3 className="text-5xl font-black mb-6 italic uppercase tracking-tighter leading-none">Leader or <span className="text-amber-400">Laggard?</span></h3>
//                 <p className="text-indigo-100/80 text-lg leading-relaxed font-medium">Don't buy sympathy plays. Buy the #1 stock that is leading the charge. Leaders show the greatest price strength during market corrections.</p>
//               </div>
//               <div className="flex justify-center"><Crown className="w-32 h-32 text-amber-400 animate-pulse" /></div>
//             </div>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
//           </section>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
//               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
//                 <TrendingUp className="w-8 h-8 text-indigo-600 group-hover:text-white" />
//               </div>
//               <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Relative Strength (RS)</h4>
//               <p className="text-slate-500 text-sm leading-relaxed mb-6">RS Rating of 80+ is priority. Stock must outperform 80% of the market.</p>
//               <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
//                 <p className="text-3xl font-black text-indigo-600 italic">80 - 99 Range</p>
//               </div>
//             </div>
//             <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-emerald-200 transition-all">
//               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
//                 <Trophy className="w-8 h-8 text-emerald-600 group-hover:text-white" />
//               </div>
//               <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Industry Top 3</h4>
//               <p className="text-slate-500 text-sm leading-relaxed mb-6">True leaders have the best margins and most innovative products.</p>
//               <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
//                 <p className="text-3xl font-black text-emerald-600 italic">Sector Top Tier</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm overflow-hidden">
//             <div className="flex items-center space-x-3 mb-10">
//               <div className="bg-indigo-50 p-2 rounded-lg"><Calculator className="w-5 h-5 text-indigo-600" /></div>
//               <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Mathematical Growth Formula (RS)</h4>
//             </div>
//             <div className="bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100 mb-10 flex flex-col items-center justify-center relative">
//               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Market Outperformance Metric</span>
//               <div className="flex items-center space-x-4 mt-4">
//                 <span className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">RS Rating =</span>
//                 <div className="flex flex-col items-center">
//                   <div className="px-4 py-2 text-indigo-600 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Stock)</div>
//                   <div className="h-[3px] w-full bg-slate-800 rounded-full my-1"></div>
//                   <div className="px-4 py-2 text-slate-500 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Nifty 50)</div>
//                 </div>
//                 <span className="text-2xl font-black text-slate-800 italic">× 100</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeSubTab === 'RS INDICATORS' && (
//         <div className="space-y-12 animate-in slide-in-from-right-5 duration-500">
//           <div className="relative">
//             <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-4">Select Industry</h5>
//             <div className="flex overflow-x-auto space-x-4 pb-6 scrollbar-hide px-2">
//               {categories.map((cat, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedCategory(cat.name)}
//                   className="flex-shrink-0 bg-white border-2 border-slate-200 p-6 rounded-[2rem] hover:bg-indigo-600 hover:border-indigo-600 transition-all group w-48 text-center shadow-sm"
//                 >
//                   <div className="w-12 h-12 bg-indigo-50 group-hover:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:text-white transition-colors">
//                     {cat.icon}
//                   </div>
//                   <p className="font-black text-[11px] text-slate-800 group-hover:text-white uppercase tracking-widest">{cat.name}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
//              <div className="relative z-10">
//                 <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6 flex items-center">
//                   <Search className="w-4 h-4 mr-2 text-indigo-600" /> Smart Stock Filter
//                 </h4>
//                 <div className="relative max-w-2xl">
//                    <input 
//                     type="text" 
//                     placeholder="Search Ticker or Category..."
//                     className="w-full bg-slate-50 border-2 border-slate-200 py-6 px-8 rounded-[2rem] focus:border-indigo-600 outline-none transition-all font-black text-slate-700 text-lg uppercase"
//                     value={categorySearch}
//                     onChange={(e) => setCategorySearch(e.target.value)}
//                    />
//                 </div>
//                 {categorySearch && (
//                   <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-top-4">
//                     {filteredStocks.map((stock, i) => (
//                       <div key={i} className="flex items-center justify-between bg-white border-2 border-slate-100 p-6 rounded-3xl hover:border-indigo-600 group cursor-pointer transition-all"
//                            onClick={() => setSelectedStock(stock.ticker)}>
//                         <div>
//                           <span className="font-black text-slate-800 group-hover:text-indigo-600 block uppercase">{stock.ticker}</span>
//                           <span className="text-[10px] font-bold text-slate-400">Sector Component</span>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       )}

//       {/* --- UNIFIED MODAL --- */}
//       {(selectedCategory || selectedStock) && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-indigo-950/40">
//           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative border-2 border-slate-200 overflow-hidden">
            
//             <button 
//               onClick={closeModal} 
//               className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-[110] transition-all group"
//             >
//               <X className="w-6 h-6 text-slate-500 group-hover:text-slate-800" />
//             </button>

//             {selectedStock ? (
//               <div className="p-12 animate-in fade-in zoom-in-95 duration-300">
//                 {selectedCategory && (
//                   <button onClick={() => setSelectedStock(null)} className="flex items-center text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
//                     <ArrowLeft className="w-4 h-4 mr-2" /> Back to {selectedCategory}
//                   </button>
//                 )}

//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">{selectedStock}</h3>
//                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Market Leadership Analysis</p>
//                   </div>
//                   <div className="bg-amber-400 p-3 rounded-2xl text-white shadow-lg rotate-3 mr-14"><Star className="w-6 h-6 fill-current" /></div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
//                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">RS Rating</p>
//                     <p className="text-3xl font-black text-indigo-600">92 <span className="text-sm font-bold text-slate-400">/ 99</span></p>
//                   </div>
//                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
//                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sector Rank</p>
//                     <p className="text-3xl font-black text-emerald-600">#02 <span className="text-sm font-bold text-slate-400">Tier 1</span></p>
//                   </div>
//                 </div>

//                 <div className="space-y-3 pb-4">
//                   <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center">
//                     <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-600" /> Why it's a Leader?
//                   </h4>
//                   {[
//                     "Outperforming 92% of all stocks in the last 12 months.",
//                     "Price is holding strong above 50-Day Moving Average.",
//                     "Consistent ROE of 18%+ showing management efficiency.",
//                     "Minimal correction during recent Nifty volatility."
//                   ].map((point, idx) => (
//                     <div key={idx} className="flex items-center p-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-medium text-slate-600">
//                       <div className="w-2 h-2 bg-indigo-500 rounded-full mr-4 flex-shrink-0" />
//                       {point}
//                     </div>
//                   ))}
//                 </div>
//                 {/* BUTTON REMOVED FROM HERE AS PER REQUEST */}
//               </div>
//             ) : (
//               <div className="p-12 animate-in fade-in duration-300">
//                 <div className="flex items-center space-x-4 mb-10">
//                   <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg"><Trophy className="w-6 h-6" /></div>
//                   <h3 className="text-3xl font-black text-slate-800 uppercase italic leading-none">{selectedCategory} Leaders</h3>
//                 </div>
//                 <div className="space-y-4">
//                   {categories.find(c => c.name === selectedCategory)?.stocks.map((stock, idx) => (
//                     <div key={idx} className="group flex items-center justify-between p-6 rounded-[2rem] border-2 border-slate-200 hover:bg-indigo-50 hover:border-indigo-600 transition-all cursor-pointer shadow-sm"
//                          onClick={() => setSelectedStock(stock)}>
//                       <div className="flex items-center space-x-6">
//                         <span className="text-2xl font-black text-indigo-600 bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-2xl border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
//                           #{idx + 1}
//                         </span>
//                         <p className="font-black text-slate-900 text-xl tracking-tight uppercase">{stock}</p>
//                       </div>
//                       <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   Crown, TrendingUp, Trophy, Layers, Calculator, Zap, 
//   Activity, ShieldCheck, Search, X, ChevronRight, Globe, Landmark,
//   ArrowLeft, CheckCircle2, Star, Loader2
// } from 'lucide-react';

// interface LProps {
//   onAuditAction: (ticker: string) => void;
//   stocksList?: any[];
// }

// export default function L({ onAuditAction, stocksList = [] }: LProps) {
//   const [activeSubTab, setActiveSubTab] = useState('LEADERSHIP RULES');
//   const [selectedCategory, setSelectedCategory] = useState<any>(null);
//   const [selectedStock, setSelectedStock] = useState<any>(null);
//   const [categorySearch, setCategorySearch] = useState('');
  
//   // Dynamic States
//   const [allCategories, setAllCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   // --- STATIC FALLBACK DATA (Aapka original data) ---
//   const defaultCategories = [
//     { name: "Banking", icon: <Landmark />, stocks: ["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"] },
//     { name: "IT Services", icon: <Globe />, stocks: ["TCS", "INFY", "HCLTECH", "WIPRO", "LTIM"] },
//     { name: "Automobile", icon: <Activity />, stocks: ["MARUTI", "TATAMOTORS", "M&M", "EICHERMOT", "BAJAJ-AUTO"] },
//     { name: "Energy", icon: <Zap />, stocks: ["RELIANCE", "NTPC", "ONGC", "POWERGRID", "BPCL"] },
//     { name: "Pharma", icon: <ShieldCheck />, stocks: ["SUNPHARMA", "DRREDDY", "CIPLA", "APOLLOHOSP", "DIVISLAB"] },
//     { name: "FMCG", icon: <Trophy />, stocks: ["HINDUNILVR", "ITC", "NESTLEIND", "BRITANNIA", "TATACONSUM"] },
//     { name: "Metals", icon: <Layers />, stocks: ["TATASTEEL", "JINDALSTEL", "HINDALCO", "JSWSTEEL", "COALINDIA"] },
//     { name: "Chemicals", icon: <Activity />, stocks: ["PIDILITIND", "SRF", "LINDEINDIA", "SOLARINDS", "GUJGASLTD"] },
//     { name: "Infrastructure", icon: <Landmark />, stocks: ["LT", "ADANIPORTS", "GRASIM", "ULTRACEMCO", "BEL"] },
//   ];

//   // 1. Load Data with Error Handling
//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sector-leaders`);
//         if (!res.ok) throw new Error('Network response was not ok');
//         const data = await res.json();
//         if (data.success) {
//             setAllCategories(data.categories);
//         } else {
//             setAllCategories(defaultCategories);
//         }
//       } catch (err) {
//         console.warn("Backend not reached, using default data.");
//         setAllCategories(defaultCategories); // Fallback to your original list
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLeaders();
//   }, []);

//   const closeModal = () => {
//     setSelectedCategory(null);
//     setSelectedStock(null);
//   };

//   const currentCategories = allCategories.length > 0 ? allCategories : defaultCategories;

//   return (
//     <div className="space-y-10 animate-in fade-in duration-700">
      
//       {/* SUB-NAV */}
//       <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-[2rem] w-fit border border-slate-200/50">
//         {['LEADERSHIP RULES', 'RS INDICATORS'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveSubTab(tab)}
//             className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black tracking-[0.15em] transition-all ${
//               activeSubTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeSubTab === 'LEADERSHIP RULES' && (
//         <div className="space-y-12 animate-in fade-in duration-500">
//           {/* HEADER SECTION RESTORED */}
//           <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
//             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <div className="flex items-center space-x-3 mb-6">
//                   <span className="bg-white/10 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest text-white border border-white/10">Market Dominance</span>
//                 </div>
//                 <h3 className="text-5xl font-black mb-6 italic uppercase tracking-tighter leading-none">Leader or <span className="text-amber-400">Laggard?</span></h3>
//                 <p className="text-indigo-100/80 text-lg leading-relaxed font-medium">Don't buy sympathy plays. Buy the #1 stock that is leading the charge. Leaders show the greatest price strength during market corrections.</p>
//               </div>
//               <div className="flex justify-center"><Crown className="w-32 h-32 text-amber-400 animate-pulse" /></div>
//             </div>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
//           </section>

//           {/* RULES GRID RESTORED */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
//               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
//                 <TrendingUp className="w-8 h-8 text-indigo-600 group-hover:text-white" />
//               </div>
//               <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Relative Strength (RS)</h4>
//               <p className="text-slate-500 text-sm leading-relaxed mb-6">RS Rating of 80+ is priority. Stock must outperform 80% of the market.</p>
//               <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
//                 <p className="text-3xl font-black text-indigo-600 italic">80 - 99 Range</p>
//               </div>
//             </div>
//             <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-emerald-200 transition-all">
//               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
//                 <Trophy className="w-8 h-8 text-emerald-600 group-hover:text-white" />
//               </div>
//               <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Industry Top 3</h4>
//               <p className="text-slate-500 text-sm leading-relaxed mb-6">True leaders have the best margins and most innovative products.</p>
//               <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
//                 <p className="text-3xl font-black text-emerald-600 italic">Sector Top Tier</p>
//               </div>
//             </div>
//           </div>

//           {/* MATH FORMULA RESTORED */}
//           <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm overflow-hidden">
//             <div className="flex items-center space-x-3 mb-10">
//               <div className="bg-indigo-50 p-2 rounded-lg"><Calculator className="w-5 h-5 text-indigo-600" /></div>
//               <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Mathematical Growth Formula (RS)</h4>
//             </div>
//             <div className="bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center relative">
//               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Market Outperformance Metric</span>
//               <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 text-center">
//                 <span className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">RS Rating =</span>
//                 <div className="flex flex-col items-center">
//                   <div className="px-4 py-2 text-indigo-600 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Stock)</div>
//                   <div className="h-[3px] w-full bg-slate-800 rounded-full my-1"></div>
//                   <div className="px-4 py-2 text-slate-500 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Nifty 50)</div>
//                 </div>
//                 <span className="text-2xl font-black text-slate-800 italic">× 100</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeSubTab === 'RS INDICATORS' && (
//         <div className="space-y-12 animate-in slide-in-from-right-5 duration-500">
//           {/* CATEGORY GRID RESTORED & DYNAMIC */}
//           <div className="relative">
//             <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-4">
//                 {error ? "Sector Leaders (Offline Mode)" : "Live Industry Leaders"}
//             </h5>
//             <div className="flex overflow-x-auto space-x-4 pb-6 scrollbar-hide px-2">
//               {currentCategories.map((cat, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedCategory(cat)}
//                   className="flex-shrink-0 bg-white border-2 border-slate-200 p-6 rounded-[2rem] hover:bg-indigo-600 hover:border-indigo-600 transition-all group w-48 text-center shadow-sm"
//                 >
//                   <div className="w-12 h-12 bg-indigo-50 group-hover:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:text-white transition-colors">
//                     {cat.icon || <Zap />}
//                   </div>
//                   <p className="font-black text-[11px] text-slate-800 group-hover:text-white uppercase tracking-widest">{cat.name}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SEARCH BOX RESTORED */}
//           <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
//               <div className="relative z-10">
//                 <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6 flex items-center">
//                   <Search className="w-4 h-4 mr-2 text-indigo-600" /> Smart Stock Filter
//                 </h4>
//                 <div className="relative max-w-2xl">
//                    <input 
//                     type="text" 
//                     placeholder="Search Ticker or Category..."
//                     className="w-full bg-slate-50 border-2 border-slate-200 py-6 px-8 rounded-[2rem] focus:border-indigo-600 outline-none transition-all font-black text-slate-700 text-lg uppercase"
//                     value={categorySearch}
//                     onChange={(e) => setCategorySearch(e.target.value)}
//                    />
//                 </div>
//               </div>
//           </div>
//         </div>
//       )}

//       {/* --- UNIFIED MODAL (Aapke original UI ke saath) --- */}
//       {(selectedCategory || selectedStock) && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-indigo-950/40">
//           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative border-2 border-slate-200 overflow-hidden">
            
//             <button onClick={closeModal} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-[110]">
//               <X className="w-6 h-6 text-slate-500" />
//             </button>

//             {selectedStock ? (
//               <div className="p-12 animate-in fade-in zoom-in-95 duration-300">
//                 <button onClick={() => setSelectedStock(null)} className="flex items-center text-indigo-600 font-black text-[10px] uppercase mb-6">
//                   <ArrowLeft className="w-4 h-4 mr-2" /> Back to {selectedCategory?.name}
//                 </button>
//                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-8">{selectedStock}</h3>
                
//                 {/* Real-time details would go here, currently using your UI structure */}
//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
//                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">RS Rating</p>
//                     <p className="text-3xl font-black text-indigo-600">92 <span className="text-sm font-bold text-slate-400">/ 99</span></p>
//                   </div>
//                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
//                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sector Rank</p>
//                     <p className="text-3xl font-black text-emerald-600">#02 <span className="text-sm font-bold text-slate-400">Tier 1</span></p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-12">
//                 <h3 className="text-3xl font-black text-slate-800 uppercase italic mb-8">{selectedCategory?.name} Leaders</h3>
//                 <div className="space-y-4">
//                   {selectedCategory?.stocks.map((stock: any, idx: number) => (
//                     <div key={idx} className="group flex items-center justify-between p-6 rounded-[2rem] border-2 border-slate-200 hover:bg-indigo-50 hover:border-indigo-600 transition-all cursor-pointer shadow-sm"
//                          onClick={() => setSelectedStock(typeof stock === 'string' ? stock : stock.ticker)}>
//                       <div className="flex items-center space-x-6">
//                         <span className="text-2xl font-black text-indigo-600">#{idx + 1}</span>
//                         <p className="font-black text-slate-900 text-xl uppercase">{typeof stock === 'string' ? stock : stock.ticker}</p>
//                       </div>
//                       <ChevronRight className="w-5 h-5 text-slate-300" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















'use client';

import React, { useState, useEffect } from 'react';
import { 
  Crown, TrendingUp, Trophy, Layers, Calculator, Zap, 
  Activity, ShieldCheck, Search, X, ChevronRight, Globe, Landmark,
  ArrowLeft, CheckCircle2, Star, Loader2, AlertCircle
} from 'lucide-react';

interface LProps {
  onAuditAction: (ticker: string) => void;
  stocksList?: any[];
}

export default function L({ onAuditAction, stocksList = [] }: LProps) {
  const [activeSubTab, setActiveSubTab] = useState('LEADERSHIP RULES');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [categorySearch, setCategorySearch] = useState('');
  
  // Real-time states
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(false);
  const [stockDetail, setStockDetail] = useState<any>(null);

  const defaultCategories = [
    { name: "Banking", icon: <Landmark />, stocks: ["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"] },
    { name: "IT Services", icon: <Globe />, stocks: ["TCS", "INFY", "HCLTECH", "WIPRO", "LTIM"] },
    { name: "Automobile", icon: <Activity />, stocks: ["MARUTI", "TATAMOTORS", "M&M", "EICHERMOT", "BAJAJ-AUTO"] },
    { name: "Energy", icon: <Zap />, stocks: ["RELIANCE", "NTPC", "ONGC", "POWERGRID", "BPCL"] },
    { name: "Pharma", icon: <ShieldCheck />, stocks: ["SUNPHARMA", "DRREDDY", "CIPLA", "APOLLOHOSP", "DIVISLAB"] },
    { name: "FMCG", icon: <Trophy />, stocks: ["HINDUNILVR", "ITC", "NESTLEIND", "BRITANNIA", "TATACONSUM"] },
    { name: "Metals", icon: <Layers />, stocks: ["TATASTEEL", "JINDALSTEL", "HINDALCO", "JSWSTEEL", "COALINDIA"] },
    { name: "Chemicals", icon: <Activity />, stocks: ["PIDILITIND", "SRF", "LINDEINDIA", "SOLARINDS", "GUJGASLTD"] },
    { name: "Infrastructure", icon: <Landmark />, stocks: ["LT", "ADANIPORTS", "GRASIM", "ULTRACEMCO", "BEL"] },
  ];

  // 1. Fetch Categories/Leaders
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        setError(false);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://can-ai-pro.onrender.com";
        const res = await fetch(`${API_URL}/api/sector-leaders`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
            setAllCategories(data.categories);
        } else {
            setAllCategories(defaultCategories);
        }
      } catch (err) {
        setAllCategories(defaultCategories);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  // 2. Fetch Individual Stock Real-time Details
  const handleStockClick = async (ticker: string) => {
    setSelectedStock(ticker);
    setLoadingDetail(true);
    setStockDetail(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      // Trim any trailing slashes to avoid // in URL
      const cleanBase = baseUrl.replace(/\/$/, '');
      const finalUrl = `${cleanBase}/api/stock-detail/${ticker}`;
      
      console.log("Fetching from:", finalUrl);

      const res = await fetch(finalUrl, {
        method: 'GET',
        mode: 'cors', // Explicitly ask for CORS
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': '69420', // Ngrok specific bypass
          'bypass-tunnel-reminder': 'true'       // Localtunnel specific bypass
        }
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      if (data.success && data.details) {
        setStockDetail(data.details);
      } else {
        console.warn("Backend returned success:false", data);
      }
    } catch (err: any) {
      console.error("🔴 Connection Failed:", err.message);
      // User ko real error dikhao taaki hardcoded data na lage
      setStockDetail({
        ticker: ticker,
        rsRating: "ERR",
        rank: "OFFLINE",
        highlights: [
          "Connection to Colab failed.",
          `Error: ${err.message}`,
          "Please check if Ngrok URL is updated in .env"
        ]
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedStock(null);
    setStockDetail(null);
  };

  const currentCategories = allCategories.length > 0 ? allCategories : defaultCategories;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* SUB-NAV */}
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-[2rem] w-fit border border-slate-200/50">
        {['LEADERSHIP RULES', 'RS INDICATORS'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black tracking-[0.15em] transition-all ${
              activeSubTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSubTab === 'LEADERSHIP RULES' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="bg-white/10 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest text-white border border-white/10">Market Dominance</span>
                </div>
                <h3 className="text-5xl font-black mb-6 italic uppercase tracking-tighter leading-none">Leader or <span className="text-amber-400">Laggard?</span></h3>
                <p className="text-indigo-100/80 text-lg leading-relaxed font-medium">Don't buy sympathy plays. Buy the #1 stock that is leading the charge. Leaders show the greatest price strength during market corrections.</p>
              </div>
              <div className="flex justify-center"><Crown className="w-32 h-32 text-amber-400 animate-pulse" /></div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <TrendingUp className="w-8 h-8 text-indigo-600 group-hover:text-white" />
              </div>
              <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Relative Strength (RS)</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">RS Rating of 80+ is priority. Stock must outperform 80% of the market.</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-3xl font-black text-indigo-600 italic">80 - 99 Range</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm group hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Trophy className="w-8 h-8 text-emerald-600 group-hover:text-white" />
              </div>
              <h4 className="font-black text-slate-800 text-xl mb-4 uppercase">Industry Top 3</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">True leaders have the best margins and most innovative products.</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-3xl font-black text-emerald-600 italic">Sector Top Tier</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center space-x-3 mb-10">
              <div className="bg-indigo-50 p-2 rounded-lg"><Calculator className="w-5 h-5 text-indigo-600" /></div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Mathematical Growth Formula (RS)</h4>
            </div>
            <div className="bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center relative">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Market Outperformance Metric</span>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 text-center">
                <span className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">RS Rating =</span>
                <div className="flex flex-col items-center">
                  <div className="px-4 py-2 text-indigo-600 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Stock)</div>
                  <div className="h-[3px] w-full bg-slate-800 rounded-full my-1"></div>
                  <div className="px-4 py-2 text-slate-500 font-black text-sm lg:text-base uppercase tracking-tight">Price Performance (Nifty 50)</div>
                </div>
                <span className="text-2xl font-black text-slate-800 italic">× 100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'RS INDICATORS' && (
        <div className="space-y-12 animate-in slide-in-from-right-5 duration-500">
          <div className="relative">
            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-4">
                {error ? "Sector Leaders (Offline Mode)" : "Live Industry Leaders"}
            </h5>
            <div className="flex overflow-x-auto space-x-4 pb-6 scrollbar-hide px-2">
              {currentCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className="flex-shrink-0 bg-white border-2 border-slate-200 p-6 rounded-[2rem] hover:bg-indigo-600 hover:border-indigo-600 transition-all group w-48 text-center shadow-sm"
                >
                  <div className="w-12 h-12 bg-indigo-50 group-hover:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:text-white transition-colors">
                    {cat.icon || <Zap />}
                  </div>
                  <p className="font-black text-[11px] text-slate-800 group-hover:text-white uppercase tracking-widest">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6 flex items-center">
                  <Search className="w-4 h-4 mr-2 text-indigo-600" /> Smart Stock Filter
                </h4>
                <div className="relative max-w-2xl">
                   <input 
                    type="text" 
                    placeholder="Search Ticker..."
                    className="w-full bg-slate-50 border-2 border-slate-200 py-6 px-8 rounded-[2rem] focus:border-indigo-600 outline-none transition-all font-black text-slate-700 text-lg uppercase"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                   />
                </div>
              </div>
          </div>
        </div>
      )}

      {/* --- UNIFIED MODAL (Real-time Integrated) --- */}
      {(selectedCategory || selectedStock) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-indigo-950/40">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative border-2 border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <button onClick={closeModal} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-[110]">
              <X className="w-6 h-6 text-slate-500" />
            </button>

            {selectedStock ? (
              <div className="p-12 animate-in fade-in zoom-in-95 duration-300">
                <button onClick={() => { setSelectedStock(null); setStockDetail(null); }} className="flex items-center text-indigo-600 font-black text-[10px] uppercase mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to {selectedCategory?.name}
                </button>
                
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase mb-8">{selectedStock}</h3>
                
                {loadingDetail ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fetching Live Metrics...</p>
                  </div>
                ) : (
                  <div className="space-y-10 animate-in fade-in duration-500">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">RS Rating</p>
                        <p className="text-4xl font-black text-indigo-600">
                          {stockDetail?.rsRating || "92"} <span className="text-sm font-bold text-slate-400">/ 99</span>
                        </p>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sector Rank</p>
                        <p className="text-4xl font-black text-emerald-600">
                          #{stockDetail?.rank || "02"} <span className="text-sm font-bold text-slate-400">Tier 1</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Market Action Highlights</h4>
                      {(stockDetail?.highlights || [
                        "Dominating Price Action vs Nifty 50",
                        "Strong Institutional Accumulation",
                        "Leading Sector Outperformance"
                      ]).map((point: string, idx: number) => (
                        <div key={idx} className="flex items-start bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-4 mt-0.5 shrink-0" />
                          <p className="font-bold text-slate-700 italic text-sm">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12">
                <h3 className="text-3xl font-black text-slate-800 uppercase italic mb-8">{selectedCategory?.name} Leaders</h3>
                <div className="space-y-3">
                  {selectedCategory?.stocks.map((stock: any, idx: number) => {
                    const ticker = typeof stock === 'string' ? stock : stock.ticker;
                    return (
                      <div key={idx} 
                        onClick={() => handleStockClick(ticker)}
                        className="group flex items-center justify-between p-6 rounded-[2rem] border-2 border-slate-100 hover:bg-indigo-600 hover:border-indigo-600 transition-all cursor-pointer shadow-sm">
                        <div className="flex items-center space-x-6">
                          <span className="text-2xl font-black text-indigo-600 group-hover:text-white/50">#{idx + 1}</span>
                          <p className="font-black text-slate-900 text-xl uppercase group-hover:text-white">{ticker}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}