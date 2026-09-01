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
}

export default function ArchiveModal({ isOpen, onClose, clearedContacts }: ArchiveModalProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(clearedContacts[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-pink-400">📂 警察機密：摘発済み事件ファイル</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm px-2 py-1 bg-gray-800 rounded cursor-pointer"
          >
            ✕ 閉じる
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden mt-4 gap-4">
          {/* 左側：クリア済みターゲットの一覧 */}
          <div className="w-1/3 border-r border-gray-800 pr-3 overflow-y-auto space-y-2">
            <div className="text-xs text-gray-500 mb-2">摘発完了件数: {clearedContacts.length} 件</div>
            {clearedContacts.length === 0 ? (
              <div className="text-xs text-gray-500 text-center py-8">まだ摘発した組織はありません。捜査を進めよう！</div>
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
                  事件名: {selectedContact.name}
                </div>
                <div>
                  <span className="text-gray-500">組織の種別：</span>
                  <span className="text-gray-200">{selectedContact.role}</span>
                </div>
                <div>
                  <span className="text-gray-500">危険度：</span>
                  <span className="text-red-400 font-bold">{selectedContact.danger}</span>
                </div>
                <div>
                  <span className="text-gray-500">事件概要・ファイル詳細：</span>
                  <p className="text-gray-300 mt-1 leading-relaxed bg-gray-900 p-3 rounded border border-gray-800">
                    {selectedContact.description || "特記事項なし。証拠品はすべて押収済み。"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">解決済みミッション：</span>
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
                左側のリストから事件ファイルを選択すると、詳細な機密データを確認できます。
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}