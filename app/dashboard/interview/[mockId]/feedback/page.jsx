import { db } from "@/lib/db/index";
import { UserAnswer } from "@/lib/db/schema/index";
import { eq } from "drizzle-orm";
import { ChevronsUpDown, CheckCircle2, ChevronDown, UserSquare2, Bot, ArrowLeft, Star, FileCheck2 } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default async function Feedback({ params }) {
  const { mockId } = await params;

  const result = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef, mockId))
    .orderBy(UserAnswer.id);

  const avgRating = result.length > 0
    ? result.reduce((sum, r) => sum + Number(r.rating || 0), 0) / result.length
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 mb-20 mt-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-[15px]">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      {/* Header Section */}
      <div className="mb-10 p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-green-100/50 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-100/50 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 shadow-sm ring-1 ring-green-100 mb-4 shadow-green-500/10">
          <CheckCircle2 size={32} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-tight">Congratulations!</h2>
        <p className="mt-2 text-[15px] text-slate-500 font-medium tracking-wide">Here is your detailed interview feedback.</p>

        <div className="mt-6 inline-flex flex-col items-center px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-[240px] shadow-inner">
           <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
             <Star size={14} className="text-yellow-500 fill-yellow-500" />
             Overall Rating
           </span>
           <span className="text-[40px] font-bold text-blue-600 tracking-tighter leading-none drop-shadow-sm">
             {avgRating.toFixed(1)}<span className="text-xl text-slate-400 font-medium ml-1 tracking-normal">/10</span>
           </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center h-10 w-10 bg-blue-100 text-blue-600 rounded-xl ring-1 ring-blue-100">
             <FileCheck2 size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Question Breakdown</h3>
        </div>
        
        {result.map((item, idx) => (
          <Collapsible key={item.id} className="group rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-lg hover:border-slate-300">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 px-6 md:px-8 text-left transition-colors hover:bg-slate-50/80">
              <div className="flex flex-col gap-1.5 pr-6">
                 <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest">Question {idx + 1}</span>
                 <h2 className="font-semibold text-[17px] text-slate-800 leading-relaxed group-data-[state=open]:text-blue-700 transition-colors">
                   {item.question || item.questions}
                 </h2>
              </div>
              <div className="flex items-center gap-5">
                 <div className={`hidden md:flex px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ring-1 ${Number(item.rating) >= 7 ? 'bg-green-50 text-green-700 ring-green-200' : Number(item.rating) >= 4 ? 'bg-yellow-50 text-yellow-700 ring-yellow-200' : 'bg-red-50 text-red-700 ring-red-200'}`}>
                   {item.rating}/10
                 </div>
                 <div className="h-10 w-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100 transition-colors">
                    <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0" />
                 </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8 flex flex-col gap-6">
              
              <div className="flex md:hidden items-center justify-between p-4 rounded-xl shadow-sm ring-1 bg-white ring-slate-100 mb-2">
                <span className="text-[13px] font-bold text-slate-600 tracking-wide">RATING:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ring-1 ${Number(item.rating) >= 7 ? 'bg-green-50 text-green-700 ring-green-200' : Number(item.rating) >= 4 ? 'bg-yellow-50 text-yellow-700 ring-yellow-200' : 'bg-red-50 text-red-700 ring-red-200'}`}>
                  {item.rating}/10
                </span>
              </div>

              {/* User Answer */}
              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                 <div className="flex items-center gap-2.5 mb-3 text-red-700">
                    <UserSquare2 size={20} />
                    <span className="font-bold text-sm tracking-widest">YOUR ANSWER</span>
                 </div>
                 <p className="text-red-900 leading-relaxed text-[15px]">{item.userAns}</p>
              </div>

              {/* Expected / Feedback */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                    <Bot size={20} />
                    <span className="font-bold text-sm tracking-widest">AI FEEDBACK & SUGGESTIONS</span>
                 </div>
                 <p className="text-blue-900/90 leading-relaxed text-[15px] whitespace-pre-wrap">{item.feedback}</p>
              </div>

              {/* System Ideal Answer - optional fallback if expected */}
              {item.correctAns && (
                <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                   <div className="flex items-center gap-2.5 mb-3 text-green-700">
                      <CheckCircle2 size={20} />
                      <span className="font-bold text-sm tracking-widest">IDEAL ANSWER</span>
                   </div>
                   <p className="text-green-900 leading-relaxed text-[15px]">{item.correctAns}</p>
                </div>
              )}

            </CollapsibleContent>
          </Collapsible>
        ))}
        
        {result.length === 0 && (
          <div className="text-center p-12 bg-white border-[2px] border-slate-200 border-dashed rounded-3xl mt-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">No Feedback Available</h2>
            <p className="text-[15px] text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">We couldn't find any recorded answers. Ensure you've completed this interview session and verified your responses.</p>
          </div>
        )}
      </div>

    </div>
  );
}
