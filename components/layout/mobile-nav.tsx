'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileText,
  Sparkles
} from 'lucide-react';

const mobileNavItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Sales', href: '/sales', icon: TrendingUp },
  { name: 'Customer', href: '/customer', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'AI Insights', href: '/ai-insights', icon: Sparkles },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low/95 backdrop-blur-lg border-t border-outline-variant/10 flex items-center justify-around px-4 pb-safe z-40 select-none">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1.5 transition-colors gap-0.5",
              isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-label-sm font-medium tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
