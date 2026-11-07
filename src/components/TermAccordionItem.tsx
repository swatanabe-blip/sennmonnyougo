import React from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  Bookmark, 
  Star, 
  AlertCircle, 
  MessageSquare,
  Eye,
  EyeOff,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { WeddingTerm, CATEGORIES } from '../data/weddingTerms';

interface TermAccordionItemProps {
  term: WeddingTerm;
  isOpen: boolean;
  onToggle: () => void;
  isLearned: boolean;
  onToggleLearned: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const TermAccordionItem: React.FC<TermAccordionItemProps> = ({
  term,
  isOpen,
  onToggle,
  isLearned,
  onToggleLearned,
  isBookmarked,
  onToggleBookmark
}) => {
  const categoryInfo = CATEGORIES.find(c => c.id === term.category);

  return (
    <article 
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-sm ${
        isOpen 
          ? 'border-rose-300 ring-2 ring-rose-100' 
          : 'border-slate-200 hover:border-slate-300'
      } ${isLearned ? 'bg-gradient-to-r from-emerald-50/20 via-white to-white' : ''}`}
    >
      {/* Accordion Header - clickable */}
      <div 
        onClick={onToggle}
        className="p-4 sm:p-5 cursor-pointer select-none transition-colors"
      >
        {/* Meta row: Category, Importance, Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Category Tag */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              categoryInfo ? categoryInfo.badgeColor : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {categoryInfo?.shortName || term.category}
            </span>

            {/* Importance Star */}
            <div className="flex items-center gap-0.5 text-amber-400" title={`重要度: 星${term.importance}つ`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${
                    i < term.importance 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-slate-200'
                  }`} 
                />
              ))}
              {term.importance === 5 && (
                <span className="ml-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  新人必修
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions (Bookmark & Mastered) */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Bookmark Button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              title={isBookmarked ? 'ブックマーク解除' : '重要用語としてブックマーク'}
              className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                isBookmarked 
                  ? 'bg-rose-50 text-rose-600 border-rose-300' 
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-500' : ''}`} />
              <span className="hidden sm:inline text-[11px]">
                {isBookmarked ? '重要' : 'マーク'}
              </span>
            </button>

            {/* Mastered / Learned Button */}
            <button
              type="button"
              onClick={onToggleLearned}
              title={isLearned ? '未習得に戻す' : '「覚えた！」にチェック'}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isLearned 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isLearned ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
              <span>{isLearned ? '覚えた！' : '要復習'}</span>
            </button>
          </div>
        </div>

        {/* Title area (Conforming to Engineer Note: h3.term-title & button.toggle-btn) */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="term-title text-lg sm:text-xl font-bold text-slate-900 font-serif-jp flex items-baseline flex-wrap gap-2">
              <span>{term.term}</span>
              <span className="text-xs sm:text-sm font-normal text-slate-400 tracking-normal">
                （{term.reading}）
              </span>
            </h3>

            {/* If question exists, show as gentle subtext */}
            {term.question && !isOpen && (
              <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">
                <span className="text-rose-500 font-semibold mr-1">設問:</span>
                {term.question}
              </p>
            )}
          </div>

          {/* Toggle Button */}
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`toggle-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                isOpen 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' 
                  : 'bg-rose-500 text-white hover:bg-rose-600 shadow-xs shadow-rose-200 hover:shadow-sm'
              }`}
              onClick={onToggle}
              aria-expanded={isOpen}
              aria-controls={`answer-${term.id}`}
            >
              {isOpen ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>閉じる</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>正解・意味を見る</span>
                </>
              )}
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Body (Conforming to Engineer Note: div.term-answer) */}
      <div 
        id={`answer-${term.id}`}
        className={`term-answer transition-all duration-300 ease-in-out border-t ${
          isOpen 
            ? 'max-h-[1400px] opacity-100 bg-slate-50/70 border-rose-100 p-4 sm:p-6 block' 
            : 'max-h-0 opacity-0 overflow-hidden border-transparent p-0 hidden'
        }`}
      >
        <div className="space-y-4">
          
          {/* 1. 正解・意味 (Summary Box) */}
          <div className="bg-white border-l-4 border-rose-500 rounded-r-xl p-3.5 sm:p-4 shadow-2xs border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>【正解・意味の要約】</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
              {term.summary}
            </p>
          </div>

          {/* 2. クイズ設問文 (Self-check Question) */}
          {term.question && (
            <div className="bg-rose-50/60 border border-rose-200/70 rounded-xl p-3 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-900 mr-1.5">研修クイズ出題文:</span>
                <span>{term.question}</span>
              </div>
            </div>
          )}

          {/* 3. 詳細解説・背景 */}
          {term.detail && (
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800 text-xs mb-1">
                【詳細解説・語源と由来】
              </div>
              <p>{term.detail}</p>
            </div>
          )}

          {/* 4. 現場での注意点・プロの心得 (POINT) */}
          {term.point && (
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>現場での注意点・プロの所作心得 (POINT)</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {term.point}
              </p>
            </div>
          )}

          {/* 5. 現場での会話・使用例 */}
          {term.example && (
            <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-indigo-900 mr-1.5">現場での会話例:</span>
                <span className="text-slate-700 italic">「{term.example}」</span>
              </div>
            </div>
          )}

          {/* 6. Tags */}
          {term.tags && term.tags.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">タグ:</span>
              {term.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
