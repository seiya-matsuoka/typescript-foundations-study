import assert from 'node:assert/strict';

export function runAnyBasics(): void {
  console.log('[any-basics.ts]');
  console.log('any の危険性を確認する');
  console.log('');

  // any の危険性を確認するため、このサンプルでは意図的に any を使う。
  // プロジェクト全体で no-explicit-any を無効化せず、この行だけ局所的に許可する。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any の危険性を確認するため意図的に使う。
  let unsafeValue: any = 'typescript';

  // any は TypeScript の型チェックをほぼ無効化する。
  // 一時的な移行や外部ライブラリの型が弱い場面で出ることはあるが、使いすぎると型安全性が失われる。
  console.log('1. any は型チェックをすり抜ける');
  console.log('unsafeValue length:', unsafeValue.length);
  console.log('');

  unsafeValue = 100;

  // number に対して存在しないプロパティを読んでも、any では TypeScript が止められない。
  // 実行時には undefined になるだけで、コンパイル時の助けを得られない。
  const missingProperty = unsafeValue.missingProperty;

  console.log('2. 存在しないプロパティでも止まらない');
  console.log('unsafeValue missing property:', missingProperty);
  console.log('');

  const unsafeUpperCase = unsafeValue.toUpperCase;

  // any では、値の実体に合わないメソッドやプロパティも読めてしまう。
  // 今回は呼び出さず、プロパティ参照だけにして実行時エラーを避ける。
  console.log('3. 実行時エラーになりうる操作も型チェックで止まらない');
  console.log('unsafeUpperCase:', unsafeUpperCase);

  assert.equal(missingProperty, undefined);
  assert.equal(unsafeUpperCase, undefined);
}
