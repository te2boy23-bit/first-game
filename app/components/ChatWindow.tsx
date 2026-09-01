"use client";

interface Mission {
  id: number;
  name: string;
  found: boolean;
}

interface ActiveContact {
  name: string;
  danger: string;
  failed?: boolean;
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
}: ChatWindowProps) {
  return (
    <div
      className={`w-full md:w-2/3 flex-col justify-between bg-gray-950 ${
        !isMobileChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="p-3 md:p-4 border-b border-gray-800 bg-gray-900/30 flex items-center">
        <button
          onClick={() => setIsMobileChatOpen(false)}
          className="md:hidden text-pink-500 font-bold mr-3 text-sm px-2 py-1 bg-gray-800 rounded cursor-pointer"
        >
          {t.backBtn}
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-pink-400 truncate">
            {activeContact?.name}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {activeContact?.danger}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {/* 💡 ターゲット指令を上部に固定（スティッキー表示） */}
        <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-gray-800 text-xs shadow-lg">
          <span className="text-pink-400 font-bold block mb-1">
            {t.missionTitle}
          </span>
          {activeContact?.missions.map((m) => (
            <div
              key={m.id}
              className={m.found ? "text-green-400" : "text-gray-400"}
            >
              {m.found ? "[✔]" : "[ ]"} {m.name}
            </div>
          ))}
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

      {activeContact?.failed ? (
        <div className="p-4 bg-red-950/90 border-t border-red-800 text-center">
          <div className="text-red-400 font-bold text-base mb-1">
            {t.gameOverTitle}
          </div>
          <div className="text-red-300 text-xs mb-3">{t.gameOverText}</div>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded cursor-pointer shadow-lg"
          >
            {t.restartBtn}
          </button>
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
            placeholder={`${t.placeholder}${activeContact?.name}...`}
            disabled={isLoading}
            className="flex-1 p-2 bg-gray-900 border border-gray-800 rounded text-white text-sm focus:outline-none focus:border-pink-500"
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
