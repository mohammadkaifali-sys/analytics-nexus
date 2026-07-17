'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/use-store';
import { cn } from '@/lib/utils';
import {
  User,
  Palette,
  Users,
  Camera,
  UserPlus,
  Moon,
  Sun,
  Laptop,
  CheckCircle,
  MoreVertical
} from 'lucide-react';

interface TeamMember {
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member';
  status: 'Active' | 'Invited';
  avatar: string;
}

export default function SettingsPage() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  // Form states
  const [name, setName] = useState('Alexander Vance');
  const [jobTitle, setJobTitle] = useState('SVP of Infrastructure');
  const [email, setEmail] = useState('a.vance@nexus-analytics.io');
  const [timezone, setTimezone] = useState('Central European Time (CET) - UTC+1');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'team'>('profile');

  // Team list
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: 'Marcus Chen',
      email: 'm.chen@nexus.io',
      role: 'Admin',
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5LCnkdAJ7D_X19HGWQrnkzMapD0UEbGhKzDwVXqvQkbI_MZLZVb7TGUb_CG1mgCtF-SQP4e-QFAtymwCqx2xOTYqfRggJEipakWbla-gfLABpptAlqMQIoMJhxPf8W7C8uw0ztWSINMvhkq1PLcpy0efLS-4mqjP9sU0eH-3YIsnHvmMEML_nDjhNd4Ah-57uvLb6GKpGX0Mp5ozapvt-M3er6Fax6_sh83-c-HEzhIyeDh8WJhOQ'
    },
    {
      name: 'Jane Doe',
      email: 'j.doe@nexus.io',
      role: 'Member',
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe3E49CI8n4SoWa1r_B2u16-PDLLytFP6fkYGlFZ7tQkuenhYl_XuOLo7kKhg1f9tL6v4L09TEIylSKlndn-cOqfmggWqhH0JIsLywWRZ4E_XMA8QaVRTiFWhNBK-_3_3Eo2O0EjdPOnu5DAg_Yf28uaLi8ZLVnZ6sVDxrvIKOHtFcd1uDVcsZ5HhGfaSv0xNNx0chPOZzEcGmEnIi24cTVhjBYfA9744YGuqdM-7GoVbOGeW5j6zv'
    }
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile configuration updated successfully!');
  };

  const handleInviteMember = () => {
    const emailStr = prompt("Enter team member's email address:");
    if (!emailStr) return;

    setTeamMembers(prev => [
      ...prev,
      {
        name: emailStr.split('@')[0],
        email: emailStr,
        role: 'Member',
        status: 'Invited',
        avatar: ''
      }
    ]);
  };

  return (
    <div className="space-y-gutter relative select-none">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-display font-display tracking-tight text-white font-bold">System Settings</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Manage system configurations, visual layouts, theme toggles, and user directory lists.
        </p>
      </section>

      {/* Tabs list */}
      <section className="flex border-b border-outline-variant/10 gap-6 select-none">
        <button
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex items-center gap-2 pb-3.5 text-xs font-bold border-b-2 transition-colors cursor-pointer",
            activeTab === 'profile'
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-white"
          )}
        >
          <User className="w-4 h-4" />
          Profile Settings
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={cn(
            "flex items-center gap-2 pb-3.5 text-xs font-bold border-b-2 transition-colors cursor-pointer",
            activeTab === 'appearance'
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-white"
          )}
        >
          <Palette className="w-4 h-4" />
          Appearance & Themes
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={cn(
            "flex items-center gap-2 pb-3.5 text-xs font-bold border-b-2 transition-colors cursor-pointer",
            activeTab === 'team'
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-white"
          )}
        >
          <Users className="w-4 h-4" />
          Team Members
        </button>
      </section>

      {/* Content views */}
      <div className="mt-4">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="space-y-6">
            <div className="glass-card rounded-2xl p-8 border border-outline-variant/10">
              <form onSubmit={handleSaveProfile} className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Profile Photo Mock */}
                <div className="relative group flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 p-1 bg-surface-container-low">
                    <img 
                      className="w-full h-full object-cover rounded-full" 
                      alt="User Avatar" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe3E49CI8n4SoWa1r_B2u16-PDLLytFP6fkYGlFZ7tQkuenhYl_XuOLo7kKhg1f9tL6v4L09TEIylSKlndn-cOqfmggWqhH0JIsLywWRZ4E_XMA8QaVRTiFWhNBK-_3_3Eo2O0EjdPOnu5DAg_Yf28uaLi8ZLVnZ6sVDxrvIKOHtFcd1uDVcsZ5HhGfaSv0xNNx0chPOZzEcGmEnIi24cTVhjBYfA9744YGuqdM-7GoVbOGeW5j6zv"
                    />
                  </div>
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-xs">
                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider block">Full Name</label>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-2.5 outline-none transition-all focus:border-primary text-on-surface"
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider block">Job Title</label>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-2.5 outline-none transition-all focus:border-primary text-on-surface"
                      type="text" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider block">Email Address</label>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-2.5 outline-none transition-all focus:border-primary text-on-surface"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider block">Timezone</label>
                    <select 
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-2.5 outline-none transition-all focus:border-primary text-on-surface"
                    >
                      <option>Pacific Time (PT) - UTC-8</option>
                      <option>Eastern Time (ET) - UTC-5</option>
                      <option>Central European Time (CET) - UTC+1</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                    <button 
                      type="submit"
                      className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </section>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <section className="space-y-6">
            <div className="glass-card rounded-2xl p-8 border border-outline-variant/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Dark Mode Theme */}
                <div 
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "group cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between min-h-[140px]",
                    theme === 'dark' ? "bg-primary/5 border-primary" : "bg-surface-container-low/40 border-outline-variant/10"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <Moon className="w-6 h-6 text-primary" />
                    {theme === 'dark' && <CheckCircle className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-white text-xs">Deep Night (Dark)</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Default sleep interface optimal for dark workspaces.</p>
                  </div>
                </div>

                {/* Light Mode Theme */}
                <div 
                  onClick={() => setTheme('light')}
                  className={cn(
                    "group cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between min-h-[140px]",
                    theme === 'light' ? "bg-primary/5 border-primary" : "bg-surface-container-low/40 border-outline-variant/10"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <Sun className="w-6 h-6 text-secondary" />
                    {theme === 'light' && <CheckCircle className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-white text-xs">Pure Slate (Light)</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Clean slate interface ideal for bright workspaces.</p>
                  </div>
                </div>

                {/* System Mode Theme */}
                <div 
                  onClick={() => setTheme('dark')}
                  className="group cursor-pointer p-4 rounded-xl border bg-surface-container-low/40 border-outline-variant/10 transition-all flex flex-col justify-between min-h-[140px] opacity-60"
                >
                  <div className="flex justify-between items-start">
                    <Laptop className="w-6 h-6 text-on-surface-variant" />
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-white text-xs">System Preference</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Sync dashboard themes to system preferences.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <section className="space-y-6">
            <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/10">
              <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/20">
                <div>
                  <h3 className="text-xs font-bold text-white">Active Members</h3>
                  <p className="text-[10px] text-on-surface-variant">Manage role configurations and access layers</p>
                </div>
                <button 
                  onClick={handleInviteMember}
                  className="flex items-center gap-1 bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Invite Member
                </button>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="text-on-surface-variant border-b border-outline-variant/10 uppercase tracking-wider font-bold">
                      <th className="px-6 py-4">Member Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Role Permission</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {teamMembers.map((member, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20">
                              {member.avatar ? (
                                <img className="w-full h-full object-cover" alt="User image" src={member.avatar} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10">
                                  {member.name.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <span className="font-bold text-white text-xs">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {member.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                            member.status === 'Active' ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400 animate-pulse"
                          )}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={member.role}
                            onChange={(e) => {
                              const newMembers = [...teamMembers];
                              newMembers[idx].role = e.target.value as 'Owner' | 'Admin' | 'Member';
                              setTeamMembers(newMembers);
                            }}
                            className="bg-surface-container-low text-on-surface border border-outline-variant/25 text-xs font-semibold rounded p-1 outline-none"
                          >
                            <option value="Owner">Owner</option>
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant hover:text-white cursor-pointer">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
