import assert from 'node:assert/strict';

export function runArrayAndTupleTypes(): void {
  console.log('[array-and-tuple-types.ts]');
  console.log('Array<T>・T[]・tuple・readonly tuple を確認する');
  console.log('');

  const scores: number[] = [80, 92, 76];
  const labels: Array<string> = ['下書き', '公開済み', 'アーカイブ済み'];

  // number[] と Array<number> は、どちらも配列の型を表す。
  // 実務では T[] の形をよく見るが、Array<T> は generics の読み方にもつながる。
  console.log('1. T[] と Array<T>');
  console.log('scores:', scores.join(', '));
  console.log('labels:', labels.join(' / '));
  console.log('');

  const firstScore = scores[0];
  const missingScore = scores[10];

  // noUncheckedIndexedAccess が有効な環境では、配列アクセスの結果は T | undefined になる。
  // 実行時に存在しない添字を読むと undefined になるため、TypeScript 側でもその可能性を考慮する。
  console.log('2. 配列アクセスと undefined');
  console.log('firstScore:', firstScore ?? '点数なし');
  console.log('missingScore:', missingScore ?? '点数なし');
  console.log('');

  const responsePair: [number, string] = [200, 'OK'];
  const statusCode = responsePair[0];
  const statusMessage = responsePair[1];

  // tuple は、配列の長さと位置ごとの型に意味がある場合に使う。
  // number[] と違い、0番目は number、1番目は string という情報を型として保持する。
  console.log('3. tuple');
  console.log(`responsePair: ${statusCode} ${statusMessage}`);
  console.log('');

  const route = ['/books', 'GET'] as const;

  // as const により、route は readonly tuple として扱われる。
  // 後続の Unit 08 で詳しく扱うが、ここでは「値を狭く保つ」「読み取り専用になる」入口として確認する。
  console.log('4. readonly tuple の入口');
  console.log(`route: ${route[1]} ${route[0]}`);
  console.log('');

  // @ts-expect-error: readonly tuple の値は書き換えられないことを確認する。
  route[0] = '/users';

  console.log('5. 意図した型エラーの実行時の値');
  console.log('route after invalid assignment:', route.join(' '));

  assert.deepEqual(scores, [80, 92, 76]);
  assert.deepEqual(labels, ['下書き', '公開済み', 'アーカイブ済み']);
  assert.equal(firstScore, 80);
  assert.equal(missingScore, undefined);
  assert.equal(statusCode, 200);
  assert.equal(statusMessage, 'OK');
  assert.equal(route[0], '/users');
  assert.equal(route[1], 'GET');
}
