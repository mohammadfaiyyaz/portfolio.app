import React from 'react';
import { ASSETS } from '../data/portfolioData';
import { TabType } from '../types/portfolio';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDesktopView: boolean;
  setIsDesktopView: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenDrive: () => void;
  driveUser: User | null;
}

const TAB_TITLES: Record<TabType, string> = {
  overview: 'Overview',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  contact: 'Contact',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isDesktopView,
  setIsDesktopView,
  onOpenDrive,
  driveUser,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#060e20]/90 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo & Title breadcrumb */}
        <button
          onClick={() => onTabChange('overview')}
          className="flex items-center gap-2.5 min-w-0 text-left focus:outline-none group"
        >
          <img
            alt="MF Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSETS.logo}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#dbfcff] font-bold tracking-tight truncate">
                Mohammad Faiyyaz
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#65f2b5]/20 text-[#4edea3] font-['JetBrains_Mono'] text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                AVAILABLE
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-['JetBrains_Mono']">
              <span className="text-[#b9cacb] truncate">.NET Engineer</span>
              <span className="text-[#3b494b]">/</span>
              <span className="text-[#00dbe9] font-medium truncate">
                {TAB_TITLES[currentTab]}
              </span>
            </div>
          </div>
        </button>

        {/* Right: Quick actions, Google Drive trigger & Profile avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Google Drive Connect / Explorer Trigger */}
          <button
            onClick={onOpenDrive}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-['JetBrains_Mono'] transition-all border ${
              driveUser
                ? 'bg-[#171f33] border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#222a3d]'
                : 'bg-[#171f33] border-white/[0.06] text-[#b9cacb] hover:text-[#dbfcff] hover:bg-[#222a3d]'
            }`}
            title="Google Drive Cloud Storage"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              add_to_drive
            </span>
            <span className="hidden sm:inline">Drive</span>
            {driveUser && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            )}
          </button>

          {/* Optional Responsive/Mobile viewport toggler for desktop reviewers */}
          <button
            onClick={() => setIsDesktopView((prev) => !prev)}
            title={isDesktopView ? "Switch to Mobile Device Frame" : "Switch to Full Desktop Width"}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-[#171f33] border border-white/[0.06] hover:bg-[#222a3d] text-[#b9cacb] hover:text-[#dbfcff] font-['JetBrains_Mono'] text-[11px] transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isDesktopView ? 'smartphone' : 'desktop_windows'}
            </span>
            <span>{isDesktopView ? 'Mobile' : 'Full Width'}</span>
          </button>

          <button
            onClick={() => onTabChange('contact')}
            className="relative group p-0.5 rounded-full focus:outline-none"
            title="View Profile & Contact"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-all"
              src={ASSETS.profile}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4edea3] border-2 border-[#060e20] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
