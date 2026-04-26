"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
      
      {/* Subtle paper/noise texture for an organic feel */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Soft pastel conic sweep behind for dynamic brightness */}
      <motion.div 
        animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }} 
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] origin-center opacity-[0.5] mix-blend-multiply"
        style={{
          background: 'conic-gradient(from 90deg at 50% 50%, #f8fafc 0%, #e2e8f0 15%, #f1f5f9 30%, #cbd5e1 45%, #f8fafc 60%, #e2e8f0 75%, #f1f5f9 90%, #f8fafc 100%)',
          filter: 'blur(100px)'
        }}
      />
      
      {/* Light airy glowing orbs */}
      <motion.div 
        animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "10%", "-5%"], scale: [0.8, 1.1, 0.8] }} 
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[20%] w-[60%] h-[70%] rounded-full bg-blue-100/40 blur-[130px] mix-blend-normal"
      />
      <motion.div 
        animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-5%", "10%"], scale: [1.1, 0.8, 1.1] }} 
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-normal"
      />

      {/* Gentle intersecting light beams as accent curves */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/4 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-slate-400/30 to-transparent -rotate-45"
        />
        <motion.div 
          animate={{ x: ["200%", "-100%"], opacity: [0, 0.3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-0 w-[300%] h-[2px] bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent rotate-12"
        />
        <motion.div 
          animate={{ y: ["-100%", "200%"], opacity: [0, 0.3, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          className="absolute top-0 right-1/4 w-[1px] h-[300%] bg-gradient-to-b from-transparent via-blue-300/30 to-transparent rotate-45"
        />
      </div>

       {/* Gentle bottom fade for grounding layout to a lighter state */}
       <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-30" />
    </div>
  );
}
