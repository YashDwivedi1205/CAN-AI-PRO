'use client';

import React from 'react';
import { 
  ArrowLeft, Zap, Eye, BrainCircuit, ShieldCheck, 
  BarChart4, SearchCode, Database, RefreshCcw, 
  TrendingUp, Search, MessageSquare, Layers, LineChart, Info, HelpCircle
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-indigo-100">
      <div className="max-w-5xl mx-auto p-6 md:p-16">
        
        {/* Back Button */}
        <a 
          href="/" 
          className="inline-flex items-center text-indigo-600 font-bold hover:gap-3 transition-all mb-10 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </a>

        {/* Hero Header */}
        <header className="mb-20 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">
            The Engine Behind CAN-AI
          </div>
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            Smart Data. <span className="text-indigo-600">Better Decisions.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            We take millions of stock market numbers and turn them into simple "Buy" or "Sell" insights that anyone can understand.
          </p>
        </header>

        {/* Section 1: The Core Ecosystem (4 Main Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Trending Discovery"
            desc="It’s like a radar. It finds stocks where 'Big Money' is entering before the price sky-rockets."
          />
          <FeatureCard 
            icon={<Search className="w-6 h-6" />}
            title="Single Stock Deep-Dive"
            desc="Your personal X-ray for any stock. We check its past, present, and future news in one click."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6" />}
            title="CANSLIM Scoring"
            desc="A world-famous checklist that helps you find the next 'Multibagger' stock."
          />
          <FeatureCard 
            icon={<MessageSquare className="w-6 h-6" />}
            title="AI Financial Chat"
            desc="Don't understand the data? Just ask our AI like you are talking to a friend."
          />
        </div>

        {/* Section 2: Technical Deep Dive - CANSLIM & Audit */}
        <div className="space-y-12 mb-20 animate-in fade-in duration-1000">
          <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <SearchCode className="text-indigo-600 w-10 h-10" /> The Analysis Engine
          </h2>

          {/* 7-Level Audit Section */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-indigo-200 transition-colors">
            <h3 className="text-2xl font-black mb-6 text-indigo-600">1. The 7-Level Stock Audit</h3>
            <p className="mb-8 text-slate-600 font-medium italic">"Think of this as a 7-stage health checkup for a stock."</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <AuditStep level="1" title="Price Trend" detail="We check if the stock is moving up or down over the last 200 days." />
              <AuditStep level="2" title="Earnings Strength" detail="Is the company actually making more profit than last year?" />
              <AuditStep level="3" title="Debt Health" detail="Does the company owe too much money to banks? We want low debt." />
              <AuditStep level="4" title="Relative Strength" detail="Is this stock running faster than the rest of the market?" />
              <AuditStep level="5" title="Volume Confirmation" detail="Are big institutions buying, or is it just small retail traders?" />
              <AuditStep level="6" title="Sentiment Check" detail="What is the internet saying? We read the news so you don't have to." />
              <AuditStep level="7" title="Expert Verdict" detail="We combine all 6 levels to give you one final answer: Buy or Sell." />
            </div>

            {/* Normal English Explanation Added */}
            <div className="mt-12 p-6 bg-indigo-50 rounded-3xl border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5" /> Why does this matter to you?
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Most people lose money because they buy a stock just by looking at the price. Our 7-Level Audit stops you from making that mistake. If a stock fails even 2 of these levels, our AI will warn you. It’s like having a filter that keeps the "trash" stocks away and only shows you the "gold."
              </p>
            </div>
          </div>

          {/* CANSLIM Section */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6 text-indigo-400 uppercase tracking-tight">2. The CANSLIM Formula</h3>
              <p className="text-slate-400 mb-10 max-w-xl">This is the "Secret Sauce" used by the world’s most successful investors.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Current Earnings', 'Annual Growth', 'New Catalyst', 'Supply/Demand', 'Leader/Laggard', 'Institutional', 'Market Direction'].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center hover:bg-white/10 transition-colors">
                    <span className="text-3xl font-black text-indigo-500 block mb-2">{item[0]}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* Normal English Explanation Added */}
              <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <h4 className="font-bold text-indigo-300 mb-2 underline decoration-indigo-500 underline-offset-4">Simple Explanation:</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  CANSLIM is a checklist. Instead of guessing, we check: Is the company growing? (Earnings), Does it have a new product? (New), Are big banks buying it? (Institutional). If a stock ticks all these boxes, it has a very high chance of doubling your money in the long run.
                </p>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <LineChart className="w-80 h-80" />
            </div>
          </div>
        </div>

        {/* Section 3: Data Transparency */}
        <Section 
          icon={<Database className="w-8 h-8 text-white" />}
          title="Where does the data come from?"
        >
          <p className="mb-8">We don't make up numbers. We get them from the same sources professional bankers use.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                  <th className="pb-4 font-black">What we track</th>
                  <th className="pb-4 font-black">Official Source</th>
                  <th className="pb-4 font-black">How we use it</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-slate-700">
                <tr className="border-b border-slate-50">
                  <td className="py-4">Stock Prices</td>
                  <td className="py-4 text-indigo-600">NSE / BSE India</td>
                  <td className="py-4">To show you live gains/losses</td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-4">Company News</td>
                  <td className="py-4 text-indigo-600">Google News</td>
                  <td className="py-4">To find out why the stock is moving</td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-4">Balance Sheets</td>
                  <td className="py-4 text-indigo-600">Financial Reports</td>
                  <td className="py-4">To check if the company is in debt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-slate-500 font-medium bg-slate-100 p-4 rounded-xl">
            <strong>Note:</strong> We collect thousands of points from these sources and our AI "cleans" them so you only see the most important parts.
          </p>
        </Section>

        {/* Section 4: Caching & Performance */}
        <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-10 mb-20 shadow-2xl shadow-indigo-200">
          <div className="flex-1">
            <h3 className="text-3xl font-black mb-4 flex items-center gap-3">
              <RefreshCcw className="w-8 h-8 animate-spin-slow" /> Why is CAN-AI so fast?
            </h3>
            <p className="text-indigo-100 font-medium mb-6">We use "Smart Memory" (Caching) so you don't have to wait for slow market servers.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-indigo-500 pb-2">
                <div>
                  <span className="font-bold block">Quick Info (Price/Metrics)</span>
                  <span className="text-[10px] text-indigo-200 uppercase">Refreshed every 30 mins</span>
                </div>
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">Deep History (Charts)</span>
                  <span className="text-[10px] text-indigo-200 uppercase">Refreshed once a day</span>
                </div>
                <Database className="w-5 h-5 text-indigo-300" />
              </div>
            </div>
            <p className="mt-8 text-xs text-indigo-200 italic">
              "This ensures that even if millions of people use CAN-AI at the same time, the website stays lightning fast."
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-white/10 p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 text-center">
             <BrainCircuit className="w-16 h-16 mb-4 text-indigo-200 mx-auto" />
             <p className="text-sm font-bold uppercase tracking-widest mb-2 text-indigo-100">The Brain</p>
             <p className="text-xs text-indigo-50 font-medium leading-relaxed">Our AI works 24/7 to analyze data while you sleep, so your dashboard is always ready.</p>
          </div>
        </div>

        {/* Section 5: How to Use CAN-AI */}
        <Section 
          icon={<ShieldCheck className="w-8 h-8 text-white" />}
          title="How to use CAN-AI like a Pro"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-8 bg-white rounded-[2rem] border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black mx-auto mb-6 shadow-lg shadow-indigo-100">1</div>
              <h4 className="font-black text-slate-900 mb-3 text-lg">Spot the Trend</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Look at the 'Trending' section. These are stocks that people are suddenly interested in.</p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black mx-auto mb-6 shadow-lg shadow-indigo-100">2</div>
              <h4 className="font-black text-slate-900 mb-3 text-lg">Run the Audit</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Search for the stock and see if it passes our 7-Level health check.</p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black mx-auto mb-6 shadow-lg shadow-indigo-100">3</div>
              <h4 className="font-black text-slate-900 mb-3 text-lg">Ask the AI</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Still confused? Open the Chat and ask "Should I buy this for long term?"</p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-emerald-500 p-4 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black text-emerald-900 mb-1">Safe & Secure</h4>
              <p className="text-sm text-emerald-800 font-medium">CAN-AI is built for education and research. We don't take your money or execute trades. We just give you the smartest data possible.</p>
            </div>
          </div>
        </Section>

      </div>
      
      {/* Footer Branding */}
      <footer className="pb-16 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Powered by CAN-AI Intelligence Ecosystem</p>
      </footer>

      {/* Basic CSS for simple animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Reusable Components
const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group cursor-default">
    <div className="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section className="mb-20">
    <div className="flex items-center mb-8">
      <div className="p-4 bg-indigo-600 rounded-[1.5rem] mr-5 shadow-lg shadow-indigo-100">
        {icon}
      </div>
      <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{title}</h2>
    </div>
    <div className="text-lg text-slate-600 leading-relaxed font-medium">
      {children}
    </div>
  </section>
);

const AuditStep = ({ level, title, detail }: { level: string, title: string, detail: string }) => (
  <div className="flex gap-4 items-start group">
    <div className="text-3xl font-black text-indigo-100 leading-none group-hover:text-indigo-200 transition-colors">0{level}</div>
    <div>
      <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-1">{title}</h4>
      <p className="text-slate-500 text-[13px] leading-snug font-medium">{detail}</p>
    </div>
  </div>
);