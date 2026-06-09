import assert from 'node:assert/strict';

type PrimitiveInput = string | number | boolean;
type SearchValue = string | number | null;

function formatPrimitiveInput(value: PrimitiveInput): string {
  // typeof による narrowing は、JavaScript の typeof 判定を TypeScript が理解する仕組みである。
  // if (typeof value === 'string') の中では、value は string として扱える。
  // そのため、toUpperCase のような string 専用メソッドを安全に呼び出せる。
  if (typeof value === 'string') {
    return `string:${value.toUpperCase()}`;
  }

  // この分岐では value は number として扱われる。
  // TypeScript は前の string 分岐を通らなかったことも考慮して型を狭めている。
  if (typeof value === 'number') {
    return `number:${value.toLocaleString('ja-JP')}`;
  }

  // string でも number でもないため、残る候補は boolean になる。
  return `boolean:${value ? 'true' : 'false'}`;
}

function normalizeSearchValue(value: SearchValue): string {
  // typeof null は JavaScript の仕様上 'object' になるため、null は equality narrowing で先に確認する。
  // その後に typeof を使うと、残りの string / number を安全に扱える。
  if (value === null) {
    return '';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return value.trim();
}

export function runTypeofNarrowing(): void {
  console.log('このファイルでは、typeof による narrowing を確認する。');

  const formattedText = formatPrimitiveInput('typescript');
  const formattedNumber = formatPrimitiveInput(1200);
  const formattedBoolean = formatPrimitiveInput(false);

  console.log('1. typeof で union 型を絞る');
  console.log('formattedText:', formattedText);
  console.log('formattedNumber:', formattedNumber);
  console.log('formattedBoolean:', formattedBoolean);

  const normalizedText = normalizeSearchValue('  keyword  ');
  const normalizedNumber = normalizeSearchValue(123);
  const normalizedNull = normalizeSearchValue(null);

  console.log('');
  console.log('2. null と typeof を分けて扱う');
  console.log('normalizedText:', normalizedText);
  console.log('normalizedNumber:', normalizedNumber);
  console.log('normalizedNull:', normalizedNull);

  assert.equal(formattedText, 'string:TYPESCRIPT');
  assert.equal(formattedNumber, 'number:1,200');
  assert.equal(formattedBoolean, 'boolean:false');
  assert.equal(normalizedText, 'keyword');
  assert.equal(normalizedNumber, '123');
  assert.equal(normalizedNull, '');
}
