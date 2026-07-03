import assert from 'node:assert/strict';

function isNonNullableValue<TValue>(value: TValue): value is NonNullable<TValue> {
  // null と undefined だけを取り除く type guard である。
  // NonNullable<TValue> は、TValue から null / undefined を除いた型になる。
  //
  // filter(Boolean) は短く書けるが、0 や空文字も false として取り除く。
  // 「null / undefined だけを取り除きたい」のか、
  // 「falsy な値をすべて取り除きたい」のかを区別することが重要である。
  return value !== null && value !== undefined;
}

export function runNullableValuesFilterBoolean(): void {
  console.log('このファイルでは、nullable な値を含む配列と filter(Boolean) の注意を確認する。');

  const nullableNames: ReadonlyArray<string | null | undefined> = [
    'Sato',
    null,
    'Tanaka',
    undefined,
    '',
  ];

  const names = nullableNames.filter(isNonNullableValue);

  const scores: readonly (number | null | undefined)[] = [100, 0, null, 80, undefined];
  const safeScores = scores.filter(isNonNullableValue);
  const truthyScores = scores.filter(Boolean);

  // names は string[] として扱える。
  // 空文字は string の有効な値なので、isNonNullableValue では取り除かれない。
  //
  // truthyScores は実行時には 0 も取り除く。
  // 点数や数量のように 0 が意味を持つ値では、filter(Boolean) を使うとバグにつながることがある。
  console.log('1. type guard で null / undefined だけを取り除く');
  console.log('names:', names);

  console.log('');
  console.log('2. 0 を残したい場合は filter(Boolean) を避ける');
  console.log('safeScores:', safeScores);
  console.log('truthyScores:', truthyScores);

  assert.deepEqual(names, ['Sato', 'Tanaka', '']);
  assert.deepEqual(safeScores, [100, 0, 80]);
  assert.deepEqual(truthyScores, [100, 80]);
}
