import assert from 'node:assert/strict';

type User = {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly role: 'admin' | 'member';
};

function findUserById(users: readonly User[], id: string): User | undefined {
  // find は条件に一致する要素が見つからない可能性がある。
  // そのため戻り値は User ではなく User | undefined になる。
  // noUncheckedIndexedAccess と同じく、存在しない可能性を型で扱う代表例である。
  return users.find((user) => user.id === id);
}

function formatUserName(user: User | undefined): string {
  if (user === undefined) {
    return 'unknown user';
  }

  // undefined を先に処理したため、この行では user は User として narrowing されている。
  return user.name;
}

export function runFindSomeEvery(): void {
  console.log('このファイルでは、find と undefined / some / every を確認する。');

  const users: readonly User[] = [
    {
      id: 'user-001',
      name: 'Sato',
      active: true,
      role: 'admin',
    },
    {
      id: 'user-002',
      name: 'Tanaka',
      active: false,
      role: 'member',
    },
  ];

  const foundUser = findUserById(users, 'user-001');
  const missingUser = findUserById(users, 'user-999');

  const hasAdmin = users.some((user) => user.role === 'admin');
  const allActive = users.every((user) => user.active);

  console.log('1. find は User | undefined を返す');
  console.log('foundUserName:', formatUserName(foundUser));
  console.log('missingUserName:', formatUserName(missingUser));

  console.log('');
  console.log('2. some / every は boolean を返す');
  console.log('hasAdmin:', hasAdmin);
  console.log('allActive:', allActive);

  assert.equal(formatUserName(foundUser), 'Sato');
  assert.equal(formatUserName(missingUser), 'unknown user');
  assert.equal(hasAdmin, true);
  assert.equal(allActive, false);
}
