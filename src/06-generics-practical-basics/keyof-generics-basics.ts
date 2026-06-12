import assert from 'node:assert/strict';

type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly age: number;
};

function pickValue<TObject, TKey extends keyof TObject>(object: TObject, key: TKey): TObject[TKey] {
  // TKey extends keyof TObject は、key が object のプロパティ名のどれかであることを表す。
  // 戻り値を TObject[TKey] と書くことで、選んだ key に対応する値の型を返せる。
  // user から 'name' を選ぶと string、'age' を選ぶと number になる。
  //
  // ここでは、TObject、TKey、TObject[TKey] の3つが連動している。
  // keyof や indexed access type は Unit 07 で厚めに扱うが、
  // 実務では generics と一緒に出てくることが多いため、入口だけ先に確認する。
  return object[key];
}

function pickObject<TObject, TKey extends keyof TObject>(
  object: TObject,
  keys: readonly TKey[],
): Pick<TObject, TKey> {
  const entries = keys.map((key) => [key, object[key]] as const);

  // Object.fromEntries の戻り値は広い型になるため、ここでは Pick<TObject, TKey> として扱う。
  // Unit 06 では型アサーションの詳細には踏み込みすぎず、
  // keyof と generics で「指定したキーだけを持つ型」を表せることを確認する。
  //
  // 型アサーションは、TypeScript が追いきれない関係を人間が補う書き方である。
  // 便利な一方で、実装が型とずれてもコンパイラが検出しづらくなるため、
  // どの境界で使っているかをコメントで残す価値がある。
  return Object.fromEntries(entries) as Pick<TObject, TKey>;
}

export function runKeyofGenericsBasics(): void {
  console.log('このファイルでは、keyof と組み合わせた generics の入口を確認する。');

  const user: User = {
    id: 'user-001',
    name: 'Sato',
    email: 'sato@example.com',
    age: 32,
  };

  const userName = pickValue(user, 'name');
  const userAge = pickValue(user, 'age');
  const publicProfile = pickObject(user, ['id', 'name']);

  console.log('1. key に応じて戻り値型が変わる');
  console.log('userName:', userName);
  console.log('userAge:', userAge);

  console.log('');
  console.log('2. 指定したキーだけを持つオブジェクトを作る');
  console.log('publicProfile:', publicProfile);

  assert.equal(userName, 'Sato');
  assert.equal(userAge, 32);
  assert.deepEqual(publicProfile, {
    id: 'user-001',
    name: 'Sato',
  });
}
