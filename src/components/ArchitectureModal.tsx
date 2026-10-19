import React, { useState } from 'react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeNode, setActiveNode] = useState<string>('workflow');

  if (!isOpen) return null;

  const nodeDetails: Record<
    string,
    { title: string; tech: string; metric: string; description: string; code: string }
  > = {
    workflow: {
      title: 'Patient Workflow Engine',
      tech: 'C# 12 / .NET 7 / CQRS',
      metric: '50k+ daily transactions · < 25ms execution',
      description:
        'Decoupled domain handlers using MediatR and CQRS pattern. Command validators intercept and sanitize clinic intake before publishing immutable domain events into the streaming pipeline.',
      code: `public async Task<Result<EncounterId>> Handle(
    AdmitPatientCommand cmd, 
    CancellationToken ct)
{
    var encounter = Encounter.Create(cmd.PatientId, cmd.TriageLevel);
    await _repository.SaveAsync(encounter, ct);
    await _eventBus.PublishAsync(new PatientAdmittedEvent(encounter.Id));
    return Result.Success(encounter.Id);
}`
    },
    gateway: {
      title: 'API Gateway & JWT Claim Dispatcher',
      tech: 'ASP.NET Core / YARP / Zero-Trust',
      metric: '4ms token verification · Rate-limited',
      description:
        'Terminates SSL, validates cryptographically signed JWT bearer tokens, enforces granular permission matrices across clinical roles (Physician, Nurse, Registrar), and load balances downstream traffic.',
      code: `app.UseAuthentication();
app.UseAuthorization();
app.MapReverseProxy(proxyPipeline => {
    proxyPipeline.UseSessionAffinity();
    proxyPipeline.UseLoadBalancing();
});`
    },
    sql: {
      title: 'Optimized MS SQL Server Cluster',
      tech: 'SQL Server 2022 / Partitioned Indexes / Dapper',
      metric: '-35% query latency · 99.9% uptime SLA',
      description:
        'Clustered columnstore indexing on high-frequency EHR tables, parameterized stored procedures, and dynamic execution plan caching preventing lock escalations during peak hospital intake.',
      code: `CREATE NONCLUSTERED INDEX IX_PatientEncounter_AdmitDate
ON dbo.PatientEncounters (AdmitDateTimeUtc)
INCLUDE (PatientId, DepartmentId, StatusId)
WITH (DATA_COMPRESSION = PAGE, ONLINE = ON);`
    },
    signalr: {
      title: 'Real-time SignalR Telemetry Hub',
      tech: 'SignalR / WebSockets / Redis Backplane',
      metric: 'Sub-180ms vital signs distribution',
      description:
        'Dual-direction WebSockets with automatic fallback to Server-Sent Events. Broadcasts critical bedside telemetry alerts and EHR encounter updates across connected nurse stations instantly.',
      code: `public class ClinicalHub : Hub<IClinicalClient>
{
    public async Task BroadcastVitalsAlert(VitalsAlertPacket alert)
        => await Clients.Group(alert.WardId).ReceiveAlert(alert);
}`
    }
  };

  const selected = nodeDetails[activeNode] || nodeDetails.workflow;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0b1326] border border-[#00f0ff]/40 rounded-xl flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              schema
            </span>
            <div>
              <h3 className="font-['JetBrains_Mono'] text-sm text-[#dbfcff] font-bold">
                Architecture Blueprint: HIMS Real-Time Clinical Core
              </h3>
              <p className="text-[11px] text-[#849495] font-['JetBrains_Mono']">
                Triotree Suite Distributed Healthcare Micro-Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-[#dae2fd]">
          {/* Topology Interactive Map */}
          <div className="p-4 rounded-xl bg-[#060e20] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3 text-xs font-['JetBrains_Mono']">
              <span className="text-[#00f0ff] uppercase tracking-wider font-semibold">
                // System Node Topology (Click to Inspect)
              </span>
              <span className="text-[#4edea3] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'gateway', name: 'API Gateway', role: 'Security & Router', icon: 'shield' },
                { id: 'workflow', name: 'Workflow Engine', role: 'CQRS Core', icon: 'terminal' },
                { id: 'sql', name: 'SQL Cluster', role: 'Optimized DB', icon: 'database' },
                { id: 'signalr', name: 'SignalR Hub', role: 'Live Telemetry', icon: 'sensors' },
              ].map((node) => {
                const isCurrent = activeNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`p-3 rounded-lg flex flex-col items-center text-center transition-all ${
                      isCurrent
                        ? 'bg-[#00f0ff]/15 border-2 border-[#00f0ff] text-[#dbfcff] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-[#171f33] border border-white/[0.06] text-[#b9cacb] hover:bg-[#222a3d]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[24px] mb-1 ${
                        isCurrent ? 'text-[#00f0ff]' : 'text-[#849495]'
                      }`}
                    >
                      {node.icon}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs font-bold truncate w-full">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-[#849495] truncate w-full mt-0.5">
                      {node.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Node Deep Dive */}
          <div className="p-4 rounded-xl bg-[#171f33] border border-[#00f0ff]/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h4 className="text-base font-bold text-[#dbfcff]">
                  {selected.title}
                </h4>
                <p className="font-['JetBrains_Mono'] text-xs text-[#00dbe9]">
                  {selected.tech}
                </p>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-1 rounded bg-[#060e20] text-[#4edea3] font-semibold border border-[#4edea3]/30">
                {selected.metric}
              </span>
            </div>

            <p className="text-sm text-[#b9cacb] leading-relaxed">
              {selected.description}
            </p>

            {/* Code Snippet */}
            <div className="rounded-lg bg-[#060e20] border border-white/[0.08] p-3 overflow-x-auto">
              <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#849495] pb-2 border-b border-white/[0.04] mb-2">
                <span>implementation-snippet.cs</span>
                <span className="text-[#00f0ff]">C# 12 / .NET Core</span>
              </div>
              <pre className="font-['JetBrains_Mono'] text-xs text-[#dbfcff] leading-relaxed">
                <code>{selected.code}</code>
              </pre>
            </div>
          </div>

          {/* Architectural Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-['JetBrains_Mono']">
            <div className="p-3 rounded-lg bg-[#131b2e] border border-white/[0.04]">
              <span className="text-[#00f0ff] font-bold block mb-1">ZERO DOWNTIME</span>
              <p className="text-[#b9cacb]">Blue-green deployment with rollback readiness and migration idempotency.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#131b2e] border border-white/[0.04]">
              <span className="text-[#4edea3] font-bold block mb-1">HIPAA COMPLIANT</span>
              <p className="text-[#b9cacb]">At-rest AES-256 database column encryption and TLS 1.3 transport security.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#131b2e] border border-white/[0.04]">
              <span className="text-[#c0c1ff] font-bold block mb-1">CONCURRENCY SAFE</span>
              <p className="text-[#b9cacb]">Optimistic concurrency tokens preventing double-billing or bed allocation race conditions.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="font-['JetBrains_Mono'] text-[#849495]">
            Engineered by Mohammad Faiyyaz
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold transition-all shadow-sm"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
