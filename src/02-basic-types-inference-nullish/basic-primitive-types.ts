import assert from 'node:assert/strict';

export function runBasicPrimitiveTypes(): void {
  console.log('[basic-primitive-types.ts]');
  console.log('基本のプリミティブ型を、値と型の対応で確認する');
  console.log('');

  const userName: string = 'Sato';
  const loginCount: number = 12;
  const isActive: boolean = true;
  const largeId: bigint = 9007199254740993n;
  const cacheKey: symbol = Symbol('user-cache');
  const emptyValue: null = null;
  const notAssigned: undefined = undefined;

  // Unit 02 の入口では、まず値と型の対応を明示的に並べる。
  // 実務コードでは、明らかに型推論できる変数へ毎回型注釈を書く必要はない。
  // ただし、最初に基本型を整理すると、後続の union 型や nullable な値を読みやすくなる。
  console.log('1. string / number / boolean');
  console.log(`userName: ${userName}`);
  console.log(`loginCount: ${loginCount}`);
  console.log(`isActive: ${isActive}`);
  console.log('');

  // bigint は number とは別のプリミティブ型であり、number とそのまま混ぜて計算できない。
  // 通常のアプリケーションコードでは number の方が多いが、大きな整数を扱う場面で出てくる。
  console.log('2. bigint / symbol');
  console.log(`largeId: ${largeId}`);
  console.log(`cacheKey: ${cacheKey.toString()}`);
  console.log('');

  // null と undefined は、TypeScript では後続の条件分岐や初期値設計に直結する。
  // このファイルでは存在だけ確認し、詳しい使い分けは null-and-undefined.ts で扱う。
  console.log('3. null / undefined');
  console.log('emptyValue:', emptyValue);
  console.log('notAssigned:', notAssigned);
  console.log('');

  // @ts-expect-error: string 型の変数に number は代入できないことを確認する。
  const invalidName: string = 100;

  console.log('4. 意図した型エラーの実行時の値');
  console.log('invalidName runtime value:', invalidName);

  assert.equal(userName.toUpperCase(), 'SATO');
  assert.equal(loginCount + 1, 13);
  assert.equal(isActive, true);
  assert.equal(largeId > 9007199254740992n, true);
  assert.equal(typeof cacheKey, 'symbol');
  assert.equal(emptyValue, null);
  assert.equal(notAssigned, undefined);
  assert.equal(typeof invalidName, 'number');
}
