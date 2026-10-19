import React, { useState } from 'react';
import { ASSETS } from '../data/portfolioData';
import { TabType } from '../types/portfolio';

interface OverviewScreenProps {
  onTabChange: (tab: TabType) => void;
  onOpenResume: () => void;
  onOpenArchitecture: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onTabChange,
  onOpenResume,
  onOpenArchitecture,
}) => {
  const [resumeDownloading, setResumeDownloading] = useState(false);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeDownloading(true);
    setTimeout(() => {
      setResumeDownloading(false);
      onOpenResume();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-12 pt-2">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-24 -right-12 w-40 h-40 bg-[#3131c0]/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Hero Content */}
        <div className="flex flex-col pt-3 pb-5 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-[#222a3d]/90 shadow-sm backdrop-blur-md mb-3 border border-white/[0.04]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8ffe7] tracking-wider uppercase font-semibold">
              Available for Global &amp; Remote Roles
            </span>
          </div>

          {/* Identity & Subtitle */}
          <h1 className="font-['Inter'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#dbfcff] tracking-tight mt-1 mb-1.5">
            Hi, I am Mohammad Faiyyaz
          </h1>

          <p className="font-['Inter'] text-lg sm:text-xl text-[#00dbe9] font-medium mb-2">
            Full Stack .NET Developer &amp; Software Engineer
          </p>

          <p className="font-['Inter'] text-sm sm:text-base text-[#b9cacb] max-w-xl mb-4 leading-relaxed">
            Specializing in production-grade C# microservices, high-throughput hospital management systems, and robust Web APIs built for mission-critical reliability.
          </p>

          {/* Key Focus Chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-[#dae2fd] border border-white/[0.04]">
              <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                domain
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#dbfcff]">
                4+ Years Exp (Triotree Tech)
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-[#dae2fd] border border-white/[0.04]">
              <span className="material-symbols-outlined text-[15px] text-[#4edea3]">
                local_hospital
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd]">
                Enterprise Healthcare ERP
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-[#dae2fd] border border-white/[0.04]">
              <span className="material-symbols-outlined text-[15px] text-[#c0c1ff]">
                memory
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#e1e0ff]">
                C# / ASP.NET Core Specialist
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <button
              onClick={handleResumeClick}
              id="btn-resume"
              className="flex items-center justify-center gap-2 h-11 px-4 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider shadow-[0_0_18px_rgba(0,240,255,0.25)] active:scale-[0.98] transition-all"
            >
              <span className={`material-symbols-outlined text-[18px] ${resumeDownloading ? 'animate-spin' : ''}`}>
                {resumeDownloading ? 'sync' : 'download'}
              </span>
              <span>{resumeDownloading ? 'Opening...' : 'Resume (PDF)'}</span>
            </button>

            <button
              onClick={() => onTabChange('contact')}
              className="flex items-center justify-center gap-2 h-11 px-4 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] hover:text-[#dbfcff] font-['JetBrains_Mono'] text-xs font-semibold tracking-wider active:scale-[0.98] transition-all border border-white/[0.06]"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry / Quick Stats Grid */}
      <div className="my-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-[#00f0ff] rounded-full"></span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#dbfcff] font-bold">
              Telemetry &amp; Metrics
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            LIVE_SYNC
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Stat 1 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131b2e] shadow-sm border border-white/[0.04] hover:border-[#00f0ff]/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#b9cacb]">
                Production Tenure
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#00dbe9]">
                history
              </span>
            </div>
            <div className="font-['Inter'] text-2xl font-bold text-[#dbfcff] tracking-tight">
              4+ Yrs
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] mt-0.5">
              Triotree Technologies
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131b2e] shadow-sm border border-white/[0.04] hover:border-[#00f0ff]/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#b9cacb]">
                Modules &amp; APIs
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
                deployed_code
              </span>
            </div>
            <div className="font-['Inter'] text-2xl font-bold text-[#00f0ff] tracking-tight">
              15+
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] mt-0.5">
              Hospital ERP Systems
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131b2e] shadow-sm border border-white/[0.04] hover:border-[#00f0ff]/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#b9cacb]">
                System Reliability
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                verified
              </span>
            </div>
            <div className="font-['Inter'] text-2xl font-bold text-[#4edea3] tracking-tight">
              99.9%
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] mt-0.5">
              SLA Uptime Standard
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131b2e] shadow-sm border border-white/[0.04] hover:border-[#00f0ff]/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#b9cacb]">
                Latency Tuning
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                speed
              </span>
            </div>
            <div className="font-['Inter'] text-2xl font-bold text-[#c0c1ff] tracking-tight">
              10x
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] mt-0.5">
              Query Optimization
            </span>
          </div>
        </div>
      </div>

      {/* Enterprise Verification / Tenure Spotlight Card */}
      <div className="my-4 p-4 sm:p-5 rounded-xl bg-[#171f33] border border-white/[0.06] shadow-md">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2d3449] flex items-center justify-center text-[#00f0ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
            </div>
            <div>
              <h2 className="font-['Inter'] text-lg font-bold text-[#dbfcff]">
                Triotree Technologies
              </h2>
              <p className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                Noida, NCR, India • Full-time
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-wider border border-[#3131c0]/50">
            Verified
          </span>
        </div>

        <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] mb-3 leading-relaxed">
          Core contributor to high-scale Clinical &amp; Administrative Hospital Information Management Systems (HIMS). Designed RESTful microservices, asynchronous message queues, and high-volume billing processing engines.
        </p>

        <div className="flex items-center justify-between pt-1 bg-[#131b2e]/80 rounded-lg px-3 py-2 border border-white/[0.04]">
          <span className="font-['JetBrains_Mono'] text-xs text-[#00dbe9] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            Tenure: 4+ Continuous Years
          </span>
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#4edea3] font-bold">
            Active
          </span>
        </div>
      </div>

      {/* Core Architectural Domains */}
      <div className="my-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-3.5 bg-[#c0c1ff] rounded-full"></span>
          <h2 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#dbfcff] font-bold">
            Core Architectural Domains
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {/* Domain 1: Enterprise .NET */}
          <div className="p-4 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-white/[0.04] hover:border-[#00f0ff]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00f0ff]">
                  terminal
                </span>
                <h3 className="font-['Inter'] text-sm sm:text-base text-[#dae2fd] font-semibold">
                  Enterprise .NET Architecture
                </h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">01</span>
            </div>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] mb-3 leading-relaxed">
              Architecting resilient, clean-architecture backend services, thread-safe asynchronous jobs, and decoupled CQRS message handlers.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#00dbe9]">
                C# 12
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                ASP.NET Core
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Web APIs
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Microservices
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#c0c1ff]">
                Clean Arch
              </span>
            </div>
          </div>

          {/* Domain 2: Database & Performance */}
          <div className="p-4 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-white/[0.04] hover:border-[#4edea3]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4edea3]">
                  database
                </span>
                <h3 className="font-['Inter'] text-sm sm:text-base text-[#dae2fd] font-semibold">
                  Database &amp; ORM Mastery
                </h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">02</span>
            </div>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] mb-3 leading-relaxed">
              High-performance relational persistence, complex stored procedures, dynamic execution plan analysis, and zero-downtime schema evolution.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#00dbe9]">
                SQL Server
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Entity Framework Core
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Dapper
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#4edea3]">
                Query Tuning
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Indexing
              </span>
            </div>
          </div>

          {/* Domain 3: Frontend Integration */}
          <div className="p-4 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-white/[0.04] hover:border-[#c0c1ff]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">
                  devices
                </span>
                <h3 className="font-['Inter'] text-sm sm:text-base text-[#dae2fd] font-semibold">
                  Frontend &amp; API Integration
                </h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">03</span>
            </div>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] mb-3 leading-relaxed">
              Bridging intricate business logic with intuitive, responsive client dashboards using modern SPAs and enterprise component toolkits.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#c0c1ff]">
                Angular
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                TypeScript
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Tailwind CSS
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                Bootstrap
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#222a3d] text-[#00dbe9]">
                SignalR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Project Preview */}
      <div className="my-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-[#4edea3] rounded-full"></span>
            <h2 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#dbfcff] font-bold">
              Featured Case Study
            </h2>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] font-semibold uppercase tracking-wider">
            Spotlight
          </span>
        </div>

        {/* Spotlight Card */}
        <div className="rounded-xl bg-[#171f33] overflow-hidden shadow-lg border border-white/[0.06]">
          {/* Media Header */}
          <div className="relative w-full h-44 bg-[#2d3449]">
            <img
              className="w-full h-full object-cover"
              alt="High tech dark mode telemetry dashboard interface showing real time enterprise hospital hospital information system charts"
              src={ASSETS.caseStudyPreview}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/40 to-transparent"></div>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#060e20]/80 backdrop-blur-md border border-white/[0.04]">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] uppercase font-semibold">
                Production Live
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-1 text-xs font-['JetBrains_Mono']">
              <span className="text-[#00f0ff] font-bold">HEALTHCARE ERP SYSTEM</span>
              <span className="text-[#b9cacb]">Triotree Suite</span>
            </div>
            <h3 className="font-['Inter'] text-lg sm:text-xl font-bold text-[#dae2fd] mb-2">
              HIMS Real-time Clinical Core
            </h3>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb] mb-4 leading-relaxed">
              Orchestrated low-latency electronic health record (EHR) sync pipelines and patient billing microservices handling 50k+ daily transactions across distributed multi-tenant hospital environments.
            </p>

            {/* Mock IDE Telemetry Preview Snippet */}
            <div className="rounded-lg bg-[#060e20] p-3 sm:p-4 mb-4 border border-white/[0.06]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                  PatientWorkflowEngine.cs
                </span>
              </div>
              <p className="font-['JetBrains_Mono'] text-xs text-[#b9cacb] leading-relaxed overflow-x-auto">
                <span className="text-[#c0c1ff] font-medium">public async</span>{' '}
                <span className="text-[#00dbe9]">Task&lt;Result&gt;</span>{' '}
                <span className="text-[#4edea3]">DispatchEncounterAsync</span>(EncounterContext ctx) =&gt; <br />
                <span className="text-[#dbfcff] pl-4">await</span> _orchestrator.
                <span className="text-[#00f0ff]">PublishEventAsync</span>(ctx.ToStream());
              </p>
            </div>

            {/* Call to Action Link */}
            <button
              onClick={onOpenArchitecture}
              className="flex items-center justify-between w-full h-11 px-4 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dbfcff] font-['JetBrains_Mono'] text-xs font-semibold tracking-wider transition-all border border-white/[0.04] active:scale-[0.99]"
            >
              <span>Explore Architecture Blueprint</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fast Interactive Contact Strip */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#131b2e] via-[#171f33] to-[#131b2e] shadow-sm flex items-center justify-between border border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#00f0ff]/20 flex items-center justify-center shrink-0 text-[#00f0ff]">
            <span className="material-symbols-outlined text-[20px]">handshake</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-['Inter'] text-sm sm:text-base text-[#dbfcff] font-bold truncate">
              Ready to build together?
            </h4>
            <p className="font-['JetBrains_Mono'] text-xs text-[#b9cacb] truncate">
              Open to Senior .NET &amp; Lead Architect roles
            </p>
          </div>
        </div>
        <button
          onClick={() => onTabChange('contact')}
          className="shrink-0 ml-3 px-3.5 py-1.5 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wide shadow-sm active:scale-95 transition-all"
        >
          Connect
        </button>
      </div>
    </div>
  );
};
