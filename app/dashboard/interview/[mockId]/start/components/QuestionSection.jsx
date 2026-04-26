"use client";

import { Volume1, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function QuestionsSection({
  questions,
  activeIndex,
  setActiveIndex,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Hooks always run
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeIndex]);

  // THEN conditional rendering
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 p-6 md:p-8 flex flex-col relative overflow-hidden">
        <h2 className="text-xl font-bold mb-2 text-slate-800">Interview Questions</h2>
        <p className="text-slate-500 mt-4 text-center p-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">No questions found.</p>
      </div>
    );
  }

  const activeQuestion = questions[activeIndex];

  const speakQuestion = (text) => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 p-6 md:p-8 flex flex-col relative overflow-hidden h-full">
      <div className="relative z-10 mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Interview Questions</h2>
        <p className="text-sm text-slate-500 mt-1">Review the questions and answer thoughtfully.</p>
      </div>

      {/* Pagination Pills */}
      <div className="flex gap-2.5 mb-8 flex-wrap relative z-10">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center justify-center min-w-[44px] h-10 px-4 rounded-xl border text-sm font-semibold transition-all ${
              activeIndex === index
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-105"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            }`}
          >
            Q{index + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="relative z-10 flex flex-col gap-4 p-6 md:p-8 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-inner flex-1">
        
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center justify-center rounded-lg bg-blue-100/80 px-2.5 py-1 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-blue-200">
             Question {activeIndex + 1}
          </div>
          
          <button
            onClick={() => speakQuestion(activeQuestion.question)}
            className={`p-2.5 rounded-full transition-all flex-shrink-0 shadow-sm border ${
              isSpeaking 
                 ? "bg-blue-600 border-blue-600 text-white shadow-blue-500/30 scale-105 animate-pulse" 
                 : "bg-white border-blue-100 text-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
            }`}
            title={isSpeaking ? "Stop reading" : "Read question aloud"}
          >
            {isSpeaking ? <Volume2 size={20} /> : <Volume1 size={20} />}
          </button>
        </div>

        <p className="font-medium text-[19px] text-slate-800 leading-relaxed mt-2">
          {activeQuestion.question}
        </p>

      </div>
    </div>
  );
}
