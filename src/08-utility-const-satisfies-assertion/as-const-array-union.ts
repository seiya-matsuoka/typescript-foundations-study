import assert from 'node:assert/strict';

const roles = ['admin', 'member', 'guest'] as const;

type Role = (typeof roles)[number];

type RoleOption = {
  readonly value: Role;
  readonly label: string;
};

function isRole(value: string): value is Role {
  // as const を付けることで、roles は readonly ['admin', 'member', 'guest'] のような tuple として扱われる。
  // そのため (typeof roles)[number] から 'admin' | 'member' | 'guest' という union 型を作れる。
  // includes の引数には Role が期待されるため、外部入力の string は一度 readonly string[] として扱っている。
  return (roles as readonly string[]).includes(value);
}

function toRoleOptions(): readonly RoleOption[] {
  // roles の要素型は Role として保たれている。
  // map の中の role も 'admin' | 'member' | 'guest' の union として扱われる。
  return roles.map((role) => ({
    value: role,
    label: role.toUpperCase(),
  }));
}

export function runAsConstArrayUnion(): void {
  console.log('このファイルでは、as const と定数配列から union 型を作る流れを確認する。');

  const roleOptions = toRoleOptions();
  const adminCheck = isRole('admin');
  const unknownCheck = isRole('owner');

  console.log('1. 定数配列から Role union 型を作る');
  console.log('roles:', roles);
  console.log('roleOptions:', roleOptions);

  console.log('');
  console.log('2. 外部入力の string を Role に narrowing する');
  console.log('adminCheck:', adminCheck);
  console.log('unknownCheck:', unknownCheck);

  assert.deepEqual(roleOptions, [
    {
      value: 'admin',
      label: 'ADMIN',
    },
    {
      value: 'member',
      label: 'MEMBER',
    },
    {
      value: 'guest',
      label: 'GUEST',
    },
  ]);
  assert.equal(adminCheck, true);
  assert.equal(unknownCheck, false);
}
