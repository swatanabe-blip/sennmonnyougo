import React from 'react';
import { 
  Church, 
  Flower2,
  Sparkles, 
  Crown,
  Gift, 
  PartyPopper, 
  Flame,
  Briefcase, 
  UtensilsCrossed, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';
import { CATEGORIES, CategoryId, WeddingTerm } from '../data/weddingTerms';

interface CategoryNavProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  terms: WeddingTerm[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  terms
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Church': return <Church className="w-4 h-4" />;
      case 'Flower2': return <Flower2 className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Gift': return <Gift className="w-4 h-4" />;
      case 'PartyPopper': return <PartyPopper className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
      case 'Layers':
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const getCategoryCount = (categoryId: CategoryId) => {
    if (categoryId === 'all') return terms.length;
    return terms.filter(t => t.category === categoryId).length;
  };

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/80 shadow-2xs mb-6">
      <div className="text-xs font-semibold text-slate-500 mb-2 px-1 flex items-center justify-between">
        <span className="font-bold text-slate-700">全10カテゴリ 研修テーマ選択</span>
        <span className="text-[11px] text-slate-400 font-normal">タップして瞬時に絞り込み</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center sm:flex-col sm:justify-center p-2 sm:py-2.5 sm:px-2 rounded-xl text-left sm:text-center transition-all ${
                isSelected
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200 font-semibold ring-2 ring-rose-400/50 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
              }`}
            >
              <div className={`p-1.5 rounded-lg mr-2 sm:mr-0 sm:mb-1.5 ${
                isSelected ? 'bg-white/20 text-white' : `${cat.bgColor} ${cat.color}`
              }`}>
                {getIcon(cat.icon)}
              </div>
              
              <div className="flex-1 sm:w-full min-w-0">
                <div className="text-xs font-medium truncate">
                  {cat.shortName}
                </div>
                <div className={`text-[10px] sm:mt-0.5 ${
                  isSelected ? 'text-rose-100' : 'text-slate-400'
                }`}>
                  {count}件
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
