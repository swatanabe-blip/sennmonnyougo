import React, { useState, useEffect, useMemo } from 'react';
import { Header, AppMode } from './components/Header';
import { MasterCategoryCard } from './components/MasterCategoryCard';
import { MasterAccordionItem } from './components/MasterAccordionItem';
import { KanaIndexView } from './components/KanaIndexView';
import { TabooWordsCheatSheet } from './components/TabooWordsCheatSheet';
import { QuizChallenge } from './components/QuizChallenge';
import { SpecView } from './components/SpecView';
import { TermsModal } from './components/TermsModal';
import { ALL_MASTER_TERMS } from './data/masterDatabase';
import { MASTER_CATEGORIES, MasterTerm } from './data/types';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Bookmark, 
  Eye, 
  EyeOff, 
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  X,
  Award,
  ShieldCheck
} from 'lucide-react';

const STORAGE_KEY_LEARNED = 'bridal_master_learned_map_v4';
const STORAGE_KEY_BOOKMARK = 'bridal_master_bookmark_map_v4';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('categories');
  const [selectedCatNo, setSelectedCatNo] = useState<string>('01');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned' | 'bookmarked'>('all');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Accordion open/close map
  const [openedMap, setOpenedMap] = useState<{ [id: string]: boolean }>({});

  // Learned state persisted in localStorage
  const [learnedMap, setLearnedMap] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEARNED);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmark state persisted in localStorage
  const [bookmarkMap, setBookmarkMap] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEARNED, JSON.stringify(learnedMap));
    } catch (e) {
      console.error(e);
    }
  }, [learnedMap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARK, JSON.stringify(bookmarkMap));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkMap]);

  const learnedCount = useMemo(() => {
    return Object.values(learnedMap).filter(Boolean).length;
  }, [learnedMap]);

  const bookmarkCount = useMemo(() => {
    return Object.values(bookmarkMap).filter(Boolean).length;
  }, [bookmarkMap]);

  const totalTerms = ALL_MASTER_TERMS.length;
  const overallPercentage = totalTerms > 0 ? Math.round((learnedCount / totalTerms) * 100) : 0;

  // Active Category info
  const activeCategory = useMemo(() => {
    return MASTER_CATEGORIES.find(c => c.no === selectedCatNo);
  }, [selectedCatNo]);

  // Subcategories available in active category
  const availableSubCats = useMemo(() => {
    if (selectedCatNo === 'all') return [];
    const catTerms = ALL_MASTER_TERMS.filter(t => t.catNo === selectedCatNo);
    const set = new Set(catTerms.map(t => t.subCat));
    return Array.from(set);
  }, [selectedCatNo]);

  // Filtered terms for accordion view
  const filteredTerms = useMemo(() => {
    return ALL_MASTER_TERMS.filter(item => {
      // Category filter
      if (selectedCatNo !== 'all' && item.catNo !== selectedCatNo) {
        return false;
      }

      // Subcategory filter
      if (selectedSubCat !== 'all' && item.subCat !== selectedSubCat) {
        return false;
      }

      // Status filter
      const isLearned = !!learnedMap[item.id];
      const isBookmarked = !!bookmarkMap[item.id];
      if (statusFilter === 'unlearned' && isLearned) {
        return false;
      }
      if (statusFilter === 'learned' && !isLearned) {
        return false;
      }
      if (statusFilter === 'bookmarked' && !isBookmarked) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTerm = item.term.toLowerCase().includes(q);
        const matchReading = item.reading.toLowerCase().includes(q);
        const matchEnglish = item.english ? item.english.toLowerCase().includes(q) : false;
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchPoint = item.point ? item.point.toLowerCase().includes(q) : false;
        const matchSub = item.subCat.toLowerCase().includes(q);
        const matchRelated = item.related ? item.related.some(r => r.toLowerCase().includes(q)) : false;

        if (!matchTerm && !matchReading && !matchEnglish && !matchMeaning && !matchPoint && !matchSub && !matchRelated) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCatNo, selectedSubCat, statusFilter, searchQuery, learnedMap, bookmarkMap]);

  // Handler: Select Category from Card Grid
  const handleSelectCategory = (catNo: string) => {
    setSelectedCatNo(catNo);
    setSelectedSubCat('all');
    setCurrentMode('accordion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle single accordion
  const handleToggleAccordion = (id: string) => {
    setOpenedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand all currently filtered
  const handleExpandAll = () => {
    const nextMap: { [id: string]: boolean } = { ...openedMap };
    filteredTerms.forEach(t => {
      nextMap[t.id] = true;
    });
    setOpenedMap(nextMap);
  };

  // Collapse all currently filtered
  const handleCollapseAll = () => {
    const nextMap: { [id: string]: boolean } = { ...openedMap };
    filteredTerms.forEach(t => {
      nextMap[t.id] = false;
    });
    setOpenedMap(nextMap);
  };

  // Toggle Learned
  const handleToggleLearned = (id: string) => {
    setLearnedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarkMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Search related term
  const handleSearchRelated = (related: string) => {
    setSearchQuery(related);
    setSelectedCatNo('all');
    setSelectedSubCat('all');
    setCurrentMode('accordion');
  };

  // Select term from 50-on index
  const handleSelectTermFromIndex = (termId: string, catNo: string) => {
    setSelectedCatNo(catNo);
    setSelectedSubCat('all');
    setSearchQuery('');
    setCurrentMode('accordion');
    setOpenedMap(prev => ({
      ...prev,
      [termId]: true
    }));
    setTimeout(() => {
      const el = document.getElementById(`answer-${termId}`);
      if (el) {
        el.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('学習進捗（理解した／要復習マーク）をすべてリセットしますか？')) {
      setLearnedMap({});
      setBookmarkMap({});
      setOpenedMap({});
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] text-slate-800 flex flex-col font-sans">
      {/* Header with Title and Mode Tabs */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        learnedCount={learnedCount}
        totalCount={totalTerms}
        onResetProgress={handleResetProgress}
        onPrint={() => window.print()}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* ================= MODE: 18 大カテゴリー ポータル一覧 ================= */}
        {currentMode === 'categories' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            
            {/* Hero Dashboard Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-xs font-bold text-amber-300">
                    <Award className="w-3.5 h-3.5" />
                    <span>一流ホテルマン監修</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-rose-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>全18カテゴリー・完全網羅版</span>
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight font-serif-jp leading-tight">
                  着物ナビブライダルディレクター総合研修専門用語集
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  予約・衣装・結納から、披露宴進行・料飲サービス・厨房・ケータリング・ハネムーンまで、現場で不可欠な<strong>計 {totalTerms} 項目</strong>の業界専門用語をアコーディオン・クイズ形式で体系的に習得できます。
                </p>

                {/* Copyright disclaimer banner strip */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>著作権：<strong>shigenori,watanabe</strong>（他社での流用・無断転載を固く禁止します）</span>
                  </div>
                  <button
                    onClick={() => setIsTermsOpen(true)}
                    className="text-[11px] text-amber-300 hover:text-amber-200 underline font-semibold shrink-0"
                  >
                    規約詳細
                  </button>
                </div>

                {/* Overall Stats Cards */}
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                    <div className="text-[11px] text-slate-300 font-medium">収録カテゴリー</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white">18 <span className="text-xs font-normal">分野</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                    <div className="text-[11px] text-slate-300 font-medium">全登録用語数</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-amber-300">{totalTerms} <span className="text-xs font-normal">項目</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                    <div className="text-[11px] text-slate-300 font-medium">習得済み</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-300">{learnedCount} <span className="text-xs font-normal">項目</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                    <div className="text-[11px] text-slate-300 font-medium">全体達成度</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-rose-300">{overallPercentage}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Keyword Search Bar on Portal */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setSelectedCatNo('all');
                      setCurrentMode('accordion');
                    }
                  }}
                  placeholder="全18カテゴリーの用語名、読み仮名、英語、意味、現場の注意点をキーワード検索..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {searchQuery.trim() && (
                <button
                  onClick={() => {
                    setSelectedCatNo('all');
                    setCurrentMode('accordion');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-xs sm:text-sm hover:bg-rose-600 transition-colors shrink-0 shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>検索結果を表示</span>
                </button>
              )}
            </div>

            {/* 18 Categories Cards Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-jp">
                    カテゴリー別 研修カリキュラム一覧（全18カテゴリー）
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  クリックして該当カテゴリーの用語学習を開始
                </span>
              </div>

              {/* 18 Cards Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {MASTER_CATEGORIES.map(category => (
                  <MasterCategoryCard
                    key={category.no}
                    category={category}
                    terms={ALL_MASTER_TERMS}
                    learnedMap={learnedMap}
                    bookmarkMap={bookmarkMap}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODE: アコーディオン用語集（研修メイン） ================= */}
        {currentMode === 'accordion' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Back & Category Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setCurrentMode('categories')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                <span>全18カテゴリー一覧へ戻る</span>
              </button>

              {/* Horizontal Category Switcher */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full sm:max-w-xl py-0.5">
                <button
                  onClick={() => { setSelectedCatNo('all'); setSelectedSubCat('all'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedCatNo === 'all'
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  全分野表示
                </button>
                {MASTER_CATEGORIES.map(c => (
                  <button
                    key={c.no}
                    onClick={() => { setSelectedCatNo(c.no); setSelectedSubCat('all'); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                      selectedCatNo === c.no
                        ? 'bg-rose-500 text-white font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {c.no}. {c.name.split('・')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category Header Card */}
            {activeCategory && selectedCatNo !== 'all' && (
              <div className={`p-5 sm:p-6 rounded-3xl border ${activeCategory.borderColor} ${activeCategory.bgColor} shadow-xs`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        No.{activeCategory.no}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        登録用語: {ALL_MASTER_TERMS.filter(t => t.catNo === activeCategory.no).length} 項目
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-jp">
                      {activeCategory.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {activeCategory.subTitle}
                    </p>
                  </div>

                  {/* Category completion widget */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200 shrink-0 min-w-44">
                    {(() => {
                      const catTerms = ALL_MASTER_TERMS.filter(t => t.catNo === activeCategory.no);
                      const catLearned = catTerms.filter(t => !!learnedMap[t.id]).length;
                      const catPct = catTerms.length > 0 ? Math.round((catLearned / catTerms.length) * 100) : 0;
                      return (
                        <>
                          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                            <span>カテゴリー習得率</span>
                            <span className="font-bold text-rose-600">{catPct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-300"
                              style={{ width: `${catPct}%` }}
                            />
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 text-right">
                            {catLearned} / {catTerms.length} 項目習得
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Subcategory Filter Pills (if any) */}
                {availableSubCats.length > 1 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-xs text-slate-500 font-bold shrink-0 mr-1 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      中カテゴリー:
                    </span>
                    <button
                      onClick={() => setSelectedSubCat('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                        selectedSubCat === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      すべて
                    </button>
                    {availableSubCats.map(sub => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubCat(sub)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                          selectedSubCat === sub
                            ? 'bg-slate-900 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Box */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="用語名、読み仮名、英語、意味、現場の注意点で絞り込み..."
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    すべて
                  </button>
                  <button
                    onClick={() => setStatusFilter('unlearned')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === 'unlearned'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    未習得
                  </button>
                  <button
                    onClick={() => setStatusFilter('learned')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === 'learned'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    理解した
                  </button>
                  <button
                    onClick={() => setStatusFilter('bookmarked')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === 'bookmarked'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    要復習
                  </button>
                </div>
              </div>

              {/* Action row: Expand/Collapse All & Results Count */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-medium">
                  該当用語: <strong className="text-slate-900">{filteredTerms.length}</strong> 項目
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExpandAll}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>すべて開く</span>
                  </button>
                  <button
                    onClick={handleCollapseAll}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    <span>すべて閉じる</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Accordion Terms List */}
            {filteredTerms.length > 0 ? (
              <div className="space-y-3.5 sm:space-y-4">
                {filteredTerms.map(term => (
                  <MasterAccordionItem
                    key={term.id}
                    term={term}
                    isOpen={!!openedMap[term.id]}
                    onToggle={() => handleToggleAccordion(term.id)}
                    isLearned={!!learnedMap[term.id]}
                    onToggleLearned={() => handleToggleLearned(term.id)}
                    isBookmarked={!!bookmarkMap[term.id]}
                    onToggleBookmark={() => handleToggleBookmark(term.id)}
                    onSearchRelated={handleSearchRelated}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search Results */
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-700">
                    条件に一致する専門用語が見つかりませんでした
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    検索キーワードを変更するか、フィルター条件をリセットしてください。
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setSelectedSubCat('all');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                >
                  検索フィルターをリセット
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE: 50音順 索引 ================= */}
        {currentMode === 'index' && (
          <div className="py-2 animate-fadeIn">
            <KanaIndexView
              terms={ALL_MASTER_TERMS}
              onSelectTerm={handleSelectTermFromIndex}
            />
          </div>
        )}

        {/* ================= MODE: 忌み言葉・禁句 虎の巻 ================= */}
        {currentMode === 'taboo' && (
          <div className="py-2 animate-fadeIn">
            <TabooWordsCheatSheet />
          </div>
        )}

        {/* ================= MODE: 実力判定テスト（4択） ================= */}
        {currentMode === 'quiz' && (
          <div className="py-2 animate-fadeIn">
            <QuizChallenge />
          </div>
        )}

        {/* ================= MODE: 制作仕様書・指示書 ================= */}
        {currentMode === 'spec' && (
          <div className="py-2 animate-fadeIn">
            <SpecView />
          </div>
        )}

      </main>

      {/* Footer with Copyright and Terms */}
      <footer className="mt-12 py-8 border-t border-slate-200 bg-white text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-bold text-slate-900 font-serif-jp">
                  着物ナビブライダルディレクター総合研修専門用語集
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                  一流ホテルマン監修
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                全18カテゴリー網羅（登録専門用語：{totalTerms}項目）
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTermsOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>著作権保護・利用規約</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              © shigenori,watanabe All Rights Reserved.
            </div>
            <div className="text-center sm:text-right">
              ※本用語集およびマニュアルの著作権はshigenori,watanabeに帰属します。他社での流用、転載、複製、再配布を固く禁じます。
            </div>
          </div>
        </div>
      </footer>

      {/* Terms of Use & Copyright Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
}
