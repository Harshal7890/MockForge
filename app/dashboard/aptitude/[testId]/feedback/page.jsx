"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LoaderCircle, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Lightbulb, 
  ArrowLeft,
  ChevronDown,
  Target
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { getAptitudeFeedback } from "@/lib/actions/aptitude";

export default function AptitudeFeedback() {
  const { testId } = useParams();
  const router = useRouter();
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, [testId]);

  const fetchFeedback = async () => {
    try {
      const result = await getAptitudeFeedback(testId);
      setTestData(result.testData);
      setAnswers(result.answers);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoaderCircle className="animate-spin h-10 w-10 text-indigo-600 mb-2" />
        <p className="text-slate-500 font-medium">Loading your results...</p>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4 mt-20">
        <h2 className="text-xl font-bold text-slate-800">Feedback not found.</h2>
        <Link href="/dashboard/aptitude">
          <Button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const percentage = Math.round((testData.score / testData.totalQuestions) * 100);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 mb-20 mt-4">
      <Link href="/dashboard/aptitude" className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-indigo-600 transition-colors font-semibold text-[15px]">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      {/* Hero Header Section */}
      <div className="mb-8 p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50 text-yellow-500 shadow-sm ring-1 ring-yellow-100 mb-6">
          <Trophy size={40} className="drop-shadow-sm" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight">Assessment Complete!</h2>
        <p className="mt-4 text-[17px] text-slate-500 font-medium tracking-wide max-w-xl mx-auto">Review your performance insights for the <span className="text-indigo-600 font-bold capitalize">{testData.category}</span> category.</p>

        <div className="mt-10 inline-flex flex-col items-center px-12 py-6 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-[320px] shadow-inner relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
           <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
             <Target size={16} className="text-indigo-500" />
             Your Final Score
           </span>
           <div className="flex items-baseline justify-center">
             <span className="text-[64px] font-bold text-indigo-600 tracking-tighter leading-none drop-shadow-sm">
               {testData.score}
             </span>
             <span className="text-2xl text-slate-400 font-medium ml-1 tracking-normal">/{testData.totalQuestions}</span>
           </div>
           <div className="mt-4 inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 font-bold text-[13px] rounded-full ring-1 ring-indigo-200">
             {percentage}% Accuracy
           </div>
        </div>
      </div>

      {/* AI Insights Block */}
      <div className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 text-indigo-700">
          <Lightbulb size={24} className="fill-indigo-100" />
          <h3 className="text-xl font-bold tracking-tight">AI Insights</h3>
        </div>
        <p className="text-indigo-900/80 leading-relaxed text-[16px] font-medium italic relative z-10">
          "{testData.aiFeedback}"
        </p>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Detailed Review</h3>
        
        {answers.map((item, index) => (
          <Collapsible key={index} className="group rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-lg hover:border-slate-300">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 px-6 md:px-8 text-left transition-colors hover:bg-slate-50/80">
              <div className="flex items-center gap-4 pr-6">
                <div className={`shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-sm ring-1 ${item.isCorrect === 'true' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-red-50 text-red-600 ring-red-200'}`}>
                  {item.isCorrect === 'true' ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <XCircle size={24} />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                   <h2 className="font-semibold text-[16px] sm:text-[17px] text-slate-800 leading-relaxed group-data-[state=open]:text-indigo-700 transition-colors line-clamp-2">
                     {item.questionText}
                   </h2>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                 <div className={`hidden sm:block px-4 py-1.5 rounded-full text-[13px] font-bold shadow-sm ring-1 uppercase tracking-wider ${item.isCorrect === 'true' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 border-emerald-100' : 'bg-red-50 text-red-700 ring-red-200 border-red-100'}`}>
                    {item.isCorrect === 'true' ? 'Correct' : 'Incorrect'}
                 </div>
                 <div className="h-10 w-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100 transition-colors">
                    <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0" />
                 </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* User Answer */}
                <div className={`rounded-2xl border p-5 shadow-sm relative overflow-hidden ${item.isCorrect === 'true' ? 'border-emerald-100 bg-emerald-50/40' : 'border-red-100 bg-red-50/40'}`}>
                   <div className={`absolute top-0 left-0 w-1 h-full ${item.isCorrect === 'true' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                   <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${item.isCorrect === 'true' ? 'text-emerald-500 bg-emerald-500' : 'text-red-500 bg-red-500'}`}></span>
                     Your Answer
                   </p>
                   <p className={`font-bold text-lg ${item.isCorrect === 'true' ? 'text-emerald-800' : 'text-red-800'}`}>
                     {item.userAnswer ? item.userAnswer : <span className="italic font-medium opacity-80">Skipped / No Answer</span>}
                   </p>
                </div>

                {/* Correct Answer */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>
                   <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] text-indigo-500 bg-indigo-500"></span>
                     Expected Correct Answer
                   </p>
                   <p className="font-bold text-lg text-indigo-800">
                     {item.correctAnswer}
                   </p>
                </div>
              </div>

              {item.isCorrect !== 'true' && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5 flex gap-3 items-start mt-2">
                   <Lightbulb className="text-indigo-500 shrink-0 mt-0.5" size={18} />
                   <p className="text-[14px] text-indigo-900 leading-relaxed">
                     <strong>Study Tip:</strong> Focus closely on the logical progression required for {testData.category} questions to avoid repeating this sort of mistake.
                   </p>
                </div>
              )}

            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link href="/dashboard/aptitude" className="w-full sm:w-auto">
          <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all h-14 font-semibold px-8">
            Take Another Assessment
          </Button>
        </Link>
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl shadow-sm h-14 font-semibold px-8 transition-colors">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
