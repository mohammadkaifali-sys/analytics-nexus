'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught widget error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-center flex flex-col items-center justify-center min-h-[150px]">
          <AlertTriangle className="w-8 h-8 text-rose-400 mb-2 animate-bounce" />
          <h4 className="font-bold text-white text-xs">Widget Error</h4>
          <p className="text-[10px] text-on-surface-variant mt-1">Failed to render this analytical section.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
