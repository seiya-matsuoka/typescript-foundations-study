import assert from 'node:assert/strict';

class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ValidationError extends Error {
  constructor(readonly fieldErrors: Readonly<Record<string, string>>) {
    super('入力値が不正です');
    this.name = 'ValidationError';
  }
}

function formatDomainError(error: unknown): string {
  if (error instanceof ApiError) {
    // custom error class を使うと、instanceof によって error の種類を narrowing できる。
    // API error なら status や code、validation error なら fieldErrors のように、
    // エラー種別ごとの追加情報を安全に扱える。
    return `api:${error.status}:${error.code}:${error.message}`;
  }

  if (error instanceof ValidationError) {
    const firstField = Object.keys(error.fieldErrors)[0] ?? 'unknown';

    return `validation:${firstField}:${error.fieldErrors[firstField] ?? ''}`;
  }

  if (error instanceof Error) return `error:${error.message}`;

  return 'unknown';
}

export function runCustomErrorClasses(): void {
  console.log('このファイルでは、custom error class を確認する。');

  const apiError = new ApiError(401, 'UNAUTHORIZED', 'ログインが必要です');
  const validationError = new ValidationError({ email: 'メールアドレスを入力してください' });
  const apiErrorMessage = formatDomainError(apiError);
  const validationErrorMessage = formatDomainError(validationError);

  console.log('1. ApiError を instanceof で分岐する');
  console.log('apiErrorMessage:', apiErrorMessage);

  console.log('');
  console.log('2. ValidationError を instanceof で分岐する');
  console.log('validationErrorMessage:', validationErrorMessage);

  assert.equal(apiErrorMessage, 'api:401:UNAUTHORIZED:ログインが必要です');
  assert.equal(validationErrorMessage, 'validation:email:メールアドレスを入力してください');
}
