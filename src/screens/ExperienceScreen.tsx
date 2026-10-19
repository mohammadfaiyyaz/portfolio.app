import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { TabType } from '../types/portfolio';

interface ExperienceScreenProps {
  onTabChange: (tab: TabType) => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ onTabChange }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['C#', '.NET 6/7', 'ASP.NET Core']);
  const [expandedDeliverable, setExpandedDeliverable] = useState<number | null>(null);

  const toggleChip = (tech: string) => {
    setSelectedChips((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-4 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded bg-[#3131c0]/20 text-[#c0c1ff] border border-[#3131c0]/40">
          <span className="material-symbols-outlined text-[16px]">work_history</span>
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">
            Career Chronicle
          </span>
        </div>
        <h1 className="font-['Inter'] text-2xl sm:text-3xl text-[#dbfcff] font-bold tracking-tight mt-1">
          Professional Experience
        </h1>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb]">
          4 Years 2 Months of delivering enterprise-grade software and healthcare micro-architectures.
        </p>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#171f33] shadow-md border border-white/[0.04]">
          <div className="flex items-center gap-1.5 text-[#4edea3]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wide font-semibold">
              Tenure Total
            </span>
          </div>
          <span className="font-['Inter'] text-2xl font-bold text-[#dae2fd]">4.2 Yrs</span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
            Enterprise C# &amp; .NET
          </span>
        </div>

        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#171f33] shadow-md border border-white/[0.04]">
          <div className="flex items-center gap-1.5 text-[#00dbe9]">
            <span className="material-symbols-outlined text-[18px]">speed</span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wide font-semibold">
              Query Latency
            </span>
          </div>
          <span className="font-['Inter'] text-2xl font-bold text-[#00f0ff]">-35%</span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
            SQL &amp; EF Optimized
          </span>
        </div>
      </div>

      {/* Timeline Node Flow */}
      <div className="flex flex-col relative">
        <div className="flex gap-4 relative">
          {/* Vertical Node Line */}
          <div className="flex flex-col items-center shrink-0 w-8">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#222a3d] shadow-sm">
              <span className="absolute w-5 h-5 rounded-full bg-[#4edea3]/20 animate-ping"></span>
              <span className="w-3 h-3 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            </div>
            <div className="w-[2px] flex-1 bg-gradient-to-b from-[#4edea3]/40 via-[#3131c0]/40 to-transparent my-1"></div>
          </div>

          {/* Node Content */}
          <div className="flex flex-col flex-1 pb-6 min-w-0">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-0.5 rounded bg-[#31394d] text-[#d8ffe7] font-bold tracking-wider uppercase border border-white/[0.06]">
                  {EXPERIENCE_DATA.period}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                  {EXPERIENCE_DATA.duration}
                </span>
              </div>

              <h2 className="font-['Inter'] text-lg sm:text-xl text-[#dae2fd] font-bold pt-1">
                {EXPERIENCE_DATA.role}
              </h2>

              <div className="flex items-center gap-1.5 text-[#00dbe9]">
                <span className="material-symbols-outlined text-[16px]">domain</span>
                <span className="font-['Inter'] text-xs sm:text-sm font-medium">
                  {EXPERIENCE_DATA.company}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#b9cacb] font-['JetBrains_Mono'] text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>{' '}
                  {EXPERIENCE_DATA.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">badge</span>{' '}
                  {EXPERIENCE_DATA.employmentType}
                </span>
              </div>
            </div>

            {/* Domain Callout */}
            <div className="mt-4 p-4 rounded-xl bg-[#131b2e] shadow-sm flex flex-col gap-1 border border-white/[0.04]">
              <div className="flex items-center gap-2 text-[#b0b2ff]">
                <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                <span className="font-['JetBrains_Mono'] text-xs font-semibold">
                  Domain: {EXPERIENCE_DATA.domain}
                </span>
              </div>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
                {EXPERIENCE_DATA.domainDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#c0c1ff] font-bold">
                  Key Architectural Deliverables
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                  5 Focus Areas
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {EXPERIENCE_DATA.deliverables.map((item, index) => {
                  const isExpanded = expandedDeliverable === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setExpandedDeliverable(isExpanded ? null : index)}
                      className="p-4 rounded-lg bg-[#171f33] hover:bg-[#1e293b] flex gap-3 shadow-sm border border-white/[0.04] transition-all cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded bg-[#222a3d] flex items-center justify-center shrink-0 text-[#00f0ff]">
                        <span className="material-symbols-outlined text-[18px]">
                          {item.icon}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#dae2fd]">
                            {item.title}
                          </span>
                          <span className="material-symbols-outlined text-[16px] text-[#849495]">
                            {isExpanded ? 'expand_less' : 'expand_more'}
                          </span>
                        </div>
                        <p className="font-['Inter'] text-xs text-[#b9cacb] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        {isExpanded && (
                          <div className="mt-2 pt-2 border-t border-white/[0.06] text-[11px] font-['JetBrains_Mono'] text-[#4edea3]">
                            ✓ Enterprise tested in high-volume production environment.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technologies Utilized interactive chips */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#b9cacb]">
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">
                  Technologies &amp; Tools Utilized (Click to Highlight)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5" id="skillChips">
                {EXPERIENCE_DATA.technologies.map((tech) => {
                  const isHighlighted = selectedChips.includes(tech);
                  return (
                    <button
                      key={tech}
                      onClick={() => toggleChip(tech)}
                      className={`font-['JetBrains_Mono'] text-xs px-2.5 py-1 rounded transition-all shadow-sm ${
                        isHighlighted
                          ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                          : 'bg-[#31394d] text-[#dae2fd] font-medium hover:bg-[#2d3449]'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Impact Box */}
      <div className="relative overflow-hidden rounded-xl bg-[#222a3d] p-5 shadow-lg flex flex-col gap-2 border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#65f2b5]/20 text-[#4edea3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase font-bold tracking-wider">
              Mission Impact
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] font-semibold">
            99.99% Availability
          </span>
        </div>

        <h3 className="font-['Inter'] text-base sm:text-lg text-[#dbfcff] font-bold mt-1">
          Mission-Critical Healthcare Reliability
        </h3>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
          Engineered zero-downtime release pipelines and high-availability database routines, guaranteeing continuous patient intake and pharmaceutical processing across active multi-chain clinical institutions.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 mt-1 bg-[#171f33]/70 p-3 rounded-lg border border-white/[0.04]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
              check_circle
            </span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd] font-medium">
              HIPAA/NABH Ready
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#00dbe9]">
              electric_bolt
            </span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd] font-medium">
              Zero-Fail Deployments
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col gap-2.5 pt-1 pb-4">
        <button
          onClick={() => onTabChange('contact')}
          id="ctaDiscussBtn"
          className="w-full h-12 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span>Discuss Work Experience</span>
        </button>

        <a
          className="w-full h-11 rounded bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-colors shadow-sm border border-white/[0.04]"
          href="https://linkedin.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[18px] text-[#00dbe9]">link</span>
          <span>Connect on LinkedIn</span>
        </a>
      </div>
    </div>
  );
};
