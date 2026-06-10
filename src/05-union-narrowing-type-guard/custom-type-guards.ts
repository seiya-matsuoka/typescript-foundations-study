import assert from 'node:assert/strict';

type AdminUser = {
  readonly role: 'admin';
  readonly id: string;
  readonly name: string;
  readonly permissions: readonly string[];
};

type MemberUser = {
  readonly role: 'member';
  readonly id: string;
  readonly name: string;
  readonly joinedProjectIds: readonly string[];
};

type AppUser = AdminUser | MemberUser;

function isAdminUser(user: AppUser): user is AdminUser {
  // user is AdminUser は type predicate と呼ばれる戻り値型である。
  // boolean を返すだけではなく、「true の場合は user を AdminUser として扱える」と TypeScript に伝える。
  // filter や if の条件で使うと、後続のコードで AdminUser 専用プロパティを安全に読める。
  return user.role === 'admin';
}

function isMemberUser(user: AppUser): user is MemberUser {
  // custom type guard は、プロジェクト固有の判定ロジックに名前を付けられる。
  // 同じ role 判定をあちこちに書くより、関数化しておくと読みやすく、型の絞り込みも再利用できる。
  return user.role === 'member';
}

function getUserWorkLabel(user: AppUser): string {
  if (isAdminUser(user)) {
    return `${user.name}: 権限数 ${user.permissions.length}`;
  }

  if (isMemberUser(user)) {
    return `${user.name}: 参加プロジェクト数 ${user.joinedProjectIds.length}`;
  }

  // AppUser は AdminUser | MemberUser なので、通常ここには到達しない。
  // 後続ファイルでは never を使って、この「到達しないはず」を型で確認する。
  return 'unknown user';
}

export function runCustomTypeGuards(): void {
  console.log('このファイルでは、custom type guard と type predicate を確認する。');

  const users: readonly AppUser[] = [
    {
      role: 'admin',
      id: 'user-001',
      name: 'Sato',
      permissions: ['user:read', 'user:write'],
    },
    {
      role: 'member',
      id: 'user-002',
      name: 'Tanaka',
      joinedProjectIds: ['project-001', 'project-002', 'project-003'],
    },
  ];

  const admins = users.filter(isAdminUser);
  const members = users.filter(isMemberUser);
  const workLabels = users.map((user) => getUserWorkLabel(user));

  console.log('1. filter と type predicate');
  console.log('admins:', admins);
  console.log('members:', members);

  console.log('');
  console.log('2. custom type guard で分岐する');
  console.log('workLabels:', workLabels);

  assert.deepEqual(
    admins.map((user) => user.name),
    ['Sato'],
  );
  assert.deepEqual(
    members.map((user) => user.name),
    ['Tanaka'],
  );
  assert.deepEqual(workLabels, ['Sato: 権限数 2', 'Tanaka: 参加プロジェクト数 3']);
}
