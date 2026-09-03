"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface PortalFooterProps {
  t: PortalContentData;
  copiedUrl: boolean;
  onShareLine: () => void;
  onCopyUrl: () => void;
}

export function PortalFooter({
  t,
  copiedUrl,
  onShareLine,
  onCopyUrl,
}: PortalFooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 text-center text-xs text-slate-500">
      <div className="max-w-md mx-auto px-4 mb-5">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center gap-2.5">
          <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
            <span>📢</span>
            <span>{t.footerShareTitle}</span>
          </span>
          <div className="flex gap-2 w-full">
            <button
              onClick={onShareLine}
              className="flex-1 py-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs rounded-xl cursor-pointer shadow flex items-center justify-center gap-1.5 transition"
            >
              <span>💬</span>
              <span>{t.footerShareLine}</span>
            </button>
            <button
              onClick={onCopyUrl}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow flex items-center justify-center gap-1.5 transition"
            >
              <span>📋</span>
              <span>{copiedUrl ? t.footerCopied : t.footerCopyUrl}</span>
            </button>
          </div>
        </div>
      </div>
      <p>© 2026 MEDIA TRENDS. All rights reserved.</p>
      <p className="mt-1 text-slate-400 text-[11px] px-4">
        {t.footerDisclaimer}
      </p>
    </footer>
  );
}
