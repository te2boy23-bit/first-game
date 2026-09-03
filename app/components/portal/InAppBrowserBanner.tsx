"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface InAppBrowserBannerProps {
  t: PortalContentData;
  copiedUrl: boolean;
  onOpenExternalBrowser: () => void;
  onCopyUrl: () => void;
}

export function InAppBrowserBanner({
  t,
  copiedUrl,
  onOpenExternalBrowser,
  onCopyUrl,
}: InAppBrowserBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-3 py-2 text-xs font-semibold flex flex-wrap items-center justify-between gap-2 shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
        <span className="text-base">📲</span>
        <span>{t.inAppBannerText}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenExternalBrowser}
          className="px-3 py-1 bg-black text-white text-[11px] font-bold rounded-md hover:bg-slate-900 transition cursor-pointer shadow flex items-center gap-1"
        >
          <span>🌐</span>
          <span>{t.inAppBannerOpen}</span>
        </button>
        <button
          onClick={onCopyUrl}
          className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-100 text-slate-900 text-[11px] font-bold rounded-md transition cursor-pointer"
        >
          {copiedUrl ? t.footerCopied : t.footerCopyUrl}
        </button>
      </div>
    </div>
  );
}
