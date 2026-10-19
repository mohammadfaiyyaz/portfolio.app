import React from 'react';
import { Project } from '../types/portfolio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenArchitecture?: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenArchitecture,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0b1326] border border-[#00f0ff]/30 rounded-xl flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px] shrink-0">
              verified
            </span>
            <div className="min-w-0">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#00dbe9] uppercase tracking-wider block truncate">
                {project.subtitle}
              </span>
              <h3 className="font-['Inter'] text-sm sm:text-base font-bold text-[#dbfcff] truncate">
                {project.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors shrink-0 ml-2"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-[#dae2fd]">
          {/* Banner if exists */}
          {project.bannerImage && (
            <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-white/[0.08]">
              <img
                src={project.bannerImage}
                alt={project.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#060e20]/90 backdrop-blur-md text-[#4edea3] font-['JetBrains_Mono'] text-xs font-semibold">
                  {project.badge.text}
                </span>
                <div className="flex gap-2">
                  {project.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[#060e20]/90 backdrop-blur-md text-[#dbfcff] font-['JetBrains_Mono'] text-xs font-bold"
                    >
                      {m.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-1.5">
              // System Overview
            </h4>
            <p className="text-sm leading-relaxed text-[#b9cacb]">
              {project.description}
            </p>
          </div>

          {/* Deep Dive: Challenge vs Solution */}
          {project.caseStudyDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Inter']">
              <div className="p-3.5 rounded-xl bg-[#131b2e] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#ffb4ab] font-['JetBrains_Mono'] font-bold">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>ENGINEERING CHALLENGE</span>
                </div>
                <p className="text-[#b9cacb] leading-relaxed">
                  {project.caseStudyDetails.challenge}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#131b2e] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#4edea3] font-['JetBrains_Mono'] font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>ARCHITECTURAL SOLUTION</span>
                </div>
                <p className="text-[#b9cacb] leading-relaxed">
                  {project.caseStudyDetails.solution}
                </p>
              </div>
            </div>
          )}

          {/* Measurable Results */}
          {project.caseStudyDetails?.results && (
            <div className="p-4 rounded-xl bg-[#171f33] border border-white/[0.06] space-y-2">
              <h4 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#4edea3] font-bold">
                // Verifiable Production Outcomes
              </h4>
              <ul className="text-xs text-[#b9cacb] space-y-1.5 list-disc list-inside">
                {project.caseStudyDetails.results.map((res, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-[#dae2fd]">{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-2">
              // Technologies Deployed
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[#222a3d] text-[#dbfcff] font-['JetBrains_Mono'] text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-between text-xs">
          {onOpenArchitecture && project.id === 'hims' ? (
            <button
              onClick={() => {
                onClose();
                onOpenArchitecture();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#00dbe9] font-['JetBrains_Mono'] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">schema</span>
              <span>Inspect Architecture</span>
            </button>
          ) : (
            <span className="font-['JetBrains_Mono'] text-[#849495]">
              Production Grade Deliverable
            </span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
