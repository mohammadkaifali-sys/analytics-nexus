'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { SKUStockItem } from '@/lib/mock-data/data';
import { KPICard } from '@/components/shared/kpi-card';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<SKUStockItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getInventorySKUs();
        setItems(data);
      } catch (err) {
        console.error("Failed to load inventory data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleReorder = (sku: string) => {
    setItems(prev =>
      prev.map(item => item.sku === sku ? { ...item, status: 'In Stock', stock: item.stock + 100 } : item)
    );
  };

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Inventory...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">Inventory & Assets</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Monitor enterprise assets, hardware infrastructure levels, and SKU turnover logs.
        </p>
      </section>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
        <KPICard
          title="Asset Count"
          value="450 SKUs"
          change="3 Categories"
          trend="neutral"
          badge="HARDWARE/LICENSES"
          sparklineData={[420, 430, 440, 445, 450]}
        />
        <KPICard
          title="Stock Value"
          value="$1.48M"
          change="+4.8% YoY"
          trend="up"
          badge="VALUATION"
          sparklineData={[1.35, 1.38, 1.4, 1.45, 1.48]}
        />
        <KPICard
          title="Out of Stock"
          value="1 Asset"
          change="-50% decrease"
          trend="up" // decrease is good
          badge="CRITICAL ACTION"
          sparklineData={[4, 3, 3, 2, 1]}
        />
        <KPICard
          title="Turnover Multiplier"
          value="4.2x / Yr"
          change="8.5x High SKU"
          trend="neutral"
          badge="EFFICIENCY"
          sparklineData={[3.8, 3.9, 4.0, 4.1, 4.2]}
        />
      </section>

      {/* SKU Ledger Table */}
      <section className="glass-card p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-headline-md text-white font-bold">SKU Stock Ledger</h3>
              <p className="text-xs text-on-surface-variant">Real-time status of hardware units and licenses</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold bg-surface-container-low/30">
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Asset Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">In Stock</th>
                <th className="px-6 py-4 text-center">Safety Buffer</th>
                <th className="px-6 py-4 text-center">Turnover Rate</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {items.map((item) => (
                <tr key={item.sku} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-on-surface-variant">{item.sku}</td>
                  <td className="px-6 py-4 font-semibold text-white">{item.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{item.category}</td>
                  <td className="px-6 py-4 text-center font-bold text-white">{item.stock}</td>
                  <td className="px-6 py-4 text-center text-on-surface-variant">{item.minStock}</td>
                  <td className="px-6 py-4 text-center text-primary font-bold">{item.turnover}x</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase",
                      item.status === 'In Stock'
                        ? "bg-emerald-500/10 text-emerald-400"
                        : item.status === 'Low Stock'
                          ? "bg-amber-500/10 text-amber-400 animate-pulse"
                          : "bg-rose-500/10 text-rose-400"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status !== 'In Stock' ? (
                      <button
                        onClick={() => handleReorder(item.sku)}
                        className="bg-primary text-on-primary hover:opacity-90 font-bold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                      >
                        Reorder Batch
                      </button>
                    ) : (
                      <span className="text-on-surface-variant text-[11px] font-semibold">Buffered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
