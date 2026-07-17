'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { MetricItem, CustomerDistribution } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Compass,
  UserCheck,
  Zap,
  TrendingUp,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Funnel Icon map
const funnelSteps = [
  { stage: 'Discovery', icon: Compass, conv: '100% Baseline', desc: '4.2m sessions' },
  { stage: 'Onboarding', icon: UserCheck, conv: '68.2% Conv.', desc: '2.8m accounts' },
  { stage: 'Activation', icon: Zap, conv: '42.1% Active', desc: '1.2m active' },
  { stage: 'Expansion', icon: TrendingUp, conv: '18.4% Upgraded', desc: '220k expansion' },
];

export default function CustomerPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [regions, setRegions] = useState<CustomerDistribution[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, r] = await Promise.all([
          DashboardService.getOverviewMetrics(),
          DashboardService.getCustomerDistribution()
        ]);
        setMetrics(m);
        setRegions(r);
      } catch (err) {
        console.error("Failed to load customer analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const chartData = [
    { name: 'Jan', new: 12000, churn: 1200 },
    { name: 'Feb', new: 15000, churn: 1500 },
    { name: 'Mar', new: 18000, churn: 1100 },
    { name: 'Apr', new: 22000, churn: 900 },
    { name: 'May', new: 21000, churn: 1400 },
    { name: 'Jun', new: 25000, churn: 1300 },
    { name: 'Jul', new: 24000, churn: 1000 },
  ];

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Customer Analytics...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">Customer Analytics</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Track customer lifecycle progression, regional user growth, and cohort retention index.
        </p>
      </section>

      {/* KPI Stat Cards Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
        {metrics.map((item, index) => (
          <KPICard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            trend={item.trend}
            badge={item.badge}
            sparklineData={item.sparklineData}
          />
        ))}
      </section>

      {/* Customer Growth & Geographic Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        {/* Growth Trend Area Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-md text-white font-bold">Customer Growth Trend</h3>
              <p className="text-xs text-on-surface-variant mt-1">Acquisitions against churn rates over the last 7 months</p>
            </div>
            <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg border border-outline-variant/10 text-xs">
              <span className="px-3 py-1 bg-primary text-on-primary rounded font-bold">New</span>
              <span className="px-3 py-1 text-on-surface-variant font-medium">Churn</span>
            </div>
          </div>
          
          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="custNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="custChurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d0bcff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d0bcff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="new" stroke="#4cd7f6" strokeWidth={2} fillOpacity={1} fill="url(#custNew)" />
                <Area type="monotone" dataKey="churn" stroke="#d0bcff" strokeWidth={2} fillOpacity={1} fill="url(#custChurn)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region stats & Map hotspot representation */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="font-headline-md text-white mb-6 font-bold">Top Regions</h3>
            <div className="space-y-4">
              {regions.slice(0, 3).map((r, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xl shadow border border-outline-variant/10">
                    {r.emoji}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="font-semibold text-on-surface">{r.country}</span>
                      <span className="font-bold text-primary">{r.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", idx === 1 ? 'bg-secondary' : 'bg-primary')} 
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 relative h-32 rounded-xl overflow-hidden border border-outline-variant/10 group">
            <img 
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" 
              alt="Styles Map" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMp1UQUUqXRQR9sZHhM08pwx6Kqe28huAdIIeIG0sJzi_zjN-7q4isKXlGeKURUY3CCqzkAwKR5hEgpox3Yht0WeyigTUnnydSsGJtQrQYHlzh0aryxzjMaDnx4Lwmvm_H3lRIUT1EOcB1BI1gwtHNr2cIfEgfrXXoQmpgblSIl9S1F4TUfvpLImV542P93qtdWGJcRsF1HYsFk-MDrH93a0UFjsIy9pBNqa66A0D8UWMBeA6AqD2X"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
              <button className="bg-surface/85 hover:bg-surface text-on-surface px-4 py-1.5 rounded-lg text-xs font-semibold border border-outline-variant/20 cursor-pointer flex items-center gap-1">
                <Map className="w-3.5 h-3.5 text-primary" />
                View Map Hotspots
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cohort & Funnel Deep Dive Analysis */}
      <section className="grid grid-cols-1 gap-card-gap">
        {/* Retention Cohort Table */}
        <div className="glass-card p-8 rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-white font-bold">Retention Cohort Analysis</h3>
              <p className="text-xs text-on-surface-variant mt-1">User cohort retention percentages from Month 0 to Month 6</p>
            </div>
            <div className="text-xs text-on-surface-variant flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-[#06b6d4]/90" />
                <span>&gt;90%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-[#8b5cf6]/40" />
                <span>&lt;70%</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold">
                  <th className="py-4 pr-6">Cohort</th>
                  <th className="py-4 px-2 text-center">Users</th>
                  <th className="py-4 px-2 text-center">M0</th>
                  <th className="py-4 px-2 text-center">M1</th>
                  <th className="py-4 px-2 text-center">M2</th>
                  <th className="py-4 px-2 text-center">M3</th>
                  <th className="py-4 px-2 text-center">M4</th>
                  <th className="py-4 px-2 text-center">M5</th>
                  <th className="py-4 px-2 text-center">M6</th>
                </tr>
              </thead>
              <tbody className="font-medium text-white">
                <tr className="border-b border-outline-variant/5">
                  <td className="py-4 font-bold text-sm">Jan 2026</td>
                  <td className="py-4 text-center text-on-surface-variant font-semibold">8,421</td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">100%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">94%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/70 rounded h-10 flex items-center justify-center text-surface font-bold">88%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/70 rounded h-10 flex items-center justify-center text-surface font-bold">86%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/50 rounded h-10 flex items-center justify-center text-white font-bold">82%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/50 rounded h-10 flex items-center justify-center text-white font-bold">79%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/50 rounded h-10 flex items-center justify-center text-white font-bold">78%</div></td>
                </tr>
                <tr className="border-b border-outline-variant/5">
                  <td className="py-4 font-bold text-sm">Feb 2026</td>
                  <td className="py-4 text-center text-on-surface-variant font-semibold">9,150</td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">100%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">91%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/70 rounded h-10 flex items-center justify-center text-surface font-bold">85%</div></td>
                  <td className="p-1"><div className="bg-[#8b5cf6]/40 rounded h-10 flex items-center justify-center text-white font-bold">80%</div></td>
                  <td className="p-1"><div className="bg-[#8b5cf6]/40 rounded h-10 flex items-center justify-center text-white font-bold">77%</div></td>
                  <td className="p-1"><div className="bg-[#8b5cf6]/20 rounded h-10 flex items-center justify-center text-on-surface-variant/80">72%</div></td>
                  <td className="p-1"><div className="bg-[#8b5cf6]/20 rounded h-10 flex items-center justify-center text-on-surface-variant/80">68%</div></td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-sm">Mar 2026</td>
                  <td className="py-4 text-center text-on-surface-variant font-semibold">10,240</td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">100%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">96%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/90 rounded h-10 flex items-center justify-center text-surface font-bold">92%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/70 rounded h-10 flex items-center justify-center text-surface font-bold">89%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/70 rounded h-10 flex items-center justify-center text-surface font-bold">85%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/50 rounded h-10 flex items-center justify-center text-white font-bold">81%</div></td>
                  <td className="p-1"><div className="bg-[#06b6d4]/50 rounded h-10 flex items-center justify-center text-white font-bold">79%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel Map */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="font-headline-md text-white mb-10 font-bold">Lifecycle Activation Funnel</h3>
          <div className="relative">
            {/* Connection Bar */}
            <div className="absolute top-8 left-0 w-full h-1 bg-outline-variant/10 -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {funnelSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center mb-4 glow-cyan ring-2 ring-primary/20 hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-label-md text-sm font-semibold text-white">{step.stage}</h4>
                    <p className="text-label-sm text-xs text-on-surface-variant mt-1">{step.conv}</p>
                    <div className="mt-2 text-primary font-bold text-xs">{step.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
