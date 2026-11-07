import React from 'react';
import { ShieldCheck, X, AlertTriangle, Copyright, Award } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-5 sm:p-6 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold tracking-wider uppercase mb-1">
                <Award className="w-3 h-3" />
                一流ホテルマン監修
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif-jp">
                著作権保護および利用規約
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Key Notice Box */}
          <div className="bg-rose-50 border-l-4 border-rose-600 rounded-r-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>他社での流用・無断転載・再配布の厳禁</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              本「着物ナビブライダルディレクター総合研修専門用語集」は、<strong>一流ホテルマンの監修</strong>のもと体系化された独自ノウハウ教材です。著作権法および関連法令により保護されています。
            </p>
          </div>

          {/* Detailed Clauses */}
          <div className="space-y-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Copyright className="w-4 h-4 text-slate-600" />
                1. 著作権の帰属
              </h4>
              <p className="text-slate-600 text-xs">
                本用語集に収録されている全18カテゴリーの専門用語、読み仮名、英語表記、解説文、現場での心得・注意点、分類構成、クイズ出題データ等の一切の著作権は、<strong>shigenori,watanabe</strong> に帰属します。
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                2. 禁止事項
              </h4>
              <ul className="text-slate-600 text-xs space-y-1 list-disc list-inside">
                <li>著作者の事前書面許諾なき、他社・他組織での流用、転載、複製、公衆送信</li>
                <li>商業目的での二次利用、研修テキスト等への無断組み込み、改変、再配布、転売</li>
                <li>本システム内のコンテンツを抽出・スクレイピングしての外部データベース化</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-600" />
                3. 正当な利用目的
              </h4>
              <p className="text-slate-600 text-xs">
                本システムは、着物ナビブライダルディレクターの育成および社内研修における学習を目的とした、正規受講生・関係者限りの閲覧・自習ツールとして提供されます。
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2">
            © shigenori,watanabe All Rights Reserved.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-2xs"
          >
            確認して閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
