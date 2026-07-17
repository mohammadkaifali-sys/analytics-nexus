'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { MetricItem, EMEAOpportunity, CustomerDistribution } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import { DashboardSkeleton } from '@/components/shared/loading-skeleton';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [opportunities, setOpportunities] = useState<EMEAOpportunity[]>([]);
  const [regions, setRegions] = useState<CustomerDistribution[]>([]);
  const [healthScore, setHealthScore] = useState(94);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, o, r] = await Promise.all([
          DashboardService.getOverviewMetrics(),
          DashboardService.getEMEAOpportunities(),
          DashboardService.getCustomerDistribution()
        ]);
        setMetrics(m);
        setOpportunities(o);
        setRegions(r);
      } catch (err) {
        console.error("Failed to load overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApplyOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(op => op.id === id ? { ...op, status: 'applied' } : op)
    );
    // Increase health score slightly on apply
    setHealthScore(prev => Math.min(prev + 2, 100));
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  // Mock chart data for AreaChart
  const chartData = [
    { name: 'Jan', new: 12000, churn: 2000 },
    { name: 'Feb', new: 11000, churn: 2500 },
    { name: 'Mar', new: 14000, churn: 1500 },
    { name: 'Apr', new: 17000, churn: 1000 },
    { name: 'May', new: 15000, churn: 2200 },
    { name: 'Jun', new: 19000, churn: 1800 },
    { name: 'Jul', new: 16000, churn: 1200 },
  ];

  return (
    <div className="space-y-gutter relative select-none">
      {/* Hero Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-display font-display tracking-tight text-white font-bold">Good Morning, Kaif</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Your business intelligence is stable. We&apos;ve detected {opportunities.filter(o => o.status === 'active').length} new optimization opportunities in your EMEA operations.
          </p>
        </div>
        
        {/* Health Score Circular Loader Card */}
        <div className="glass-card p-inner-padding rounded-2xl flex items-center gap-6 min-w-[300px] border border-outline-variant/10">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                fill="none" 
                stroke="url(#healthGrad)" 
                strokeWidth="6"
                strokeDasharray="264" 
                strokeDashoffset={264 - (264 * healthScore) / 100}
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4cd7f6" />
                  <stop offset="100%" stopColor="#d0bcff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold font-display text-white">{healthScore}%</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Health Index</h4>
            <p className="text-sm font-semibold text-white mt-1">EMEA Operations</p>
            <p className="text-xs text-emerald-400 font-semibold mt-0.5 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              SLA Compliant
            </p>
          </div>
        </div>
      </section>

      {/* Grid Row 1: KPI Stats */}
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

      {/* Grid Row 2: Charts & Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        {/* Growth Trend Area Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-md text-white font-bold">Customer Growth Trend</h3>
              <p className="text-xs text-on-surface-variant mt-1">Comparing new acquisitions against churn logs</p>
            </div>
            <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg border border-outline-variant/10 text-xs">
              <span className="px-3 py-1 bg-primary text-on-primary rounded font-bold">Acquisitions</span>
              <span className="px-3 py-1 text-on-surface-variant font-medium">Churn</span>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="new" stroke="#4cd7f6" strokeWidth={2} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="churn" stroke="#d0bcff" strokeWidth={2} fillOpacity={1} fill="url(#colorChurn)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Regions Progress List */}
        <div className="glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="font-headline-md text-white mb-6 font-bold">Top Regions</h3>
          <div className="flex-grow space-y-6">
            {regions.map((region, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xl shadow-md border border-outline-variant/10">
                  {region.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-label-md text-xs font-semibold text-on-surface">{region.country}</span>
                    <span className="font-label-md text-xs font-bold text-primary">{region.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary-container rounded-full" 
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Row 3: Optimization Opportunities */}
      <section className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-headline-md text-white font-bold">EMEA Optimization Center</h3>
            <p className="text-xs text-on-surface-variant">AI-generated proposals to optimize systems throughput</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map((op) => (
            <div 
              key={op.id}
              className={cn(
                "p-6 rounded-xl border flex flex-col justify-between min-h-[220px] transition-all",
                op.status === 'applied'
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-surface-container-low/40 border-outline-variant/15 hover:border-primary/20"
              )}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold text-on-surface-variant bg-surface px-2 py-0.5 rounded border border-outline-variant/10">
                    {op.id}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                    op.complexity === 'Low' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                  )}>
                    {op.complexity} complexity
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{op.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{op.description}</p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/10">
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold tracking-wider">Est. Impact</span>
                  <span className="text-sm font-bold text-primary">{op.impact}</span>
                </div>
                {op.status === 'applied' ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Applied
                  </span>
                ) : (
                  <button 
                    onClick={() => handleApplyOpportunity(op.id)}
                    className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary text-xs font-bold px-4 py-2 rounded-lg hover:text-on-primary transition-all cursor-pointer flex items-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
