import assert from 'node:assert/strict';

type UserSummary = {
  readonly id: string;
  readonly name: string;
};

function fetchUserName(): Promise<string> {
  // Promise<string> は「今すぐ string がある」のではなく、
  // 将来 resolve されたときに string が得られる非同期値を表す。
  // JavaScript の Promise に、TypeScript では「解決後の値の型」を付けて読む。
  return Promise.resolve('Sato');
}

function fetchUserSummary(): Promise<UserSummary> {
  // Promise の中身が object の場合も同じで、Promise<UserSummary> と読める。
  // API client や repository 風関数では、このように戻り値を Promise<データ型> として表すことが多い。
  // ここで UserSummary 自体は同期的な object 型であり、Promise<UserSummary> は非同期で取得する wrapper として読む。
  return Promise.resolve({
    id: 'user-001',
    name: 'Sato',
  });
}

export async function runPromiseBasics(): Promise<void> {
  console.log('このファイルでは、Promise<T> の基本を確認する。');

  const userName = await fetchUserName();
  const userSummary = await fetchUserSummary();

  // await した後の userName は string、userSummary は UserSummary として扱える。
  // Promise<T> の T は、await 後に取り出せる値の型と対応している。
  // React の data fetching でも、API client は Promise<T> を返し、state に入れる値は T になることが多い。
  console.log('1. Promise<string> を await して string を取り出す');
  console.log('userName:', userName);

  console.log('');
  console.log('2. Promise<UserSummary> を await して object を取り出す');
  console.log('userSummary:', userSummary);

  assert.equal(userName, 'Sato');
  assert.deepEqual(userSummary, {
    id: 'user-001',
    name: 'Sato',
  });
}
