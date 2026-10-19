/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewScreen } from './screens/OverviewScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { ExperienceScreen } from './screens/ExperienceScreen';
import { SkillsContactScreen } from './screens/SkillsContactScreen';
import { ResumeModal } from './components/ResumeModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ApiDocsModal } from './components/ApiDocsModal';
import { ScheduleModal } from './components/ScheduleModal';
import { GoogleDriveExplorerModal } from './components/GoogleDriveExplorerModal';
import { Project, TabType } from './types/portfolio';
import { initAuth } from './lib/googleAuth';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [isDesktopView, setIsDesktopView] = useState<boolean>(false);

  // Google Drive & Auth State
  const [driveUser, setDriveUser] = useState<User | null>(null);
  const [isDriveOpen, setIsDriveOpen] = useState(false);

  // Modal States
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isApiDocsOpen, setIsApiDocsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setDriveUser(user);
      },
      () => {
        setDriveUser(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Check URL hash on initial load or changes (e.g. #projects, #experience, #contact)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['overview', 'experience', 'projects', 'skills', 'contact'].includes(hash)) {
        setCurrentTab(hash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    window.location.hash = `#${tab}`;
  };

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedCaseStudy(project);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col items-center selection:bg-[#00f0ff] selection:text-[#002022]">
      {/* Container wrapper: either authentic mobile frame or responsive fluid container */}
      <div
        className={`w-full min-h-screen flex flex-col relative ${
          isDesktopView
            ? 'max-w-5xl'
            : 'max-w-md shadow-[0_0_80px_rgba(0,0,0,0.8)] border-x border-white/[0.04]'
        }`}
      >
        {/* Fixed Header */}
        <Header
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isDesktopView={isDesktopView}
          setIsDesktopView={setIsDesktopView}
          onOpenDrive={() => setIsDriveOpen(true)}
          driveUser={driveUser}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 pb-20 bg-[#0b1326]">
          {currentTab === 'overview' && (
            <OverviewScreen
              onTabChange={handleTabChange}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenArchitecture={() => setIsArchitectureOpen(true)}
            />
          )}

          {currentTab === 'experience' && (
            <ExperienceScreen onTabChange={handleTabChange} />
          )}

          {currentTab === 'projects' && (
            <ProjectsScreen
              onOpenCaseStudy={handleOpenCaseStudy}
              onOpenArchitecture={() => setIsArchitectureOpen(true)}
              onOpenApiDocs={() => setIsApiDocsOpen(true)}
            />
          )}

          {(currentTab === 'skills' || currentTab === 'contact') && (
            <SkillsContactScreen
              onOpenSchedule={() => setIsScheduleOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
      </div>

      {/* Google Drive Explorer Modal */}
      <GoogleDriveExplorerModal
        isOpen={isDriveOpen}
        onClose={() => setIsDriveOpen(false)}
        currentUser={driveUser}
        onAuthChange={(user) => setDriveUser(user)}
      />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      <ApiDocsModal
        isOpen={isApiDocsOpen}
        onClose={() => setIsApiDocsOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}
