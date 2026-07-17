'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { DashboardService } from '@/services/api';
import { SaleOrder } from '@/lib/mock-data/data';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Calendar,
  MapPin,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Pie Chart Colors
const COLORS = ['#06b6d4', '#8b5cf6', '#f43f5e', '#a855f7'];

const columnHelper = createColumnHelper<SaleOrder>();

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<SaleOrder[]>([]);
  
  // Filtering states
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getRecentOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load sales data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered orders list based on dropdown & search query
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesRegion = regionFilter === 'All Regions' || order.region === regionFilter;
      const matchesSearch = globalFilter === '' || 
        order.client.toLowerCase().includes(globalFilter.toLowerCase()) ||
        order.id.toLowerCase().includes(globalFilter.toLowerCase()) ||
        order.region.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [orders, regionFilter, globalFilter]);

  // Chart data calculations
  const regionalSalesData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredOrders.forEach(o => {
      counts[o.region] = (counts[o.region] || 0) + o.amount;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredOrders]);

  const salesTrendData = [
    { name: 'Jan', revenue: 2.8, target: 2.5 },
    { name: 'Feb', revenue: 3.1, target: 2.7 },
    { name: 'Mar', revenue: 3.5, target: 3.0 },
    { name: 'Apr', revenue: 4.2, target: 3.2 },
    { name: 'May', revenue: 3.9, target: 3.5 },
    { name: 'Jun', revenue: 4.8, target: 3.8 },
    { name: 'Jul', revenue: 5.2, target: 4.0 },
  ];

  // TanStack Table Columns
  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'Transaction ID',
      cell: info => <span className="font-mono text-xs font-semibold text-on-surface-variant">{info.getValue()}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => <span className="text-xs text-on-surface-variant">{info.getValue()}</span>,
    }),
    columnHelper.accessor('client', {
      header: 'Client Name',
      cell: info => <span className="text-xs font-semibold text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('region', {
      header: 'Region',
      cell: info => <span className="text-xs text-on-surface-variant">{info.getValue()}</span>,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: info => <span className="text-xs font-bold text-primary">${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const val = info.getValue();
        return (
          <span className={cn(
            "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase",
            val === 'Success' 
              ? "bg-emerald-500/10 text-emerald-400"
              : val === 'Pending'
                ? "bg-amber-500/10 text-amber-400"
                : "bg-rose-500/10 text-rose-400"
          )}>
            {val === 'Success' && <CheckCircle2 className="w-3 h-3" />}
            {val === 'Pending' && <Clock className="w-3 h-3" />}
            {val === 'Failed' && <XCircle className="w-3 h-3" />}
            {val}
          </span>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: filteredOrders,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  const handleCSVExport = () => {
    const headers = ['Transaction ID', 'Date', 'Client Name', 'Region', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(o => `"${o.id}","${o.date}","${o.client}","${o.region}",${o.amount},"${o.status}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Sales Analytics...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      
      {/* Header and Title */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-display font-display tracking-tight text-white font-bold">Sales Analytics</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">
            Global revenues, order fulfillment indexes, and region conversion stats.
          </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="p-4 flex flex-wrap items-center gap-4 border border-outline-variant/10 rounded-xl bg-surface-container-low/40 backdrop-blur-md">
        <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-lg border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors text-xs text-on-surface">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-semibold">Last 12 Months</span>
        </div>
        
        {/* Region Filter Dropdown Mock */}
        <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-lg border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors text-xs text-on-surface">
          <MapPin className="w-4 h-4 text-primary" />
          <select 
            value={regionFilter} 
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-transparent outline-none cursor-pointer pr-4 font-semibold text-xs border-none focus:ring-0 p-0 text-on-surface"
          >
            <option value="All Regions" className="bg-surface text-on-surface">All Regions</option>
            <option value="North America" className="bg-surface text-on-surface">North America</option>
            <option value="Europe" className="bg-surface text-on-surface">Europe</option>
            <option value="Asia Pacific" className="bg-surface text-on-surface">Asia Pacific</option>
            <option value="Latin America" className="bg-surface text-on-surface">Latin America</option>
          </select>
        </div>

        <button 
          onClick={() => { setRegionFilter('All Regions'); setGlobalFilter(''); }}
          className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          Clear Filters
        </button>

        <div className="ml-auto relative w-64 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg pl-9 pr-4 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-primary/80"
            placeholder="Search orders..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </section>

      {/* Grid: Trend Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">
        
        {/* Revenue Performance Area */}
        <div className="lg:col-span-8 glass-card p-inner-padding rounded-xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-1">Revenue Performance</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-headline-lg font-bold text-white">$42.8M</span>
                <span className="text-emerald-400 font-bold text-xs flex items-center">
                  +12.4%
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-xs font-label-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span>Forecast</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="revenue" stroke="#4cd7f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="target" stroke="#d0bcff" strokeWidth={2} fill={`none`} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Breakdown Pie Chart */}
        <div className="lg:col-span-4 glass-card p-inner-padding rounded-xl flex flex-col min-h-[400px]">
          <h3 className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-6">Sales by Region</h3>
          
          <div className="flex-grow flex items-center justify-center min-h-[200px]">
            {regionalSalesData.length === 0 ? (
              <span className="text-xs text-on-surface-variant">No sales records in selection</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionalSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {regionalSalesData.map((entry, index) => (
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
                    height={36} 
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-[11px] font-semibold text-on-surface-variant">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      {/* TanStack Data Table for Transactions */}
      <section className="glass-card rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
            <p className="text-xs text-on-surface-variant">Real-time ledger audit log</p>
          </div>
          <button 
            onClick={handleCSVExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant border border-outline-variant/10 text-xs font-semibold text-on-surface cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            CSV Export
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-outline-variant/10 bg-surface-container-low/50">
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-6 py-4 font-bold text-on-surface-variant tracking-wider uppercase cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1 select-none">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && ' 🔼'}
                        {header.column.getIsSorted() === 'desc' && ' 🔽'}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-surface-container-low/30 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-between items-center text-xs text-on-surface-variant">
          <div className="flex items-center gap-4">
            <span className="font-medium">
              Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <span className="text-on-surface-variant/40">|</span>
            <span>Total Records: {filteredOrders.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded bg-surface hover:bg-surface-container-high border border-outline-variant/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded bg-surface hover:bg-surface-container-high border border-outline-variant/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded bg-surface hover:bg-surface-container-high border border-outline-variant/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded bg-surface hover:bg-surface-container-high border border-outline-variant/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
