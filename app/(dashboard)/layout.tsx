'use client';

import React, { useEffect } from 'react';
import { SideNavBar } from '@/components/layout/side-nav-bar';
import { TopNavBar } from '@/components/layout/top-nav-bar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { useAppStore } from '@/store/use-store';
import dynamic from 'next/dynamic';
const CommandPalette = dynamic(() => import('@/components/dashboard/command-palette').then(mod => mod.CommandPalette), { ssr: false });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    // Synchronize global theme class on HTML element
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-outline-variant/10 bg-surface-container-low/50 backdrop-blur-lg">
        <SideNavBar />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Desktop Top Bar / Mobile Header */}
        <header className="z-30">
          <TopNavBar />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 bg-background relative">
          {/* Background Mesh Gradient */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden z-30">
          <MobileNav />
        </nav>
      </div>

      {/* Global Command Center Palette */}
      <CommandPalette />
    </div>
  );
}
