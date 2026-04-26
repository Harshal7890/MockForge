"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBriefcase,
  IconBook,
} from "@tabler/icons-react";

import { UserButton, useUser } from "@clerk/nextjs";
import AmbientBackground from "./AmbientBackground";

export default function DashboardSidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { user } = useUser();

  const links = [
    {
      label: "Dashboard" ,
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 text-slate-500" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <IconUserBolt className="h-5 w-5 text-slate-500" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IconSettings className="h-5 w-5 text-slate-500" />,
    },
    {
      label: "Aptitude Tests",
      href: "/dashboard/aptitude",
      icon: <IconBook className="h-5 w-5 text-slate-500" />,
    },
    {
      label: "Company Specific DSA",
      href: "/dashboard/company-dsa",
      icon: <IconBriefcase className="h-5 w-5 text-slate-500" />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IconArrowLeft className="h-5 w-5 text-slate-500" />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        className="bg-white border-r border-slate-200"
      >
        <SidebarBody
          className="
            justify-between
            gap-10
            bg-white
            text-slate-700
          "
        >
          {/* ---------- NAV LINKS ---------- */}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className="
                     !text-slate-700
                   hover:!text-slate-900
                     hover:bg-slate-100
                      rounded-lg
                    transition-all duration-200
  "
              />
            ))}
          </div>

          {/* ---------- USER PROFILE ---------- */}
          <div
            className="
              border-t border-slate-200
              pt-4
              flex items-center gap-3
              p-2
              rounded-lg
              hover:bg-slate-100
              transition-all
            "
          >
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10 ring-1 ring-slate-200 hover:ring-slate-300 transition-all",

                  userButtonPopoverCard:
                    "bg-white border border-slate-200 shadow-xl",

                  userButtonPopoverActionButton:
                    "text-slate-700 hover:bg-slate-100 hover:text-slate-900",

                  userButtonPopoverActionButtonText: "text-slate-700",

                  userButtonPopoverFooter: "hidden",
                },
              }}
            />

            <div className="flex flex-col overflow-hidden">
              <p className="text-sm text-slate-800 font-medium truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* ================= PAGE CONTENT ================= */}
      <main className="relative flex-1 overflow-y-auto bg-slate-50 p-8 text-slate-800">
        <AmbientBackground />
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
