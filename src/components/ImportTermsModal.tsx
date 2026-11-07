import React, { useState } from 'react';
import { X, Upload, Plus, FileText, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { WeddingTerm, CategoryId, CATEGORIES } from '../data/weddingTerms';

interface ImportTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newTerms: WeddingTerm[]) => void;
  onResetToDefault: () => void;
  currentTermCount: number;
}

export const ImportTermsModal: React.FC<ImportTermsModalProps> = ({
  isOpen,
  onClose,
  onImport,
  onResetToDefault,
  currentTermCount
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'single'>('text');
  
  // Bulk text state
  const [bulkText, setBulkText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Single term state
  const [term, setTerm] = useState('');
  const [reading, setReading] = useState('');
  const [category, setCategory] = useState<CategoryId>('ceremony_chapel');
  const [importance, setImportance] = useState<3 | 4 | 5>(5);
  const [summary, setSummary] = useState('');
  const [detail, setDetail] = useState('');
  const [point, setPoint] = useState('');
  const [question, setQuestion] = useState('');
  const [example, setExample] = useState('');

  if (!isOpen) return null;

  const handleBulkImport = () => {
    if (!bulkText.trim()) {
      setImportStatus('テキストを入力してください');
      return;
    }

    try {
      const lines = bulkText.split('\n').filter(l => l.trim().length > 0);
      const parsedTerms: WeddingTerm[] = [];

      lines.forEach((line, index) => {
        // Support Tab-separated, Comma-separated, or Colon-separated
        // Formats supported:
        // 1. 用語名 [TAB] 読み [TAB] カテゴリ [TAB] 意味 [TAB] 注意点
        // 2. 用語名, 読み, カテゴリ, 意味
        // 3. 用語名: 意味 (or 用語名（よみ）：意味)
        let itemTerm = '';
        let itemReading = '';
        let itemCategory: CategoryId = 'reception_prog';
        let itemSummary = '';
        let itemPoint = '';
        let itemQuestion = '';

        if (line.includes('\t')) {
          const parts = line.split('\t').map(p => p.trim());
          itemTerm = parts[0] || '';
          itemReading = parts[1] || '';
          itemSummary = parts[2] || '';
          itemPoint = parts[3] || '';
        } else if (line.includes(',') || line.includes('、')) {
          const separator = line.includes(',') ? ',' : '、';
          const parts = line.split(separator).map(p => p.trim());
          itemTerm = parts[0] || '';
          itemReading = parts[1] || '';
          itemSummary = parts[2] || '';
          itemPoint = parts[3] || '';
        } else if (line.includes(':') || line.includes('：')) {
          const separator = line.includes(':') ? ':' : '：';
          const parts = line.split(separator).map(p => p.trim());
          itemTerm = parts[0] || '';
          itemSummary = parts.slice(1).join('：').trim();
        } else {
          itemTerm = line.trim();
          itemSummary = '（解説・意味を入力してください）';
        }

        // Extract reading if in format 用語名（よみ）
        const match = itemTerm.match(/^(.+?)[（(](.+?)[）)]$/);
        if (match) {
          itemTerm = match[1].trim();
          if (!itemReading) itemReading = match[2].trim();
        }

        if (itemTerm) {
          parsedTerms.push({
            id: `custom-${Date.now()}-${index}`,
            term: itemTerm,
            reading: itemReading || itemTerm,
            category: itemCategory,
            importance: 5,
            summary: itemSummary || itemTerm,
            detail: itemSummary || '',
            point: itemPoint || '現場での所作・身だしなみに注意し、丁寧にご案内します。',
            question: itemQuestion || `${itemTerm}とは何ですか？`,
            example: `「${itemTerm}の準備をお願いします。」`,
            tags: ['追加用語', '研修用']
          });
        }
      });

      if (parsedTerms.length > 0) {
        onImport(parsedTerms);
        setImportStatus(`計 ${parsedTerms.length} 件の用語を取り込みました！`);
        setBulkText('');
        setTimeout(() => {
          setImportStatus(null);
          onClose();
        }, 1200);
      } else {
        setImportStatus('用語を解析できませんでした。フォーマットを確認してください。');
      }
    } catch {
      setImportStatus('インポート処理でエラーが発生しました。');
    }
  };

  const handleSingleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !summary.trim()) {
      alert('「用語名」と「意味・解説」は必須項目です。');
      return;
    }

    const newTerm: WeddingTerm = {
      id: `term-${Date.now()}`,
      term: term.trim(),
      reading: reading.trim() || term.trim(),
      category,
      importance,
      summary: summary.trim(),
      detail: detail.trim() || summary.trim(),
      point: point.trim() || 'マナーを守り丁寧に対応します。',
      question: question.trim() || `${term.trim()}に関する問いかけ`,
      example: example.trim() || undefined,
      tags: ['新規追加']
    };

    onImport([newTerm]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                用語の追加・テキスト一括インポート
              </h3>
              <p className="text-xs text-slate-400">
                お手元の研修リスト・テキスト・CSVをそのまま取り込めます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 border-b border-slate-100 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'text' 
                ? 'border-rose-500 text-rose-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            テキスト・CSVを一括貼り付け
          </button>
          <button
            onClick={() => setActiveTab('single')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'single' 
                ? 'border-rose-500 text-rose-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            1件ずつ入力して追加
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'text' ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-700 block">💡 貼り付けフォーマット例（どの形式でも自動解析します）:</span>
                <div>・ <code>用語名：解説や意味</code></div>
                <div>・ <code>用語名（よみ）：解説や意味</code></div>
                <div>・ <code>用語名, よみがな, 意味, 現場での注意点</code>（カンマ・タブ区切り）</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  お手元のテキストデータをここに貼り付けてください:
                </label>
                <textarea
                  rows={8}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={`例:
白無垢（しろむく）：室町時代からの最も格式高い花嫁正礼装
高砂（たかさご）：披露宴で新郎新婦が座るメインテーブル
ドンデン：前の宴が終わってから次の宴までの会場転換作業
キャプテン：披露宴会場の進行最高責任者`}
                  className="w-full p-3 text-xs sm:text-sm font-mono border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {importStatus && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{importStatus}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('初期登録のプリセット専門用語データ（全項目）にリセットしますか？')) {
                      onResetToDefault();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  初期プリセット用語へ戻す
                </button>

                <button
                  type="button"
                  onClick={handleBulkImport}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-xs sm:text-sm hover:bg-rose-600 shadow-md shadow-rose-200 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  一括取り込みを実行
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSingleAdd} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">用語名 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="例: 白無垢"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">よみがな</label>
                  <input
                    type="text"
                    value={reading}
                    onChange={(e) => setReading(e.target.value)}
                    placeholder="例: しろむく"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">カテゴリ</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">重要度</label>
                  <select
                    value={importance}
                    onChange={(e) => setImportance(Number(e.target.value) as 3 | 4 | 5)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white"
                  >
                    <option value={5}>★★★★★ 新人必修</option>
                    <option value={4}>★★★★ 重要実務</option>
                    <option value={3}>★★★ 基礎教養</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">意味・解説の要約 <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="用語の意味・定義を簡潔に記述"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">現場での注意点・プロの所作 (POINT)</label>
                <input
                  type="text"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  placeholder="例: 水濡れやメイク付着に極めて注意。"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-xs sm:text-sm hover:bg-rose-600 shadow-md shadow-rose-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  用語を登録する
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
