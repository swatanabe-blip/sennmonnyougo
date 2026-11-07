import React from 'react';
import { Search, X, CheckCircle2, Bookmark, ChevronsUpDown, ChevronsDownUp, Star, Filter } from 'lucide-react';

export type StatusFilter = 'all' | 'unlearned' | 'learned' | 'bookmarked';
export type ImportanceFilter = 'all' | '5' | '4';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  importanceFilter: ImportanceFilter;
  onImportanceFilterChange: (importance: ImportanceFilter) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  totalFiltered: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  importanceFilter,
  onImportanceFilterChange,
  onExpandAll,
  onCollapseAll,
  totalFiltered
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-6 space-y-3">
      {/* Search Input & Quick Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="用語名・よみがな・キーワード・現場心得を検索..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand / Collapse All Buttons */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={onExpandAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            title="すべての解説を展開"
          >
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
            すべて開く
          </button>
          <button
            onClick={onCollapseAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            title="すべての解説を閉じる"
          >
            <ChevronsDownUp className="w-3.5 h-3.5 text-slate-500" />
            すべて閉じる
          </button>
        </div>
      </div>

      {/* Filter Row: Status & Importance */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-slate-500 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>絞り込み:</span>
          </div>

          {/* Status Tabs */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/70">
            <button
              onClick={() => onStatusFilterChange('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全表示
            </button>
            <button
              onClick={() => onStatusFilterChange('unlearned')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                statusFilter === 'unlearned'
                  ? 'bg-amber-500 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              要復習・未習得
            </button>
            <button
              onClick={() => onStatusFilterChange('learned')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'learned'
                  ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              習得済み
            </button>
            <button
              onClick={() => onStatusFilterChange('bookmarked')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'bookmarked'
                  ? 'bg-rose-500 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              重要チェック
            </button>
          </div>

          {/* Importance Filter */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/70">
            <button
              onClick={() => onImportanceFilterChange('all')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                importanceFilter === 'all'
                  ? 'bg-white text-slate-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全難易度
            </button>
            <button
              onClick={() => onImportanceFilterChange('5')}
              className={`px-2 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                importanceFilter === '5'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              新人必修 (★5)
            </button>
          </div>
        </div>

        {/* Right: Results Count */}
        <div className="text-slate-500 font-medium">
          該当: <span className="font-bold text-slate-800">{totalFiltered}</span> 件
        </div>
      </div>
    </div>
  );
};
