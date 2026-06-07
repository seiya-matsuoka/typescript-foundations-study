import assert from 'node:assert/strict';

function logMessage(message: string): void {
  // void は、戻り値を利用しない関数でよく使う。
  // console.log のように副作用を目的とする処理では、戻り値そのものを使わない。
  console.log(message);
}

function fail(message: string): never {
  // never は、正常に戻ってこない処理を表す。
  // throw する関数や、無限ループする関数の戻り値型として出てくる。
  throw new Error(message);
}

export function runNeverAndVoid(): void {
  console.log('[never-and-void.ts]');
  console.log('never / void を確認する');
  console.log('');

  const logResult = logMessage('1. void は戻り値を使わない関数で使う');

  // void の関数を呼び出しても、利用すべき戻り値はない。
  // 実行時には undefined が返るが、意味としては「戻り値を使わない」と読む。
  console.log('logResult:', logResult);
  console.log('');

  let thrownMessage = '';

  try {
    fail('never の例として例外を投げる');
  } catch (error) {
    if (error instanceof Error) {
      thrownMessage = error.message;
      console.log('2. never は正常に戻ってこない処理で使う');
      console.log('caught error:', thrownMessage);
    }
  }

  assert.equal(logResult, undefined);
  assert.equal(thrownMessage, 'never の例として例外を投げる');
}
