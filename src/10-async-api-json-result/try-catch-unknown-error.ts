import assert from 'node:assert/strict';

async function failByError(): Promise<void> {
  throw new Error('通常の Error として失敗しました');
}

async function failByString(): Promise<void> {
  // JavaScript では reject される値が Error 以外になることもある。
  // 実務では避けたいが、外部ライブラリや古いコードでは遭遇する可能性がある。
  // ここでは lint ルールに配慮して throw literal にはせず、Promise.reject で文字列を失敗理由にしている。
  return Promise.reject('文字列で失敗しました');
}

function getErrorMessage(error: unknown): string {
  // catch した error は unknown として扱う。
  // unknown はそのままでは message を読めないため、instanceof Error で絞る。
  // これは TypeScript で安全にエラーを扱う基本パターンである。
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;

  return 'unknown error';
}

export async function runTryCatchUnknownError(): Promise<void> {
  console.log('このファイルでは、try-catch と unknown error を確認する。');

  let errorMessage = '';
  try {
    await failByError();
  } catch (error) {
    errorMessage = getErrorMessage(error);
  }

  let stringErrorMessage = '';
  try {
    await failByString();
  } catch (error) {
    stringErrorMessage = getErrorMessage(error);
  }

  console.log('1. Error インスタンスを catch する');
  console.log('errorMessage:', errorMessage);

  console.log('');
  console.log('2. Error 以外の値も unknown として扱う');
  console.log('stringErrorMessage:', stringErrorMessage);

  assert.equal(errorMessage, '通常の Error として失敗しました');
  assert.equal(stringErrorMessage, '文字列で失敗しました');
}
