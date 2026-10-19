import React, { useState } from 'react';
import { ASSETS, SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsContactScreenProps {
  onOpenSchedule: () => void;
}

export const SkillsContactScreen: React.FC<SkillsContactScreenProps> = ({ onOpenSchedule }) => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'cat-backend': true,
    'cat-db': true,
    'cat-fe': true,
    'cat-cloud': true,
  });

  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showCopyNotice, setShowCopyNotice] = useState(false);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('faiyyaz.dev@example.com');
    setShowCopyNotice(true);
    setTimeout(() => {
      setShowCopyNotice(false);
    }, 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-20 pt-2 space-y-6">
      {/* Intro Hero Section */}
      <section className="flex flex-col space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 text-[#00dbe9] font-['JetBrains_Mono'] text-xs tracking-wider uppercase font-semibold">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>Production-Ready Architecture</span>
        </div>

        <h1 className="font-['Inter'] text-2xl sm:text-3xl lg:text-4xl text-[#dae2fd] font-extrabold tracking-tight">
          Skills &amp; Worldwide Contact
        </h1>

        <p className="font-['Inter'] text-sm sm:text-base text-[#b9cacb] leading-relaxed">
          Ready to contribute to your engineering team immediately. Specializing in high-throughput .NET ecosystems, clean domain models, and resilient distributed systems.
        </p>

        {/* Visual Telemetry Mini-Strip */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-[#131b2e] p-3 rounded-lg flex flex-col items-center justify-center text-center border border-white/[0.04]">
            <span className="font-['Inter'] text-xl sm:text-2xl text-[#00f0ff] font-bold">
              8+
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase">
              Yrs Experience
            </span>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-lg flex flex-col items-center justify-center text-center border border-white/[0.04]">
            <span className="font-['Inter'] text-xl sm:text-2xl text-[#4edea3] font-bold">
              99.9%
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase">
              Uptime Focus
            </span>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-lg flex flex-col items-center justify-center text-center border border-white/[0.04]">
            <span className="font-['Inter'] text-xl sm:text-2xl text-[#c0c1ff] font-bold">
              Global
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase">
              Relocation
            </span>
          </div>
        </div>
      </section>

      {/* Open to Opportunities & Global Mobility Banner */}
      <section className="bg-[#222a3d] rounded-xl p-4 sm:p-5 shadow-md space-y-3 relative overflow-hidden border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4edea3]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-bold">
              Open to Worldwide Hire
            </span>
          </div>
          <span className="bg-[#65f2b5]/20 text-[#d8ffe7] px-2.5 py-0.5 rounded-full font-['JetBrains_Mono'] text-xs font-semibold">
            Immediate
          </span>
        </div>

        {/* Location Matrix Map Background Hint */}
        <div
          className="w-full h-28 bg-cover bg-center rounded-lg relative overflow-hidden flex items-end p-3 border border-white/[0.06]"
          style={{ backgroundImage: `url('${ASSETS.mobilityMap}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-[#060e20]/60 to-transparent"></div>
          <div className="relative z-10 flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase tracking-wider">
              Mobility Coverage
            </span>
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#dae2fd] font-bold">
              India • Dubai / UAE • Europe • US / CA Remote
            </span>
          </div>
        </div>

        {/* Target Roles */}
        <div className="space-y-1.5 pt-1">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495] uppercase tracking-wider font-semibold">
            Target Architectural Roles
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-[#171f33] px-2.5 py-1 rounded font-['JetBrains_Mono'] text-xs text-[#dbfcff] font-medium border border-white/[0.04]">
              Senior .NET Developer
            </span>
            <span className="bg-[#171f33] px-2.5 py-1 rounded font-['JetBrains_Mono'] text-xs text-[#dae2fd] font-medium border border-white/[0.04]">
              Backend Engineer
            </span>
            <span className="bg-[#171f33] px-2.5 py-1 rounded font-['JetBrains_Mono'] text-xs text-[#dae2fd] font-medium border border-white/[0.04]">
              Full Stack Engineer
            </span>
            <span className="bg-[#171f33] px-2.5 py-1 rounded font-['JetBrains_Mono'] text-xs text-[#c0c1ff] font-medium border border-white/[0.04]">
              System Architect
            </span>
          </div>
        </div>

        {/* Visa / Passport Note */}
        <div className="bg-[#060e20] p-3 rounded-lg flex items-center gap-3 border border-white/[0.04]">
          <span className="material-symbols-outlined text-[#00dbe9] text-[22px] shrink-0">
            flight_takeoff
          </span>
          <p className="font-['Inter'] text-xs text-[#b9cacb] leading-relaxed">
            Passports in order, sponsorship friendly, and equipped for high-cadence asynchronous remote setups across UTC-5 to UTC+5:30.
          </p>
        </div>
      </section>

      {/* Technical Competencies Accordion / Matrix */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              terminal
            </span>
            <h2 className="font-['Inter'] text-base sm:text-lg text-[#dae2fd] font-bold">
              Stack &amp; Framework Matrix
            </h2>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#849495]">v2025.1</span>
        </div>

        {/* Categories mapped */}
        {SKILL_CATEGORIES.map((category) => {
          const isOpen = openAccordions[category.id] ?? true;
          return (
            <div
              key={category.id}
              className="bg-[#171f33] rounded-xl overflow-hidden border border-white/[0.04] transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(category.id)}
                className="w-full p-4 flex items-center justify-between text-left focus:outline-none hover:bg-[#1e293b] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#00f0ff] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {category.icon}
                    </span>
                  </div>
                  <div>
                    <div className="font-['Inter'] text-sm sm:text-base text-[#dae2fd] font-semibold">
                      {category.title}
                    </div>
                    <div className="font-['JetBrains_Mono'] text-xs text-[#b9cacb]">
                      {category.countLabel}
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#b9cacb] transition-transform duration-200">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 flex flex-col space-y-2.5 border-t border-white/[0.04] pt-3">
                  <p className="font-['Inter'] text-xs text-[#b9cacb] leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, sIdx) => {
                      let colorClass = 'bg-[#222a3d] text-[#dae2fd]';
                      if (skill.highlight) colorClass = 'bg-[#222a3d] text-[#00dbe9] font-bold';
                      else if (skill.secondary) colorClass = 'bg-[#222a3d] text-[#c0c1ff]';
                      else if (skill.primary) colorClass = 'bg-[#222a3d] text-[#4edea3]';

                      return (
                        <span
                          key={sIdx}
                          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-xs ${colorClass}`}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Quick Action Triggers Strip */}
      <section className="space-y-2">
        <div className="font-['JetBrains_Mono'] text-xs text-[#849495] uppercase tracking-wider font-semibold">
          Fast Track Outreach
        </div>
        <div className="grid grid-cols-3 gap-2">
          <a
            className="bg-[#222a3d] hover:bg-[#31394d] p-3 rounded-lg flex flex-col items-center justify-center text-center gap-1 text-[#dae2fd] hover:text-[#00f0ff] transition-all border border-white/[0.04]"
            href="mailto:faiyyaz.dev@example.com"
          >
            <span className="material-symbols-outlined text-[#00dbe9] text-[24px]">
              mail
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold">
              Direct Email
            </span>
          </a>

          <a
            className="bg-[#222a3d] hover:bg-[#31394d] p-3 rounded-lg flex flex-col items-center justify-center text-center gap-1 text-[#dae2fd] hover:text-[#4edea3] transition-all border border-white/[0.04]"
            href="https://wa.me/919999999999"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">
              call
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold">
              WhatsApp Call
            </span>
          </a>

          <button
            onClick={onOpenSchedule}
            className="bg-[#222a3d] hover:bg-[#31394d] p-3 rounded-lg flex flex-col items-center justify-center text-center gap-1 text-[#dae2fd] hover:text-[#c0c1ff] transition-all border border-white/[0.04]"
          >
            <span className="material-symbols-outlined text-[#c0c1ff] text-[24px]">
              schedule
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold">
              15-min Chat
            </span>
          </button>
        </div>
      </section>

      {/* Interactive Direct Inquiry Form */}
      <section className="bg-[#171f33] rounded-xl p-4 sm:p-5 space-y-4 shadow-lg border border-white/[0.06]">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="material-symbols-outlined">send</span>
            <h3 className="font-['Inter'] text-base sm:text-lg font-bold text-[#dae2fd]">
              Send Direct Message
            </h3>
          </div>
          <p className="font-['Inter'] text-xs sm:text-sm text-[#b9cacb]">
            Inquire about contract engagements, tech leadership vacancies, or direct engineering hire.
          </p>
        </div>

        <form onSubmit={handleSubmitInquiry} className="space-y-3">
          <div className="space-y-1">
            <label
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#b9cacb]"
              htmlFor="senderName"
            >
              Your Full Name
            </label>
            <div className="bg-[#060e20] rounded-lg p-2.5 flex items-center gap-2 border border-white/[0.04] focus-within:border-[#00f0ff]">
              <span className="material-symbols-outlined text-[#849495] text-lg">badge</span>
              <input
                className="bg-transparent font-['JetBrains_Mono'] text-xs text-[#dae2fd] placeholder:text-[#3b494b] w-full focus:outline-none"
                id="senderName"
                placeholder="// e.g. Alexander Vance"
                required
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#b9cacb]"
              htmlFor="senderCompany"
            >
              Company / Agency / Recruiter
            </label>
            <div className="bg-[#060e20] rounded-lg p-2.5 flex items-center gap-2 border border-white/[0.04] focus-within:border-[#00f0ff]">
              <span className="material-symbols-outlined text-[#849495] text-lg">
                corporate_fare
              </span>
              <input
                className="bg-transparent font-['JetBrains_Mono'] text-xs text-[#dae2fd] placeholder:text-[#3b494b] w-full focus:outline-none"
                id="senderCompany"
                placeholder="// e.g. Enterprise Cloud Labs"
                required
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#b9cacb]"
              htmlFor="senderMessage"
            >
              Project Scope / Role Brief
            </label>
            <div className="bg-[#060e20] rounded-lg p-2.5 border border-white/[0.04] focus-within:border-[#00f0ff]">
              <textarea
                className="bg-transparent font-['JetBrains_Mono'] text-xs text-[#dae2fd] placeholder:text-[#3b494b] w-full resize-none focus:outline-none"
                id="senderMessage"
                placeholder="// specify tech stack, timezone requirements, and compensation package..."
                required
                rows={3}
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          {!submitSuccess ? (
            <button
              className="w-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] py-3 rounded-lg font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-sm disabled:opacity-50"
              disabled={isSubmitting}
              id="submitBtn"
              type="submit"
            >
              <span className={`material-symbols-outlined text-lg ${isSubmitting ? 'animate-spin' : ''}`}>
                {isSubmitting ? 'refresh' : 'rocket_launch'}
              </span>
              <span>{isSubmitting ? 'Dispatching...' : 'Submit Inquiry'}</span>
            </button>
          ) : (
            <div className="bg-[#222a3d] p-3 rounded-lg flex items-center gap-2 text-[#4edea3] border border-[#4edea3]/30">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
                check_circle
              </span>
              <span className="font-['JetBrains_Mono'] text-xs">
                Payload transmitted. Mohammad will follow up in &lt; 12 hours.
              </span>
            </div>
          )}
        </form>
      </section>

      {/* Detailed Coordinates & Social Identity */}
      <section className="bg-[#131b2e] rounded-xl p-4 sm:p-5 space-y-3 border border-white/[0.04]">
        <div className="font-['JetBrains_Mono'] text-xs text-[#849495] uppercase tracking-wider font-semibold">
          Direct Verified Channels
        </div>

        <div className="flex flex-col space-y-2">
          {/* Email row with Copy */}
          <div className="flex items-center justify-between p-2.5 bg-[#171f33] rounded-lg border border-white/[0.04]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#849495] text-lg shrink-0">
                alternate_email
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd] truncate">
                faiyyaz.dev@example.com
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="text-[#00dbe9] font-['JetBrains_Mono'] text-xs hover:underline flex items-center gap-1 shrink-0 ml-2"
            >
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>Copy</span>
            </button>
          </div>

          {/* Location row */}
          <div className="flex items-center justify-between p-2.5 bg-[#171f33] rounded-lg border border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#849495] text-lg">
                pin_drop
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#dae2fd]">
                Noida, India (Open to Relocate)
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] font-semibold">
              Relocatable
            </span>
          </div>
        </div>

        {/* Social Profile Anchors */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            className="bg-[#171f33] hover:bg-[#222a3d] p-3 rounded-lg flex items-center justify-between text-[#dae2fd] hover:text-[#00f0ff] transition-colors border border-white/[0.04]"
            href="https://linkedin.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-lg">share</span>
              <span className="font-['JetBrains_Mono'] text-xs font-semibold">
                LinkedIn Profile
              </span>
            </div>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>

          <a
            className="bg-[#171f33] hover:bg-[#222a3d] p-3 rounded-lg flex items-center justify-between text-[#dae2fd] hover:text-[#00f0ff] transition-colors border border-white/[0.04]"
            href="https://github.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-lg">code</span>
              <span className="font-['JetBrains_Mono'] text-xs font-semibold">
                GitHub Profile
              </span>
            </div>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>

        {/* Copy Toast Feedback */}
        {showCopyNotice && (
          <div className="text-center py-1.5 bg-[#2d3449] rounded text-[#4edea3] font-['JetBrains_Mono'] text-xs animate-fadeIn">
            ✓ Copied email to clipboard!
          </div>
        )}
      </section>

      {/* Certification Badges Footer Widget */}
      <section className="bg-[#060e20] p-4 rounded-xl flex items-center gap-3.5 border border-white/[0.06]">
        <div className="w-12 h-12 rounded-full bg-[#171f33] flex items-center justify-center shrink-0 text-[#4edea3]">
          <span className="material-symbols-outlined text-2xl">military_tech</span>
        </div>
        <div className="flex flex-col">
          <span className="font-['Inter'] text-sm sm:text-base text-[#dae2fd] font-bold">
            Microsoft Certified
          </span>
          <span className="font-['Inter'] text-xs text-[#b9cacb]">
            Azure Developer Associate • C# Specialist
          </span>
        </div>
      </section>
    </div>
  );
};
