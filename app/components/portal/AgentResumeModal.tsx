"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface AgentResumeModalProps {
  t: PortalContentData;
  nickname: string;
  email: string;
  onResumeMission: () => void;
  onSwitchAccount: () => void;
  onClose: () => void;
}

export function AgentResumeModal({
  t,
  nickname,
  email,
  onResumeMission,
  onSwitchAccount,
  onClose,
}: AgentResumeModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-lg bg-gray-950 border-2 border-emerald-500 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.35)] text-gray-100 my-auto">
        {/* Badge & Close */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 text-white font-black text-xs uppercase shadow">
            <span>🛡️</span>
            <span>{t.agentVerifiedBadge}</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            {t.scamClose} ✕
          </button>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl sm:text-2xl font-black text-emerald-400 mb-2 leading-snug">
          {t.agentWelcomeBack}
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
          {t.agentResumeDesc}
        </p>

        {/* Agent Profile Box */}
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5 sm:p-4 mb-5 text-xs space-y-1.5">
          <div className="text-emerald-400 font-bold text-xs">
            👤 捜査官ステータス (Authenticated Agent)
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60 text-slate-200">
            <span className="text-slate-400">コードネーム (Name):</span>
            <span className="text-white font-bold text-sm">{nickname || "Agent"}</span>
          </div>
          {email && (
            <div className="flex items-center justify-between text-slate-200">
              <span className="text-slate-400">登録連絡先 (Contact):</span>
              <span className="text-emerald-200 font-mono text-[11px]">{email}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onResumeMission}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black rounded-xl text-sm sm:text-base cursor-pointer shadow-lg shadow-emerald-600/40 flex items-center justify-center gap-2 transition duration-200"
          >
            <span>🚨</span>
            <span>{t.agentStartGameBtn}</span>
          </button>

          <button
            type="button"
            onClick={onSwitchAccount}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs cursor-pointer border border-slate-700 transition text-center"
          >
            {t.agentSwitchAccountBtn}
          </button>
        </div>

        {/* Back Link */}
        <button
          type="button"
          onClick={onClose}
          className="w-full text-center py-2.5 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer mt-2"
        >
          {t.agentBackToArticle}
        </button>
      </div>
    </div>
  );
}
