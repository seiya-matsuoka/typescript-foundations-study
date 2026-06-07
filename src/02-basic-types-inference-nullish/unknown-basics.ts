import assert from 'node:assert/strict';

function parseUnknownValue(value: unknown): string {
  // unknown は「まだ型が分からない値」を安全に扱うための型である。
  // any と違い、そのままプロパティやメソッドを使えないため、先に typeof などで確認する必要がある。
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  if (typeof value === 'number') {
    return `number:${value}`;
  }

  if (typeof value === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }

  return 'unsupported';
}

export function runUnknownBasics(): void {
  console.log('[unknown-basics.ts]');
  console.log('unknown の安全な扱いを確認する');
  console.log('');

  const unknownText: unknown = 'typescript';
  const unknownNumber: unknown = 42;
  const unknownBoolean: unknown = true;
  const unknownObject: unknown = { name: 'Sato' };

  const parsedText = parseUnknownValue(unknownText);
  const parsedNumber = parseUnknownValue(unknownNumber);
  const parsedBoolean = parseUnknownValue(unknownBoolean);
  const parsedObject = parseUnknownValue(unknownObject);

  // API レスポンスや JSON.parse の結果のように、外から来た値は最初 unknown として考えると安全である。
  // 使う前に確認する習慣は、後続の type guard や validation の理解につながる。
  console.log('1. unknown を確認してから使う');
  console.log('parsedText:', parsedText);
  console.log('parsedNumber:', parsedNumber);
  console.log('parsedBoolean:', parsedBoolean);
  console.log('parsedObject:', parsedObject);
  console.log('');

  // @ts-expect-error: unknown の値は型を確認する前に string のメソッドを使えないことを確認する。
  const invalidUpperCase = unknownText.toUpperCase();

  console.log('2. 意図した型エラーの実行時の値');
  console.log('invalidUpperCase runtime value:', invalidUpperCase);

  assert.equal(parsedText, 'TYPESCRIPT');
  assert.equal(parsedNumber, 'number:42');
  assert.equal(parsedBoolean, 'boolean:true');
  assert.equal(parsedObject, 'unsupported');
  assert.equal(invalidUpperCase, 'TYPESCRIPT');
}
