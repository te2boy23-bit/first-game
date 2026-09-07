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
  nickname?: string;
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

export type OpponentEmotion =
  | "confident"
  | "panicked"
  | "angry"
  | "smug"
  | "defeated";

export function detectOpponentEmotion(
  activeContact?: ActiveContact,
  currentMessages: { sender: string; text: string }[] = [],
  isLoading = false,
): OpponentEmotion {
  if (activeContact?.cleared) {
    return "defeated";
  }
  if (activeContact?.failed) {
    return "angry";
  }

  // Check secured missions count
  const securedMissionsCount =
    activeContact?.missions?.filter((m) => m.found)?.length || 0;
  if (securedMissionsCount >= 2) {
    return "panicked";
  }

  const lastMessages = currentMessages.slice(-3);
  const combinedText = lastMessages
    .map((m) => m.text)
    .join(" ")
    .toLowerCase();
  const lastScammerMsg =
    [...currentMessages].reverse().find((m) => m.sender !== "player")?.text ||
    "";
  const lastPlayerMsg =
    [...currentMessages].reverse().find((m) => m.sender === "player")?.text ||
    "";

  // 1. Angry check (Spam, Game Over, Threats, Rage words)
  if (
    combinedText.includes("[game_over]") ||
    lastScammerMsg.includes("ブロック") ||
    lastScammerMsg.includes("舐めてんの") ||
    lastScammerMsg.includes("ふざけるな") ||
    lastScammerMsg.includes("警察か") ||
    lastScammerMsg.includes("時間の無駄") ||
    lastScammerMsg.includes("裁判") ||
    lastScammerMsg.includes("提訴") ||
    lastScammerMsg.includes("blocked") ||
    lastScammerMsg.includes("cop") ||
    lastScammerMsg.includes("lawsuit")
  ) {
    return "angry";
  }

  // 2. Panicked check (Mission secured, Cornered, Caught in lies)
  if (
    securedMissionsCount > 0 ||
    combinedText.includes("[mission_cleared") ||
    lastScammerMsg.includes("まさか") ||
    lastScammerMsg.includes("嘘だろ") ||
    lastScammerMsg.includes("バレた") ||
    lastScammerMsg.includes("警察に言うな") ||
    lastScammerMsg.includes("見破る") ||
    lastScammerMsg.includes("ちっ") ||
    lastScammerMsg.includes("どうして") ||
    lastScammerMsg.includes("馬鹿な") ||
    lastScammerMsg.includes("bluff broken") ||
    lastScammerMsg.includes("impossible")
  ) {
    return "panicked";
  }

  // 3. Smug / Greedy check (Player ready to transfer / flattering)
  if (
    lastPlayerMsg.includes("振り込") ||
    lastPlayerMsg.includes("送金") ||
    lastPlayerMsg.includes("さくらネット銀行") ||
    lastPlayerMsg.includes("口座") ||
    lastPlayerMsg.includes("準備ができました") ||
    lastPlayerMsg.includes("transfer") ||
    lastScammerMsg.includes("愛してる") ||
    lastScammerMsg.includes("日給5万円") ||
    lastScammerMsg.includes("信じてくれて") ||
    lastScammerMsg.includes("特別枠")
  ) {
    return "smug";
  }

  return "confident";
}

export function getMoodEmoji(emotion: OpponentEmotion): string {
  switch (emotion) {
    case "panicked":
      return "💦";
    case "angry":
      return "💢";
    case "smug":
      return "😏";
    case "defeated":
      return "😱";
    default:
      return "😎";
  }
}

export function getMoodText(
  emotion: OpponentEmotion,
  lang: "ja" | "en" | "my" | "ne" = "ja",
): string {
  if (lang === "en") {
    switch (emotion) {
      case "panicked":
        return "Panicked & Sweating";
      case "angry":
        return "Furious & Menacing";
      case "smug":
        return "Smug & Greedy";
      case "defeated":
        return "Busted & Defeated";
      default:
        return "Calm & Composed";
    }
  }
  if (lang === "my") {
    switch (emotion) {
      case "panicked":
        return "စိုးရိမ်တုန်လှုပ် (ချွေးပြန်)";
      case "angry":
        return "ဒေါသထွက်နေသည် (ခြိမ်းခြောက်)";
      case "smug":
        return "လှည့်စားရန် ပြင်ဆင်";
      case "defeated":
        return "လုံးဝအရှုံးပေး (သက်သေမိ)";
      default:
        return "အေးဆေးတည်ငြိမ်";
    }
  }
  if (lang === "ne") {
    switch (emotion) {
      case "panicked":
        return "आत्तिएको र पसिना";
      case "angry":
        return "आक्रोशित र धम्की";
      case "smug":
        return "ढुक्क र लोभी";
      case "defeated":
        return "पूर्ण पराजित";
      default:
        return "शान्त र ढुक्क";
    }
  }
  switch (emotion) {
    case "panicked":
      return "焦り・動揺（冷や汗）";
    case "angry":
      return "激怒・威圧（警戒中）";
    case "smug":
      return "ニヤリ（カモ認定）";
    case "defeated":
      return "完全自白（証拠押収）";
    default:
      return "余裕綽々（平常）";
  }
}

export default function ChatWindow({
  t,
  nickname,
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
  const contactId = activeContact?.id || "sato";
  const currentEmotion = detectOpponentEmotion(
    activeContact,
    currentMessages,
    isLoading,
  );

  const targetAvatarSrc =
    `/images/avatars/${contactId}_${currentEmotion}.svg` ||
    AVATAR_MAP[contactId] ||
    "/images/avatars/sato.jpg";

  const agentAvatarSrc = "/images/avatars/agent.svg";
  const agentName =
    nickname ||
    (lang === "en"
      ? "Agent"
      : lang === "my"
        ? "စုံစမ်းရေးမှူး"
        : lang === "ne"
          ? "एजेन्ट"
          : "カモ太郎");

  const handleInsertBank = () => {
    let text = `振込先口座の情報です。\n銀行名：さくらネット銀行（新宿支店 108）\n口座番号：普通 4589210\n口座名義：${agentName}`;
    if (lang === "en") {
      text = `Here is my bank account information:\nBank: Sakura Net Bank (Shinjuku Branch 108)\nAccount No: Savings 4589210\nAccount Name: ${agentName}`;
    } else if (lang === "my") {
      text = `ငွေလွှဲလက်ခံမည့် ဘဏ်အကောင့် အချက်အလက် ဖြစ်ပါသည်။\nဘဏ်: Sakura Net Bank (Shinjuku ဘဏ်ခွဲ 108)\nအကောင့်နံပါတ်: 4589210\nအမည်: ${agentName}`;
    } else if (lang === "ne") {
      text = `मेरो बैंक खाता विवरण यस प्रकार छ:\nबैंक: Sakura Net Bank (Shinjuku Branch 108)\nखाता नम्बर: 4589210\nखातावालाको नाम: ${agentName}`;
    }
    setInput(text);
  };

  const handleInsertId = () => {
    let text = `身元確認用の情報です。\n氏名：${agentName}\n住所：東京都新宿区西新宿3丁目12-8 パークレジデンス402\n電話番号：090-3841-9284\n生年月日：1995/04/12`;
    if (lang === "en") {
      text = `Here is my identification information:\nName: ${agentName}\nAddress: #402 Park Residence, 3-12-8 Nishi-Shinjuku, Shinjuku-ku, Tokyo\nPhone: 090-3841-9284\nDOB: 1995/04/12`;
    } else if (lang === "my") {
      text = `အထောက်အထား အချက်အလက် ဖြစ်ပါသည်။\nအမည်: ${agentName}\nလိပ်စာ: #402 Park Residence, 3-12-8 Nishi-Shinjuku, Shinjuku-ku, Tokyo\nဖုန်း: 090-3841-9284\nမွေးသက္ကရာဇ်: 1995/04/12`;
    } else if (lang === "ne") {
      text = `परिचय प्रमाणीकरण विवरण:\nनाम: ${agentName}\nठेगाना: #402 Park Residence, 3-12-8 Nishi-Shinjuku, Shinjuku-ku, Tokyo\nफोन: 090-3841-9284\nजन्म मिति: 1995/04/12`;
    }
    setInput(text);
  };

  const handleInsertPayIntent = () => {
    let text = `手続きの準備ができました。指定の口座へすぐに送金したいので、お振込先の口座番号と会社名を教えてください。`;
    if (lang === "en") {
      text = `I am ready to transfer now. Please provide your official company name and bank details so I can send the payment.`;
    } else if (lang === "my") {
      text = `ငွေလွှဲရန် အဆင်သင့်ဖြစ်ပါပြီ။ သင့်တရားဝင်ကုမ္ပဏီအမည်နှင့် ဘဏ်အကောင့်ကို ပေးပို့ပေးပါ။`;
    } else if (lang === "ne") {
      text = `म रकम भुक्तानी गर्न तयार छु। कृपया तपाईंको आधिकारिक कम्पनीको नाम र बैंक खाता विवरण पठाउनुहोस्।`;
    }
    setInput(text);
  };

  return (
    <div
      className={`w-full md:w-2/3 flex-col justify-between bg-gray-950 ${
        !isMobileChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="p-3 md:p-4 border-b border-gray-800 bg-gray-900/40 backdrop-blur-md flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center min-w-0 gap-3">
          <button
            onClick={() => setIsMobileChatOpen(false)}
            className="md:hidden text-pink-500 font-bold mr-1 text-sm px-2.5 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer shrink-0 transition"
          >
            {t.backBtn}
          </button>

          {/* 👤 Suspect Header Avatar with animated status indicator */}
          <div className="relative shrink-0">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 transition-all ${
                isLoading
                  ? "border-pink-500 ring-2 ring-pink-500/50 animate-pulse scale-105"
                  : activeContact?.cleared
                    ? "border-green-500 ring-2 ring-green-500/30"
                    : activeContact?.failed
                      ? "border-red-500 opacity-60"
                      : "border-gray-700 hover:border-pink-500"
              }`}
            >
              <img
                src={targetAvatarSrc}
                alt={activeContact?.name || "Target"}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-950 ${
                activeContact?.failed
                  ? "bg-red-500"
                  : activeContact?.cleared
                    ? "bg-green-500"
                    : "bg-emerald-400 animate-pulse"
              }`}
            />
          </div>

          <div className="truncate">
            <div className="font-bold text-gray-100 text-sm sm:text-base truncate flex items-center gap-2">
              <span className="text-pink-400 font-black">
                {activeContact?.name}
              </span>
              {activeContact?.cleared && (
                <span className="text-[10px] bg-green-950/80 border border-green-700 text-green-400 px-2 py-0.5 rounded-full font-bold shadow-sm shadow-green-950">
                  ★ BUSTED
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5 truncate flex-wrap">
              <span className="text-yellow-400/90 font-mono text-[11px]">
                {activeContact?.danger}
              </span>
              {/* 🎭 Dynamic Mood Status Radar Badge */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shadow-sm transition-all duration-300 ${
                  currentEmotion === "panicked"
                    ? "bg-cyan-950/90 border-cyan-500 text-cyan-300 animate-pulse"
                    : currentEmotion === "angry"
                      ? "bg-red-950/90 border-red-500 text-red-300 animate-pulse"
                      : currentEmotion === "smug"
                        ? "bg-amber-950/90 border-amber-500 text-amber-300"
                        : currentEmotion === "defeated"
                          ? "bg-purple-950/90 border-purple-500 text-purple-300"
                          : "bg-gray-800/90 border-gray-700 text-gray-300"
                }`}
              >
                <span>{getMoodEmoji(currentEmotion)}</span>
                <span>{getMoodText(currentEmotion, lang)}</span>
              </span>

              {isLoading && (
                <span className="text-pink-400 text-[11px] animate-pulse font-medium">
                  • {t.typing}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* 🌐 Compact Language Switcher in Chat Header */}
          {onLanguageChange && (
            <div className="flex items-center gap-0.5 bg-gray-800/90 border border-gray-700 rounded-lg p-0.5 shadow-sm">
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
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center gap-1 shrink-0 shadow-md shadow-red-950"
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

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 relative bg-gradient-to-b from-gray-950 via-gray-900/40 to-gray-950">
        {/* 🎭 Dynamic Opponent Mood Background Atmosphere & Portrait */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center md:justify-end md:pr-12 z-0 select-none">
          {/* Mood Backlight Aura */}
          <div
            className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-all duration-1000 ${
              currentEmotion === "panicked"
                ? "bg-cyan-500/20 scale-110 animate-pulse"
                : currentEmotion === "angry"
                  ? "bg-red-600/25 scale-125 animate-pulse"
                  : currentEmotion === "smug"
                    ? "bg-amber-400/20 scale-115"
                    : currentEmotion === "defeated"
                      ? "bg-indigo-600/30 animate-pulse"
                      : "bg-pink-500/10 scale-100"
            }`}
          />

          {/* Background Character Expression Illustration */}
          <div
            className={`relative transition-all duration-700 ${
              currentEmotion === "panicked"
                ? "opacity-20 md:opacity-25 scale-105 animate-bounce"
                : currentEmotion === "angry"
                  ? "opacity-25 md:opacity-30 scale-110"
                  : currentEmotion === "defeated"
                    ? "opacity-15 md:opacity-20 grayscale brightness-50"
                    : "opacity-15 md:opacity-20 scale-100"
            }`}
          >
            <img
              src={targetAvatarSrc}
              alt="Character Mood Background"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  AVATAR_MAP[contactId] || "/images/avatars/sato.jpg";
              }}
              className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-3xl drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white/5"
            />

            {/* Floating Mood Badges */}
            {currentEmotion === "panicked" && (
              <div className="absolute -top-3 -right-3 text-3xl md:text-4xl animate-bounce drop-shadow-md">
                💦
              </div>
            )}
            {currentEmotion === "angry" && (
              <div className="absolute -top-4 -right-4 text-3xl md:text-4xl animate-pulse drop-shadow-md">
                💢
              </div>
            )}
            {currentEmotion === "smug" && (
              <div className="absolute -top-3 -right-3 text-3xl md:text-4xl animate-spin drop-shadow-md">
                ✨
              </div>
            )}
            {currentEmotion === "defeated" && (
              <div className="absolute -top-3 -right-3 text-3xl md:text-4xl drop-shadow-md">
                😱
              </div>
            )}
          </div>
        </div>
        {/* ターゲット指令（スティッキー表示） */}
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-pink-500/30 text-xs shadow-xl shadow-black/40 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-pink-400 font-extrabold tracking-wide">
                {t.missionTitle}
              </span>
            </div>
            <div className="space-y-1 pl-4">
              {activeContact?.missions.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.found
                      ? "text-emerald-400 font-bold flex items-center gap-1.5 transition-all animate-in fade-in duration-300"
                      : "text-gray-300 flex items-center gap-1.5 font-medium"
                  }
                >
                  <span
                    className={
                      m.found ? "text-emerald-400 scale-110" : "text-gray-500"
                    }
                  >
                    {m.found ? "✔" : "○"}
                  </span>
                  <span
                    className={
                      m.found ? "line-through text-emerald-400/80" : ""
                    }
                  >
                    {m.name}
                  </span>
                  {m.found && (
                    <span className="text-[10px] bg-emerald-950 border border-emerald-700 px-1.5 py-0.2 rounded text-emerald-300 font-mono font-bold">
                      SECURED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeContact?.cleared && (
            <div className="text-xs text-green-400 bg-green-950/80 border border-green-600 px-3 py-1.5 rounded-lg font-black text-center shadow-md animate-bounce">
              ✨ {t.evidenceSecured || "証拠押収完了！"}
            </div>
          )}
        </div>

        {/* 💬 Chat Messages with Avatars */}
        {currentMessages.map((msg, idx) => {
          const isPlayer = msg.sender === "player";
          return (
            <div
              key={idx}
              className={`flex items-end gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                isPlayer ? "justify-end" : "justify-start"
              }`}
            >
              {/* Left Avatar for Scammer */}
              {!isPlayer && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-700 shrink-0 shadow-md bg-gray-900 self-start mt-0.5">
                  <img
                    src={targetAvatarSrc}
                    alt="Scammer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        AVATAR_MAP[contactId] || "/images/avatars/sato.jpg";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] sm:max-w-md p-3 sm:p-3.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-md transition-all ${
                  isPlayer
                    ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-br-xs shadow-pink-950/30"
                    : "bg-gray-900/90 border border-gray-800 text-gray-100 rounded-bl-xs shadow-black/40 hover:border-gray-700"
                }`}
              >
                {msg.text}
              </div>

              {/* Right Avatar for Player Agent */}
              {isPlayer && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0 shadow-md bg-gray-900 self-start mt-0.5">
                  <img
                    src={agentAvatarSrc}
                    alt="Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* 相手の入力中アニメーション */}
        {isLoading && (
          <div className="flex items-center gap-2.5 text-gray-400 text-xs animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-pink-500 animate-pulse shrink-0 bg-gray-900">
              <img
                src={targetAvatarSrc}
                alt="Typing"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    AVATAR_MAP[contactId] || "/images/avatars/sato.jpg";
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-900/90 border border-gray-800 px-3.5 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-md">
              <span className="text-pink-400 font-bold">{t.typing}</span>
              <span className="inline-flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
              </span>
            </div>
          </div>
        )}
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
        <div className="border-t border-gray-800 bg-gray-900/50 p-2.5 sm:p-3 space-y-2">
          {/* 🛡️ おとり捜査用クイックアクションバー */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
            <span className="text-gray-500 font-bold shrink-0 hidden sm:inline flex items-center gap-1">
              <span>🛡️</span>
              <span>
                {lang === "en"
                  ? "Undercover Data:"
                  : lang === "my"
                    ? "အတုအယောင်ဒေတာ:"
                    : lang === "ne"
                      ? "नक्कली डाटा:"
                      : "おとり捜査用データ:"}
              </span>
            </span>
            <button
              type="button"
              onClick={handleInsertBank}
              className="px-2.5 py-1 bg-blue-950/80 hover:bg-blue-900 text-blue-300 hover:text-white border border-blue-700/70 rounded-lg transition cursor-pointer font-bold shrink-0 shadow-sm flex items-center gap-1"
              title={
                lang === "en"
                  ? "Insert Undercover Bank Account"
                  : "おとり捜査用口座情報を自動入力"
              }
            >
              <span>💳</span>
              <span>
                {lang === "en"
                  ? "Send Dummy Bank Info"
                  : lang === "my"
                    ? "ဘဏ်အကောင့် ထည့်ပါ"
                    : lang === "ne"
                      ? "बैंक विवरण राख्नुहोस्"
                      : "おとり口座を送る"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleInsertId}
              className="px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-700/70 rounded-lg transition cursor-pointer font-bold shrink-0 shadow-sm flex items-center gap-1"
              title={
                lang === "en"
                  ? "Insert Undercover ID & Address"
                  : "偽の身元・住所情報を自動入力"
              }
            >
              <span>💼</span>
              <span>
                {lang === "en"
                  ? "Send Dummy ID"
                  : lang === "my"
                    ? "အတုအထောက်အထား ထည့်ပါ"
                    : lang === "ne"
                      ? "नक्कली परिचय राख्नुहोस्"
                      : "偽身分証を送る"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleInsertPayIntent}
              className="px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-700/70 rounded-lg transition cursor-pointer font-bold shrink-0 shadow-sm flex items-center gap-1"
              title={
                lang === "en"
                  ? "Tell them you are ready to transfer money"
                  : "振込・送金する意思を伝えて相手の口座・会社名を引き出す"
              }
            >
              <span>💴</span>
              <span>
                {lang === "en"
                  ? "Ready to Transfer"
                  : lang === "my"
                    ? "ငွေလွှဲမည်ဟု ပြောပါ"
                    : lang === "ne"
                      ? "रकम भुक्तानी इच्छा"
                      : "振り込みたいと伝える"}
              </span>
            </button>
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
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
        </div>
      )}
    </div>
  );
}
