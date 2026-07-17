'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  badge?: string;
  sparklineData?: number[];
  icon?: React.ComponentType<{ className?: string }>;
}

export function KPICard({
  title,
  value,
  change,
  trend,
  badge,
  sparklineData,
  icon: Icon
}: KPICardProps) {
  
  // Calculate SVG Points for Sparkline
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;
    
    const width = 120;
    const height = 36;
    const padding = 2;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min === 0 ? 1 : max - min;
    
    const points = sparklineData
      .map((val, i) => {
        const x = (i / (sparklineData.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((val - min) / range) * (height - padding * 2) - padding;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
      
    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`sparklineGrad-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4cd7f6" />
            <stop offset="100%" stopColor="#d0bcff" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={`url(#sparklineGrad-${title.replace(/\s+/g, '')})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden group select-none">
      {/* Glow Highlight Effect */}
      <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <span className="text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">{title}</span>
        
        {badge ? (
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider",
            trend === 'up' ? "bg-primary/10 text-primary" : "bg-secondary-container/20 text-secondary"
          )}>
            {badge}
          </span>
        ) : (
          Icon && <Icon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
        )}
      </div>

      <div className="flex items-baseline justify-between mt-2 z-10">
        <p className="text-headline-md font-headline-md font-bold tracking-tight text-on-surface">
          {value}
        </p>

        <div className={cn(
          "flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md",
          trend === 'up' 
            ? "bg-emerald-500/10 text-emerald-400" 
            : trend === 'down'
              ? "bg-rose-500/10 text-rose-400"
              : "bg-on-surface-variant/10 text-on-surface-variant"
        )}>
          {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
          {trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
          {trend === 'neutral' && <ArrowRight className="w-3.5 h-3.5 mr-0.5" />}
          {change}
        </div>
      </div>

      {sparklineData && (
        <div className="h-12 w-full mt-3 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
          {renderSparkline()}
        </div>
      )}
    </div>
  );
}
