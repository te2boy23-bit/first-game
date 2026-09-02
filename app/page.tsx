"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

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

  // Form States
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const articleTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // 既存のエージェントデータがあるか確認（自動リダイレクトはせず、ボタンを表示）
    const savedStep = localStorage.getItem("scam_step");
    if (savedStep === "game") {
      setIsAlreadyAgent(true);
    }
    const savedLang = localStorage.getItem("scam_lang") as "ja" | "en";
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // スクロール検知：記事をしっかり読んだ後（ページ下部850px以上スクロール）で初めて発動！
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoTriggered || showScamModal || step !== "portal") return;

      const scrollY = window.scrollY || window.pageYOffset;
      // 記事をしっかり読み進めて下部に到達したら発動
      if (scrollY > 850) {
        setHasAutoTriggered(true);
        triggerScamTrap();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoTriggered, showScamModal, step]);

  const triggerScamTrap = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setShowScamModal(true);
    }, 450);
  };

  // 1. 【閉じる（✕）を押した場合】警察が詐欺を回避したことを褒めてスカウト＆ログイン画面へ！
  const handleCloseModal = () => {
    setShowScamModal(false);
    setEntryRoute("closed");
    setStep("police_scout");
  };

  // 2. 【そのままログイン/登録した場合】危ないよと忠告し、今回は平気だからと依頼へ！
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

      localStorage.setItem("scam_step", "game");
      localStorage.setItem("scam_email", email);
      localStorage.setItem(
        "scam_nickname",
        data.user?.user_metadata?.nickname || nickname.trim() || "エージェント",
      );
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

      // スカウト経由での新規登録なら直接ゲームへ、広告からの入力なら忠告画面へ
      if (step === "police_scout") {
        localStorage.setItem("scam_step", "game");
        localStorage.setItem("scam_lang", lang);
        router.push("/dashboard");
      } else {
        setEntryRoute("trapped");
        setStep("hacked");
      }
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* ⚡ Glitch Hijack Flash Effect */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex flex-col items-center justify-center animate-pulse">
          <div className="text-3xl md:text-5xl font-black text-rose-400 tracking-widest text-center px-4">
            ⚠️ CONNECTING TO SPECIAL MONITOR ROOM...
          </div>
          <div className="text-xs text-rose-200 mt-3 font-mono">
            {lang === "ja"
              ? "特別枠へ自動接続しています..."
              : "Connecting to secret terminal..."}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 📰 ORDINARY INNOCENT WEB PORTAL / MAGAZINE (普通のホームページ) */}
      {/* ======================================================== */}
      {/* Portal Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-wide">
            IT &amp; Lifestyle Web Magazine
          </span>
          <span className="hidden md:inline text-slate-400">
            {lang === "ja"
              ? "暮らしとデジタルの最新トレンドメディア"
              : "Latest Tech & Life Digital Trends"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isMounted && isAlreadyAgent && (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-[11px] bg-green-700 hover:bg-green-600 text-white font-bold px-2.5 py-1 rounded-md cursor-pointer transition shadow flex items-center gap-1"
            >
              <span>🚨</span>
              <span>{lang === "ja" ? "潜入捜査を再開" : "Resume Mission"}</span>
            </button>
          )}

          {/* 🌐 Prominent Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg p-1 shadow-inner">
            <span className="text-[11px] text-slate-400 px-1 font-semibold hidden sm:inline">
              🌐 言語:
            </span>
            <button
              onClick={() => setLang("ja")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                lang === "ja"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇯🇵</span>
              <span>日本語</span>
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow">
              M
            </div>
            <div>
              <div className="font-black text-xl tracking-tight text-slate-900">
                MEDIA TRENDS
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">
                Digital &amp; Career
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
              {lang === "ja" ? "特集記事" : "Featured"}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {lang === "ja" ? "副業・キャリア" : "Career"}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {lang === "ja" ? "ITセキュリティ" : "Security"}
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              {lang === "ja" ? "トレンドランキング" : "Ranking"}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerScamTrap}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-lg transition cursor-pointer shadow-sm"
            >
              {lang === "ja" ? "ログイン / 会員登録" : "Login / Register"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Article */}
        <article className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1.5">
            <span>HOME</span>
            <span>&gt;</span>
            <span>キャリア・副業</span>
            <span>&gt;</span>
            <span className="text-slate-600 font-bold">特集</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
            {lang === "ja"
              ? "【2026年最新】知っておきたい「在宅ワーク＆ネット副業」の正しい始め方とリスク対策"
              : "【2026 Guide】How to Safely Start Remote Work & Side Hustles: Top Tips & Risks"}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4 mb-6">
            <span className="font-semibold text-slate-600">
              ✍️ 編集部 ライフキャリア班
            </span>
            <span>📅 2026.09.02 公開</span>
            <span>👁️ 24,510 views</span>
          </div>

          <div className="w-full h-52 sm:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl mb-6 flex items-center justify-center text-white text-center p-6 shadow-inner">
            <div>
              <div className="text-3xl sm:text-4xl mb-2">💻 📱 💼</div>
              <div className="text-lg sm:text-xl font-black">
                {lang === "ja"
                  ? "スキマ時間で賢く稼ぐ！令和の副業新常識"
                  : "Smart Career Choices for 2026"}
              </div>
            </div>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p>
              近年、スマートフォンやPCを活用した在宅ワーク・スキマ時間副業が急速に普及しています。
              通勤時間や就寝前のちょっとした時間を活用して収入を増やせる選択肢が広がる一方で、
              インターネット上にはさまざまな情報があふれています。
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-6">
              1. ネット副業が選ばれる理由と人気ジャンル
            </h2>
            <p>
              初心者でも取り組みやすいジャンルとしては、データ入力、アンケートモニター、
              スキルシェア、SNS運用代行などが挙げられます。
              自分に合った作業量とスキルに応じてステップアップしていくのが成功の秘訣です。
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">
                📊 2026年 人気副業満足度ランキング
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>🥇 1位：オンラインリサーチ・アンケート</div>
                <div>🥈 2位：データ入力・文字起こし</div>
                <div>🥉 3位：Webライティング・校正</div>
                <div>🏅 4位：フリマアプリ不用品販売</div>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-6">
              2. 甘い誘惑にご用心！怪しい話の見極め方
            </h2>
            <p>
              「誰でもポチポチするだけで日給5万円」「未経験から即日100万円」といった極端な高収入案件には注意が必要です。
              正規の業務では、作業内容に見合った報酬体系が明確に設定されています。
            </p>
            <p>
              特に、登録料や教材費を事前請求してくる業者や、指定口座への振り込みを急かす相手には警戒が必要です。
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-6">
              3. まとめ：安全な環境で第一歩を踏み出そう
            </h2>
            <p>
              正しい知識を持って取り組めば、ネット副業はキャリアの大きな可能性を広げてくれます。
              信頼できるプラットフォームを選び、着実にスキルを磨いていきましょう。
            </p>

            <div
              ref={articleTriggerRef}
              className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center justify-between"
            >
              <span>💬 この記事の読者コメント・関連広告を読み込み中...</span>
              <span className="text-base animate-bounce">⬇️</span>
            </div>
          </div>
        </article>

        {/* Right 1 Column: Sidebar & Ranking */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <span>🔥</span>
              <span>人気記事ランキング</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div
                onClick={triggerScamTrap}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition"
              >
                <span className="font-black text-rose-500 text-sm">1</span>
                <div>
                  <div className="font-bold text-slate-800 line-clamp-2">
                    【特別調査】スマホ完結で月収50万円？話題の副業を試してみた
                  </div>
                  <div className="text-slate-400 mt-1">2026.09.02 • 特集</div>
                </div>
              </div>

              <div
                onClick={triggerScamTrap}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition"
              >
                <span className="font-black text-amber-500 text-sm">2</span>
                <div>
                  <div className="font-bold text-slate-800 line-clamp-2">
                    「日給5万円」は本当か？裏案件モニター体験レポート
                  </div>
                  <div className="text-slate-400 mt-1">2026.09.01 • 調査</div>
                </div>
              </div>

              <div
                onClick={triggerScamTrap}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition"
              >
                <span className="font-black text-slate-400 text-sm">3</span>
                <div>
                  <div className="font-bold text-slate-800 line-clamp-2">
                    リモートワークで集中力を高める最強デスク環境10選
                  </div>
                  <div className="text-slate-400 mt-1">
                    2026.08.30 • ガジェット
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={triggerScamTrap}
            className="p-5 rounded-2xl bg-gradient-to-br from-pink-950 via-rose-950 to-purple-950 text-white cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-200 border-2 border-pink-500 relative overflow-hidden"
          >
            <div className="text-[10px] bg-pink-600 text-white font-black px-2 py-0.5 rounded inline-block mb-2">
              ✨ 限定モニター募集中
            </div>
            <div className="font-black text-sm text-pink-200 mb-1">
              【即日入金】日給5万円の特別ワーク！？
            </div>
            <div className="text-xs text-pink-300 line-clamp-2 mb-3">
              「簡単な作業だけで即日報酬GET！今すぐ特別枠をチェック」
            </div>
            <div className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs text-center rounded-lg shadow">
              👉 無料で特別枠を確認する ＞＞
            </div>
          </div>
        </aside>
      </main>

      {/* ======================================================== */}
      {/* 💰 SCAM POPUP MODAL (スクロールで勝手に発動)             */}
      {/* ======================================================== */}
      {showScamModal && step === "portal" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-full max-w-md bg-gray-950 border-2 border-pink-500 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.5)] overflow-hidden relative text-gray-100">
            <div className="bg-pink-600 text-white text-[11px] font-black text-center py-1.5 px-4 tracking-wider flex items-center justify-between">
              <span>✨ 先着3名様限定・特別シークレット案件</span>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 font-bold px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 cursor-pointer text-xs transition flex items-center gap-1"
                title="閉じる"
              >
                <span>✕</span> <span>閉じる</span>
              </button>
            </div>

            <div className="p-5 bg-gradient-to-b from-pink-950/60 to-gray-950 border-b border-pink-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-green-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                🟢 特別モニター枠が割り当てられました
              </div>
              <h3 className="text-xl font-black text-white leading-tight mb-2">
                「スマホをタップするだけで日給5万円確定！？」
              </h3>
              <p className="text-xs text-pink-300 font-medium">
                ✨
                簡単な作業ですぐに報酬GET！アカウント作成で秘密のチャット（潜入捜査）を開始できます。
              </p>
            </div>

            <div className="p-6">
              <div className="flex border-b border-gray-800 mb-5">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 pb-2 text-sm font-bold border-b-2 transition cursor-pointer ${
                    !isLoginMode
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {lang === "ja" ? "新規アカウント登録" : "New Register"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 pb-2 text-sm font-bold border-b-2 transition cursor-pointer ${
                    isLoginMode
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {lang === "ja" ? "ログイン" : "Login"}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {lang === "ja"
                        ? "ニックネーム（源氏名 ※登録時のみ）"
                        : "Agent Nickname"}
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder={lang === "ja" ? "例：カモ太郎" : "e.g. John"}
                      className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none text-base sm:text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    {lang === "ja" ? "メールアドレス" : "Email Address"}
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
                    {lang === "ja" ? "ログインパスワード" : "Password"}
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
                  className="w-full py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 font-black rounded-xl text-white transition duration-200 shadow-lg shadow-pink-600/40 cursor-pointer disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  {isLoading
                    ? "処理中..."
                    : isLoginMode
                      ? "捜査（ログイン）を再開する 💻"
                      : "🚀 無料登録して潜入チャットを開く"}
                </button>
              </form>

              <div className="mt-5">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-800"></div>
                  <span className="flex-shrink mx-3 text-gray-500 text-[11px]">
                    またはソーシャルアカウントで接続
                  </span>
                  <div className="flex-grow border-t border-gray-800"></div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>🌐</span> Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    className="flex-1 py-2 bg-gray-800 text-white font-bold rounded-lg text-xs hover:bg-gray-700 transition border border-gray-700 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>🐙</span> GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 👮‍♂️ 1. POLICE SCOUT & PRAISE SCREEN (閉じるを押した場合)    */}
      {/* ======================================================== */}
      {step === "police_scout" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-gray-950 border-2 border-blue-500 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.4)] text-gray-100 animate-in zoom-in-95 duration-300 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white font-black text-xs uppercase mb-3 shadow">
              👮‍♂️ 警視庁 サイバー犯罪対策課 特命スカウト班
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-blue-400 mb-3">
              見事だ！怪しい詐欺広告を回避したな。
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
              君のその高い防犯意識と冷静な判断力を見込んで、警視庁サイバー対策課から特命スカウトだ。
              現在、ネット上に潜む悪質な詐欺グループを壊滅させるための極秘捜査を進めている。
              ぜひ、君の頭脳を活かして【おとり捜査官（サイバーエージェント）】として協力してくれないか？
            </p>

            <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 mb-6">
              <div className="text-xs font-bold text-blue-300 mb-3">
                📋 【おとり捜査官アカウント登録・ログイン】
              </div>

              <div className="flex border-b border-gray-800 mb-4">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 pb-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                    !isLoginMode
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  新規エージェント登録
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
                  ログインして捜査再開
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLoginMode && (
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      捜査官コードネーム（ニックネーム）
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="例：エース捜査官"
                      className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base sm:text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    連絡用メールアドレス
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
                    パスワード
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
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-black rounded-xl text-white transition duration-200 shadow-lg shadow-blue-600/40 cursor-pointer disabled:opacity-50 text-sm mt-2"
                >
                  {isLoading
                    ? "認証処理中..."
                    : isLoginMode
                      ? "捜査を再開する 💻"
                      : "おとり捜査官として任務を開始する 🚨"}
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-gray-800 flex gap-2">
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
      )}

      {/* ======================================================== */}
      {/* ⚠️ 2. POLICE WARNING & REASSURANCE (広告で入力した場合)  */}
      {/* ======================================================== */}
      {step === "hacked" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-black border-2 border-yellow-500 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(234,179,8,0.4)] text-yellow-300 font-mono animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-600 text-black font-black text-xs uppercase mb-3 shadow">
              ⚠️ 警視庁 サイバー犯罪対策課 緊急通信
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mb-3 text-yellow-400">
              おい、危ないところだったぞ！
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-4">
              あんな怪しい高額副業に個人情報を入力するのは極めて危険だ。
              本来なら完全に詐欺グループにカモられるところだったぞ！
              <br />
              <br />
              <span className="text-green-400 font-bold">
                ……だが安心しろ！今回は我々サイバー対策課が事前に通信を傍受・保護していたため、実際の被害は一切発生していない。
              </span>
            </p>

            <div className="bg-yellow-950/40 border border-yellow-800/60 rounded-lg p-3.5 mb-5 text-xs space-y-1">
              <div className="text-yellow-400 font-bold">
                【保護されたターゲット情報】
              </div>
              <div>
                登録名: <span className="text-white font-bold">{nickname}</span>
              </div>
              <div>
                連絡先: <span className="text-white font-bold">{email}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
              怪我の功名だ。今入力したデータを使って奴らのサーバーへ逆に侵入し、組織の全貌と証拠を暴く【おとり捜査官】として任務に就いてもらう！
            </p>

            <button
              onClick={handleStartGame}
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl transition duration-200 cursor-pointer text-sm sm:text-base shadow-lg shadow-yellow-500/40 flex items-center justify-center gap-2"
            >
              <span>🚨</span>
              <span>捜査任務を開始する ＞</span>
            </button>
          </div>
        </div>
      )}

      {/* Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        <p>© 2026 MEDIA TRENDS. All rights reserved.</p>
        <p className="mt-1 text-slate-300">
          ※本サイトは防犯啓発を目的としたシミュレーションゲームです。
        </p>
      </footer>
    </div>
  );
}
