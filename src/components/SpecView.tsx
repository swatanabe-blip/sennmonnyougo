import React, { useState } from 'react';
import { FileText, Copy, Check, Code, Layers, Sparkles, Table } from 'lucide-react';
import { ALL_MASTER_TERMS } from '../data/masterDatabase';
import { MASTER_CATEGORIES } from '../data/types';

export const SpecView: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const sampleHtmlSnippet = `<!-- 【ブライダル総合研修】専門用語マスター アコーディオン実装スニペット -->
<div class="bridal-term-card">
  <!-- タイトル部：用語名 & 読み仮名 -->
  <h3 class="term-title">白無垢（しろむく）</h3>
  
  <!-- トグルボタン：aria-expanded属性でアクセシビリティ担保 -->
  <button class="toggle-btn" aria-expanded="false" aria-controls="answer-w01">
    正解・意味を見る
  </button>
  
  <!-- 解説エリア：初期非表示、トグルで展開 -->
  <div id="answer-w01" class="term-answer" style="display: none;">
    <div class="summary"><strong>【正式な意味・解説】</strong>室町時代からの伝統を誇る最も格式高い花嫁衣裳。「何色にも染まる」純真無垢の象徴。</div>
    <div class="point"><strong>【現場での注意点】</strong>正絹の水濡れやファンデーション付着に極めて注意。介添人は裾捌きを完璧にサポート。</div>
  </div>
</div>

<script>
// エンジニア向け標準実装ロジック
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    const answer = btn.nextElementSibling;
    answer.style.display = isExpanded ? 'none' : 'block';
    btn.textContent = isExpanded ? '正解・意味を見る' : '解説を閉じる';
  });
});
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleHtmlSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(ALL_MASTER_TERMS, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Document Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>仕様書・エンジニア実装指示書</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            一流ホテルマン監修 / © shigenori,watanabe
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-serif-jp">
          着物ナビブライダルディレクター総合研修専門用語集
        </h2>
        <p className="text-sm font-semibold text-rose-700 mt-1">
          全18カテゴリー・計{ALL_MASTER_TERMS.length}項目完全網羅（※本コンテンツの著作権はshigenori,watanabeに帰属し、他社での流用・転載を禁止します）
        </p>

        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              1. システムの目的・著作権保護
            </h4>
            <p className="text-slate-600 leading-relaxed">
              一流ホテルマン監修のもと、着物ナビブライダルディレクターおよび結婚式・ホテル・料飲スタッフが業界必須の専門用語を体系的に学習できるWeb研修マニュアル。単なる辞書ではなく、用語を見て意味を考えボタンで解説を開くクイズ・アコーディオン形式。<strong>著作権はshigenori,watanabeに帰属し他社流用・転載を厳禁します。</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              2. 画面挙動仕様 (UI/UX)
            </h4>
            <ul className="text-slate-600 space-y-1 list-disc list-inside leading-relaxed">
              <li>初期状態では「用語名（タイトル）」のみ表示（正解・意味は非表示）。</li>
              <li>「正解・意味を見る」ボタンでアコーディオン展開。</li>
              <li>全18カテゴリーのカード一覧および絞り込み学習。</li>
              <li>受講生自己評価「理解した」「復習する」のlocalStorage進捗保存。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 18 Categories Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">
            全18カテゴリー構成一覧
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-2.5 border border-slate-200 w-16">No.</th>
                <th className="p-2.5 border border-slate-200 w-48">大カテゴリー</th>
                <th className="p-2.5 border border-slate-200">主な収録内容</th>
                <th className="p-2.5 border border-slate-200 w-24 text-right">登録語数</th>
              </tr>
            </thead>
            <tbody>
              {MASTER_CATEGORIES.map(cat => {
                const count = ALL_MASTER_TERMS.filter(t => t.catNo === cat.no).length;
                return (
                  <tr key={cat.no} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 border border-slate-200 font-mono font-bold text-slate-600">{cat.no}</td>
                    <td className="p-2.5 border border-slate-200 font-bold text-slate-900">{cat.name}</td>
                    <td className="p-2.5 border border-slate-200 text-slate-600">{cat.subTitle}</td>
                    <td className="p-2.5 border border-slate-200 font-mono font-semibold text-rose-600 text-right">{count}語</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineering Instruction Code Block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-600" />
              エンジニア向け実装指示コード（HTML/CSS/JS）
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              WordPress、社内LMS、静的LPへそのまま組み込めるスタンドアロン実装雛形
            </p>
          </div>

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedCode ? 'コピー完了！' : 'HTMLコードをコピー'}
          </button>
        </div>

        <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <pre>{sampleHtmlSnippet}</pre>
        </div>
      </div>

      {/* JSON Data Export */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              全18カテゴリー 登録データ一覧（JSONエクスポート）
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              全{ALL_MASTER_TERMS.length}語の構造化データ（読み、英語、意味・解説、現場ポイント、関連語）
            </p>
          </div>

          <button
            onClick={handleCopyJson}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
          >
            {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedJson ? 'コピー完了！' : '全JSONデータをコピー'}
          </button>
        </div>

        <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-80 overflow-y-auto leading-relaxed border border-slate-800">
          <pre>{JSON.stringify(ALL_MASTER_TERMS.slice(0, 3), null, 2)}
          {'\n// ... 計' + ALL_MASTER_TERMS.length + '件の専門用語データ'}</pre>
        </div>
      </div>
    </div>
  );
};
