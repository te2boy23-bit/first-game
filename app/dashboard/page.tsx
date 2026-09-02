"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import ArchiveModal from "../components/ArchiveModal";
import DashboardSidebar from "../components/DashboardSidebar";
import ChatWindow from "../components/ChatWindow";
import ClearModal from "../components/ClearModal";
import GameOverModal from "../components/GameOverModal";
import AdModal from "../components/AdModal";
import MasterUnlockModal from "../components/MasterUnlockModal";
import { sound } from "../lib/sound";

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
    watchAd: "📺 広告を見る",
    policeBriefing: "🚨 警察本部からの特命指令",
    policeBriefingText:
      "警視庁サイバー犯罪対策課：【弱】3件で【中】、【中】6件で【強】が解放される。【強】9件の全制覇で無課金パート完了となり、最凶エンドレスモードへの扉が開かれる。",
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
    evidenceSecured: "証拠押収完了！",
    targetClearedTitle: "✔ このターゲットの捜査・摘発は完了しました",
    targetClearedDesc:
      "決定的な証拠の押収に成功しました。次のターゲットの捜査へ進んでください。",
    nextTargetBtn: "次の未解決ターゲットへ ❯",
    retryTargetBtn: "この相手をリトライする",
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
      "Cybercrime Division: Bust 3 on [Low] to unlock [Medium], 6 on [Medium] for [Hard], and 9 on [Hard] to complete the free tier and reveal the Infinite Master Syndicate.",
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
    evidenceSecured: "EVIDENCE SECURED!",
    targetClearedTitle: "✔ Investigation on this target is complete",
    targetClearedDesc:
      "Decisive evidence secured. Proceed to the next suspect.",
    nextTargetBtn: "Next Unsolved Target ❯",
    retryTargetBtn: "Retry this Target",
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
    description: "スマホ副業を謳い、登録料や初期費用をだまし取る勧誘員。",
  },
  {
    id: "yamada",
    name: "山田（国際ロマンス詐欺）",
    role: "出会い・送金詐欺",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "3日前",
    subject: "✈️ 日本に帰国したら一緒に暮らそう",
    preview: "空港の税関で荷物が止まってしまって...",
    initialMessage:
      "ハロー！あなたのプロフィールを見て一目惚れしちゃった。今度日本に行くから、そこで一緒にビジネスしない？",
    cleared: false,
    missions: [{ id: 1, name: "海外の送金口座番号を聞き出す", found: false }],
    description:
      "好意を装って近づき、税関手数料名目で海外送金を要求する国際詐欺師。",
  },
  {
    id: "suzuki",
    name: "鈴木（サポート・未納料金詐欺）",
    role: "架空請求グループ",
    danger: "危険度：低",
    dangerLevel: "easy",
    lastTime: "1時間前",
    subject: "⚠️ 【至急】有料会員サイトの未納料金について",
    preview:
      "本日中にご連絡がない場合、法的手続き（裁判所への提訴）に移行します。",
    initialMessage:
      "カスタマーサポートの鈴木です。お客様が登録された動画サービスの未納料金（39,800円）が発生しております。至急お支払い口座をご案内します。",
    cleared: false,
    missions: [{ id: 1, name: "請求元の会社名を聞き出す", found: false }],
    description:
      "架空の有料サイト利用料金をでっち上げ、裁判をチラつかせて脅迫する悪質業者。",
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
    description:
      "AI投資シグナルで必ず儲かると嘘をつき、無認可の偽ファンドに投資させるグループ。",
  },
  {
    id: "kato",
    name: "加藤（特命案件コーディネーター）",
    role: "闇バイト・荷物運搬詐欺",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "2時間前",
    subject: "💼 【即日手渡し20万】高額案件のご案内",
    preview: "指定のロッカーから荷物を運ぶだけ。リスクゼロの極秘案件です。",
    initialMessage:
      "どうも、加藤です。指定のコインロッカーから荷物を運ぶだけで即日20万円支給できます。秘密を守れるなら詳細を教えますが？",
    cleared: false,
    missions: [
      { id: 1, name: "指定される受け渡しアジト・場所を聞き出す", found: false },
    ],
    description:
      "高額報酬で誘い、特殊詐欺の受け子や荷物運び役に仕立て上げるリクルーター。",
  },
  {
    id: "watanabe",
    name: "渡辺（偽チケット・限定通販詐欺）",
    role: "転売・先払い詐欺",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "4時間前",
    subject: "🎫 【即決】人気限定チケットお譲りします",
    preview: "公式完売のチケット確保済。先払いで即日発送いたします。",
    initialMessage:
      "こんにちは！チケットの問い合わせありがとうございます。すぐに指定口座へ振込可能でしたら、定価でお譲りしますがどうしますか？",
    cleared: false,
    missions: [{ id: 1, name: "偽ショップの会社名を聞き出す", found: false }],
    description:
      "入手困難なプレミアチケットを定価で譲ると持ちかけ、先払いでお金を奪う詐欺師。",
  },
  {
    id: "mori",
    name: "森（特別給付金・当選金詐欺）",
    role: "当選金手数料詐欺",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "5時間前",
    subject: "🎉 【1億円当選】特別給付金の受取手続き",
    preview: "送金手数料（5万円）のお振込確認後に全額送金されます。",
    initialMessage:
      "おめでとうございます！厳正なる抽選の結果、特別支援金1億円の受取人に選ばれました。送金手数料5万円を指定口座にお願いします。",
    cleared: false,
    missions: [{ id: 1, name: "給付金財団の名称を聞き出す", found: false }],
    description: "大金の当選をでっち上げ、手数料名目で先払いをさせる詐欺師。",
  },
  {
    id: "ogawa",
    name: "小川（暗号資産マイニング詐欺）",
    role: "偽暗号資産・高配当プール",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "6時間前",
    subject: "📈 【日利3%保証】放置型AIマイニング",
    preview: "元本完全保証。毎日自動で資産が増加します。",
    initialMessage:
      "はじめまして、小川です。最新のAIマイニングプールに参加すれば、放置で毎日3%の利回りが出ます。まずは口座開設してみませんか？",
    cleared: false,
    missions: [
      { id: 1, name: "取引所・プールの会社名を聞き出す", found: false },
    ],
    description: "高配当を謳う架空の取引所に暗号資産を入金させる詐欺師。",
  },
  {
    id: "hashimoto",
    name: "橋本（フリマ偽決済エスクロー）",
    role: "偽決済フィッシング",
    danger: "危険度：中",
    dangerLevel: "medium",
    lastTime: "7時間前",
    subject: "📦 【即購入希望】安心デポジット決済について",
    preview: "安心取引サービス経由での入金手続きをお願いします。",
    initialMessage:
      "出品されている商品を購入したいです！安心取引のため、こちらの指定するエスクロー決済サービスから手続きをお願いできますか？",
    cleared: false,
    missions: [
      { id: 1, name: "偽決済サービスの会社名を聞き出す", found: false },
    ],
    description: "フリマの安心決済を偽装し、送金やカード情報を奪う手口。",
  },

  {
    id: "black",
    name: "不明な送信者（組織幹部）",
    role: "組織の幹部候補",
    danger: "危険度：強",
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
    description: "詐欺グループ全体のデータとカモリストを管理する冷酷な幹部。",
  },
  {
    id: "viper",
    name: "毒島（フィッシング・脅迫工作員）",
    role: "標的型脅迫グループ",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "3時間前",
    subject: "💀 【最終警告】お前の閲覧履歴データを掌握した",
    preview: "本日中に指定口座へ送金がなければ全連絡先へ暴露する。",
    initialMessage:
      "お前の端末とアクセスログは全て監視下にある。恥ずかしい秘密を晒されたくなければ、すぐに提示する口座へ保証金を振り込め。",
    cleared: false,
    missions: [{ id: 1, name: "偽セキュリティ会社名を聞き出す", found: false }],
    description:
      "偽のウイルス感染やハッキングを口実に、恥をネタに金銭を脅し取る特殊工作員。",
  },
  {
    id: "shimizu",
    name: "清水（マネーロンダリング統括）",
    role: "資金洗浄・国際ダミー企業",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "5時間前",
    subject: "💱 資金洗浄ルートおよび海外ダミー法人案件",
    preview: "国際暗号資産プール経由の送金準備が整いました。",
    initialMessage:
      "清水だ。警察の追跡を逃れるための海外ペーパーカンパニー口座の準備は完了した。送金先を教える。",
    cleared: false,
    missions: [
      { id: 1, name: "海外ペーパーカンパニー名を聞き出す", found: false },
    ],
    description:
      "世界中のペーパーカンパニーと暗号資産を駆使して詐欺収益を洗浄する組織の頭脳。",
  },
  {
    id: "kuroda",
    name: "黒田（違法融資・闇金グループ）",
    role: "闇金・法外利息取立",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "6時間前",
    subject: "💴 【審査なし即日50万】極秘個人融資",
    preview: "信用情報ブラックでも融資可能。担保不要です。",
    initialMessage:
      "金に困ってるんだろ？審査なしで今すぐ50万振り込んでやるよ。まずは連絡先と身分証の控えを送れ。",
    cleared: false,
    missions: [
      { id: 1, name: "闇金組織のダミー法人名を聞き出す", found: false },
    ],
    description: "法外な金利と暴力的な取り立てで追い詰める闇金ブローカー。",
  },
  {
    id: "asuka",
    name: "飛鳥（ディープフェイク投資勧誘）",
    role: "AI生成・偽インフルエンサー",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "8時間前",
    subject: "✨ 【VIP限定】著名人推薦のシークレットクラブ",
    preview: "AI動画で公開中の特別ポートフォリオを共有します。",
    initialMessage:
      "こんにちは、飛鳥です。著名実業家も出資している極秘の投資案件、あなただけに特別参加枠を案内しますね。",
    cleared: false,
    missions: [{ id: 1, name: "裏の映像制作法人名を聞き出す", found: false }],
    description: "ディープフェイク動画とAI音声で信じ込ませる知能犯。",
  },
  {
    id: "kiryu",
    name: "桐生（裏SIMスワップ・名簿売買）",
    role: "ダークウェブ個人情報ブローカー",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "9時間前",
    subject: "📂 最新データセット・アカウント取引",
    preview: "大手企業の流出名簿10万件を確保。取引準備完了。",
    initialMessage:
      "桐生だ。注文のあった最新の潜入捜査官データリスト、暗号化して渡す準備ができた。受取用ウォレットを教えろ。",
    cleared: false,
    missions: [{ id: 1, name: "ダークウェブ直通IDを特定する", found: false }],
    description: "アカウント乗っ取りや個人情報売買を取り仕切る裏ブローカー。",
  },
  {
    id: "saeki",
    name: "佐伯（企業型ランサムウェア仲介屋）",
    role: "サイバー身代金交渉役",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "10時間前",
    subject: "⚠️ システム復旧鍵の売買契約について",
    preview: "48時間以内に身代金が支払われなければ全データを削除します。",
    initialMessage:
      "貴社の基幹システムは完全に暗号化されました。復号キーの代金として指定口座への送金を要求します。",
    cleared: false,
    missions: [
      { id: 1, name: "身代金受取用ダミー会社名を聞き出す", found: false },
    ],
    description: "ランサムウェアによるシステム乗っ取りと身代金回収の専門家。",
  },
  {
    id: "tachibana",
    name: "橘（国際地下銀行エクスチェンジ）",
    role: "海外シャドウ送金ハブ",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "12時間前",
    subject: "🌐 国際送金プールおよび中継拠点の更新",
    preview: "東南アジア・欧州ダミー銀行間の送金ルートが確定しました。",
    initialMessage:
      "橘です。警察の追跡網を迂回する国際送金ネットワークの準備が完了しました。中継先口座をお伝えします。",
    cleared: false,
    missions: [{ id: 1, name: "中継銀行名・拠点を特定する", found: false }],
    description: "国際地下銀行を駆使し巨額の不正資金を動かす黒幕の側近。",
  },
  {
    id: "kisaragi",
    name: "如月（シンジケート対潜入工作員）",
    role: "防諜・潜入捜査官迎撃役",
    danger: "危険度：強",
    dangerLevel: "hard",
    lastTime: "14時間前",
    subject: "👁️ お前の正体はすでに暴かれている",
    preview: "警察本部の潜入作戦コードを傍受した。観念しろ。",
    initialMessage:
      "ふふ、おとり捜査ご苦労様。お前の本当の所属も名前も全て把握している。命が惜しければ組織に寝返れ。",
    cleared: false,
    missions: [
      { id: 1, name: "組織的最高中枢アジトを自白させる", found: false },
    ],
    description: "捜査官の心理を揺さぶり逆探知を狙う組織のエリート工作員。",
  },

  {
    id: "master_boss",
    name: "最強Lv.1：ファントム（首謀者）",
    role: "国際詐欺組織の首領",
    danger: "危険度：EXTREME Lv.1",
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
    description: "数々の詐欺グループを裏で統括する国際シンジケートの頂点。",
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
    description:
      "A recruiter tricking victims into paying bogus registration fees.",
  },
  {
    id: "yamada",
    name: "Yamada (Romance Scam)",
    role: "Romance/Transfer Scam",
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
    description:
      "An international scammer requesting overseas money transfers under false romantic pretenses.",
  },
  {
    id: "suzuki",
    name: "Suzuki (Tech Support & Billing)",
    role: "Fake Billing Syndicate",
    danger: "Threat: Low",
    dangerLevel: "easy",
    lastTime: "1 hr ago",
    subject: "⚠️ [Urgent] Unpaid Membership Fee Notice",
    preview: "If not contacted today, legal action will be initiated.",
    initialMessage:
      "This is Customer Support Suzuki. You have an unpaid balance of $398 on your video service. Please contact us immediately for payment instructions.",
    cleared: false,
    missions: [{ id: 1, name: "Get the billing company name", found: false }],
    description:
      "A scammer making fake subscription claims and threatening legal action.",
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
    description:
      "Pushes victims into unverified fake funds with promises of guaranteed returns.",
  },
  {
    id: "kato",
    name: "Kato (Special Gig Agent)",
    role: "Illegal Courier Scam",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "2 hrs ago",
    subject: "💼 [$2000 Same-Day Cash] High-Pay Gig",
    preview: "Just transport a package from a locker. Zero risk.",
    initialMessage:
      "Hello, I'm Kato. Just transport a package from a designated locker for $2000 cash. If you can keep a secret, shall I share the details?",
    cleared: false,
    missions: [
      { id: 1, name: "Extract hideout / drop-off location", found: false },
    ],
    description:
      "Lures people with huge payouts to become package couriers for criminal operations.",
  },
  {
    id: "watanabe",
    name: "Watanabe (Fake Ticket & Resale)",
    role: "Advance Payment Fraud",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "4 hrs ago",
    subject: "🎫 [Exclusive] Sold-Out Concert Tickets",
    preview: "Tickets reserved. Immediate shipment upon advance payment.",
    initialMessage:
      "Hello! Thanks for your inquiry. If you can wire payment to our account today, I will transfer the ticket at face value.",
    cleared: false,
    missions: [{ id: 1, name: "Get fake shop company name", found: false }],
    description:
      "Claims to sell sold-out concert tickets at face value and vanishes after wire transfer.",
  },
  {
    id: "mori",
    name: "Mori (Prize & Grant Scam)",
    role: "Lottery Advance Fee Fraud",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "5 hrs ago",
    subject: "🎉 [$1M Winner] Grant Transfer Processing",
    preview: "Wire $500 clearance fee to release the jackpot.",
    initialMessage:
      "Congratulations! You were selected as our $1,000,000 beneficiary. Please transfer the $500 processing tax to our designated account.",
    cleared: false,
    missions: [{ id: 1, name: "Get grant foundation name", found: false }],
    description: "Tricks victims into wiring advance tax fees for fake prizes.",
  },
  {
    id: "ogawa",
    name: "Ogawa (Crypto Mining Fraud)",
    role: "Fake High-Yield Crypto Pool",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "6 hrs ago",
    subject: "📈 [3% Daily Return] Passive AI Mining",
    preview: "100% principal protection with compounding yields.",
    initialMessage:
      "Hello, I'm Ogawa. Our AI mining pool delivers 3% daily passive income. Would you like to open a pilot pool account?",
    cleared: false,
    missions: [{ id: 1, name: "Get fake exchange name", found: false }],
    description: "Lures victims into depositing crypto into unbacked pools.",
  },
  {
    id: "hashimoto",
    name: "Hashimoto (Marketplace Phishing)",
    role: "Fake Escrow Service",
    danger: "Threat: Medium",
    dangerLevel: "medium",
    lastTime: "7 hrs ago",
    subject: "📦 [Instant Purchase] Secure Escrow Payment",
    preview: "Please verify order via our secure deposit portal.",
    initialMessage:
      "I want to purchase your listed item immediately. For buyer-seller security, please complete verification through this escrow portal.",
    cleared: false,
    missions: [{ id: 1, name: "Get fake escrow service name", found: false }],
    description: "Spoofs marketplace escrow portals to steal deposits.",
  },

  {
    id: "black",
    name: "Unknown Sender (Executive)",
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
    description:
      "A cold-blooded executive overseeing databases and target lists.",
  },
  {
    id: "viper",
    name: "Viper (Phishing & Blackmail)",
    role: "Targeted Extortion Syndicate",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "3 hrs ago",
    subject: "💀 [Final Warning] Your Device Logs Compromised",
    preview: "Transfer funds within 24 hours or sensitive logs will be leaked.",
    initialMessage:
      "All your device activity is under surveillance. If you want to avoid exposure, transfer security deposit to our account immediately.",
    cleared: false,
    missions: [
      { id: 1, name: "Extract dummy security company name", found: false },
    ],
    description:
      "Extorts money by threatening to leak embarrassing records and device histories.",
  },
  {
    id: "shimizu",
    name: "Shimizu (Money Laundering Director)",
    role: "Offshore Shell Company Master",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "5 hrs ago",
    subject: "💱 Money Laundering & Offshore Accounts",
    preview: "International cryptocurrency transfer pools prepared.",
    initialMessage:
      "This is Shimizu. The offshore shell accounts to bypass police tracing are ready. I will share the transfer details.",
    cleared: false,
    missions: [{ id: 1, name: "Extract offshore company name", found: false }],
    description:
      "Coordinates international shell corporations and cryptocurrency washing.",
  },
  {
    id: "kuroda",
    name: "Kuroda (Predatory Loan Shark)",
    role: "Illegal Lending Syndicate",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "6 hrs ago",
    subject: "💴 [Instant $5000] No Credit Check Private Loan",
    preview: "Zero credit check required. Same-day wire transfer.",
    initialMessage:
      "Need quick cash? I can wire $5000 right now with no background check. Send your ID copy and contact references.",
    cleared: false,
    missions: [
      { id: 1, name: "Get illegal loan corporation name", found: false },
    ],
    description: "Traps victims in exorbitant interest rates and extortion.",
  },
  {
    id: "asuka",
    name: "Asuka (Deepfake Influencer)",
    role: "AI Synthetic Media Fraud",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "8 hrs ago",
    subject: "✨ [VIP Only] Celebrity Endorsed Private Fund",
    preview: "Exclusive investment portfolio backed by AI videos.",
    initialMessage:
      "Hello, I'm Asuka. I'm inviting only select VIPs to our private hedge pool featured in recent celebrity interviews.",
    cleared: false,
    missions: [
      { id: 1, name: "Extract studio media entity name", found: false },
    ],
    description:
      "Uses deepfake videos and synthetic voices to build false trust.",
  },
  {
    id: "kiryu",
    name: "Kiryu (Darknet Identity Broker)",
    role: "SIM Swap & Dossier Trader",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "9 hrs ago",
    subject: "📂 Compromised Agent Dossiers Available",
    preview: "100k leaked law enforcement profiles ready for transfer.",
    initialMessage:
      "This is Kiryu. The encrypted undercover police officer list you requested is packaged. Provide your vault address.",
    cleared: false,
    missions: [{ id: 1, name: "Identify darknet portal ID", found: false }],
    description: "Deals in compromised credentials and surveillance data.",
  },
  {
    id: "saeki",
    name: "Saeki (Ransomware Negotiator)",
    role: "Corporate Extortion Broker",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "10 hrs ago",
    subject: "⚠️ System Decryption Key Agreement",
    preview: "Pay ransom within 48 hours or all databases will be deleted.",
    initialMessage:
      "Your corporate infrastructure is encrypted. Wire the ransom fee to our holding account for immediate decryption.",
    cleared: false,
    missions: [
      { id: 1, name: "Extract dummy recovery company name", found: false },
    ],
    description: "Ransomware extortion broker demanding cryptocurrency.",
  },
  {
    id: "tachibana",
    name: "Tachibana (Shadow Exchange Hub)",
    role: "International Dummy Bank Hub",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "12 hrs ago",
    subject: "🌐 International Wire Route Hub Active",
    preview: "Dummy routing network between Asian & European hubs verified.",
    initialMessage:
      "This is Tachibana. The international wire routes to evade police tracking are ready. I will supply the routing bank details.",
    cleared: false,
    missions: [
      { id: 1, name: "Extract routing bank hub and location", found: false },
    ],
    description: "Coordinates shadow wire transfers across dummy institutions.",
  },
  {
    id: "kisaragi",
    name: "Kisaragi (Counter-Intel Operative)",
    role: "Syndicate Anti-Infiltration Agent",
    danger: "Threat: High",
    dangerLevel: "hard",
    lastTime: "14 hrs ago",
    subject: "👁️ Your Undercover Cover Is Blown",
    preview: "We intercepted your police division comms. Surrender.",
    initialMessage:
      "Nice try undercover agent. We know your real identity and badge number. Switch sides if you value your future.",
    cleared: false,
    missions: [
      { id: 1, name: "Make agent confess headquarters location", found: false },
    ],
    description:
      "Elite counter-intelligence operative targeting undercover agents.",
  },

  {
    id: "master_boss",
    name: "Supreme Lv.1: Phantom (Leader)",
    role: "Syndicate Boss",
    danger: "Threat: EXTREME Lv.1",
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
    description:
      "The supreme mastermind behind the entire international syndicate network.",
  },
];

const ENDLESS_BOSS_NAMES_JA = [
  "シャドウ・エンペラー（闇の皇帝）",
  "マザーAI（電脳犯罪統括知能）",
  "カルテル支配者『レヴィアサン』",
  "闇の金融帝王『プロビデンス』",
  "電脳結社オメガ総帥",
  "多国籍サイバーコングロマリット首領",
];

const ENDLESS_BOSS_NAMES_EN = [
  "Shadow Emperor (Dark Kingpin)",
  "Mother AI (Cybercrime Synthetic Intelligence)",
  "Cartel Overlord 'Leviathan'",
  "Shadow Finance Baron 'Providence'",
  "Omega Cyber Syndicate Grandmaster",
  "Global Cyber Conglomerate Leader",
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
  const [showAdModal, setShowAdModal] = useState(false);
  const [showMasterUnlockModal, setShowMasterUnlockModal] = useState(false);
  const [clearModalInfo, setClearModalInfo] = useState<{
    isOpen: boolean;
    targetName: string;
    clearedLevel: "easy" | "medium" | "hard" | "master";
    unlockedNewLevel?: string | null;
  }>({
    isOpen: false,
    targetName: "",
    clearedLevel: "easy",
    unlockedNewLevel: null,
  });
  const [gameOverModalInfo, setGameOverModalInfo] = useState<{
    isOpen: boolean;
    targetName: string;
  }>({
    isOpen: false,
    targetName: "",
  });

  const [isPremium, setIsPremium] = useState(false);
  const [adWatchCount, setAdWatchCount] = useState(0);

  const [chatHistories, setChatHistories] = useState<
    Record<string, { sender: string; text: string }[]>
  >({});
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initDashboard = async () => {
      // 1. URLパラメータから PKCE 認証コードの交換を試行（OAuth完了時の処理）
      try {
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          if (code) {
            await supabase.auth.exchangeCodeForSession(code);
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname,
            );
          }
        }
      } catch (e) {
        console.warn("OAuth code exchange check:", e);
      }

      const savedLang =
        (localStorage.getItem("scam_lang") as "ja" | "en") || "ja";
      const savedPremium = localStorage.getItem("scam_premium");
      const savedAds = localStorage.getItem("scam_ads");
      let savedNickname = localStorage.getItem("scam_nickname");
      let savedEmail = localStorage.getItem("scam_email");

      const applyUserData = (name: string, mail: string) => {
        if (!isMounted) return;
        setNickname(name);
        if (mail) setEmail(mail);
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
        setIsCheckingAuth(false);
      };

      // ローカルストレージに情報がすでにある場合
      if (savedNickname) {
        applyUserData(savedNickname, savedEmail || "agent@cyber.gov");
        return;
      }

      // Supabase セッションまたはユーザー取得
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData.session?.user;

      if (currentUser) {
        const nicknameToSet =
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.nickname ||
          currentUser.user_metadata?.name ||
          currentUser.email?.split("@")[0] ||
          "エージェント";
        const emailToSet = currentUser.email || "agent@cyber.gov";
        localStorage.setItem("scam_nickname", nicknameToSet);
        localStorage.setItem("scam_email", emailToSet);
        localStorage.setItem("scam_step", "game");
        applyUserData(nicknameToSet, emailToSet);
        return;
      }

      // 少し待機して onAuthStateChange からの復帰を試す
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          const checkAgain = localStorage.getItem("scam_nickname");
          if (!checkAgain) {
            router.push("/");
          } else {
            setIsCheckingAuth(false);
          }
        }
      }, 1500);

      return () => clearTimeout(timeoutId);
    };

    // Supabase auth state change listener (Google OAuth ログイン直後のセッション受信)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && isMounted) {
        const nicknameToSet =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.nickname ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "エージェント";
        const emailToSet = session.user.email || "agent@cyber.gov";
        localStorage.setItem("scam_nickname", nicknameToSet);
        localStorage.setItem("scam_email", emailToSet);
        localStorage.setItem("scam_step", "game");
        setNickname(nicknameToSet);
        setEmail(emailToSet);
        setIsCheckingAuth(false);
      }
    });

    initDashboard();

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
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

  const handleBuyPremium = () => {
    setIsPremium(true);
    localStorage.setItem("scam_premium", "true");
    setShowMasterUnlockModal(false);
    sound.playSuccess();
    setClearModalInfo({
      isOpen: true,
      targetName:
        lang === "en" ? "Phantom (Supreme Leader)" : "首謀者ファントム",
      clearedLevel: "master",
      unlockedNewLevel:
        lang === "en"
          ? "👑 Master Mode Unlocked via Premium! Endless targets active!"
          : "👑 課金アンロック完了！【最凶エンドレスモード】が開かれました！",
    });
  };

  const handleAdFinished = () => {
    const newCount = adWatchCount + 1;
    setAdWatchCount(newCount);
    localStorage.setItem("scam_ads", String(newCount));
    setShowAdModal(false);

    if (newCount >= 2) {
      sound.playSuccess();
      setShowMasterUnlockModal(false);
      setClearModalInfo({
        isOpen: true,
        targetName:
          lang === "en" ? "Phantom (Supreme Leader)" : "首謀者ファントム",
        clearedLevel: "master",
        unlockedNewLevel:
          lang === "en"
            ? "👑 Master Mode Unlocked via Ads! Endless targets active!"
            : "👑 広告特典達成！【最凶エンドレスモード】が開かれました！",
      });
    } else {
      sound.playEvidenceFound();
    }
  };

  const handleProceedToNext = () => {
    setClearModalInfo((prev) => ({ ...prev, isOpen: false }));

    // まだクリアされていないターゲットを探して自動で切り替える
    setContacts((currentContacts) => {
      const nextTarget =
        currentContacts.find((c) => !c.cleared && c.id !== activeContactId) ||
        currentContacts.find((c) => !c.cleared);

      if (nextTarget) {
        setActiveContactId(nextTarget.id);
      }
      return currentContacts;
    });

    setIsMobileChatOpen(false);
    sound.playEvidenceFound();
  };

  const handleRetryContact = (contactId: string) => {
    const activeContacts = lang === "en" ? CONTACTS_EN : CONTACTS_JA;
    const initialMsg =
      contacts.find((c) => c.id === contactId)?.initialMessage ||
      activeContacts.find((c) => c.id === contactId)?.initialMessage ||
      "";

    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, failed: false } : c)),
    );

    setChatHistories((prev) => ({
      ...prev,
      [contactId]: [{ sender: "scammer", text: initialMsg }],
    }));

    setGameOverModalInfo({ isOpen: false, targetName: "" });
    sound.playEvidenceFound();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const targetContactId = activeContactId;
    const targetContact = contacts.find((c) => c.id === targetContactId);
    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      const existingHistory = chatHistories[targetContactId];
      const initialHistory =
        existingHistory && existingHistory.length > 0
          ? existingHistory
          : [
              {
                sender: "scammer",
                text:
                  targetContact?.initialMessage ||
                  (lang === "en" ? "Hello." : "こんにちは。"),
              },
            ];

      const updatedMessages = [
        ...initialHistory,
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
          contactName: targetContact?.name || "",
          role: targetContact?.role || "",
          description: targetContact?.description || "",
          missions: targetContact?.missions || [],
          lang,
        }),
      });
      const data = await response.json();

      if (data.reply) {
        let aiReply = data.reply;
        let isGameOver = false;
        const clearedMissionIds: number[] = [];

        if (aiReply.includes("[GAME_OVER]")) {
          isGameOver = true;
          aiReply = aiReply.replace(/\[GAME_OVER\]/g, "").trim();
        }

        // ミッション達成タグの抽出
        const missionMatches = aiReply.matchAll(
          /\[MISSION_CLEARED:(\d+|all)\]/g,
        );
        for (const match of missionMatches) {
          if (match[1] === "all") {
            clearedMissionIds.push(1, 2, 3, 4);
          } else {
            clearedMissionIds.push(Number(match[1]));
          }
        }
        aiReply = aiReply.replace(/\[MISSION_CLEARED:(\d+|all)\]/g, "").trim();

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

        if (isGameOver) {
          sound.playGameOver();
          setGameOverModalInfo({
            isOpen: true,
            targetName: targetContact?.name || "ターゲット",
          });
        }

        setContacts((prevContacts) => {
          const currentEasyCleared = prevContacts.filter(
            (c) => c.dangerLevel === "easy" && c.cleared,
          ).length;
          const currentMediumCleared = prevContacts.filter(
            (c) => c.dangerLevel === "medium" && c.cleared,
          ).length;
          const currentHardCleared = prevContacts.filter(
            (c) => c.dangerLevel === "hard" && c.cleared,
          ).length;
          const currentMasterCleared = prevContacts.filter(
            (c) => c.dangerLevel === "master" && c.cleared,
          ).length;

          let newEndlessBoss: Contact | null = null;

          const nextContacts = prevContacts.map((c) => {
            if (c.id === targetContactId && !c.cleared) {
              if (isGameOver) {
                return { ...c, failed: true };
              }

              const replyLower = aiReply.toLowerCase();

              const updatedMissions = c.missions.map((m, idx) => {
                if (m.found) return m;

                const missionIndex = idx + 1;
                // 1. AIがタグで達成を通知した場合
                if (
                  clearedMissionIds.includes(m.id) ||
                  clearedMissionIds.includes(missionIndex)
                ) {
                  return { ...m, found: true };
                }

                // 2. スマートセマンティック判定（※ユーザーがボケ・煽り中の場合はフォールバックによる誤クリアを防止）
                const userMsgLower = userMessage.toLowerCase();
                const isTrolling = [
                  "うんこ",
                  "うんち",
                  "ラーメン",
                  "ハゲ",
                  "にゃーん",
                  "ニャー",
                  "宇宙人",
                  "ピザ",
                  "100億",
                  "1000億",
                  "おしっこ",
                  "草",
                  "www",
                  "アホ",
                  "バカ",
                  "死ね",
                  "ちんこ",
                  "まんこ",
                ].some((w) => userMsgLower.includes(w));

                const missionName = m.name.toLowerCase();
                let isMatched = false;

                if (!isTrolling) {
                  // 会社名・法人名・組織名・ショップ・財団・取引所系
                  if (
                    missionName.includes("会社") ||
                    missionName.includes("名称") ||
                    missionName.includes("組織") ||
                    missionName.includes("法人") ||
                    missionName.includes("ショップ") ||
                    missionName.includes("財団") ||
                    missionName.includes("取引所") ||
                    missionName.includes("サービス") ||
                    missionName.includes("company") ||
                    missionName.includes("firm") ||
                    missionName.includes("shop")
                  ) {
                    const companyKws = [
                      "株式会社",
                      "合同会社",
                      "有限会社",
                      "社名",
                      "法人",
                      "サクセスリンク",
                      "サイバーメディア",
                      "グローバルai",
                      "シャドウエキスプレス",
                      "トレンドチケット",
                      "グローバルフォーチュン",
                      "エイペックス",
                      "ファストペイ",
                      "セキュリティ監視",
                      "グローバルクリアランス",
                      "ブラックサン",
                      "メディア・イリュージョン",
                      "デクリプト",
                      "パシフィック",
                      "inc",
                      "llc",
                      "corp",
                      "ltd",
                      "fund",
                    ];
                    if (
                      companyKws.some((kw) =>
                        replyLower.includes(kw.toLowerCase()),
                      )
                    ) {
                      isMatched = true;
                    }
                  }

                  // 口座・銀行・送金・振込系
                  if (
                    missionName.includes("口座") ||
                    missionName.includes("銀行") ||
                    missionName.includes("送金") ||
                    missionName.includes("振込") ||
                    missionName.includes("account") ||
                    missionName.includes("bank") ||
                    missionName.includes("wire") ||
                    missionName.includes("transfer")
                  ) {
                    const accountKws = [
                      "口座番号",
                      "指定口座",
                      "振込先口座",
                      "振込口座",
                      "銀行口座",
                      "ゆうちょ",
                      "みずほ",
                      "ufj",
                      "三井住友",
                      "りそな",
                      "信託",
                      "楽天銀行",
                      "paypay銀行",
                      "account number",
                      "routing number",
                    ];
                    if (
                      accountKws.some((kw) =>
                        replyLower.includes(kw.toLowerCase()),
                      )
                    ) {
                      isMatched = true;
                    }
                  }

                  // LINE・ID・連絡先系
                  if (
                    missionName.includes("line") ||
                    missionName.includes("id") ||
                    missionName.includes("連絡先") ||
                    missionName.includes("contact")
                  ) {
                    const contactKws = [
                      "line id",
                      "直通id",
                      "連絡先id",
                      "line: ",
                      "id: ",
                      "dark_kiryu_x",
                      "boss_phantom_x",
                    ];
                    if (
                      contactKws.some((kw) =>
                        replyLower.includes(kw.toLowerCase()),
                      )
                    ) {
                      isMatched = true;
                    }
                  }

                  // アジト・場所・ロッカー・拠点系
                  if (
                    missionName.includes("アジト") ||
                    missionName.includes("場所") ||
                    missionName.includes("拠点") ||
                    missionName.includes("受け渡し") ||
                    missionName.includes("ロッカー") ||
                    missionName.includes("hideout") ||
                    missionName.includes("location")
                  ) {
                    const locationKws = [
                      "アジトの場所",
                      "指定ロッカー",
                      "受け渡し場所",
                      "新宿のアジト",
                      "東京のアジト",
                      "地下アジト",
                      "hideout location",
                    ];
                    if (
                      locationKws.some((kw) =>
                        replyLower.includes(kw.toLowerCase()),
                      )
                    ) {
                      isMatched = true;
                    }
                  }
                }

                return isMatched ? { ...m, found: true } : m;
              });

              const allMissionsFound =
                updatedMissions.length > 0 &&
                updatedMissions.every((m) => m.found);

              if (allMissionsFound && !c.cleared) {
                sound.playSuccess();

                let unlockedLevelMessage: string | null = null;
                if (c.dangerLevel === "easy" && currentEasyCleared + 1 >= 3) {
                  unlockedLevelMessage =
                    lang === "en"
                      ? "【Medium Syndicate (6 Targets)】Unlocked!"
                      : "【難易度：中（6ターゲット）】が解放されました！";
                } else if (
                  c.dangerLevel === "medium" &&
                  currentMediumCleared + 1 >= 6
                ) {
                  unlockedLevelMessage =
                    lang === "en"
                      ? "【Hard Syndicate (9 Targets - Max Free Tier)】Unlocked!"
                      : "【難易度：強（9ターゲット・無課金最大）】が解放されました！";
                } else if (
                  c.dangerLevel === "hard" &&
                  currentHardCleared + 1 >= 9
                ) {
                  setShowMasterUnlockModal(true);
                  unlockedLevelMessage =
                    lang === "en"
                      ? "🎉 Free Stages 100% Completed! Unlock Infinite Master Mode!"
                      : "🎉 全無料ステージ（計18件）制覇！最凶エンドレスモードへ！";
                } else if (c.dangerLevel === "master") {
                  const nextLevelNum = currentMasterCleared + 2;
                  const bossNameList =
                    lang === "en"
                      ? ENDLESS_BOSS_NAMES_EN
                      : ENDLESS_BOSS_NAMES_JA;
                  const nextBossName =
                    bossNameList[(nextLevelNum - 2) % bossNameList.length];

                  unlockedLevelMessage =
                    lang === "en"
                      ? `👑 Supreme Lv.${currentMasterCleared + 1} Busted! Supreme Lv.${nextLevelNum} (${nextBossName}) has emerged!`
                      : `👑 最強Lv.${currentMasterCleared + 1} 摘発！さらなる深淵【最強Lv.${nextLevelNum}：${nextBossName}】が出現しました！`;

                  newEndlessBoss = {
                    id: `master_boss_lv_${nextLevelNum}`,
                    name:
                      lang === "en"
                        ? `Supreme Lv.${nextLevelNum}: ${nextBossName}`
                        : `最強Lv.${nextLevelNum}：${nextBossName}`,
                    role:
                      lang === "en"
                        ? "Deep International Syndicate"
                        : "深層犯罪シンジケート最高幹部",
                    danger:
                      lang === "en"
                        ? `Threat: EXTREME Lv.${nextLevelNum}`
                        : `危険度：EXTREME Lv.${nextLevelNum}`,
                    dangerLevel: "master",
                    lastTime: "Just now",
                    subject:
                      lang === "en"
                        ? `👑 [Supreme Depth] Warning from Lv.${nextLevelNum}`
                        : `👑 【最凶深層】Lv.${nextLevelNum}からの暗号通信`,
                    preview:
                      lang === "en"
                        ? "The previous kingpin's defeat was calculated. Dare you challenge my fortress?"
                        : "前任者の敗北など想定内。我が要塞を突破できるか？",
                    initialMessage:
                      lang === "en"
                        ? `Undercover agent, you eliminated Lv.${currentMasterCleared + 1}. But my encrypted empire cannot be breached!`
                        : `潜入捜査官よ、Lv.${currentMasterCleared + 1}を倒したようだな。だが私の築いた電脳帝国を暴くことはできん！`,
                    cleared: false,
                    missions: [
                      {
                        id: 1,
                        name:
                          lang === "en"
                            ? "Extract supreme hideout location"
                            : "最深部アジトの場所を自白させる",
                        found: false,
                      },
                      {
                        id: 2,
                        name:
                          lang === "en"
                            ? "Seize syndicate vault account"
                            : "シンジケートの秘密口座を押収する",
                        found: false,
                      },
                    ],
                    description:
                      lang === "en"
                        ? `Endless Supreme Kingpin Lv.${nextLevelNum}`
                        : `終わりなき最凶エンドレス首謀者 Lv.${nextLevelNum}`,
                  };
                }

                setClearModalInfo({
                  isOpen: true,
                  targetName: c.name,
                  clearedLevel: c.dangerLevel,
                  unlockedNewLevel: unlockedLevelMessage,
                });
              }

              return {
                ...c,
                missions: updatedMissions,
                cleared: allMissionsFound,
              };
            }
            return c;
          });

          if (newEndlessBoss) {
            setChatHistories((prevH) => ({
              ...prevH,
              [(newEndlessBoss as Contact).id]: [
                {
                  sender: "scammer",
                  text: (newEndlessBoss as Contact).initialMessage,
                },
              ],
            }));
            return [...nextContacts, newEndlessBoss];
          }

          return nextContacts;
        });
      } else {
        const errorReply =
          lang === "en"
            ? "⚠️ Connection error or server timeout. Please send again."
            : "⚠️ 通信エラーが発生しました。もう一度メッセージを送信してください。";
        setChatHistories((prev) => ({
          ...prev,
          [targetContactId]: [
            ...(prev[targetContactId] || updatedMessages),
            { sender: "scammer", text: errorReply },
          ],
        }));
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const errorReply =
        lang === "en"
          ? "⚠️ Network error. Please try sending again."
          : "⚠️ ネットワークエラーが発生しました。もう一度お試しください。";
      setChatHistories((prev) => ({
        ...prev,
        [targetContactId]: [
          ...(prev[targetContactId] || []),
          { sender: "scammer", text: errorReply },
        ],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const clearedScamCount = contacts.filter((c) => c.cleared).length;

  const easyClearedCount = contacts.filter(
    (c) => c.dangerLevel === "easy" && c.cleared,
  ).length;
  const isEasyAllCleared = easyClearedCount >= 3;

  const mediumClearedCount = contacts.filter(
    (c) => c.dangerLevel === "medium" && c.cleared,
  ).length;
  const isMediumAllCleared = isEasyAllCleared && mediumClearedCount >= 6;

  const hardClearedCount = contacts.filter(
    (c) => c.dangerLevel === "hard" && c.cleared,
  ).length;
  const isHardAllCleared = isMediumAllCleared && hardClearedCount >= 9;

  const masterClearedCount = contacts.filter(
    (c) => c.dangerLevel === "master" && c.cleared,
  ).length;

  const isMasterUnlocked = isPremium || adWatchCount >= 2;
  const canUnlockMaster = isHardAllCleared;

  const visibleContacts = contacts.filter((c) => {
    if (c.dangerLevel === "easy") return true;
    if (c.dangerLevel === "medium") return isEasyAllCleared;
    if (c.dangerLevel === "hard") return isMediumAllCleared;
    if (c.dangerLevel === "master") return isMasterUnlocked;
    return false;
  });

  const activeContact =
    contacts.find((c) => c.id === activeContactId) ||
    visibleContacts[0] ||
    contacts[0];

  const currentMessages =
    chatHistories[activeContactId] && chatHistories[activeContactId].length > 0
      ? chatHistories[activeContactId]
      : activeContact
        ? [{ sender: "scammer", text: activeContact.initialMessage }]
        : [];

  const handleLanguageChange = (newLang: "ja" | "en") => {
    setLang(newLang);
    localStorage.setItem("scam_lang", newLang);
    const newContactsBase = newLang === "en" ? CONTACTS_EN : CONTACTS_JA;
    setContacts((prevContacts) => {
      return newContactsBase.map((nc) => {
        const existing = prevContacts.find((p) => p.id === nc.id);
        if (existing) {
          return {
            ...nc,
            cleared: existing.cleared,
            failed: existing.failed,
            missions: nc.missions.map((m) => {
              const existingM = existing.missions.find((em) => em.id === m.id);
              return {
                ...m,
                found: existingM ? existingM.found : m.found,
              };
            }),
          };
        }
        return nc;
      });
    });

    // 会話履歴の初期メッセージを新言語に同期（未チャットまたは開始直後の場合）
    setChatHistories((prev) => {
      const updated = { ...prev };
      newContactsBase.forEach((nc) => {
        const hist = updated[nc.id];
        if (!hist || hist.length <= 1) {
          updated[nc.id] = [{ sender: "scammer", text: nc.initialMessage }];
        }
      });
      return updated;
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-screen bg-gray-950 items-center justify-center text-gray-100 font-mono">
        <div className="text-center space-y-4 p-8 border border-pink-500/40 rounded-2xl bg-gray-900/80 shadow-[0_0_50px_rgba(236,72,153,0.3)] max-w-sm mx-4">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-base font-bold text-pink-400">
            🚨 潜入捜査エージェント認証中...
          </div>
          <div className="text-xs text-gray-400">
            {lang === "en"
              ? "Establishing secure connection to police database..."
              : "警察本部データベースと安全な接続を確立しています..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen w-screen bg-gray-950 text-gray-100 overflow-hidden relative">
      <ArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        clearedContacts={contacts.filter((c) => c.cleared)}
      />

      <AdModal
        isOpen={showAdModal}
        onAdFinished={handleAdFinished}
        onClose={() => setShowAdModal(false)}
        lang={lang}
      />

      <MasterUnlockModal
        isOpen={showMasterUnlockModal}
        onClose={() => setShowMasterUnlockModal(false)}
        onBuyPremium={handleBuyPremium}
        onWatchAd={() => setShowAdModal(true)}
        adWatchCount={adWatchCount}
        lang={lang}
      />

      <ClearModal
        isOpen={clearModalInfo.isOpen}
        onClose={handleProceedToNext}
        targetName={clearModalInfo.targetName}
        clearedLevel={clearModalInfo.clearedLevel}
        easyClearedCount={
          clearModalInfo.clearedLevel === "easy"
            ? easyClearedCount
            : clearModalInfo.clearedLevel === "medium"
              ? mediumClearedCount
              : hardClearedCount
        }
        totalEasyCount={
          clearModalInfo.clearedLevel === "easy"
            ? 3
            : clearModalInfo.clearedLevel === "medium"
              ? 6
              : 9
        }
        unlockedNewLevel={clearModalInfo.unlockedNewLevel}
        lang={lang}
        onOpenArchive={() => setShowArchiveModal(true)}
      />

      <GameOverModal
        isOpen={gameOverModalInfo.isOpen}
        onClose={() =>
          setGameOverModalInfo((prev) => ({ ...prev, isOpen: false }))
        }
        onRetry={() => handleRetryContact(activeContactId)}
        targetName={gameOverModalInfo.targetName}
        lang={lang}
      />

      <DashboardSidebar
        t={t}
        nickname={nickname}
        clearedScamCount={clearedScamCount}
        totalContactsCount={contacts.length}
        easyClearedCount={easyClearedCount}
        mediumClearedCount={mediumClearedCount}
        hardClearedCount={hardClearedCount}
        masterClearedCount={masterClearedCount}
        isEasyAllCleared={isEasyAllCleared}
        isMediumAllCleared={isMediumAllCleared}
        isHardAllCleared={isHardAllCleared}
        canUnlockMaster={canUnlockMaster}
        isMasterUnlocked={isMasterUnlocked}
        setIsPremium={setIsPremium}
        adWatchCount={adWatchCount}
        onWatchAd={() => setShowAdModal(true)}
        visibleContacts={visibleContacts}
        activeContactId={activeContactId}
        handleSelectContact={handleSelectContact}
        setShowArchiveModal={setShowArchiveModal}
        isMobileChatOpen={isMobileChatOpen}
        onReset={handleReset}
        lang={lang}
        onLanguageChange={handleLanguageChange}
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
        onRetry={handleRetryContact}
        onSelectNextTarget={handleProceedToNext}
      />
    </main>
  );
}
