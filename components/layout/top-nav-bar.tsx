'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/use-store';
import { cn } from '@/lib/utils';
import {
  Search,
  Terminal,
  Bell,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function TopNavBar() {
  const router = useRouter();
  const setCommandPaletteOpen = useAppStore((state) => state.setCommandPaletteOpen);
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const notifications = useAppStore((state) => state.notifications);
  const markAllAsRead = useAppStore((state) => state.markAllNotificationsAsRead);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-margin-desktop py-4 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm select-none">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-headline-md font-headline-md font-bold text-on-surface hover:opacity-90">
          Nexus <span className="gradient-text">Analytics</span>
        </Link>
        
        {/* Desktop Quick Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md">
            Overview
          </Link>
          <Link href="/sales" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md">
            Sales
          </Link>
          <Link href="/reports" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md">
            Reports
          </Link>
          <Link href="/settings" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md">
            Settings
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input Bar Trigger */}
        <div 
          onClick={() => setCommandPaletteOpen(true)}
          className="relative hidden lg:block cursor-pointer"
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            <Search className="w-[18px] h-[18px]" />
          </div>
          <input
            className="bg-surface-container-low border border-outline-variant/20 rounded-lg pl-10 pr-4 py-2 text-label-md font-label-md pointer-events-none w-64 text-on-surface/80"
            placeholder="Press ⌘K to search"
            type="text"
            readOnly
          />
        </div>

        {/* Command Center Button */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg text-label-md font-label-md hover:bg-surface-variant transition-all flex items-center gap-2 border border-outline-variant/10 cursor-pointer"
        >
          <Terminal className="w-[18px] h-[18px]" />
          Command Center
        </button>

        {/* Export Button */}
        <button 
          onClick={() => router.push('/reports')}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg text-label-md font-label-md font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
        >
          Export
        </button>

        <div className="flex items-center gap-3 ml-4 relative">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 glass-card rounded-xl p-4 shadow-xl z-50 flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
                  <span className="text-label-md font-bold">Notifications</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => markAllAsRead()}
                      className="text-xs text-primary hover:underline font-label-sm"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-on-surface-variant text-center py-4">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={cn(
                          "p-2.5 rounded-lg text-xs flex flex-col gap-1 border border-transparent transition-all",
                          n.read ? "bg-surface-container-low/40 opacity-70" : "bg-primary-container/10 border-primary-container/20"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-on-surface">{n.title}</span>
                          <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer">
            <Sparkles className="w-5 h-5" />
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <div 
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 hover:border-primary/50 transition-colors">
                <img 
                  className="w-full h-full object-cover" 
                  alt="User Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe3E49CI8n4SoWa1r_B2u16-PDLLytFP6fkYGlFZ7tQkuenhYl_XuOLo7kKhg1f9tL6v4L09TEIylSKlndn-cOqfmggWqhH0JIsLywWRZ4E_XMA8QaVRTiFWhNBK-_3_3Eo2O0EjdPOnu5DAg_Yf28uaLi8ZLVnZ6sVDxrvIKOHtFcd1uDVcsZ5HhGfaSv0xNNx0chPOZzEcGmEnIi24cTVhjBYfA9744YGuqdM-7GoVbOGeW5j6zv"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-on-surface-variant hidden md:block" />
            </div>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 glass-card rounded-xl p-2 shadow-xl z-50 flex flex-col gap-0.5">
                <div className="px-3 py-2 border-b border-outline-variant/10 mb-1">
                  <p className="text-xs font-bold text-on-surface">Kaif</p>
                  <p className="text-[10px] text-on-surface-variant truncate">kaif@fortune500ops.com</p>
                </div>
                <Link 
                  href="/settings" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-surface-container-high transition-colors"
                >
                  <User className="w-4 h-4 text-on-surface-variant" />
                  Profile
                </Link>
                <Link 
                  href="/settings" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-surface-container-high transition-colors"
                >
                  <Settings className="w-4 h-4 text-on-surface-variant" />
                  Settings
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-error-container/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  Log Out
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
