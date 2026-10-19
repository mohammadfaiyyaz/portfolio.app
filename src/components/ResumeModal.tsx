import React, { useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [saveDriveStatus, setSaveDriveStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'done'>('idle');

  const handleSaveToDrive = async () => {
    setSaveDriveStatus('saving');
    try {
      const { getAccessToken, googleSignIn } = await import('../lib/googleAuth');
      const { uploadTextToDrive } = await import('../lib/googleDriveService');
      let token = await getAccessToken();
      if (!token) {
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }
      if (!token) throw new Error('No Google token available');

      const resumeContent = `# MOHAMMAD FAIYYAZ - FULL STACK .NET DEVELOPER
Location: Noida, India (Open to Global Relocation / Remote)
Email: faiyyaz.dev@example.com

## PROFESSIONAL SUMMARY
Production-focused Software Engineer with 4+ years of professional experience specializing in enterprise-scale Hospital Information Management Systems (HIMS), high-throughput C# microservices, resilient ASP.NET Core Web APIs, and low-latency MS SQL Server data layers. Reduced query latency by 35% and guaranteed 99.9% uptime SLA across 20+ multi-speciality clinical environments.

## CORE COMPETENCIES & STACK
• Backend: C# 12, .NET Core 6/7/8, ASP.NET Core Web API, ASP.NET MVC, Microservices, Clean Architecture, CQRS, SOLID.
• Databases & ORM: Microsoft SQL Server, Entity Framework Core, Dapper, T-SQL, Query Tuning, Index Optimization, Redis.
• Frontend: TypeScript, Angular, HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript (ES6+), SignalR.
• DevOps & Cloud: Azure DevOps, CI/CD Pipelines, Git, GitHub, IIS, Docker Basics, Postman, Swagger, Visual Studio 2022.

## EXPERIENCE
Software Developer / Software Engineer
Triotree Technologies Pvt. Ltd. | Noida, NCR, India (Oct 2019 – Dec 2023)
• Engineered and maintained core operational modules for enterprise Hospital Information Management Systems (HIMS) using ASP.NET Core and SQL Server.
• Designed scalable Web API micro-endpoints handling 50k+ daily transactions across IPD, OPD, pharmacy inventory, and automated billing.
• Refactored mission-critical SQL stored procedures and EF Core query plans, slashing patient record retrieval latency by 35%.
• Spearheaded progressive migration converting legacy monolithic ASP.NET MVC components to modular .NET Core 6 & 7 services.
• Maintained zero-fail continuous integration pipelines using Azure DevOps with rigorous unit tests in xUnit.

## CERTIFICATIONS
• Microsoft Certified: Azure Developer Associate
• C# Specialization Assessment (Advanced)`;

      await uploadTextToDrive(
        token,
        `Mohammad_Faiyyaz_Resume_${new Date().toISOString().split('T')[0]}.md`,
        resumeContent,
        'text/markdown'
      );
      setSaveDriveStatus('done');
      setTimeout(() => setSaveDriveStatus('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.isScopeError || err.status === 403) {
        try {
          const { googleSignIn, clearCachedToken } = await import('../lib/googleAuth');
          clearCachedToken();
          const authRes = await googleSignIn(true);
          if (authRes?.accessToken) {
            const { uploadTextToDrive } = await import('../lib/googleDriveService');
            const resumeContent = `# MOHAMMAD FAIYYAZ - FULL STACK .NET DEVELOPER
Location: Noida, India (Open to Global Relocation / Remote)
Email: faiyyaz.dev@example.com

## PROFESSIONAL SUMMARY
Production-focused Software Engineer with 4+ years of professional experience specializing in enterprise-scale Hospital Information Management Systems (HIMS), high-throughput C# microservices, resilient ASP.NET Core Web APIs, and low-latency MS SQL Server data layers.`;
            await uploadTextToDrive(
              authRes.accessToken,
              `Mohammad_Faiyyaz_Resume_${new Date().toISOString().split('T')[0]}.md`,
              resumeContent,
              'text/markdown'
            );
            setSaveDriveStatus('done');
            setTimeout(() => setSaveDriveStatus('idle'), 3000);
            return;
          }
        } catch (reauthErr) {
          console.error('Re-auth failed:', reauthErr);
        }
      }
      setSaveDriveStatus('idle');
    }
  };
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloadStatus('downloading');
    setTimeout(() => {
      // Create downloadable resume text file
      const resumeContent = `=====================================================
MOHAMMAD FAIYYAZ - FULL STACK .NET DEVELOPER
Location: Noida, India (Open to Global Relocation / Remote)
Email: faiyyaz.dev@example.com | Portfolio: Available
=====================================================

PROFESSIONAL SUMMARY
Production-focused Software Engineer with 4+ years of professional experience specializing in enterprise-scale Hospital Information Management Systems (HIMS), high-throughput C# microservices, resilient ASP.NET Core Web APIs, and low-latency MS SQL Server data layers. Proven track record of reducing query latency by 35% and guaranteeing 99.9% uptime SLA across 20+ multi-speciality clinical environments.

CORE COMPETENCIES & STACK
• Backend: C# 12, .NET Core 6/7/8, ASP.NET Core Web API, ASP.NET MVC, Microservices, Clean Architecture, CQRS, SOLID.
• Databases & ORM: Microsoft SQL Server, Entity Framework Core, Dapper, T-SQL, Query Tuning, Index Optimization, Redis.
• Frontend: TypeScript, Angular, HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript (ES6+), SignalR.
• DevOps & Cloud: Azure DevOps, CI/CD Pipelines, Git, GitHub, IIS, Docker Basics, Postman, Swagger, Visual Studio 2022.

EXPERIENCE
Software Developer / Software Engineer
Triotree Technologies Pvt. Ltd. | Noida, NCR, India
Oct 2019 – Dec 2023 (4 Years 2 Months)
• Engineered and maintained core operational modules for enterprise Hospital Information Management Systems (HIMS) using ASP.NET Core and SQL Server.
• Designed scalable Web API micro-endpoints handling 50k+ daily transactions across IPD, OPD, pharmacy inventory, and automated billing.
• Refactored mission-critical SQL stored procedures and EF Core query plans, slashing patient record retrieval latency by 35%.
• Spearheaded progressive migration converting legacy monolithic ASP.NET MVC components to modular .NET Core 6 & 7 services.
• Maintained zero-fail continuous integration pipelines using Azure DevOps with rigorous unit tests in xUnit.

CERTIFICATIONS
• Microsoft Certified: Azure Developer Associate
• C# Specialization Assessment (Advanced)
=====================================================`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Mohammad_Faiyyaz_DotNet_Engineer_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadStatus('done');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('faiyyaz.dev@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0b1326] border border-[#00f0ff]/30 rounded-xl flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ffb4ab]"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="w-3 h-3 rounded-full bg-[#4edea3]"></span>
            <span className="ml-2 font-['JetBrains_Mono'] text-[12px] text-[#dbfcff] font-medium">
              Mohammad_Faiyyaz_CV_2025.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToDrive}
              disabled={saveDriveStatus === 'saving'}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#171f33] hover:bg-[#222a3d] border border-[#00f0ff]/40 text-[#00f0ff] font-['JetBrains_Mono'] text-[12px] font-bold transition-all shadow-sm active:scale-95"
              title="Save directly to connected Google Drive"
            >
              <span className="material-symbols-outlined text-[16px]">
                {saveDriveStatus === 'saving'
                  ? 'sync'
                  : saveDriveStatus === 'done'
                  ? 'check_circle'
                  : 'add_to_drive'}
              </span>
              <span className="hidden sm:inline">
                {saveDriveStatus === 'saving'
                  ? 'Saving...'
                  : saveDriveStatus === 'done'
                  ? 'Saved to Drive!'
                  : 'Save to Drive'}
              </span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloadStatus === 'downloading'}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-[12px] font-bold transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">
                {downloadStatus === 'downloading'
                  ? 'sync'
                  : downloadStatus === 'done'
                  ? 'check_circle'
                  : 'download'}
              </span>
              <span>
                {downloadStatus === 'downloading'
                  ? 'Preparing...'
                  : downloadStatus === 'done'
                  ? 'Downloaded!'
                  : 'Download'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#849495] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-[#dae2fd] font-['Inter']">
          {/* Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-[#dbfcff] tracking-tight">
                  Mohammad Faiyyaz
                </h2>
                <p className="text-sm font-['JetBrains_Mono'] text-[#00dbe9]">
                  Full Stack .NET Developer & Software Engineer
                </p>
              </div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#b9cacb] space-y-0.5">
                <div>Noida, NCR, India (Open to Relocate)</div>
                <div className="text-[#4edea3]">● Immediate Availability</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#849495] font-['JetBrains_Mono']">
              <span className="text-[#dbfcff]">faiyyaz.dev@example.com</span>
              <span>•</span>
              <button onClick={handleCopy} className="text-[#00dbe9] hover:underline">
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
              <span>•</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#dae2fd]">
                LinkedIn Profile
              </a>
              <span>•</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#dae2fd]">
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-2">
              // Executive Profile
            </h3>
            <p className="text-sm leading-relaxed text-[#b9cacb]">
              Specializing in production-grade C# microservices, high-throughput hospital management systems, and robust Web APIs built for mission-critical reliability. 4+ continuous years designing fault-tolerant architectures at Triotree Technologies for healthcare enterprises.
            </p>
          </div>

          {/* Technical Arsenal */}
          <div>
            <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-2">
              // Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-['JetBrains_Mono']">
              <div className="p-2.5 rounded bg-[#131b2e] border border-white/[0.04]">
                <span className="text-[#4edea3] font-semibold">Backend Engineering:</span>
                <p className="text-[#b9cacb] mt-1">C#, .NET 6/7/8, ASP.NET Core, Web APIs, MVC, Microservices, Clean Architecture, CQRS, SOLID</p>
              </div>
              <div className="p-2.5 rounded bg-[#131b2e] border border-white/[0.04]">
                <span className="text-[#00dbe9] font-semibold">Databases & Performance:</span>
                <p className="text-[#b9cacb] mt-1">MS SQL Server, Entity Framework Core, Dapper, T-SQL, Stored Procedures, Index Tuning, Redis Cache</p>
              </div>
              <div className="p-2.5 rounded bg-[#131b2e] border border-white/[0.04]">
                <span className="text-[#c0c1ff] font-semibold">Frontend & Protocols:</span>
                <p className="text-[#b9cacb] mt-1">Angular, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Bootstrap, SignalR, WebRTC</p>
              </div>
              <div className="p-2.5 rounded bg-[#131b2e] border border-white/[0.04]">
                <span className="text-[#dbfcff] font-semibold">DevOps & Tooling:</span>
                <p className="text-[#b9cacb] mt-1">Azure DevOps, CI/CD Pipelines, Git, GitHub, IIS, Docker, Swagger/OpenAPI, Postman, xUnit</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-3">
              // Professional Experience
            </h3>
            <div className="p-4 rounded-xl bg-[#171f33] border border-white/[0.04] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h4 className="text-base font-bold text-[#dbfcff]">
                    Software Developer / Software Engineer
                  </h4>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#4edea3]">
                    Triotree Technologies Pvt. Ltd. • Noida, India (Hybrid)
                  </p>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs px-2 py-0.5 rounded bg-[#222a3d] text-[#b9cacb] self-start sm:self-auto">
                  Oct 2019 – Dec 2023 (4.2 Yrs)
                </span>
              </div>

              <p className="text-xs text-[#b9cacb] italic">
                Domain: Enterprise Hospital Information Management Systems (HIMS)
              </p>

              <ul className="text-xs text-[#b9cacb] space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  Engineered core operational modules for enterprise HIMS utilizing ASP.NET Core, C#, and relational SQL Server architectures.
                </li>
                <li>
                  Designed and shipped resilient RESTful Web API microservices handling 50,000+ daily patient admissions and pharmacy transactions.
                </li>
                <li>
                  Refactored complex SQL stored procedures, clustered indexes, and EF Core execution plans, reducing critical patient record retrieval latency by 35%.
                </li>
                <li>
                  Led multi-stage migration of legacy monolithic ASP.NET codebases to clean-architecture .NET Core runtime services.
                </li>
                <li>
                  Automated CI/CD build and release pipelines with Azure DevOps and enforced 85%+ code coverage via xUnit testing suites.
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#00f0ff] font-bold mb-2">
              // Certifications & Education
            </h3>
            <div className="p-3 rounded-lg bg-[#131b2e] border border-white/[0.04] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#dbfcff]">Microsoft Certified: Azure Developer Associate</span>
                <p className="text-[#b9cacb]">Validated expertise in enterprise cloud solutions and .NET APIs</p>
              </div>
              <span className="font-['JetBrains_Mono'] text-[#4edea3] font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="font-['JetBrains_Mono'] text-[#849495]">
            Verified Enterprise .NET Engineer
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-medium transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
