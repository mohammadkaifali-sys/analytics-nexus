'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { MarketingFunnelStep } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const COLORS = ['#06b6d4', '#8b5cf6', '#a855f7', '#f43f5e', '#a4a7a9'];

export default function MarketingPage() {
  const [loading, setLoading] = useState(true);
  const [funnelData, setFunnelData] = useState<MarketingFunnelStep[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getMarketingFunnel();
        setFunnelData(data);
      } catch (err) {
        console.error("Failed to load marketing funnel data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Marketing Analytics...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">Marketing Analytics</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Track acquisition spend, ROAS performance multipliers, and customer funnel conversions.
        </p>
      </section>

      {/* KPI Cards Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
        <KPICard
          title="Ad Spend"
          value="$110.00K"
          change="+15.3% MoM"
          trend="down" // burn is up
          badge="MONTHLY SPEND"
          sparklineData={[90, 95, 100, 105, 110]}
        />
        <KPICard
          title="ROAS Multiplier"
          value="3.84x"
          change="+8.4% MoM"
          trend="up"
          badge="EXCELLENT ROI"
          sparklineData={[3.2, 3.4, 3.5, 3.7, 3.84]}
        />
        <KPICard
          title="CPA Average"
          value="$42.50"
          change="-6.1% MoM"
          trend="up" // lower CPA is good
          badge="EFFICIENT"
          sparklineData={[48, 46, 45, 43, 42.5]}
        />
        <KPICard
          title="CTR Average"
          value="2.84%"
          change="+1.2% MoM"
          trend="up"
          badge="ENGAGEMENT"
          sparklineData={[2.5, 2.6, 2.7, 2.8, 2.84]}
        />
      </section>

      {/* Funnel Conversions & Campaigns */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        {/* Funnel chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="font-headline-md text-white font-bold mb-6">User Acquisition Conversion Funnel</h3>
          
          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                <XAxis type="number" stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="stage" type="category" stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value) => value ? `${Number(value).toLocaleString()} users` : ''}
                  contentStyle={{ 
                    backgroundColor: '#191f31', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#dce1fb',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="users" fill="#06b6d4" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Lists */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="font-headline-md text-white mb-6 font-bold">Top Campaigns</h3>
            <div className="space-y-4">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white">Google Search Ads</h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">High Intent Keywords</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary block">4.2x ROAS</span>
                  <span className="text-[10px] text-on-surface-variant">Spend: $45K</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white">LinkedIn Executive Retargeting</h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Enterprise Accounts</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-secondary block">3.6x ROAS</span>
                  <span className="text-[10px] text-on-surface-variant">Spend: $35K</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white">Newsletter Placements</h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Tech Audiences</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400 block">5.1x ROAS</span>
                  <span className="text-[10px] text-on-surface-variant">Spend: $15K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-on-surface-variant font-medium pt-4 border-t border-outline-variant/10">
            <span>Overall Blended Conversion</span>
            <span className="font-bold text-white">1.84%</span>
          </div>
        </div>
      </section>
    </div>
  );
}
