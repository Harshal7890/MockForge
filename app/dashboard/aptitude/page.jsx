"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle, BrainCircuit, Trash2, Plus, Calendar } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { getTestHistory, deleteAptitudeTest } from "@/lib/actions/aptitude";
import { toast } from "sonner";

export default function AptitudeDashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [testHistory, setTestHistory] = useState([]);
  const [fetchingHistory, setFetchingHistory] = useState(true);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    setFetchingHistory(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const result = await getTestHistory(email);
      setTestHistory(result);
    } catch (error) {
      console.error("Error fetching test history:", error);
    } finally {
      setFetchingHistory(false);
    }
  };
const handleStartTest = () => {
  if (!category) return;
  setLoading(true);
  const testId = uuidv4();
  router.push(`/dashboard/aptitude/${testId}/start?category=${category}`);
};

const onDeleteTest = async (mockId) => {
  if (window.confirm("Are you sure you want to delete this test?")) {
    try {
      const result = await deleteAptitudeTest(mockId);
      if (result.success) {
        toast.success("Test deleted successfully");
        fetchHistory(); // Refresh the list
      } else {
        toast.error("Failed to delete test");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  }
};

return (
  <div className="p-10 max-w-7xl mx-auto mb-10">
    <div className="mb-10">
      <h2 className="font-extrabold text-4xl flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        <BrainCircuit className="text-indigo-600 w-10 h-10" />
        Aptitude Assessments
      </h2>
      <p className="text-slate-500 mt-3 text-lg font-medium tracking-wide">Sharpen your cognitive skills with AI-driven testing and personalized insights.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
      
      {/* New Test Trigger */}
      <div
        className="group flex h-full min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50/80 hover:shadow-lg hover:shadow-indigo-500/5"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 shadow-sm ring-1 ring-indigo-200/50">
          <Plus size={28} />
        </div>
        <div>
          <h2 className="text-[19px] font-bold text-slate-800">Launch New Test</h2>
          <p className="mt-1 text-sm text-slate-500">Select a category to begin</p>
        </div>
      </div>

      {/* Render History */}
      {!fetchingHistory && testHistory.map((test, index) => (
        <div key={index} className="border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 rounded-2xl p-6 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1 min-h-[220px] overflow-hidden">
          
          <button 
            onClick={() => onDeleteTest(test.mockId)}
            className="absolute top-4 right-4 p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            title="Delete Test"
          >
            <Trash2 size={16} />
          </button>
          
          <div>
            <div className="inline-flex items-center px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-[11px] uppercase tracking-wider rounded-md mb-4 border border-indigo-100 shadow-sm">
              Score: {test.score}/{test.totalQuestions}
            </div>
            <h2 className="font-bold text-xl text-slate-800 capitalize pr-8 mb-1 leading-tight">
              {test.category.replace(/([A-Z])/g, ' $1').trim()} Test
            </h2>
            <div className="flex items-center gap-2 mt-3 text-sm font-medium text-slate-500">
              <Calendar size={14} className="text-slate-400" />
              {new Date(test.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </div>
          </div>
          <div className="flex flex-col mt-6 pt-5 border-t border-slate-100">
             <Link href={`/dashboard/aptitude/${test.mockId}/feedback`} className="w-full">
                <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm transition-all rounded-xl h-10 font-semibold text-[13px]">
                   View Detailed Feedback
                </Button>
             </Link>
          </div>
        </div>
      ))}

      {fetchingHistory && (
        <div className="flex justify-center items-center col-span-full py-20 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
          <LoaderCircle className="animate-spin text-indigo-500 w-8 h-8" />
        </div>
      )}

      {!fetchingHistory && testHistory.length === 0 && (
        <div className="col-span-full text-center py-16 text-slate-500 border-2 rounded-3xl border-dashed border-slate-200 bg-slate-50 flex flex-col items-center gap-3">
          <div className="p-4 bg-white rounded-full shadow-sm mb-2">
            <BrainCircuit className="w-8 h-8 text-indigo-300" />
          </div>
          <p className="text-lg font-bold text-slate-700">No assessments taken yet.</p>
          <p className="text-sm text-slate-500">Start your first test to unlock AI insights!</p>
        </div>
      )}
    </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden p-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-purple-50/40 pointer-events-none" />
          
          <div className="p-8 relative">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100/80 text-indigo-600 shadow-sm ring-1 ring-indigo-200">
                   <BrainCircuit size={20} />
                 </div>
                 <DialogTitle className="text-2xl font-bold text-slate-800">
                   Select Category
                 </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-slate-500 mt-2">
                Choose a category to begin your aptitude assessment.
              </DialogDescription>
            </DialogHeader>

            <div className="my-8 group/input relative z-10">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2 block group-focus-within/input:text-indigo-600 transition-colors">Category</label>
              <select 
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-[15px] font-medium text-slate-800 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select a category</option>
                <option value="Random">Random</option>
                <option value="MixtureAndAlligation">Mixture And Alligation</option>
                <option value="Age">Age</option>
                <option value="PermutationAndCombination">Permutation & Combination</option>
                <option value="ProfitAndLoss">Profit And Loss</option>
                <option value="SpeedTimeDistance">Speed, Time & Distance</option>
                <option value="Calendar">Calendar</option>
                <option value="SimpleInterest">Simple Interest</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 relative z-10">
              <Button variant="ghost" className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl px-6 transition-colors font-semibold" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleStartTest} disabled={loading || !category} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-500/20 rounded-xl px-8 transition-all active:scale-95 flex items-center justify-center gap-2">
                {loading ? <LoaderCircle className="animate-spin h-5 w-5" /> : "Start Test"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
