export type Language = "ja" | "en";

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
};
