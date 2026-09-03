"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";
import { checkIsInAppBrowser, getBaseSiteUrl } from "./lib/browserUtils";
import { portalContent, Language } from "./components/portal/portalData";
import { PortalHeader } from "./components/portal/PortalHeader";
import { PortalArticle } from "./components/portal/PortalArticle";
import { PortalSidebar } from "./components/portal/PortalSidebar";
import { InAppBrowserBanner } from "./components/portal/InAppBrowserBanner";
import { ScamTrapModal } from "./components/portal/ScamTrapModal";
import { PoliceScoutModal } from "./components/portal/PoliceScoutModal";
import { PoliceInterceptModal } from "./components/portal/PoliceInterceptModal";
import { InAppBrowserNoticeModal } from "./components/portal/InAppBrowserNoticeModal";
import { PortalFooter } from "./components/portal/PortalFooter";

export default function GeneralPortalPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("ja");

  // Scam Popup / Hijack State
  const [showScamModal, setShowScamModal] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [step, setStep] = useState<"portal" | "police_scout" | "hacked">(
    "portal",
  );
  const [, setEntryRoute] = useState<"closed" | "trapped">("trapped");
  const [isAlreadyAgent, setIsAlreadyAgent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [showInAppModal, setShowInAppModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Form States
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const articleTriggerRef = useRef<HTMLDivElement>(null);
  const t = portalContent[lang];

  useEffect(() => {
    setIsMounted(true);

    const { isInApp, isLine } = checkIsInAppBrowser();
    if (isInApp) {
      setIsInAppBrowser(true);
    }

    if (isLine && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (!url.searchParams.has("openExternalBrowser")) {
        url.searchParams.set("openExternalBrowser", "1");
        window.location.replace(url.toString());
      }
    }

    // OAuthアクセストークン（#access_token=...）がハッシュに含まれている場合の自動ログイン＆ダッシュボード遷移
    if (
      typeof window !== "undefined" &&
      window.location.hash.includes("access_token")
    ) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const nick =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            "Agent";
          const mail = session.user.email || "";
          localStorage.setItem("scam_nickname", nick);
          if (mail) localStorage.setItem("scam_email", mail);
          localStorage.setItem("scam_step", "game");
          router.push("/dashboard");
        }
      });
    }

    // URLにOAuthエラーやハッシュが含まれていた場合のクリーンアップ
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      if (
        currentUrl.searchParams.has("error") ||
        currentUrl.searchParams.has("error_description") ||
        (window.location.hash.includes("error=") &&
          !window.location.hash.includes("access_token"))
      ) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    }

    const savedStep = localStorage.getItem("scam_step");
    const savedNickname = localStorage.getItem("scam_nickname");
    if (savedStep === "game" || savedNickname) {
      setIsAlreadyAgent(true);
    }
    const savedLang = localStorage.getItem("scam_lang") as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, [router]);

  // スクロール検知：ページを少しでも下にスライド（150px以上スクロール）したら自動で詐欺トラップ・ログイン画面が発動！
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoTriggered || showScamModal || step !== "portal") return;

      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 150) {
        setHasAutoTriggered(true);
        triggerScamTrap();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoTriggered, showScamModal, step]);

  const triggerScamTrap = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setShowScamModal(true);
    }, 450);
  };

  const handleCloseModal = () => {
    setShowScamModal(false);
    setEntryRoute("closed");
    setStep("police_scout");
  };

  const handleReturnToPortal = () => {
    setStep("portal");
    setShowScamModal(false);
    setHasAutoTriggered(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert(
        lang === "ja"
          ? "メールアドレスとパスワードを入力してください。"
          : "Please enter email and password.",
      );
      return;
    }

    setIsLoading(true);
    const finalNickname =
      nickname.trim() ||
      (lang === "en" ? "Agent" : "エージェント") +
        Math.floor(Math.random() * 1000);

    localStorage.setItem("scam_nickname", finalNickname);
    localStorage.setItem("scam_email", email);
    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);

    setTimeout(() => {
      setIsLoading(false);
      setShowScamModal(false);
      if (isLoginMode) {
        router.push("/dashboard");
      } else {
        setStep("hacked");
      }
    }, 800);
  };

  const handleOpenExternalBrowser = () => {
    if (typeof window === "undefined") return;
    const currentUrl = window.location.href;
    const { isLine, isAndroid } = checkIsInAppBrowser();

    if (isLine) {
      const url = new URL(currentUrl);
      url.searchParams.set("openExternalBrowser", "1");
      window.location.href = url.toString();
      return;
    }

    if (isAndroid) {
      const cleanUrl = currentUrl.replace(/^https?:\/\//, "");
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
      return;
    }

    handleCopyUrl();
    alert(
      lang === "ja"
        ? "URLをコピーしました！Safariのアドレスバーに貼り付けて開いてください。"
        : "URL copied! Please paste into Safari or Chrome to open.",
    );
  };

  const handleCopyUrl = () => {
    if (typeof window === "undefined") return;
    const base = getBaseSiteUrl();
    const url = new URL(window.location.pathname, base);
    url.searchParams.set("openExternalBrowser", "1");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url.toString());
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  const handleShareLine = () => {
    if (typeof window === "undefined") return;
    const base = getBaseSiteUrl();
    const shareUrl = new URL(base);
    shareUrl.searchParams.set("openExternalBrowser", "1");
    const text = encodeURIComponent(
      lang === "ja"
        ? "🚨【潜入捜査ゲーム】怪しい副業詐欺グループを暴け！\n" +
            shareUrl.toString()
        : "🚨 Undercover Cyber Agent: Bust scam syndicates!\n" +
            shareUrl.toString(),
    );
    window.open(`https://line.me/R/msg/text/?${text}`, "_blank");
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    const { isInApp, isLine } = checkIsInAppBrowser();

    if (provider === "google" && isInApp) {
      if (isLine) {
        handleOpenExternalBrowser();
        return;
      }
      setShowInAppModal(true);
      return;
    }

    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);

    // Vercel本番・スマホ環境で確実にVercelのURLへ戻れるようオリジンを判定
    const currentOrigin = getBaseSiteUrl();
    const redirectUrl = `${currentOrigin}/auth/callback?next=/dashboard`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      alert("ソーシャルログイン失敗: " + error.message);
    }
  };

  const handleResumeMission = () => {
    let currentNick = localStorage.getItem("scam_nickname");
    if (!currentNick) {
      currentNick = lang === "en" ? "Agent" : "エージェント";
      localStorage.setItem("scam_nickname", currentNick);
    }
    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);
    router.push("/dashboard");
  };

  const handleStartGame = () => {
    handleResumeMission();
  };

  const handleLanguageToggle = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("scam_lang", newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* ⚡ Glitch Hijack Flash Effect */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex flex-col items-center justify-center animate-pulse">
          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-rose-400 tracking-widest text-center px-4">
            ⚠️ CONNECTING TO SPECIAL MONITOR ROOM...
          </div>
          <div className="text-xs text-rose-200 mt-3 font-mono">
            {lang === "ja"
              ? "特別枠へ自動接続しています..."
              : "Connecting to secret terminal..."}
          </div>
        </div>
      )}

      {/* 📱 IN-APP BROWSER (LINE/SNS) NOTICE BANNER */}
      {isMounted && isInAppBrowser && (
        <InAppBrowserBanner
          t={t}
          copiedUrl={copiedUrl}
          onOpenExternalBrowser={handleOpenExternalBrowser}
          onCopyUrl={handleCopyUrl}
        />
      )}

      {/* 📰 ORDINARY INNOCENT WEB PORTAL / MAGAZINE */}
      <PortalHeader
        t={t}
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        isAlreadyAgent={isMounted && isAlreadyAgent}
        onResumeMission={handleResumeMission}
        onTriggerScamTrap={triggerScamTrap}
      />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <PortalArticle t={t} articleTriggerRef={articleTriggerRef} />
        <PortalSidebar t={t} onTriggerScamTrap={triggerScamTrap} />
      </main>

      {/* 🚨 MODALS */}
      {showScamModal && step === "portal" && (
        <ScamTrapModal
          t={t}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          onSocialLogin={handleSocialLogin}
        />
      )}

      {step === "police_scout" && (
        <PoliceScoutModal
          t={t}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onReturnToPortal={handleReturnToPortal}
          onSocialLogin={handleSocialLogin}
        />
      )}

      {step === "hacked" && (
        <PoliceInterceptModal
          t={t}
          nickname={nickname}
          email={email}
          onStartGame={handleStartGame}
        />
      )}

      {showInAppModal && (
        <InAppBrowserNoticeModal
          t={t}
          copiedUrl={copiedUrl}
          onClose={() => setShowInAppModal(false)}
          onOpenExternalBrowser={handleOpenExternalBrowser}
          onCopyUrl={handleCopyUrl}
        />
      )}

      <PortalFooter
        t={t}
        copiedUrl={copiedUrl}
        onShareLine={handleShareLine}
        onCopyUrl={handleCopyUrl}
      />
    </div>
  );
}
