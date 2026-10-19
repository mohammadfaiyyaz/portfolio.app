import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';

interface ProjectsScreenProps {
  onOpenCaseStudy: (project: Project) => void;
  onOpenArchitecture: () => void;
  onOpenApiDocs: () => void;
}

type FilterType = 'all' | 'erp' | 'apis' | 'fullstack';

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onOpenCaseStudy,
  onOpenArchitecture,
  onOpenApiDocs,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [repoInspected, setRepoInspected] = useState(false);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'erp') return proj.category === 'erp';
    if (activeFilter === 'apis') return proj.category === 'apis';
    if (activeFilter === 'fullstack') return proj.category === 'fullstack' || proj.category === 'erp';
    return true;
  });

  const handleInspectRepo = () => {
    setRepoInspected(true);
    setTimeout(() => {
      window.open('https://github.com', '_blank');
      setRepoInspected(false);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-4 gap-6">
      {/* Header Section with Telemetry Badge */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#222a3d] text-[#00dbe9] font-['JetBrains_Mono'] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span>PRODUCTION PORTFOLIO</span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#849495]">
            v2.4.0-deploy
          </span>
        </div>

        <h1 className="font-['Inter'] text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight mt-1">
          Featured Projects
        </h1>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb]">
          Production systems, microservices &amp; enterprise web solutions engineered with .NET resilience.
        </p>
      </div>

      {/* Interactive Terminal Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs whitespace-nowrap shadow-sm transition-all ${
            activeFilter === 'all'
              ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
              : 'bg-[#222a3d] text-[#b9cacb] hover:bg-[#31394d]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          <span>All ({PROJECTS.length})</span>
        </button>

        <button
          onClick={() => setActiveFilter('erp')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs whitespace-nowrap transition-all ${
            activeFilter === 'erp'
              ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
              : 'bg-[#222a3d] text-[#b9cacb] hover:bg-[#31394d]'
          }`}
          type="button"
        >
          <span>Enterprise ERP</span>
        </button>

        <button
          onClick={() => setActiveFilter('apis')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs whitespace-nowrap transition-all ${
            activeFilter === 'apis'
              ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
              : 'bg-[#222a3d] text-[#b9cacb] hover:bg-[#31394d]'
          }`}
          type="button"
        >
          <span>.NET Core APIs</span>
        </button>

        <button
          onClick={() => setActiveFilter('fullstack')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs whitespace-nowrap transition-all ${
            activeFilter === 'fullstack'
              ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
              : 'bg-[#222a3d] text-[#b9cacb] hover:bg-[#31394d]'
          }`}
          type="button"
        >
          <span>Full Stack</span>
        </button>
      </div>

      {/* Project Stream */}
      <div className="flex flex-col gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col bg-[#171f33] rounded-xl overflow-hidden shadow-lg border border-white/[0.06] transition-all hover:border-[#00f0ff]/30"
          >
            {/* Project Image Banner if available */}
            {project.bannerImage ? (
              <div className="relative w-full h-44 bg-[#2d3449] overflow-hidden">
                <img
                  src={project.bannerImage}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/40 to-transparent"></div>

                {/* Status Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#060e20]/80 backdrop-blur-md text-[#4edea3] font-['JetBrains_Mono'] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                    {project.badge.text}
                  </span>
                  {project.id === 'hims' && (
                    <span className="font-['JetBrains_Mono'] text-xs text-[#00dbe9] bg-[#060e20]/80 px-2 py-0.5 rounded backdrop-blur-md">
                      20+ Hospitals
                    </span>
                  )}
                  {project.id === 'billing' && (
                    <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] bg-[#060e20]/80 px-2 py-0.5 rounded backdrop-blur-md">
                      RabbitMQ
                    </span>
                  )}
                  {project.id === 'telehealth' && (
                    <span className="font-['JetBrains_Mono'] text-xs text-[#00dbe9] bg-[#060e20]/80 px-2 py-0.5 rounded backdrop-blur-md">
                      SignalR Hub
                    </span>
                  )}
                </div>
              </div>
            ) : null}

            {/* Card Content Body */}
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              {/* If no banner, show top cluster header */}
              {!project.bannerImage && (
                <div className="flex items-center justify-between pb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#222a3d] text-[#00dbe9] font-['JetBrains_Mono'] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    {project.badge.text}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#849495]">
                    CONTAINERIZED
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] text-xs text-[#dbfcff] font-semibold tracking-wide">
                  {project.subtitle}
                </span>
                <h2 className="font-['Inter'] text-base sm:text-lg text-[#dae2fd] font-bold mt-0.5">
                  {project.title}
                </h2>
              </div>

              <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
                {project.description}
              </p>

              {/* KPI Metrics Grid if available */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#131b2e] rounded-lg my-1 border border-white/[0.04]">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase">
                        {m.label}
                      </span>
                      <span
                        className={`font-['JetBrains_Mono'] text-sm sm:text-base font-bold ${
                          m.highlight ? 'text-[#dbfcff]' : 'text-[#4edea3]'
                        }`}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Snippet for Auth Service */}
              {project.codeSnippet && (
                <div className="bg-[#060e20] p-3 rounded-lg flex flex-col gap-1.5 my-1 border border-white/[0.06]">
                  <div className="flex items-center justify-between pb-1 text-[#849495] text-xs font-['JetBrains_Mono']">
                    <span>{project.codeSnippet.filename}</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#dbfcff]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#d8ffe7]"></span>
                    </div>
                  </div>
                  <code className="font-['JetBrains_Mono'] text-xs text-[#00dbe9] leading-snug">
                    {project.codeSnippet.code}
                  </code>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#222a3d] text-[#b9cacb] font-['JetBrains_Mono'] text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactive Terminal Action Bar */}
              <div className="flex items-center justify-between gap-2 pt-2 mt-1">
                {project.id === 'hims' ? (
                  <>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold active:scale-95 transition-all shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Case Study</span>
                    </button>
                    <button
                      onClick={onOpenArchitecture}
                      className="flex items-center justify-center h-10 px-3.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">schema</span>
                      <span className="ml-1.5 hidden sm:inline">Architecture</span>
                    </button>
                  </>
                ) : project.id === 'billing' ? (
                  <>
                    <button
                      onClick={onOpenApiDocs}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold active:scale-95 transition-all shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                      <span>API Docs &amp; Flow</span>
                    </button>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex items-center justify-center h-10 px-3.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                      title="Inspect Code & Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">code</span>
                    </button>
                  </>
                ) : project.id === 'telehealth' ? (
                  <>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs font-semibold active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      <span>View Demo Flow</span>
                    </button>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex items-center justify-center h-10 px-3.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs font-semibold active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                      <span>Security Specs</span>
                    </button>
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex items-center justify-center h-10 px-3.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs active:scale-95 transition-all border border-white/[0.04]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">data_object</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Empty State if filter yields no cards */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#131b2e] rounded-xl border border-white/[0.04]">
            <div className="w-12 h-12 rounded-full bg-[#222a3d] flex items-center justify-center text-[#00dbe9] mb-3">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <span className="font-['Inter'] text-lg text-[#dae2fd] font-semibold">
              No queries resolved
            </span>
            <p className="font-['Inter'] text-xs text-[#b9cacb] mt-1 max-w-xs">
              No projects matched the selected taxonomy filter. Try resetting to 'All'.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-4 py-1.5 rounded bg-[#00f0ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Interactive Terminal Trigger Bottom Micro-Card */}
      <div className="flex items-center justify-between p-4 bg-[#060e20] rounded-xl shadow-md border border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#00f0ff] shrink-0">
            <span className="material-symbols-outlined text-[20px]">rebase_edit</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd] font-semibold truncate">
              Enterprise Repository
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] truncate">
              github.com/MohammadFaiyyaz
            </span>
          </div>
        </div>
        <button
          onClick={handleInspectRepo}
          className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#7df4ff] font-['JetBrains_Mono'] text-xs font-semibold active:scale-95 transition-all border border-white/[0.04]"
          type="button"
        >
          <span>{repoInspected ? 'Opening...' : 'Inspect'}</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
