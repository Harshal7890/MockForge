"use client";

import React, { useState } from "react";
import { 
  Search, 
  Map as MapIcon, 
  Monitor, 
  Server, 
  Database, 
  BrainCircuit, 
  Code2, 
  FileBox, 
  Bot,
  Eye,
  Download,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const roadmaps = [
  {
    id: 1,
    title: "Frontend Development",
    category: "DEVELOPMENT",
    categoryColor: "text-orange-600",
    gradient: "from-blue-50 to-white",
    icon: <Monitor className="w-10 h-10 text-blue-500" />,
    description: "Complete guide to HTML, CSS, JavaScript, React, and modern frontend tools.",
    pdfUrl: "/roadmaps/frontend.pdf",
  },
  {
    id: 2,
    title: "Backend Engineering",
    category: "ENGINEERING",
    categoryColor: "text-slate-600",
    gradient: "from-green-50 to-white",
    icon: <Server className="w-10 h-10 text-green-500" />,
    description: "Essential concepts for backend systems, APIs, databases, and server management.",
    pdfUrl: "/roadmaps/backend.pdf",
  },
  {
    id: 3,
    title: "Data Engineering",
    category: "DATA",
    categoryColor: "text-slate-600",
    gradient: "from-purple-50 to-white",
    icon: <Database className="w-10 h-10 text-purple-500" />,
    description: "A comprehensive roadmap and cheat sheet for data pipelines, warehousing, and big data.",
    pdfUrl: "/roadmaps/data.pdf",
  },
  {
    id: 4,
    title: "AI Engineer",
    category: "AI/ML",
    categoryColor: "text-slate-600",
    gradient: "from-rose-50 to-white",
    icon: <BrainCircuit className="w-10 h-10 text-rose-500" />,
    description: "Key concepts in Artificial Intelligence, Machine Learning, and Neural Networks.",
    pdfUrl: "/roadmaps/ai.pdf",
  },
  {
    id: 5,
    title: "DevOps Practices",
    category: "OPERATIONS",
    categoryColor: "text-orange-600",
    gradient: "from-orange-50 to-white",
    icon: <Code2 className="w-10 h-10 text-orange-500" />,
    description: "Quick reference for CI/CD, Docker, Kubernetes, and cloud infrastructure.",
    pdfUrl: "/roadmaps/devops.pdf",
  },
  {
    id: 6,
    title: "System Design",
    category: "ARCHITECTURE",
    categoryColor: "text-slate-600",
    gradient: "from-teal-50 to-white",
    icon: <FileBox className="w-10 h-10 text-teal-500" />,
    description: "Scalability patterns, distributed systems, and architectural best practices.",
    pdfUrl: "/roadmaps/system-design.pdf",
  },
  {
    id: 7,
    title: "Claude Code",
    category: "AI TOOLS",
    categoryColor: "text-slate-600",
    gradient: "from-indigo-50 to-white",
    icon: <Bot className="w-10 h-10 text-indigo-500" />,
    description: "Reference for the Claude Code tool.",
    pdfUrl: "/roadmaps/claude-code.pdf",
  },
];

export default function RoadmapsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoadmaps = roadmaps.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full">
      {/* Breadcrumb Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-slate-500 gap-2 mb-2">
            <div className="p-1 border border-slate-200 rounded bg-white">
              <MapIcon className="w-4 h-4 text-slate-700" />
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Dashboard</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-medium tracking-wide">Cheatsheets</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 italic tracking-tight">
            The Developer&#39;s Vault
          </h1>
          <p className="text-slate-500 text-lg">
            Turbocharge your learning with curated roadmaps, cheat sheets, and technical deep-dives.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Input 
            placeholder="Search roadmaps by title or category..." 
            className="rounded-full pl-4 pr-10 py-5 border-slate-200 shadow-sm focus-visible:ring-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredRoadmaps.map((card, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            key={card.id}
            className="flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300 transition-all duration-300 ease-out group relative cursor-pointer"
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${card.gradient}`}></div>
            
            <div className="px-6 pt-10 pb-6 flex-1 flex flex-col items-center text-center relative z-10">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <span className={`text-[10px] font-bold tracking-widest ${card.categoryColor} uppercase mb-2`}>
                {card.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 italic mt-1 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3 relative z-10">
              <a 
                href={card.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
                onClick={(e) => {
                  // Prevent navigation if the user hasn't added the PDF yet
                  if (!card.pdfUrl || card.pdfUrl === "#") {
                    e.preventDefault();
                    alert(`Please place the PDF for ${card.title} in the public/roadmaps folder.`);
                  }
                }}
              >
                <Eye className="w-4 h-4" /> View
              </a>
              <a 
                href={card.pdfUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium shadow-sm transition-colors cursor-pointer"
                onClick={(e) => {
                  if (!card.pdfUrl || card.pdfUrl === "#") {
                    e.preventDefault();
                    alert(`Please place the PDF for ${card.title} in the public/roadmaps folder.`);
                  }
                }}
              >
                <Download className="w-4 h-4" /> Fetch
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
