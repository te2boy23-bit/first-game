import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. Google検索の画面に表示されるタイトル（SEOの肝）
  title: "『詐欺師を騙し返せ！エージェント・コード』｜潜入捜査ハッキングゲーム",

  // 2. 検索結果に表示されるゲームの紹介文
  description:
    "🚨「潜入捜査エージェント認証中…」ターゲットは悪質な詐欺師。警察本部のデータベースにアクセスし、奴らのシステムをハッキングして騙し返せ！ブラウザで今すぐ遊べる復讐サスペンス・シミュレーション。",

  // 3. 検索キーワードの補足（Googleは参考程度ですが、念のため）
  keywords: [
    "詐欺師を騙し返せ",
    "エージェント・コード",
    "ハッキングゲーム",
    "潜入捜査",
    "フリーゲーム",
    "ブラウザゲーム",
    "謎解き",
  ],

  // 4. X(旧Twitter)やLINEでURLを貼った時にカッコよく表示させる設定（OGP）
  openGraph: {
    title: "『詐欺師を騙し返せ！エージェント・コード』",
    description:
      "警察本部データベースと接続完了。ターゲットの詐欺師をハッキングし、騙し返せ！",
    url: "https://vercel.app",
    siteName: "詐欺師を騙し返せ！エージェント・コード",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "『詐欺師を騙し返せ！エージェント・コード』",
    description:
      "悪党を罠にはめる、潜入捜査ハッキングゲーム。ブラウザで即プレイ！",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
