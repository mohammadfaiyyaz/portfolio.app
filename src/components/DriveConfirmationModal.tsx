import React from 'react';

interface DriveConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  itemName?: string;
  confirmLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DriveConfirmationModal: React.FC<DriveConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  itemName,
  confirmLabel = 'Delete File',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0b1326] border border-[#ffb4ab]/40 rounded-xl flex flex-col shadow-[0_0_50px_rgba(255,180,171,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-[#131b2e] border-b border-white/[0.08]">
          <div className="w-10 h-10 rounded-full bg-[#ffb4ab]/15 flex items-center justify-center text-[#ffb4ab] shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              {isDestructive ? 'delete_forever' : 'warning'}
            </span>
          </div>
          <div>
            <h3 className="font-['Inter'] text-sm sm:text-base font-bold text-[#dbfcff]">
              {title}
            </h3>
            <p className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab]">
              Google Drive Operation Confirmation
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 text-xs text-[#b9cacb] font-['Inter']">
          <p className="leading-relaxed">{description}</p>
          {itemName && (
            <div className="p-2.5 rounded bg-[#060e20] border border-white/[0.06] font-['JetBrains_Mono'] text-[#dbfcff] break-all">
              {itemName}
            </div>
          )}
          <p className="text-[11px] text-[#849495] italic">
            This will mutate data on your connected Google Drive account.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-[#131b2e] border-t border-white/[0.08] flex items-center justify-end gap-2.5">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['JetBrains_Mono'] text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              isDestructive
                ? 'bg-[#93000a] hover:bg-[#ffb4ab] text-white hover:text-[#690005]'
                : 'bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022]'
            }`}
          >
            {isLoading && (
              <span className="material-symbols-outlined text-[16px] animate-spin">
                sync
              </span>
            )}
            <span>{isLoading ? 'Executing...' : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
