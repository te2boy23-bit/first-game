"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface InAppBrowserNoticeModalProps {
  t: PortalContentData;
  copiedUrl: boolean;
  onClose: () => void;
  onOpenExternalBrowser: () => void;
  onCopyUrl: () => void;
}

export function InAppBrowserNoticeModal({
  t,
  copiedUrl,
  onClose,
  onOpenExternalBrowser,
  onCopyUrl,
}: InAppBrowserNoticeModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <span>📱</span>
            <span>{t.inAppModalTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-3.5 space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <p>{t.inAppModalDesc}</p>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1.5">
            <div className="font-bold text-white text-[11px]">
              {t.inAppModalStepTitle}
            </div>
            <div className="text-[11px] text-slate-300 whitespace-pre-line">
              {`${t.inAppModalStep1}\n${t.inAppModalStep2}`}
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1.5">
          <button
            type="button"
            onClick={onOpenExternalBrowser}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg flex items-center justify-center gap-2 transition"
          >
            <span>🌐</span>
            <span>{t.inAppModalOpenBtn}</span>
          </button>

          <button
            type="button"
            onClick={onCopyUrl}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs cursor-pointer border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <span>📋</span>
            <span>{copiedUrl ? t.footerCopied : t.inAppModalCopyBtn}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-slate-400 hover:text-slate-200 text-[11px] font-medium cursor-pointer transition text-center"
          >
            {t.inAppModalEmailChoice}
          </button>
        </div>
      </div>
    </div>
  );
}
