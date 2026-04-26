"use client";

import { useRef } from "react";
import Navbar from "@/components/shared/Navbar";
import GsapMagnetic from "@/components/animations/GsapMagnetic";
import SplitText from "@/components/animations/SplitText";
import GradientText from "@/components/animations/GradientText";
import Link from "next/link";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Bot, TrendingUp, FileText, Mic, Activity, LayoutDashboard, Globe, Percent, CheckCircle2, Mail, Phone, MapPin, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const container = useRef();

  useGSAP(() => {
    gsap.from(".main-fade", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      className="relative min-h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans"
    >
      {/* Soft overlay gradient and dot grid background to match the mockup exactly */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-70"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 pointer-events-none"></div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 pt-16">
        
        {/* Floating Logo Block (Top Center) */}
        <motion.div
           animate={{ y: [0, -10, 0] }}
           transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
           className="hidden md:flex absolute top-[15%] left-1/2 -translate-x-1/2 w-[72px] h-[72px] bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] items-center justify-center z-20"
        >
            <div className="grid grid-cols-2 gap-[6px]">
                <div className="w-[14px] h-[14px] rounded-full bg-blue-500"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-slate-800"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-slate-800"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-slate-800"></div>
            </div>
        </motion.div>

        {/* Floating Elements - Left Side */}
        {/* Sticky Note */}
        <motion.div
           animate={{ y: [0, -12, 0], rotate: [-4, -6, -4] }}
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
           className="hidden lg:flex absolute top-[20%] left-[12%] z-20 group"
        >
            {/* White back note */}
            <div className="absolute top-2 -left-4 w-56 h-56 bg-zinc-100 rounded shadow-md rotate-[-12deg]" />
            {/* Yellow front note */}
            <div className="relative w-56 h-[220px] bg-[#fdf5b4] shadow-lg p-5 flex flex-col font-medium rotate-[-4deg]">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-red-600 shadow-sm z-10 border border-red-700">
                     <div className="absolute top-[2px] left-[2px] w-[4px] h-[4px] rounded-full bg-white/50" />
                     <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[2px] h-[10px] bg-gray-400 rotate-[-15deg] -z-10" />
                </div>
                <p className="mt-6 text-gray-800 text-[17px] leading-relaxed italic" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif' }}>
                    Take notes to keep track of crucial details, and accomplish more interviews with ease.
                </p>
            </div>
        </motion.div>

        {/* Checkbox Icon */}
        <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
           className="hidden lg:flex absolute top-[43%] left-[8%] z-30 w-20 h-20 bg-white rounded-3xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] items-center justify-center"
        >
             <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                 <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                 </svg>
             </div>
        </motion.div>

        {/* Today's Tasks Component */}
        <motion.div
           animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }}
           transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
           className="hidden lg:flex absolute bottom-[10%] left-[10%] z-20 w-[280px]"
        >
            {/* White back card for depth */}
            <div className="absolute -top-3 -right-3 w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 rotate-[4deg]" />
            <div className="relative w-full bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] p-6 border border-slate-100 flex flex-col">
                 <h3 className="text-sm font-bold text-slate-800 mb-5">Today's mock interviews</h3>
                 
                 {/* Task item 1 */}
                 <div className="flex flex-col gap-2 mb-5">
                     <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">A</div>
                               <span className="font-semibold text-slate-700">Tech round #1</span>
                          </div>
                          <div className="flex -space-x-1.5">
                               <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" />
                               <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-300" />
                          </div>
                     </div>
                     <span className="text-[10px] text-slate-400 font-medium">Sep 10</span>
                     <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="w-[60%] h-full bg-blue-400 rounded-full" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">60%</span>
                     </div>
                 </div>

                 {/* Task item 2 */}
                 <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded bg-green-100 text-green-600 flex items-center justify-center font-bold text-[10px]">HR</div>
                               <span className="font-semibold text-slate-700">Culture Fit</span>
                          </div>
                          <div className="flex -space-x-1.5">
                               <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" />
                          </div>
                     </div>
                     <span className="text-[10px] text-slate-400 font-medium">Sep 18</span>
                     <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="w-[100%] h-full bg-orange-400 rounded-full" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">100%</span>
                     </div>
                 </div>
            </div>
        </motion.div>

        {/* Floating Elements - Right Side */}
        {/* Reminders Card */}
        <motion.div
           animate={{ y: [0, 10, 0], rotate: [2, 4, 2] }}
           transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.2 }}
           className="hidden xl:flex absolute top-[15%] right-[10%] z-20 w-[260px]"
        >
             {/* Folder tab design */}
             <div className="absolute -top-[28px] right-0 w-[120px] h-[40px] bg-white rounded-t-2xl shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.05)] border-t border-l border-r border-slate-100 z-10" />
             <div className="absolute top-[-30px] right-[-30px] w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center z-30">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center relative">
                       <div className="absolute top-1/2 left-1/2 w-[2px] h-[10px] bg-slate-800 origin-bottom -translate-x-1/2 -translate-y-[100%] rounded-full" />
                       <div className="absolute top-1/2 left-1/2 w-[8px] h-[2px] bg-blue-500 origin-left -translate-y-1/2 rounded-full" />
                  </div>
             </div>
             
             <div className="relative w-full bg-white rounded-tl-2xl rounded-b-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] p-5 border border-slate-100 z-20 flex flex-col">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 ml-2">Reminders</h3>
                  <div className="flex justify-end text-[10px] text-slate-400 mb-1">Meetings</div>
                  <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                       <p className="text-xs font-bold text-slate-700 mb-1">Today's Mockup</p>
                       <p className="text-[10px] text-slate-400 mb-4">Call with AI interviewer</p>
                       <div className="flex justify-center text-[10px] font-bold text-slate-500 mb-1">Time</div>
                       <div className="bg-blue-50/50 text-blue-500 rounded-lg py-1.5 px-3 flex justify-center items-center gap-1.5 text-xs font-semibold">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            13:00 - 13:45
                       </div>
                  </div>
             </div>
        </motion.div>

        {/* Quizzes Card */}
        <motion.div
           animate={{ y: [0, -10, 0], rotate: [-3, -1, -3] }}
           transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
           className="hidden xl:flex absolute bottom-[15%] right-[12%] z-20 w-[260px]"
        >
             {/* Folder tab design */}
             <div className="absolute -top-[28px] left-0 w-[140px] h-[40px] bg-[#f8fafc] rounded-t-2xl border-t border-l border-r border-[#e2e8f0] z-10 shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.05)]" />
             <div className="relative w-full bg-[#f8fafc] rounded-tr-2xl rounded-b-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] p-5 border border-[#e2e8f0] z-20 flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-700 mb-2 ml-1 top-[-20px] relative">Domain Quizzes</h3>
                  
                  <div className="flex flex-col gap-2.5 mt-[-15px]">
                       {/* Quiz 1 */}
                       <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-sm">⚛️</div>
                                 <div className="flex flex-col">
                                      <span className="text-[11px] font-bold text-slate-700">ReactJS Base</span>
                                      <span className="text-[9px] text-slate-400">15 Questions</span>
                                 </div>
                            </div>
                            <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">80%</div>
                       </div>
                       
                       {/* Quiz 2 */}
                       <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                 <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center font-bold text-sm">⚙️</div>
                                 <div className="flex flex-col">
                                      <span className="text-[11px] font-bold text-slate-700">System Design</span>
                                      <span className="text-[9px] text-slate-400">10 Questions</span>
                                 </div>
                            </div>
                            <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">Start</div>
                       </div>
                  </div>
             </div>
        </motion.div>


        {/* Central Content */}
        <div className="flex flex-col items-center max-w-4xl pt-8 z-30">
             <div className="text-center mb-6">
                 <h1 className="text-5xl md:text-7xl lg:text-[84px] font-semibold text-slate-900 tracking-tight leading-[1.1] font-sans">
                     <SplitText text="Think, practice, and track" className="inline-block" delay={40} tag="span" /> <br className="hidden md:block"/>
                     <span className="main-fade inline-block mt-2">
                         <GradientText 
                             colors={['#64748b', '#3b82f6', '#8b5cf6', '#64748b']} 
                             animationSpeed={4} 
                             className="font-medium pb-2 px-2"
                             showBorder={false}
                         >
                             all in one place
                         </GradientText>
                     </span>
                 </h1>
             </div>

             <div className="main-fade mt-2 mb-10 text-slate-600 max-w-xl text-center text-[17px] md:text-lg font-normal leading-relaxed">
                 Efficiently manage your mock interviews and boost your career readiness with AI.
             </div>

             <div className="main-fade">
                 <GsapMagnetic strength={0.3}>
                     <Link href="/dashboard">
                         <button className="bg-[#1a73e8] hover:bg-blue-700 text-white font-medium text-[15px] px-8 py-3.5 rounded-xl shadow-[0_8px_20px_-5px_rgba(26,115,232,0.4)] transition-all hover:shadow-[0_10px_25px_-5px_rgba(26,115,232,0.5)] hover:-translate-y-1">
                             Get free demo
                         </button>
                     </Link>
                 </GsapMagnetic>
             </div>
        </div>

      </main>

      {/* Features Section */}
      <section className="relative z-20 py-24 px-4 pt-32">
        <div className="max-w-6xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to <span className="text-[#1a73e8]">get hired</span></h2>
            <p className="text-slate-500 text-[17px] max-w-2xl mx-auto">From application to offer letter, MockForge provides an end-to-end toolkit to supercharge your career journey.</p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-100/60 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* 1 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <Bot className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Automated<br/>Applications</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Let our AI agent handle the tedious application process while you focus on prep.</p>
            </div>
            {/* 2 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <TrendingUp className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Skill Gap<br/>Analysis</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Identify exactly what skills you're missing for your dream role and how to bridge them.</p>
            </div>
            {/* 3 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <FileText className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Smart Resume<br/>Tailoring</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Automatically tailor your resume for every single job description to increase acceptance rates.</p>
            </div>
            {/* 4 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <Mic className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Interview<br/>Intelligence</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Practice with AI-driven mock interviews that give you real-time feedback on your answers.</p>
            </div>
            {/* 5 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <Activity className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Market<br/>Pulse</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Stay ahead with real-time insights on salary trends and hiring demands for your role.</p>
            </div>
            {/* 6 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <LayoutDashboard className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Unified<br/>Tracker</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Visualize your entire job hunt pipeline in one intuitive, automated dashboard.</p>
            </div>
            {/* 7 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <Globe className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Sponsorship<br/>Filter</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Instantly filter and identify jobs that explicitly support visa sponsorship.</p>
            </div>
            {/* 8 */}
            <div className="relative group p-8 border-b border-r border-slate-100/60 hover:bg-slate-50 transition-all overflow-hidden">
              <div className="absolute top-[28px] left-0 w-1.5 h-12 bg-[#1a73e8] rounded-r-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <Percent className="w-7 h-7 text-[#1a73e8] mb-5 group-hover:scale-110 origin-left transition-transform duration-300" />
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5">Smart Match<br/>Score</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">Know your probability of getting hired before you even apply with our AI scoring.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-20 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Invest in Your <span className="text-[#1a73e8]">Future</span></h2>
            <p className="text-slate-500 text-[17px]">Stop wasting hours on manual applications. Choose the plan that gets you hired faster.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Basic Plan */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
               className="md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col h-full"
            >
               <h3 className="text-lg font-bold text-slate-800 mb-2">Job Seeker</h3>
               <div className="flex items-baseline gap-1 mb-2">
                 <span className="text-4xl font-bold text-slate-900">₹0</span>
               </div>
               <p className="text-[13px] text-slate-500 mb-6">Perfect for testing the waters.</p>
               
               <Link href="/sign-in" className="block w-full mb-8">
                 <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-100">
                   Get Started
                 </button>
               </Link>

               <div className="space-y-4">
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5" />
                   <span className="text-xs text-slate-600">10 Auto-Applications / month</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5" />
                   <span className="text-xs text-slate-600">Basic Resume Scoring</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5" />
                   <span className="text-xs text-slate-600">Job Tracker Dashboard</span>
                 </div>
               </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
               className="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(26,115,232,0.15)] relative ring-1 ring-blue-100 grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Career Accelerator</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900">₹299</span>
                  <span className="text-sm font-medium text-slate-500">/mo</span>
                </div>
                <p className="text-[13px] text-slate-500 mb-6">For serious candidates who want offers.</p>

                {/* Graph mockup */}
                <div className="border border-slate-100 rounded-xl p-4 mt-6 bg-slate-50/50 group relative">
                  <p className="text-xs font-bold text-slate-700 mb-1">Interview Success Rate</p>
                  <p className="text-[10px] text-slate-400 mb-4">Average interviews secured by Pro users over time.</p>
                  <div className="relative h-36 w-full mt-8">
                     
                     {/* SVG strictly growing curve */}
                     <div className="absolute inset-x-0 bottom-6 top-0 pointer-events-none z-0">
                       <svg viewBox="0 0 100 40" className="w-full h-full preserve-aspect-ratio-none stroke-blue-500 overflow-visible" fill="none" strokeWidth="2.5">
                          <path d="M0,35 C15,33 25,28 40,26 C55,24 65,15 80,12 C90,10 95,5 100,5" strokeLinecap="round" />
                       </svg>
                     </div>
                     
                     {/* Hover zones for all months */}
                     <div className="absolute inset-x-0 bottom-6 top-0 z-10">
                        {[
                           { month: 'Jan', int: 4, left: '0%', bottom: '12.5%' },
                           { month: 'Feb', int: 7, left: '16.6%', bottom: '20%' },
                           { month: 'Mar', int: 12, left: '33.3%', bottom: '32.5%' },
                           { month: 'Apr', int: 18, left: '50%', bottom: '45%' },
                           { month: 'May', int: 25, left: '66.6%', bottom: '60%' },
                           { month: 'Jun', int: 34, left: '83.3%', bottom: '77.5%' },
                           { month: 'Jul', int: 42, left: '100%', bottom: '87.5%' }
                        ].map((data, i) => (
                           <div key={data.month} className="absolute h-full w-[14%] group/col cursor-default" style={{ left: data.left, transform: 'translateX(-50%)' }}>
                              
                              {/* Tooltip */}
                              <div className={`absolute opacity-0 group-hover/col:opacity-100 transition-all duration-300 pointer-events-none z-50 flex flex-col items-center
                                 ${i === 0 ? 'left-[50%]' : i === 6 ? 'right-[50%]' : 'left-1/2 -translate-x-1/2'}
                              `}
                                   style={{ bottom: `calc(${data.bottom} + 12px)` }}>
                                  <div className="bg-white rounded-[10px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] p-3 border border-slate-100 min-w-[120px] transform group-hover/col:-translate-y-1 transition-transform duration-300">
                                      <p className="text-[13px] font-bold text-slate-800 mb-1.5 leading-none">{data.month}</p>
                                      <div className="flex justify-between items-center text-[12px]">
                                          <span className="text-slate-500">Interviews</span>
                                          <span className="font-bold text-[#1a73e8]">{data.int}</span>
                                      </div>
                                  </div>
                              </div>

                              {/* Hover Dot */}
                              <div className="absolute left-1/2 w-3 h-3 bg-[#1a73e8] rounded-full opacity-0 group-hover/col:opacity-100 transition-opacity duration-300 z-40 shadow-[0_0_0_3px_white]" style={{ bottom: data.bottom, transform: 'translate(-50%, 50%)' }} />
                           </div>
                        ))}
                     </div>

                     {/* X-Axis */}
                     <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] text-slate-400 font-medium px-1 z-0 pt-2 border-t border-slate-200">
                        {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map(m => (
                           <span key={m}>{m}</span>
                        ))}
                     </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-4">Everything in Job Seeker plus:</p>
                  <div className="space-y-3.5">
                    {[
                      "Unlimited Auto-Applications", 
                      "AI-Tailored Resumes per Job", 
                      "Mock Interview AI Agent", 
                      "Skill Gap Analysis & Roadmap", 
                      "Cover Letter Generation", 
                      "Salary Prediction Insights"
                    ].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-600 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Link href="/sign-in" className="flex-1">
                    <button className="w-full py-2.5 rounded-xl bg-[#1a73e8] text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                      Get Pro
                    </button>
                  </Link>
                  <Link href="/sign-in" className="flex-1">
                    <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all">
                      Start Free Trial
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-20 py-24 px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Loved by <span className="text-[#1a73e8]">thousands</span> of job seekers</h2>
            <p className="text-slate-500 text-[17px]">Don't just take our word for it. See what others are saying about their<br/>success with MockForge.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* T1 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
               className="bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.02)]"
            >
               <div className="flex items-center gap-1 mb-5">
                 {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-600 text-[15px] leading-relaxed mb-8">The Smart Resume Tailoring feature is a game-changer! I used to spend hours tweaking my CV, but MockForge did it in seconds. I got callbacks from 3 top-tier tech companies within a week.</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-400">SC</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Sarah Chen</h4>
                    <p className="text-[11px] text-slate-500">Product Manager <span className="text-[#1a73e8]">@ Salesforce</span></p>
                  </div>
               </div>
            </motion.div>
            
            {/* T2 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
               className="bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.02)]"
            >
               <div className="flex items-center gap-1 mb-5">
                 {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-600 text-[15px] leading-relaxed mb-8">The interview intelligence tool helped me crack the behavioral round which I always struggled with. Real-time feedback on my answers gave me the confidence I needed.</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-400">MR</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Michael Ross</h4>
                    <p className="text-[11px] text-slate-500">Frontend Engineer <span className="text-[#1a73e8]">@ Google</span></p>
                  </div>
               </div>
            </motion.div>

            {/* T3 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
               className="bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.02)]"
            >
               <div className="flex items-center gap-1 mb-5">
                 {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-600 text-[15px] leading-relaxed mb-8">I utilized the Skill Gap Analysis to identify exactly what I was missing. The roadmap suggested specific projects, and after completing them, I landed my dream role at Amazon.</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-400">ER</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Emily Rodriguez</h4>
                    <p className="text-[11px] text-slate-500">Data Scientist <span className="text-[#1a73e8]">@ Amazon</span></p>
                  </div>
               </div>
            </motion.div>

            {/* T4 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
               className="bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.02)]"
            >
               <div className="flex items-center gap-1 mb-5">
                 {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-600 text-[15px] leading-relaxed mb-8">The Unified Tracker kept me sane during my job hunt. Visualizing my pipeline helped me stay organized and follow up at the right times. Highly recommend to any serious job seeker.</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-400">DP</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">David Park</h4>
                    <p className="text-[11px] text-slate-500">UX Designer <span className="text-[#1a73e8]">@ Airbnb</span></p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer Wrapper */}
      <div className="relative z-20 w-full flex flex-col bg-slate-50">
        
        {/* Deep Dark CTA */}
        <motion.section 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative px-4 py-28 overflow-hidden bg-slate-900 pb-40"
        >
           <div className="absolute inset-x-0 bottom-0 top-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 100%, #1a73e8 0%, transparent 60%)' }}></div>
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to land your dream job?</h2>
              <p className="text-slate-300 text-lg mb-10">Join thousands of job seekers who are already using MockForge to<br/>accelerate their career.</p>
              <button className="bg-[#1a73e8] hover:bg-blue-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_8px_20px_-5px_rgba(26,115,232,0.4)] transition-all mx-auto flex items-center gap-2">
                 Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </motion.section>

        {/* Contact/Lets Talk Wrapper */}
        <section className="relative px-4 pb-24 bg-gradient-to-br from-slate-50 to-white pt-24 -mt-20 rounded-t-[3rem] z-20 border-t border-slate-100/50 shadow-[0_-20px_40px_-5px_rgba(0,0,0,0.05)]">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center lg:items-start pt-10">
             
             {/* Left Text */}
             <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex-1 lg:max-w-sm"
             >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200/50 bg-blue-50/50 text-[#1a73e8] text-[10px] uppercase font-bold tracking-wider mb-6">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]"></div> Contact Us
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-6 font-sans">Let's talk</h2>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-12">
                   Have questions about our AI features? Need help with your job search tracking? Our team is here to help you succeed.
                </p>

                <div className="space-y-8">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                         <Mail className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Email Support</p>
                         <p className="text-sm font-semibold text-slate-800">support@mockforge.com</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                         <Phone className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Call Us</p>
                         <p className="text-sm font-semibold text-slate-800">+1 (555) 123-4567</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                         <MapPin className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Headquarters</p>
                         <p className="text-sm font-semibold text-slate-800">San Francisco, CA</p>
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* Right Form */}
             <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="flex-[1.5] w-full"
             >
                <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)]">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex flex-col gap-2">
                         <label className="text-[11px] font-bold text-slate-600 pl-1">Full Name</label>
                         <input type="text" placeholder="John Doe" className="w-full bg-slate-50/50 border border-slate-100 text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a73e8] transition-all font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-[11px] font-bold text-slate-600 pl-1">Email Address</label>
                         <input type="email" placeholder="john@example.com" className="w-full bg-slate-50/50 border border-slate-100 text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a73e8] transition-all font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal" />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2 mb-6">
                       <label className="text-[11px] font-bold text-slate-600 pl-1">Subject</label>
                       <input type="text" placeholder="Looking for partnership..." className="w-full bg-slate-50/50 border border-slate-100 text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a73e8] transition-all font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal" />
                   </div>
                   <div className="flex flex-col gap-2 mb-8">
                       <label className="text-[11px] font-bold text-slate-600 pl-1">Message</label>
                       <textarea placeholder="How can we help you?" rows={4} className="w-full bg-slate-50/50 border border-slate-100 text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a73e8] transition-all font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal resize-none"></textarea>
                   </div>
                   <button className="w-full bg-[#1a73e8] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                       Send Message
                   </button>
                </div>
             </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
