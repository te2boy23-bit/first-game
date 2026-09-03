"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface PoliceScoutModalProps {
  t: PortalContentData;
  isLoginMode: boolean;
  setIsLoginMode: (val: boolean) => void;
  nickname: string;
  setNickname: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onReturnToPortal: () => void;
  onSocialLogin: (provider: "google" | "github") => void;
}

export function PoliceScoutModal({
  t,
  isLoginMode,
  setIsLoginMode,
  nickname,
  setNickname,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit,
  onReturnToPortal,
  onSocialLogin,
}: PoliceScoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-gray-950 border-2 border-blue-500 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.4)] text-gray-100 animate-in zoom-in-95 duration-300 my-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white font-black text-xs uppercase shadow">
            {t.policeBadge}
          </div>
          <button
            onClick={onReturnToPortal}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            {t.scamClose} ✕
          </button>
        </div>

        <h2 className="text-lg sm:text-2xl font-black text-blue-400 mb-2.5 leading-snug">
          {t.policeTitle}
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
          {t.policeDesc}
        </p>

        <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-3.5 sm:p-4 mb-4">
          <div className="text-xs font-bold text-blue-300 mb-3">
            {t.policeFormTitle}
          </div>

          <div className="flex border-b border-gray-800 mb-3.5">
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 pb-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                !isLoginMode
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.tabRegister}
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 pb-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                isLoginMode
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.tabLogin}
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {!isLoginMode && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  {t.labelNickname}
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t.placeholderNickname}
                  className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base sm:text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                {t.labelEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@cyber.gov"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                {t.labelPassword}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-black rounded-xl text-white transition duration-200 shadow-lg shadow-blue-600/40 cursor-pointer disabled:opacity-50 text-xs sm:text-sm mt-2"
            >
              {isLoading
                ? "..."
                : isLoginMode
                  ? t.policeBtnLogin
                  : t.policeBtnStart}
            </button>
          </form>

          <div className="mt-3 pt-2.5 border-t border-gray-800 flex gap-2">
            <button
              type="button"
              onClick={() => onSocialLogin("google")}
              className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-200 transition cursor-pointer flex items-center justify-center gap-1"
            >
              <span>🌐</span> Google
            </button>
            <button
              type="button"
              onClick={() => onSocialLogin("github")}
              className="flex-1 py-2 bg-gray-800 text-white font-bold rounded-lg text-xs hover:bg-gray-700 transition border border-gray-700 cursor-pointer flex items-center justify-center gap-1"
            >
              <span>🐙</span> GitHub
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onReturnToPortal}
          className="w-full text-center py-2 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer"
        >
          {t.policeBackToPortal}
        </button>
      </div>
    </div>
  );
}
