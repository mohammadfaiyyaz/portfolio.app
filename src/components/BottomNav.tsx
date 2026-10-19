import React from 'react';
import { TabType } from '../types/portfolio';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  key: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: 'terminal' },
  { key: 'experience', label: 'Experience', icon: 'rebase_edit' },
  { key: 'projects', label: 'Projects', icon: 'layers' },
  { key: 'skills', label: 'Skills', icon: 'memory' },
  { key: 'contact', label: 'Contact', icon: 'alternate_email' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#060e20]/90 backdrop-blur-xl border-t border-white/[0.04] shadow-[0_-2px_16px_rgba(0,0,0,0.4)]">
      <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                onTabChange(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-all relative ${
                isActive
                  ? 'text-[#00f0ff]'
                  : 'text-[#849495] hover:text-[#dae2fd]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase font-semibold">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
