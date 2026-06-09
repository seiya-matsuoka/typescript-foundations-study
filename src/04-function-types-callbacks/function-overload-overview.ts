import assert from 'node:assert/strict';

type UserLookup = {
  readonly id: string;
  readonly name: string;
};

function findUser(query: string): UserLookup | undefined;
function findUser(query: { readonly id: string }): UserLookup | undefined;
function findUser(query: string | { readonly id: string }): UserLookup | undefined {
  // overload は、呼び出し方によって引数の形を複数用意したいときに使う。
  // 実装本体では union 型として受け取り、typeof などで分岐する。
  // 実務では便利な反面、複雑にしすぎると読みづらくなるため、概要として押さえる。
  const users: readonly UserLookup[] = [
    { id: 'user-001', name: 'Sato' },
    { id: 'user-002', name: 'Tanaka' },
  ];

  if (typeof query === 'string') {
    return users.find((user) => user.name === query);
  }

  return users.find((user) => user.id === query.id);
}

export function runFunctionOverloadOverview(): void {
  console.log('このファイルでは、overload の概要を確認する。');

  const foundByName = findUser('Sato');
  const foundById = findUser({ id: 'user-002' });
  const missingUser = findUser('Suzuki');

  console.log('1. string を引数にする呼び出し');
  console.log('foundByName:', foundByName);

  console.log('');
  console.log('2. object を引数にする呼び出し');
  console.log('foundById:', foundById);
  console.log('missingUser:', missingUser ?? 'not found');

  assert.deepEqual(foundByName, { id: 'user-001', name: 'Sato' });
  assert.deepEqual(foundById, { id: 'user-002', name: 'Tanaka' });
  assert.equal(missingUser, undefined);
}

export function functionOverloadTypeErrorExamples(): void {
  // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
  // overload で定義した呼び出し方以外は型エラーになる。
  // @ts-expect-error: number は findUser の overload に含まれないことを確認する。
  findUser(123);
}
