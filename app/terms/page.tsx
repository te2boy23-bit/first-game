import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-black mb-6 border-b pb-4 text-slate-900">利用規約 (Terms of Service)</h1>
        
        <div className="space-y-6 leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">1. はじめに</h2>
            <p>
              この利用規約（以下、「本規約」といいます）は、「Cyber-Bait」（以下、「当サイト」といいます）が提供するブラウザゲーム（以下、「本サービス」といいます）の利用条件を定めるものです。ユーザーの皆様には、本規約に従って本サービスをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">2. 本サービスの内容と目的</h2>
            <p>
              本サービスは、特殊詐欺やフィッシング詐欺の手口を疑似体験し、防犯意識を高めることを目的としたフィクション（シミュレーションゲーム）です。作中に登場する人物、団体、名称、詐欺サイトなどはすべて架空のものであり、実在するものとは一切関係ありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">3. 禁止事項</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サイトのサーバーやネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>本サービスで得た情報（架空の詐欺手口など）を実際の犯罪に悪用する行為</li>
              <li>他のユーザー、第三者、または当サイトに不利益、損害、不快感を与える行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">4. 免責事項</h2>
            <p>
              当サイトは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。<br/>
              当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">5. 規約の変更</h2>
            <p>
              当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-slate-900">6. お問い合わせ窓口</h2>
            <p>
              本規約や本サービスに関するお問い合わせは、当サイト管理者までご連絡ください。
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

