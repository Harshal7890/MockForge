"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { fetchAptitudeQuestions, submitAptitudeTest } from "@/lib/actions/aptitude";
import { Button } from "@/components/ui/button";
import { 
  LoaderCircle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Timer, 
  AlertCircle 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function StartAptitudeTest() {
  const { testId } = useParams();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();
  const { user } = useUser();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Stores { index: selectedOptionValue }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Timer state (35 minutes)
  const [timeLeft, setTimeLeft] = useState(35 * 60);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (category) {
      loadQuestions();
    }
  }, [category]);

  // Timer Effect
  useEffect(() => {
    if (loading || submitting || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, submitting, questions.length]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await fetchAptitudeQuestions(category);
      
      if (data && Array.isArray(data)) {
        setQuestions(data);
      } else {
        console.error("API did not return an array:", data);
        setQuestions([]);
      }
    } catch (error) {
      console.error("Failed to load questions:", error);
      toast.error("Failed to load questions. Please try again.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionValue,
    }));
  };

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setShowConfirmDialog(false);

    const formattedAnswers = questions.map((q, index) => ({
      question: q.question,
      correct_answer: q.answer, // API uses 'answer'
      user_answer: userAnswers[index] || null,
    }));

    try {
      const result = await submitAptitudeTest({
        mockId: testId,
        category: category,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        questions: formattedAnswers,
      });

      if (result.success) {
        toast.success("Test submitted successfully!");
        router.push(`/dashboard/aptitude/${testId}/feedback`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit test. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [questions, userAnswers, testId, category, user, router]);

  const handleAutoSubmit = () => {
    toast.info("Time is up! Autosubmitting your test...");
    handleSubmit();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getUnattemptedIndexes = () => {
    const unattempted = [];
    questions.forEach((_, index) => {
      if (!userAnswers[index]) {
        unattempted.push(index + 1);
      }
    });
    return unattempted;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoaderCircle className="animate-spin h-10 w-10 text-indigo-600 mb-2" />
        <p className="text-slate-500 font-medium">Fetching your {category} questions...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4 mt-20">
        <h2 className="text-xl font-bold text-slate-800">No questions found for this category.</h2>
        <Button onClick={() => router.back()} className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">Go Back</Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const unattempted = getUnattemptedIndexes();
  const attemptedCount = questions.length - unattempted.length;

  return (
    <div className="p-5 md:p-10 max-w-5xl mx-auto pb-32">
      {/* Sticky Timer Bar */}
      <div className="sticky top-6 z-20 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm rounded-2xl mb-10 py-4 flex justify-between items-center px-6 md:px-8 mx-auto transition-all duration-300">
        <div>
          <h2 className="text-xl font-extrabold capitalize text-slate-800 tracking-tight">{category} <span className="font-medium text-slate-400">Assessment</span></h2>
          <p className="text-xs text-indigo-600 hidden md:block font-bold mt-1 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        
        <div className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow-sm transition-all duration-300 ${
          timeLeft < 300 ? "bg-red-50 text-red-600 border border-red-200 animate-pulse shadow-red-500/10" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
        }`}>
          <Timer size={18} className={timeLeft < 300 ? "animate-bounce" : ""} />
          <span className="font-mono font-bold text-lg tracking-wider">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
        <h3 className="text-[22px] md:text-2xl font-bold mb-10 leading-relaxed text-slate-800 drop-shadow-sm">{currentQuestion.question}</h3>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          {currentQuestion.options && Array.isArray(currentQuestion.options) ? (
            currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-5 group/option outline-none ${
                  userAnswers[currentQuestionIndex] === option
                    ? "border-2 border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-500/10 text-indigo-800 transform scale-[1.01]"
                    : "border-2 border-slate-100 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100 text-slate-700 hover:shadow-sm"
                }`}
              >
                <div className={`h-10 w-10 shrink-0 rounded-xl border-2 flex items-center justify-center text-[15px] font-bold transition-all duration-300 shadow-sm ${
                  userAnswers[currentQuestionIndex] === option 
                     ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/30 scale-110" 
                     : "bg-white border-slate-200 text-slate-500 group-hover/option:text-indigo-600 group-hover/option:border-indigo-300"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-semibold text-[17px] leading-relaxed">{option}</span>
              </div>
            ))
          ) : (
            <p className="text-red-700 bg-red-50 font-medium p-6 rounded-2xl border-2 border-red-200 text-center">Error loading options for this question. Please refresh.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center mt-12 px-2 gap-4">
        <Button
          variant="outline"
          size="lg"
          className="rounded-xl border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300 shadow-sm px-6 h-14 font-semibold"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 active:scale-95 px-8 h-14 font-semibold" 
            disabled={submitting}
            onClick={() => setShowConfirmDialog(true)}
          >
            {submitting ? (
              <><LoaderCircle className="animate-spin mr-2 h-5 w-5" /> Submitting...</>
            ) : (
              <><CheckCircle2 className="mr-2 h-5 w-5" /> Finish Assessment</>
            )}
          </Button>
        ) : (
          <Button 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 active:scale-95 px-8 h-14 font-semibold"
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Question Navigator */}
      <div className="mt-16 flex justify-center">
         <div className="inline-flex flex-wrap gap-2.5 justify-center bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner max-w-3xl">
           {questions.map((_, idx) => (
             <div
               key={idx}
               onClick={() => setCurrentQuestionIndex(idx)}
               className={`h-11 w-11 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all duration-300 font-bold text-sm select-none ${
                 currentQuestionIndex === idx 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/30 scale-110 z-10" : 
                 userAnswers[idx] 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 shadow-sm" 
                    : "bg-white hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 border-slate-200 text-slate-500 shadow-sm"
               }`}
             >
               {idx + 1}
             </div>
           ))}
         </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-0 overflow-hidden">
          <div className="p-8 pb-6">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 shadow-sm ring-1 ring-yellow-200">
                   <AlertCircle size={20} />
                 </div>
                 <DialogTitle className="text-2xl font-bold text-slate-800">
                   Finish Test?
                 </DialogTitle>
              </div>
            </DialogHeader>

            <DialogDescription asChild>
              <div className="mt-6">
                <p className="text-slate-600 font-medium mb-6 text-[15px] leading-relaxed">
                  You are about to finish and submit your aptitude assessment. Please confirm your action.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200 shadow-sm text-center">
                    <p className="text-[11px] text-green-700 font-bold uppercase tracking-widest mb-2">Attempted</p>
                    <p className="text-3xl font-extrabold text-green-700">{attemptedCount}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm text-center">
                    <p className="text-[11px] text-red-700 font-bold uppercase tracking-widest mb-2">Unattempted</p>
                    <p className="text-3xl font-extrabold text-red-700">{unattempted.length}</p>
                  </div>
                </div>

                {unattempted.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 mb-3 tracking-wide">Unattempted Questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {unattempted.map((num) => (
                        <span key={num} className="h-7 w-7 flex items-center justify-center bg-white border border-slate-200 shadow-sm rounded-lg text-xs font-bold text-slate-600">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </div>
          
          <div className="flex gap-3 justify-end p-6 border-t border-slate-100 bg-slate-50/50">
            <Button variant="ghost" onClick={() => setShowConfirmDialog(false)} className="rounded-xl px-6 font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              Go Back
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 shadow-md shadow-green-500/20 active:scale-95 transition-all font-semibold" 
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <LoaderCircle className="animate-spin w-5 h-5 mr-2" /> : null}
              Confirm & Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
