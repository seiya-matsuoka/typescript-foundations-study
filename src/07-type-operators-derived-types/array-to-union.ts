import assert from 'node:assert/strict';

const userRoles = ['admin', 'member', 'viewer'] as const;

type UserRole = (typeof userRoles)[number];

const permissionsByRole: Record<UserRole, readonly string[]> = {
  admin: ['user:read', 'user:write', 'setting:write'],
  member: ['user:read', 'article:write'],
  viewer: ['article:read'],
};

function hasRole(role: string): role is UserRole {
  // 配列から作った UserRole 型は、実行時の判定にはそのまま使えない。
  // 型はコンパイル時の情報であり、実行時には消えるためである。
  // そのため、実行時の userRoles 配列を使って custom type guard を作っている。
  return (userRoles as readonly string[]).includes(role);
}

function getPermissions(role: UserRole): readonly string[] {
  // (typeof userRoles)[number] は、配列 userRoles の要素型を取り出す書き方である。
  // as const がないと userRoles は string[] に広がり、UserRole も string になってしまう。
  // 実務では const roles = [...] as const から Role union を作る形をよく見る。
  return permissionsByRole[role];
}

export function runArrayToUnion(): void {
  console.log('このファイルでは、配列から union 型を作る方法を確認する。');

  const adminPermissions = getPermissions('admin');
  const inputRole = 'member';
  const guardedPermissions = hasRole(inputRole) ? getPermissions(inputRole) : [];

  console.log('1. as const の配列から UserRole union を作る');
  console.log('adminPermissions:', adminPermissions);

  console.log('');
  console.log('2. 実行時の文字列を type guard で UserRole に絞る');
  console.log('guardedPermissions:', guardedPermissions);

  assert.deepEqual(adminPermissions, ['user:read', 'user:write', 'setting:write']);
  assert.deepEqual(guardedPermissions, ['user:read', 'article:write']);
}
