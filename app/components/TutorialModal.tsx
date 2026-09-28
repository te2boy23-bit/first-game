import React from "react";

interface TutorialModalProps {
  onClose: () => void;
  lang: "ja" | "en" | "my" | "ne";
}

const tutorialTexts = {
  ja: {
    title: "🎮 ゲームの操作説明",
    p1: "あなたは警察の極秘サイバー捜査官（おとり捜査官）です。",
    p2: "左側の「ターゲット指令」リストから、捜査対象となる詐欺師を選択してください。",
    p3: "チャットで詐欺師と会話をし、相手の矛盾を突いて必要な「証拠（口座番号や住所など）」を引き出してください。",
    p4: "証拠を全て引き出すと逮捕完了となります。詐欺師に正体を怪しまれるとブロックされ、GAME OVERになりますので慎重に交渉しましょう。",
    btn: "捜査を開始する",
  },
  en: {
    title: "🎮 How to Play",
    p1: "You are a top-secret undercover cyber investigator.",
    p2: "Select a target scammer from the 'Target Missions' list on the left.",
    p3: "Chat with the scammer, point out their contradictions, and trick them into revealing critical evidence (bank accounts, addresses, etc).",
    p4: "Once all evidence is collected, they will be busted! Be careful—if they get too suspicious, you will be blocked and it's GAME OVER.",
    btn: "Start Investigation",
  },
  my: {
    title: "🎮 ကစားနည်း",
    p1: "သင်သည် ထိပ်တန်း လျှို့ဝှက် ဆိုက်ဘာ စုံစမ်းစစ်ဆေးရေးမှူး ဖြစ်သည်။",
    p2: "ဘယ်ဘက်ရှိ 'ပစ်မှတ် မစ်ရှင်များ' စာရင်းမှ လိမ်လည်သူကို ရွေးချယ်ပါ။",
    p3: "လိမ်လည်သူနှင့် စကားပြောပြီး လိုအပ်သော အထောက်အထားများ (ဘဏ်အကောင့်၊ လိပ်စာ စသည်) ကို ရယူပါ။",
    p4: "အထောက်အထား အားလုံးရပါက ဖမ်းဆီးနိုင်မည်။ သတိထားပါ - သူတို့ သံသယဖြစ်လျှင် သင် block ခံရမည်ဖြစ်ပြီး GAME OVER ဖြစ်မည်။",
    btn: "စုံစမ်းစစ်ဆေးမှု စတင်ရန်",
  },
  ne: {
    title: "🎮 कसरी खेल्ने",
    p1: "तपाईं एक गोप्य साइबर अनुसन्धानकर्ता हुनुहुन्छ।",
    p2: "बायाँपट्टिको 'लक्षित मिसन' सूचीबाट ठग छनौट गर्नुहोस्।",
    p3: "ठगसँग कुराकानी गर्नुहोस् र आवश्यक प्रमाण (बैंक खाता, ठेगाना आदि) निकाल्नुहोस्।",
    p4: "सबै प्रमाण सङ्कलन गरेपछि पक्राउ गर्न सकिन्छ। सावधान - यदि उनीहरूलाई शंका लाग्यो भने तपाईंलाई ब्लक गरिनेछ र GAME OVER हुनेछ।",
    btn: "अनुसन्धान सुरु गर्नुहोस्",
  },
};

export default function TutorialModal({ onClose, lang }: TutorialModalProps) {
  const t = tutorialTexts[lang] || tutorialTexts.ja;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
          {t.title}
        </h2>

        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
          <p className="font-bold text-white">📍 {t.p1}</p>
          <div className="space-y-3 pl-1">
            <p className="flex gap-2">
              <span className="text-blue-400">1.</span>
              <span>{t.p2}</span>
            </p>
            <p className="flex gap-2">
              <span className="text-blue-400">2.</span>
              <span>{t.p3}</span>
            </p>
            <p className="flex gap-2">
              <span className="text-rose-400">3.</span>
              <span>{t.p4}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/20"
        >
          {t.btn}
        </button>
      </div>
    </div>
  );
}
