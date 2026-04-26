"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { createMockInterview } from "@/lib/actions/interview";

function AddNewInterview() {
  const { user } = useUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperiance, setJobExperiance] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("jobPosition", jobPosition);
    formData.append("jobDesc", jobDesc);
    formData.append("jobExperience", jobExperiance);
    formData.append("createdBy", user?.primaryEmailAddress?.emailAddress);

    try {
      const result = await createMockInterview(formData);

      if (result.success) {
        router.push(`/dashboard/interview/${result.mockId}`);
        setOpenDialog(false);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error("Failed to create interview:", err);
      alert("Failed to generate interview. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="group flex h-full min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-500/5"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 shadow-sm ring-1 ring-blue-100">
          <Plus size={28} />
        </div>
        <div>
          <h2 className="text-[19px] font-bold text-slate-800">Add New Interview</h2>
          <p className="mt-1 text-sm text-slate-500">Create a new AI mock interview</p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden p-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40 pointer-events-none" />
          
          <div className="p-8 md:p-10 relative">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 shadow-sm ring-1 ring-blue-200">
                   <Sparkles size={20} />
                 </div>
                 <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-800">
                   Job Details
                 </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed">
                Add details about your job position, job description and
                years of experience to generate tailored questions.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
              <div className="space-y-6">
                <div className="group/input">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block group-focus-within/input:text-blue-600 transition-colors">
                    Job Role / Job Position
                  </label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 h-12 rounded-xl transition-all shadow-sm"
                  />
                </div>

                <div className="group/input">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block group-focus-within/input:text-blue-600 transition-colors">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    placeholder="Ex. React, Node.js etc"
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 min-h-[120px] resize-none rounded-xl transition-all shadow-sm"
                  />
                </div>

                <div className="group/input">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block group-focus-within/input:text-blue-600 transition-colors">
                    Years of Experience
                  </label>
                  <Input
                    placeholder="Ex. 2"
                    type="number"
                    max="50"
                    required
                    onChange={(e) => setJobExperiance(e.target.value)}
                    className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 h-12 rounded-xl transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4 pt-6 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                  className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl px-6 transition-colors"
                >
                  Cancel
                </Button>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 rounded-xl px-8 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
