"use client";


import SplitText from "@/components/SplitText";

import Navbar from "./dashboard/_components/Navbar";
import SplashCursor from "@/components/SplashCursor";


export default function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <SplashCursor/>
      <Navbar/>
     
      
      <div className="relative z-10 flex items-center  min-h-screen">
        <SplitText
          text="Practice Real AI Interviews"
          className="text-2xl md:text-6xl font-bold text-white text-center"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
          onLetterAnimationComplete={handleAnimationComplete}
          showCallback
        />
      </div>
    </div>
  );
}
