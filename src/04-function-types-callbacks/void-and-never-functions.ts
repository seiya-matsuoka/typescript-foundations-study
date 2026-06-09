import assert from 'node:assert/strict';

type LogLevel = 'info' | 'warning' | 'error';

type LogEntry = {
  readonly level: LogLevel;
  readonly message: string;
};

function pushLog(logs: LogEntry[], level: LogLevel, message: string): void {
  // void は「戻り値を利用しない」関数で使う。
  // この関数は logs 配列へ値を追加する副作用を持ち、戻り値そのものは呼び出し側で使わない。
  // React の event handler も、画面状態を更新する副作用が中心になるため void と相性がよい。
  logs.push({ level, message });
}

function failIfEmpty(value: string): string {
  if (value.trim() === '') {
    return fail('値が空です');
  }

  return value;
}

function fail(message: string): never {
  // never は、正常に戻ってこない関数を表す。
  // throw する関数は戻り値を返さないため、never として表せる。
  // exhaustive check などでも出てくるが、この Unit では「戻ってこない関数」の入口として扱う。
  throw new Error(message);
}

export function runVoidAndNeverFunctions(): void {
  console.log('このファイルでは、void / never を確認する。');

  const logs: LogEntry[] = [];
  pushLog(logs, 'info', '処理を開始しました');
  pushLog(logs, 'warning', '入力値を確認してください');

  const safeValue = failIfEmpty('typescript');
  let errorMessage = '';

  try {
    failIfEmpty('');
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  }

  console.log('1. void を返す関数');
  console.log('logs:', logs);

  console.log('');
  console.log('2. never を返す関数');
  console.log('safeValue:', safeValue);
  console.log('errorMessage:', errorMessage);

  assert.deepEqual(logs, [
    { level: 'info', message: '処理を開始しました' },
    { level: 'warning', message: '入力値を確認してください' },
  ]);
  assert.equal(safeValue, 'typescript');
  assert.equal(errorMessage, '値が空です');
}
