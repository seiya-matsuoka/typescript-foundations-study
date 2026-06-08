import assert from 'node:assert/strict';

type RuntimeUser = {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
};

function listRuntimeKeys(value: object): readonly string[] {
  // Object.keys は JavaScript の実行時に存在するプロパティ名を返す。
  // TypeScript の型情報を返しているわけではない。
  // readonly、optional、type alias 名などは、実行時の Object.keys には現れない。
  return Object.keys(value);
}

function formatRuntimeUser(user: RuntimeUser): string {
  return `${user.name} is ${user.active ? 'active' : 'inactive'}`;
}

export function runObjectLiteralAndRuntimeObject(): void {
  console.log('このファイルでは、型としての object と実行時の object の違いを確認する。');

  const user: RuntimeUser = {
    id: 'runtime-001',
    name: 'Kato',
    active: true,
  };

  // RuntimeUser は TypeScript の型としてだけ存在する。
  // 実行時に残るのは、id / name / active を持つ通常の JavaScript object である。
  // Unit 01 の「型情報は実行時には基本的に消える」という話を、object 型で再確認する。
  const keys = listRuntimeKeys(user);
  const formatted = formatRuntimeUser(user);

  console.log('1. TypeScript の型が付いた object literal');
  console.log('user:', user);

  console.log('');
  console.log('2. 実行時に確認できる object の情報');
  console.log('keys:', keys);
  console.log('formatted:', formatted);
  console.log('typeof user:', typeof user);

  assert.deepEqual(keys, ['id', 'name', 'active']);
  assert.equal(formatted, 'Kato is active');
  assert.equal(typeof user, 'object');
}
