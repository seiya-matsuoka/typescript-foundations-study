import assert from 'node:assert/strict';

type SearchCondition = {
  readonly keyword?: string;
  readonly categoryId: string | null;
};

function takeRequiredText(text: string): string {
  return text.trim();
}

export function runStrictOptionBasics(): void {
  console.log('[strict-option-basics.ts]');
  console.log(
    'strictNullChecks / noUncheckedIndexedAccess / exactOptionalPropertyTypes の入口を確認する',
  );
  console.log('');

  const values = ['alpha', 'beta'];
  const firstValue = values[0];
  const missingValue = values[10];

  // noUncheckedIndexedAccess が有効な環境では、配列アクセスの結果は string | undefined になる。
  // 存在しない位置を読んだ場合、実行時には undefined になるためである。
  console.log('1. noUncheckedIndexedAccess の入口');
  console.log('firstValue:', firstValue ?? '値なし');
  console.log('missingValue:', missingValue ?? '値なし');
  console.log('');

  const condition: SearchCondition = {
    categoryId: null,
  };

  // exactOptionalPropertyTypes が有効な環境では、keyword?: string は「省略できる」ことを表す。
  // keyword: undefined を明示的に入れる型とは区別される。
  console.log('2. exactOptionalPropertyTypes の入口');
  console.log('condition keyword:', condition.keyword ?? '省略');
  console.log('condition category:', condition.categoryId ?? 'カテゴリなし');
  console.log('');

  const nullableText: string | null = null;

  // strictNullChecks が有効な環境では、null の可能性がある値を string としてそのまま渡せない。
  // null の可能性を分岐やデフォルト値で処理してから使う。
  const safeText = takeRequiredText(nullableText ?? 'fallback');

  console.log('3. strictNullChecks の入口');
  console.log('safeText:', safeText);
  console.log('');

  console.log('4. 型エラー例は実行されない補助関数に分ける');
  console.log(
    'strictOptionTypeErrorExamples は型チェック対象だが、この Unit の実行時には呼び出さない',
  );

  assert.equal(firstValue, 'alpha');
  assert.equal(missingValue, undefined);
  assert.deepEqual(condition, { categoryId: null });
  assert.equal(safeText, 'fallback');
}

export function strictOptionTypeErrorExamples(): void {
  const nullableText: string | null = null;

  // exactOptionalPropertyTypes が有効な環境では、
  // keyword?: string は「省略できる」ことを表し、
  // keyword: undefined を明示的に入れる型とは区別される。
  // @ts-expect-error: keyword?: string に undefined を明示代入できないことを確認する。
  const invalidCondition: SearchCondition = {
    keyword: undefined,
    categoryId: null,
  };

  // strictNullChecks が有効な環境では、
  // null の可能性がある値を string としてそのまま渡せない。
  // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
  // @ts-expect-error: null の可能性がある値を string としてそのまま渡せないことを確認する。
  const invalidText = takeRequiredText(nullableText);

  void invalidCondition;
  void invalidText;
}
