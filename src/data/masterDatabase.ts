import { MasterTerm, MASTER_CATEGORIES, MasterCategory } from './types';
import { TERMS_PART1 } from './categories/part1';
import { TERMS_PART1B } from './categories/part1b';
import { TERMS_PART2 } from './categories/part2';
import { TERMS_PART3 } from './categories/part3';
import { TERMS_PART4 } from './categories/part4';
import { TERMS_PART5 } from './categories/part5';
import { TERMS_PART6 } from './categories/part6';
import { TERMS_PART7 } from './categories/part7';
import { TERMS_PART8 } from './categories/part8';
import { TERMS_PART9 } from './categories/part9';

export const ALL_MASTER_TERMS: MasterTerm[] = [
  ...TERMS_PART1,
  ...TERMS_PART1B,
  ...TERMS_PART2,
  ...TERMS_PART3,
  ...TERMS_PART4,
  ...TERMS_PART5,
  ...TERMS_PART6,
  ...TERMS_PART7,
  ...TERMS_PART8,
  ...TERMS_PART9
];

/**
 * カテゴリーNo('01'〜'18')で用語を抽出
 */
export function getTermsByCategory(catNo: string): MasterTerm[] {
  return ALL_MASTER_TERMS.filter(t => t.catNo === catNo);
}

/**
 * カテゴリー情報取得
 */
export function getCategoryByNo(catNo: string): MasterCategory | undefined {
  return MASTER_CATEGORIES.find(c => c.no === catNo);
}

/**
 * 検索クエリで用語をフィルタリング
 */
export function searchMasterTerms(query: string, catNo?: string): MasterTerm[] {
  const q = query.trim().toLowerCase();
  let list = catNo && catNo !== 'all' ? getTermsByCategory(catNo) : ALL_MASTER_TERMS;

  if (!q) return list;

  return list.filter(item => {
    return (
      item.term.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      (item.english && item.english.toLowerCase().includes(q)) ||
      item.meaning.toLowerCase().includes(q) ||
      (item.point && item.point.toLowerCase().includes(q)) ||
      (item.related && item.related.some(r => r.toLowerCase().includes(q))) ||
      item.subCat.toLowerCase().includes(q)
    );
  });
}
