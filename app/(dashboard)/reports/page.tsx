'use client';

import React, { useState, useEffect } from 'react';
import { DashboardService } from '@/services/api';
import { GeneratedReport } from '@/lib/mock-data/data';
import {
  FileText,
  Download,
  Mail,
  Share2,
  Clock,
  Plus,
  FolderOpen,
  Send
} from 'lucide-react';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<GeneratedReport[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await DashboardService.getGeneratedReports();
        setReports(data);
      } catch (err) {
        console.error("Failed to load reports:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDownload = (title: string, format: string) => {
    // Mock download action
    alert(`Downloading "${title}" as ${format}...`);
  };

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant animate-pulse">Loading Reports Workspace...</div>;
  }

  return (
    <div className="space-y-gutter relative select-none">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">Reports & Documents</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Generate custom metrics dashboards, automate document exports, and inspect historical audit data sheets.
        </p>
      </section>

      {/* Action Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
        {/* New Report Card */}
        <div className="glass-card p-6 rounded-2xl relative group cursor-pointer overflow-hidden border border-outline-variant/15 hover:border-primary/30 transition-all flex flex-col justify-between min-h-[200px]">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Plus className="w-32 h-32 text-primary" />
          </div>
          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-headline-md text-lg text-white mb-2 font-bold">New Report</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Create a bespoke analytical overview from raw data streams.
            </p>
          </div>
          <button className="bg-primary text-on-primary font-bold text-xs px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all self-start mt-4">
            Create Now
          </button>
        </div>

        {/* Schedule Report Card */}
        <div className="glass-card p-6 rounded-2xl relative group cursor-pointer overflow-hidden border border-outline-variant/15 hover:border-secondary/30 transition-all flex flex-col justify-between min-h-[200px]">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Send className="w-32 h-32 text-secondary" />
          </div>
          <div>
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 border border-secondary/20">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-headline-md text-lg text-white mb-2 font-bold">Schedule Report</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Automate your reporting workflow with cron-based triggers.
            </p>
          </div>
          <button className="bg-surface-container-high border border-outline-variant/20 text-secondary font-bold text-xs px-4 py-2 rounded-lg hover:bg-secondary/10 transition-all self-start mt-4">
            Set Schedule
          </button>
        </div>

        {/* Manage Templates Card */}
        <div className="glass-card p-6 rounded-2xl relative group cursor-pointer overflow-hidden border border-outline-variant/15 hover:border-tertiary/30 transition-all flex flex-col justify-between min-h-[200px]">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <FolderOpen className="w-32 h-32 text-tertiary" />
          </div>
          <div>
            <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-4 border border-tertiary/20">
              <FolderOpen className="w-6 h-6 text-tertiary" />
            </div>
            <h3 className="font-headline-md text-lg text-white mb-2 font-bold">Manage Templates</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Standardize your metrics across the entire enterprise organization.
            </p>
          </div>
          <button className="bg-surface-container-high border border-outline-variant/20 text-tertiary font-bold text-xs px-4 py-2 rounded-lg hover:bg-tertiary/10 transition-all self-start mt-4">
            View Library
          </button>
        </div>
      </section>

      {/* Recent Reports Table */}
      <section className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Recent Reports
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Live Ledger
              </span>
            </h3>
          </div>
          <button className="text-primary hover:underline text-xs font-semibold cursor-pointer">
            View All History
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold bg-surface-container-low/30">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4 text-center">Format</th>
                <th className="px-6 py-4 text-center">File Size</th>
                <th className="px-6 py-4 text-center">Generated Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-surface-container-low/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-bold text-white text-xs">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-bold text-[10px] uppercase">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-on-surface-variant font-semibold">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 text-center text-on-surface-variant">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Ready
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDownload(report.title, report.format)}
                        className="p-1.5 hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-white cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-white cursor-pointer"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-white cursor-pointer"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
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
