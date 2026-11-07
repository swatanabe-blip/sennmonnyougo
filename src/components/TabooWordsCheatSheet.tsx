import React, { useState } from 'react';
import { ShieldAlert, Search, ArrowRight, Check, X } from 'lucide-react';
import { TABOO_WORDS } from '../data/weddingTerms';

export const TabooWordsCheatSheet: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredWords = TABOO_WORDS.filter(item => 
    item.word.includes(filterQuery) ||
    item.alternative.includes(filterQuery) ||
    item.category.includes(filterQuery) ||
    item.reason.includes(filterQuery)
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 rounded-3xl p-6 border border-teal-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-serif-jp">
              現場で役立つ 忌み言葉・重ね言葉 言い換え虎の巻
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              結婚式では「別れ」「不幸」「再婚（繰り返し）」を連想させる表現を避けるのが最高位の礼儀です。
              司会アナウンス・介添・接客サービス時に即座に言い換えられるようマスターしましょう。
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="忌み言葉や言い換えワードを絞り込み検索（例：切る、終わる、度々）..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400 text-slate-800 shadow-2xs"
        />
      </div>

      {/* Taboo Words Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">NG表現（忌み言葉・重ね言葉）</th>
                <th className="py-3 px-4">ジャンル</th>
                <th className="py-3 px-4 text-emerald-700">プロの推奨言い換え（OK表現）</th>
                <th className="py-3 px-4 text-slate-500">避ける理由・言霊の背景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWords.map((item, idx) => (
                <tr key={idx} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-rose-600 flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{item.word}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.alternative}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">
                    {item.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
