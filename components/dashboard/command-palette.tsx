'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/use-store';
import { useRouter } from 'next/navigation';
import {
  Search,
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
  X
} from 'lucide-react';

const searchItems = [
  { name: 'Dashboard Overview', href: '/', icon: LayoutDashboard, category: 'Pages' },
  { name: 'Sales Analytics', href: '/sales', icon: TrendingUp, category: 'Pages' },
  { name: 'Customer Analytics', href: '/customer', icon: Users, category: 'Pages' },
  { name: 'Finance Analytics', href: '/finance', icon: DollarSign, category: 'Pages' },
  { name: 'Forecast Analytics', href: '/forecast', icon: LineChart, category: 'Pages' },
  { name: 'Marketing Campaigns', href: '/marketing', icon: Megaphone, category: 'Pages' },
  { name: 'Inventory & SKU Levels', href: '/inventory', icon: Package, category: 'Pages' },
  { name: 'Reports & Export Management', href: '/reports', icon: FileText, category: 'Pages' },
  { name: 'AI Insights & Chat', href: '/ai-insights', icon: Sparkles, category: 'Pages' },
  { name: 'System Settings', href: '/settings', icon: Settings, category: 'Pages' },
];

export function CommandPalette() {
  const router = useRouter();
  const isOpen = useAppStore((state) => state.isCommandPaletteOpen);
  const setOpen = useAppStore((state) => state.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setQuery(''), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  if (!isOpen) return null;

  const filteredItems = searchItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md transition-opacity" 
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl glass-card rounded-xl shadow-2xl border border-outline-variant/20 overflow-hidden bg-surface-container-low flex flex-col max-h-[450px]">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/10">
          <Search className="w-5 h-5 text-on-surface-variant" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/50"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 max-h-[300px]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-sm text-on-surface-variant">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <div className="px-3 py-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-label-sm">
                Suggestions
              </div>
              {filteredItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.href)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-xs text-on-surface hover:bg-primary/10 hover:text-primary transition-all group font-medium"
                  >
                    <Icon className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-surface-container-high border-t border-outline-variant/10 flex justify-between items-center text-[10px] text-on-surface-variant font-label-sm">
          <div>
            Press <kbd className="bg-surface px-1.5 py-0.5 rounded border border-outline-variant/20 shadow-sm font-mono">ESC</kbd> to close
          </div>
          <div>
            Use mouse or arrow keys to navigate
          </div>
        </div>
      </div>
    </div>
  );
}
