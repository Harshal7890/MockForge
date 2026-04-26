"use client";

import React, { useState } from 'react';
import { Search, ExternalLink, Activity, Clock, Building2 } from 'lucide-react';
import { companyData } from './data';

const companies = Object.keys(companyData);

function CompanyDSA() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const currentData = companyData[selectedCompany] || [];
  
  const filteredData = currentData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.topics.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto font-sans bg-transparent min-h-screen text-slate-800">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 mb-8 space-x-2">
        <div className="flex items-center justify-center p-1 border border-slate-200 rounded-sm mr-2 bg-white">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-700">
             <rect x="3" y="3" width="7" height="18" rx="1"></rect>
             <rect x="14" y="3" width="7" height="18" rx="1"></rect>
           </svg>
        </div>
        <span>Dashboard</span>
        <span className="mx-1">{'>'}</span>
        <span className="font-medium text-slate-900">Company-dsa</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8 mt-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-tight leading-tight mb-2">Company Specific DSA</h1>
          <p className="text-slate-500 text-base">Top frequent questions asked in interviews at leading tech companies.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search questions or topics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Companies Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2 text-sm text-slate-600 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100 items-center overflow-x-auto w-full lg:w-auto">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => setSelectedCompany(company)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCompany === company
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "hover:bg-slate-100/60 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              {company}
            </button>
          ))}
        </div>
        <div className="text-sm font-medium text-slate-500 whitespace-nowrap bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
          <span className="text-slate-900 font-semibold">{selectedCompany}</span> — Showing <span className="text-slate-900 font-bold">{filteredData.length}</span> questions
        </div>
      </div>

      {/* Table Content */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-white">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider items-center hidden md:grid">
          <div className="col-span-4">Problem Title</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-2 flex items-center gap-1.5">
            Frequency <Activity className="w-3.5 h-3.5" />
          </div>
          <div className="col-span-1 flex items-center gap-1.5">
            Acceptance <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="col-span-2">Topics</div>
          <div className="col-span-1 text-right">Link</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {filteredData.length > 0 ? filteredData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 p-6 md:px-6 md:py-4 items-start md:items-center hover:bg-slate-50/60 transition-colors group">
              {/* Problem Title Mobile/Desktop */}
              <div className="col-span-1 md:col-span-4 font-medium text-slate-800 text-base md:text-sm">
                {item.title}
              </div>
              
              {/* Difficulty */}
              <div className="col-span-1 md:col-span-2 flex justify-between md:block items-center mt-2 md:mt-0">
                <span className="md:hidden text-xs text-slate-500 font-medium">Difficulty:</span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  item.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 
                  item.difficulty === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border border-amber-100/50' : 
                  'bg-rose-50 text-rose-600 border border-rose-100/50'
                }`}>
                  {item.difficulty}
                </span>
              </div>
              
              {/* Frequency */}
              <div className="col-span-1 md:col-span-2 flex justify-between md:justify-start items-center gap-3">
                <span className="md:hidden text-xs text-slate-500 font-medium">Freq:</span>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden hidden md:block">
                    <div 
                        className="h-full bg-slate-800 rounded-full" 
                        style={{ width: `${item.frequency}%` }}
                    />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{item.frequency.toFixed(0)}%</span>
                </div>
              </div>

              {/* Acceptance */}
              <div className="col-span-1 md:col-span-1 flex justify-between md:justify-start items-center text-sm text-slate-600">
                <span className="md:hidden text-xs text-slate-500 font-medium">Acceptance:</span>
                <span>{(item.acceptance * 100).toFixed(1)}%</span>
              </div>

              {/* Topics */}
              <div className="col-span-1 md:col-span-2 flex flex-wrap gap-2.5 mt-2 md:mt-0 py-1">
                {item.topics.split(',').map(topic => (
                  <span key={topic.trim()} className="text-[11px] leading-relaxed font-medium bg-slate-100/80 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200/50 whitespace-nowrap">
                    {topic.trim()}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="col-span-1 md:col-span-1 flex justify-end absolute top-6 right-6 md:static">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 md:w-4 md:h-4" />
                </a>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                <Search className="w-8 h-8 text-slate-300 mb-3" />
                <p>No questions found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDSA;
