import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppState {
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'time'>) => void;
  markAllNotificationsAsRead: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  notifications: [
    {
      id: '1',
      title: 'EMEA Ops Optimization',
      message: '3 new optimization opportunities detected in EMEA region.',
      time: '5m ago',
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: 'Database Synced',
      message: 'Fortune 500 Ops database is successfully synced to production.',
      time: '1h ago',
      read: false,
      type: 'success',
    },
    {
      id: '3',
      title: 'Monthly Budget Limit',
      message: 'Stripe API usage has reached 90% of the allocated testing tier budget.',
      time: '4h ago',
      read: true,
      type: 'warning',
    }
  ],
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Math.random().toString(),
        read: false,
        time: 'Just now',
      },
      ...state.notifications,
    ]
  })),
  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true }))
  })),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
