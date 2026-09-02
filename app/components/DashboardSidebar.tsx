"use client";

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
}

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
}: DashboardSidebarProps) {
  // 次のレベルまでの進行度計算
  let currentRankText = "ランク：弱";
  let nextLevelLabel = "次のレベル【中】まで:";
  let nextLevelProgress = `あと ${3 - easyClearedCount} 件 (${easyClearedCount}/3)`;
  let progressPercent = Math.min(100, Math.round((easyClearedCount / 3) * 100));

  if (!isEasyAllCleared) {
    currentRankText = "ランク：弱";
    nextLevelLabel = "次のレベル【中】まで:";
    nextLevelProgress = `あと ${Math.max(0, 3 - easyClearedCount)} 件 (${easyClearedCount}/3)`;
    progressPercent = Math.min(100, Math.round((easyClearedCount / 3) * 100));
  } else if (!isMediumAllCleared) {
    currentRankText = "ランク：中";
    nextLevelLabel = "次のレベル【強】まで:";
    nextLevelProgress = `あと ${Math.max(0, 6 - mediumClearedCount)} 件 (${mediumClearedCount}/6)`;
    progressPercent = Math.min(100, Math.round((mediumClearedCount / 6) * 100));
  } else if (!isHardAllCleared) {
    currentRankText = "ランク：強";
    nextLevelLabel = "最凶モード解放まで:";
    nextLevelProgress = `あと ${Math.max(0, 9 - hardClearedCount)} 件 (${hardClearedCount}/9)`;
    progressPercent = Math.min(100, Math.round((hardClearedCount / 9) * 100));
  } else if (!isMasterUnlocked) {
    currentRankText = "無料全制覇";
    nextLevelLabel = "最凶モード解放待機:";
    nextLevelProgress = "広告/課金で解放可能";
    progressPercent = 100;
  } else {
    currentRankText = "最凶エンドレス";
    nextLevelLabel = "最凶首謀者 摘発実績:";
    nextLevelProgress = `${masterClearedCount} 組織 壊滅`;
    progressPercent = 100;
  }

  return (
    <div
      className={`w-full md:w-1/3 border-r border-gray-800 p-4 md:p-6 flex-col justify-between bg-gray-900/50 overflow-y-auto ${
        isMobileChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-4 text-white">
          {t.dashTitle}
        </h2>

        {/* 警察からの特命指令 */}
        <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-3 mb-4 text-xs space-y-1">
          <div className="text-blue-400 font-bold mb-1">{t.policeBriefing}</div>
          <p className="text-gray-300 leading-relaxed">
            {t.policeBriefingText}
          </p>
        </div>

        {/* エージェント情報（次のレベルまでの進行度） */}
        <div
          onClick={() => setShowArchiveModal(true)}
          className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4 text-xs space-y-2.5 cursor-pointer hover:border-pink-500 transition shadow-sm"
        >
          <div className="text-gray-400 font-semibold flex justify-between items-center">
            <span>{t.agentInfo}</span>
            <span className="text-pink-400 text-[11px] hover:underline">
              {t.openArchive}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              Name: <span className="text-white font-bold">{nickname}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border bg-gray-950 border-gray-700 text-yellow-400">
              {currentRankText}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-800 space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400">{nextLevelLabel}</span>
              <span className="text-green-400 font-bold font-mono">
                {nextLevelProgress}
              </span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {canUnlockMaster && !isMasterUnlocked && (
          <div className="mb-4 bg-yellow-950/20 border border-yellow-800/60 p-3 rounded-lg">
            <div className="text-yellow-400 font-bold mb-2 text-xs">
              {t.masterUnlock}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsPremium(true);
                  localStorage.setItem("scam_premium", "true");
                }}
                className="flex-1 py-2 bg-yellow-600 text-black font-bold rounded text-xs cursor-pointer"
              >
                {t.buyPremium}
              </button>
              <button
                onClick={onWatchAd}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs cursor-pointer transition shadow-md"
              >
                {t.watchAd} ({adWatchCount}/2)
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-200">{t.inboxTitle}</h3>
            <span className="text-[10px] bg-pink-950 text-pink-400 border border-pink-800 px-2 py-0.5 rounded font-mono">
              TARGETS: {visibleContacts.length}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {visibleContacts.map((c) => {
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
                  className={`p-3 rounded-lg border transition cursor-pointer ${
                    activeContactId === c.id
                      ? "bg-pink-950/40 border-pink-500 shadow-md shadow-pink-950/30"
                      : c.cleared
                        ? "bg-gray-950/60 border-gray-800/80 hover:border-gray-700 opacity-90"
                        : "bg-gray-950 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="font-bold text-gray-200 flex justify-between items-center gap-1">
                    <span className="truncate">{c.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono ${levelBadgeColor}`}
                      >
                        {c.dangerLevel}
                      </span>
                      {c.cleared && (
                        <span className="text-green-400 text-[9px] bg-green-950 border border-green-700 px-1.5 py-0.5 rounded font-bold">
                          ✔ BUSTED
                        </span>
                      )}
                      {c.failed && (
                        <span className="text-red-400 text-[9px] bg-red-950 border border-red-800 px-1.5 py-0.5 rounded font-bold">
                          BLOCKED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 truncate mt-1 text-[11px]">
                    {c.subject}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-red-400 text-xs mt-4 hover:underline text-left cursor-pointer"
      >
        {t.reset}
      </button>
    </div>
  );
}
