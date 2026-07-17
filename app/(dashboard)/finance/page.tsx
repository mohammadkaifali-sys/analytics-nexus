'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { FinanceExpense } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download } from 'lucide-react';

const COLORS = ['#06b6d4', '#8b5cf6', '#f43f5e', '#a855f7', '#a4a7a9'];

export default function FinancePage() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<FinanceExpense[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getFinanceExpenses();
        setExpenses(data);
      } catch (err) {
        console.error("Failed to load finance data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Cashflow Trend (Monthly Inflow vs Outflow)
  const cashflowData = [
    { month: 'Jan', inflow: 850000, outflow: 620000 },
    { month: 'Feb', inflow: 920000, outflow: 640000 },
    { month: 'Mar', inflow: 1050000, outflow: 610000 },
    { month: 'Apr', inflow: 1120000, outflow: 630000 },
    { month: 'May', inflow: 1080000, outflow: 650000 },
    { month: 'Jun', inflow: 1250000, outflow: 640000 },
    { month: 'Jul', inflow: 1300000, outflow: 645000 },
  ];

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Financials...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">Finance Operations</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Track operating budgets, cash runways, cost centers, and cash flows.
        </p>
      </section>

      {/* KPI Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
        <KPICard
          title="Operating Budget"
          value="$12.50M"
          change="68% Spent"
          trend="neutral"
          badge="Q1-Q2 CAPEX"
          sparklineData={[12.5, 11.8, 10.5, 9.2, 8.5]}
        />
        <KPICard
          title="Gross Burn Rate"
          value="$645.00K"
          change="-4.2% MoM"
          trend="up" // green means burn rate is down
          badge="STABLE RUNWAY"
          sparklineData={[680, 675, 660, 655, 645]}
        />
        <KPICard
          title="EBITDA Margin"
          value="24.8%"
          change="+3.1% YoY"
          trend="up"
          badge="HEALTHY"
          sparklineData={[22, 22.5, 23.8, 24.2, 24.8]}
        />
        <KPICard
          title="Cash Runway"
          value="18 Months"
          change="+2 Mo Gain"
          trend="up"
          badge="SECURE TIER"
          sparklineData={[16, 16, 17, 18, 18]}
        />
      </section>

      {/* Cashflow & Expenses Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        {/* Cashflow Trend Bar Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-md text-white font-bold">Cash Flow Trend</h3>
              <p className="text-xs text-on-surface-variant mt-1">Comparing total monthly capital inflow against burn rate</p>
            </div>
            <div className="flex gap-4 text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-primary rounded-sm" />
                <span>Inflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-secondary rounded-sm" />
                <span>Outflow (Burn)</span>
              </div>
            </div>
          </div>

          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5a6782" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(Number(v)/1000)}k`} />
                <Tooltip 
                  formatter={(value) => value ? `$${Number(value).toLocaleString()}` : ''}
                  contentStyle={{ 
                    backgroundColor: '#191f31', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#dce1fb',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="inflow" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Cost Centers Pie Chart */}
        <div className="glass-card p-8 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="font-headline-md text-white mb-6 font-bold">Cost Center Allocations</h3>
          
          <div className="flex-grow flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenses}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => value ? `$${Number(value).toLocaleString()}` : ''}
                  contentStyle={{ 
                    backgroundColor: '#191f31', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#dce1fb',
                    fontSize: '12px'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={45} 
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-[10px] font-semibold text-on-surface-variant truncate max-w-[120px] inline-block align-middle">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Ledger Accounts Table */}
      <section className="glass-card p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-headline-md text-white font-bold">Accounts Ledger</h3>
            <p className="text-xs text-on-surface-variant mt-1">Audit trials for operating transactions</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant border border-outline-variant/10 text-xs font-semibold text-on-surface cursor-pointer transition-colors">
            <Download className="w-3.5 h-3.5 text-primary" />
            PDF Statement
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold bg-surface-container-low/30">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Account/Beneficiary</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <tr className="hover:bg-surface-container-low/20 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-on-surface-variant">TXN-0992</td>
                <td className="px-6 py-4 text-on-surface-variant">2026-07-16</td>
                <td className="px-6 py-4 font-semibold text-white">Amazon Web Services LLC</td>
                <td className="px-6 py-4 text-on-surface-variant">Infrastructure</td>
                <td className="px-6 py-4 font-bold text-rose-400">-$142,500.00</td>
                <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Settled</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/20 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-on-surface-variant">TXN-0993</td>
                <td className="px-6 py-4 text-on-surface-variant">2026-07-16</td>
                <td className="px-6 py-4 font-semibold text-white">Stripe Inc payouts</td>
                <td className="px-6 py-4 text-on-surface-variant">Operational Inflow</td>
                <td className="px-6 py-4 font-bold text-emerald-400">+$210,000.00</td>
                <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Settled</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/20 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-on-surface-variant">TXN-0994</td>
                <td className="px-6 py-4 text-on-surface-variant">2026-07-15</td>
                <td className="px-6 py-4 font-semibold text-white">Hooli Software Sublicense</td>
                <td className="px-6 py-4 text-on-surface-variant">SaaS Subscription</td>
                <td className="px-6 py-4 font-bold text-rose-400">-$12,400.00</td>
                <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Settled</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/20 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-on-surface-variant">TXN-0995</td>
                <td className="px-6 py-4 text-on-surface-variant">2026-07-14</td>
                <td className="px-6 py-4 font-semibold text-white">Google Cloud Europe</td>
                <td className="px-6 py-4 text-on-surface-variant">Infrastructure</td>
                <td className="px-6 py-4 font-bold text-rose-400">-$98,000.00</td>
                <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
