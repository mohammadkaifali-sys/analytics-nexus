'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquareCode,
  LineChart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function AIInsightsPage() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Hello, Kaif! I am Nexus AI. I have analyzed your Q3 EMEA pipelines and identified 3 key supply chain cost-saving opportunities. What would you like to explore?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chartData = [
    { name: 'May', historical: 2.8, predicted: 0 },
    { name: 'Jun', historical: 3.2, predicted: 0 },
    { name: 'Jul', historical: 3.5, predicted: 0 },
    { name: 'Aug', historical: 3.9, predicted: 0 },
    { name: 'Sep', historical: 4.1, predicted: 0 },
    { name: 'Oct', historical: 0, predicted: 4.5 },
    { name: 'Nov', historical: 0, predicted: 4.9 },
    { name: 'Dec', historical: 0, predicted: 5.4 },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      if (userMsg.toLowerCase().includes('emea') || userMsg.toLowerCase().includes('inventory')) {
        aiText = 'EMEA inventories are currently 12% above buffer thresholds. I recommend routing shipments to London edge dispatch center to lower Suez canal delays by 14 days.';
      } else if (userMsg.toLowerCase().includes('revenue') || userMsg.toLowerCase().includes('sales')) {
        aiText = 'Sales pipeline projections show strong tailwinds. North America is leading growth metrics at +34%, and our modeling indicates a 94.2% probability of achieving annual target.';
      } else {
        aiText = 'I have queried the operations database. EMEA operations are stable, and SLA compliance remains at 99.99%. We detected no system anomalies.';
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="space-y-gutter relative select-none">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          AI Insights Hub
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Automated anomalies detection, strategic executive summaries, and natural language analytical query panel.
        </p>
      </section>

      {/* 1. AI Executive Summary Section */}
      <section className="glass-card p-6 rounded-2xl relative overflow-hidden border-primary/20">
        <div className="absolute inset-0 bg-primary/2 opacity-60 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/30 flex-shrink-0">
            <Zap className="w-7 h-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Nexus Intelligence Summary</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-headline-md font-display font-bold text-white leading-tight">
              Revenue is pacing 12% ahead of target, but inventory risks in EMEA require immediate attention.
            </h2>
            <p className="text-xs text-on-surface-variant mt-2 max-w-4xl leading-relaxed">
              Our predictive models indicate an 88% probability of achieving Q3 targets. However, logistics disruptions in the Suez canal are impacting furniture lead times by 14 days. I recommend shifting 20% of EMEA supply chain volume to air freight for high-margin items.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Proactive Insight Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-card-gap">
        
        {/* Revenue Surge */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">+18%</span>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Revenue Surge</h3>
            <p className="text-headline-md font-bold text-white mt-1">$4.2M <span className="text-xs text-on-surface-variant font-medium">this week</span></p>
          </div>
          <div className="h-10 w-full mt-2 bg-white/5 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/40 h-full w-[80%] rounded-r" />
          </div>
        </div>

        {/* Profit Warning */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4 border-error/20">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-error/10 text-error">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-error bg-error/10 px-2.5 py-0.5 rounded-full">High Risk</span>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Profit Warning</h3>
            <p className="text-headline-md font-bold text-white mt-1">-6.4% <span className="text-xs text-on-surface-variant font-medium">Furniture Cat.</span></p>
          </div>
          <p className="text-[10px] text-error/80 italic font-semibold">Declining profit margins due to rising material costs.</p>
        </div>

        {/* Performance Lead */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Top Performer</span>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Performance Lead</h3>
            <p className="text-headline-md font-bold text-white mt-1">West Region <span className="text-xs text-on-surface-variant font-medium">92% Index</span></p>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
            <div className="bg-primary h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Anomaly Detected */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4 border-secondary/20">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">Detected</span>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Anomaly Detected</h3>
            <p className="text-headline-md font-bold text-white mt-1">Sector 7 <span className="text-xs text-on-surface-variant font-medium">+42% Costs</span></p>
          </div>
          <p className="text-[10px] text-secondary/85 italic font-semibold">Unexpected spike in operational costs in Sector 7.</p>
        </div>
      </section>

      {/* 3. Bento Layout Split: AI Chart vs LLM Assistant */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        
        {/* Forecast Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-md text-white font-bold">Future Sales Projection</h3>
              <p className="text-xs text-on-surface-variant mt-1">Historical results transitioning into ML predictive values</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span>Historical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>AI Predicted</span>
              </div>
            </div>
          </div>

          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#191f31', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#dce1fb',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="historical" fill="rgba(255,255,255,0.15)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="predicted" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Natural Language Panel */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between min-h-[400px]">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/10">
            <MessageSquareCode className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="font-headline-md text-white font-bold text-sm">Ask Nexus Assistant</h3>
          </div>

          {/* Chat log */}
          <div className="flex-grow my-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 max-h-[220px] pr-1">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "p-3 rounded-xl text-xs max-w-[85%] leading-relaxed flex flex-col gap-0.5",
                  msg.sender === 'user'
                    ? "bg-primary text-on-primary ml-auto font-semibold"
                    : "bg-surface-container-high text-on-surface mr-auto border border-outline-variant/10"
                )}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-surface-container-high text-on-surface mr-auto border border-outline-variant/10 p-3 rounded-xl text-xs max-w-[85%] animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              className="flex-grow bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-primary/80"
              placeholder="Ask about EMEA logs or sales..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="p-2.5 rounded-xl bg-primary text-on-primary hover:opacity-90 transition-all flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 4. Strategic Recommendations list */}
      <section className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-headline-md text-white font-bold">Strategic AI Recommendations</h3>
          </div>
          <span className="text-xs text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline-variant/10">
            Updated 12 mins ago
          </span>
        </div>

        <div className="divide-y divide-outline-variant/10">
          
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-low/10 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs group-hover:text-primary transition-colors">
                  Optimize logistics route for APAC region
                </h4>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed max-w-2xl">
                  Consolidate shipping lanes between Singapore and Tokyo to reduce overhead by 12%. Potential cost savings estimated at <span className="text-primary font-bold">$2.4M</span> annually.
                </p>
              </div>
            </div>
            <button className="bg-primary text-on-primary font-bold text-xs px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all self-start md:self-center cursor-pointer flex items-center gap-1">
              Execute Action
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-low/10 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <LineChart className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs group-hover:text-secondary transition-colors">
                  Rebalance Inventory buffers: Smart Edge Devices
                </h4>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed max-w-2xl">
                  Inventory levels for &apos;Nexus Hub V2&apos; are 30% above forecast. Pivot promotional marketing budget from &apos;Legacy Pro&apos; to clear surplus stock in Q4.
                </p>
              </div>
            </div>
            <button className="bg-surface-container-high border border-outline-variant/20 text-on-surface font-semibold text-xs px-4 py-2 rounded-lg hover:bg-surface-variant transition-all self-start md:self-center cursor-pointer">
              Review Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
