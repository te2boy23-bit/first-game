export type Language = "ja" | "en" | "my" | "ne";

export interface PortalContentData {
  topTag: string;
  topSub: string;
  resumeBtn: string;
  navFeatured: string;
  navCareer: string;
  navSecurity: string;
  navRanking: string;
  loginRegisterBtn: string;
  breadcrumbHome: string;
  breadcrumbCategory: string;
  breadcrumbFeature: string;
  articleTitle: string;
  articleAuthor: string;
  articleDate: string;
  articleViews: string;
  articleBannerBadge: string;
  articleBannerText: string;
  leadText: string;
  heading1: string;
  body1: string;
  rankingBoxTitle: string;
  rank1: string;
  rank2: string;
  rank3: string;
  rank4: string;
  heading2: string;
  body2_1: string;
  body2_2: string;
  heading3: string;
  body3: string;
  commentsTeaser: string;
  sidebarRankingTitle: string;
  sideRank1Title: string;
  sideRank1Meta: string;
  sideRank2Title: string;
  sideRank2Meta: string;
  sideRank3Title: string;
  sideRank3Meta: string;
  promoBadge: string;
  promoTitle: string;
  promoDesc: string;
  promoBtn: string;
  scamBadge: string;
  scamClose: string;
  scamAllocated: string;
  scamCatch: string;
  scamLead: string;
  tabRegister: string;
  tabLogin: string;
  labelNickname: string;
  placeholderNickname: string;
  labelEmail: string;
  labelPassword: string;
  btnRegister: string;
  btnLogin: string;
  socialDivider: string;
  policeBadge: string;
  policeTitle: string;
  policeDesc: string;
  policeFormTitle: string;
  policeBtnStart: string;
  policeBtnLogin: string;
  policeBackToPortal: string;
  warningBadge: string;
  warningTitle: string;
  warningDesc1: string;
  warningDesc2: string;
  warningTargetTitle: string;
  warningName: string;
  warningEmail: string;
  warningDesc3: string;
  warningStartBtn: string;
  footerShareTitle: string;
  footerShareLine: string;
  footerCopyUrl: string;
  footerCopied: string;
  footerDisclaimer: string;
  inAppBannerText: string;
  inAppBannerOpen: string;
  inAppModalTitle: string;
  inAppModalDesc: string;
  inAppModalStepTitle: string;
  inAppModalStep1: string;
  inAppModalStep2: string;
  inAppModalOpenBtn: string;
  inAppModalCopyBtn: string;
  inAppModalEmailChoice: string;
  agentVerifiedBadge: string;
  agentWelcomeBack: string;
  agentResumeDesc: string;
  agentStartGameBtn: string;
  agentSwitchAccountBtn: string;
  agentBackToArticle: string;
}

export const portalContent: Record<Language, PortalContentData> = {
  ja: {
    topTag: "IT & Lifestyle Web Magazine",
    topSub: "暮らしとデジタルの最新トレンドメディア",
    resumeBtn: "🚨 潜入捜査を再開",
    navFeatured: "特集記事",
    navCareer: "副業・キャリア",
    navSecurity: "ITセキュリティ",
    navRanking: "ランキング",
    loginRegisterBtn: "ログイン / 会員登録",
    breadcrumbHome: "HOME",
    breadcrumbCategory: "キャリア・副業",
    breadcrumbFeature: "特集",
    articleTitle:
      "【2026年最新】知っておきたい「在宅ワーク＆ネット副業」の正しい始め方とリスク対策",
    articleAuthor: "✍️ 編集部 ライフキャリア班",
    articleDate: "📅 2026.09.02 公開",
    articleViews: "👁️ 24,510 views",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "スキマ時間で賢く稼ぐ！令和の副業新常識",
    leadText:
      "近年、スマートフォンやPCを活用した在宅ワーク・スキマ時間副業が急速に普及しています。通勤時間や就寝前のちょっとした時間を活用して収入を増やせる選択肢が広がる一方で、インターネット上にはさまざまな情報があふれています。",
    heading1: "1. ネット副業が選ばれる理由と人気ジャンル",
    body1:
      "初心者でも取り組みやすいジャンルとしては、データ入力、アンケートモニター、スキルシェア、SNS運用代行などが挙げられます。自分に合った作業量とスキルに応じてステップアップしていくのが成功の秘訣です。",
    rankingBoxTitle: "📊 2026年 人気副業満足度ランキング",
    rank1: "🥇 1位：オンラインリサーチ・アンケート",
    rank2: "🥈 2位：データ入力・文字起こし",
    rank3: "🥉 3位：Webライティング・校正",
    rank4: "🏅 4位：フリマアプリ不用品販売",
    heading2: "2. 甘い誘惑にご用心！怪しい話の見極め方",
    body2_1:
      "「誰でもポチポチするだけで日給5万円」「未経験から即日100万円」といった極端な高収入案件には注意が必要です。正規の業務では、作業内容に見合った報酬体系が明確に設定されています。",
    body2_2:
      "特に、登録料や教材費を事前請求してくる業者や、指定口座への振り込みを急かす相手には警戒が必要です。",
    heading3: "3. まとめ：安全な環境で第一歩を踏み出そう",
    body3:
      "正しい知識を持って取り組めば、ネット副業はキャリアの大きな可能性を広げてくれます。信頼できるプラットフォームを選び、着実にスキルを磨いていきましょう。",
    commentsTeaser: "💬 この記事の読者コメント・関連広告を読み込み中...",
    sidebarRankingTitle: "🔥 人気記事ランキング",
    sideRank1Title:
      "【特別調査】スマホ完結で月収50万円？話題の副業を試してみた",
    sideRank1Meta: "2026.09.02 • 特集",
    sideRank2Title: "「日給5万円」は本当か？裏案件モニター体験レポート",
    sideRank2Meta: "2026.09.01 • 調査",
    sideRank3Title: "リモートワークで集中力を高める最強デスク環境10選",
    sideRank3Meta: "2026.08.30 • ガジェット",
    promoBadge: "✨ 限定モニター募集中",
    promoTitle: "【即日入金】日給5万円の特別ワーク！？",
    promoDesc: "「簡単な作業だけで即日報酬GET！今すぐ特別枠をチェック」",
    promoBtn: "👉 無料で特別枠を確認する ＞＞",
    scamBadge: "✨ 先着3名様限定・特別シークレット案件",
    scamClose: "閉じる",
    scamAllocated: "🟢 特別モニター枠が割り当てられました",
    scamCatch: "「スマホをタップするだけで日給5万円確定！？」",
    scamLead:
      "簡単な作業ですぐに報酬GET！アカウント作成で秘密のチャット（潜入捜査）を開始できます。",
    tabRegister: "新規アカウント登録",
    tabLogin: "ログインして捜査再開",
    labelNickname: "捜査官コードネーム（ニックネーム）",
    placeholderNickname: "例：カモ太郎",
    labelEmail: "連絡用メールアドレス",
    labelPassword: "パスワード",
    btnRegister: "🚀 無料登録して潜入チャットを開く",
    btnLogin: "捜査（ログイン）を再開する 💻",
    socialDivider: "またはソーシャルアカウントで接続",
    policeBadge: "👮‍♂️ 警視庁 サイバー犯罪対策課 特命スカウト班",
    policeTitle: "見事だ！怪しい詐欺広告を回避したな。",
    policeDesc:
      "君のその高い防犯意識と冷静な判断力を見込んで、警視庁サイバー対策課から特命スカウトだ。現在、ネット上に潜む悪質な詐欺グループを壊滅させるための極秘捜査を進めている。ぜひ、君の頭脳を活かして【おとり捜査官（サイバーエージェント）】として協力してくれないか？",
    policeFormTitle: "📋 【おとり捜査官アカウント登録・ログイン】",
    policeBtnStart: "おとり捜査官として任務を開始する 🚨",
    policeBtnLogin: "捜査を再開する 💻",
    policeBackToPortal: "◀ ホームページに戻って記事を読む",
    warningBadge: "⚠️ 警視庁 サイバー犯罪対策課 緊急通信",
    warningTitle: "おい、危ないところだったぞ！",
    warningDesc1:
      "あんな怪しい高額副業に個人情報を入力するのは極めて危険だ。本来なら完全に詐欺グループにカモられるところだったぞ！",
    warningDesc2:
      "……だが安心しろ！今回は我々サイバー対策課が事前に通信を傍受・保護していたため、実際の被害は一切発生していない。",
    warningTargetTitle: "【保護されたターゲット情報】",
    warningName: "登録名",
    warningEmail: "連絡先",
    warningDesc3:
      "怪我の功名だ。今入力したデータを使って奴らのサーバーへ逆に侵入し、組織の全貌と証拠を暴く【おとり捜査官】として任務に就いてもらう！",
    warningStartBtn: "捜査任務を開始する ＞",
    footerShareTitle: "友達にシェアして捜査官を増やそう！",
    footerShareLine: "LINEでシェア",
    footerCopyUrl: "URLコピー",
    footerCopied: "✔ コピー済",
    footerDisclaimer:
      "※本サイトは防犯啓発を目的としたシミュレーションゲームです。",
    inAppBannerText:
      "LINE等のアプリ内ブラウザで開いています。Googleログインや快適な操作には外部ブラウザをご利用ください。",
    inAppBannerOpen: "Safari / Chromeで開く",
    inAppModalTitle: "外部ブラウザで開く案内",
    inAppModalDesc:
      "Googleログインは、LINEやSNSアプリ内の制限（セキュリティ方針）によりブロックされる場合があります。",
    inAppModalStepTitle: "💡 外部ブラウザ（Safari / Chrome）で開く手順：",
    inAppModalStep1: "① 下の『Safari / Chromeで開く』ボタンをタップ",
    inAppModalStep2:
      "② または画面右上の『…』メニューから『ブラウザで開く』を選択してください。",
    inAppModalOpenBtn: "Safari / Chrome で開く",
    inAppModalCopyBtn: "URLをコピーしてSafari/Chromeに貼り付け",
    inAppModalEmailChoice:
      "メールアドレスで登録・ログインする（そのままプレイ可能） ＞",
    agentVerifiedBadge: "🚨 警視庁サイバー対策課 捜査官認証済",
    agentWelcomeBack: "おとり捜査官 認証完了",
    agentResumeDesc:
      "アクティブな潜入捜査セッションが保持されています。捜査本部（チャット端末）へ接続し、任務を開始してください！",
    agentStartGameBtn: "🚨 ゲームを始める（捜査画面へ進む）",
    agentSwitchAccountBtn: "🔄 別のアカウントでログイン / 新規登録",
    agentBackToArticle: "◀ マガジン記事に戻る",
  },
  en: {
    topTag: "IT & Lifestyle Web Magazine",
    topSub: "Latest Digital & Tech Trends Media",
    resumeBtn: "🚨 Resume Mission",
    navFeatured: "Featured",
    navCareer: "Career",
    navSecurity: "Security",
    navRanking: "Ranking",
    loginRegisterBtn: "Login / Register",
    breadcrumbHome: "HOME",
    breadcrumbCategory: "Career & Work",
    breadcrumbFeature: "Special",
    articleTitle:
      "【2026 Guide】How to Safely Start Remote Work & Side Hustles: Top Tips & Risks",
    articleAuthor: "✍️ Editorial Staff (Career Division)",
    articleDate: "📅 Sept 02, 2026",
    articleViews: "👁️ 24,510 views",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "Smart Career Choices for 2026: Remote Work Trends",
    leadText:
      "In recent years, remote side gigs and flexible online work using smartphones and PCs have grown rapidly. While opportunities to earn extra income in spare moments expand, the internet is also flooded with misleading advertisements and dubious offers.",
    heading1: "1. Why Online Side Hustles Are Booming & Popular Categories",
    body1:
      "Accessible beginner categories include data entry, online research surveys, freelance skill-sharing, and social media moderation. The key to sustainable success is pacing yourself and choosing tasks aligned with your abilities.",
    rankingBoxTitle: "📊 2026 Top Online Job Satisfaction Rankings",
    rank1: "🥇 #1: Online Research & Paid Surveys",
    rank2: "🥈 #2: Data Entry & Transcription",
    rank3: "🥉 #3: Web Writing & Proofreading",
    rank4: "🏅 #4: E-Commerce & Reselling Unused Items",
    heading2: "2. Beware of Sweet Temptations: Spotting Suspicious Offers",
    body2_1:
      "Be extremely cautious of claims like '$500 daily just by tapping your phone' or '$10,000 in your first week with zero experience'. Legitimate businesses always maintain clear compensation structures matched to actual workloads.",
    body2_2:
      "In particular, stay vigilant against operators demanding advance 'training fees', 'registration deposits', or pressuring for immediate bank wires.",
    heading3: "3. Summary: Taking Safe Steps in Digital Careers",
    body3:
      "When approached with sound knowledge, remote work offers enormous potential for your career. Choose verified platforms, protect your privacy, and build real skills steadily.",
    commentsTeaser: "💬 Loading reader comments and related topics...",
    sidebarRankingTitle: "🔥 Trending Articles",
    sideRank1Title:
      "【Investigation】$5,000/Month on Your Phone? We Tested the Viral Side Job",
    sideRank1Meta: "2026.09.02 • Special",
    sideRank2Title: "Is '$500 a Day' Real? Undercover Tester Experience Report",
    sideRank2Meta: "2026.09.01 • Report",
    sideRank3Title: "10 Best Desk Setups to Boost Focus in Remote Work",
    sideRank3Meta: "2026.08.30 • Gadgets",
    promoBadge: "✨ Exclusive Monitors Wanted",
    promoTitle: "【Instant Payout】$500/Day Exclusive Work!?",
    promoDesc:
      "Easy online tasks for instant rewards! Claim your secret monitor slot now.",
    promoBtn: "👉 Check Secret Slot for Free ＞＞",
    scamBadge: "✨ Only 3 Slots Left • Top Secret Project",
    scamClose: "Close",
    scamAllocated: "🟢 Exclusive Monitor Slot Assigned to You",
    scamCatch: "Earn $500/Day with Simple Phone Taps!?",
    scamLead:
      "Quick tasks for instant payout! Create your account to start the secret undercover chat.",
    tabRegister: "New Agent Register",
    tabLogin: "Login to Resume",
    labelNickname: "Agent Code-Name (Nickname)",
    placeholderNickname: "e.g. Ace Detective",
    labelEmail: "Contact Email Address",
    labelPassword: "Password",
    btnRegister: "🚀 Free Register & Open Undercover Chat",
    btnLogin: "Resume Investigation (Login) 💻",
    socialDivider: "Or connect with social account",
    policeBadge: "👮‍♂️ Cyber Crime Division Secret Recruitment Unit",
    policeTitle: "Well done! You avoided a suspicious scam trap.",
    policeDesc:
      "Recognizing your keen cyber defense instincts, the Cybercrime Division offers you a special scout mission. We are conducting an undercover operation to dismantle online criminal syndicates. Will you join us as a Cyber Undercover Agent?",
    policeFormTitle: "📋 【Undercover Agent Registration / Login】",
    policeBtnStart: "Begin Undercover Agent Mission 🚨",
    policeBtnLogin: "Resume Investigation 💻",
    policeBackToPortal: "◀ Back to Magazine Homepage",
    warningBadge: "⚠️ Cyber Crime Division Emergency Intercept",
    warningTitle: "Hold it right there, that was close!",
    warningDesc1:
      "Entering personal data into high-risk scam advertisements is extremely dangerous. You were about to be thoroughly targeted by a fraud syndicate!",
    warningDesc2:
      "……However, rest easy! The Cyber Division intercepted and protected the communication in advance, so zero actual damage occurred.",
    warningTargetTitle: "【Protected Suspect Target Data】",
    warningName: "Agent Name",
    warningEmail: "Contact",
    warningDesc3:
      "Turn this to our advantage! Use this alias to infiltrate their servers as an Undercover Agent and uncover the evidence to bust the syndicate!",
    warningStartBtn: "Begin Undercover Mission ＞",
    footerShareTitle: "Share with friends & recruit undercover agents!",
    footerShareLine: "Share on LINE",
    footerCopyUrl: "Copy URL",
    footerCopied: "✔ Copied",
    footerDisclaimer:
      "※ This site is a cybercrime prevention simulation game for educational purposes.",
    inAppBannerText:
      "Viewing in in-app browser. Open in external browser for Google login.",
    inAppBannerOpen: "Open in Safari / Chrome",
    inAppModalTitle: "External Browser Guide",
    inAppModalDesc:
      "Google OAuth is restricted within in-app WebViews (LINE, Instagram, Twitter).",
    inAppModalStepTitle: "💡 How to open in Safari / Chrome:",
    inAppModalStep1: "① Tap 'Open in Safari / Chrome' below",
    inAppModalStep2:
      "② Or tap '...' menu at top-right and choose 'Open in browser'.",
    inAppModalOpenBtn: "Open in Safari / Chrome",
    inAppModalCopyBtn: "Copy URL & Paste in Safari / Chrome",
    inAppModalEmailChoice: "Continue with Email Registration ＞",
    agentVerifiedBadge: "🚨 Cyber Crime Division Agent Verified",
    agentWelcomeBack: "Undercover Agent Verified",
    agentResumeDesc:
      "Your undercover session is active. Connect to the investigation terminal now to start your mission!",
    agentStartGameBtn: "🚨 Start Game (Go to Investigation)",
    agentSwitchAccountBtn: "🔄 Login with Another Account / Register",
    agentBackToArticle: "◀ Back to Magazine Homepage",
  },
  my: {
    topTag: "အိုင်တီနှင့် လူနေမှုဘဝ ဝဘ်မဂ္ဂဇင်း",
    topSub: "ဒစ်ဂျစ်တယ်နှင့် ခေတ်မီ လူနေမှုပုံစံ မီဒီယာ",
    resumeBtn: "🚨 လျှို့ဝှက်စုံစမ်းစစ်ဆေးမှု ပြန်စတင်ရန်",
    navFeatured: "အထူးဆောင်းပါး",
    navCareer: "အပိုဝင်ငွေနှင့် အလုပ်အကိုင်",
    navSecurity: "အိုင်တီ လုံခြုံရေး",
    navRanking: "အဆင့်သတ်မှတ်ချက်",
    loginRegisterBtn: "အကောင့်ဝင်ရန် / စာရင်းသွင်းရန်",
    breadcrumbHome: "ပင်မစာမျက်နှာ",
    breadcrumbCategory: "အလုပ်အကိုင်နှင့် အပိုဝင်ငွေ",
    breadcrumbFeature: "အထူးဆောင်းပါး",
    articleTitle:
      "【၂၀၂၆ လမ်းညွှန်】အိမ်မှ အွန်လိုင်းအပိုအလုပ် လုပ်ကိုင်နည်းနှင့် လိမ်လည်မှု အန္တရာယ် ကာကွယ်နည်း",
    articleAuthor: "✍️ အယ်ဒီတာအဖွဲ့ (အလုပ်အကိုင်ဌာနခွဲ)",
    articleDate: "📅 စက်တင်ဘာ ၂၊ ၂၀၂၆",
    articleViews: "👁️ ၂၄,၅၁၀ ကြိမ် ကြည့်ရှုပြီး",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "အားလပ်ချိန်တွင် ဉာဏ်ရှိစွာ ဝင်ငွေရှာကြစို့！",
    leadText:
      "မကြာသေးမီနှစ်များအတွင်း စမတ်ဖုန်းနှင့် ကွန်ပျူတာကို အသုံးပြု၍ အိမ်မှ အပိုအလုပ်လုပ်ကိုင်ခြင်းသည် လျင်မြန်စွာ ခေတ်စားလာပါသည်။ အားလပ်ချိန်တွင် ဝင်ငွေရှာနိုင်သည့် အခွင့်အလမ်းများ များပြားလာသော်လည်း၊ အင်တာနက်ပေါ်တွင် မသင်္ကာဖွယ် လိမ်လည်လှည့်ဖြားမှုများလည်း ပြည့်နှက်နေပါသည်။",
    heading1: "၁။ အွန်လိုင်း အပိုအလုပ်များ ရေပန်းစားရခြင်းနှင့် လုပ်ငန်းအမျိုးအစားများ",
    body1:
      "အတွေ့အကြုံမရှိသူများလည်း အလွယ်တကူ စတင်နိုင်သည့် အလုပ်များတွင် ဒေတာစာရင်းသွင်းခြင်း၊ အွန်လိုင်းစစ်တမ်းများ ဖြေဆိုခြင်း၊ ကျွမ်းကျင်မှု ဝန်ဆောင်မှုပေးခြင်းတို့ ပါဝင်ပါသည်။ မိမိနှင့် ကိုက်ညီသော လုပ်ငန်းပမာဏကို ရွေးချယ်လုပ်ကိုင်ခြင်းသည် ရေရှည်အောင်မြင်မှု၏ လျှို့ဝှက်ချက်ဖြစ်ပါသည်။",
    rankingBoxTitle: "📊 ၂၀၂၆ ခုနှစ် လူကြိုက်အများဆုံး အွန်လိုင်း အပိုအလုပ်များ",
    rank1: "🥇 နံပါတ် ၁: အွန်လိုင်းစစ်တမ်းနှင့် သုတေသန",
    rank2: "🥈 နံပါတ် ၂: စာရင်းရေးသွင်းခြင်းနှင့် စာရိုက်ခြင်း",
    rank3: "🥉 နံပါတ် ၃: ဝဘ်ဆောင်းပါးရေးသားခြင်း",
    rank4: "🏅 နံပါတ် ၄: အသုံးမလိုသော ပစ္စည်းများ ပြန်လည်ရောင်းချခြင်း",
    heading2: "၂။ ဆွဲဆောင်မှုရှိသော မက်လုံးများကို သတိပြုပါ！ မသင်္ကာဖွယ် ကမ်းလှမ်းချက်များကို ခွဲခြားနည်း",
    body2_1:
      "「ဖုန်းကို နှိပ်ရုံဖြင့် တစ်ရက်လျှင် ယန်း ၅ သောင်းရမည်」「အတွေ့အကြုံမရှိဘဲ ချက်ချင်း ငွေအများအပြားရမည်」စသည့် အလွန်အကျွံ ကမ်းလှမ်းချက်များကို သတိထားရပါမည်။ တကယ့်တရားဝင်လုပ်ငန်းများတွင် လုပ်ငန်းပမာဏနှင့် လျော်ညီသော လုပ်ခလစာကို ရှင်းလင်းစွာ သတ်မှတ်ထားပါသည်။",
    body2_2:
      "အထူးသဖြင့် စာရင်းသွင်းကြေး၊ သင်တန်းကြေး ကြိုတင်တောင်းခံခြင်း သို့မဟုတ် ဘဏ်အကောင့်သို့ ငွေလွှဲရန် အရေးတကြီး တိုက်တွန်းသူများကို အထူးသတိထားပါ။",
    heading3: "၃။ အနှစ်ချုပ်: လုံခြုံစိတ်ချရသော ပတ်ဝန်းကျင်တွင် စတင်ကြစို့",
    body3:
      "မှန်ကန်သော အသိပညာဖြင့် လုပ်ကိုင်ပါက အွန်လိုင်းအပိုအလုပ်သည် ကောင်းမွန်သော အခွင့်အလမ်းများကို ဆောင်ကြဉ်းပေးနိုင်ပါသည်။ စိတ်ချရသော ပလက်ဖောင်းများကို ရွေးချယ်ပြီး ကျွမ်းကျင်မှုများကို တည်ငြိမ်စွာ တည်ဆောက်သွားပါ။",
    commentsTeaser: "💬 စာဖတ်သူများ၏ မှတ်ချက်များကို ဖတ်ရှုနေပါသည်...",
    sidebarRankingTitle: "🔥 လူကြိုက်များသော ဆောင်းပါးများ",
    sideRank1Title:
      "【အထူးစုံစမ်းချက်】ဖုန်းဖြင့် တစ်လလျှင် ယန်း ၅ သိန်းရနိုင်သလား？",
    sideRank1Meta: "၂၀၂၆.၀၉.၀၂ • အထူးဆောင်းပါး",
    sideRank2Title: "「တစ်ရက် ၅ သောင်း」အမှန်လား？ လက်တွေ့စမ်းသပ်မှု အစီရင်ခံစာ",
    sideRank2Meta: "၂၀၂၆.၀၉.၀၁ • အစီရင်ခံစာ",
    sideRank3Title: "အိမ်မှ အလုပ်လုပ်ရာတွင် အာရုံစူးစိုက်မှု အကောင်းဆုံး စားပွဲပြင်ဆင်နည်း ၁၀ ချက်",
    sideRank3Meta: "၂၀၂၆.၀၈.၃၀ • နည်းပညာ",
    promoBadge: "✨ သီးသန့် အခွင့်အရေး စောင့်ကြည့်သူ အလိုရှိသည်",
    promoTitle: "【ချက်ချင်းငွေရ】တစ်ရက် ယန်း ၅ သောင်း အထူးအလုပ်！？",
    promoDesc:
      "လွယ်ကူသော အလုပ်ဖြင့် ချက်ချင်းဝင်ငွေရယူပါ！ အထူးနေရာကို အခုပဲ စစ်ဆေးပါ။",
    promoBtn: "👉 အခမဲ့ အထူးနေရာကို ကြည့်ရှုရန် ＞＞",
    scamBadge: "✨ နောက်ဆုံး ၃ ဦးသာ ကန့်သတ်ထားသော လျှို့ဝှက်အလုပ်",
    scamClose: "ပိတ်ရန်",
    scamAllocated: "🟢 သင့်အတွက် အထူးနေရာတစ်ခု သတ်မှတ်ပေးထားပါသည်",
    scamCatch: "「ဖုန်းကို နှိပ်ရုံဖြင့် တစ်ရက် ယန်း ၅ သောင်း အာမခံချက်！？」",
    scamLead:
      "ရိုးရှင်းသော အလုပ်ဖြင့် ချက်ချင်းငွေရယူပါ！ အကောင့်ဖွင့်ပြီး လျှို့ဝှက်ချက်တင် (စုံစမ်းစစ်ဆေးမှု) စတင်ပါ။",
    tabRegister: "အကောင့်အသစ် ဖွင့်ရန်",
    tabLogin: "အကောင့်ဝင်ပြီး စုံစမ်းစစ်ဆေးမှု ဆက်လုပ်ရန်",
    labelNickname: "စုံစမ်းရေးမှူး လျှို့ဝှက်အမည် (နာမည်ပြောင်)",
    placeholderNickname: "ဥပမာ: စုံထောက် အောင်အောင်",
    labelEmail: "ဆက်သွယ်ရန် အီးမေးလ်",
    labelPassword: "စကားဝှက်",
    btnRegister: "🚀 အခမဲ့ စာရင်းသွင်းပြီး လျှို့ဝှက်စုံစမ်းစစ်ဆေးမှု စတင်ရန်",
    btnLogin: "စုံစမ်းစစ်ဆေးမှု ဆက်လုပ်ရန် 💻",
    socialDivider: "သို့မဟုတ် လူမှုကွန်ရက်ဖြင့် ချိတ်ဆက်ရန်",
    policeBadge: "👮‍♂️ ဆိုက်ဘာ ရာဇဝတ်မှု နှိမ်နင်းရေး အထူးတပ်ဖွဲ့",
    policeTitle: "အရမ်းတော်တယ်！ လိမ်လည်လှည့်ဖြားမှု ထောင်ချောက်ကို ရှောင်လွှဲနိုင်ခဲ့ပြီ။",
    policeDesc:
      "သင်၏ လုံခြုံရေး အသိနှင့် တည်ငြိမ်သော ဆုံးဖြတ်နိုင်စွမ်းကြောင့် ရဲတပ်ဖွဲ့ ဆိုက်ဘာဌာနမှ သင့်ကို အထူးတာဝန်ပေးအပ်လိုပါသည်။ လက်ရှိတွင် အွန်လိုင်း လိမ်လည်မှုဂိုဏ်းများကို နှိမ်နင်းရန် လျှို့ဝှက်စုံစမ်းစစ်ဆေးမှု ပြုလုပ်နေပါသည်။ လျှို့ဝှက်ဆိုက်ဘာစုံစမ်းရေးမှူးအဖြစ် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းဆောင်ရွက်ပေးပါမည်လား？",
    policeFormTitle: "📋 【လျှို့ဝှက်စုံစမ်းရေးမှူး အကောင့်ဖွင့်ရန် / ဝင်ရန်】",
    policeBtnStart: "စုံစမ်းရေးမှူးအဖြစ် တာဝန်စတင်ရန် 🚨",
    policeBtnLogin: "စုံစမ်းစစ်ဆေးမှု ဆက်လုပ်ရန် 💻",
    policeBackToPortal: "◀ မဂ္ဂဇင်း ပင်မစာမျက်နှာသို့ ပြန်သွားရန်",
    warningBadge: "⚠️ ဆိုက်ဘာ ရာဇဝတ်မှု နှိမ်နင်းရေးဌာန အရေးပေါ် ကြားဖြတ်သတိပေးချက်",
    warningTitle: "ဟေ့ သတိထား！ အန္တရာယ်အရမ်းများတယ်！",
    warningDesc1:
      "အဆိုပါ မသင်္ကာဖွယ် လိမ်လည်မှုကြော်ငြာတွင် ကိုယ်ရေးအချက်အလက် ထည့်သွင်းခြင်းသည် အလွန်အန္တရာယ်များပါသည်။ ပုံမှန်ဆိုလျှင် လိမ်လည်ဂိုဏ်း၏ သားကောင် ဖြစ်သွားနိုင်ပါသည်။",
    warningDesc2:
      "……ဒါပေမဲ့ စိတ်အေးအေးထားပါ！ 今回 ကျွန်ုပ်တို့ ဆိုက်ဘာဌာနမှ ဆက်သွယ်မှုကို ကြိုတင် ကြားဖြတ်ကာကွယ်ထားသောကြောင့် အမှန်တကယ် ထိခိုက်မှု မရှိပါ။",
    warningTargetTitle: "【ကာကွယ်ထားသော ပစ်မှတ် အချက်အလက်များ】",
    warningName: "မှတ်ပုံတင်အမည်",
    warningEmail: "ဆက်သွယ်ရန်",
    warningDesc3:
      "အခွင့်အရေးကို အသုံးချကြစို့！ ယခု ထည့်သွင်းထားသော အချက်အလက်များဖြင့် ၎င်းတို့၏ ဆာဗာအတွင်းသို့ ဝင်ရောက်ပြီး သက်သေအထောက်အထားများ ဖော်ထုတ်ရန် လျှို့ဝှက်စုံစမ်းရေးမှူးအဖြစ် တာဝန်ယူပါ။",
    warningStartBtn: "စုံစမ်းစစ်ဆေးရေး တာဝန် စတင်ရန် ＞",
    footerShareTitle: "သူငယ်ချင်းများနှင့် မျှဝေပြီး စုံစမ်းရေးမှူးများကို တိုးမြှင့်ကြစို့！",
    footerShareLine: "LINE ဖြင့် မျှဝေရန်",
    footerCopyUrl: "လင့်ခ် ကူးယူရန်",
    footerCopied: "✔ ကူးယူပြီးပါပြီ",
    footerDisclaimer:
      "※ ဤဆိုက်သည် ဆိုက်ဘာလုံခြုံရေး အသိပညာပေး သရုပ်ပြဂိမ်းဖြစ်ပါသည်။",
    inAppBannerText:
      "အက်ပ်တွင်း ဘရောက်ဇာဖြင့် ဖွင့်ထားပါသည်။ Google အကောင့်ဝင်ရန် ပြင်ပဘရောက်ဇာကို သုံးပါ။",
    inAppBannerOpen: "Safari / Chrome ဖြင့် ဖွင့်ရန်",
    inAppModalTitle: "ပြင်ပဘရောက်ဇာဖြင့် ဖွင့်ရန် လမ်းညွှန်",
    inAppModalDesc:
      "လုံခြုံရေးမူဝါဒကြောင့် LINE သို့မဟုတ် SNS အက်ပ်တွင်းတွင် Google Login ကို ကန့်သတ်ထားနိုင်ပါသည်။",
    inAppModalStepTitle: "💡 Safari / Chrome ဖြင့် ဖွင့်နည်း အဆင့်များ：",
    inAppModalStep1: "① အောက်ပါ 'Safari / Chrome ဖြင့် ဖွင့်ရန်' ခလုတ်ကို နှိပ်ပါ",
    inAppModalStep2:
      "② သို့မဟုတ် ညာဘက်အပေါ်ရှိ '…' မီနူးမှ 'ဘရောက်ဇာဖြင့် ဖွင့်ရန်' ကို ရွေးချယ်ပါ။",
    inAppModalOpenBtn: "Safari / Chrome ဖြင့် ဖွင့်ရန်",
    inAppModalCopyBtn: "လင့်ခ်ကို ကူးယူပြီး Safari/Chrome တွင် ကူးထည့်ပါ",
    inAppModalEmailChoice: "အီးမေးလ်ဖြင့် ဆက်လက် စာရင်းသွင်းရန် ＞",
    agentVerifiedBadge: "🚨 ဆိုက်ဘာ ရဲတပ်ဖွဲ့ စုံစမ်းရေးမှူး အတည်ပြုပြီး",
    agentWelcomeBack: "လျှို့ဝှက်စုံစမ်းရေးမှူး အတည်ပြုခြင်း အောင်မြင်သည်",
    agentResumeDesc:
      "သင့်စုံစမ်းစစ်ဆေးမှု အပိုင်းကို သိမ်းဆည်းထားပါသည်။ စုံစမ်းစစ်ဆေးမှု စတင်ရန် ချိတ်ဆက်လိုက်ပါ！",
    agentStartGameBtn: "🚨 ဂိမ်းစတင်ရန် (စုံစမ်းစစ်ဆေးရေးသို့ သွားရန်)",
    agentSwitchAccountBtn: "🔄 အခြားအကောင့်ဖြင့် ဝင်ရန် / အကောင့်သစ်ဖွင့်ရန်",
    agentBackToArticle: "◀ မဂ္ဂဇင်း ဆောင်းပါးသို့ ပြန်သွားရန်",
  },
  ne: {
    topTag: "आईटी र जीवनशैली वेब पत्रिका",
    topSub: "डिजिटल र नयाँ जीवनशैली प्रविधि मिडिया",
    resumeBtn: "🚨 गोप्य अनुसन्धान पुनः सुरु गर्नुहोस्",
    navFeatured: "विशेष लेख",
    navCareer: "साइड जब र करियर",
    navSecurity: "आईटी सुरक्षा",
    navRanking: "र्याङ्किङ",
    loginRegisterBtn: "लगइन / दर्ता",
    breadcrumbHome: "गृहपृष्ठ",
    breadcrumbCategory: "करियर र काम",
    breadcrumbFeature: "विशेष",
    articleTitle:
      "【२०२६ गाइड】घरबाटै अनलाइन साइड जब सुरु गर्ने सही तरिका र ठगीबाट बच्ने उपायहरू",
    articleAuthor: "✍️ सम्पादकीय टोली (करियर विभाग)",
    articleDate: "📅 सेप्टेम्बर २, २०२६",
    articleViews: "👁️ २४,५१० पटक हेरिएको",
    articleBannerBadge: "💻 📱 💼",
    articleBannerText: "खाली समयको सदुपयोग गरी स्मार्ट तरिकाले कमाउनुहोस्!",
    leadText:
      "पछिल्ला वर्षहरूमा स्मार्टफोन र कम्प्युटर प्रयोग गरी घरबाटै साइड जब गर्ने प्रचलन तीव्र गतिमा बढेको छ। खाली समयको सदुपयोग गरेर अतिरिक्त आम्दानी गर्ने अवसरहरू बढे पनि इन्टरनेटमा भ्रामक विज्ञापन र ठगीहरू पनि उत्तिकै छन्।",
    heading1: "१. अनलाइन साइड जब किन लोकप्रिय छ र प्रमुख प्रकारहरू",
    body1:
      "सुरुवाती चरणका लागि डेटा प्रविष्टि, अनलाइन सर्वेक्षण, सीप आदानप्रदान र सामाजिक सञ्जाल व्यवस्थापन जस्ता कामहरू सजिला हुन्छन्। आफ्नो क्षमता अनुसार काम छनोट गर्नु नै सफलताको रहस्य हो।",
    rankingBoxTitle: "📊 २०२६ सर्वाधिक सन्तुष्टि दिने अनलाइन साइड जबहरू",
    rank1: "🥇 #१: अनलाइन सर्वेक्षण र अनुसन्धान",
    rank2: "🥈 #२: डेटा प्रविष्टि र टाइपिंग",
    rank3: "🥉 #३: वेब लेखन र प्रुफरिडिङ",
    rank4: "🏅 #४: अनावश्यक सामानहरूको अनलाइन पुनर्विक्री",
    heading2: "२. आकर्षक प्रलोभनबाट सावधान! शंकास्पद प्रस्तावहरू कसरी चिन्ने",
    body2_1:
      "「फोनमा मात्र ट्याप गरेर दैनिक ५०,००० येन कमाउनुहोस्」「कुनै अनुभव बिना पहिलो दिनमै लाखौं कमाउनुहोस्」जस्ता अतिरञ्जित दाबीहरूबाट सावधान रहनुहोस्। वास्तविक काममा पारिश्रमिक स्पष्ट हुन्छ।",
    body2_2:
      "विशेष गरी दर्ता शुल्क, प्रशिक्षण शुल्क अग्रिम माग्ने वा खातामा तुरुन्तै रकम पठाउन दबाब दिनेहरूबाट सतर्क रहनुहोस्।",
    heading3: "३. निष्कर्ष: सुरक्षित वातावरणमा पहिलो कदम चाल्नुहोस्",
    body3:
      "सही ज्ञानका साथ अगाडि बढेमा अनलाइन कामले करियरका नयाँ ढोकाहरू खोल्न सक्छ। प्रमाणित प्लेटफर्महरू रोज्नुहोस् र सीप विकास गर्नुहोस्।",
    commentsTeaser: "💬 पाठकहरूको प्रतिक्रिया लोड हुँदैछ...",
    sidebarRankingTitle: "🔥 लोकप्रिय लेखहरू",
    sideRank1Title:
      "【विशेष अनुसन्धान】फोनबाटै महिनाको ५ लाख येन? हामीले परीक्षण गर्यौं",
    sideRank1Meta: "२०२६.०९.०२ • विशेष",
    sideRank2Title: "के 'दैनिक ५०,००० येन' साँचो हो? गोप्य परीक्षक रिपोर्ट",
    sideRank2Meta: "२०२६.०९.०१ • रिपोर्ट",
    sideRank3Title: "रिमोट वर्कमा ध्यान केन्द्रित गर्न १० उत्कृष्ट डेस्क सेटअप",
    sideRank3Meta: "२०२६.०८.३० • ग्याजेट",
    promoBadge: "✨ विशेष मनिटर माग गरिएको छ",
    promoTitle: "【तुरुन्त भुक्तानी】दैनिक ५०,००० येनको विशेष काम!?",
    promoDesc:
      "सजिलो कामबाट तुरुन्तै इनाम पाउनुहोस्! आफ्नो विशेष सिट अहिले नै जाँच गर्नुहोस्।",
    promoBtn: "👉 निःशुल्क विशेष सिट हेर्नुहोस् ＞＞",
    scamBadge: "✨ केवल ३ सिट बाँकी • शीर्ष गोप्य परियोजना",
    scamClose: "बन्द गर्नुहोस्",
    scamAllocated: "🟢 तपाईंको लागि विशेष मनिटर सिट छुट्याइएको छ",
    scamCatch: "「फोन ट्याप गरेर दैनिक ५०,००० येन पक्का!?」",
    scamLead:
      "सजिलो काम गरेर तुरुन्तै पैसा पाउनुहोस्! गोप्य च्याट (अनुसन्धान) सुरु गर्न खाता बनाउनुहोस्।",
    tabRegister: "नयाँ खाता दर्ता",
    tabLogin: "लगइन गरी अनुसन्धान जारी राख्नुहोस्",
    labelNickname: "एजेन्ट कोड-नेम (उपनाम)",
    placeholderNickname: "उदाहरण: जासूस विकल",
    labelEmail: "सम्पर्क इमेल ठेगाना",
    labelPassword: "पासवर्ड",
    btnRegister: "🚀 निःशुल्क दर्ता गर्नुहोस् र गोप्य च्याट खोल्नुहोस्",
    btnLogin: "अनुसन्धान पुनः सुरु गर्नुहोस् 💻",
    socialDivider: "वा सामाजिक खाताबाट जडान गर्नुहोस्",
    policeBadge: "👮‍♂️ साइबर अपराध महाशाखा विशेष भर्ती टोली",
    policeTitle: "धेरै राम्रो! तपाईंले शंकास्पद ठगीको जालबाट बच्नुभयो।",
    policeDesc:
      "तपाईंको उच्च साइबर सुरक्षा सचेतनालाई ध्यानमा राख्दै, साइबर अपराध महाशाखा तपाईंलाई विशेष मिसन प्रस्ताव गर्दछ। हामी अनलाइन ठगी गिरोहहरूलाई परास्त गर्न गोप्य अपरेशन सञ्चालन गर्दैछौं। के तपाईं साइबर अण्डरकभर एजेन्टको रूपमा हामीसँग सामेल हुनुहुनेछ?",
    policeFormTitle: "📋 【अण्डरकभर एजेन्ट दर्ता / लगइन】",
    policeBtnStart: "अण्डरकभर एजेन्टको रूपमा मिसन सुरु गर्नुहोस् 🚨",
    policeBtnLogin: "अनुसन्धान पुनः सुरु गर्नुहोस् 💻",
    policeBackToPortal: "◀ पत्रिका गृहपृष्ठमा फर्कनुहोस्",
    warningBadge: "⚠️ साइबर अपराध महाशाखा आपतकालीन चेतावनी",
    warningTitle: "होसियार! तपाईं ठूलो खतरामा पर्न सक्नुहुन्थ्यो!",
    warningDesc1:
      "यस्तो शंकास्पद ठगी विज्ञापनमा व्यक्तिगत विवरण प्रविष्ट गर्नु अत्यन्त खतरनाक छ। तपाईं ठगी गिरोहको शिकार बन्न लाग्नुभएको थियो!",
    warningDesc2:
      "……तर ढुक्क हुनुहोस्! साइबर महाशाखाले पहिले नै सञ्चार नियन्त्रण र सुरक्षित गरेकोले कुनै वास्तविक क्षति भएको छैन।",
    warningTargetTitle: "【सुरक्षित गरिएको लक्ष्य विवरण】",
    warningName: "दर्ता नाम",
    warningEmail: "सम्पर्क",
    warningDesc3:
      "यसलाई अवसरको रूपमा प्रयोग गरौं! प्रविष्ट गरिएको डाटा प्रयोग गरी उनीहरूको सर्भरमा प्रवेश गर्नुहोस् र गिरोहलाई पक्राउ गर्न अण्डरकभर एजेन्ट बन्नुहोस्!",
    warningStartBtn: "अनुसन्धान मिसन सुरु गर्नुहोस् ＞",
    footerShareTitle: "साथीहरूसँग साझा गर्नुहोस् र अनुसन्धानकर्ता बढाउनुहोस्!",
    footerShareLine: "LINE मा सेयर गर्नुहोस्",
    footerCopyUrl: "लिंक कपी गर्नुहोस्",
    footerCopied: "✔ कपी भयो",
    footerDisclaimer:
      "※ यो वेबसाइट साइबर सुरक्षा सचेतनाका लागि शैक्षिक सिमुलेशन गेम हो।",
    inAppBannerText:
      "इन-एप ब्राउजरमा हेर्दै हुनुहुन्छ। गुगल लगइनका लागि बाह्य ब्राउजर प्रयोग गर्नुहोस्।",
    inAppBannerOpen: "Safari / Chrome मा खोल्नुहोस्",
    inAppModalTitle: "बाह्य ब्राउजर गाइड",
    inAppModalDesc:
      "सुरक्षा नीतिका कारण LINE वा SNS एपभित्र गुगल लगइन अवरुद्ध हुन सक्छ।",
    inAppModalStepTitle: "💡 Safari / Chrome मा खोल्ने तरिका:",
    inAppModalStep1: "① तलको 'Safari / Chrome मा खोल्नुहोस्' बटन थिच्नुहोस्",
    inAppModalStep2:
      "② वा माथि दायाँको '…' मेनुबाट 'ब्राउजरमा खोल्नुहोस्' छान्नुहोस्।",
    inAppModalOpenBtn: "Safari / Chrome मा खोल्नुहोस्",
    inAppModalCopyBtn: "लिंक कपी गरी Safari/Chrome मा टाँस्नुहोस्",
    inAppModalEmailChoice: "इमेल दर्ताबाट जारी राख्नुहोस् ＞",
    agentVerifiedBadge: "🚨 साइबर अपराध महाशाखा एजेन्ट प्रमाणित",
    agentWelcomeBack: "अण्डरकभर एजेन्ट प्रमाणित भयो",
    agentResumeDesc:
      "तपाईंको अनुसन्धान सत्र सक्रिय छ। मिसन सुरु गर्न अनुसन्धान टर्मिनलमा जडान गर्नुहोस्!",
    agentStartGameBtn: "🚨 खेल सुरु गर्नुहोस् (अनुसन्धानमा जानुहोस्)",
    agentSwitchAccountBtn: "🔄 अर्को खाताबाट लगइन गर्नुहोस् / नयाँ दर्ता",
    agentBackToArticle: "◀ पत्रिका लेखमा फर्कनुहोस्",
  },
};
