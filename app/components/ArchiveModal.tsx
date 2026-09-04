"use client";
import { useState } from "react";

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
  cleared: boolean;
  missions: Mission[];
  description?: string;
}

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  clearedContacts: Contact[];
  lang?: "ja" | "en" | "my" | "ne";
}

export default function ArchiveModal({
  isOpen,
  onClose,
  clearedContacts,
  lang = "ja",
}: ArchiveModalProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    clearedContacts[0] || null,
  );

  if (!isOpen) return null;

  const getArchiveTitle = () => {
    switch (lang) {
      case "en":
        return "📂 Police Confidential: Busted Case Files";
      case "my":
        return "📂 ရဲတပ်ဖွဲ့ လျှို့ဝှက်ချက်: ဖော်ထုတ်ဖမ်းဆီးရမိသော အမှုတွဲများ";
      case "ne":
        return "📂 प्रहरी गोप्य: समाधान गरिएका मुद्दा अभिलेखहरू";
      default:
        return "📂 警察機密：摘発済み事件ファイル";
    }
  };

  const getCloseText = () => {
    switch (lang) {
      case "en":
        return "✕ Close";
      case "my":
        return "✕ ပိတ်ရန်";
      case "ne":
        return "✕ बन्द गर्नुहोस्";
      default:
        return "✕ 閉じる";
    }
  };

  const getCountLabel = () => {
    switch (lang) {
      case "en":
        return `Cases Cleared: ${clearedContacts.length}`;
      case "my":
        return `ဖော်ထုတ်ပြီးသော အမှုတွဲ: ${clearedContacts.length} ခု`;
      case "ne":
        return `सफल अनुसन्धान: ${clearedContacts.length} वटा`;
      default:
        return `摘発完了件数: ${clearedContacts.length} 件`;
    }
  };

  const getEmptyListText = () => {
    switch (lang) {
      case "en":
        return "No syndicates busted yet. Advance your investigation!";
      case "my":
        return "ဖမ်းဆီးရမိသော အဖွဲ့အစည်း မရှိသေးပါ။ စုံစမ်းစစ်ဆေးမှုကို ဆက်လက်လုပ်ဆောင်ပါ！";
      case "ne":
        return "कुनै सिन्डिकेट पक्राउ गरिएको छैन। अनुसन्धान अगाडि बढाउनुहोस्!";
      default:
        return "まだ摘発した組織はありません。捜査を進めよう！";
    }
  };

  const getCaseNameLabel = () => {
    switch (lang) {
      case "en":
        return "Target / Case: ";
      case "my":
        return "ပစ်မှတ် / အမှုတွဲ: ";
      case "ne":
        return "लक्ष्य / मुद्दा: ";
      default:
        return "事件名: ";
    }
  };

  const getOrgTypeLabel = () => {
    switch (lang) {
      case "en":
        return "Syndicate Type: ";
      case "my":
        return "အဖွဲ့အစည်း အမျိုးအစား: ";
      case "ne":
        return "सिन्डिकेट प्रकार: ";
      default:
        return "組織の種別：";
    }
  };

  const getDangerLabel = () => {
    switch (lang) {
      case "en":
        return "Danger Level: ";
      case "my":
        return "အန္တရာယ် အဆင့်: ";
      case "ne":
        return "जोखिम स्तर: ";
      default:
        return "危険度：";
    }
  };

  const getDetailsLabel = () => {
    switch (lang) {
      case "en":
        return "Case Overview & Files: ";
      case "my":
        return "အမှုတွဲ အကျဉ်းချုပ်နှင့် အချက်အလက်များ: ";
      case "ne":
        return "मुद्दा सारांश र विवरण: ";
      default:
        return "事件概要・ファイル詳細：";
    }
  };

  const getSolvedMissionsLabel = () => {
    switch (lang) {
      case "en":
        return "Solved Missions:";
      case "my":
        return "ပြီးမြောက်သော မစ်ရှင်များ:";
      case "ne":
        return "सम्पन्न मिसनहरू:";
      default:
        return "解決済みミッション：";
    }
  };

  const getSelectPlaceholder = () => {
    switch (lang) {
      case "en":
        return "Select a case file from the left list to review detailed confidential evidence.";
      case "my":
        return "လျှို့ဝှက်သက်သေ အချက်အလက်များကို ကြည့်ရှုရန် ဘယ်ဘက်စာရင်းမှ အမှုတွဲတစ်ခုကို ရွေးချယ်ပါ။";
      case "ne":
        return "विस्तृत गोप्य प्रमाण हेर्न बायाँ सूचीबाट मुद्दा फाइल चयन गर्नुहोस्।";
      default:
        return "左側のリストから事件ファイルを選択すると、詳細な機密データを確認できます。";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-pink-400">
            {getArchiveTitle()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm px-2 py-1 bg-gray-800 rounded cursor-pointer"
          >
            {getCloseText()}
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden mt-4 gap-4">
          {/* 左側：クリア済みターゲットの一覧 */}
          <div className="w-1/3 border-r border-gray-800 pr-3 overflow-y-auto space-y-2">
            <div className="text-xs text-gray-500 mb-2">{getCountLabel()}</div>
            {clearedContacts.length === 0 ? (
              <div className="text-xs text-gray-500 text-center py-8">
                {getEmptyListText()}
              </div>
            ) : (
              clearedContacts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedContact(c)}
                  className={`p-2.5 rounded border text-xs cursor-pointer transition ${
                    selectedContact?.id === c.id
                      ? "bg-pink-950/50 border-pink-500 text-white"
                      : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  <div className="font-bold text-gray-200">{c.name}</div>
                  <div className="text-[10px] text-pink-500">{c.role}</div>
                </div>
              ))
            )}
          </div>

          {/* 右側：選択した事件の詳細ファイル */}
          <div className="w-2/3 overflow-y-auto pl-2 text-xs space-y-4">
            {selectedContact ? (
              <div className="space-y-3 bg-gray-950/60 border border-gray-800 p-4 rounded-lg">
                <div className="text-pink-400 font-bold text-sm border-b border-gray-800 pb-2">
                  {getCaseNameLabel()}
                  {selectedContact.name}
                </div>
                <div>
                  <span className="text-gray-500">{getOrgTypeLabel()}</span>
                  <span className="text-gray-200">{selectedContact.role}</span>
                </div>
                <div>
                  <span className="text-gray-500">{getDangerLabel()}</span>
                  <span className="text-red-400 font-bold">
                    {selectedContact.danger}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">{getDetailsLabel()}</span>
                  <p className="text-gray-300 mt-1 leading-relaxed bg-gray-900 p-3 rounded border border-gray-800">
                    {selectedContact.description ||
                      (lang === "en"
                        ? "No special notes. All evidence seized."
                        : lang === "my"
                          ? "အထူးမှတ်ချက်မရှိပါ။ သက်သေများအားလုံး သိမ်းဆည်းပြီးပါပြီ။"
                          : lang === "ne"
                            ? "कुनै विशेष टिप्पणी छैन। सबै प्रमाण जफत गरिएको छ।"
                            : "特記事項なし。証拠品はすべて押収済み。")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">
                    {getSolvedMissionsLabel()}
                  </span>
                  <ul className="mt-1 space-y-1">
                    {selectedContact.missions.map((m) => (
                      <li key={m.id} className="text-green-400">
                        [✔] {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500 text-center">
                {getSelectPlaceholder()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
