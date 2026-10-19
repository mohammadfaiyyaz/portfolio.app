import React, { useState } from 'react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('02:00 PM UTC');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      // auto close or stay
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0b1326] border border-[#00f0ff]/40 rounded-xl flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">
              schedule
            </span>
            <div>
              <h3 className="font-['JetBrains_Mono'] text-sm text-[#dbfcff] font-bold">
                Schedule 15-Min Engineering Sync
              </h3>
              <p className="text-[11px] text-[#849495] font-['JetBrains_Mono']">
                Fast-Track Architecture & Hiring Consultation
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

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 text-[#dae2fd]">
          {isBooked ? (
            <div className="p-6 rounded-xl bg-[#131b2e] border border-[#4edea3]/30 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[28px]">event_available</span>
              </div>
              <h4 className="text-lg font-bold text-[#dbfcff]">
                Meeting Scheduled!
              </h4>
              <p className="text-xs text-[#b9cacb] leading-relaxed max-w-sm mx-auto">
                Invite dispatched to <span className="text-[#00f0ff] font-semibold">{email || 'your email'}</span> for <span className="text-[#4edea3] font-semibold">{selectedDay} at {selectedTime}</span>. Google Meet / Teams link attached.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded bg-[#00f0ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              {/* Day Selector */}
              <div>
                <label className="block text-xs font-['JetBrains_Mono'] text-[#849495] uppercase mb-1.5">
                  Select Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'In 2 Days'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`py-2 px-3 rounded-lg text-xs font-['JetBrains_Mono'] transition-all ${
                        selectedDay === d
                          ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-sm'
                          : 'bg-[#171f33] text-[#b9cacb] hover:bg-[#222a3d]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-['JetBrains_Mono'] text-[#849495] uppercase mb-1.5">
                  Select Time Slot (UTC-5 to UTC+5:30)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '10:00 AM UTC',
                    '02:00 PM UTC',
                    '04:30 PM UTC',
                    '07:00 PM UTC',
                  ].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-3 rounded-lg text-xs font-['JetBrains_Mono'] transition-all ${
                        selectedTime === t
                          ? 'bg-[#c0c1ff] text-[#1000a9] font-bold shadow-sm'
                          : 'bg-[#171f33] text-[#b9cacb] hover:bg-[#222a3d]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] text-[#849495] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="// e.g. Alexander Vance"
                    className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-white/[0.08] text-xs font-['JetBrains_Mono'] text-[#dae2fd] placeholder:text-[#3b494b] focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] text-[#849495] uppercase mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="// your-name@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-white/[0.08] text-xs font-['JetBrains_Mono'] text-[#dae2fd] placeholder:text-[#3b494b] focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-98"
              >
                Confirm 15-Min Meeting
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
