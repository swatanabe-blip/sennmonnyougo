import React from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  Bookmark, 
  AlertCircle, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Globe2, 
  Link2 
} from 'lucide-react';
import { MasterTerm } from '../data/types';

interface MasterAccordionItemProps {
  term: MasterTerm;
  isOpen: boolean;
  onToggle: () => void;
  isLearned: boolean;
  onToggleLearned: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSearchRelated?: (relatedTerm: string) => void;
}

export const MasterAccordionItem: React.FC<MasterAccordionItemProps> = ({
  term,
  isOpen,
  onToggle,
  isLearned,
  onToggleLearned,
  isBookmarked,
  onToggleBookmark,
  onSearchRelated
}) => {
  return (
    <article 
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-sm ${
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
        {/* Meta row: Subcategory badge, Status buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Subcategory Tag */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {term.subCat}
            </span>

            {/* English tag if present */}
            {term.english && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                <Globe2 className="w-3 h-3 text-slate-400" />
                {term.english}
              </span>
            )}
          </div>

          {/* Quick Actions (Bookmark & Learned) */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Bookmark (復習) Button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              title={isBookmarked ? '復習マークを解除' : '要復習としてマーク'}
              className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                isBookmarked 
                  ? 'bg-amber-50 text-amber-700 border-amber-300 font-bold' 
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline text-[11px]">
                {isBookmarked ? '要復習' : '復習'}
              </span>
            </button>

            {/* Mastered / Learned (理解した) Button */}
            <button
              type="button"
              onClick={onToggleLearned}
              title={isLearned ? '未習得に戻す' : '「理解した」にチェック'}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isLearned 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isLearned ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
              <span>{isLearned ? '理解した！' : '未習得'}</span>
            </button>
          </div>
        </div>

        {/* Title area: Term title & Toggle button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="term-title text-lg sm:text-xl font-bold text-slate-900 font-serif-jp flex items-baseline flex-wrap gap-2">
              <span>{term.term}</span>
              <span className="text-xs sm:text-sm font-normal text-slate-400 tracking-normal font-sans">
                （{term.reading}）
              </span>
            </h3>
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

      {/* Accordion Body - reveals on open */}
      <div 
        id={`answer-${term.id}`}
        className={`term-answer transition-all duration-300 ease-in-out border-t ${
          isOpen 
            ? 'max-h-[1400px] opacity-100 bg-slate-50/70 border-rose-100 p-4 sm:p-6 block' 
            : 'max-h-0 opacity-0 overflow-hidden border-transparent p-0 hidden'
        }`}
      >
        <div className="space-y-4">
          
          {/* 1. 正解・意味 (Formal Meaning / Definition) */}
          <div className="bg-white border-l-4 border-rose-500 rounded-r-xl p-3.5 sm:p-4 shadow-2xs border border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                <BookOpen className="w-4 h-4" />
                <span>【正式な意味・解説】</span>
              </div>
              {term.english && (
                <span className="text-[11px] font-mono text-slate-400">
                  英: {term.english}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
              {term.meaning}
            </p>
          </div>

          {/* 2. 現場での注意点・プロの心得 (POINT) */}
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

          {/* 3. 関連用語 (Related terms) */}
          {term.related && term.related.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5" />
                関連用語:
              </span>
              {term.related.map((rel, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSearchRelated && onSearchRelated(rel)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-rose-300 hover:text-rose-600 text-slate-700 transition-colors shadow-2xs"
                >
                  {rel}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
