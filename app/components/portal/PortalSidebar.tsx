"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface PortalSidebarProps {
  t: PortalContentData;
  isAlreadyAgent?: boolean;
  onResumeMission?: () => void;
  onTriggerScamTrap: () => void;
}

export function PortalSidebar({
  t,
  isAlreadyAgent,
  onResumeMission,
  onTriggerScamTrap,
}: PortalSidebarProps) {
  const handleClick =
    isAlreadyAgent && onResumeMission ? onResumeMission : onTriggerScamTrap;

  return (
    <aside className="space-y-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3.5 flex items-center gap-2">
          <span>🔥</span>
          <span>{t.sidebarRankingTitle}</span>
        </h3>
        <div className="space-y-3 text-xs">
          <div
            onClick={handleClick}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-200"
          >
            <span className="font-black text-rose-500 text-sm w-4">1</span>
            <div>
              <div className="font-bold text-slate-800 line-clamp-2 leading-snug">
                {t.sideRank1Title}
              </div>
              <div className="text-slate-400 mt-1 text-[11px]">
                {t.sideRank1Meta}
              </div>
            </div>
          </div>

          <div
            onClick={handleClick}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-200"
          >
            <span className="font-black text-amber-500 text-sm w-4">2</span>
            <div>
              <div className="font-bold text-slate-800 line-clamp-2 leading-snug">
                {t.sideRank2Title}
              </div>
              <div className="text-slate-400 mt-1 text-[11px]">
                {t.sideRank2Meta}
              </div>
            </div>
          </div>

          <div
            onClick={handleClick}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-200"
          >
            <span className="font-black text-slate-400 text-sm w-4">3</span>
            <div>
              <div className="font-bold text-slate-800 line-clamp-2 leading-snug">
                {t.sideRank3Title}
              </div>
              <div className="text-slate-400 mt-1 text-[11px]">
                {t.sideRank3Meta}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleClick}
        className={`p-5 rounded-2xl text-white cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] transition duration-200 border-2 relative overflow-hidden ${
          isAlreadyAgent
            ? "bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 border-emerald-500 shadow-emerald-950/40"
            : "bg-gradient-to-br from-pink-950 via-rose-950 to-purple-950 border-pink-500"
        }`}
      >
        <div
          className={`text-[10px] font-black px-2 py-0.5 rounded inline-block mb-2 shadow ${
            isAlreadyAgent
              ? "bg-emerald-600 text-white"
              : "bg-pink-600 text-white"
          }`}
        >
          {isAlreadyAgent ? t.agentVerifiedBadge : t.promoBadge}
        </div>
        <div
          className={`font-black text-sm mb-1 leading-snug ${
            isAlreadyAgent ? "text-emerald-200" : "text-pink-200"
          }`}
        >
          {isAlreadyAgent ? "🚨 潜入捜査セッション接続" : t.promoTitle}
        </div>
        <div
          className={`text-xs line-clamp-2 mb-3 ${
            isAlreadyAgent ? "text-emerald-300/90" : "text-pink-300"
          }`}
        >
          {isAlreadyAgent
            ? "認証済みの捜査官アカウントで、すぐにゲームチャット画面へ移行します。"
            : t.promoDesc}
        </div>
        <div
          className={`w-full py-2.5 font-black text-xs text-center rounded-xl shadow-md transition ${
            isAlreadyAgent
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950"
              : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white"
          }`}
        >
          {isAlreadyAgent ? t.resumeBtn : t.promoBtn}
        </div>
      </div>
    </aside>
  );
}
