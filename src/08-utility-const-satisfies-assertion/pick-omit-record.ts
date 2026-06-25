import assert from 'node:assert/strict';

type Account = {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly role: 'admin' | 'member';
};

type PublicAccount = Pick<Account, 'id' | 'displayName' | 'role'>;
type AccountCreateInput = Omit<Account, 'id' | 'passwordHash'> & {
  readonly password: string;
};
type Role = Account['role'];
type RoleLabelMap = Record<Role, string>;

function toPublicAccount(account: Account): PublicAccount {
  // Pick<T, K> は、元の型 T から必要なキー K だけを抜き出す。
  // API DTO や DB entity から、画面や外部公開用に必要な項目だけを選ぶ場面で使う。
  return {
    id: account.id,
    displayName: account.displayName,
    role: account.role,
  };
}

function createAccount(input: AccountCreateInput): Account {
  // Omit<T, K> は、元の型 T から不要なキー K を除外する。
  // 新規作成時は id や passwordHash を入力させず、代わりに password を受け取る、という形を表している。
  return {
    id: 'account-001',
    displayName: input.displayName,
    email: input.email,
    passwordHash: `hashed:${input.password}`,
    role: input.role,
  };
}

function labelRole(role: Role, labels: RoleLabelMap): string {
  // Record<K, T> は、キーの集合 K と値の型 T からオブジェクト型を作る。
  // ここでは role の union 型をキーにして、すべての role に表示ラベルがあることを型で確認している。
  return labels[role];
}

export function runPickOmitRecord(): void {
  console.log('このファイルでは、Pick / Omit / Record を確認する。');

  const account = createAccount({
    displayName: 'Sato',
    email: 'sato@example.com',
    password: 'passw0rd',
    role: 'admin',
  });

  const publicAccount = toPublicAccount(account);

  const roleLabels: RoleLabelMap = {
    admin: '管理者',
    member: 'メンバー',
  };

  const roleLabel = labelRole(publicAccount.role, roleLabels);

  console.log('1. Omit<T, K> で作成入力用の型を作る');
  console.log('account:', account);

  console.log('');
  console.log('2. Pick<T, K> で公開用の型を作る');
  console.log('publicAccount:', publicAccount);

  console.log('');
  console.log('3. Record<K, T> で role ごとの表示ラベルを作る');
  console.log('roleLabel:', roleLabel);

  assert.deepEqual(account, {
    id: 'account-001',
    displayName: 'Sato',
    email: 'sato@example.com',
    passwordHash: 'hashed:passw0rd',
    role: 'admin',
  });
  assert.deepEqual(publicAccount, {
    id: 'account-001',
    displayName: 'Sato',
    role: 'admin',
  });
  assert.equal(roleLabel, '管理者');
}
