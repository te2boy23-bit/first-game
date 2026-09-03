"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface ScamTrapModalProps {
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
  onClose: () => void;
  onSocialLogin: (provider: "google" | "github") => void;
}

export function ScamTrapModal({
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
  onClose,
  onSocialLogin,
}: ScamTrapModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
      <div className="w-full max-w-md bg-gray-950 border-2 border-pink-500 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.5)] overflow-hidden relative text-gray-100 my-auto">
        <div className="bg-pink-600 text-white text-[11px] font-black text-center py-1.5 px-3 sm:px-4 tracking-wider flex items-center justify-between">
          <span>{t.scamBadge}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 font-bold px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 cursor-pointer text-xs transition flex items-center gap-1"
            title={t.scamClose}
          >
            <span>✕</span> <span>{t.scamClose}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 bg-gradient-to-b from-pink-950/60 to-gray-950 border-b border-pink-900/50">
          <div className="flex items-center gap-2 text-xs font-bold text-green-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            {t.scamAllocated}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-2">
            {t.scamCatch}
          </h3>
          <p className="text-xs text-pink-300 font-medium leading-relaxed">
            ✨ {t.scamLead}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex border-b border-gray-800 mb-4">
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 pb-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                !isLoginMode
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.tabRegister}
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 pb-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                isLoginMode
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.tabLogin}
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  {t.labelNickname}
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t.placeholderNickname}
                  className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none text-base sm:text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t.labelEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none text-base sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t.labelPassword}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none text-base sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 font-black rounded-xl text-white transition duration-200 shadow-lg shadow-pink-600/40 cursor-pointer disabled:opacity-50 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? "..." : isLoginMode ? t.btnLogin : t.btnRegister}
            </button>
          </form>

          <div className="mt-4 pt-2">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-[11px]">
                {t.socialDivider}
              </span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <div className="mt-3 flex gap-2">
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
        </div>
      </div>
    </div>
  );
}
