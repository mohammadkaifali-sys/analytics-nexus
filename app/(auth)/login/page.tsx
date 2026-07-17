'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Database,
  X,
  Smartphone,
  ChevronRight
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email structure: please enter a valid corporate email" }),
  password: z.string().min(6, { message: "Security standard requirement: password must be at least 6 characters" }),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleLoginSubmit = (_data: LoginFields) => {
    // Valid form values, proceed to 2FA Step
    setOtpOpen(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Dashboard Overview
    router.push('/');
  };

  const handleOtpInput = (val: string, index: number) => {
    if (val.length > 1) val = val.substring(0, 1);
    
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto-focus next input
    if (val !== '' && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full select-none bg-surface text-on-surface">
      {/* Left Side: Immersive Visual Panel */}
      <section className="hidden md:flex relative w-1/2 h-full items-center justify-center overflow-hidden border-r border-outline-variant/10 mesh-gradient-bg">
        {/* Abstract Mesh Glows */}
        <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 px-12 max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold">System Operational</span>
          </div>
          
          <h1 className="font-display text-display text-white mb-6 leading-tight font-bold tracking-tight">
            Intelligence beyond <br/>
            <span className="text-primary italic">observation.</span>
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Nexus Analytics provides surgical precision for enterprise data flows, enabling your team to predict infrastructure shifts before they happen.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-12">
            <div>
              <p className="font-display text-headline-md text-white font-bold">99.99%</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-semibold">Uptime SLA</p>
            </div>
            <div>
              <p className="font-display text-headline-md text-white font-bold">2.4ms</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-semibold">Query Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Content */}
      <section className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-12 bg-surface-container-lowest relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[150px]" />
        </div>
        
        <div className="w-full max-w-[440px] z-10 space-y-8">
          {/* Branding Logo */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/10 border border-primary/20">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display text-headline-md font-bold text-primary tracking-tighter">Nexus Analytics</span>
              </div>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-2 font-bold tracking-tight">Welcome back</h2>
            <p className="text-on-surface-variant text-sm">Enter your credentials to access your dashboard.</p>
          </div>

          {/* Login Form Card */}
          <div className="glass-card p-8 rounded-2xl">
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider ml-1 font-bold" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-[20px] h-[20px]" />
                  <input
                    className={cn(
                      "w-full bg-surface-container-lowest border rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-low text-sm",
                      errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-outline-variant/30 focus:border-primary/80"
                    )}
                    id="email"
                    placeholder="name@company.com"
                    type="text"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-semibold text-rose-400 mt-1 pl-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="password">
                    Password
                  </label>
                  <a className="text-primary hover:underline transition-colors text-xs font-semibold" href="#">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-[20px] h-[20px]" />
                  <input
                    className={cn(
                      "w-full bg-surface-container-lowest border rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-low text-sm",
                      errors.password ? "border-rose-500/50 focus:border-rose-500" : "border-outline-variant/30 focus:border-primary/80"
                    )}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] font-semibold text-rose-400 mt-1 pl-1">{errors.password.message}</p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-primary/10 text-sm"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* SSO Divider */}
            <div className="relative my-8 flex items-center">
              <div className="flex-grow border-t border-outline-variant/10" />
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest font-bold">
                Other ways to sign in
              </span>
              <div className="flex-grow border-t border-outline-variant/10" />
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant/25 py-3 rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.38-2.1 4.54-1.2 1.2-3.08 2.4-5.74 2.4-4.8 0-8.68-3.92-8.68-8.72s3.88-8.72 8.68-8.72c2.6 0 4.5 1.02 5.9 2.34l2.3-2.3c-2.1-1.9-4.8-3.04-8.2-3.04-6.63 0-12 5.37-12 12s5.37 12 12 12c3.57 0 6.27-1.17 8.35-3.34 2.13-2.13 2.82-5.13 2.82-7.69 0-.54-.04-1.07-.13-1.57h-11.04z" fill="#EA4335" />
                </svg>
                <span className="font-semibold text-xs text-on-surface">Google</span>
              </button>
              <button 
                onClick={() => router.push('/')}
                className="flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant/25 py-3 rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-semibold text-xs text-on-surface">GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer Access Link */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 text-on-surface-variant/80 font-label-sm text-sm">
            <p>Don&apos;t have an account? <a className="text-primary font-bold hover:underline" href="#">Request access</a></p>
            <button 
              type="button"
              onClick={() => setOtpOpen(true)}
              className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer text-xs"
            >
              <Shield className="w-4 h-4" />
              2FA Troubles?
            </button>
          </div>
        </div>

        {/* 2FA Verification Modal Dialog */}
        {otpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-card w-full max-w-md p-8 rounded-3xl relative overflow-hidden flex flex-col gap-6 shadow-2xl border border-outline-variant/20">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                type="button"
                onClick={() => setOtpOpen(false)}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleVerifyOTP} className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                
                <div>
                  <h3 className="font-headline-md text-headline-md text-white font-bold tracking-tight">Verification required</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Enter the 6-digit code from your authenticator app.</p>
                </div>

                <div className="flex justify-center gap-3 py-2">
                  {otpValues.map((val, idx) => (
                    <React.Fragment key={idx}>
                      <input
                        ref={otpRefs[idx]}
                        className="w-12 h-14 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-center text-xl font-bold text-primary focus:border-primary outline-none transition-all"
                        maxLength={1}
                        type="text"
                        value={val}
                        onChange={(e) => handleOtpInput(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      />
                      {idx === 2 && <span className="flex items-center text-on-surface-variant/40 text-xl font-bold">-</span>}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/10 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  Verify Identity
                  <ChevronRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-on-surface-variant">
                  Lost your device? <a className="text-primary hover:underline font-bold" href="#">Use backup codes</a>
                </p>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
