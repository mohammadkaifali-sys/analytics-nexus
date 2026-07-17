'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
  LineChart,
  Megaphone,
  Package,
  FileText,
  Sparkles,
  Settings,
  HelpCircle,
  Headphones,
  Database
} from 'lucide-react';

const navigationItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Sales Analytics', href: '/sales', icon: TrendingUp },
  { name: 'Customer Analytics', href: '/customer', icon: Users },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Forecasting', href: '/forecast', icon: LineChart },
  { name: 'Marketing', href: '/marketing', icon: Megaphone },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'AI Insights', href: '/ai-insights', icon: Sparkles },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function SideNavBar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-6 gap-6 justify-between select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center shadow-lg shadow-primary/10">
            <Database className="w-5 h-5 text-surface font-bold" />
          </div>
          <div>
            <p className="text-label-sm font-label-sm font-bold uppercase tracking-widest text-on-surface-variant">Fortune 500 Ops</p>
            <p className="text-body-md font-body-md text-on-surface/60 text-xs">Enterprise Tier</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1 mt-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg text-label-md font-label-md border-r-2",
                  isActive
                    ? "bg-secondary-container/15 text-primary border-primary translate-x-1 font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-transparent"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-on-surface-variant")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Support Area */}
      <div className="flex flex-col gap-4 mt-auto">
        <Link
          href="/ai-insights"
          className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-xl flex items-center justify-between group hover:bg-primary/20 transition-all text-label-md font-label-md"
        >
          <span>AI Insights</span>
          <Sparkles className="w-4 h-4 animate-pulse text-primary" />
        </Link>
        
        <div className="flex flex-col gap-1 border-t border-outline-variant/10 pt-4">
          <Link
            href="/help"
            className="text-on-surface-variant hover:text-on-surface flex items-center gap-3 px-4 py-2 transition-all text-label-md font-label-md"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </Link>
          <Link
            href="/support"
            className="text-on-surface-variant hover:text-on-surface flex items-center gap-3 px-4 py-2 transition-all text-label-md font-label-md"
          >
            <Headphones className="w-4 h-4" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
