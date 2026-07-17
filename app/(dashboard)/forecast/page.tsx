'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { ForecastPoint } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  ChevronRight,
  Brain,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export default function ForecastPage() {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);
  const [modelType, setModelType] = useState('AI-Optimized');
  const [timeframe, setTimeframe] = useState('FY 2025');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getForecastData();
        setForecastData(data);
      } catch (err) {
        console.error("Failed to load forecast data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Modify forecast data slightly based on selected model
  const adjustedForecastData = React.useMemo(() => {
    return forecastData.map(pt => {
      let factor = 1.0;
      if (modelType === 'Aggressive') factor = 1.15;
      if (modelType === 'Conservative') factor = 0.85;

      return {
        ...pt,
        projected: pt.projected > 0 ? Number((pt.projected * factor).toFixed(2)) : 0,
        lowerBand: pt.lowerBand > 0 ? Number((pt.lowerBand * factor).toFixed(2)) : 0,
        upperBand: pt.upperBand > 0 ? Number((pt.upperBand * factor).toFixed(2)) : 0,
      };
    });
  }, [forecastData, modelType]);

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading AI Projections...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      
      {/* Header and Selectors */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-display font-display tracking-tight text-white font-bold">Predictive Intelligence</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">
            Fiscal Year 2026–2027 AI-Driven Operations & Financial Projections
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Timeframe</span>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-lg py-1.5 pl-3 pr-8 text-xs font-semibold focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="Q1">Q1 (Current)</option>
              <option value="Q2">Q2</option>
              <option value="H1">H1</option>
              <option value="FY 2025">FY 2025</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Model Type</span>
            <select 
              value={modelType} 
              onChange={(e) => setModelType(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-lg py-1.5 pl-3 pr-8 text-xs font-semibold focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="AI-Optimized">AI-Optimized</option>
              <option value="Aggressive">Aggressive (Bull)</option>
              <option value="Conservative">Conservative (Bear)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Confidence</span>
            <div className="flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/20 rounded-lg px-3 py-1.5 text-xs font-semibold">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-white">94% Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
        <KPICard
          title="Projected Revenue"
          value={modelType === 'Aggressive' ? "$55.4M" : modelType === 'Conservative' ? "$41.0M" : "$48.2M"}
          change="+/- 4%"
          trend="neutral"
          badge="ANNUAL RATE"
          sparklineData={[42, 43, 44, 46, 48.2]}
        />
        <KPICard
          title="Forecasted Profit"
          value={modelType === 'Aggressive' ? "$18.8M" : modelType === 'Conservative' ? "$13.9M" : "$16.4M"}
          change="+/- 3.2%"
          trend="neutral"
          badge="NET INCOME"
          sparklineData={[14, 14.5, 15, 15.8, 16.4]}
        />
        <KPICard
          title="Cust. Growth Rate"
          value="+22%"
          change="+/- 2.1%"
          trend="up"
          badge="ACQUISITIONS"
          sparklineData={[18, 19, 20, 21, 22]}
        />
        <KPICard
          title="Market Share Est."
          value="14.2%"
          change="+/- 1.5%"
          trend="up"
          badge="MARKET GROWTH"
          sparklineData={[13.2, 13.5, 13.8, 14.0, 14.2]}
        />
      </section>

      {/* Forecast Line Chart Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        {/* Line Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-white font-bold">Revenue & Profit Forecast</h3>
            <div className="flex gap-4 text-xs text-on-surface-variant font-label-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-primary" />
                <span>Historical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 border-t border-dashed border-primary" />
                <span>AI Forecast</span>
              </div>
            </div>
          </div>

          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={adjustedForecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.06}/>
                    <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
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
                <Area dataKey="upperBand" stroke="none" fill="url(#confidenceBand)" />
                <Area dataKey="lowerBand" stroke="none" fill="none" />
                
                {/* Historical data */}
                <Line type="monotone" dataKey="actual" stroke="#4cd7f6" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                
                {/* Projection */}
                <Line type="monotone" dataKey="projected" stroke="#4cd7f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                
                <ReferenceLine x="Jul" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" label={{ value: 'NOW', fill: '#4cd7f6', fontSize: 10, position: 'top' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand spikes & Alert box */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="font-headline-md text-white mb-6 font-bold">Demand Spikes</h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-on-surface">SaaS Enterprise</span>
                  <span className="text-primary font-bold">+42%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-on-surface">Data Infrastructure</span>
                  <span className="text-secondary font-bold">+28%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-on-surface">Professional Services</span>
                  <span className="text-on-surface-variant font-bold">+12%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-surface-variant" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-label-md text-xs font-bold">Predictive Alert</p>
                <p className="text-on-surface-variant text-[11px] mt-1 leading-relaxed">
                  High demand variance detected in SaaS Enterprise for Q3. Recommend increasing capacity buffers by 12%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segment Projections Bottom Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-card-gap">
        <div className="glass-card rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-white font-bold">YoY Growth by Segment</h3>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
              Details <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-center">
              <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-2">Enterprise</div>
              <div className="text-headline-md text-primary font-bold">+34%</div>
              <div className="text-[10px] text-primary/60 mt-1 font-semibold">YoY Proj.</div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-center">
              <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-2">Mid-Market</div>
              <div className="text-headline-md text-secondary font-bold">+18%</div>
              <div className="text-[10px] text-secondary/60 mt-1 font-semibold">YoY Proj.</div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-center">
              <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-2">SMB</div>
              <div className="text-headline-md text-on-surface-variant font-bold">+9%</div>
              <div className="text-[10px] text-on-surface-variant/40 mt-1 font-semibold">YoY Proj.</div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-8">
          <h3 className="font-headline-md text-white mb-6 font-bold">Model Comparison Index</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold">
                  <th className="pb-3">Model Type</th>
                  <th className="pb-3 text-center">Confidence</th>
                  <th className="pb-3 text-right">Proj. Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <tr>
                  <td className="py-2.5 font-semibold text-white flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-primary" />
                    AI-Optimized (Deep learning)
                  </td>
                  <td className="py-2.5 text-center font-bold text-emerald-400">94.2%</td>
                  <td className="py-2.5 text-right text-primary font-bold">+/- 2.4%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-white flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-secondary" />
                    Aggressive (Bull case)
                  </td>
                  <td className="py-2.5 text-center font-bold text-amber-400">81.5%</td>
                  <td className="py-2.5 text-right text-primary font-bold">+/- 5.8%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-white flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-on-surface-variant" />
                    Conservative (Bear case)
                  </td>
                  <td className="py-2.5 text-center font-bold text-emerald-400">88.9%</td>
                  <td className="py-2.5 text-right text-primary font-bold">+/- 1.8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
