"use client";
import React from "react";
import { PortalContentData, Language } from "./portalData";

interface PortalHeaderProps {
  t: PortalContentData;
  lang: Language;
  onLanguageToggle: (lang: Language) => void;
  isAlreadyAgent: boolean;
  onResumeMission: () => void;
  onTriggerScamTrap: () => void;
}

export function PortalHeader({
  t,
  lang,
  onLanguageToggle,
  isAlreadyAgent,
  onResumeMission,
  onTriggerScamTrap,
}: PortalHeaderProps) {
  return (
    <>
      {/* Portal Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-6 flex flex-wrap justify-between items-center border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-bold text-white tracking-wide text-xs sm:text-sm">
            {t.topTag}
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            {t.topSub}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {isAlreadyAgent && (
            <button
              onClick={onResumeMission}
              className="text-[11px] bg-green-700 hover:bg-green-600 text-white font-bold px-2.5 py-1 rounded-md cursor-pointer transition shadow flex items-center gap-1"
            >
              <span>🚨</span>
              <span>{t.resumeBtn}</span>
            </button>
          )}

          {/* 🌐 Prominent Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={() => onLanguageToggle("ja")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                lang === "ja"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇯🇵</span>
              <span>日本語</span>
            </button>
            <button
              onClick={() => onLanguageToggle("en")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                lang === "en"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portal Main Navigation */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow">
              M
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                MEDIA TRENDS
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Digital &amp; Career
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
              {t.navFeatured}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {t.navCareer}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {t.navSecurity}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {t.navRanking}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {isAlreadyAgent ? (
              <button
                onClick={onResumeMission}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg transition cursor-pointer shadow flex items-center gap-1"
              >
                <span>🚨</span>
                <span>{t.resumeBtn}</span>
              </button>
            ) : (
              <button
                onClick={onTriggerScamTrap}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-lg transition cursor-pointer shadow-sm"
              >
                {t.loginRegisterBtn}
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
