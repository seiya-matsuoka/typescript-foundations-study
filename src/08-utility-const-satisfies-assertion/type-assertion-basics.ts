import assert from 'node:assert/strict';

type UserDto = {
  readonly id: string;
  readonly name: string;
};

function isUserDto(value: unknown): value is UserDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const objectValue = value as Record<string, unknown>;

  return typeof objectValue.id === 'string' && typeof objectValue.name === 'string';
}

function unsafeReadUserName(value: unknown): string {
  // as は型アサーションであり、「この値は UserDto として扱う」と TypeScript に伝える。
  // ただし、実行時に本当に UserDto かどうかを確認しているわけではない。
  // 外部入力や JSON に対して安易に使うと、型チェックは通っても実行時に壊れる可能性がある。
  const user = value as UserDto;

  return user.name;
}

function safeReadUserName(value: unknown): string {
  // unknown の値は、いきなりプロパティを読めない。
  // Unit 05 で扱った custom type guard を使って UserDto に narrowing すると、安全に name を読める。
  // 型アサーションよりも、実行時確認で絞る方が安全な場面が多い。
  if (!isUserDto(value)) {
    return 'unknown user';
  }

  return value.name;
}

export function runTypeAssertionBasics(): void {
  console.log('このファイルでは、型アサーション as の基本と危険性を確認する。');

  const rawUser: unknown = {
    id: 'user-001',
    name: 'Sato',
  };

  const invalidUser: unknown = {
    id: 'user-002',
  };

  const unsafeName = unsafeReadUserName(rawUser);
  const safeName = safeReadUserName(rawUser);
  const fallbackName = safeReadUserName(invalidUser);

  console.log('1. as で unknown を UserDto として扱う');
  console.log('unsafeName:', unsafeName);

  console.log('');
  console.log('2. type guard で安全に narrowing する');
  console.log('safeName:', safeName);
  console.log('fallbackName:', fallbackName);

  assert.equal(unsafeName, 'Sato');
  assert.equal(safeName, 'Sato');
  assert.equal(fallbackName, 'unknown user');
}
