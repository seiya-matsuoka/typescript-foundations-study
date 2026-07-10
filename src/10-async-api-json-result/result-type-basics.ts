import assert from 'node:assert/strict';

type Success<TData> = {
  readonly ok: true;
  readonly data: TData;
};

type Failure<TError> = {
  readonly ok: false;
  readonly error: TError;
};

type Result<TData, TError> = Success<TData> | Failure<TError>;

type SaveTaskError = {
  readonly code: 'EMPTY_TITLE' | 'TOO_LONG_TITLE';
  readonly message: string;
};

function saveTaskTitle(title: string): Result<{ readonly title: string }, SaveTaskError> {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return {
      ok: false,
      error: { code: 'EMPTY_TITLE', message: 'タイトルを入力してください' },
    };
  }

  if (trimmedTitle.length > 20) {
    return {
      ok: false,
      error: { code: 'TOO_LONG_TITLE', message: 'タイトルは20文字以内で入力してください' },
    };
  }

  return { ok: true, data: { title: trimmedTitle } };
}

function formatSaveResult(result: Result<{ readonly title: string }, SaveTaskError>): string {
  if (result.ok) {
    // Result 型は、例外を投げる代わりに成功 / 失敗を戻り値で表す。
    // ok: true で分岐すると data、ok: false で分岐すると error が読める。
    // フォーム validation のような想定内の失敗は、例外より Result 型の方が呼び出し側で扱いやすいことがある。
    return `saved:${result.data.title}`;
  }

  return `failed:${result.error.code}:${result.error.message}`;
}

export function runResultTypeBasics(): void {
  console.log('このファイルでは、Result 型風の成功 / 失敗表現を確認する。');

  const successResult = saveTaskTitle('  実装する  ');
  const failureResult = saveTaskTitle('');
  const successMessage = formatSaveResult(successResult);
  const failureMessage = formatSaveResult(failureResult);

  console.log('1. 成功を戻り値で表す');
  console.log('successResult:', successResult);
  console.log('successMessage:', successMessage);

  console.log('');
  console.log('2. 失敗を戻り値で表す');
  console.log('failureResult:', failureResult);
  console.log('failureMessage:', failureMessage);

  assert.deepEqual(successResult, { ok: true, data: { title: '実装する' } });
  assert.deepEqual(failureResult, {
    ok: false,
    error: { code: 'EMPTY_TITLE', message: 'タイトルを入力してください' },
  });
  assert.equal(successMessage, 'saved:実装する');
  assert.equal(failureMessage, 'failed:EMPTY_TITLE:タイトルを入力してください');
}
