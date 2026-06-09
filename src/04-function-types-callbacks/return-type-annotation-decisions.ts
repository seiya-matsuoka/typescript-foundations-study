import assert from 'node:assert/strict';

type UserRole = 'admin' | 'member';

type UserAccount = {
  readonly id: string;
  readonly name: string;
  readonly role: UserRole;
  readonly active: boolean;
};

type UserBadge = {
  readonly label: string;
  readonly tone: 'strong' | 'normal';
};

function createUserBadge(user: UserAccount): UserBadge {
  // 外部から使われる関数や、戻り値の形が仕様として重要な関数では、戻り値型を明示すると読みやすい。
  // ここでは UserBadge と明示することで、label と tone を返す関数であることが分かる。
  // 後から実装を変えても、戻り値の形が崩れた場合は TypeScript が検出する。
  return {
    label: user.role === 'admin' ? '管理者' : 'メンバー',
    tone: user.role === 'admin' ? 'strong' : 'normal',
  };
}

function isActiveAdmin(user: UserAccount) {
  // 小さく閉じた関数では、戻り値型を推論に任せても読みやすいことがある。
  // この関数の戻り値は、比較演算の結果から boolean と推論される。
  // ただし、公開 API や複雑な変換関数では戻り値型を書いた方が意図を保ちやすい。
  return user.active && user.role === 'admin';
}

function toUserLabel(user: UserAccount) {
  // template literal の結果から、戻り値は string と推論される。
  // 推論に任せてよい場面でも、読み手が迷うほど複雑になったら型注釈を検討する。
  return `${user.name} (${user.role})`;
}

export function runReturnTypeAnnotationDecisions(): void {
  console.log('このファイルでは、戻り値型を書く場面と推論に任せる場面を確認する。');

  const adminUser: UserAccount = {
    id: 'user-001',
    name: 'Sato',
    role: 'admin',
    active: true,
  };

  const memberUser: UserAccount = {
    id: 'user-002',
    name: 'Tanaka',
    role: 'member',
    active: true,
  };

  const adminBadge = createUserBadge(adminUser);
  const memberBadge = createUserBadge(memberUser);
  const adminActive = isActiveAdmin(adminUser);
  const memberActive = isActiveAdmin(memberUser);
  const adminLabel = toUserLabel(adminUser);

  console.log('1. 戻り値型を明示した関数');
  console.log('adminBadge:', adminBadge);
  console.log('memberBadge:', memberBadge);

  console.log('');
  console.log('2. 戻り値型を推論に任せた関数');
  console.log('adminActive:', adminActive);
  console.log('memberActive:', memberActive);
  console.log('adminLabel:', adminLabel);

  assert.deepEqual(adminBadge, { label: '管理者', tone: 'strong' });
  assert.deepEqual(memberBadge, { label: 'メンバー', tone: 'normal' });
  assert.equal(adminActive, true);
  assert.equal(memberActive, false);
  assert.equal(adminLabel, 'Sato (admin)');
}
