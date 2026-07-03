import assert from 'node:assert/strict';

const ROLES = ['admin', 'member', 'guest'] as const;

type Role = (typeof ROLES)[number];

type Permission = {
  readonly canView: boolean;
  readonly canEdit: boolean;
};

function createDefaultPermissions(roles: readonly Role[]): Record<Role, Permission> {
  const entries = roles.map(
    (role) =>
      [
        role,
        {
          canView: true,
          canEdit: role !== 'guest',
        },
      ] as const,
  );

  // Object.fromEntries は実行時には辞書オブジェクトを作れるが、
  // TypeScript の戻り値型は広くなりやすい。
  // ここでは roles が Role の全要素を含む前提で、Record<Role, Permission> として扱う。
  //
  // Unit 08 で扱った as const により、ROLES から 'admin' | 'member' | 'guest' を作っている。
  // 配列から union 型を作り、その union を Record のキーに使う流れは実務でもよく出る。
  return Object.fromEntries(entries) as Record<Role, Permission>;
}

export function runFromEntriesDictionaryTransform(): void {
  console.log('このファイルでは、Object.fromEntries の型を確認する。');

  const permissions = createDefaultPermissions(ROLES);

  console.log('1. as const 配列から Role を作り、Record<Role, Permission> へ変換する');
  console.log('permissions:', permissions);

  assert.deepEqual(permissions, {
    admin: {
      canView: true,
      canEdit: true,
    },
    member: {
      canView: true,
      canEdit: true,
    },
    guest: {
      canView: true,
      canEdit: false,
    },
  });
}
