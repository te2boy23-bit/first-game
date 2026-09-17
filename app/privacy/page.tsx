import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-black mb-6 border-b pb-4 text-slate-900">プライバシーポリシー (Privacy Policy)</h1>
        
        <div className="space-y-6 leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">1. 個人情報の収集について</h2>
            <p>
              「Cyber-Bait」（以下、「当サイト」といいます）では、ユーザーの皆様がゲームをプレイするにあたり、以下の情報を収集・保存する場合があります。<br/>
              ・ログイン認証情報（Google・Email等の認証プロバイダから提供される基本情報）<br/>
              ・ゲーム内の進行状況データ<br/>
              なお、ゲーム内のチャットで入力された「架空の証拠」や「おとり名義」等は、すべてシミュレーション用のデータとして扱われ、個人情報として悪用されることはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">2. Google AdSenseおよび広告配信について</h2>
            <p>
              当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。<br/>
              ・広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報『Cookie』を使用することがあります。<br/>
              ・GoogleによるCookieの使用を無効にする場合は、Googleの<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">広告設定ページ</a>からパーソナライズ広告を無効にすることができます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">3. 情報の利用目的</h2>
            <p>
              収集した情報は、以下の目的でのみ使用します。<br/>
              ・ゲーム機能の提供、進行データの保存<br/>
              ・利用状況の分析およびサービスの改善<br/>
              ・不正利用の防止
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">4. 免責事項</h2>
            <p>
              当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">5. プライバシーポリシーの変更</h2>
            <p>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t text-center">
          <Link href="/" className="text-blue-600 hover:underline font-bold">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

