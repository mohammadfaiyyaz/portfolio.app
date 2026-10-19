import React, { useState } from 'react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'settle' | 'tariff' | 'audit'>('settle');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const endpoints = {
    settle: {
      method: 'POST',
      path: '/api/v1/claims/settlement',
      summary: 'Adjudicate and settle insurance claim in distributed transaction',
      requestBody: `{
  "claimId": "CLM-2025-99824",
  "policyHolderId": "POL-88310",
  "totalAmount": 14250.00,
  "serviceCodes": ["SURG-401", "ANES-102", "BED-ICU-03"],
  "hospitalCode": "TRIO-DEL-01"
}`,
      responseBody: `{
  "status": "APPROVED",
  "adjudicationId": "ADJ-7719-X9",
  "settledAmount": 13800.00,
  "coPayDeductible": 450.00,
  "cycleTimeMs": 24,
  "eventPublished": "claims.adjudicated.v1"
}`
    },
    tariff: {
      method: 'GET',
      path: '/api/v1/tariffs/calculate?ward=ICU&durationHours=48',
      summary: 'Compute dynamic rate card matrix based on clinical acuity',
      requestBody: `// Query Parameters:
// ?ward=ICU&durationHours=48&speciality=CARDIOLOGY`,
      responseBody: `{
  "baseRateHourly": 120.00,
  "totalBase": 5760.00,
  "equipmentSurcharge": 840.00,
  "applicableTariffSchedule": "GOV-CGHS-2025",
  "cached": true
}`
    },
    audit: {
      method: 'GET',
      path: '/api/v1/audit/ledger/CLM-2025-99824',
      summary: 'Retrieve immutable cryptographic audit trail for settled claim',
      requestBody: `// Stream Event Sourced Journal Entries`,
      responseBody: `[
  { "seq": 1, "type": "ClaimSubmitted", "utc": "2025-10-18T10:14:02Z", "actor": "BillingDesk_04" },
  { "seq": 2, "type": "TariffCalculated", "utc": "2025-10-18T10:14:03Z", "ruleset": "StandardTierA" },
  { "seq": 3, "type": "TPA_GatewayApproved", "utc": "2025-10-18T10:14:04Z", "hash": "sha256:e3b0c442..." }
]`
    }
  };

  const current = endpoints[selectedEndpoint];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedResponse(current.responseBody);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0b1326] border border-[#00f0ff]/40 rounded-xl flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              terminal
            </span>
            <div>
              <h3 className="font-['JetBrains_Mono'] text-sm text-[#dbfcff] font-bold">
                OpenAPI / Swagger: Clinical Billing API
              </h3>
              <p className="text-[11px] text-[#849495] font-['JetBrains_Mono']">
                High-Throughput Claims Microservice • Clean Architecture
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[#dae2fd]">
          {/* Endpoint Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-1 border-b border-white/[0.06]">
            {[
              { id: 'settle', label: 'POST /claims/settlement', method: 'POST' },
              { id: 'tariff', label: 'GET /tariffs/calculate', method: 'GET' },
              { id: 'audit', label: 'GET /audit/ledger', method: 'GET' },
            ].map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep.id as any);
                  setSimulatedResponse(null);
                }}
                className={`px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedEndpoint === ep.id
                    ? 'bg-[#00f0ff] text-[#002022] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-[#171f33] text-[#b9cacb] hover:bg-[#222a3d]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{ep.method}</span>
                <span>{ep.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Endpoint Summary */}
          <div className="p-3 rounded-lg bg-[#131b2e] border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold ${
                  current.method === 'POST'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                    : 'bg-[#4edea3]/20 text-[#4edea3]'
                }`}
              >
                {current.method}
              </span>
              <code className="font-['JetBrains_Mono'] text-xs text-[#dbfcff]">
                {current.path}
              </code>
            </div>
            <p className="text-xs text-[#b9cacb]">{current.summary}</p>
          </div>

          {/* Request Payload */}
          <div>
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#849495] mb-1.5">
              <span>// Request Payload / Query</span>
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#171f33] hover:bg-[#222a3d] text-[#00f0ff] font-semibold border border-[#00f0ff]/30 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isSimulating ? 'sync' : 'play_arrow'}
                </span>
                <span>{isSimulating ? 'Executing...' : 'Execute Request'}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/[0.06] overflow-x-auto">
              <pre className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                <code>{current.requestBody}</code>
              </pre>
            </div>
          </div>

          {/* Response Payload */}
          <div>
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#849495] mb-1.5">
              <span>// Response Payload (200 OK)</span>
              {simulatedResponse && (
                <span className="text-[#4edea3] text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  Status: 200 OK (24ms)
                </span>
              )}
            </div>
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/[0.06] overflow-x-auto">
              <pre className="font-['JetBrains_Mono'] text-xs text-[#4edea3]">
                <code>{simulatedResponse || current.responseBody}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="font-['JetBrains_Mono'] text-[#849495]">
            RabbitMQ Event-Driven Settlement Gateway
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-medium transition-colors"
          >
            Close Docs
          </button>
        </div>
      </div>
    </div>
  );
};
