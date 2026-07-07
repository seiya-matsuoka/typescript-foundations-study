import assert from 'node:assert/strict';

type NotificationItem = {
  readonly id: string;
  readonly message: string;
};

async function fetchNotifications(): Promise<readonly NotificationItem[]> {
  return [{ id: 'notice-001', message: 'レビュー依頼があります' }];
}

async function fetchOptionalReport(): Promise<string> {
  // この関数は意図的に失敗させ、Promise.allSettled の結果型を確認する。
  // Promise.all では1つでも reject されると全体が reject されるが、
  // Promise.allSettled では成功と失敗を配列の各要素として受け取れる。
  throw new Error('レポート取得に失敗しました');
}

function summarizeSettledResult(
  result: PromiseSettledResult<readonly NotificationItem[] | string>,
): string {
  if (result.status === 'fulfilled') {
    // status === 'fulfilled' により、result.value を安全に読める。
    // Unit 05 の discriminated union と同じ読み方である。
    return `fulfilled:${JSON.stringify(result.value)}`;
  }

  // status === 'rejected' の場合は result.reason を読む。
  // reason は実行時には何でも入り得るため、Error かどうかを確認してから message を読む。
  return result.reason instanceof Error ? `rejected:${result.reason.message}` : 'rejected:unknown';
}

export async function runPromiseAllSettled(): Promise<void> {
  console.log('このファイルでは、Promise.allSettled を確認する。');

  const results = await Promise.allSettled([fetchNotifications(), fetchOptionalReport()]);
  const summaries = results.map((result) => summarizeSettledResult(result));

  console.log('1. 成功と失敗を両方受け取る');
  console.log('results:', results);

  console.log('');
  console.log('2. status によって fulfilled / rejected を分岐する');
  console.log('summaries:', summaries);

  assert.equal(results[0]?.status, 'fulfilled');
  assert.equal(results[1]?.status, 'rejected');
  assert.deepEqual(summaries, [
    'fulfilled:[{"id":"notice-001","message":"レビュー依頼があります"}]',
    'rejected:レポート取得に失敗しました',
  ]);
}
