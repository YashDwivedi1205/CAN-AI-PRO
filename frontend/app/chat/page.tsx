'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Search, CheckCircle, Bot, User, Globe, TrendingUp, Sparkles } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
    sources?: { uri: string; title: string }[];
}
const callGeminiAPI = async (currentQuery: string): Promise<ChatMessage> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuery })
    });

    const data = await response.json();

    return {
        role: "model" as const,
        parts: [{ text: data.reply || "No response mila." }]
    };
};

export default function ChatPage() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isLoading]);

    useEffect(() => {
        setChatHistory([{
            role: 'model',
            parts: [{ text: "Namaste! FinAI Terminal is now in **Ultra-Stable** mode. Poochiye market ka haal." }]
        }]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const q = input.trim();
        setIsLoading(true);
        setInput('');
        
        // Add user message to UI
        setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: q }] }]);
        
        // Call API
        const res = await callGeminiAPI(q);
        
        setChatHistory(prev => [...prev, res]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-screen bg-[#F1F5F9] text-slate-900 font-sans">
            <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg"><TrendingUp size={20} /></div>
                    <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">FINAI <span className="text-indigo-600">v3</span></h1>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 font-bold text-[10px] text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> ULTRA STABLE MODE
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:px-20">
                <div className="max-w-3xl mx-auto space-y-6 py-4">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                            <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white text-indigo-600 border-slate-200'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'}`}>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                                            {msg.sources.slice(0, 3).map((s, idx) => (
                                                <a key={idx} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] font-bold bg-slate-50 text-indigo-600 px-2 py-1 rounded border border-slate-200 hover:bg-indigo-50 transition-all">{s.title}</a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-widest uppercase px-12">
                            <Loader2 size={14} className="animate-spin" /> Live Analysis...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Nifty 50 analysis? Gold rates?"
                        className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-inner"
                        disabled={isLoading}
                    />
                    <button disabled={isLoading} className="bg-indigo-600 text-white px-5 py-4 rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 shadow-lg transition-all active:scale-95">
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}