"use client";

interface Mission {
  id: number;
  name: string;
  found: boolean;
}

interface ActiveContact {
  id: string;
  name: string;
  danger: string;
  failed?: boolean;
  cleared?: boolean;
  missions: Mission[];
}

interface ChatWindowProps {
  t: any;
  activeContact: ActiveContact;
  currentMessages: { sender: string; text: string }[];
  isLoading: boolean;
  input: string;
  setInput: (val: string) => void;
  handleSend: (e: React.FormEvent) => void;
  setIsMobileChatOpen: (val: boolean) => void;
  isMobileChatOpen: boolean;
  onReset: () => void;
  onRetry: (contactId: string) => void;
  onSelectNextTarget?: () => void;
  lang?: "ja" | "en" | "my" | "ne";
  onLanguageChange?: (val: "ja" | "en" | "my" | "ne") => void;
}

export default function ChatWindow({
  t,
  activeContact,
  currentMessages,
  isLoading,
  input,
  setInput,
  handleSend,
  setIsMobileChatOpen,
  isMobileChatOpen,
  onReset,
  onRetry,
  onSelectNextTarget,
  lang = "ja",
  onLanguageChange,
}: ChatWindowProps) {
  return (
    <div
      className={`w-full md:w-2/3 flex-col justify-between bg-gray-950 ${
        !isMobileChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="p-3 md:p-4 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between gap-2">
        <div className="flex items-center min-w-0">
          <button
            onClick={() => setIsMobileChatOpen(false)}
            className="md:hidden text-pink-500 font-bold mr-3 text-sm px-2 py-1 bg-gray-800 rounded cursor-pointer shrink-0"
          >
            {t.backBtn}
          </button>
          <div className="truncate">
            <div className="font-bold text-pink-400 truncate flex items-center gap-2">
              <span>{activeContact?.name}</span>
              {activeContact?.cleared && (
                <span className="text-[10px] bg-green-950 border border-green-700 text-green-400 px-1.5 py-0.5 rounded font-bold">
                  ★ BUSTED
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {activeContact?.danger}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* 🌐 Compact Language Switcher in Chat Header */}
          {onLanguageChange && (
            <div className="flex items-center gap-0.5 bg-gray-800 border border-gray-700 rounded-lg p-0.5 shadow-sm">
              <button
                onClick={() => onLanguageChange("ja")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "ja"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
                title="日本語"
              >
                <span>🇯🇵</span>
                <span className="hidden sm:inline">日本語</span>
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "en"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
                title="English"
              >
                <span>🇺🇸</span>
                <span className="hidden sm:inline">EN</span>
              </button>
              <button
                onClick={() => onLanguageChange("my")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "my"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
                title="မြန်မာ"
              >
                <span>🇲🇲</span>
                <span className="hidden sm:inline">MY</span>
              </button>
              <button
                onClick={() => onLanguageChange("ne")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  lang === "ne"
                    ? "bg-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
                title="नेपाली"
              >
                <span>🇳🇵</span>
                <span className="hidden sm:inline">NE</span>
              </button>
            </div>
          )}

          {activeContact?.failed && (
            <button
              onClick={() => onRetry(activeContact.id)}
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>🔄</span>
              <span>
                {lang === "en"
                  ? "Retry"
                  : lang === "my"
                    ? "ပြန်စ"
                    : lang === "ne"
                      ? "पुनः"
                      : "リトライ"}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {/* ターゲット指令（スティッキー表示） */}
        <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-gray-800 text-xs shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-pink-400 font-bold block mb-1">
              {t.missionTitle}
            </span>
            <div className="space-y-1">
              {activeContact?.missions.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.found
                      ? "text-green-400 font-bold flex items-center gap-1"
                      : "text-gray-400 flex items-center gap-1"
                  }
                >
                  <span>{m.found ? "✔" : "○"}</span>
                  <span className={m.found ? "line-through opacity-90" : ""}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {activeContact?.cleared && (
            <div className="text-xs text-green-400 bg-green-950/60 border border-green-700 px-2.5 py-1 rounded font-bold text-center">
              {t.evidenceSecured || "証拠押収完了！"}
            </div>
          )}
        </div>

        {currentMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "player" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-md p-3 rounded-lg text-sm whitespace-pre-wrap ${
                msg.sender === "player"
                  ? "bg-pink-600 text-white rounded-br-none"
                  : "bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500 text-xs">{t.typing}</div>}
      </div>

      {activeContact?.cleared ? (
        <div className="p-4 bg-green-950/80 border-t border-green-800/80 text-center space-y-2">
          <div className="text-green-400 font-bold text-sm flex items-center justify-center gap-1.5">
            <span>✔</span>
            <span>
              {t.targetClearedTitle ||
                "このターゲットの捜査・摘発は完了しました"}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {t.targetClearedDesc ||
              "決定的な証拠の押収に成功しました。次のターゲットの捜査へ進んでください。"}
          </p>
          {onSelectNextTarget && (
            <button
              onClick={onSelectNextTarget}
              className="mt-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-black text-xs rounded-xl cursor-pointer shadow-lg shadow-green-500/20 inline-flex items-center gap-1.5 transition"
            >
              <span>{t.nextTargetBtn || "次の未解決ターゲットへ ❯"}</span>
            </button>
          )}
        </div>
      ) : activeContact?.failed ? (
        <div className="p-4 bg-red-950/90 border-t border-red-800 text-center space-y-2">
          <div className="text-red-400 font-bold text-base">
            {t.gameOverTitle}
          </div>
          <div className="text-red-300 text-xs">{t.gameOverText}</div>
          <div className="flex gap-2 justify-center pt-1">
            <button
              onClick={() => onRetry(activeContact.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>{t.retryTargetBtn || "この相手をリトライする"}</span>
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded cursor-pointer"
            >
              {t.restartBtn}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-gray-800 bg-gray-900/30 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder || "メッセージを入力..."}
            disabled={isLoading}
            className="flex-1 p-2 bg-gray-900 border border-gray-800 rounded text-white text-base sm:text-sm focus:outline-none focus:border-pink-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 font-bold rounded text-sm text-white cursor-pointer disabled:opacity-50"
          >
            {t.send}
          </button>
        </form>
      )}
    </div>
  );
}
