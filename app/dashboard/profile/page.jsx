"use client";

import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full items-center p-4">
      <div className="w-full text-left mb-4">
        <h1 className="text-4xl font-extrabold text-slate-900 italic tracking-tight mb-2">
          Your Profile
        </h1>
        <p className="text-slate-500 text-lg">
          Manage your account details, security, and connected accounts.
        </p>
      </div>
      
      <div className="w-full flex justify-center">
        <UserProfile 
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full max-w-4xl shadow-xl rounded-2xl",
              card: "border border-slate-200 shadow-none rounded-2xl w-full max-w-4xl",
              navbar: "border-r border-slate-200 bg-slate-50/50",
              navbarButton: "text-slate-600 hover:text-slate-900",
              headerTitle: "text-slate-900",
              headerSubtitle: "text-slate-500",
            }
          }}
        />
      </div>
    </div>
  );
}
