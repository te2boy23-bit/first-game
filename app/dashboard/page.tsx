"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import ArchiveModal from "../components/ArchiveModal";
import DashboardSidebar from "../components/DashboardSidebar";
import ChatWindow from "../components/ChatWindow";

interface Mission {
  id: number;
  name: string;
  found: boolean;
}
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

const uiTexts = {
  ja: {
    dashTitle: "サイバー潜入捜査ダッシュボード",
    agentInfo: "👤 潜入エージェント情報",
    openArchive: "📂 事件ファイルを開く ＞",
    clearedCount: "摘発完了",
    masterUnlock: "⭐ 最凶マスターレベル解放！",
    buyPremium: "💎 課金で解放",
    watchAd: "📺 広告",
    policeBriefing: "🚨 警察本部からの特命指令",
    policeBriefingText:
      "警視庁サイバー犯罪対策課：各詐欺グループに潜入し、組織の名称、口座、アジトの所在地などの決定的な証拠（キーワード）を自白させ、壊滅に追い込め。",
    missionTitle: "📋 ターゲット指令",
    inboxTitle: "📥 受信トレイ",
    reset: "データをリセット",
    backBtn: "◀ 戻る",
    typing: "相手が入力中...",
    send: "送信",
    placeholder: "への返信を入力...",
    allClearTitle: "🎉 全ての詐欺グループの摘発に成功！",
    restartBtn: "最初からもう一度プレイする",
    gameOverTitle: "⚠️ ターゲットに逃亡されました",
    gameOverText:
      "警戒度MAXのため、アカウントがブロックされました。（GAME OVER）",
  },
  en: {
    dashTitle: "Cyber Investigation Dashboard",
    agentInfo: "👤 Undercover Agent Info",
    openArchive: "📂 Open Case Files ＞",
    clearedCount: "Cleared",
    masterUnlock: "⭐ Master Level Unlock!",
    buyPremium: "💎 Buy Premium",
    watchAd: "📺 Watch Ad",
    policeBriefing: "🚨 Police Headquarters Briefing",
    policeBriefingText:
      "Cybercrime Division: Infiltrate scam groups, extract decisive evidence (organization names, bank accounts, hideouts), and bust the syndicates.",
    missionTitle: "📋 Target Missions",
    inboxTitle: "📥 Inbox (Flagged)",
    reset: "Reset Data",
    backBtn: "◀ Back",
    typing: "Typing...",
    send: "Send",
    placeholder: "Type a reply to ",
    allClearTitle: "🎉 Successfully busted all scam groups!",
    restartBtn: "Play Again from the Beginning",
    gameOverTitle: "⚠️ Target Fled / Blocked",
    gameOverText:
      "Security alert triggered. Your account was blocked. (GAME OVER)",
  },
};

const CONTACTS_JA: Contact[] = [
  {
    id: "sato",
    name: "佐藤（副業エージェント）",
    role: "副業詐欺勧誘員",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "10:42",
    subject: "【重要】初回報酬の受け取りについて",
    preview: "指定口座への登録がまだ完了しておりません。",
    initialMessage:
      "登録ありがとうございます！担当の佐藤です。本日から副業スタートですね。まずは最初の簡単な作業をご案内します。",
    cleared: false,
    missions: [{ id: 1, name: "組織の正式名称を聞き出す", found: false }],
  },
  {
    id: "yamada",
    name: "山田（国際ロマンス詐欺）",
    role: "出会い・投資詐欺",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "3日前",
    subject: "✈️ 日本に帰国したら一緒に暮らそう",
    preview: "空港の税関で荷物が止まってしまって...",
    initialMessage:
      "ハロー！あなたのプロフィールを見て一目惚れしちゃった。今度日本に行くから、そこで一緒にビジネスしない？",
    cleared: false,
    missions: [
      { id: 1, name: "海外の送金ルート（口座）を聞き出す", found: false },
    ],
  },
  {
    id: "tanaka",
    name: "田中（投資アドバイザー）",
    role: "FX投資詐欺グループ",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "昨日",
    subject: "⚠️ 【100%勝てる】極秘AIシグナル配信",
    preview: "昨日の会員様全員がプラス収支を達成しました。",
    initialMessage:
      "はじめまして、田中です。私の言う通りに資金を動かすだけで、毎日必ず10万円増やせますが、やってみますか？",
    cleared: false,
    missions: [
      { id: 1, name: "指定された振込先口座を入手する", found: false },
      { id: 2, name: "投資ファンドの組織名を聞き出す", found: false },
    ],
  },
  {
    id: "black",
    name: "不明な送信者（黒幕？）",
    role: "組織の幹部候補",
    danger: "危険度：高",
    dangerLevel: "hard",
    lastTime: "2日前",
    subject: "極秘案件：データ引き渡しについて",
    preview: "新しいカモのリストを確認した。今度の相手は...",
    initialMessage:
      "おい、そっちのデータベースの管理はどうなっている？警察の影がないか、しっかり確認しろよ。",
    cleared: false,
    missions: [
      { id: 1, name: "黒幕の連絡先（LINE・ID）を特定する", found: false },
    ],
  },
  {
    id: "master_boss",
    name: "ファントム（首謀者）",
    role: "国際詐欺組織の首領",
    danger: "危険度：EXTREME",
    dangerLevel: "master",
    lastTime: "今すぐ",
    subject: "👑 愚かなるおとり捜査官へ",
    preview: "我が組織の全貌にたどり着いた代償は大きい...",
    initialMessage:
      "ふふ、ここまで辿り着いたか。だが我々の真の計画を止めることは誰にもできん。組織の全容を暴きたければ、私を論破してみせろ！",
    cleared: false,
    missions: [
      { id: 1, name: "首謀者の本名とアジトの場所を自白させる", found: false },
      { id: 2, name: "シンジケートの全口座を押収する", found: false },
    ],
  },
];

const CONTACTS_EN: Contact[] = [
  {
    id: "sato",
    name: "Sato (Side Hustle Agent)",
    role: "Scam Recruiter",
    danger: "Threat: Low",
    dangerLevel: "easy",
    lastTime: "10:42",
    subject: "[Urgent] Initial Reward Payment",
    preview: "Your bank registration is incomplete.",
    initialMessage:
      "Thanks for registering! I'm Sato. Let's start your side hustle today. I will guide you through the first easy task.",
    cleared: false,
    missions: [
      { id: 1, name: "Get the official organization name", found: false },
    ],
  },
  {
    id: "yamada",
    name: "Yamada (Romance Scam)",
    role: "Romance/Investment",
    danger: "Threat: Low",
    dangerLevel: "easy",
    lastTime: "3 days ago",
    subject: "✈️ Let's live together in Japan",
    preview: "My luggage is stuck at customs...",
    initialMessage:
      "Hello! I fell in love with your profile. I'm going to Japan soon, do you want to do business together?",
    cleared: false,
    missions: [
      { id: 1, name: "Get the overseas remittance account", found: false },
    ],
  },
  {
    id: "tanaka",
    name: "Tanaka (Investment Advisor)",
    role: "FX Scam Group",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "Yesterday",
    subject: "⚠️ [100% Win] Secret AI Signals",
    preview: "All members achieved profit yesterday.",
    initialMessage:
      "Nice to meet you, I'm Tanaka. If you move your funds exactly as I say, you'll make $1000 daily. Want to try?",
    cleared: false,
    missions: [
      { id: 1, name: "Get the designated bank account", found: false },
      { id: 2, name: "Get the investment fund name", found: false },
    ],
  },
  {
    id: "black",
    name: "Unknown Sender (Mastermind?)",
    role: "Executive Candidate",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "2 days ago",
    subject: "Secret: Data Handover",
    preview: "Checked the new victim list. The next one is...",
    initialMessage:
      "Hey, how is the database management on your end? Make sure the police aren't snooping around.",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "Identify the mastermind's contact (LINE/ID)",
        found: false,
      },
    ],
  },
  {
    id: "master_boss",
    name: "Phantom (Leader)",
    role: "Syndicate Boss",
    danger: "Threat: EXTREME",
    dangerLevel: "master",
    lastTime: "Now",
    subject: "👑 To the foolish undercover agent",
    preview: "The price for discovering our truth is high...",
    initialMessage:
      "Heh, you made it this far. But no one can stop our true plan. If you want to expose our organization, try to outsmart me!",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "Make the boss confess real name and hideout",
        found: false,
      },
      { id: 2, name: "Seize all syndicate bank accounts", found: false },
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState<"ja" | "en">("ja");

  const [contacts, setContacts] = useState<Contact[]>(CONTACTS_JA);
  const [activeContactId, setActiveContactId] = useState<string>("sato");

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [adWatchCount, setAdWatchCount] = useState(0);

  const [chatHistories, setChatHistories] = useState<
    Record<string, { sender: string; text: string }[]>
  >({});
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDashboard = async () => {
      let savedNickname = localStorage.getItem("scam_nickname");
      let savedEmail = localStorage.getItem("scam_email");
      let savedStep = localStorage.getItem("scam_step");
      const savedLang =
        (localStorage.getItem("scam_lang") as "ja" | "en") || "ja";
      const savedPremium = localStorage.getItem("scam_premium");
      const savedAds = localStorage.getItem("scam_ads");

      let nicknameToSet = savedNickname || "";
      let emailToSet = savedEmail || "";

      if (!savedNickname || savedStep !== "game") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          nicknameToSet =
            user.user_metadata?.full_name ||
            user.user_metadata?.nickname ||
            user.email?.split("@")[0] ||
            "エージェント";
          emailToSet = user.email || "";
          localStorage.setItem("scam_nickname", nicknameToSet);
          localStorage.setItem("scam_email", emailToSet);
          localStorage.setItem("scam_step", "game");
        } else {
          router.push("/");
          return;
        }
      }

      setNickname(nicknameToSet);
      if (emailToSet) setEmail(emailToSet);
      setLang(savedLang);
      if (savedPremium === "true") setIsPremium(true);
      if (savedAds) setAdWatchCount(Number(savedAds));

      const activeContacts = savedLang === "en" ? CONTACTS_EN : CONTACTS_JA;
      setContacts(activeContacts);

      setChatHistories((prev) => {
        const initialHistories = { ...prev };
        activeContacts.forEach((c) => {
          if (!initialHistories[c.id]) {
            initialHistories[c.id] = [
              { sender: "scammer", text: c.initialMessage },
            ];
          }
        });
        return initialHistories;
      });
    };

    initDashboard();
  }, [router]);

  const t = uiTexts[lang] || uiTexts.ja;

  const handleSelectContact = (contact: Contact) => {
    if (isLoading) return;
    setActiveContactId(contact.id);
    setIsMobileChatOpen(true);
  };

  const handleReset = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const targetContactId = activeContactId;
    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      const currentMessages = chatHistories[targetContactId] || [];
      const updatedMessages = [
        ...currentMessages,
        { sender: "player", text: userMessage },
      ];

      setChatHistories((prev) => ({
        ...prev,
        [targetContactId]: updatedMessages,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          nickname,
          contactId: targetContactId,
          lang,
        }),
      });
      const data = await response.json();

      if (data.reply) {
        let aiReply = data.reply;
        let isGameOver = false;

        if (aiReply.includes("[GAME_OVER]")) {
          isGameOver = true;
          aiReply = aiReply.replace("[GAME_OVER]", "").trim();
        }

        setChatHistories((prev) => {
          const prevMessages = prev[targetContactId] || updatedMessages;
          return {
            ...prev,
            [targetContactId]: [
              ...prevMessages,
              { sender: "scammer", text: aiReply },
            ],
          };
        });

        setContacts((prevContacts) => {
          return prevContacts.map((c) => {
            if (c.id === targetContactId && !c.cleared) {
              if (isGameOver) {
                return { ...c, failed: true };
              }

              const updatedMissions = c.missions.map((m) => {
                if (!m.found) {
                  const keywords =
                    lang === "ja"
                      ? [
                          "株式会社",
                          "合同会社",
                          "口座",
                          "銀行",
                          "LINE",
                          "ID",
                          "送金",
                          "ファンド",
                          "アジト",
                          "東京",
                          "シンジケート",
                        ]
                      : [
                          "inc",
                          "llc",
                          "account",
                          "bank",
                          "line",
                          "id",
                          "transfer",
                          "fund",
                          "hideout",
                          "tokyo",
                          "syndicate",
                        ];

                  if (
                    keywords.some((kw) =>
                      aiReply.toLowerCase().includes(kw.toLowerCase()),
                    )
                  ) {
                    return { ...m, found: true };
                  }
                }
                return m;
              });

              const allMissionsFound =
                updatedMissions.length > 0 &&
                updatedMissions.every((m) => m.found);
              return {
                ...c,
                missions: updatedMissions,
                cleared: allMissionsFound,
              };
            }
            return c;
          });
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearedScamCount = contacts.filter((c) => c.cleared).length;
  const isMasterUnlocked = isPremium || adWatchCount >= 2;
  const canUnlockMaster = clearedScamCount >= 4;

  // 💡 受信トレイに常に未クリアのターゲットが最低3つ表示されるように調整
  const visibleContacts = contacts.filter((c) => !c.cleared).slice(0, 3);

  const activeContact =
    contacts.find((c) => c.id === activeContactId) ||
    visibleContacts[0] ||
    contacts[0];
  const currentMessages = chatHistories[activeContactId] || [];
  const allScamsCleared =
    contacts.length > 0 && contacts.every((c) => c.cleared);

  return (
    <main className="flex h-screen w-screen bg-gray-950 text-gray-100 overflow-hidden relative">
      <ArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        clearedContacts={contacts.filter((c) => c.cleared)}
      />

      {allScamsCleared ? (
        <div className="flex flex-col items-center justify-center w-full bg-black text-green-400 font-mono p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-300">
            {t.allClearTitle}
          </h1>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded mt-8 cursor-pointer"
          >
            {t.restartBtn}
          </button>
        </div>
      ) : (
        <>
          <DashboardSidebar
            t={t}
            nickname={nickname}
            clearedScamCount={clearedScamCount}
            totalContactsCount={contacts.length}
            canUnlockMaster={canUnlockMaster}
            isMasterUnlocked={isMasterUnlocked}
            setIsPremium={setIsPremium}
            adWatchCount={adWatchCount}
            setAdWatchCount={setAdWatchCount}
            visibleContacts={visibleContacts}
            activeContactId={activeContactId}
            handleSelectContact={handleSelectContact}
            setShowArchiveModal={setShowArchiveModal}
            isMobileChatOpen={isMobileChatOpen}
            onReset={handleReset}
          />

          <ChatWindow
            t={t}
            activeContact={activeContact}
            currentMessages={currentMessages}
            isLoading={isLoading}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            setIsMobileChatOpen={setIsMobileChatOpen}
            isMobileChatOpen={isMobileChatOpen}
            onReset={handleReset}
          />
        </>
      )}
    </main>
  );
}
