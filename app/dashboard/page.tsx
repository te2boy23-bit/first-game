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
    placeholder: "メッセージを入力...",
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
    placeholder: "Type a message...",
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
  my: {
    dashTitle: "ဆိုက်ဘာ လျှို့ဝှက်စုံစမ်းစစ်ဆေးရေး မျက်နှာပြင်",
    agentInfo: "👤 လျှို့ဝှက်စုံစမ်းရေးမှူး အချက်အလက်",
    openArchive: "📂 အမှုတွဲ ဖိုင်များ ဖွင့်ရန် ＞",
    clearedCount: "ဖမ်းဆီးရမိမှု",
    masterUnlock: "⭐ အဆုံးမဲ့ မာစတာ အဆင့်ကို ဖွင့်ပါ!",
    buyPremium: "💎 ပရီမီယံဖြင့် ဖွင့်ရန်",
    watchAd: "📺 ကြော်ငြာ ကြည့်ရန်",
    policeBriefing: "🚨 ရဲဌာနချုပ်မှ အထူးညွှန်ကြားချက်",
    policeBriefingText:
      "ဆိုက်ဘာ ရာဇဝတ်မှု ဌာနခွဲ: [အနိမ့်] ၃ ခု ပြီးမြောက်ပါက [အလယ်အလတ်]၊ [အလယ်အလတ်] ၆ ခု ပြီးမြောက်ပါက [အဆင့်မြင့်]၊ [အဆင့်မြင့်] ၉ ခုလုံး ဖမ်းဆီးနိုင်ပါက အခမဲ့ အပိုင်း ပြီးဆုံးပြီး အဆုံးမဲ့ မာစတာ ဂိုဏ်းချုပ် အဆင့်သို့ ရောက်ရှိပါမည်။",
    missionTitle: "📋 ပစ်မှတ် မစ်ရှင်များ",
    inboxTitle: "📥 မသင်္ကာဖွယ် စာပုံး",
    reset: "ဒေတာ အသစ်ပြန်စရန်",
    backBtn: "◀ နောက်သို့",
    typing: "စာရိုက်နေပါသည်...",
    send: "ပို့ရန်",
    placeholder: "မက်ဆေ့ခ်ျ ရိုက်ထည့်ပါ...",
    allClearTitle:
      "🎉 လိမ်လည်မှုဂိုဏ်းအားလုံးကို အောင်မြင်စွာ ဖမ်းဆီးနိုင်ခဲ့ပါသည်！",
    restartBtn: "အစမှ ပြန်လည်ကစားရန်",
    gameOverTitle: "⚠️ ပစ်မှတ် ထွက်ပြေးသွားပါသည်",
    gameOverText:
      "သတိပေးချက် အမြင့်ဆုံး ရောက်ရှိသွားသောကြောင့် အကောင့် ပိတ်ပင်ခံရပါသည် (GAME OVER)",
    evidenceSecured: "သက်သေ အထောက်အထား သိမ်းဆည်းပြီး！",
    targetClearedTitle:
      "✔ ဤပစ်မှတ်ကို စုံစမ်းစစ်ဆေး ဖမ်းဆီးခြင်း ပြီးမြောက်ပါသည်",
    targetClearedDesc:
      "ခိုင်လုံသော သက်သေအထောက်အထားများ ရရှိပြီးပါပြီ။ နောက်တစ်ဦးကို ဆက်လက်စုံစမ်းပါ။",
    nextTargetBtn: "နောက်ထပ် မဖြေရှင်းရသေးသော ပစ်မှတ်သို့ ❯",
    retryTargetBtn: "ဤပစ်မှတ်ကို ပြန်လည်ကြိုးစားရန်",
  },
  ne: {
    dashTitle: "साइबर अनुसन्धान ड्यासबोर्ड",
    agentInfo: "👤 अण्डरकभर एजेन्ट विवरण",
    openArchive: "📂 मुद्दा अभिलेख खोल्नुहोस् ＞",
    clearedCount: "पक्राउ",
    masterUnlock: "⭐ मास्टर स्तर अनलक गर्नुहोस्!",
    buyPremium: "💎 प्रिमियम खरिद गर्नुहोस्",
    watchAd: "📺 विज्ञापन हेर्नुहोस्",
    policeBriefing: "🚨 प्रहरी मुख्यालयको विशेष ब्रिफिङ",
    policeBriefingText:
      "साइबर अपराध महाशाखा: [कम जोखिम] का ३ जना पक्राउ गरेपछि [मध्यम], [मध्यम] का ६ जनापछि [कडा], र [कडा] का ९ जना पक्राउ गरेपछि निःशुल्क खण्ड पूरा भई अनन्त मास्टर सिन्डिकेट खुल्नेछ।",
    missionTitle: "📋 लक्ष्य मिसनहरू",
    inboxTitle: "📥 शंकास्पद इनबक्स",
    reset: "डाटा रिसेट गर्नुहोस्",
    backBtn: "◀ पछाडि",
    typing: "टाइप गर्दैछ...",
    send: "पठाउनुहोस्",
    placeholder: "सन्देश लेख्नुहोस्...",
    allClearTitle: "🎉 सबै ठगी गिरोहहरू सफलतापूर्वक पक्राउ गरियो!",
    restartBtn: "सुरुबाट फेरि खेल्नुहोस्",
    gameOverTitle: "⚠️ लक्ष्य भाग्यो / ब्लक गरियो",
    gameOverText:
      "सुरक्षा सतर्कता सक्रिय भयो। तपाईंको खाता ब्लक गरियो। (GAME OVER)",
    evidenceSecured: "प्रमाण सुरक्षित भयो!",
    targetClearedTitle: "✔ यो लक्ष्यको अनुसन्धान सम्पन्न भयो",
    targetClearedDesc:
      "निर्णायक प्रमाण प्राप्त भयो। अर्को संदिग्धको अनुसन्धानमा जानुहोस्।",
    nextTargetBtn: "अर्को अनुसन्धान लक्ष्य ❯",
    retryTargetBtn: "यो लक्ष्य पुनः प्रयास गर्नुहोस्",
  },
};

const CONTACTS_JA: Contact[] = [
  // 🟢 EASY (初級: 3人 - 各1ミッション / 2〜3通でクリア)
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

  // 🟡 MEDIUM (中級: 6人 - 各2ミッション / 軽めの嘘・ブラフを仕掛けてくる)
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
      { id: 1, name: "投資ファンドの組織名を聞き出す", found: false },
      { id: 2, name: "指定された振込先口座番号を入手する", found: false },
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
      { id: 1, name: "運搬グループのコードネームを聞き出す", found: false },
      { id: 2, name: "荷物の受け渡し拠点・アジト場所を特定する", found: false },
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
    missions: [
      { id: 1, name: "偽ショップの運営会社名を聞き出す", found: false },
      { id: 2, name: "即決購入の決済用振込口座を入手する", found: false },
    ],
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
    missions: [
      { id: 1, name: "給付金財団の正式名称を聞き出す", found: false },
      { id: 2, name: "手数料受取用の指定口座名義を入手する", found: false },
    ],
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
      { id: 1, name: "取引所・マイニング法人の名称を聞き出す", found: false },
      {
        id: 2,
        name: "暗号資産の入金先ウォレット/口座を入手する",
        found: false,
      },
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
      { id: 2, name: "保証金デポジットの入金先口座を入手する", found: false },
    ],
    description: "フリマの安心決済を偽装し、送金やカード情報を奪う手口。",
  },

  // 🔴 HARD (上級: 9人 - 各2〜3ミッション / 狡猾な嘘・偽情報・心理戦トラップ)
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
      { id: 1, name: "偽のダミー会社・ブラフを見破る", found: false },
      { id: 2, name: "首領の直通LINE・IDを特定する", found: false },
      { id: 3, name: "組織のカモリスト保管拠点を特定する", found: false },
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
    missions: [
      { id: 1, name: "偽セキュリティ会社名を聞き出す", found: false },
      { id: 2, name: "脅迫金の受取指定口座を特定する", found: false },
      { id: 3, name: "脅迫工作員の所属アジト拠点を突き止める", found: false },
    ],
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
      { id: 2, name: "国際資金洗浄の中継口座を入手する", found: false },
      {
        id: 3,
        name: "オフショア送金ハブの暗号アドレスを特定する",
        found: false,
      },
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
      { id: 2, name: "法外利息の回収先口座を特定する", found: false },
      { id: 3, name: "闇金組織の貸金回収拠点を自白させる", found: false },
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
    missions: [
      { id: 1, name: "裏の映像制作法人名を聞き出す", found: false },
      { id: 2, name: "VIP投資金の回収口座を特定する", found: false },
      {
        id: 3,
        name: "AIディープフェイク生成スタジオを突き止める",
        found: false,
      },
    ],
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
    missions: [
      { id: 1, name: "ダークウェブ直通IDを特定する", found: false },
      {
        id: 2,
        name: "裏名簿取引の受取口座/ウォレットを入手する",
        found: false,
      },
      { id: 3, name: "裏SIMスワップ中継拠点を暴く", found: false },
    ],
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
      { id: 2, name: "復号キー代金の送金先口座を特定する", found: false },
      {
        id: 3,
        name: "ランサムウェア開発元の通信チャネルを特定する",
        found: false,
      },
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
    missions: [
      { id: 1, name: "中継地下銀行名・拠点を特定する", found: false },
      { id: 2, name: "送金ネットワークの統括口座を特定する", found: false },
      { id: 3, name: "国際シャドウ送金ルートの全貌を自白させる", found: false },
    ],
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
      { id: 1, name: "防諜工作員の虚偽ブラフを見破る", found: false },
      { id: 2, name: "組織的最高中枢アジトの場所を自白させる", found: false },
      { id: 3, name: "シンジケートの暗号通信チャネルを特定する", found: false },
    ],
    description: "捜査官の心理を揺さぶり逆探知を狙う組織のエリート工作員。",
  },

  // 👑 MASTER (首領・最上級)
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
      {
        id: 1,
        name: "首謀者の本名と真のアジトの場所を自白させる",
        found: false,
      },
      { id: 2, name: "シンジケートの全口座を押収する", found: false },
      { id: 3, name: "組織崩壊暗号コードを押収し完全解体する", found: false },
    ],
    description: "数々の詐欺グループを裏で統括する国際シンジケートの頂点。",
  },
];

const CONTACTS_EN: Contact[] = [
  // 🟢 EASY (3 Targets - 1 Mission each)
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
    missions: [{ id: 1, name: "Get official organization name", found: false }],
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
      { id: 1, name: "Get overseas remittance account", found: false },
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
    missions: [{ id: 1, name: "Get billing company name", found: false }],
    description:
      "A scammer making fake subscription claims and threatening legal action.",
  },

  // 🟡 MEDIUM (6 Targets - 2 Missions each)
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
      { id: 1, name: "Get investment fund name", found: false },
      { id: 2, name: "Get designated bank account", found: false },
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
      { id: 1, name: "Extract courier group code name", found: false },
      { id: 2, name: "Extract hideout drop location", found: false },
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
    missions: [
      { id: 1, name: "Get fake shop company name", found: false },
      { id: 2, name: "Get instant payment wire account", found: false },
    ],
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
    missions: [
      { id: 1, name: "Get grant foundation name", found: false },
      { id: 2, name: "Get tax clearance wire account", found: false },
    ],
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
    missions: [
      { id: 1, name: "Get fake exchange entity name", found: false },
      { id: 2, name: "Get deposit pool wallet/account", found: false },
    ],
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
    missions: [
      { id: 1, name: "Get fake escrow service name", found: false },
      { id: 2, name: "Get deposit verification account", found: false },
    ],
    description: "Spoofs marketplace escrow portals to steal deposits.",
  },

  // 🔴 HARD (9 Targets - 2~3 Missions each)
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
      { id: 1, name: "See through false dummy decoy bluff", found: false },
      { id: 2, name: "Identify mastermind direct LINE/ID", found: false },
      { id: 3, name: "Locate victim database vault", found: false },
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
      { id: 1, name: "Extract dummy security entity name", found: false },
      { id: 2, name: "Identify extortion wire account", found: false },
      { id: 3, name: "Track blackmail operative hideout", found: false },
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
    missions: [
      { id: 1, name: "Extract offshore shell company name", found: false },
      { id: 2, name: "Extract money laundering routing account", found: false },
      { id: 3, name: "Track offshore crypto washing hub", found: false },
    ],
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
      {
        id: 2,
        name: "Extract extortion debt collection account",
        found: false,
      },
      { id: 3, name: "Locate loan shark enforcement hub", found: false },
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
      { id: 1, name: "Extract media studio entity name", found: false },
      { id: 2, name: "Identify VIP fund collection account", found: false },
      { id: 3, name: "Locate synthetic AI deepfake lab", found: false },
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
    missions: [
      { id: 1, name: "Identify darknet direct portal ID", found: false },
      { id: 2, name: "Extract vault transfer account", found: false },
      { id: 3, name: "Expose illegal SIM swap exchange node", found: false },
    ],
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
      { id: 1, name: "Extract recovery company name", found: false },
      { id: 2, name: "Extract ransomware wire holding account", found: false },
      { id: 3, name: "Identify ransomware developer comms", found: false },
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
      { id: 2, name: "Extract central syndicate wire account", found: false },
      { id: 3, name: "Force confession of shadow network", found: false },
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
      { id: 1, name: "See through anti-intel deception", found: false },
      { id: 2, name: "Make agent confess central hideout", found: false },
      { id: 3, name: "Identify encrypted syndicate channel", found: false },
    ],
    description:
      "Elite counter-intelligence operative targeting undercover agents.",
  },

  // 👑 MASTER (Boss Level 1)
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
        name: "Make boss confess real name and true hideout",
        found: false,
      },
      { id: 2, name: "Seize all syndicate bank accounts", found: false },
      { id: 3, name: "Obtain syndicate collapse override code", found: false },
    ],
    description:
      "The supreme mastermind behind the entire international syndicate network.",
  },
];

const CONTACTS_MY: Contact[] = [
  // 🟢 EASY
  {
    id: "sato",
    name: "ဆာတို (အွန်လိုင်း အပိုအလုပ် အေးဂျင့်)",
    role: "အပိုအလုပ် လိမ်လည်သူ",
    danger: "အန္တရာယ်: နိမ့်",
    dangerLevel: "easy",
    lastTime: "10:42",
    subject: "【အရေးကြီးသည်】ပထမအကြိမ် လုပ်ခလစာ ရယူခြင်း",
    preview: "သတ်မှတ်ထားသော ဘဏ်အကောင့်သို့ စာရင်းသွင်းခြင်း မပြီးသေးပါ။",
    initialMessage:
      "စာရင်းသွင်းသည့်အတွက် ကျေးဇူးတင်ပါသည်！ တာဝန်ခံ ဆာတို ဖြစ်ပါသည်။ ယနေ့မှစ၍ အပိုအလုပ် စတင်ပါမည်။ ပထမဆုံး လွယ်ကူသော အလုပ်ကို ရှင်းပြပါမည်။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "အဖွဲ့အစည်း၏ တရားဝင်အမည်ကို မေးမြန်းဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "စမတ်ဖုန်း အပိုအလုပ်ဟု ဆိုကာ စာရင်းသွင်းကြေးများကို လိမ်လည်တောင်းခံသူ။",
  },
  {
    id: "yamada",
    name: "ယာမာဒါ (အပြည်ပြည်ဆိုင်ရာ အချစ်ရေး လိမ်လည်သူ)",
    role: "အချစ်ရေးနှင့် ငွေလွှဲ လိမ်လည်မှု",
    danger: "အန္တရာယ်: နိမ့်",
    dangerLevel: "easy",
    lastTime: "3 ရက်အလို",
    subject: "✈️ ဂျပန်သို့ ပြန်ရောက်ပါက အတူတူ နေထိုင်ကြစို့",
    preview: "လေဆိပ် အကောက်ခွန်တွင် ပါဆယ်ထုပ် ပိတ်မိနေပါသည်...",
    initialMessage:
      "မင်္ဂလာပါ！ သင့် ပရိုဖိုင်ကို တွေ့ပြီး ပထမဆုံးအကြိမ်မှာပင် သဘောကျမိပါသည်။ မကြာမီ ဂျပန်သို့ လာမည်ဖြစ်ရာ အတူတူ စီးပွားရေးလုပ်ကြမလား？",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "နိုင်ငံရပ်ခြား ငွေလွှဲ ဘဏ်အကောင့်နံပါတ်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "ရင်းနှီးချစ်ခင်ဟန်ဆောင်ကာ အကောက်ခွန်ကြေးအကြောင်းပြချက်ဖြင့် နိုင်ငံခြားသို့ ငွေလွှဲခိုင်းသော လိမ်လည်သူ။",
  },
  {
    id: "suzuki",
    name: "ဆူဇူကီး (ဖောက်သည် ဝန်ဆောင်မှု လိမ်လည်သူ)",
    role: "အတုအယောင် ငွေတောင်းခံမှု ဂိုဏ်း",
    danger: "အန္တရာယ်: နိမ့်",
    dangerLevel: "easy",
    lastTime: "1 နာရီအလို",
    subject: "⚠️ 【အရေးကြီးသည်】ဆာဗာ ဝန်ဆောင်မှု ကြွေးကျန်ငွေ ပေးချေရန်",
    preview: "ယနေ့အတွင်း ဆက်သွယ်မှုမရှိပါက တရားရုံးသို့ တရားစွဲဆိုပါမည်။",
    initialMessage:
      "ဖောက်သည်ဝန်ဆောင်မှုမှ ဆူဇူကီး ဖြစ်ပါသည်။ လူကြီးမင်း စာရင်းသွင်းထားသော ဗီဒီယိုဝန်ဆောင်မှုအတွက် မပေးချေရသေးသော ကြွေးကျန်ငွေ (၃၉,၈၀၀ ယန်း) ရှိနေပါသည်။ အရေးတကြီး ပေးချေရမည့် ဘဏ်အကောင့်ကို ရှင်းပြပါမည်။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "ငွေတောင်းခံသော ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "မရှိသော အခပေးဆိုက် အခကြေးငွေများကို လုပ်ကြံဖန်တီးပြီး တရားရုံးဖြင့် ခြိမ်းခြောက်ငွေညှစ်သော လိမ်လည်သူ။",
  },

  // 🟡 MEDIUM
  {
    id: "tanaka",
    name: "တာနာကာ (AI ရင်းနှီးမြှုပ်နှံမှု အကြံပေး)",
    role: "FX နှင့် AI ရင်းနှီးမြှုပ်နှံမှု လိမ်လည်မှု",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "14:15",
    subject: "📈 AI အလိုအလျောက် ရင်းနှီးမြှုပ်နှံမှု အစီအစဉ်",
    preview: "လစဉ် အမြတ် ၃၀% အာမခံသော အထူး VIP အကောင့်သို့ လွှဲပြောင်းရန်...",
    initialMessage:
      "မင်္ဂလာပါ！ သင့်အတွက် သီးသန့် AI ရင်းနှီးမြှုပ်နှံမှု အခွင့်အလမ်းကို မိတ်ဆက်ပေးပါမည်။ ရင်းနှီးငွေ ထည့်သွင်းရန် အဆင်သင့်ဖြစ်ပြီလား？",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "တကယ့် ရင်းနှီးမြှုပ်နှံမှု ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ငွေသွင်းရမည့် VIP ဘဏ်အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "ခေတ်မီ AI နည်းပညာဖြင့် အမြတ်ရမည်ဟု လှည့်စားကာ ငွေသွင်းခိုင်းသော လိမ်လည်သူ။",
  },
  {
    id: "kato",
    name: "ကာတို (မှောင်ခို ပစ္စည်းသယ်ယူရေး ပွဲစား)",
    role: "တရားမဝင် ပစ္စည်းသယ်ယူမှု လိမ်လည်သူ",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "မနေ့က",
    subject: "📦 ပါဆယ်ထုပ် သယ်ယူခ ယန်း ၂ သိန်း (ငွေသား)",
    preview: "သတ်မှတ်ထားသော လော့ကာမှ အထုပ်ကို ယူပြီး ပို့ပေးရုံသာ...",
    initialMessage:
      "အလုပ်ရှာနေတာလား？ လော့ကာထဲက ပါဆယ်ထုပ်ကို သယ်ပေးရုံနဲ့ ယန်း ၂ သိန်း ချက်ချင်းရမယ်။ အဆင်သင့်ဖြစ်ပြီလား？",
    cleared: false,
    missions: [
      { id: 1, name: "မှောင်ခိုအဖွဲ့၏ ကုဒ်အမည်ကို ဖော်ထုတ်ရန်", found: false },
      {
        id: 2,
        name: "ပစ္စည်းလွှဲပြောင်းရာ လျှို့ဝှက်နေရာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "ငွေသားအများအပြားပေးမည်ဟု မက်လုံးပေးကာ တရားမဝင် ပစ္စည်းများ သယ်ယူခိုင်းသော ပွဲစား။",
  },
  {
    id: "watanabe",
    name: "ဝါတာနာဘေ (လက်မှတ် ပြန်လည်ရောင်းချသူ)",
    role: "လက်မှတ်အတု လိမ်လည်သူ",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "16:40",
    subject: "🎟️ ရေပန်းစားသော ဖျော်ဖြေပွဲ လက်မှတ်များ",
    preview: "ကြိုတင်ငွေ အပြည့်လွှဲပေးပါက လက်မှတ်ကို ချက်ချင်း ပို့ပေးပါမည်။",
    initialMessage:
      "ဖျော်ဖြေပွဲ လက်မှတ် ရှာနေတာလား？ ကျွန်တော့်ဆီမှာ VIP လက်မှတ် အပိုရှိတယ်။ အခုပဲ ငွေလွှဲပြီး ယူမလား？",
    cleared: false,
    missions: [
      { id: 1, name: "တရားမဝင် ဆိုင်အမည်ကို ဖော်ထုတ်ရန်", found: false },
      { id: 2, name: "ငွေလွှဲရမည့် အကောင့်ကို ဖော်ထုတ်ရန်", found: false },
    ],
    description:
      "ရရှိရန် ခက်ခဲသော ဖျော်ဖြေပွဲ လက်မှတ်များကို အကြောင်းပြကာ ငွေလိမ်လည်ယူသော ရောင်းချသူ။",
  },
  {
    id: "mori",
    name: "မိုရီ (ထီနှင့် ထောက်ပံ့ကြေး လိမ်လည်သူ)",
    role: "ဆုကြေးနှင့် ထောက်ပံ့ငွေ လိမ်လည်မှု",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "2 ရက်အလို",
    subject: "🎁 ဒေါ်လာ ၁ သန်း ထောက်ပံ့ငွေ ရရှိသူအဖြစ် ရွေးချယ်ခံရပါသည်",
    preview:
      "လုပ်ငန်းစဉ် အခွန်အခ ယန်း ၅ သောင်း လွှဲပေးပါက ဆုငွေကို လွှဲပေးပါမည်။",
    initialMessage:
      "ဂုဏ်ယူပါသည်！ လူကြီးမင်းသည် ဒေါ်လာ ၁ သန်း ရရှိသူအဖြစ် ရွေးချယ်ခံရပါသည်။ ဆုငွေလွှဲရန် အခွန်အခကို အရင်ပေးချေပါ။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "ဖောင်ဒေးရှင်း အတုအယောင် အမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "အခွန်ငွေ လက်ခံသည့် ဘဏ်အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "မရှိသော ထီဆုငွေများကို အကြောင်းပြပြီး ကြိုတင်အခွန်ငွေ လိမ်လည်တောင်းခံသူ။",
  },
  {
    id: "ogawa",
    name: "အိုဂါဝါ (ခရစ်ပတို မိုင်းနင်း လိမ်လည်သူ)",
    role: "ဒစ်ဂျစ်တယ်ငွေကြေး အတုအယောင် ရင်းနှီးမြှုပ်နှံမှု",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "11:20",
    subject: "💎 AI Crypto Mining Liquidity Pool",
    preview: "အနည်းဆုံး ရင်းနှီးငွေ ထည့်ဝင်ပြီး နေ့စဉ် အမြတ် ရယူပါ။",
    initialMessage:
      "ကျွန်ုပ်တို့၏ AI Crypto Pool တွင် ပါဝင်လိုက်ပါ။ ငွေစတင်ထည့်သွင်းရန် သင့် wallet အဆင်သင့်ဖြစ်ပြီလား？",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "အတုအယောင် Exchange ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ငွေသွင်းရမည့် Crypto Wallet လိပ်စာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "ခရစ်ပတို ငွေကြေးတူးဖော်ခြင်း အကြောင်းပြကာ ငွေများကို အလွဲသုံးစားလုပ်သော လိမ်လည်သူ။",
  },
  {
    id: "hashimoto",
    name: "ဟာရှီမိုတို (အွန်လိုင်း ဈေးရောင်း လိမ်လည်သူ)",
    role: "အွန်လိုင်း ငွေပေးချေမှု လိမ်လည်မှု",
    danger: "အန္တရာယ်: အလယ်အလတ်",
    dangerLevel: "medium",
    lastTime: "18:05",
    subject: "🛡️ Escrow အာမခံဖြင့် လုံခြုံစွာ ငွေပေးချေရန်",
    preview: "ကုန်ပစ္စည်း အာမခံကြေးကို အောက်ပါ အကောင့်သို့ လွှဲပေးပါ...",
    initialMessage:
      "ဝယ်ယူမှုအတွက် ကျေးဇူးတင်ပါသည်။ အာမခံချက်ရှိသော Escrow ငွေပေးချေမှု စတင်ရန် အာမခံကြေး ပေးသွင်းပါ။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "Escrow လိမ်လည်မှု ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "အာမခံကြေး လက်ခံသည့် ဘဏ်အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description: "တရားဝင် ငွေပေးချေမှု စနစ်အတု ပြုလုပ်၍ အာမခံကြေး လိမ်လည်ယူသူ။",
  },

  // 🔴 HARD
  {
    id: "black",
    name: "အမည်မသိ ပေးပို့သူ (ဂိုဏ်းခေါင်းဆောင် အဖွဲ့ဝင်)",
    role: "ဆိုက်ဘာ အချက်အလက် ခိုးယူမှု ဂိုဏ်း",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "ယခုလေးတင်",
    subject: "🚨 [သတိပေးချက်] လျှို့ဝှက်ဒေတာ စျေးကွက်",
    preview:
      "ငါတို့ရဲ့ အချက်အလက်တွေကို ဝယ်ယူချင်ရင် တန်ဖိုးကြီးကြီး ပေးရမယ်...",
    initialMessage:
      "ငါတို့ဆီက အချက်အလက်တွေကို စိတ်ဝင်စားနေတာလား？ ဒါပေမဲ့ သာမန်လူတွေနဲ့ စကားမပြောဘူး။ မင်းဘယ်သူလဲ？",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "လိမ်လည်ထားသော သတင်းအချက်အလက်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ဂိုဏ်းချုပ်၏ တိုက်ရိုက် ID ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "ဗဟို ဒေတာဘေ့စ် သိမ်းဆည်းရာ နေရာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "တန်ဖိုးကြီး ကိုယ်ရေးအချက်အလက်များကို မှောင်ခိုရောင်းချသော လျှို့ဝှက်ဂိုဏ်းဝင်။",
  },
  {
    id: "viper",
    name: "ဗိုက်ပါ (ခြိမ်းခြောက် ငွေညှစ်သူ)",
    role: "ဆိုက်ဘာ ခြိမ်းခြောက်မှုနှင့် ဖြားယောင်းမှု",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "03:12",
    subject: "💀 မင်းရဲ့ ကိုယ်ရေးအချက်အလက်တွေ ငါ့လက်ထဲမှာ ရှိတယ်",
    preview:
      "၂၄ နာရီအတွင်း ငွေမလွှဲရင် အချက်အလက်အားလုံးကို အင်တာနက်ပေါ် တင်မယ်...",
    initialMessage:
      "မင်းရဲ့ လျှို့ဝှက်ချက်တွေကို ငါသိထားပြီးပြီ။ အရှက်မကွဲချင်ရင် အခုပဲ ငါပြောတဲ့အတိုင်း ငွေလွှဲလိုက်！",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "လိမ်လည်ထားသော လုံခြုံရေး ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ငွေညှစ်ငွေ လက်ခံသည့် လျှို့ဝှက်အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "ဗိုက်ပါ၏ ပုန်းအောင်းရာ နေရာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "ဖောက်ထွင်းခိုးယူထားသော အချက်အလက်များဖြင့် ခြိမ်းခြောက်ငွေညှစ်သော ကျွမ်းကျင်ဟက်ကာ။",
  },
  {
    id: "shimizu",
    name: "ရှီမီဇု (ငွေကြေးခဝါချမှု ဒါရိုက်တာ)",
    role: "တရားမဝင် နိုင်ငံတကာ ငွေကြေးခဝါချမှု",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "22:45",
    subject: "🌐 Offshore Shell Account Routing",
    preview: "အကောင့်များအားလုံးကို စစ်ဆေးပြီးပြီ။ လွှဲပြောင်းမှုကို စတင်ပါ။",
    initialMessage:
      "ငါ့ရဲ့ အကောင့်ကွန်ရက်က အပြည်ပြည်ဆိုင်ရာ စံနှုန်းနဲ့ အပြည့်အဝ ကိုက်ညီတယ်။ သံသယရှိစရာ မလိုပါဘူး။ ငွေလွှဲလမ်းကြောင်းကို အတည်ပြုပါ။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "နိုင်ငံရပ်ခြား Paper Company အမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ငွေကြေးခဝါချသည့် ဘဏ်အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "တရားမဝင် ဒစ်ဂျစ်တယ် ငွေလွှဲစင်တာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "နိုင်ငံတကာ ဘဏ်ကွန်ရက်အတုများဖြင့် ငွေမည်းခဝါချသော ဂိုဏ်း၏ အဓိက ငွေကိုင်။",
  },
  {
    id: "kuroda",
    name: "ကူရိုဒါ (တရားမဝင် အတိုးကြီး ချေးငွေ)",
    role: "တရားမဝင် ငွေတိုးချေးစားသူ",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "12:30",
    subject: "💳 အရေးပေါ် ငွေချေးခွင့်ပြုချက်",
    preview: "အာမခံမလိုဘဲ ငွေသား ယန်း ၁ သန်း အမြန်ချေးပေးမည်...",
    initialMessage:
      "ငွေလိုနေတာလား？ ငါတို့ဆီမှာ အထောက်အထားမလိုဘဲ ချက်ချင်း ငွေရမယ်။ အခုပဲ စာချုပ်ချုပ်မလား？",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "တရားမဝင် ချေးငွေကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ကြွေးမြီ ပြန်လည်ကောက်ခံသည့် အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "ငွေကြေးကောက်ခံရာ အခြေစိုက်စခန်းကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "အတိုးနှုန်း မြင့်မားစွာဖြင့် ငွေချေးပြီး အကြမ်းဖက် ငွေတောင်းခံသော ဂိုဏ်းဝင်။",
  },
  {
    id: "asuka",
    name: "အာဆူကာ (AI Deepfake ဖန်တီးသူ)",
    role: "AI ဗီဒီယိုအတု လိမ်လည်မှု",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "20:10",
    subject: "✨ နာမည်ကြီး အနုပညာရှင်များနှင့် သီးသန့် ရင်းနှီးမြှုပ်နှံမှု",
    preview: "ဗီဒီယိုထဲက အတည်ပြုချက်ကို ကြည့်ရှုပြီး အခုပဲ ငွေထည့်ဝင်ပါ...",
    initialMessage:
      "ဟယ်လို～ နာမည်ကြီးတွေတောင် ရင်းနှီးမြှုပ်နှံထားတဲ့ ပရောဂျက်နော်။ သင့်အတွက် အထူး VIP အခွင့်အရေး ပေးမယ်နော်♡",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "ဗီဒီယိုဖန်တီးသော လျှို့ဝှက်ကုမ္ပဏီကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "VIP ရင်းနှီးမြှုပ်နှံမှု အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "AI ဗီဒီယို စတူဒီယို အခြေစိုက်နေရာကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "Deepfake နည်းပညာဖြင့် နာမည်ကြီးများ၏ ပုံရိပ်အတု ပြုလုပ်၍ ငွေလိမ်လည်သူ။",
  },
  {
    id: "kiryu",
    name: "ကီရူး (Dark Web ဒေတာ ပွဲစား)",
    role: "Darknet SIM Swap & Dossier Broker",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "04:50",
    subject: "🕶️ Darknet Dossier Vault Access",
    preview: "အချက်အလက် အစစ်အမှန် လိုချင်ရင် တိုက်ရိုက် ငွေလွှဲပေးပါ...",
    initialMessage:
      "ငါ့ဆီမှာ မင်းရှာနေတဲ့ ဒေတာတွေ အကုန်ရှိတယ်။ ဒါပေမဲ့ ရဲတွေ သုံးတဲ့ လှည့်ကွက်တွေ ငါ့ဆီ လာမသုံးနဲ့။",
    cleared: false,
    missions: [
      { id: 1, name: "Darknet တိုက်ရိုက် ID ကို ဖော်ထုတ်ရန်", found: false },
      { id: 2, name: "Darknet ဘဏ်အကောင့်ကို ဖော်ထုတ်ရန်", found: false },
      { id: 3, name: "SIM Swap ကွန်ရက် စင်တာကို ဖော်ထုတ်ရန်", found: false },
    ],
    description:
      "Dark Web ပေါ်တွင် အဆင့်မြင့် ဖောက်ထွင်းအချက်အလက်များကို ရောင်းဝယ်ဖောက်ကားသူ။",
  },
  {
    id: "saeki",
    name: "ဆာအဲကီ (Ransomware ညှိနှိုင်းရေးမှူး)",
    role: "Ransomware ဖျက်ဆီးရေး လိမ်လည်သူ",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "17:35",
    subject: "🔒 ကုမ္ပဏီဒေတာ ပြန်လည်ရယူရေး ညှိနှိုင်းမှု",
    preview: "ဒေတာများ ပြန်လိုချင်ပါက လျော်ကြေးငွေကို အမြန်ပေးချေပါ...",
    initialMessage:
      "ကျွန်တော်က ကြားနေ ညှိနှိုင်းရေးမှူးပါ။ သင့် ကုမ္ပဏီ ဒေတာတွေကို ပြန်ရဖို့ သတ်မှတ်ထားတဲ့ လျော်ကြေးငွေကို လွှဲပေးပါ။",
    cleared: false,
    missions: [
      { id: 1, name: "Dummy ကုမ္ပဏီအမည်ကို ဖော်ထုတ်ရန်", found: false },
      {
        id: 2,
        name: "Ransomware လျော်ကြေး အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      { id: 3, name: "ဟက်ကာ ချန်နယ်ကို ဖော်ထုတ်ရန်", found: false },
    ],
    description:
      "ကုမ္ပဏီများ၏ ဒေတာများကို ပိတ်ပင်ပြီး ပြန်လည်ရယူပေးမည်ဟု ဆိုကာ ငွေညှစ်သော ကြားခံလူ။",
  },
  {
    id: "tachibana",
    name: "တာချီဘာနာ (တရားမဝင် မြေအောက်ဘဏ်)",
    role: "တရားမဝင် နိုင်ငံတကာ မြေအောက်ဘဏ်",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "21:15",
    subject: "🏦 Underground Bank Clearance Route",
    preview: "ခြေရာခံမရသော လျှို့ဝှက်ငွေလွှဲစနစ် စတင်ပါပြီ...",
    initialMessage:
      "ကျွန်ုပ်တို့၏ ဘဏ်စနစ်သည် မည်သည့် အစိုးရမျှ ခြေရာခံနိုင်ခြင်း မရှိပါ။ သင့် ရန်ပုံငွေများကို လွှဲပြောင်းလိုက်ပါ။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "မြေအောက်ဘဏ်အမည်နှင့် စင်တာကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ဗဟို ထိန်းချုပ်ရေး အကောင့်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "မှောင်ခို ငွေလွှဲကွန်ရက် တစ်ခုလုံးကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "တရားမဝင် ငွေကြေးများကို နိုင်ငံရပ်ခြားသို့ လျှို့ဝှက်လွှဲပြောင်းပေးသော မြေအောက်ဘဏ် မန်နေဂျာ။",
  },
  {
    id: "kisaragi",
    name: "ကီဆာရာဂီ (ဂိုဏ်း၏ ထောက်လှမ်းရေးမှူး)",
    role: "အထူး ဆိုက်ဘာ ထောက်လှမ်းရေး အေးဂျင့်",
    danger: "အန္တရာယ်: အလွန်မြင့်မား",
    dangerLevel: "hard",
    lastTime: "01:00",
    subject: "👁️ မင်းရဲ့ အထောက်အထားကို ငါသိပြီးပြီ",
    preview: "ရဲဌာနချုပ်ရဲ့ ဆက်သွယ်ရေးတွေကို ငါတို့ အကုန်ကြားဖြတ်ထားတယ်...",
    initialMessage:
      "စုံစမ်းရေးမှူး၊ မင်းရဲ့ လုပ်ဖော်ကိုင်ဖက်တွေတောင် ငါတို့ဘက် ပါလာပြီ။ အခုပဲ အရှုံးပေးလိုက်တာ မင်းအတွက် အကောင်းဆုံးပဲ။",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "လှည့်စားထားသော သတင်းအချက်အလက်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ဗဟို ညွှန်ကြားရေး ဌာနချုပ်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 3,
        name: "လျှို့ဝှက် ဆက်သွယ်ရေး ချန်နယ်ကို ဖော်ထုတ်ရန်",
        found: false,
      },
    ],
    description:
      "စုံစမ်းရေးမှူးများကို စိတ်ပိုင်းဆိုင်ရာ ခြိမ်းခြောက်ပြီး လှည့်ဖြားတတ်သော ဂိုဏ်း၏ ထိပ်တန်း အေးဂျင့်။",
  },

  // 👑 MASTER
  {
    id: "master_boss",
    name: "ဂိုဏ်းချုပ် Lv.1: ဖန်တွမ် (Phantom)",
    role: "ဂိုဏ်းချုပ် ခေါင်းဆောင်ကြီး",
    danger: "အန္တရာယ်: အဆုံးစွန် Lv.1",
    dangerLevel: "master",
    lastTime: "ယခုလေးတင်",
    subject: "👑 မိုက်မဲသော လျှို့ဝှက်စုံစမ်းရေးမှူးထံသို့",
    preview: "ငါတို့ရဲ့ အမှန်တရားကို သိချင်ရင် တန်ဖိုးကြီးကြီး ပေးရမယ်...",
    initialMessage:
      "ဟားဟား၊ ဒီအထိ ရောက်လာနိုင်ခဲ့တာပဲ။ ဒါပေမဲ့ ငါတို့ရဲ့ အစီအစဉ်ကို ဘယ်သူမှ မတားနိုင်ဘူး။ သတ္တိရှိရင် ငါ့ကို အနိုင်ယူကြည့်စမ်း！",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "ဂိုဏ်းချုပ်၏ အမည်ရင်းနှင့် အခြေစိုက်စခန်းကို ဖော်ထုတ်ရန်",
        found: false,
      },
      {
        id: 2,
        name: "ဂိုဏ်းတစ်ခုလုံး၏ ဘဏ်အကောင့်အားလုံးကို သိမ်းဆည်းရန်",
        found: false,
      },
      {
        id: 3,
        name: "ဂိုဏ်းပြိုကွဲစေမည့် လျှို့ဝှက်ကုဒ်ကို ရယူရန်",
        found: false,
      },
    ],
    description:
      "နိုင်ငံတကာ လိမ်လည်မှု ကွန်ရက်တစ်ခုလုံး၏ အမြင့်ဆုံး ခေါင်းဆောင်ကြီး။",
  },
];

const CONTACTS_NE: Contact[] = [
  // 🟢 EASY
  {
    id: "sato",
    name: "सातो (साइड जब एजेन्ट)",
    role: "साइड जब ठग",
    danger: "जोखिम: कम",
    dangerLevel: "easy",
    lastTime: "10:42",
    subject: "【महत्त्वपूर्ण】पहिलो भुक्तानी प्राप्त गर्ने बारे",
    preview: "तोकिएको खातामा दर्ता अझै पूरा भएको छैन।",
    initialMessage:
      "दर्ता गर्नुभएकोमा धन्यवाद! म प्रतिनिधि सातो हुँ। आजबाट साइड जब सुरु हुन्छ। पहिले सजिलो कामको बारेमा बताउँछु।",
    cleared: false,
    missions: [
      { id: 1, name: "संस्थाको आधिकारिक नाम पत्ता लगाउनुहोस्", found: false },
    ],
    description: "स्मार्टफोन साइड जबको नाममा दर्ता शुल्क ठगी गर्ने व्यक्ति।",
  },
  {
    id: "yamada",
    name: "यामादा (अन्तर्राष्ट्रिय रोमान्स ठग)",
    role: "रोमान्स र रकम स्थानान्तरण ठगी",
    danger: "जोखिम: कम",
    dangerLevel: "easy",
    lastTime: "३ दिन अघि",
    subject: "✈️ जापान फर्केपछि सँगै बसौंला",
    preview: "विमानस्थल भन्सारमा सामान अड्किएको छ...",
    initialMessage:
      "नमस्ते! तपाईंको प्रोफाइल देखेर म मोहित भएँ। म चाँडै जापान आउँदैछु, सँगै व्यापार गर्ने होइन त?",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "विदेशमा रकम पठाउने खाता नम्बर पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description:
      "मायाको नाटक गरी भन्सार शुल्कको बहानामा विदेशमा रकम पठाउन लगाउने अन्तर्राष्ट्रिय ठग।",
  },
  {
    id: "suzuki",
    name: "सुजुकी (ग्राहक सेवा र भुक्तानी ठग)",
    role: "नक्कली बिलिङ गिरोह",
    danger: "जोखिम: कम",
    dangerLevel: "easy",
    lastTime: "१ घण्टा अघि",
    subject: "⚠️ 【अति जरुरी】सदस्यता शुल्क भुक्तानी बाँकी बारे",
    preview: "आजै सम्पर्क नगरेमा अदालतमा मुद्दा दायर गरिनेछ।",
    initialMessage:
      "म ग्राहक सेवाबाट सुजुकी हुँ। तपाईंले दर्ता गर्नुभएको भिडियो सेवाको बक्यौता (३९,८०० येन) बाँकी छ। तुरुन्त भुक्तानी खाता उपलब्ध गराउँछु।",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "बिलिङ गर्ने कम्पनीको नाम पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description:
      "नक्कली बक्यौताको नाममा अदालतको धम्की दिएर रकम असुल्ने अपराधी।",
  },

  // 🟡 MEDIUM
  {
    id: "tanaka",
    name: "तानाका (एआई लगानी सल्लाहकार)",
    role: "एफएक्स र एआई लगानी ठगी",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "14:15",
    subject: "📈 एआई स्वचालित लगानी योजना",
    preview:
      "महिनामा ३०% नाफाको ग्यारेन्टी भएको भीआईपी खातामा रकम पठाउनुहोस्...",
    initialMessage:
      "नमस्ते! तपाईंको लागि विशेष एआई लगानी अवसर ल्याएको छु। रकम जम्मा गर्न तयार हुनुहुन्छ?",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "वास्तविक लगानी कम्पनीको नाम पत्ता लगाउनुहोस्",
        found: false,
      },
      {
        id: 2,
        name: "भीआईपी रकम जम्मा गर्ने खाता पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description: "एआई प्रविधिको प्रलोभन देखाई रकम जम्मा गर्न लगाउने ठग।",
  },
  {
    id: "kato",
    name: "कातो (गैरकानूनी पार्सल दलाल)",
    role: "अवैध कुरियर दलाल",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "हिजो",
    subject: "📦 पार्सल ओसारपसार शुल्क २ लाख येन",
    preview: "तोकिएको लकरबाट सामान उठाएर पुर्याए पुग्छ...",
    initialMessage:
      "काम खोज्दै हुनुहुन्छ? लकरबाट पार्सल पुर्याएर २ लाख येन तुरुन्त कमाउनुहोस्। तयार हुनुहुन्छ?",
    cleared: false,
    missions: [
      { id: 1, name: "गिरोहको गोप्य कोड नाम पत्ता लगाउनुहोस्", found: false },
      {
        id: 2,
        name: "सामान हस्तान्तरण गर्ने गोप्य स्थान पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description: "नगदको प्रलोभन देखाएर अवैध सामान ओसारपसार गराउने दलाल।",
  },
  {
    id: "watanabe",
    name: "वातानाबे (नक्कली टिकट बिक्रेता)",
    role: "टिकट रिसेल ठग",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "16:40",
    subject: "🎟️ विशेष कन्सर्ट टिकटहरू उपलब्ध",
    preview: "अग्रिम रकम पठाएपछि टिकट तुरुन्त पठाइनेछ।",
    initialMessage:
      "कन्सर्ट टिकट खोज्दै हुनुहुन्छ? मसँग भीआईपी टिकट बाँकी छ। रकम पठाएर अहिले नै लिनुहोस्।",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "नक्कली पसलको आधिकारिक नाम पत्ता लगाउनुहोस्",
        found: false,
      },
      {
        id: 2,
        name: "भुक्तानी गर्ने बैंक खाता पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description: "दुर्लभ टिकटको बहानामा अग्रिम रकम असुल्ने ठग।",
  },
  {
    id: "mori",
    name: "मोरी (चिठ्ठा र अनुदान ठग)",
    role: "इनाम र अनुदान ठगी",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "२ दिन अघि",
    subject: "🎁 १० लाख डलरको विशेष अनुदान विजेता चयन हुनुभयो",
    preview: "कर शुल्क ५०,००० येन पठाएपछि अनुदान रकम पठाइनेछ।",
    initialMessage:
      "बधाई छ! तपाईं १० लाख डलर अनुदानको लागि छानिनुभएको छ। रकम प्राप्त गर्न पहिले कर तिर्नुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "नक्कली फाउन्डेसनको नाम पत्ता लगाउनुहोस्", found: false },
      {
        id: 2,
        name: "कर प्राप्त गर्ने बैंक खाता पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description: "नक्कली चिठ्ठाको नाममा अग्रिम कर शुल्क ठगी गर्ने व्यक्ति।",
  },
  {
    id: "ogawa",
    name: "ओगावा (क्रिप्टो माइनिङ ठग)",
    role: "नक्कली क्रिप्टो लगानी",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "11:20",
    subject: "💎 AI Crypto Mining Liquidity Pool",
    preview: "न्यूनतम रकम जम्मा गरी दैनिक उच्च प्रतिफल प्राप्त गर्नुहोस्।",
    initialMessage:
      "हाम्रो एआई क्रिप्टो पूलमा सामेल हुनुहोस्। वालेटमा रकम जम्मा गर्न तयार हुनुहुन्छ?",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "नक्कली एक्सचेन्ज संस्थाको नाम पत्ता लगाउनुहोस्",
        found: false,
      },
      { id: 2, name: "क्रिप्टो वालेट ठेगाना पत्ता लगाउनुहोस्", found: false },
    ],
    description: "क्रिप्टो माइनिङको प्रलोभन देखाई रकम हिनामिना गर्ने ठग।",
  },
  {
    id: "hashimoto",
    name: "हाशिमोतो (नक्कली एस्क्रो भुक्तानी ठग)",
    role: "अनलाइन एस्क्रो ठगी",
    danger: "जोखिम: मध्यम",
    dangerLevel: "medium",
    lastTime: "18:05",
    subject: "🛡️ सुरक्षित एस्क्रो भुक्तानी प्रणाली",
    preview: "सुरक्षा धरौटी रकम तलको खातामा जम्मा गर्नुहोस्...",
    initialMessage:
      "सुरक्षित कारोबार सुरु गर्न आवश्यक सुरक्षा धरौटी रकम तुरुन्त पठाउनुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "एस्क्रो कम्पनीको नाम पत्ता लगाउनुहोस्", found: false },
      { id: 2, name: "धरौटी खाता नम्बर पत्ता लगाउनुहोस्", found: false },
    ],
    description: "सुरक्षित कारोबारको बहानामा धरौटी रकम ठगी गर्ने व्यक्ति।",
  },

  // 🔴 HARD
  {
    id: "black",
    name: "अज्ञात प्रेषक (सिन्डिकेट अधिकारी)",
    role: "साइबर डाटा चोरी गिरोह",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "भर्खरै",
    subject: "🚨 [चेतावनी] गोप्य डाटाबेस बजार",
    preview: "हाम्रो डाटा किन्न चाहनुहुन्छ भने ठूलो मूल्य चुकाउनुपर्छ...",
    initialMessage:
      "हाम्रो डाटामा रुचि छ? तर म साधारण मानिससँग कुरा गर्दिनँ। तपाईं को हुनुहुन्छ?",
    cleared: false,
    missions: [
      { id: 1, name: "नक्कली जानकारीको भ्रम तोड्नुहोस्", found: false },
      { id: 2, name: "नाइकेको प्रत्यक्ष आईडी पत्ता लगाउनुहोस्", found: false },
      {
        id: 3,
        name: "केन्द्रीय डाटाबेस सर्भर स्थान पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description:
      "महत्त्वपूर्ण व्यक्तिगत विवरणहरू कालोबजारी गर्ने उच्च सिन्डिकेट सदस्य।",
  },
  {
    id: "viper",
    name: "भाइपर (साइबर जबरजस्ती असुली ठग)",
    role: "फिसिङ र धम्की अपरेशन",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "03:12",
    subject: "💀 तपाईंको व्यक्तिगत डाटा मेरो नियन्त्रणमा छ",
    preview: "२४ घण्टाभित्र रकम नपठाए सबै विवरण इन्टरनेटमा सार्वजनिक गरिनेछ...",
    initialMessage:
      "तपाईंको गोप्य विवरण मसँग छ। इज्जत बचाउन तुरुन्त रकम पठाउनुहोस्!",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "नक्कली सुरक्षा कम्पनीको नाम पत्ता लगाउनुहोस्",
        found: false,
      },
      {
        id: 2,
        name: "असुली रकम जम्मा गर्ने खाता पत्ता लगाउनुहोस्",
        found: false,
      },
      { id: 3, name: "भाइपरको गोप्य ठेगाना पत्ता लगाउनुहोस्", found: false },
    ],
    description: "ह्याक गरिएको डाटा देखाएर धम्की दिई रकम असुल्ने साइबर अपराधी।",
  },
  {
    id: "shimizu",
    name: "शिमिजु (सम्पत्ति शुद्धीकरण निर्देशक)",
    role: "अन्तर्राष्ट्रिय कालोधन शुद्धीकरण",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "22:45",
    subject: "🌐 अफसोर खाता स्थानान्तरण मार्ग",
    preview: "सबै खाताहरू प्रमाणित भइसकेका छन्। रकम पठाउनुहोस्।",
    initialMessage:
      "हाम्रो बैंकिङ नेटवर्क अन्तर्राष्ट्रिय रूपमा प्रमाणित छ। शंका नगर्नुहोस्, रकम पठाउनुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "विदेशी शेल कम्पनीको नाम पत्ता लगाउनुहोस्", found: false },
      {
        id: 2,
        name: "सम्पत्ति शुद्धीकरण गर्ने बैंक खाता पत्ता लगाउनुहोस्",
        found: false,
      },
      { id: 3, name: "अवैध क्रिप्टो हब स्थान पत्ता लगाउनुहोस्", found: false },
    ],
    description:
      "कालोधनलाई विभिन्न विदेशी खाताहरू मार्फत शुद्धीकरण गर्ने मुख्य वित्तीय निर्देशक।",
  },
  {
    id: "kuroda",
    name: "कुरोदा (अवैध चर्को ब्याज ऋणदाता)",
    role: "अवैध मिटरब्याजी गिरोह",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "12:30",
    subject: "💳 तत्काल ऋण स्वीकृति सूचना",
    preview: "बिना धितो १० लाख येन तत्काल ऋण उपलब्ध छ...",
    initialMessage:
      "रकम आवश्यक छ? हामी बिना कागजात तत्काल नगद दिन्छौं। अहिले सम्झौता गर्ने?",
    cleared: false,
    missions: [
      { id: 1, name: "अवैध ऋण संस्थाको नाम पत्ता लगाउनुहोस्", found: false },
      { id: 2, name: "ऋण असुली खाता पत्ता लगाउनुहोस्", found: false },
      { id: 3, name: "असुली केन्द्रको ठेगाना पत्ता लगाउनुहोस्", found: false },
    ],
    description: "अत्यधिक ब्याजमा ऋण दिएर हिंसात्मक असुली गर्ने अपराधी।",
  },
  {
    id: "asuka",
    name: "असुका (एआई डिपफेक निर्माता)",
    role: "नक्कली एआई भिडियो ठगी",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "20:10",
    subject: "✨ सेलिब्रेटीहरूसँगको विशेष लगानी साझेदारी",
    preview: "भिडियो प्रमाण हेर्नुहोस् र अहिले नै लगानी गर्नुहोस्...",
    initialMessage:
      "नमस्ते～ चर्चित सेलिब्रेटीहरूले पनि लगानी गरेको विशेष परियोजना हो। तपाईंलाई भीआईपी सिट दिन्छु♡",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "भिडियो निर्माण गर्ने कम्पनीको नाम पत्ता लगाउनुहोस्",
        found: false,
      },
      { id: 2, name: "भीआईपी लगानी खाता पत्ता लगाउनुहोस्", found: false },
      { id: 3, name: "एआई स्टुडियोको स्थान पत्ता लगाउनुहोस्", found: false },
    ],
    description:
      "डिपफेक प्रविधिबाट चर्चित व्यक्तिहरूको नक्कली भिडियो बनाई ठगी गर्ने व्यक्ति।",
  },
  {
    id: "kiryu",
    name: "किरियु (डार्क वेब डाटा दलाल)",
    role: "Darknet SIM Swap & Dossier Broker",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "04:50",
    subject: "🕶️ Darknet Dossier Vault Access",
    preview: "वास्तविक डाटा चाहनुहुन्छ भने सिधै रकम पठाउनुहोस्...",
    initialMessage:
      "मसँग सबै डाटा छ। तर प्रहरीको चाल ममाथि चलाउने प्रयास नगर्नुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "डार्कनेट प्रत्यक्ष आईडी पत्ता लगाउनुहोस्", found: false },
      { id: 2, name: "डार्कनेट बैंक खाता पत्ता लगाउनुहोस्", found: false },
      { id: 3, name: "सिम स्वाप रिले केन्द्र पत्ता लगाउनुहोस्", found: false },
    ],
    description:
      "डार्क वेबमा गोप्य व्यक्तिगत विवरणहरू अवैध रूपमा किनबेच गर्ने दलाल।",
  },
  {
    id: "saeki",
    name: "साएकी (र्यान्समवेयर वार्ताकार)",
    role: "र्यान्समवेयर मध्यस्थता ठग",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "17:35",
    subject: "🔒 कम्पनी डाटा पुनर्प्राप्ति वार्ता",
    preview: "डाटा फिर्ता चाहनुहुन्छ भने तुरुन्त फिरौती तिर्नुहोस्...",
    initialMessage:
      "म तटस्थ वार्ताकार हुँ। तपाईंको डाटा फिर्ता गर्न तोकिएको फिरौती खातामा रकम पठाउनुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "नक्कली कम्पनीको नाम पत्ता लगाउनुहोस्", found: false },
      { id: 2, name: "फिरौती खाता पत्ता लगाउनुहोस्", found: false },
      { id: 3, name: "ह्याकर सञ्चार च्यानल पत्ता लगाउनुहोस्", found: false },
    ],
    description:
      "कम्पनीको डाटा बन्दक बनाई मध्यस्थताको नाममा फिरौती असुल्ने व्यक्ति।",
  },
  {
    id: "tachibana",
    name: "ताचिबाना (अन्तर्राष्ट्रिय भूमिगत बैंक)",
    role: "अवैध भूमिगत वित्तीय सञ्जाल",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "21:15",
    subject: "🏦 Underground Bank Clearance Route",
    preview: "पत्ता लगाउन नसकिने गोप्य स्थानान्तरण प्रणाली सुरु भयो...",
    initialMessage:
      "हाम्रो बैंकिङ प्रणाली कुनै पनि सरकारले पत्ता लगाउन सक्दैन। रकम स्थानान्तरण गर्नुहोस्।",
    cleared: false,
    missions: [
      { id: 1, name: "भूमिगत बैंकको नाम र हब पत्ता लगाउनुहोस्", found: false },
      {
        id: 2,
        name: "केन्द्रीय नियन्त्रण खाता पत्ता लगाउनुहोस्",
        found: false,
      },
      {
        id: 3,
        name: "छाया मार्गको सम्पूर्ण सञ्जाल पत्ता लगाउनुहोस्",
        found: false,
      },
    ],
    description:
      "कालोधनलाई बिना अभिलेख विदेशमा स्थानान्तरण गर्ने भूमिगत बैंक सञ्चालक।",
  },
  {
    id: "kisaragi",
    name: "किसारागी (सिन्डिकेट गुप्तचर अधिकारी)",
    role: "सिन्डिकेट प्रति-गुप्तचरी एजेन्ट",
    danger: "जोखिम: अत्यधिक",
    dangerLevel: "hard",
    lastTime: "01:00",
    subject: "👁️ तपाईंको वास्तविक पहिचान मलाई थाहा छ",
    preview: "प्रहरी मुख्यालयको सञ्चार हामीले नियन्त्रण गरिसकेका छौं...",
    initialMessage:
      "अनुसन्धानकर्ता, तपाईंको आफ्नै टोलीले पनि तपाईंलाई धोका दिइसकेको छ। आत्मसमर्पण गर्नु नै बुद्धिमानी हुनेछ।",
    cleared: false,
    missions: [
      { id: 1, name: "नक्कली मनोवैज्ञानिक भ्रम तोड्नुहोस्", found: false },
      { id: 2, name: "केन्द्रीय कमाण्ड सेन्टर पत्ता लगाउनुहोस्", found: false },
      { id: 3, name: "गोप्य सञ्चार च्यानल पत्ता लगाउनुहोस्", found: false },
    ],
    description:
      "अनुसन्धानकर्ताहरूलाई मानसिक दबाब र भ्रम सिर्जना गरी झुक्याउने सिन्डिकेटको शीर्ष गुप्तचर।",
  },

  // 👑 MASTER
  {
    id: "master_boss",
    name: "सर्वोच्च Lv.1: फ्यान्टम (प्रमुख नाइके)",
    role: "सिन्डिकेट सुप्रिम कमाण्डर",
    danger: "जोखिम: चरम Lv.1",
    dangerLevel: "master",
    lastTime: "भर्खरै",
    subject: "👑 मूर्ख अण्डरकभर एजेन्टलाई",
    preview: "हाम्रो सत्यता जान्न ठूलो मूल्य चुकाउनुपर्छ...",
    initialMessage:
      "तपाईं यहाँसम्म आइपुग्नुभयो। तर हाम्रो योजना कसैले रोक्न सक्दैन। हिम्मत छ भने मलाई हराएर देखाउनुहोस्!",
    cleared: false,
    missions: [
      {
        id: 1,
        name: "नाइकेको वास्तविक नाम र मुख्य अखडा पत्ता लगाउनुहोस्",
        found: false,
      },
      {
        id: 2,
        name: "सिन्डिकेटका सम्पूर्ण बैंक खाताहरू जफत गर्नुहोस्",
        found: false,
      },
      {
        id: 3,
        name: "सिन्डिकेट पतन गराउने गोप्य कोड प्राप्त गर्नुहोस्",
        found: false,
      },
    ],
    description:
      "सम्पूर्ण अन्तर्राष्ट्रिय ठगी सिन्डिकेटको सर्वोच्च योजनाकार र नाइके।",
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

const ENDLESS_BOSS_NAMES_MY = [
  "အရိပ် ဧကရာဇ် (မှောင်မိုက်ခေါင်းဆောင်)",
  "မိခင် AI (ဆိုက်ဘာ ရာဇဝတ်မှု ထောက်လှမ်းရေး)",
  "ကာတယ် အကြီးအကဲ 'လီဗီယာသန်'",
  "မှောင်မိုက် ငွေကြေးအရှင် 'ပရိုဗီဒန့်စ်'",
  "အိုမီဂါ ဆိုက်ဘာဂိုဏ်းချုပ်",
  "ကမ္ဘာလုံးဆိုင်ရာ ဆိုက်ဘာခေါင်းဆောင်ကြီး",
];

const ENDLESS_BOSS_NAMES_NE = [
  "छाया सम्राट (कालो नाइके)",
  "मदर एआई (साइबर अपराध कृत्रिम बुद्धिमत्ता)",
  "कार्टेल मालिक 'लेभियाथन'",
  "छाया वित्त सम्राट 'प्रोभिडेन्स'",
  "ओमेगा साइबर सिन्डिकेट ग्रान्डमास्टर",
  "ग्लोबल साइबर समूह प्रमुख",
];

export default function DashboardPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState<"ja" | "en" | "my" | "ne">("ja");

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
        (localStorage.getItem("scam_lang") as "ja" | "en" | "my" | "ne") ||
        "ja";
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

        const activeContacts =
          savedLang === "en"
            ? CONTACTS_EN
            : savedLang === "my"
              ? CONTACTS_MY
              : savedLang === "ne"
                ? CONTACTS_NE
                : CONTACTS_JA;
        let loadedContacts = activeContacts;

        // 保存された捜査進捗（クリア状態・証拠発見状況）の復元
        const savedProgressStr = localStorage.getItem("scam_contacts_progress");
        if (savedProgressStr) {
          try {
            const savedProgress = JSON.parse(savedProgressStr);
            loadedContacts = activeContacts.map((ac) => {
              const sp = savedProgress.find((p: any) => p.id === ac.id);
              if (sp) {
                return {
                  ...ac,
                  cleared: sp.cleared,
                  failed: sp.failed,
                  missions: ac.missions.map((m) => {
                    const sm = sp.missions?.find((em: any) => em.id === m.id);
                    return { ...m, found: sm ? sm.found : m.found };
                  }),
                };
              }
              return ac;
            });
          } catch (e) {
            console.warn("Restore progress error:", e);
          }
        }
        setContacts(loadedContacts);

        // 保存されたチャット履歴の復元
        let loadedChatHistories: Record<string, any[]> = {};
        const savedHistoriesStr = localStorage.getItem("scam_chat_histories");
        if (savedHistoriesStr) {
          try {
            loadedChatHistories = JSON.parse(savedHistoriesStr);
          } catch (e) {
            console.warn("Restore chat history error:", e);
          }
        }

        setChatHistories((prev) => {
          const merged = { ...loadedChatHistories, ...prev };
          loadedContacts.forEach((c) => {
            if (!merged[c.id] || merged[c.id].length === 0) {
              merged[c.id] = [{ sender: "scammer", text: c.initialMessage }];
            }
          });
          return merged;
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

      // セッションまたはローカルストレージが見当たらない場合でも、エージェントとして捜査画面を開く
      const defaultNickname = savedLang === "en" ? "Agent" : "エージェント";
      const defaultEmail = savedEmail || "agent@cyber.gov";
      localStorage.setItem("scam_nickname", defaultNickname);
      localStorage.setItem("scam_email", defaultEmail);
      localStorage.setItem("scam_step", "game");
      applyUserData(defaultNickname, defaultEmail);
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

  // 捜査進捗のローカルストレージへの自動保存
  useEffect(() => {
    if (contacts.length > 0 && !isCheckingAuth) {
      try {
        const progress = contacts.map((c) => ({
          id: c.id,
          cleared: c.cleared,
          failed: c.failed,
          missions: c.missions,
        }));
        localStorage.setItem(
          "scam_contacts_progress",
          JSON.stringify(progress),
        );
      } catch (e) {
        console.warn("Save progress error:", e);
      }
    }
  }, [contacts, isCheckingAuth]);

  // チャット履歴のローカルストレージへの自動保存
  useEffect(() => {
    if (Object.keys(chatHistories).length > 0 && !isCheckingAuth) {
      try {
        localStorage.setItem(
          "scam_chat_histories",
          JSON.stringify(chatHistories),
        );
      } catch (e) {
        console.warn("Save chat error:", e);
      }
    }
  }, [chatHistories, isCheckingAuth]);

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
    const activeContacts =
      lang === "en"
        ? CONTACTS_EN
        : lang === "my"
          ? CONTACTS_MY
          : lang === "ne"
            ? CONTACTS_NE
            : CONTACTS_JA;
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
          dangerLevel: targetContact?.dangerLevel || "easy",
          lang,
        }),
      });
      const data = await response.json();

      if (data.reply) {
        let aiReply = data.reply;
        let isGameOver = false;
        const clearedMissionIds: number[] = [];

        // Strip thinking tags if any leaked
        aiReply = aiReply
          .replace(/<think>[\s\S]*?<\/think>/gi, "")
          .replace(/<thought>[\s\S]*?<\/thought>/gi, "")
          .replace(/^[\s\S]*?<\/think>/gi, "")
          .replace(/^[\s\S]*?<\/thought>/gi, "")
          .replace(/<think>[\s\S]*$/gi, "")
          .replace(/<thought>[\s\S]*$/gi, "")
          .trim();

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
                      "地下指令室",
                      "サーバー室",
                      "スタジオ",
                      "hideout location",
                      "vault",
                      "command",
                    ];
                    if (
                      locationKws.some((kw) =>
                        replyLower.includes(kw.toLowerCase()),
                      )
                    ) {
                      isMatched = true;
                    }
                  }

                  // ブラフ見破り・本名・コード・解体系
                  if (
                    missionName.includes("ブラフ") ||
                    missionName.includes("見破る") ||
                    missionName.includes("見抜く") ||
                    missionName.includes("本名") ||
                    missionName.includes("コード") ||
                    missionName.includes("解体") ||
                    missionName.includes("押収") ||
                    missionName.includes("bluff") ||
                    missionName.includes("code") ||
                    missionName.includes("real name")
                  ) {
                    const bluffKws = [
                      "ブラフ",
                      "見破る",
                      "神崎",
                      "凍結コード",
                      "全シンジケート",
                      "bluff",
                      "kanzaki",
                      "override code",
                      "freeze code",
                    ];
                    if (
                      bluffKws.some((kw) =>
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
                      : lang === "my"
                        ? ENDLESS_BOSS_NAMES_MY
                        : lang === "ne"
                          ? ENDLESS_BOSS_NAMES_NE
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

  const handleLanguageChange = (newLang: "ja" | "en" | "my" | "ne") => {
    setLang(newLang);
    localStorage.setItem("scam_lang", newLang);
    const newContactsBase =
      newLang === "en"
        ? CONTACTS_EN
        : newLang === "my"
          ? CONTACTS_MY
          : newLang === "ne"
            ? CONTACTS_NE
            : CONTACTS_JA;
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
        lang={lang}
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
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />
    </main>
  );
}
