"use client";
import { useState } from "react";

interface Mission {
  id: number;
  name: string;
  found: boolean;
}

// 💡 page.tsx の Contact 型と完全に一致させる
interface Contact {
  id: string;
  name: string;
  role: string;
  danger: string;
  dangerLevel: "easy" | "medium" | "hard" | "master";
  lastTime: string;
  subject: string;
  preview: string;
  initialMessage: string;
  cleared: boolean;
  missions: Mission[];
  description?: string;
  failed?: boolean;
}

interface DashboardSidebarProps {
  t: any;
  nickname: string;
  clearedScamCount: number;
  totalContactsCount: number;
  easyClearedCount: number;
  mediumClearedCount: number;
  hardClearedCount: number;
  masterClearedCount: number;
  isEasyAllCleared: boolean;
  isMediumAllCleared: boolean;
  isHardAllCleared: boolean;
  canUnlockMaster: boolean;
  isMasterUnlocked: boolean;
  setIsPremium: (val: boolean) => void;
  adWatchCount: number;
  onWatchAd: () => void;
  visibleContacts: Contact[];
  activeContactId: string;
  handleSelectContact: (contact: Contact) => void;
  setShowArchiveModal: (val: boolean) => void;
  isMobileChatOpen: boolean;
  onReset: () => void;
  lang?: "ja" | "en" | "my" | "ne";
  onLanguageChange?: (val: "ja" | "en" | "my" | "ne") => void;
  onUpdateNickname?: (val: string) => void;
}

const AVATAR_MAP: Record<string, string> = {
  sato: "/images/avatars/sato.jpg",
  yamada: "/images/avatars/yamada.svg",
  suzuki: "/images/avatars/suzuki.jpg",
  tanaka: "/images/avatars/tanaka.jpg",
  kato: "/images/avatars/kato.jpg",
  watanabe: "/images/avatars/watanabe.jpg",
  mori: "/images/avatars/mori.jpg",
  ogawa: "/images/avatars/ogawa.jpg",
  hashimoto: "/images/avatars/hashimoto.jpg",
  black: "/images/avatars/black.jpg",
  viper: "/images/avatars/viper.jpg",
  shimizu: "/images/avatars/shimizu.jpg",
  kuroda: "/images/avatars/kuroda.svg",
  asuka: "/images/avatars/asuka.svg",
  kiryu: "/images/avatars/kiryu.svg",
  saeki: "/images/avatars/saeki.svg",
  tachibana: "/images/avatars/tachibana.svg",
  kisaragi: "/images/avatars/kisaragi.svg",
  master_boss: "/images/avatars/master_boss.svg",
};

export default function DashboardSidebar({
  t,
  nickname,
  clearedScamCount,
  totalContactsCount,
  easyClearedCount,
  mediumClearedCount,
  hardClearedCount,
  masterClearedCount,
  isEasyAllCleared,
  isMediumAllCleared,
  isHardAllCleared,
  canUnlockMaster,
  isMasterUnlocked,
  setIsPremium,
  adWatchCount,
  onWatchAd,
  visibleContacts,
  activeContactId,
  handleSelectContact,
  setShowArchiveModal,
  isMobileChatOpen,
  onReset,
  lang = "ja",
  onLanguageChange,
  onUpdateNickname,
}: DashboardSidebarProps) {
  // 次のレベルまでの進行度計算
  const isEn = lang === "en";
  const isMy = lang === "my";
  const isNe = lang === "ne";

  const [copiedBankInfo, setCopiedBankInfo] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(nickname || "");
  const [nameUpdatedAlert, setNameUpdatedAlert] = useState(false);

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName =
      tempName.trim() ||
      (isEn ? "Agent" : isMy ? "စုံစမ်းရေးမှူး" : isNe ? "एजेन्ट" : "カモ太郎");
    if (onUpdateNickname) {
      onUpdateNickname(finalName);
    }
    localStorage.setItem("scam_nickname", finalName);
    setIsEditingName(false);
    setNameUpdatedAlert(true);
    setTimeout(() => setNameUpdatedAlert(false), 2500);
  };

  const handleCopyBankInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const accountInfo = isEn
      ? `Bank: Sakura Net Bank (Shinjuku Branch 108)\nAccount No: Savings 4589210\nAccount Name: ${nickname || "Agent"}`
      : isMy
        ? `ဘဏ်: Sakura Net Bank (Shinjuku ဘဏ်ခွဲ 108)\nအကောင့်: 4589210\nအမည်: ${nickname || "Agent"}`
        : isNe
          ? `बैंक: Sakura Net Bank (Shinjuku Branch 108)\nखाता: 4589210\nनाम: ${nickname || "Agent"}`
          : `銀行名：さくらネット銀行（新宿支店 108）\n口座番号：普通 4589210\n口座名義：${nickname || "カモ太郎"}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(accountInfo);
      setCopiedBankInfo(true);
      setTimeout(() => setCopiedBankInfo(false), 2500);
    }
  };

  let currentRankText = isEn
    ? "Rank: Easy"
    : isMy
      ? "အဆင့် - လွယ်"
      : isNe
        ? "तह: सजिलो"
        : "ランク：弱";
  let nextLevelLabel = isEn
    ? "To Medium Level:"
    : isMy
      ? "အလယ်အဆင့်သို့:"
      : isNe
        ? "मध्यम तहसम्म:"
        : "次のレベル【中】まで:";
  let nextLevelProgress = isEn
    ? `${Math.max(0, 3 - easyClearedCount)} left (${easyClearedCount}/3)`
    : isMy
      ? `ကျန် ${Math.max(0, 3 - easyClearedCount)} ခု (${easyClearedCount}/3)`
      : isNe
        ? `बाँकी ${Math.max(0, 3 - easyClearedCount)} (${easyClearedCount}/3)`
        : `あと ${Math.max(0, 3 - easyClearedCount)} 件 (${easyClearedCount}/3)`;
  let progressPercent = Math.min(100, Math.round((easyClearedCount / 3) * 100));

  if (!isEasyAllCleared) {
    currentRankText = isEn
      ? "Rank: Easy"
      : isMy
        ? "အဆင့် - လွယ်"
        : isNe
          ? "तह: सजिलो"
          : "ランク：弱";
    nextLevelLabel = isEn
      ? "To Medium Level:"
      : isMy
        ? "အလယ်အဆင့်သို့:"
        : isNe
          ? "मध्यम तहसम्म:"
          : "次のレベル【中】まで:";
    nextLevelProgress = isEn
      ? `${Math.max(0, 3 - easyClearedCount)} left (${easyClearedCount}/3)`
      : isMy
        ? `ကျန် ${Math.max(0, 3 - easyClearedCount)} ခု (${easyClearedCount}/3)`
        : isNe
          ? `बाँकी ${Math.max(0, 3 - easyClearedCount)} (${easyClearedCount}/3)`
          : `あと ${Math.max(0, 3 - easyClearedCount)} 件 (${easyClearedCount}/3)`;
    progressPercent = Math.min(100, Math.round((easyClearedCount / 3) * 100));
  } else if (!isMediumAllCleared) {
    currentRankText = isEn
      ? "Rank: Medium"
      : isMy
        ? "အဆင့် - အလယ်"
        : isNe
          ? "तह: मध्यम"
          : "ランク：中";
    nextLevelLabel = isEn
      ? "To Hard Level:"
      : isMy
        ? "အဆင့်ခက်သို့:"
        : isNe
          ? "कठिन तहसम्म:"
          : "次のレベル【強】まで:";
    nextLevelProgress = isEn
      ? `${Math.max(0, 6 - mediumClearedCount)} left (${mediumClearedCount}/6)`
      : isMy
        ? `ကျန် ${Math.max(0, 6 - mediumClearedCount)} ခု (${mediumClearedCount}/6)`
        : isNe
          ? `बाँकी ${Math.max(0, 6 - mediumClearedCount)} (${mediumClearedCount}/6)`
          : `あと ${Math.max(0, 6 - mediumClearedCount)} 件 (${mediumClearedCount}/6)`;
    progressPercent = Math.min(100, Math.round((mediumClearedCount / 6) * 100));
  } else if (!isHardAllCleared) {
    currentRankText = isEn
      ? "Rank: Hard"
      : isMy
        ? "အဆင့် - ခက်"
        : isNe
          ? "तह: कठिन"
          : "ランク：強";
    nextLevelLabel = isEn
      ? "To Master Mode:"
      : isMy
        ? "မဟာမုဒ်ဖွင့်ရန်:"
        : isNe
          ? "मास्टर मोड अनलकसम्म:"
          : "最凶モード解放まで:";
    nextLevelProgress = isEn
      ? `${Math.max(0, 9 - hardClearedCount)} left (${hardClearedCount}/9)`
      : isMy
        ? `ကျန် ${Math.max(0, 9 - hardClearedCount)} ခု (${hardClearedCount}/9)`
        : isNe
          ? `बाँकी ${Math.max(0, 9 - hardClearedCount)} (${hardClearedCount}/9)`
          : `あと ${Math.max(0, 9 - hardClearedCount)} 件 (${hardClearedCount}/9)`;
    progressPercent = Math.min(100, Math.round((hardClearedCount / 9) * 100));
  } else if (!isMasterUnlocked) {
    currentRankText = isEn
      ? "Standard Cleared"
      : isMy
        ? "အခမဲ့အဆင့်များပြီးစီး"
        : isNe
          ? "निःशुल्क तह सम्पन्न"
          : "無料全制覇";
    nextLevelLabel = isEn
      ? "Master Mode Ready:"
      : isMy
        ? "မဟာမုဒ်ဖွင့်ရန်အသင့်:"
        : isNe
          ? "मास्टर मोड तयार:"
          : "最凶モード解放待機:";
    nextLevelProgress = isEn
      ? "Unlock with Ad / Upgrade"
      : isMy
        ? "ကြော်ငြာကြည့်/အဆင့်မြှင့်ပါ"
        : isNe
          ? "विज्ञापन/अपग्रेडबाट खोल्नुहोस्"
          : "広告/課金で解放可能";
    progressPercent = 100;
  } else {
    currentRankText = isEn
      ? "Master Endless"
      : isMy
        ? "အဆုံးမဲ့မဟာမုဒ်"
        : isNe
          ? "मास्टर अन्तहीन"
          : "最凶エンドレス";
    nextLevelLabel = isEn
      ? "Master Bosses Busted:"
      : isMy
        ? "ဖမ်းဆီးရမိသောဂိုဏ်းချုပ်:"
        : isNe
          ? "पक्राउ परेका मुख्य नाइके:"
          : "最凶首謀者 摘発実績:";
    nextLevelProgress = isEn
      ? `${masterClearedCount} Syndicates Busted`
      : isMy
        ? `${masterClearedCount} ခု ဖျက်ဆီးပြီး`
        : isNe
          ? `${masterClearedCount} गिरोह नष्ट`
          : `${masterClearedCount} 組織 壊滅`;
    progressPercent = 100;
  }

  return (
    <div
      className={`w-full md:w-1/3 border-r border-gray-800 p-4 md:p-5 flex-col justify-between bg-gray-900/60 backdrop-blur-md overflow-y-auto ${
        isMobileChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg md:text-xl font-black text-white leading-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.dashTitle}</span>
          </h2>

          {/* 🌐 Prominent Language Switcher in Dashboard */}
          {onLanguageChange && (
            <div className="flex items-center gap-1 bg-gray-800/90 border border-gray-700 rounded-lg p-0.5 shrink-0 shadow-sm self-start sm:self-auto flex-wrap">
              <button
                onClick={() => onLanguageChange("ja")}
                className={`px-1.5 py-1 rounded text-xs font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "ja"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇯🇵</span>
                <span>日本語</span>
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-1.5 py-1 rounded text-xs font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "en"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => onLanguageChange("my")}
                className={`px-1.5 py-1 rounded text-xs font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "my"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇲🇲</span>
                <span>မြန်မာ</span>
              </button>
              <button
                onClick={() => onLanguageChange("ne")}
                className={`px-1.5 py-1 rounded text-xs font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "ne"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇳🇵</span>
                <span>नेपाली</span>
              </button>
            </div>
          )}
        </div>

        {/* 警察からの特命指令 */}
        <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-3 mb-4 text-xs space-y-1 shadow-inner">
          <div className="text-blue-400 font-bold mb-1 flex items-center gap-1.5">
            <span>🚨</span>
            <span>{t.policeBriefing}</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-[11px]">
            {t.policeBriefingText}
          </p>
        </div>

        {/* 👤 エージェント情報（アバターアイコン付き） */}
        <div className="bg-gray-900 border border-gray-800 hover:border-pink-500 rounded-xl p-3 mb-4 text-xs space-y-2.5 transition shadow-md group">
          <div className="text-gray-400 font-semibold flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <span>{t.agentInfo}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTempName(nickname || "");
                  setIsEditingName(true);
                }}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-bold bg-sky-950/80 border border-sky-700/60 px-2 py-0.5 rounded cursor-pointer transition flex items-center gap-1 shadow-sm"
                title="プレイヤー名・おとり名を変更"
              >
                <span>✏️</span>
                <span>{isEn ? "Edit Name" : "名前を変更"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowArchiveModal(true)}
                className="text-pink-400 text-[11px] hover:underline cursor-pointer"
              >
                {t.openArchive}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Agent HUD Avatar */}
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400 shadow-md shadow-sky-950/50 shrink-0 bg-gray-950">
              <img
                src="/images/avatars/agent.svg"
                alt="Agent Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-1">
                <div
                  onClick={() => {
                    setTempName(nickname || "");
                    setIsEditingName(true);
                  }}
                  className="font-bold text-white text-sm truncate flex items-center gap-1.5 cursor-pointer hover:text-sky-300 transition"
                  title="クリックして名前を変更"
                >
                  <span className="text-pink-400 font-black">
                    {nickname || (isEn ? "Agent" : "エージェント")}
                  </span>
                  <span className="text-xs text-gray-500 hover:text-sky-400">
                    ✏️
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border bg-gray-950 border-gray-700 text-yellow-400 shrink-0">
                  {currentRankText}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                STATUS: UNDERCOVER ONLINE
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800 space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400">{nextLevelLabel}</span>
              <span className="text-emerald-400 font-bold font-mono">
                {nextLevelProgress}
              </span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 🕵️‍♂️ 名前・おとり名義変更モーダル */}
        {isEditingName && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-950 border-2 border-sky-500/80 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 font-black text-base">
                  <span>✏️</span>
                  <span>
                    {isEn
                      ? "Change Undercover / Agent Name"
                      : "エージェント名・おとり名義の変更"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 bg-gray-800 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {isEn
                  ? "Set your custom undercover persona name. This alias will be used in undercover bank transfers, fake IDs, and suspect chats."
                  : "ゲーム内で使用するあなたの名前（おとり捜査用の偽名）を設定できます。設定した名前は口座名義や偽身分証、詐欺師とのチャットに自動反映されます。"}
              </p>

              <form onSubmit={handleSaveName} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 mb-1 block">
                    {isEn
                      ? "Agent / Undercover Name:"
                      : "設定する名前（名義）:"}
                  </label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={
                      isEn ? "e.g. Taro Tanaka" : "例: 田中 太郎, カモ次郎"
                    }
                    className="w-full bg-gray-900 border-2 border-sky-600/70 text-emerald-300 text-sm p-2.5 rounded-xl font-bold focus:outline-none focus:border-sky-400"
                    autoFocus
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <div className="text-[10px] text-gray-400 mb-1.5 font-bold">
                    {isEn
                      ? "Quick Presets:"
                      : "💡 おすすめのおとり偽名候補（ワンタップ入力）:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "カモ太郎",
                      "田中 太郎",
                      "佐藤 健一",
                      "山田 翔太",
                      "鈴木 一郎",
                      "カモ次郎",
                      "Agent 007",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempName(preset)}
                        className="text-[11px] bg-gray-900 hover:bg-sky-950 text-gray-300 hover:text-sky-300 border border-gray-700 hover:border-sky-600 px-2 py-1 rounded-lg transition cursor-pointer font-medium"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-800">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl cursor-pointer shadow-lg transition"
                  >
                    ✔ {isEn ? "Save Name" : "決定して保存"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-sm rounded-xl cursor-pointer transition"
                  >
                    {isEn ? "Cancel" : "キャンセル"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 💳 おとり捜査用・公式プロファイル（個人情報保護カード） */}
        <div className="bg-gray-900/95 border border-sky-500/40 rounded-xl p-3.5 mb-4 text-xs space-y-2.5 shadow-md shadow-sky-950/20">
          <div className="flex items-center justify-between">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <span>💳</span>
              <span>
                {isEn
                  ? "Undercover Profile & Bank"
                  : isMy
                    ? "အတုအယောင် ကိုယ်ရေးနှင့် ဘဏ်"
                    : isNe
                      ? "नक्कली परिचय र बैंक"
                      : "おとり捜査用・口座プロファイル"}
              </span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setTempName(nickname || "");
                  setIsEditingName(!isEditingName);
                }}
                className="text-[10px] bg-gray-800 hover:bg-gray-700 text-sky-300 border border-sky-700/60 px-2 py-0.5 rounded cursor-pointer transition font-bold flex items-center gap-1"
                title="おとり捜査用の名義・名前を変更"
              >
                <span>✏️</span>
                <span>{isEn ? "Edit Name" : "名義変更"}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyBankInfo}
                className="text-[10px] bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700/60 px-2 py-0.5 rounded cursor-pointer transition font-bold flex items-center gap-1"
              >
                <span>{copiedBankInfo ? "✔" : "📋"}</span>
                <span>
                  {copiedBankInfo
                    ? isEn
                      ? "Copied!"
                      : "コピー完了！"
                    : isEn
                      ? "Copy Bank"
                      : "口座情報をコピー"}
                </span>
              </button>
            </div>
          </div>

          {nameUpdatedAlert && (
            <div className="text-[10px] bg-emerald-950/90 border border-emerald-500 text-emerald-300 px-2 py-1 rounded font-bold text-center animate-in fade-in duration-200">
              ✨{" "}
              {isEn
                ? "Undercover Name Updated!"
                : "おとり捜査の名義を更新しました！"}
            </div>
          )}

          <div className="bg-gray-950/80 border border-gray-800 rounded-lg p-2.5 space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between items-center text-gray-300">
              <span className="text-gray-500">
                {isEn ? "Bank / Branch:" : "銀行・支店:"}
              </span>
              <span className="text-white font-bold">
                {isEn
                  ? "Sakura Net Bank (Shinjuku 108)"
                  : "さくらネット銀行 新宿支店(108)"}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span className="text-gray-500">
                {isEn ? "Account No:" : "口座番号:"}
              </span>
              <span className="text-sky-300 font-bold">普通 4589210</span>
            </div>

            {/* 口座名義（おとり捜査用の設定名） */}
            <div className="pt-1.5 border-t border-gray-800">
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-gray-500">
                  {isEn ? "Holder Name:" : "口座名義(おとり名):"}
                </span>
                {!isEditingName && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-300 font-bold">
                      {nickname || "カモ太郎"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTempName(nickname || "");
                        setIsEditingName(true);
                      }}
                      className="text-[10px] text-sky-400 hover:text-sky-300 underline cursor-pointer"
                    >
                      [変更]
                    </button>
                  </div>
                )}
              </div>

              {isEditingName && (
                <form
                  onSubmit={handleSaveName}
                  className="mt-1.5 flex items-center gap-1 bg-gray-900 border border-sky-500/80 p-1 rounded-lg"
                >
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={isEn ? "Enter alias name" : "おとり名義を入力"}
                    className="flex-1 bg-transparent text-emerald-300 text-xs px-1 font-bold focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold cursor-pointer transition shadow"
                  >
                    {isEn ? "Save" : "保存"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(nickname || "");
                      setIsEditingName(false);
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-400 text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition"
                  >
                    ✕
                  </button>
                </form>
              )}
            </div>

            <div className="flex justify-between items-center text-gray-300 pt-1 border-t border-gray-800">
              <span className="text-gray-500">
                {isEn ? "Dummy Address:" : "ダミー住所:"}
              </span>
              <span
                className="text-gray-300 truncate max-w-[150px]"
                title="東京都新宿区西新宿3-12-8"
              >
                {isEn ? "Nishi-Shinjuku, Tokyo" : "東京都新宿区西新宿3-12-8"}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 flex items-center gap-1 leading-tight">
            <span>🔒</span>
            <span>
              {isEn
                ? "Safe Play: Real personal info is NEVER needed. Use this civilian alias."
                : isMy
                  ? "အမှန်တကယ် ကိုယ်ရေးအချက်အလက် ထည့်ရန်မလိုပါ။ ဤအရပ်သား အချက်အလက်ကို သုံးပါ။"
                  : isNe
                    ? "वास्तविक व्यक्तिगत विवरण आवश्यक छैन। यो सामान्य नागरिक डाटा प्रयोग गर्नुहोस्।"
                    : "安全保護：実際の個人情報は入力不要。上記のおとり用ダミー情報を使用します。"}
            </span>
          </div>
        </div>

        {canUnlockMaster && !isMasterUnlocked && (
          <div className="mb-4 bg-yellow-950/30 border-2 border-yellow-500/60 p-3 rounded-xl shadow-lg shadow-yellow-950/30 animate-pulse">
            <div className="text-yellow-400 font-black mb-2 text-xs flex items-center gap-1.5">
              <span>⭐</span>
              <span>{t.masterUnlock}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsPremium(true);
                  localStorage.setItem("scam_premium", "true");
                }}
                className="flex-1 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black rounded-lg text-xs cursor-pointer shadow-md transition"
              >
                {t.buyPremium}
              </button>
              <button
                onClick={onWatchAd}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs cursor-pointer transition shadow-md"
              >
                {t.watchAd} ({adWatchCount}/2)
              </button>
            </div>
          </div>
        )}

        {/* 📥 受信トレイ（容疑者アバター付き） */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-3 sm:p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-200 flex items-center gap-1.5">
              <span>{t.inboxTitle}</span>
            </h3>
            <span className="text-[10px] bg-pink-950 text-pink-400 border border-pink-800 px-2 py-0.5 rounded-full font-mono font-bold">
              TARGETS: {visibleContacts.length}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {visibleContacts.map((c) => {
              const avatarSrc =
                AVATAR_MAP[c.id] ||
                (c.id.startsWith("master_boss")
                  ? "/images/avatars/master_boss.svg"
                  : "/images/avatars/sato.jpg");

              const levelBorderColor =
                c.dangerLevel === "easy"
                  ? "border-blue-500"
                  : c.dangerLevel === "medium"
                    ? "border-yellow-500"
                    : c.dangerLevel === "hard"
                      ? "border-orange-500"
                      : "border-red-500";

              const levelBadgeColor =
                c.dangerLevel === "easy"
                  ? "text-blue-400 bg-blue-950/60 border-blue-800"
                  : c.dangerLevel === "medium"
                    ? "text-yellow-400 bg-yellow-950/60 border-yellow-800"
                    : c.dangerLevel === "hard"
                      ? "text-orange-400 bg-orange-950/60 border-orange-800"
                      : "text-red-400 bg-red-950/60 border-red-800";

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectContact(c)}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeContactId === c.id
                      ? "bg-pink-950/40 border-pink-500 shadow-md shadow-pink-950/30 ring-1 ring-pink-500/50"
                      : c.cleared
                        ? "bg-gray-950/60 border-gray-800/80 hover:border-gray-700 opacity-80"
                        : "bg-gray-950 border-gray-800 hover:border-gray-700 hover:bg-gray-900/60"
                  }`}
                >
                  {/* 🖼️ Suspect Avatar Thumbnail */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 ${levelBorderColor} bg-gray-900 shadow-sm`}
                    >
                      <img
                        src={avatarSrc}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {c.cleared && (
                      <span className="absolute -bottom-1 -right-1 text-[9px] bg-green-600 border border-gray-950 rounded-full w-4 h-4 flex items-center justify-center text-white font-bold shadow">
                        ✔
                      </span>
                    )}
                    {c.failed && (
                      <span className="absolute -bottom-1 -right-1 text-[9px] bg-red-600 border border-gray-950 rounded-full w-4 h-4 flex items-center justify-center text-white font-bold shadow">
                        ✕
                      </span>
                    )}
                  </div>

                  {/* Suspect Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-200 flex justify-between items-center gap-1">
                      <span className="truncate text-xs sm:text-sm">
                        {c.name}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono ${levelBadgeColor}`}
                        >
                          {c.dangerLevel}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-400 truncate mt-0.5 text-[11px] leading-tight">
                      {c.subject}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-red-400 text-xs mt-3 hover:underline text-left cursor-pointer flex items-center gap-1"
      >
        <span>🗑️</span>
        <span>{t.reset}</span>
      </button>
    </div>
  );
}
