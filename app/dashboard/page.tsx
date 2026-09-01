"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArchiveModal from "../components/ArchiveModal";

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
}

const ALL_CONTACTS: Contact[] = [
  {
    id: "sato",
    name: "佐藤（副業エージェント）",
    role: "副業詐欺勧誘員",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "10:42",
    subject: "【重要】初回報酬の受け取りについて",
    preview: "指定口座への登録がまだ完了しておりません。",
    initialMessage: "登録ありがとうございます！担当の佐藤です。本日から副業スタートですね。まずは最初の簡単な作業をご案内します。",
    cleared: false,
    missions: [{ id: 1, name: "組織の正式名称を聞き出す", found: false }],
    description: "スマホ副業を謳い、登録料や初期費用名目で金をだまし取る初歩的な詐欺グループ。",
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
    initialMessage: "ハロー！あなたのプロフィールを見て一目惚れしちゃった。今度日本に行くから、そこで一緒にビジネスしない？",
    cleared: false,
    missions: [{ id: 1, name: "海外の送金ルート（口座）を聞き出す", found: false }],
    description: "ロマンス詐欺グループ。海外口座への資金移動ネットワークを特定し摘発。",
  },
  {
    id: "watanabe",
    name: "渡辺（チケット転売詐欺）",
    role: "闇チケットグループ",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "4日前",
    subject: "🎫 プラチナチケット譲ります",
    preview: "直前キャンセルが出たため定価でお譲りします。",
    initialMessage: "お探しの大人気ライブのチケット、特別に用意できますよ。先払いで指定口座に振り込んでください。",
    cleared: false,
    missions: [{ id: 1, name: "チケット代金の振込先口座を入手する", found: false }],
    description: "人気アーティストのチケットを捏造してファンの弱みにつけ込んだ闇グループ。",
  },
  {
    id: "ishida",
    name: "石田（副業セミナー）",
    role: "悪質セミナー勧誘",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "5日前",
    subject: "💻 スマホをタップするだけの日給3万円",
    preview: "初心者でも絶対に失敗しないノウハウを公開中！",
    initialMessage: "はじめまして！誰でも簡単にスマホで稼げる極秘セミナーのご案内です。まずは参加費として専用口座へお振り込みください。",
    cleared: false,
    missions: [{ id: 1, name: "セミナー運営会社の口座を聞き出す", found: false }],
    description: "高額な情報商材を売りつける悪質なセミナー運営元。",
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
    initialMessage: "はじめまして、田中です。私の言う通りに資金を動かすだけで、毎日必ず10万円増やせますが、やってみますか？",
    cleared: false,
    missions: [
      { id: 1, name: "指定された振込先口座を入手する", found: false },
      { id: 2, name: "投資ファンドの組織名を聞き出す", found: false },
    ],
    description: "架空のAIシステムを用いて絶対勝てると誤認させ、大金を投資させる組織的FX詐欺グループ。",
  },
  {
    id: "suzuki",
    name: "鈴木（ブランドオークション）",
    role: "偽ブランド詐欺グループ",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "一昨日",
    subject: "👜 高級バッグ格安セールのご案内",
    preview: "海外ロストバゲージ品を限定特価で販売中！",
    initialMessage: "有名ブランドのバッグが定価の90%OFF！当店だけの独占ルートで仕入れた本物です。今すぐ専用ページへどうぞ。",
    cleared: false,
    missions: [{ id: 1, name: "振込先銀行口座の情報を入手する", found: false }],
    description: "粗悪な偽物を高級ブランド品と偽って販売し代金を回収して逃走するネットショップ詐欺。",
  },
  {
    id: "takahashi",
    name: "高橋（架空請求サポート）",
    role: "サポート詐欺グループ",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "3日前",
    subject: "🚨 未納料金に関する最終通告",
    preview: "有料動画サイトの未納料金が発生しております。",
    initialMessage: "お客様の会員登録に関して未納料金がございます。本日中にご連絡がない場合、法的処置に移行いたします。",
    cleared: false,
    missions: [{ id: 1, name: "運営会社の正式名称を聞き出す", found: false }],
    description: "パソコン画面に偽のウイルス警告を出し、サポート名目で金をだまし取る悪質な手口。",
  },
  {
    id: "matsumoto",
    name: "松本（仮想通貨ICO）",
    role: "コインチート詐欺",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "4日前",
    subject: "💎 次世代NFTコイン上場前セール",
    preview: "上場後に100倍確定の新規コインを特別に先行販売。",
    initialMessage: "来月大手取引所に上場する爆上げ確定のコインがあります。今なら特別にプライベートセール枠でご案内可能です。",
    cleared: false,
    missions: [{ id: 1, name: "送金先のウォレットアドレスを入手する", found: false }],
    description: "価値のないゴーストコインを大々的に宣伝し、上場詐欺で資金を持ち逃げするグループ。",
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
    initialMessage: "おい、そっちのデータベースの管理はどうなっている？警察の影がないか、しっかり確認しろよ。",
    cleared: false,
    missions: [
      { id: 1, name: "黒幕の連絡先（LINE・ID）を特定する", found: false },
      { id: 2, name: "組織の裏アトリエの住所を聞き出す", found: false },
    ],
    description: "複数の下部組織を束ねていた中間管理組織の幹部。",
  },
  {
    id: "cyber_boss",
    name: "ゼロ（ハッカー集団リーダー）",
    role: "ランサムウェア犯罪者",
    danger: "危険度：MAX",
    dangerLevel: "hard",
    lastTime: "たった今",
    subject: "💀 システムの暗号化を解除したければ",
    preview: "お前のPCのファイル、すべてロックした。",
    initialMessage: "フッ、迂闊なアクセスだな。お前の端末のデータはすべて人質にとった。命が惜しければ指定のウォレットにビットコインを送れ。",
    cleared: false,
    missions: [
      { id: 1, name: "ハッカーのウォレット・口座アドレスを特定する", found: false },
      { id: 2, name: "組織の正式名称を聞き出す", found: false },
    ],
    description: "ランサムウェアでインフラを脅かすハッカー集団の首謀者。",
  },
  {
    id: "ogawa",
    name: "小川（ダークウェブ・ブローカー）",
    role: "国際マネーロンダリング",
    danger: "危険度：危険度S",
    dangerLevel: "hard",
    lastTime: "1日前",
    subject: "🌐 オフショル口座への資金洗浄について",
    preview: "先週分のシークレット資金のルート変更の件。",
    initialMessage: "匿名性の高い海外シェルカンパニー経由での資金移動ルートの確認だ。暗号化されたキーを提示しろ。",
    cleared: false,
    missions: [{ id: 1, name: "海外シェルカンパニーの口座を聞き出す", found: false }],
    description: "闇社会の資金洗浄を一身に担っていた地下金融のブローカー。",
  },
  {
    id: "master_boss",
    name: "ファントム（国際犯罪シンジケート首謀者）",
    role: "巨大国際詐欺組織の首領",
    danger: "危険度：EXTREME",
    dangerLevel: "master",
    lastTime: "今すぐ",
    subject: "👑 愚かなるおとり捜査官へ",
    preview: "我が組織の全貌にたどり着いた代償は大きい...",
    initialMessage: "ふふ、ここまで辿り着いたか。だが我々の真の計画を止めることは誰にもできん。組織の全容を暴きたければ、私を論破してみせろ！",
    cleared: false,
    missions: [
      { id: 1, name: "首謀者の本名とアジトの場所を自白させる", found: false },
      { id: 2, name: "シンジケートの全口座を押収する", found: false },
    ],
    description: "世界中の詐欺ネットワークを裏で牛耳っていた究極の黒幕。",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [contacts, setContacts] = useState<Contact[]>(ALL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string>("sato");

  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [adWatchCount, setAdWatchCount] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  const initialHistories: Record<string, { sender: string; text: string }[]> = {};
  ALL_CONTACTS.forEach((c) => {
    initialHistories[c.id] = [{ sender: "scammer", text: c.initialMessage }];
  });

  const [chatHistories, setChatHistories] = useState(initialHistories);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedNickname = localStorage.getItem("scam_nickname");
    const savedEmail = localStorage.getItem("scam_email");
    const savedStep = localStorage.getItem("scam_step");
    const savedPremium = localStorage.getItem("scam_premium");
    const savedAds = localStorage.getItem("scam_ads");

    if (!savedNickname || savedStep !== "game") {
      router.push("/");
      return;
    }

    setNickname(savedNickname);
    if (savedEmail) setEmail(savedEmail);
    if (savedPremium === "true") setIsPremium(true);
    if (savedAds) setAdWatchCount(Number(savedAds));
  }, [router]);

  const handlePurchasePremium = () => {
    setIsPremium(true);
    localStorage.setItem("scam_premium", "true");
    alert("🎉 エージェント・プロ（課金）にアップグレードしました！マスターレベルが解放されました！");
  };

  const handleWatchAd = () => {
    if (isAdPlaying) return;
    setIsAdPlaying(true);

    setTimeout(() => {
      setIsAdPlaying(false);
      const nextCount = adWatchCount + 1;
      setAdWatchCount(nextCount);
      localStorage.setItem("scam_ads", String(nextCount));

      if (nextCount >= 2) {
        alert("📺 広告を2回視聴しました！マスターレベルへのアクセス権が解放されました！");
      } else {
        alert(`📺 広告視聴完了（1/2回）。あと1回視聴するとマスターレベルが解放されます！`);
      }
    }, 2000);
  };

  const handleSelectContact = (contact: Contact) => {
    if (isLoading) return;
    setActiveContactId(contact.id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    const currentMessages = chatHistories[activeContactId] || [];
    const updatedMessages = [...currentMessages, { sender: "player", text: userMessage }];

    setChatHistories((prev) => ({
      ...prev,
      [activeContactId]: updatedMessages,
    }));
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, nickname, contactId: activeContactId }),
      });

      const data = await response.json();

      if (data.reply) {
        const aiReply = data.reply;
        setChatHistories((prev) => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), { sender: "scammer", text: aiReply }],
        }));

        setContacts((prevContacts) => {
          return prevContacts.map((c) => {
            if (c.id === activeContactId && !c.cleared) {
              const updatedMissions = c.missions.map((m) => {
                if (!m.found) {
                  if (
                    aiReply.includes("株式会社") || aiReply.includes("合同会社") || aiReply.includes("口座") ||
                    aiReply.includes("銀行") || aiReply.includes("LINE") || aiReply.includes("ID") ||
                    aiReply.includes("ビットコイン") || aiReply.includes("送金") || aiReply.includes("ファンド") ||
                    aiReply.includes("オフィス") || aiReply.includes("目的") || aiReply.includes("東京") || aiReply.includes("シンジケート")
                  ) {
                    return { ...m, found: true };
                  }
                }
                return m;
              });

              const allMissionsFound = updatedMissions.length > 0 && updatedMissions.every((m) => m.found);

              return {
                ...c,
                missions: updatedMissions,
                cleared: allMissionsFound,
              };
            }
            return c;
          });
        });

      } else {
        setChatHistories((prev) => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), { sender: "scammer", text: "……（返答がありません）" }],
        }));
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistories((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), { sender: "scammer", text: "……（回線が不安定です）" }],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const clearedScamCount = contacts.filter((c) => c.cleared).length;
  const hardClearedCount = contacts.filter((c) => c.dangerLevel === "hard" && c.cleared).length;
  const totalHardCount = contacts.filter((c) => c.dangerLevel === "hard").length;

  const isMasterUnlocked = isPremium || adWatchCount >= 2;
  const canUnlockMaster = hardClearedCount >= totalHardCount;

  let nextLevelText = "";
  if (clearedScamCount < 4) {
    nextLevelText = `中レベルまであと ${4 - clearedScamCount} 件`;
  } else if (clearedScamCount < 8) {
    nextLevelText = `強レベルまであと ${8 - clearedScamCount} 件`;
  } else if (!canUnlockMaster) {
    nextLevelText = `強ステージをすべてクリア`;
  } else if (!isMasterUnlocked) {
    nextLevelText = `マスター解放：課金or広告`;
  } else {
    nextLevelText = `マスターレベル進行中！`;
  }

  const availablePool = contacts.filter((c) => {
    if (c.dangerLevel === "easy") return true;
    if (c.dangerLevel === "medium" && clearedScamCount >= 4) return true;
    if (c.dangerLevel === "hard" && clearedScamCount >= 8) return true;
    if (c.dangerLevel === "master" && canUnlockMaster && isMasterUnlocked) return true;
    return false;
  });

  const visibleContacts = availablePool.filter((c) => !c.cleared).slice(0, 3);

  useEffect(() => {
    if (visibleContacts.length > 0 && !visibleContacts.some((c) => c.id === activeContactId)) {
      setActiveContactId(visibleContacts[0].id);
    }
  }, [visibleContacts, activeContactId]);

  const activeContact = contacts.find((c) => c.id === activeContactId) || visibleContacts[0] || contacts[0];
  const currentMessages = chatHistories[activeContactId] || [];
  const allScamsCleared = contacts.every((c) => c.cleared);
  const clearedContactsList = contacts.filter((c) => c.cleared);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100 relative">
      
      {/* 広告中の演出 */}
      {isAdPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-center p-6 font-mono">
          <div className="text-pink-500 text-xl font-bold mb-4 animate-bounce">📺 スポンサー広告再生中... (模擬)</div>
          <p className="text-gray-400 text-sm mb-6">「極秘エージェント専用装備が今だけ20%OFF！」</p>
          <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-pink-600 animate-pulse w-full"></div>
          </div>
        </div>
      )}

      {/* 摘発ファイル詳細アーカイブモーダル */}
      <ArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        clearedContacts={clearedContactsList}
      />

      <div className="flex h-screen w-screen bg-gray-950 text-gray-100 overflow-hidden">
        {allScamsCleared ? (
          <div className="flex flex-col items-center justify-center w-full bg-black text-green-400 font-mono p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-green-300">🎉 全ての詐欺グループの摘発に成功！</h1>
            <p className="text-sm text-gray-300 max-w-md mb-8">
              お見事、エージェント <span className="text-white font-bold">{nickname}</span>！<br />
              すべてのターゲットから証拠を暴き、組織を壊滅させることに成功しました。
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/");
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded cursor-pointer"
            >
              最初からもう一度プレイする
            </button>
          </div>
        ) : (
          <>
            {/* 左側ダッシュボード */}
            <div className="w-1/3 border-r border-gray-800 p-6 flex flex-col justify-between bg-gray-900/50 overflow-y-auto">
              <div>
                <div className="text-xs text-pink-500 font-bold mb-1">CYBER INVESTIGATION</div>
                <h2 className="text-xl font-bold mb-4">サイバー潜入捜査ダッシュボード</h2>
                
                <div 
                  onClick={() => setShowArchiveModal(true)}
                  className="bg-gray-900 border border-gray-800 hover:border-pink-500/60 rounded-lg p-3 mb-4 text-xs space-y-2 cursor-pointer transition shadow-lg group"
                >
                  <div className="text-gray-400 font-semibold mb-1 flex justify-between items-center">
                    <span>👤 潜入エージェント情報</span>
                    <span className="text-[10px] text-pink-400 group-hover:underline">📂 事件ファイルを開く ＞</span>
                  </div>
                  <div>名前: <span className="text-white font-bold">{nickname}</span></div>
                  <div>メール: <span className="text-gray-300">{email}</span></div>
                  <div className="pt-1 border-t border-gray-800 flex justify-between items-center">
                    <span className="text-gray-300">摘発完了: <span className="text-green-400 font-bold">{clearedScamCount} / {contacts.length}</span></span>
                    <span className="text-[10px] text-pink-400 font-bold bg-pink-950/60 px-2 py-0.5 rounded border border-pink-900">
                      {nextLevelText}
                    </span>
                  </div>
                </div>

                {canUnlockMaster && !isMasterUnlocked && (
                  <div className="mb-4 bg-yellow-950/20 border border-yellow-800/60 p-3 rounded-lg">
                    <div className="text-yellow-400 font-bold mb-1.5 text-xs">⭐ 最凶マスターレベル解放！</div>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePurchasePremium}
                        className="flex-1 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded text-xs cursor-pointer shadow"
                      >
                        💎 課金で解放
                      </button>
                      <button
                        onClick={handleWatchAd}
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs cursor-pointer shadow"
                      >
                        📺 広告 ({adWatchCount}/2)
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">📋 ターゲット指令</h3>
                  <div className="text-[11px] text-pink-400 mb-3 truncate">対象: {activeContact?.name}</div>
                  
                  <ul className="space-y-2 text-sm">
                    {activeContact?.missions.map((m) => (
                      <li key={m.id} className="flex items-center space-x-2">
                        <span className={m.found ? "text-green-400" : "text-gray-600"}>{m.found ? "[✔]" : "[ ]"}</span>
                        <span className={m.found ? "text-gray-200 line-through text-xs" : "text-gray-400 text-xs"}>{m.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
                  <h3 className="text-xs font-semibold text-gray-400 mb-3 flex items-center justify-between">
                    <span>📥 受信トレイ（要警戒メール）</span>
                    {isLoading && <span className="text-[10px] text-yellow-500 animate-pulse">ロック中</span>}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {visibleContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => handleSelectContact(contact)}
                        className={`p-2.5 rounded border transition relative ${
                          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-700"
                        } ${
                          activeContactId === contact.id
                            ? "bg-pink-950/40 border-pink-500 text-white"
                            : "bg-gray-950/60 border-gray-800 text-gray-400"
                        }`}
                      >
                        <div className="flex justify-between mb-0.5">
                          <span className="font-bold text-gray-200">{contact.name}</span>
                          <span className="text-[10px] text-gray-500">{contact.lastTime}</span>
                        </div>
                        <div className="font-semibold text-gray-300 truncate text-[11px]">{contact.subject}</div>
                        <div className="text-gray-500 truncate text-[10px]">{contact.preview}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex justify-between items-center pt-2">
                <span>Status: 潜入捜査中</span>
                <button 
                  onClick={() => {
                    if (isLoading) return;
                    localStorage.clear();
                    router.push("/");
                  }}
                  className="text-red-400 hover:underline cursor-pointer text-[10px]"
                >
                  データをリセット
                </button>
              </div>
            </div>

            {/* 右側チャット画面 */}
            <div className="w-2/3 flex flex-col justify-between bg-gray-950">
              <div className="p-4 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-pink-400">{activeContact?.name}</span>
                  <span className="ml-2 text-xs text-gray-500">（{activeContact?.role}）</span>
                </div>
                <div className="text-xs px-2 py-1 rounded border bg-red-950 text-red-400 border-red-800">
                  {activeContact?.danger}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "player" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md p-3 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.sender === "player"
                        ? "bg-pink-600 text-white rounded-br-none"
                        : "bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-900 border border-gray-800 text-gray-400 p-3 rounded-lg text-sm animate-pulse">
                      相手が入力中...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-800 bg-gray-900/30 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "相手からの返信を待っています..." : `${activeContact?.name}への返信を入力...`}
                  disabled={isLoading}
                  className="flex-1 p-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-pink-500 focus:outline-none text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-pink-600 hover:bg-pink-500 font-bold rounded text-sm transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  送信
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}