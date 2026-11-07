import React from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Trophy, 
  FileText, 
  ShieldAlert, 
  ListOrdered,
  Printer,
  RotateCcw,
  ShieldCheck,
  Award
} from 'lucide-react';

export type AppMode = 'categories' | 'accordion' | 'index' | 'quiz' | 'taboo' | 'spec';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  learnedCount: number;
  totalCount: number;
  onResetProgress: () => void;
  onPrint: () => void;
  onOpenTerms: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  learnedCount,
  totalCount,
  onResetProgress,
  onPrint,
  onOpenTerms
}) => {
  const percentage = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  return (
    <header className="bg-white border-b border-rose-100 shadow-2xs sticky top-0 z-30">
      {/* Bridal Accent Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Official Title */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onModeChange('categories')}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-200 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                  <Award className="w-3 h-3 text-amber-600" />
                  一流ホテルマン監修
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  全18カテゴリー完全網羅
                </span>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-slate-500 hover:text-rose-600 hover:underline transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  © shigenori,watanabe（流用・転載禁止）
                </button>
              </div>
              <h1 
                onClick={() => onModeChange('categories')}
                className="text-base sm:text-xl font-bold text-slate-900 tracking-tight font-serif-jp cursor-pointer hover:text-rose-600 transition-colors mt-0.5"
              >
                着物ナビブライダルディレクター総合研修専門用語集
              </h1>
            </div>
          </div>

          {/* Progress & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 self-end md:self-center">
            
            {/* Copyright & Terms Modal Trigger Button */}
            <button
              onClick={onOpenTerms}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
              title="監修・著作権および利用規約を表示"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>著作権・規約</span>
            </button>

            {/* Overall Progress Widget */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-[10px] font-medium text-slate-500">全体習得度</div>
                <div className="text-xs font-bold text-rose-600">
                  {learnedCount} <span className="text-[10px] text-slate-400 font-normal">/ {totalCount}語 ({percentage}%)</span>
                </div>
              </div>
              <div className="w-16 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Print button */}
            <button
              onClick={onPrint}
              title="研修レジュメとして印刷 / PDF保存"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">印刷</span>
            </button>
          </div>
        </div>

        {/* Navigation Mode Tabs */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1.5 shrink-0 text-xs sm:text-sm">
            <button
              onClick={() => onModeChange('categories')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'categories'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              18大カテゴリー
            </button>

            <button
              onClick={() => onModeChange('accordion')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'accordion'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              アコーディオン学習
            </button>

            <button
              onClick={() => onModeChange('index')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'index'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              50音順 索引
            </button>

            <button
              onClick={() => onModeChange('taboo')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'taboo'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              忌み言葉 虎の巻
            </button>

            <button
              onClick={() => onModeChange('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'quiz'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <Trophy className="w-4 h-4" />
              実力判定クイズ（4択）
            </button>

            <button
              onClick={() => onModeChange('spec')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                currentMode === 'spec'
                  ? 'bg-rose-500 text-white font-bold shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              <FileText className="w-4 h-4" />
              制作仕様書
            </button>
          </nav>

          <button
            onClick={onResetProgress}
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-600 transition-colors shrink-0 ml-2"
            title="学習進捗をリセット"
          >
            <RotateCcw className="w-3 h-3" />
            進捗リセット
          </button>
        </div>
      </div>
    </header>
  );
};
