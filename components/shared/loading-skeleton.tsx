'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded bg-surface-container-highest/50", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-3 min-h-[140px] select-none">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-8 w-32 mt-2" />
      <Skeleton className="h-8 w-full mt-2" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col gap-4 min-h-[350px] w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="flex-1 w-full rounded-lg" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="glass-card rounded-xl overflow-hidden p-6 flex flex-col gap-4 min-h-[400px] w-full">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 mt-2">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full opacity-60" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <ChartSkeleton />
        </div>
      </div>
      <TableSkeleton />
    </div>
  );
}
