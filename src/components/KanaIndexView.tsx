import React, { useState } from 'react';
import { MasterTerm, MASTER_CATEGORIES } from '../data/types';
import { Search, BookOpen, ExternalLink } from 'lucide-react';

interface KanaIndexViewProps {
  terms: MasterTerm[];
  onSelectTerm: (termId: string, catNo: string) => void;
}

const KANA_GROUPS = [
  { label: 'あ行', chars: ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'] },
  { label: 'か行', chars: ['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'カ', 'キ', 'ク', 'ケ', 'コ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ'] },
  { label: 'さ行', chars: ['さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
  { label: 'た行', chars: ['た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ', 'づ', 'で', 'ど', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
  { label: 'な行', chars: ['な', 'に', 'ぬ', 'ね', 'の', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
  { label: 'は行', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ'] },
  { label: 'ま行', chars: ['ま', 'み', 'む', 'め', 'も', 'マ', 'ミ', 'ム', 'メ', 'モ'] },
  { label: 'や行', chars: ['や', 'ゆ', 'よ', 'ヤ', 'ユ', 'ヨ'] },
  { label: 'ら行', chars: ['ら', 'り', 'る', 'れ', 'ろ', 'ラ', 'リ', 'ル', 'レ', 'ロ'] },
  { label: 'わ行', chars: ['わ', 'を', 'ん', 'ワ', 'ヲ', 'ン'] },
];

export const KanaIndexView: React.FC<KanaIndexViewProps> = ({ terms, onSelectTerm }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTerms = terms.filter(term => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        term.term.toLowerCase().includes(q) || 
        term.reading.toLowerCase().includes(q) || 
        term.meaning.toLowerCase().includes(q) ||
        (term.english && term.english.toLowerCase().includes(q))
      );
    }
    if (selectedGroup === 'all') return true;

    const group = KANA_GROUPS.find(g => g.label === selectedGroup);
    if (!group) return true;

    const firstChar = term.reading.charAt(0);
    return group.chars.includes(firstChar);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Intro */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-serif-jp flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <span>五十音順 ブライダル専門用語 総合索引</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            全18カテゴリー・計 {terms.length} 項目の専門用語を五十音から素早く引けるクイック辞書です
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="五十音索引内を検索..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      {/* Kana Group Buttons */}
      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-2xl border border-slate-200">
        <button
          onClick={() => setSelectedGroup('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedGroup === 'all'
              ? 'bg-rose-500 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          全行
        </button>
        {KANA_GROUPS.map(group => (
          <button
            key={group.label}
            onClick={() => setSelectedGroup(group.label)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedGroup === group.label
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Terms Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredTerms.map(term => {
            const cat = MASTER_CATEGORIES.find(c => c.no === term.catNo);
            return (
              <div 
                key={term.id}
                onClick={() => onSelectTerm(term.id, term.catNo)}
                className="p-4 hover:bg-rose-50/30 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      No.{term.catNo} {cat?.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      読み：{term.reading}
                    </span>
                    {term.english && (
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                        ({term.english})
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors font-serif-jp">
                    {term.term}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {term.meaning}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-semibold text-rose-500 group-hover:underline flex items-center gap-1">
                    解説を開く
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
