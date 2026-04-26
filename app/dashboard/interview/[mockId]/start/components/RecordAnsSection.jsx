"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

const SpeechRecorder = dynamic(() => import("./SpeechRecorder"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center gap-4 h-full min-h-[350px] w-full rounded-2xl bg-slate-50/50 border border-slate-100 shadow-inner p-8">
      <LoaderCircle className="animate-spin text-blue-500" size={32} />
      <span className="text-sm font-medium text-slate-500">Loading recording engine...</span>
    </div>
  ),
});

export default function RecordAnsSection({ mockId, activeQuestion, user }) {
  return (
    <SpeechRecorder
      mockId={mockId}
      activeQuestion={activeQuestion}
      user={user}
    />
  );
}
