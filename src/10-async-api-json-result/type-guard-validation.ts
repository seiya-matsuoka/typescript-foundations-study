import assert from 'node:assert/strict';

type UserRegistrationInput = {
  readonly email: string;
  readonly password: string;
};

function hasStringProperty(value: object, key: string): boolean {
  // in 演算子だけでは、プロパティが存在することは分かっても値の型までは分からない。
  // ここでは Record<string, unknown> として読み、値が string かどうかを確認している。
  // 外部入力の validation では「存在確認」と「型確認」を分けて考えることが重要になる。
  const record = value as Record<string, unknown>;

  return typeof record[key] === 'string';
}

function isUserRegistrationInput(value: unknown): value is UserRegistrationInput {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // type guard の戻り値に value is UserRegistrationInput と書くと、
  // true の分岐では value を UserRegistrationInput として扱える。
  // これは Unit 05 の custom type guard の実務寄りの応用である。
  return hasStringProperty(value, 'email') && hasStringProperty(value, 'password');
}

function normalizeRegistrationInput(value: unknown): UserRegistrationInput | undefined {
  if (!isUserRegistrationInput(value)) {
    return undefined;
  }

  // type guard を通過した後は、value.email / value.password を string として扱える。
  // validation と normalize を分けると、外部入力をアプリ内部の扱いやすい形へ変換しやすい。
  return {
    email: value.email.trim().toLowerCase(),
    password: value.password,
  };
}

export function runTypeGuardValidation(): void {
  console.log('このファイルでは、type guard による簡易 validation を確認する。');

  const rawInput: unknown = {
    email: '  SATO@example.com ',
    password: 'secret',
  };

  const invalidInput: unknown = {
    email: 'tanaka@example.com',
    password: 1234,
  };

  const normalizedInput = normalizeRegistrationInput(rawInput);
  const invalidResult = normalizeRegistrationInput(invalidInput);

  console.log('1. unknown を type guard で入力型へ絞る');
  console.log('normalizedInput:', normalizedInput);

  console.log('');
  console.log('2. 形式が違う値は undefined として扱う');
  console.log('invalidResult:', invalidResult);

  assert.deepEqual(normalizedInput, {
    email: 'sato@example.com',
    password: 'secret',
  });
  assert.equal(invalidResult, undefined);
}
