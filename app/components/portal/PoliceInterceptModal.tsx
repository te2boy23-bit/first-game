"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface PoliceInterceptModalProps {
  t: PortalContentData;
  nickname: string;
  email: string;
  onStartGame: () => void;
}

export function PoliceInterceptModal({
  t,
  nickname,
  email,
  onStartGame,
}: PoliceInterceptModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-black border-2 border-yellow-500 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(234,179,8,0.4)] text-yellow-300 font-mono animate-in zoom-in-95 duration-300 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-600 text-black font-black text-xs uppercase mb-3 shadow">
          {t.warningBadge}
        </div>

        <h1 className="text-lg sm:text-2xl font-bold mb-2.5 text-yellow-400 leading-snug">
          {t.warningTitle}
        </h1>

        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-4">
          {t.warningDesc1}
          <br />
          <br />
          <span className="text-green-400 font-bold">{t.warningDesc2}</span>
        </p>

        <div className="bg-yellow-950/40 border border-yellow-800/60 rounded-lg p-3 sm:p-3.5 mb-4 text-xs space-y-1">
          <div className="text-yellow-400 font-bold">
            {t.warningTargetTitle}
          </div>
          <div>
            {t.warningName}:{" "}
            <span className="text-white font-bold">{nickname}</span>
          </div>
          <div>
            {t.warningEmail}:{" "}
            <span className="text-white font-bold">{email}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
          {t.warningDesc3}
        </p>

        <button
          onClick={onStartGame}
          className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl transition duration-200 cursor-pointer text-xs sm:text-base shadow-lg shadow-yellow-500/40 flex items-center justify-center gap-2"
        >
          <span>🚨</span>
          <span>{t.warningStartBtn}</span>
        </button>
      </div>
    </div>
  );
}
