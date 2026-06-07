import assert from 'node:assert/strict';

type SearchCondition = {
  readonly keyword?: string;
  readonly categoryId: string | null;
};

function formatKeyword(keyword: string | undefined): string {
  // undefined の可能性がある値は、そのまま string として使わず、分岐やデフォルト値で処理する。
  // ここでは nullish coalescing を使い、undefined のときに表示用の文言を返す。
  return keyword ?? 'キーワード未指定';
}

function formatCategory(categoryId: string | null): string {
  // null は「値がないことを明示的に表す値」として API やフォーム設計で使うことがある。
  // undefined と同じものとして扱うのではなく、その型が何を表すかを決めることが重要である。
  return categoryId === null ? 'カテゴリ未指定' : `カテゴリ: ${categoryId}`;
}

export function runNullAndUndefined(): void {
  console.log('[null-and-undefined.ts]');
  console.log('null / undefined・nullable・optional を確認する');
  console.log('');

  const conditionWithoutKeyword: SearchCondition = {
    categoryId: null,
  };

  const conditionWithKeyword: SearchCondition = {
    keyword: 'TypeScript',
    categoryId: 'frontend',
  };

  // keyword?: string は、keyword プロパティを省略できることを表す。
  // categoryId: string | null は、プロパティ自体は存在し、値がない場合は null を入れる設計である。
  console.log('1. optional な値と nullable な値');
  console.log('keyword without value:', formatKeyword(conditionWithoutKeyword.keyword));
  console.log('category without value:', formatCategory(conditionWithoutKeyword.categoryId));
  console.log('keyword with value:', formatKeyword(conditionWithKeyword.keyword));
  console.log('category with value:', formatCategory(conditionWithKeyword.categoryId));
  console.log('');

  const displayName: string | null = null;
  const fallbackName = displayName ?? '名前未設定';

  // nullable な値は、使う前に null の可能性を処理する。
  // ?? は null または undefined のときだけ右側の値を使うため、初期値処理でよく使う。
  console.log('2. nullable な値のデフォルト値');
  console.log('fallbackName:', fallbackName);
  console.log('');

  const optionalValue: string | undefined = undefined;
  const fallbackValue = optionalValue ?? '値なし';

  // undefined は「まだ代入されていない」「プロパティが存在しない」「配列アクセスで見つからない」などで出てくる。
  // null と undefined のどちらを使うかは、データの設計として明確にする。
  console.log('3. undefined のデフォルト値');
  console.log('fallbackValue:', fallbackValue);

  assert.equal(formatKeyword(conditionWithoutKeyword.keyword), 'キーワード未指定');
  assert.equal(formatCategory(conditionWithoutKeyword.categoryId), 'カテゴリ未指定');
  assert.equal(formatKeyword(conditionWithKeyword.keyword), 'TypeScript');
  assert.equal(formatCategory(conditionWithKeyword.categoryId), 'カテゴリ: frontend');
  assert.equal(fallbackName, '名前未設定');
  assert.equal(fallbackValue, '値なし');
}
