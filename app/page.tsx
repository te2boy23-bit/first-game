"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

const portalContent = {
  ja: {
    topTag: "IT & Lifestyle Web Magazine",
    topSub: "暮らしとデジタルの最新トレンドメディア",
    resumeBtn: "🚨 潜入捜査を再開",
    navFeatured: "特集記事",
    navCareer: "副業・キャリア",
    navSecurity: "ITセキュリティ",
    navRanking: "ランキング",
    loginRegisterBtn: "ログイン / 会員登録",
    breadcrumbHome: "HOME",
    breadcrumbCategory: "キャリア・副業",
    breadcrumbFeature: "特集",
    articleTitle:
      "【2026年最新】知っておきたい「在宅ワーク＆ネット副業」の正しい始め方とリスク対策",
    articleAuthor: "✍️ 編集部 ライフキャリア班",
    articleDate: "📅 2026.09.02 公開",
    articleViews: "👁️ 24,510 views",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "スキマ時間で賢く稼ぐ！令和の副業新常識",
    leadText:
      "近年、スマートフォンやPCを活用した在宅ワーク・スキマ時間副業が急速に普及しています。通勤時間や就寝前のちょっとした時間を活用して収入を増やせる選択肢が広がる一方で、インターネット上にはさまざまな情報があふれています。",
    heading1: "1. ネット副業が選ばれる理由と人気ジャンル",
    body1:
      "初心者でも取り組みやすいジャンルとしては、データ入力、アンケートモニター、スキルシェア、SNS運用代行などが挙げられます。自分に合った作業量とスキルに応じてステップアップしていくのが成功の秘訣です。",
    rankingBoxTitle: "📊 2026年 人気副業満足度ランキング",
    rank1: "🥇 1位：オンラインリサーチ・アンケート",
    rank2: "🥈 2位：データ入力・文字起こし",
    rank3: "🥉 3位：Webライティング・校正",
    rank4: "🏅 4位：フリマアプリ不用品販売",
    heading2: "2. 甘い誘惑にご用心！怪しい話の見極め方",
    body2_1:
      "「誰でもポチポチするだけで日給5万円」「未経験から即日100万円」といった極端な高収入案件には注意が必要です。正規の業務では、作業内容に見合った報酬体系が明確に設定されています。",
    body2_2:
      "特に、登録料や教材費を事前請求してくる業者や、指定口座への振り込みを急かす相手には警戒が必要です。",
    heading3: "3. まとめ：安全な環境で第一歩を踏み出そう",
    body3:
      "正しい知識を持って取り組めば、ネット副業はキャリアの大きな可能性を広げてくれます。信頼できるプラットフォームを選び、着実にスキルを磨いていきましょう。",
    commentsTeaser: "💬 この記事の読者コメント・関連広告を読み込み中...",
    sidebarRankingTitle: "🔥 人気記事ランキング",
    sideRank1Title:
      "【特別調査】スマホ完結で月収50万円？話題の副業を試してみた",
    sideRank1Meta: "2026.09.02 • 特集",
    sideRank2Title: "「日給5万円」は本当か？裏案件モニター体験レポート",
    sideRank2Meta: "2026.09.01 • 調査",
    sideRank3Title: "リモートワークで集中力を高める最強デスク環境10選",
    sideRank3Meta: "2026.08.30 • ガジェット",
    promoBadge: "✨ 限定モニター募集中",
    promoTitle: "【即日入金】日給5万円の特別ワーク！？",
    promoDesc: "「簡単な作業だけで即日報酬GET！今すぐ特別枠をチェック」",
    promoBtn: "👉 無料で特別枠を確認する ＞＞",
    scamBadge: "✨ 先着3名様限定・特別シークレット案件",
    scamClose: "閉じる",
    scamAllocated: "🟢 特別モニター枠が割り当てられました",
    scamCatch: "「スマホをタップするだけで日給5万円確定！？」",
    scamLead:
      "簡単な作業ですぐに報酬GET！アカウント作成で秘密のチャット（潜入捜査）を開始できます。",
    tabRegister: "新規アカウント登録",
    tabLogin: "ログインして捜査再開",
    labelNickname: "捜査官コードネーム（ニックネーム）",
    placeholderNickname: "例：カモ太郎",
    labelEmail: "連絡用メールアドレス",
    labelPassword: "パスワード",
    btnRegister: "🚀 無料登録して潜入チャットを開く",
    btnLogin: "捜査（ログイン）を再開する 💻",
    socialDivider: "またはソーシャルアカウントで接続",
    policeBadge: "👮‍♂️ 警視庁 サイバー犯罪対策課 特命スカウト班",
    policeTitle: "見事だ！怪しい詐欺広告を回避したな。",
    policeDesc:
      "君のその高い防犯意識と冷静な判断力を見込んで、警視庁サイバー対策課から特命スカウトだ。現在、ネット上に潜む悪質な詐欺グループを壊滅させるための極秘捜査を進めている。ぜひ、君の頭脳を活かして【おとり捜査官（サイバーエージェント）】として協力してくれないか？",
    policeFormTitle: "📋 【おとり捜査官アカウント登録・ログイン】",
    policeBtnStart: "おとり捜査官として任務を開始する 🚨",
    policeBtnLogin: "捜査を再開する 💻",
    policeBackToPortal: "◀ ホームページに戻って記事を読む",
    warningBadge: "⚠️ 警視庁 サイバー犯罪対策課 緊急通信",
    warningTitle: "おい、危ないところだったぞ！",
    warningDesc1:
      "あんな怪しい高額副業に個人情報を入力するのは極めて危険だ。本来なら完全に詐欺グループにカモられるところだったぞ！",
    warningDesc2:
      "……だが安心しろ！今回は我々サイバー対策課が事前に通信を傍受・保護していたため、実際の被害は一切発生していない。",
    warningTargetTitle: "【保護されたターゲット情報】",
    warningName: "登録名",
    warningEmail: "連絡先",
    warningDesc3:
      "怪我の功名だ。今入力したデータを使って奴らのサーバーへ逆に侵入し、組織の全貌と証拠を暴く【おとり捜査官】として任務に就いてもらう！",
    warningStartBtn: "捜査任務を開始する ＞",
    footerShareTitle: "友達にシェアして捜査官を増やそう！",
    footerShareLine: "LINEでシェア",
    footerCopyUrl: "URLコピー",
    footerCopied: "✔ コピー済",
    footerDisclaimer:
      "※本サイトは防犯啓発を目的としたシミュレーションゲームです。",
    inAppBannerText:
      "LINE等のアプリ内ブラウザで開いています。Googleログインや快適な操作には外部ブラウザをご利用ください。",
    inAppBannerOpen: "Safari / Chromeで開く",
    inAppModalTitle: "外部ブラウザで開く案内",
    inAppModalDesc:
      "Googleログインは、LINEやSNSアプリ内の制限（セキュリティ方針）によりブロックされる場合があります。",
    inAppModalStepTitle: "💡 外部ブラウザ（Safari / Chrome）で開く手順：",
    inAppModalStep1: "① 下の『Safari / Chromeで開く』ボタンをタップ",
    inAppModalStep2:
      "② または画面右上の『…』メニューから『ブラウザで開く』を選択してください。",
    inAppModalOpenBtn: "Safari / Chrome で開く",
    inAppModalCopyBtn: "URLをコピーしてSafari/Chromeに貼り付け",
    inAppModalEmailChoice:
      "メールアドレスで登録・ログインする（そのままプレイ可能） ＞",
  },
  en: {
    topTag: "IT & Lifestyle Web Magazine",
    topSub: "Latest Digital & Tech Trends Media",
    resumeBtn: "🚨 Resume Mission",
    navFeatured: "Featured",
    navCareer: "Career",
    navSecurity: "Security",
    navRanking: "Ranking",
    loginRegisterBtn: "Login / Register",
    breadcrumbHome: "HOME",
    breadcrumbCategory: "Career & Work",
    breadcrumbFeature: "Special",
    articleTitle:
      "【2026 Guide】How to Safely Start Remote Work & Side Hustles: Top Tips & Risks",
    articleAuthor: "✍️ Editorial Staff (Career Division)",
    articleDate: "📅 Sept 02, 2026",
    articleViews: "👁️ 24,510 views",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "Smart Career Choices for 2026: Remote Work Trends",
    leadText:
      "In recent years, remote side gigs and flexible online work using smartphones and PCs have grown rapidly. While opportunities to earn extra income in spare moments expand, the internet is also flooded with misleading advertisements and dubious offers.",
    heading1: "1. Why Online Side Hustles Are Booming & Popular Categories",
    body1:
      "Accessible beginner categories include data entry, online research surveys, freelance skill-sharing, and social media moderation. The key to sustainable success is pacing yourself and choosing tasks aligned with your abilities.",
    rankingBoxTitle: "📊 2026 Top Online Job Satisfaction Rankings",
    rank1: "🥇 #1: Online Research & Paid Surveys",
    rank2: "🥈 #2: Data Entry & Transcription",
    rank3: "🥉 #3: Web Writing & Proofreading",
    rank4: "🏅 #4: E-Commerce & Reselling Unused Items",
    heading2: "2. Beware of Sweet Temptations: Spotting Suspicious Offers",
    body2_1:
      "Be extremely cautious of claims like '$500 daily just by tapping your phone' or '$10,000 in your first week with zero experience'. Legitimate businesses always maintain clear compensation structures matched to actual workloads.",
    body2_2:
      "In particular, stay vigilant against operators demanding advance 'training fees', 'registration deposits', or pressuring for immediate bank wires.",
    heading3: "3. Summary: Taking Safe Steps in Digital Careers",
    body3:
      "When approached with sound knowledge, remote work offers enormous potential for your career. Choose verified platforms, protect your privacy, and build real skills steadily.",
    commentsTeaser: "💬 Loading reader comments and related topics...",
    sidebarRankingTitle: "🔥 Trending Articles",
    sideRank1Title:
      "【Investigation】$5,000/Month on Your Phone? We Tested the Viral Side Job",
    sideRank1Meta: "2026.09.02 • Special",
    sideRank2Title: "Is '$500 a Day' Real? Undercover Tester Experience Report",
    sideRank2Meta: "2026.09.01 • Report",
    sideRank3Title: "10 Best Desk Setups to Boost Focus in Remote Work",
    sideRank3Meta: "2026.08.30 • Gadgets",
    promoBadge: "✨ Exclusive Monitors Wanted",
    promoTitle: "【Instant Payout】$500/Day Exclusive Work!?",
    promoDesc:
      "Easy online tasks for instant rewards! Claim your secret monitor slot now.",
    promoBtn: "👉 Check Secret Slot for Free ＞＞",
    scamBadge: "✨ Only 3 Slots Left • Top Secret Project",
    scamClose: "Close",
    scamAllocated: "🟢 Exclusive Monitor Slot Assigned to You",
    scamCatch: "Earn $500/Day with Simple Phone Taps!?",
    scamLead:
      "Quick tasks for instant payout! Create your account to start the secret undercover chat.",
    tabRegister: "New Agent Register",
    tabLogin: "Login to Resume",
    labelNickname: "Agent Code-Name (Nickname)",
    placeholderNickname: "e.g. Ace Detective",
    labelEmail: "Contact Email Address",
    labelPassword: "Password",
    btnRegister: "🚀 Free Register & Open Undercover Chat",
    btnLogin: "Resume Investigation (Login) 💻",
    socialDivider: "Or connect with social account",
    policeBadge: "👮‍♂️ Cyber Crime Division Secret Recruitment Unit",
    policeTitle: "Well done! You avoided a suspicious scam trap.",
    policeDesc:
      "Recognizing your keen cyber defense instincts, the Cybercrime Division offers you a special scout mission. We are conducting an undercover operation to dismantle online criminal syndicates. Will you join us as a Cyber Undercover Agent?",
    policeFormTitle: "📋 【Undercover Agent Registration / Login】",
    policeBtnStart: "Begin Undercover Agent Mission 🚨",
    policeBtnLogin: "Resume Investigation 💻",
    policeBackToPortal: "◀ Back to Magazine Homepage",
    warningBadge: "⚠️ Cyber Crime Division Emergency Intercept",
    warningTitle: "Hold it right there, that was close!",
    warningDesc1:
      "Entering personal data into high-risk scam advertisements is extremely dangerous. You were about to be thoroughly targeted by a fraud syndicate!",
    warningDesc2:
      "……However, rest easy! The Cyber Division intercepted and protected the communication in advance, so zero actual damage occurred.",
    warningTargetTitle: "【Protected Suspect Target Data】",
    warningName: "Agent Name",
    warningEmail: "Contact",
    warningDesc3:
      "Turn this to our advantage! Use this alias to infiltrate their servers as an Undercover Agent and uncover the evidence to bust the syndicate!",
    warningStartBtn: "Begin Undercover Mission ＞",
    footerShareTitle: "Share with friends & recruit undercover agents!",
    footerShareLine: "Share on LINE",
    footerCopyUrl: "Copy URL",
    footerCopied: "✔ Copied",
    footerDisclaimer:
      "※ This site is a cybercrime prevention simulation game for educational purposes.",
    inAppBannerText:
      "Viewing in in-app browser. Open in external browser for Google login.",
    inAppBannerOpen: "Open in Safari / Chrome",
    inAppModalTitle: "External Browser Guide",
    inAppModalDesc:
      "Google OAuth is restricted within in-app WebViews (LINE, Instagram, Twitter).",
    inAppModalStepTitle: "💡 How to open in Safari / Chrome:",
    inAppModalStep1: "① Tap 'Open in Safari / Chrome' below",
    inAppModalStep2:
      "② Or tap '...' menu at top-right and choose 'Open in browser'.",
    inAppModalOpenBtn: "Open in Safari / Chrome",
    inAppModalCopyBtn: "Copy URL & Paste in Safari / Chrome",
    inAppModalEmailChoice: "Continue with Email Registration ＞",
  },
};

export default function GeneralPortalPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"ja" | "en">("ja");

  // Scam Popup / Hijack State
  const [showScamModal, setShowScamModal] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [step, setStep] = useState<"portal" | "police_scout" | "hacked">(
    "portal",
  );
  const [entryRoute, setEntryRoute] = useState<"closed" | "trapped">("trapped");
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

  const checkIsInAppBrowser = () => {
    if (typeof window === "undefined")
      return {
        isInApp: false,
        isLine: false,
        isInstagram: false,
        isTwitter: false,
        isIOS: false,
        isAndroid: false,
      };
    const ua =
      navigator.userAgent || navigator.vendor || (window as any).opera || "";
    const isLine = /Line\//i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isTwitter = /Twitter|Tweetbot/i.test(ua);
    const isFB = /FBAN|FBAV/i.test(ua);
    const isTikTok = /musical_ly|ByteDance|TikTok/i.test(ua);
    const isInApp =
      isLine ||
      isInstagram ||
      isTwitter ||
      isFB ||
      isTikTok ||
      /MicroMessenger|webview/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);

    return {
      isInApp,
      isLine,
      isInstagram,
      isTwitter,
      isIOS,
      isAndroid,
      ua,
    };
  };

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

    const savedStep = localStorage.getItem("scam_step");
    const savedNickname = localStorage.getItem("scam_nickname");
    if (savedStep === "game" || savedNickname) {
      setIsAlreadyAgent(true);
    }
    const savedLang = localStorage.getItem("scam_lang") as "ja" | "en";
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasAutoTriggered ||
        showScamModal ||
        step !== "portal" ||
        isAlreadyAgent
      )
        return;

      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 750) {
        setHasAutoTriggered(true);
        triggerScamTrap();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoTriggered, showScamModal, step, isAlreadyAgent]);

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
    setIsGlitching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLoginMode && !nickname)) {
      alert(
        lang === "ja"
          ? "すべての項目を入力してください！"
          : "Please fill in all fields!",
      );
      return;
    }

    setIsLoading(true);

    if (isLoginMode) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setIsLoading(false);

      if (error) {
        alert((lang === "ja" ? "認証失敗: " : "Auth Error: ") + error.message);
        return;
      }

      const nicknameToSet =
        data.user?.user_metadata?.nickname ||
        data.user?.user_metadata?.full_name ||
        nickname.trim() ||
        "エージェント";

      localStorage.setItem("scam_step", "game");
      localStorage.setItem("scam_email", email);
      localStorage.setItem("scam_nickname", nicknameToSet);
      localStorage.setItem("scam_lang", lang);
      router.push("/dashboard");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname },
        },
      });

      setIsLoading(false);

      if (error) {
        alert(
          (lang === "ja" ? "登録エラー: " : "Registration Error: ") +
            error.message,
        );
        return;
      }

      localStorage.setItem("scam_nickname", nickname);
      localStorage.setItem("scam_email", email);
      localStorage.setItem("scam_lang", lang);

      if (step === "police_scout") {
        localStorage.setItem("scam_step", "game");
        router.push("/dashboard");
      } else {
        setEntryRoute("trapped");
        setStep("hacked");
      }
    }
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
    const url = new URL(window.location.href);
    url.searchParams.set("openExternalBrowser", "1");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url.toString());
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  const handleShareLine = () => {
    if (typeof window === "undefined") return;
    const shareUrl = new URL(window.location.origin);
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert("ソーシャルログイン失敗: " + error.message);
    }
  };

  const handleStartGame = () => {
    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);
    router.push("/dashboard");
  };

  const handleLanguageToggle = (newLang: "ja" | "en") => {
    setLang(newLang);
    localStorage.setItem("scam_lang", newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
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

      {isMounted && isInAppBrowser && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-3 py-2 text-xs font-semibold flex flex-wrap items-center justify-between gap-2 shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <span className="text-base">📲</span>
            <span>{t.inAppBannerText}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenExternalBrowser}
              className="px-3 py-1 bg-black text-white text-[11px] font-bold rounded-md hover:bg-slate-900 transition cursor-pointer shadow flex items-center gap-1"
            >
              <span>🌐</span>
              <span>{t.inAppBannerOpen}</span>
            </button>
            <button
              onClick={handleCopyUrl}
              className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-100 text-slate-900 text-[11px] font-bold rounded-md transition cursor-pointer"
            >
              {copiedUrl ? t.footerCopied : t.footerCopyUrl}
            </button>
          </div>
        </div>
      )}

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
          {isMounted && isAlreadyAgent && (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-[11px] bg-green-700 hover:bg-green-600 text-white font-bold px-2.5 py-1 rounded-md cursor-pointer transition shadow flex items-center gap-1"
            >
              <span>🚨</span>
              <span>{t.resumeBtn}</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={() => handleLanguageToggle("ja")}
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
              onClick={() => handleLanguageToggle("en")}
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
            {isMounted && isAlreadyAgent ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg transition cursor-pointer shadow flex items-center gap-1"
              >
                <span>🚨</span>
                <span>{t.resumeBtn}</span>
              </button>
            ) : (
              <button
                onClick={triggerScamTrap}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-lg transition cursor-pointer shadow-sm"
              >
                {t.loginRegisterBtn}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <article className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-7 border border-slate-200/90 shadow-sm">
          <div className="text-[11px] sm:text-xs text-slate-400 font-medium mb-2.5 flex items-center gap-1.5 flex-wrap">
            <span>{t.breadcrumbHome}</span>
            <span>&gt;</span>
            <span>{t.breadcrumbCategory}</span>
            <span>&gt;</span>
            <span className="text-indigo-600 font-bold">
              {t.breadcrumbFeature}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-3.5">
            {t.articleTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 border-b border-slate-100 pb-3.5 mb-5">
            <span className="font-semibold text-slate-600">
              {t.articleAuthor}
            </span>
            <span>{t.articleDate}</span>
            <span>{t.articleViews}</span>
          </div>

          <div className="w-full h-44 sm:h-60 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl mb-5 flex items-center justify-center text-white text-center p-5 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
            <div className="relative z-10 space-y-1">
              <div className="text-2xl sm:text-4xl">{t.articleBannerBadge}</div>
              <div className="text-base sm:text-xl font-black tracking-wide">
                {t.articleBannerText}
              </div>
              <div className="text-[11px] sm:text-xs text-indigo-100 font-medium">
                MEDIA TRENDS SPECIAL REPORT 2026
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium">
              {t.leadText}
            </p>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
              {t.heading1}
            </h2>
            <p className="text-xs sm:text-sm">{t.body1}</p>

            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-xs space-y-2 my-4">
              <div className="font-bold text-indigo-950 text-xs sm:text-sm">
                {t.rankingBoxTitle}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium pt-1">
                <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
                  {t.rank1}
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
                  {t.rank2}
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
                  {t.rank3}
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
                  {t.rank4}
                </div>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
              {t.heading2}
            </h2>
            <p className="text-xs sm:text-sm">{t.body2_1}</p>
            <p className="text-xs sm:text-sm text-slate-600">{t.body2_2}</p>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
              {t.heading3}
            </h2>
            <p className="text-xs sm:text-sm">{t.body3}</p>

            <div
              ref={articleTriggerRef}
              className="mt-6 p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs flex items-center justify-between"
            >
              <span>{t.commentsTeaser}</span>
              <span className="text-base animate-bounce">⬇️</span>
            </div>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3.5 flex items-center gap-2">
              <span>🔥</span>
              <span>{t.sidebarRankingTitle}</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div
                onClick={triggerScamTrap}
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
                onClick={triggerScamTrap}
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
                onClick={triggerScamTrap}
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
            onClick={triggerScamTrap}
            className="p-5 rounded-2xl bg-gradient-to-br from-pink-950 via-rose-950 to-purple-950 text-white cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] transition duration-200 border-2 border-pink-500 relative overflow-hidden"
          >
            <div className="text-[10px] bg-pink-600 text-white font-black px-2 py-0.5 rounded inline-block mb-2 shadow">
              {t.promoBadge}
            </div>
            <div className="font-black text-sm text-pink-200 mb-1 leading-snug">
              {t.promoTitle}
            </div>
            <div className="text-xs text-pink-300 line-clamp-2 mb-3">
              {t.promoDesc}
            </div>
            <div className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black text-xs text-center rounded-xl shadow-md transition">
              {t.promoBtn}
            </div>
          </div>
        </aside>
      </main>

      {showScamModal && step === "portal" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
          <div className="w-full max-w-md bg-gray-950 border-2 border-pink-500 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.5)] overflow-hidden relative text-gray-100 my-auto">
            <div className="bg-pink-600 text-white text-[11px] font-black text-center py-1.5 px-3 sm:px-4 tracking-wider flex items-center justify-between">
              <span>{t.scamBadge}</span>
              <button
                onClick={handleCloseModal}
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

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                    onClick={() => handleSocialLogin("google")}
                    className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-200 transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🌐</span> Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    className="flex-1 py-2 bg-gray-800 text-white font-bold rounded-lg text-xs hover:bg-gray-700 transition border border-gray-700 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🐙</span> GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "police_scout" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-gray-950 border-2 border-blue-500 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.4)] text-gray-100 animate-in zoom-in-95 duration-300 my-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white font-black text-xs uppercase shadow">
                {t.policeBadge}
              </div>
              <button
                onClick={handleReturnToPortal}
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

              <form onSubmit={handleSubmit} className="space-y-3">
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
                  onClick={() => handleSocialLogin("google")}
                  className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-200 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>🌐</span> Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  className="flex-1 py-2 bg-gray-800 text-white font-bold rounded-lg text-xs hover:bg-gray-700 transition border border-gray-700 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>🐙</span> GitHub
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReturnToPortal}
              className="w-full text-center py-2 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer"
            >
              {t.policeBackToPortal}
            </button>
          </div>
        </div>
      )}

      {step === "hacked" && (
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
              onClick={handleStartGame}
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl transition duration-200 cursor-pointer text-xs sm:text-base shadow-lg shadow-yellow-500/40 flex items-center justify-center gap-2"
            >
              <span>🚨</span>
              <span>{t.warningStartBtn}</span>
            </button>
          </div>
        </div>
      )}

      {showInAppModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <span>📱</span>
                <span>{t.inAppModalTitle}</span>
              </div>
              <button
                onClick={() => setShowInAppModal(false)}
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
                onClick={handleOpenExternalBrowser}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>🌐</span>
                <span>{t.inAppModalOpenBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyUrl}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs cursor-pointer border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <span>📋</span>
                <span>{copiedUrl ? t.footerCopied : t.inAppModalCopyBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowInAppModal(false)}
                className="w-full py-2 text-slate-400 hover:text-slate-200 text-[11px] font-medium cursor-pointer transition text-center"
              >
                {t.inAppModalEmailChoice}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 text-center text-xs text-slate-500">
        <div className="max-w-md mx-auto px-4 mb-5">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center gap-2.5">
            <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
              <span>📢</span>
              <span>{t.footerShareTitle}</span>
            </span>
            <div className="flex gap-2 w-full">
              <button
                onClick={handleShareLine}
                className="flex-1 py-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs rounded-xl cursor-pointer shadow flex items-center justify-center gap-1.5 transition"
              >
                <span>💬</span>
                <span>{t.footerShareLine}</span>
              </button>
              <button
                onClick={handleCopyUrl}
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
    </div>
  );
}
