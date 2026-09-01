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
  canUnlockMaster: boolean;
  isMasterUnlocked: boolean;
  setIsPremium: (val: boolean) => void;
  adWatchCount: number;
  setAdWatchCount: React.Dispatch<React.SetStateAction<number>>;
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
  canUnlockMaster,
  isMasterUnlocked,
  setIsPremium,
  adWatchCount,
  setAdWatchCount,
  visibleContacts,
  activeContactId,
  handleSelectContact,
  setShowArchiveModal,
  isMobileChatOpen,
  onReset,
}: DashboardSidebarProps) {
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

        <div
          onClick={() => setShowArchiveModal(true)}
          className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4 text-xs space-y-2 cursor-pointer hover:border-pink-500"
        >
          <div className="text-gray-400 font-semibold mb-1 flex justify-between">
            <span>{t.agentInfo}</span>
            <span className="text-pink-400">{t.openArchive}</span>
          </div>
          <div>
            Name: <span className="text-white font-bold">{nickname}</span>
          </div>
          <div className="pt-1 border-t border-gray-800 text-gray-300">
            {t.clearedCount}:{" "}
            <span className="text-green-400 font-bold">
              {clearedScamCount} / {totalContactsCount}
            </span>
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
                onClick={() => setAdWatchCount(adWatchCount + 1)}
                className="flex-1 py-2 bg-blue-600 text-white font-bold rounded text-xs cursor-pointer"
              >
                {t.watchAd} ({adWatchCount}/2)
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            {t.inboxTitle}
          </h3>
          <div className="space-y-2 text-xs">
            {visibleContacts.map((c) => (
              <div
                key={c.id}
                onClick={() => handleSelectContact(c)}
                className={`p-3 rounded border cursor-pointer ${
                  activeContactId === c.id
                    ? "bg-pink-950/40 border-pink-500"
                    : "bg-gray-950 border-gray-800"
                }`}
              >
                <div className="font-bold text-gray-200 flex justify-between items-center">
                  <span>{c.name}</span>
                  {c.failed && (
                    <span className="text-red-500 text-[10px] bg-red-950 px-1 rounded">
                      BLOCKED
                    </span>
                  )}
                </div>
                <div className="text-gray-500 truncate mt-1">{c.subject}</div>
              </div>
            ))}
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
