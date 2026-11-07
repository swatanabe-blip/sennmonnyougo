import React from 'react';
import { 
  CalendarCheck, 
  Sparkles, 
  Scissors, 
  Gift, 
  Church, 
  DoorOpen, 
  LayoutGrid, 
  UtensilsCrossed, 
  Wine, 
  PartyPopper, 
  Camera, 
  Users, 
  Building2, 
  HeartHandshake, 
  ChefHat, 
  Truck, 
  Coins, 
  Plane,
  ArrowRight,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { MasterCategory, MasterTerm } from '../data/types';

interface MasterCategoryCardProps {
  category: MasterCategory;
  terms: MasterTerm[];
  learnedMap: { [id: string]: boolean };
  bookmarkMap: { [id: string]: boolean };
  onSelect: (catNo: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  CalendarCheck,
  Sparkles,
  Scissors,
  Gift,
  Church,
  DoorOpen,
  LayoutGrid,
  UtensilsCrossed,
  Wine,
  PartyPopper,
  Camera,
  Users,
  Building2,
  HeartHandshake,
  ChefHat,
  Truck,
  Coins,
  Plane
};

export const MasterCategoryCard: React.FC<MasterCategoryCardProps> = ({
  category,
  terms,
  learnedMap,
  bookmarkMap,
  onSelect
}) => {
  const IconComponent = ICON_MAP[category.icon] || Sparkles;
  const catTerms = terms.filter(t => t.catNo === category.no);
  const totalCount = catTerms.length;
  const learnedCount = catTerms.filter(t => !!learnedMap[t.id]).length;
  const bookmarkCount = catTerms.filter(t => !!bookmarkMap[t.id]).length;
  const percent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  return (
    <div 
      onClick={() => onSelect(category.no)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-rose-300 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Top decorative color strip */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${category.bgColor} border-b ${category.borderColor}`} />

      <div>
        {/* Header row: Number badge & Icon */}
        <div className="flex items-center justify-between mb-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              No.{category.no}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              全 {totalCount} 項目
            </span>
          </div>

          <div className={`w-10 h-10 rounded-xl ${category.bgColor} ${category.color} flex items-center justify-center border ${category.borderColor} group-hover:scale-110 transition-transform`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors font-serif-jp">
          {category.name}
        </h3>

        {/* Subtitle / Contents */}
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {category.subTitle}
        </p>
      </div>

      {/* Progress Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            進捗: <strong className="text-slate-800">{learnedCount}/{totalCount}</strong>
          </span>
          <span className={`font-bold ${percent === 100 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {percent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              percent === 100 
                ? 'bg-emerald-500' 
                : 'bg-gradient-to-r from-rose-500 to-amber-400'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Action row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {bookmarkCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Bookmark className="w-3 h-3 fill-amber-500" />
                復習 {bookmarkCount}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform">
            学習開始
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
