import assert from 'node:assert/strict';

type Result<TData, TError> =
  | { readonly ok: true; readonly data: TData }
  | { readonly ok: false; readonly error: TError };

type LoginDto = {
  readonly token: string;
  readonly user: {
    readonly id: string;
    readonly name: string;
  };
};

type LoginError = {
  readonly type: 'api' | 'validation';
  readonly message: string;
};

function isLoginDto(value: unknown): value is LoginDto {
  if (typeof value !== 'object' || value === null) return false;
  if (!('token' in value) || typeof value.token !== 'string') return false;
  if (!('user' in value) || typeof value.user !== 'object' || value.user === null) return false;

  return (
    'id' in value.user &&
    'name' in value.user &&
    typeof value.user.id === 'string' &&
    typeof value.user.name === 'string'
  );
}

async function mockLoginApi(email: string): Promise<unknown> {
  if (email.endsWith('@example.com')) {
    return { token: 'token-001', user: { id: 'user-001', name: 'Sato' } };
  }

  return { message: 'ログインに失敗しました' };
}

async function login(email: string): Promise<Result<LoginDto, LoginError>> {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length === 0) {
    return {
      ok: false,
      error: { type: 'validation', message: 'メールアドレスを入力してください' },
    };
  }

  const responseBody = await mockLoginApi(normalizedEmail);

  if (!isLoginDto(responseBody)) {
    return {
      ok: false,
      error: { type: 'api', message: 'ログイン API のレスポンス形式が不正です' },
    };
  }

  // API から返る値は unknown から始め、type guard を通過した後だけ LoginDto として扱う。
  // 例外を投げるのではなく Result を返すことで、呼び出し側は成功 / 失敗を分岐しやすい。
  return { ok: true, data: responseBody };
}

export async function runApiValidationResult(): Promise<void> {
  console.log('このファイルでは、API result と validation result を確認する。');

  const successResult = await login(' SATO@example.com ');
  const validationResult = await login('');
  const apiFailureResult = await login('user@invalid.test');

  console.log('1. 成功した API result');
  console.log('successResult:', successResult);

  console.log('');
  console.log('2. 入力 validation の失敗');
  console.log('validationResult:', validationResult);

  console.log('');
  console.log('3. API response validation の失敗');
  console.log('apiFailureResult:', apiFailureResult);

  assert.deepEqual(successResult, {
    ok: true,
    data: { token: 'token-001', user: { id: 'user-001', name: 'Sato' } },
  });
  assert.deepEqual(validationResult, {
    ok: false,
    error: { type: 'validation', message: 'メールアドレスを入力してください' },
  });
  assert.deepEqual(apiFailureResult, {
    ok: false,
    error: { type: 'api', message: 'ログイン API のレスポンス形式が不正です' },
  });
}
