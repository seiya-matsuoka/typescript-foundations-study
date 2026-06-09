import assert from 'node:assert/strict';

type UserId = string | number;
type DisplayValue = string | number | boolean;

function formatUserId(id: UserId): string {
  // union 型は「この値は複数候補のどれかである」と表す型である。
  // ここでは id が string または number のどちらかになる。
  // string 専用の処理や number 専用の処理を行うには、先に narrowing が必要になる。
  if (typeof id === 'string') {
    return `user:${id.toUpperCase()}`;
  }

  return `user:${id.toString().padStart(4, '0')}`;
}

function formatDisplayValue(value: DisplayValue): string {
  // union 型の値は、共通して使える操作だけなら分岐なしで扱える。
  // ただし string の toUpperCase や number の toFixed のような型固有の操作は、
  // typeof によって候補を絞ってから使う。
  if (typeof value === 'string') {
    return `text:${value}`;
  }

  if (typeof value === 'number') {
    return `number:${value.toFixed(1)}`;
  }

  return `boolean:${value ? 'yes' : 'no'}`;
}

export function runUnionTypeBasics(): void {
  console.log('このファイルでは、union type の基本を確認する。');

  const stringId: UserId = 'abc';
  const numberId: UserId = 42;

  const formattedStringId = formatUserId(stringId);
  const formattedNumberId = formatUserId(numberId);

  console.log('1. string | number の union 型');
  console.log('formattedStringId:', formattedStringId);
  console.log('formattedNumberId:', formattedNumberId);

  const displayValues: readonly DisplayValue[] = ['TypeScript', 123.45, true];
  const formattedValues = displayValues.map((value) => formatDisplayValue(value));

  console.log('');
  console.log('2. 複数候補を持つ値を narrowing して扱う');
  console.log('formattedValues:', formattedValues);

  assert.equal(formattedStringId, 'user:ABC');
  assert.equal(formattedNumberId, 'user:0042');
  assert.deepEqual(formattedValues, ['text:TypeScript', 'number:123.5', 'boolean:yes']);
}
