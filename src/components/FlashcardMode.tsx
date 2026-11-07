import React, { useState } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Shuffle,
  Lightbulb,
  Bookmark
} from 'lucide-react';
import { WeddingTerm, CATEGORIES } from '../data/weddingTerms';

interface FlashcardModeProps {
  terms: WeddingTerm[];
  learnedMap: { [id: string]: boolean };
  onToggleLearned: (id: string) => void;
  bookmarkMap: { [id: string]: boolean };
  onToggleBookmark: (id: string) => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  terms,
  learnedMap,
  onToggleLearned,
  bookmarkMap,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (terms.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500">表示できる用語がありません。フィルター条件を緩和してください。</p>
      </div>
    );
  }

  const currentTerm = terms[currentIndex % terms.length];
  const isLearned = !!learnedMap[currentTerm.id];
  const isBookmarked = !!bookmarkMap[currentTerm.id];
  const categoryInfo = CATEGORIES.find(c => c.id === currentTerm.category);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % terms.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + terms.length) % terms.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * terms.length));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm">
            {currentIndex + 1} / {terms.length}
          </span>
          <span>カード</span>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          ランダムシャッフル
        </button>
      </div>

      {/* 3D Flashcard Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[380px] bg-white rounded-3xl border-2 border-rose-200/80 shadow-lg cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-rose-300 relative group overflow-hidden"
      >
        {/* Subtle Watermark BG */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-rose-50/50 -z-10 group-hover:scale-110 transition-transform" />

        {/* Card Header */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            categoryInfo ? categoryInfo.badgeColor : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {categoryInfo?.name || currentTerm.category}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onToggleBookmark(currentTerm.id)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isBookmarked 
                  ? 'bg-rose-50 text-rose-600 border-rose-300' 
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
              title="ブックマーク"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => onToggleLearned(currentTerm.id)}
              className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isLearned 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isLearned ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
              <span>{isLearned ? '習得済み' : '要復習'}</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="my-auto py-6 text-center">
          {!isFlipped ? (
            /* FRONT: Term Name & Question Clue */
            <div className="space-y-4">
              <span className="text-xs font-semibold text-rose-500 tracking-wider uppercase">
                【 用語名 】
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-jp tracking-tight">
                {currentTerm.term}
              </h2>
              <p className="text-sm text-slate-400">
                読み：{currentTerm.reading}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 max-w-md mx-auto text-left bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>クイズの問いかけ</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentTerm.question}
                </p>
              </div>
            </div>
          ) : (
            /* BACK: Answer, Summary & Tips */
            <div className="space-y-4 text-left animate-fadeIn">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                <span className="text-xs font-bold text-rose-700 block mb-1">
                  💡 正解・意味の要約
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                  {currentTerm.summary}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentTerm.detail}
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold mr-1">現場での心得:</span>
                  <span>{currentTerm.point}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Hint */}
        <div className="text-center pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>カードをクリック／タップして裏表を切り替え</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          前の用語
        </button>

        <button
          onClick={handleNext}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors shadow-md shadow-rose-200"
        >
          次の用語
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
