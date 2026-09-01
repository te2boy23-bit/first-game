"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { supabase } from "./lib/supabase";
=======
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850

const translations = {
  ja: {
    badge: "✨ 先着3名限定・日給5万円簡単ワーク ✨",
    title: "【公式】シークレット副業エージェント",
<<<<<<< HEAD
    modeRegister: "新規登録",
    modeLogin: "ログイン",
    descRegister: "以下の情報を登録して、今すぐ高収入案件をゲットしよう！",
    descLogin: "エージェントID（メール）とパスワードを入力して潜入を再開する。",
    nicknameLabel: "ニックネーム（源氏名 ※登録時のみ）",
    nicknamePlaceholder: "例：カモ太郎",
    emailLabel: "連絡用メールアドレス",
    passwordLabel: "ログインパスワード",
    registerBtn: "無料登録して今すぐ稼ぐ 🚀",
    loginBtn: "捜査（ログイン）を再開する 💻",
=======
    desc: "以下の情報を登録して、今すぐ高収入案件をゲットしよう！",
    nicknameLabel: "ニックネーム（源氏名）",
    nicknamePlaceholder: "例：カモ太郎",
    emailLabel: "連絡用メールアドレス",
    passwordLabel: "ログインパスワード",
    submitBtn: "無料登録して今すぐ稼ぐ 🚀",
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
    hackedTitle: "⚠️ 警視庁 サイバー犯罪対策課",
    hackedText1: "対象のデータベースへの侵入を確認。",
    hackedText2:
      "。今入力したデータ、完全に詐欺グループのサーバーに吸い上げられたぞ。",
    evidenceTitle: "【押収したターゲット情報】",
    regName: "登録名",
    contact: "連絡先",
    hackedText3:
      "……だが、好都合だ。お前を「おとり捜査官（エージェント）」として特例採用する。これより、そのアカウントを使って奴らを逆にハックし、全ての証拠を暴いてもらう！",
    startBtn: "捜査任務を開始する ＞",
    fillAll: "すべての項目を入力してください！",
<<<<<<< HEAD
    authError:
      "認証に失敗しました。メールアドレスやパスワードを確認してください。",
=======
    emailDuplicate:
      "このメールアドレスはすでに別のエージェント（または詐欺グループ）によって登録されています！別のメールアドレスを使用してください。",
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
  },
  en: {
    badge: "✨ Limited to first 3 people • $500/day Easy Work ✨",
    title: "[Official] Secret Side Hustle Agent",
<<<<<<< HEAD
    modeRegister: "Register",
    modeLogin: "Login",
    descRegister: "Register your info below to get high-paying gigs right now!",
    descLogin: "Enter your email and password to resume investigation.",
    nicknameLabel: "Nickname (Alias *For registration only)",
    nicknamePlaceholder: "e.g. John Doe",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    registerBtn: "Register Free & Earn Now 🚀",
    loginBtn: "Resume Investigation (Login) 💻",
=======
    desc: "Register your info below to get high-paying gigs right now!",
    nicknameLabel: "Nickname (Alias)",
    nicknamePlaceholder: "e.g. John Doe",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    submitBtn: "Register Free & Earn Now 🚀",
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
    hackedTitle: "⚠️ Tokyo Metropolitan Police - Cybercrime Division",
    hackedText1: "Invasion of target database confirmed.",
    hackedText2:
      ". The data you just entered has been completely sucked into the scam group's server.",
    evidenceTitle: "[Seized Target Information]",
    regName: "Registered Name",
    contact: "Contact",
    hackedText3:
      "...However, this is convenient. We are specially recruiting you as an 'Undercover Agent'. From now on, use that account to hack them back and expose all their evidence!",
    startBtn: "Start Investigation Mission ＞",
    fillAll: "Please fill in all fields!",
<<<<<<< HEAD
    authError: "Authentication failed. Please check your email or password.",
=======
    emailDuplicate:
      "This email address is already registered by another agent! Please use a different one.",
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
  },
};

export default function LoginPage() {
  const router = useRouter();
<<<<<<< HEAD
  const [isLoginMode, setIsLoginMode] = useState(false); // false = 登録, true = ログイン
=======
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
  const [step, setStep] = useState<"login" | "hacked">("login");
  const [lang, setLang] = useState<"ja" | "en">("ja");

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang];

  useEffect(() => {
<<<<<<< HEAD
    const savedStep = localStorage.getItem("scam_step");
    if (savedStep === "game") {
=======
    const savedNickname = localStorage.getItem("scam_nickname");
    const savedStep = localStorage.getItem("scam_step");

    if (savedNickname && savedStep === "game") {
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
      router.push("/dashboard");
    }
  }, [router]);

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLoginMode && !nickname)) {
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !email || !password) {
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
      alert(t.fillAll);
      return;
    }

<<<<<<< HEAD
    setIsLoading(true);

    if (isLoginMode) {
      // ── ログイン処理 ──
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setIsLoading(false);

      if (error) {
        alert(t.authError + ": " + error.message);
        return;
      }

      // ログイン成功したら直接ゲーム画面へ
      localStorage.setItem("scam_step", "game");
      localStorage.setItem("scam_email", email);
      localStorage.setItem(
        "scam_nickname",
        data.user?.user_metadata?.nickname || "エージェント",
      );
      localStorage.setItem("scam_lang", lang);
      router.push("/dashboard");
    } else {
      // ── 新規登録処理 ──
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname }, // ニックネームをSupabaseのメタデータに保存
        },
      });

      setIsLoading(false);

      if (error) {
        alert(t.authError + ": " + error.message);
        return;
      }

      // 登録成功したらハック演出画面へ
      localStorage.setItem("scam_nickname", nickname);
      localStorage.setItem("scam_email", email);
      setStep("hacked");
    }
  };

  const handleStartGame = () => {
    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);
    router.push("/dashboard");
=======
    // 登録済みメールアドレスの重複チェック
    const existingEmails = JSON.parse(
      localStorage.getItem("scam_registered_emails") || "[]",
    );
    if (existingEmails.includes(email)) {
      alert(t.emailDuplicate);
      return;
    }

    // 新しいメールアドレスを登録リストに追加して保存
    existingEmails.push(email);
    localStorage.setItem(
      "scam_registered_emails",
      JSON.stringify(existingEmails),
    );

    localStorage.setItem("scam_nickname", nickname);
    localStorage.setItem("scam_email", email);
    setStep("hacked");
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
  };

  const handleStartGame = () => {
    localStorage.setItem("scam_step", "game");
    localStorage.setItem("scam_lang", lang);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100 relative">
      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => setLang("ja")}
          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
            lang === "ja"
              ? "bg-pink-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          日本語
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
            lang === "en"
              ? "bg-pink-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          English
        </button>
      </div>

      {step === "login" && (
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden m-4">
          <div className="absolute top-0 left-0 right-0 bg-pink-600 text-white text-xs font-bold text-center py-1">
            {t.badge}
          </div>

<<<<<<< HEAD
          {/* 登録 / ログインのタブ切り替え */}
          <div className="flex border-b border-gray-800 mt-4 mb-6">
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 pb-2 text-sm font-bold border-b-2 transition ${
                !isLoginMode
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.modeRegister}
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 pb-2 text-sm font-bold border-b-2 transition ${
                isLoginMode
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.modeLogin}
            </button>
          </div>

          <h2 className="text-xl font-bold mb-2 text-pink-400">{t.title}</h2>
          <p className="text-sm text-gray-400 mb-6">
            {isLoginMode ? t.descLogin : t.descRegister}
          </p>
=======
          <h2 className="text-xl font-bold mt-4 mb-2 text-pink-400">
            {t.title}
          </h2>
          <p className="text-sm text-gray-400 mb-6">{t.desc}</p>
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  {t.nicknameLabel}
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t.nicknamePlaceholder}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none text-sm"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
<<<<<<< HEAD
=======
                {t.nicknameLabel}
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t.nicknamePlaceholder}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t.passwordLabel}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none text-sm"
              />
            </div>
            <button
              type="submit"
<<<<<<< HEAD
              disabled={isLoading}
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 font-bold rounded text-white transition duration-200 shadow-lg shadow-pink-600/30 cursor-pointer disabled:opacity-50 text-sm"
            >
              {isLoading
                ? "処理中..."
                : isLoginMode
                  ? t.loginBtn
                  : t.registerBtn}
=======
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 font-bold rounded text-white transition duration-200 shadow-lg shadow-pink-600/30 cursor-pointer"
            >
              {t.submitBtn}
>>>>>>> cb69bf7eb190b6b1293baa5e2b5ce955d6408850
            </button>
          </form>
        </div>
      )}

      {step === "hacked" && (
        <div className="w-full max-w-lg bg-black border border-green-500 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] text-green-400 font-mono m-4">
          <h1 className="text-2xl font-bold mb-4 text-green-300">
            {t.hackedTitle}
          </h1>
          <p className="text-sm leading-relaxed mb-4">
            {t.hackedText1}
            <br />
            {lang === "ja" ? "おい、" : "Hey, "}
            <span className="text-white font-bold">{nickname}</span>
            {t.hackedText2}
          </p>
          <div className="bg-green-950/40 border border-green-800/60 rounded p-3 mb-6 text-xs space-y-1">
            <div className="text-green-500 font-bold">{t.evidenceTitle}</div>
            <div>
              {t.regName}: <span className="text-white">{nickname}</span>
            </div>
            <div>
              {t.contact}: <span className="text-white">{email}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6">{t.hackedText3}</p>
          <button
            onClick={handleStartGame}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition duration-200 cursor-pointer"
          >
            {t.startBtn}
          </button>
        </div>
      )}
    </main>
  );
}
