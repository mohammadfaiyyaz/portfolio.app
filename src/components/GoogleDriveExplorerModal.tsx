import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logout, getAccessToken } from '../lib/googleAuth';
import {
  DriveFile,
  listDriveFiles,
  createDriveFolder,
  uploadTextToDrive,
  deleteDriveFile,
} from '../lib/googleDriveService';
import { GoogleSignInButton } from './GoogleSignInButton';
import { DriveConfirmationModal } from './DriveConfirmationModal';

interface GoogleDriveExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAuthChange: (user: User | null) => void;
}

export const GoogleDriveExplorerModal: React.FC<GoogleDriveExplorerModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthChange,
}) => {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [scopeError, setScopeError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New folder dialog
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Confirmation dialog for deletion
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch files when modal opens and user is logged in
  useEffect(() => {
    if (isOpen && currentUser) {
      loadFiles();
    }
  }, [isOpen, currentUser]);

  const loadFiles = async (query = searchQuery) => {
    const token = await getAccessToken();
    if (!token) {
      setScopeError(true);
      return;
    }

    setLoading(true);
    try {
      const data = await listDriveFiles(token, query);
      setFiles(data);
      setScopeError(false);
    } catch (err: any) {
      console.error(err);
      if (err.isScopeError || err.status === 403 || err.message?.includes('insufficient')) {
        setScopeError(true);
        const { clearCachedToken } = await import('../lib/googleAuth');
        clearCachedToken();
      }
      setNotification({ type: 'error', message: err.message || 'Failed to list Drive files' });
    } finally {
      setLoading(false);
    }
  };

  const handleReauth = async () => {
    setAuthLoading(true);
    setNotification(null);
    try {
      const { clearCachedToken } = await import('../lib/googleAuth');
      clearCachedToken();
      const result = await googleSignIn(true);
      if (result) {
        onAuthChange(result.user);
        setScopeError(false);
        setNotification({ type: 'success', message: 'Drive permissions granted!' });
        const data = await listDriveFiles(result.accessToken, searchQuery);
        setFiles(data);
      }
    } catch (err: any) {
      console.error(err);
      setNotification({ type: 'error', message: err.message || 'Authorization failed' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignIn = async () => {
    setAuthLoading(true);
    setNotification(null);
    try {
      const result = await googleSignIn();
      if (result) {
        onAuthChange(result.user);
        setNotification({ type: 'success', message: `Connected as ${result.user.email}` });
        const data = await listDriveFiles(result.accessToken);
        setFiles(data);
      }
    } catch (err: any) {
      console.error(err);
      setNotification({ type: 'error', message: err.message || 'Google Sign-in failed' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onAuthChange(null);
      setFiles([]);
      setNotification({ type: 'success', message: 'Signed out from Google Drive' });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSaveResumeToDrive = async () => {
    const token = await getAccessToken();
    if (!token) {
      setNotification({ type: 'error', message: 'Please sign in to Google Drive first' });
      return;
    }

    setLoading(true);
    try {
      const resumeMarkdown = `# MOHAMMAD FAIYYAZ - FULL STACK .NET DEVELOPER
Location: Noida, India (Open to Global Relocation / Remote)
Email: faiyyaz.dev@example.com

## PROFESSIONAL SUMMARY
Production-focused Software Engineer with 4+ years of professional experience specializing in enterprise-scale Hospital Information Management Systems (HIMS), high-throughput C# microservices, resilient ASP.NET Core Web APIs, and low-latency MS SQL Server data layers.

## CORE COMPETENCIES
- C# 12, .NET Core 6/7/8, ASP.NET Core Web API, ASP.NET MVC, Microservices, Clean Architecture, CQRS, SOLID
- Microsoft SQL Server, Entity Framework Core, Dapper, T-SQL, Stored Procedures, Performance Indexing, Redis
- TypeScript, Angular, HTML5/CSS3, Tailwind CSS, Bootstrap, JavaScript (ES6+), SignalR, WebRTC
- Azure DevOps, CI/CD Pipelines, Git, GitHub, IIS, Docker, Swagger/OpenAPI, Postman, xUnit

## EXPERIENCE
Software Developer / Software Engineer
Triotree Technologies Pvt. Ltd. | Noida, NCR, India (Oct 2019 – Dec 2023)
- Engineered core operational modules for enterprise HIMS using ASP.NET Core and SQL Server.
- Designed scalable Web API micro-endpoints handling 50k+ daily transactions across IPD, OPD, pharmacy inventory, and automated billing.
- Refactored mission-critical SQL stored procedures and EF Core query plans, slashing patient record retrieval latency by 35%.
- Spearheaded progressive migration converting legacy monolithic ASP.NET MVC components to modular .NET Core 6 & 7 services.

## CERTIFICATIONS
- Microsoft Certified: Azure Developer Associate
- C# Specialization Assessment (Advanced)
`;
      await uploadTextToDrive(
        token,
        `Mohammad_Faiyyaz_Resume_${new Date().toISOString().split('T')[0]}.md`,
        resumeMarkdown,
        'text/markdown'
      );
      setNotification({
        type: 'success',
        message: 'Mohammad Faiyyaz Resume saved to your Google Drive!',
      });
      await loadFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save resume' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveArchitectureToDrive = async () => {
    const token = await getAccessToken();
    if (!token) return;

    setLoading(true);
    try {
      const architectureDoc = `# HIMS Real-Time Clinical Core: Architecture Blueprint
Author: Mohammad Faiyyaz (.NET Engineer)
System: Triotree Suite Enterprise Healthcare Platform

## Distributed Microservices Topology
1. API Gateway & JWT Claim Dispatcher (ASP.NET Core YARP, sub-4ms token verification)
2. Patient Workflow Engine (CQRS, MediatR, C# 12, 50k+ daily transactions)
3. Real-Time Telemetry Hub (SignalR WebSockets, Redis backplane, sub-180ms latency)
4. High-Throughput Clinical Billing Engine (RabbitMQ event-driven queue)
5. Partitioned SQL Server Enterprise Data Tier (Page compression, clustered index tuning)

## Production SLA
- 99.9% verifiable uptime across 20+ multi-speciality clinical branches
- Zero-downtime blue/green deployment strategy
`;
      await uploadTextToDrive(
        token,
        `HIMS_Architecture_Blueprint_${new Date().toISOString().split('T')[0]}.md`,
        architectureDoc,
        'text/markdown'
      );
      setNotification({
        type: 'success',
        message: 'Architecture Blueprint saved to your Google Drive!',
      });
      await loadFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save blueprint' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const token = await getAccessToken();
    if (!token) return;

    setLoading(true);
    try {
      await createDriveFolder(token, newFolderName.trim());
      setNotification({ type: 'success', message: `Folder "${newFolderName}" created!` });
      setNewFolderName('');
      setShowNewFolderInput(false);
      await loadFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to create folder' });
    } finally {
      setLoading(false);
    }
  };

  const executeDelete = async () => {
    if (!fileToDelete) return;
    const token = await getAccessToken();
    if (!token) return;

    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setNotification({
        type: 'success',
        message: `File "${fileToDelete.name}" deleted from Google Drive`,
      });
      setFileToDelete(null);
      await loadFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to delete file' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0b1326] border border-[#00f0ff]/40 rounded-xl flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/15 flex items-center justify-center text-[#00f0ff]">
              <span className="material-symbols-outlined text-[20px]">
                add_to_drive
              </span>
            </div>
            <div>
              <h3 className="font-['JetBrains_Mono'] text-sm text-[#dbfcff] font-bold">
                Google Drive Cloud Storage
              </h3>
              <p className="text-[11px] text-[#849495] font-['JetBrains_Mono']">
                Portfolio Documentation &amp; Cloud Asset Synchronization
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[#dae2fd]">
          {/* Notification Banner */}
          {notification && (
            <div
              className={`p-3 rounded-lg text-xs font-['JetBrains_Mono'] flex items-center justify-between ${
                notification.type === 'success'
                  ? 'bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30'
                  : 'bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30'
              }`}
            >
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="text-xs hover:underline ml-2"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* User Auth Section */}
          {!currentUser ? (
            <div className="p-6 rounded-xl bg-[#171f33] border border-white/[0.06] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#222a3d] flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-[32px]">
                  cloud_sync
                </span>
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-['Inter'] text-base font-bold text-[#dbfcff]">
                  Connect your Google Drive
                </h4>
                <p className="font-['Inter'] text-xs text-[#b9cacb] leading-relaxed">
                  Sign in with your Google Account to export Mohammad Faiyyaz's resumes, inspect system architecture blueprints, and manage technical documentation directly in your Drive.
                </p>
              </div>

              <div className="pt-2">
                <GoogleSignInButton
                  onClick={handleSignIn}
                  isLoading={authLoading}
                  text="Connect Google Drive"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Account Strip */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#171f33] border border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full border border-[#00f0ff]/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff] font-bold">
                      {currentUser.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-['Inter'] text-xs sm:text-sm font-bold text-[#dbfcff] flex items-center gap-1.5">
                      <span>{currentUser.displayName || 'Google Drive User'}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-['JetBrains_Mono'] font-bold">
                        CONNECTED
                      </span>
                    </div>
                    <div className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loadFiles()}
                    disabled={loading}
                    className="p-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#00f0ff] transition-colors"
                    title="Refresh files"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] text-[#b9cacb] font-['JetBrains_Mono'] text-xs transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Scope Error Warning & Recovery Banner */}
              {scopeError && (
                <div className="p-4 rounded-xl bg-[#222a3d] border border-[#ffb4ab]/40 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-[24px] shrink-0 mt-0.5">
                      lock_person
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-['Inter'] text-sm font-bold text-[#dbfcff]">
                        Google Drive Permission Required
                      </h4>
                      <p className="font-['Inter'] text-xs text-[#b9cacb] leading-relaxed">
                        Google Drive access scopes have not been approved for this session. Click below to grant permissions and ensure you check the Google Drive access boxes on Google's consent screen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleReauth}
                      disabled={authLoading}
                      className="px-4 py-2 rounded-lg bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">key</span>
                      <span>{authLoading ? 'Authorizing...' : 'Grant Drive Permissions'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Fast Portfolio Exporters to Drive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleSaveResumeToDrive}
                  disabled={loading}
                  className="p-3 rounded-lg bg-[#131b2e] hover:bg-[#1a233b] border border-[#00f0ff]/20 flex items-center justify-between text-left transition-all active:scale-98"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[#00f0ff] text-[20px] shrink-0">
                      description
                    </span>
                    <div className="min-w-0">
                      <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#dbfcff] block truncate">
                        Save Executive Resume
                      </span>
                      <span className="text-[10px] text-[#b9cacb] block">
                        Uploads Markdown CV to your Drive
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
                    cloud_upload
                  </span>
                </button>

                <button
                  onClick={handleSaveArchitectureToDrive}
                  disabled={loading}
                  className="p-3 rounded-lg bg-[#131b2e] hover:bg-[#1a233b] border border-[#4edea3]/20 flex items-center justify-between text-left transition-all active:scale-98"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[#4edea3] text-[20px] shrink-0">
                      schema
                    </span>
                    <div className="min-w-0">
                      <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#dbfcff] block truncate">
                        Save Architecture Blueprint
                      </span>
                      <span className="text-[10px] text-[#b9cacb] block">
                        Uploads HIMS system spec
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                    cloud_upload
                  </span>
                </button>
              </div>

              {/* Toolbar: Search & Create Folder */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex-1 min-w-[200px] relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      loadFiles(e.target.value);
                    }}
                    placeholder="Search Google Drive files..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#060e20] border border-white/[0.08] text-xs font-['JetBrains_Mono'] text-[#dae2fd] placeholder:text-[#3b494b] focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setShowNewFolderInput((prev) => !prev)}
                  className="px-3 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/[0.04]"
                >
                  <span className="material-symbols-outlined text-[16px]">create_new_folder</span>
                  <span>New Folder</span>
                </button>
              </div>

              {/* New Folder Form */}
              {showNewFolderInput && (
                <form
                  onSubmit={handleCreateFolder}
                  className="p-3 rounded-lg bg-[#060e20] border border-[#00f0ff]/30 flex items-center gap-2"
                >
                  <input
                    type="text"
                    required
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Folder name (e.g. Portfolio Reviews)"
                    className="flex-1 px-3 py-1.5 rounded bg-[#131b2e] border border-white/[0.08] text-xs font-['JetBrains_Mono'] text-[#dae2fd] focus:outline-none focus:border-[#00f0ff]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-3 py-1.5 rounded bg-[#00f0ff] text-[#002022] font-['JetBrains_Mono'] text-xs font-bold"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewFolderInput(false)}
                    className="px-2 py-1.5 rounded text-[#849495] hover:text-[#dae2fd] text-xs"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Files List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#849495] px-1">
                  <span>Drive Files ({files.length})</span>
                  <span>Order: Modified Date</span>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-[#b9cacb] font-['JetBrains_Mono'] text-xs space-y-2">
                    <span className="material-symbols-outlined text-[28px] text-[#00f0ff] animate-spin">
                      sync
                    </span>
                    <div>Fetching Drive items...</div>
                  </div>
                ) : files.length === 0 ? (
                  <div className="p-8 rounded-xl bg-[#131b2e] border border-white/[0.04] text-center space-y-2">
                    <span className="material-symbols-outlined text-[32px] text-[#849495]">
                      folder_open
                    </span>
                    <div className="font-['Inter'] text-sm text-[#dae2fd] font-semibold">
                      No files matching query
                    </div>
                    <p className="font-['Inter'] text-xs text-[#b9cacb]">
                      Use the quick exporter above to save Mohammad's CV directly to your Drive!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04] rounded-xl bg-[#131b2e] border border-white/[0.04] overflow-hidden">
                    {files.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      return (
                        <div
                          key={file.id}
                          className="p-3 hover:bg-[#171f33] transition-colors flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`material-symbols-outlined text-[20px] shrink-0 ${
                                isFolder ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'
                              }`}
                            >
                              {isFolder ? 'folder' : 'draft'}
                            </span>
                            <div className="min-w-0">
                              <span className="font-['JetBrains_Mono'] text-xs text-[#dbfcff] font-medium block truncate">
                                {file.name}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] text-[#849495] font-['JetBrains_Mono']">
                                <span>{new Date(file.modifiedTime).toLocaleDateString()}</span>
                                {file.size && (
                                  <>
                                    <span>•</span>
                                    <span>{(Number(file.size) / 1024).toFixed(1)} KB</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded hover:bg-[#222a3d] text-[#00dbe9] transition-colors"
                                title="Open in Google Drive"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  open_in_new
                                </span>
                              </a>
                            )}
                            <button
                              onClick={() => setFileToDelete(file)}
                              className="p-1.5 rounded hover:bg-[#ffb4ab]/20 text-[#849495] hover:text-[#ffb4ab] transition-colors"
                              title="Delete file"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="font-['JetBrains_Mono'] text-[#849495]">
            Google Workspace Drive Integration Active
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog before Deletion */}
      <DriveConfirmationModal
        isOpen={Boolean(fileToDelete)}
        title="Delete Google Drive Item?"
        description="Are you sure you want to delete this item from your Google Drive? This action cannot be undone."
        itemName={fileToDelete?.name}
        confirmLabel="Confirm Delete"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={executeDelete}
        onCancel={() => setFileToDelete(null)}
      />
    </div>
  );
};
