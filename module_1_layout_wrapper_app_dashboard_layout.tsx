import React from 'react';
import { SideNavBar } from '@/components/layout/side-nav-bar';
import { TopNavBar } from '@/components/layout/top-nav-bar';
import { MobileNav } from '@/components/layout/mobile-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <SideNavBar />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Desktop Top Bar / Mobile Header */}
        <header>
          <TopNavBar />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden">
          <MobileNav />
        </nav>
      </div>
    </div>
  );
}
