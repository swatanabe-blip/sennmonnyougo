import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Lightbulb,
  Sparkles,
  Filter
} from 'lucide-react';
import { ALL_MASTER_TERMS } from '../data/masterDatabase';
import { MASTER_CATEGORIES, MasterTerm } from '../data/types';

interface QuizQuestionItem {
  id: string;
  term: MasterTerm;
  questionText: string;
  options: { id: string; label: string }[];
  correctTermId: string;
}

export const QuizChallenge: React.FC = () => {
  const [selectedCatNo, setSelectedCatNo] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [quizSeed, setQuizSeed] = useState(0);

  // Generate 10 randomized quiz questions from ALL_MASTER_TERMS
  const questions: QuizQuestionItem[] = useMemo(() => {
    // Filter pool by category
    const pool = selectedCatNo === 'all' 
      ? ALL_MASTER_TERMS 
      : ALL_MASTER_TERMS.filter(t => t.catNo === selectedCatNo);

    if (pool.length === 0) return [];

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    return selected.map((target, idx) => {
      // 3 wrong options from the pool (or from ALL_MASTER_TERMS if pool is small)
      const otherTerms = ALL_MASTER_TERMS.filter(t => t.id !== target.id);
      const shuffledOthers = [...otherTerms].sort(() => Math.random() - 0.5);
      const wrongOptions = shuffledOthers.slice(0, 3);

      const allOptions = [
        { id: target.id, label: `${target.term}（${target.reading}）` },
        ...wrongOptions.map(w => ({ id: w.id, label: `${w.term}（${w.reading}）` }))
      ].sort(() => Math.random() - 0.5);

      // Question: Redact term name from meaning if it appears, or use meaning directly
      const regex = new RegExp(target.term, 'g');
      const redactedMeaning = target.meaning.replace(regex, '【　？　】');

      return {
        id: `q-${target.id}-${idx}`,
        term: target,
        questionText: `次の解説文が説明しているブライダル専門用語として最も適切なものはどれか？\n\n「${redactedMeaning}」`,
        options: allOptions,
        correctTermId: target.id
      };
    });
  }, [selectedCatNo, quizSeed]);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (termId: string) => {
    if (isAnswered) return;
    setSelectedOption(termId);
    setIsAnswered(true);

    if (termId === currentQ.correctTermId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= Math.floor(totalQuestions * 0.8)) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    setQuizSeed(prev => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleCategoryChange = (catNo: string) => {
    setSelectedCatNo(catNo);
    setQuizSeed(prev => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (totalQuestions === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
        <p className="text-slate-600">問題データが見つかりませんでした。</p>
        <button
          onClick={() => handleCategoryChange('all')}
          className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold"
        >
          全カテゴリーから出題
        </button>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 80;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-amber-200">
          <Trophy className="w-10 h-10" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 mb-2">
            実技テスト結果判定
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-serif-jp">
            {isPassed ? 'おめでとうございます！合格です🎉' : '研修テスト完了！復習しましょう📝'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            ブライダル専門用語 習得度判定スコア
          </p>
        </div>

        {/* Score Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-sm mx-auto">
          <div className="text-4xl font-extrabold text-slate-800">
            {score} <span className="text-xl font-normal text-slate-400">/ {totalQuestions}問</span>
          </div>
          <div className="text-sm font-semibold text-rose-600 mt-1">
            正解率: {percentage}%
          </div>
          <div className="mt-3 text-xs text-slate-500 leading-relaxed">
            {isPassed 
              ? '卓越した専門用語の理解度です！現場での接客・アテンド・配膳に自信を持って臨んでください。' 
              : '80%以上で合格基準です。アコーディオン用語集で間違えた問題を再確認してみましょう。'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors shadow-md shadow-rose-200"
          >
            <RotateCcw className="w-4 h-4" />
            別の問題で再チャレンジ
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentQ.correctTermId;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Category selector pill bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-500 font-medium">
          <Filter className="w-4 h-4 text-rose-500" />
          <span>出題分野:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedCatNo === 'all'
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            全18カテゴリー（総合）
          </button>
          {MASTER_CATEGORIES.slice(0, 8).map(c => (
            <button
              key={c.no}
              onClick={() => handleCategoryChange(c.no)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCatNo === c.no
                  ? 'bg-rose-500 text-white font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.no}. {c.name.split('・')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        {/* Header Progress */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center">
              Q{currentIndex + 1}
            </span>
            <span className="text-xs font-medium text-slate-500">
              第 {currentIndex + 1} 問 / 全 {totalQuestions} 問
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              No.{currentQ.term.catNo} {currentQ.term.subCat}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>現在の正解数:</span>
            <span className="text-rose-600 font-bold">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-gradient-to-r from-rose-400 to-amber-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>問題</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed whitespace-pre-line">
            {currentQ.questionText}
          </h3>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const isThisOptionSelected = selectedOption === option.id;
            const isThisOptionCorrect = option.id === currentQ.correctTermId;

            let buttonStyle = 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100';
            let icon = null;

            if (isAnswered) {
              if (isThisOptionCorrect) {
                buttonStyle = 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-2 ring-emerald-300 font-bold';
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
              } else if (isThisOptionSelected && !isThisOptionCorrect) {
                buttonStyle = 'bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-200';
                icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              } else {
                buttonStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-xs text-slate-500 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{option.label}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Feedback Area after Answering */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
            <div className={`p-4 rounded-2xl border ${
              isCurrentCorrect 
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>正解です！素晴らしい！</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>正解は「{currentQ.term.term}（{currentQ.term.reading}）」です</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed text-slate-700">
                <strong>【解説】</strong>{currentQ.term.meaning}
              </p>
            </div>

            {/* Practical Tip Highlight */}
            {currentQ.term.point && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold mr-1">現場での心得・注意点:</span>
                  <span>{currentQ.term.point}</span>
                </div>
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                <span>{currentIndex < totalQuestions - 1 ? '次の問題へ' : '結果を見る'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
