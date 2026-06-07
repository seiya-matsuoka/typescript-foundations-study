import assert from 'node:assert/strict';

type UserRole = 'admin' | 'member';

type UserSummary = {
  readonly id: string;
  readonly name: string;
  readonly role: UserRole;
};

function createUserSummary(id: string, name: string, role: UserRole): UserSummary {
  // 関数の引数と戻り値は、型注釈を書く価値が高い場所である。
  // 呼び出し側との境界になるため、どの値を受け取り、どの形で返すかが読み手に伝わる。
  return {
    id,
    name,
    role,
  };
}

function formatUserLabel(user: UserSummary): string {
  // 戻り値の型を明示すると、この関数が文字列を返すことが読み取りやすくなる。
  // 小さな関数では推論に任せてもよいが、外から使う関数では明示することで変更に気づきやすくなる。
  return `${user.name} (${user.role})`;
}

export function runTypeAnnotations(): void {
  console.log('[type-annotations.ts]');
  console.log('型注釈を書く場面を確認する');
  console.log('');

  const user = createUserSummary('u001', 'Yamada', 'admin');
  const label = formatUserLabel(user);

  // オブジェクトや関数の境界では、型注釈によって意図が読みやすくなる。
  // 特に UserSummary のような型は、後続の Unit 03 のオブジェクト型にもつながる。
  console.log('1. 関数の引数と戻り値に型を書く');
  console.log('user:', user);
  console.log('label:', label);
  console.log('');

  const point: { readonly x: number; readonly y: number } = {
    x: 10,
    y: 20,
  };

  // 小さいオブジェクトなら、その場で object type を書くこともできる。
  // ただし、何度も使う形なら type alias に切り出す方が読みやすい。
  console.log('2. その場で書くオブジェクト型');
  console.log(`point: (${point.x}, ${point.y})`);
  console.log('');

  let selectedRole: UserRole;

  // 初期値なしで変数を宣言する場合は、型注釈を書く価値がある。
  // ここでは UserRole と明示することで、あとから代入できる値を 'admin' | 'member' に限定している。
  // let を使っているため、実際に値を変更し、再代入が必要な変数として扱う。
  selectedRole = 'member';
  const firstSelectedRole = selectedRole;

  selectedRole = 'admin';
  const secondSelectedRole = selectedRole;

  console.log('3. 初期値なしの変数に型注釈を書く');
  console.log('firstSelectedRole:', firstSelectedRole);
  console.log('secondSelectedRole:', secondSelectedRole);

  assert.deepEqual(user, {
    id: 'u001',
    name: 'Yamada',
    role: 'admin',
  });
  assert.equal(label, 'Yamada (admin)');
  assert.deepEqual(point, { x: 10, y: 20 });
  assert.equal(firstSelectedRole, 'member');
  assert.equal(secondSelectedRole, 'admin');
}
