import assert from 'node:assert/strict';

type UserCard = {
  readonly id: string;
  readonly name: string;
};

function renderUserCard(card: UserCard): string {
  return `${card.id}: ${card.name}`;
}

export function runExcessPropertyChecks(): void {
  console.log('このファイルでは、object literal と excess property checks を確認する。');

  const card: UserCard = {
    id: 'user-001',
    name: 'Sato',
  };

  const apiUser = {
    id: 'user-002',
    name: 'Tanaka',
    age: 30,
  };

  // object literal を直接 UserCard として作ると、余分なプロパティが検出されやすい。
  // 一方で、いったん変数に入った値は、必要なプロパティを持っていれば渡せる場面がある。
  //
  // apiUser は age も持つが、renderUserCard が必要とする id / name を持っているため渡せる。
  // これは TypeScript の structural typing と関係する。
  const renderedCard = renderUserCard(card);
  const renderedFromApiUser = renderUserCard(apiUser);

  console.log('1. 必要なプロパティだけを持つ object literal');
  console.log('renderedCard:', renderedCard);

  console.log('');
  console.log('2. 余分なプロパティを持つ変数を渡す例');
  console.log('apiUser:', apiUser);
  console.log('renderedFromApiUser:', renderedFromApiUser);

  assert.equal(renderedCard, 'user-001: Sato');
  assert.equal(renderedFromApiUser, 'user-002: Tanaka');
}

export function excessPropertyTypeErrorExamples(): void {
  const validCard: UserCard = {
    id: 'user-003',
    name: 'Yamada',
  };

  const invalidCard: UserCard = {
    id: 'user-004',
    name: 'Suzuki',
    // object literal を直接 UserCard として作る場合、余分な age は excess property checks で検出される。
    // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
    //
    // Java 経験者の感覚では「型に代入するなら常に厳密に一致する」と考えがちだが、
    // TypeScript では object literal を直接書く場合と、変数経由で渡す場合でチェックの働き方が変わる。
    // @ts-expect-error: UserCard に存在しない age を object literal に含めると型エラーになることを確認する。
    age: 28,
  };

  void validCard;
  void invalidCard;
}
