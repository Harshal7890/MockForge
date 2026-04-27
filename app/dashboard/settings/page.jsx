"use client";

import React, { useState } from 'react';
import { Settings, Bell, Shield, Moon, MonitorSmartphone, Palette, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("preferences");
  
  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 italic tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 text-lg">
          Customize your experience, manage preferences, and configure application behavior.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
        
        {/* Sidebar Nav for Settings */}
        <div className="flex flex-col w-full md:w-64 gap-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'preferences' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Palette className="w-5 h-5" />
            Display Preferences
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button 
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'privacy' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Shield className="w-5 h-5" />
            Privacy & Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          
          {activeTab === 'preferences' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-800">Display Preferences</h2>
              <p className="text-slate-500 mb-4 text-sm">Update your interface settings to match your workflow.</p>
              
              <div className="flex flex-col gap-4">
                <div className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-full">
                      <MonitorSmartphone className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">System Theme</h4>
                      <p className="text-sm text-slate-500">Currently using the stunning light theme</p>
                    </div>
                  </div>
                  <div className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 shadow-sm transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
              <p className="text-slate-500 mb-4 text-sm">Choose how you want to be notified about updates and feedback.</p>
              
              <div className="flex flex-col gap-4">
                <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-semibold text-slate-800">Email Notifications</h4>
                    <p className="text-sm text-slate-500 mt-1">Receive interview feedback directly to your inbox</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                  </label>
                </div>
                
                <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-semibold text-slate-800">New Roadmaps Alerts</h4>
                    <p className="text-sm text-slate-500 mt-1">Get notified when new content drops in The Developer&#39;s Vault</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-800">Privacy & Security</h2>
              <p className="text-slate-500 mb-4 text-sm">For account security, password changes, and sensitive data, please visit your Profile.</p>
              
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
                <Shield className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Account Management is secured by Clerk</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6">
                  To view your connected accounts, change your password, or delete your data, please head over to the Profile section.
                </p>
                <a href="/dashboard/profile" className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 shadow-sm transition-colors">
                  Go to Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
