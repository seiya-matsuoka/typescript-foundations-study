import assert from 'node:assert/strict';

type User = {
  readonly id: string;
  readonly name: string;
  readonly role: 'admin' | 'member';
};

function toReadonlyList<T>(first: T, second: T): readonly T[] {
  // 呼び出し側で <T> を明示していないが、TypeScript は first と second の値から T を推論する。
  // toReadonlyList('a', 'b') なら T は string、toReadonlyList(user1, user2) なら T は User になる。
  //
  // TypeScript の generics では、毎回 <string> や <User> を書く必要はない。
  // どの値から型引数を推論できるかを読むことが、実務コードを読むうえで重要になる。
  return [first, second];
}

function chooseByCondition<T>(condition: boolean, trueValue: T, falseValue: T): T {
  // T は trueValue と falseValue の両方から決まる。
  // 2つの候補を同じ型として扱いたいとき、generics は「値同士の関係」を表せる。
  //
  // ここで trueValue と falseValue の型が大きく違うと、T が広い union 型として推論されることがある。
  // Unit 06 では深追いしないが、型引数の推論は1つの引数だけではなく、
  // 複数の引数の組み合わせから決まることを意識する。
  return condition ? trueValue : falseValue;
}

export function runTypeArgumentInference(): void {
  console.log('このファイルでは、型引数の推論を確認する。');

  const labels = toReadonlyList('下書き', '公開済み');

  const admin: User = {
    id: 'user-001',
    name: 'Sato',
    role: 'admin',
  };

  const member: User = {
    id: 'user-002',
    name: 'Tanaka',
    role: 'member',
  };

  const users = toReadonlyList(admin, member);
  const selectedLabel = chooseByCondition(true, '表示する', '非表示にする');
  const selectedUser = chooseByCondition(false, admin, member);

  console.log('1. 文字列リテラルから配列要素の型を推論する');
  console.log('labels:', labels);

  console.log('');
  console.log('2. オブジェクトから T を推論する');
  console.log('users:', users);

  console.log('');
  console.log('3. 複数の引数から同じ T を推論する');
  console.log('selectedLabel:', selectedLabel);
  console.log('selectedUser:', selectedUser);

  assert.deepEqual(labels, ['下書き', '公開済み']);
  assert.deepEqual(users, [admin, member]);
  assert.equal(selectedLabel, '表示する');
  assert.deepEqual(selectedUser, member);
}
