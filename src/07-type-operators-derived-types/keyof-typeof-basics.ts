import assert from 'node:assert/strict';

const statusLabels = {
  draft: '下書き',
  reviewing: 'レビュー中',
  published: '公開済み',
} as const;

type ArticleStatus = keyof typeof statusLabels;

type StatusLabel = (typeof statusLabels)[ArticleStatus];

function formatStatus(status: ArticleStatus): StatusLabel {
  // keyof typeof は、値として定義した object の key から union 型を作る定番パターンである。
  // typeof statusLabels で値の型を取り出し、keyof でその key だけを union にしている。
  //
  // as const により、statusLabels の値は string ではなく具体的な文字列リテラルとして保持される。
  // そのため StatusLabel も '下書き' | 'レビュー中' | '公開済み' のような union として読める。
  return statusLabels[status];
}

function getAvailableStatuses(): readonly ArticleStatus[] {
  // Object.keys の戻り値は実行時には string[] であり、TypeScript は具体的な key の union までは保持しない。
  // ここでは statusLabels の key だけを返していることを人間が分かっているため、ArticleStatus[] として扱う。
  // 型アサーションは便利だが、実装と型がずれた場合に検出しづらくなるため、境界として意識する。
  return Object.keys(statusLabels) as ArticleStatus[];
}

export function runKeyofTypeofBasics(): void {
  console.log('このファイルでは、keyof typeof の基本を確認する。');

  const draftLabel = formatStatus('draft');
  const publishedLabel = formatStatus('published');
  const statuses = getAvailableStatuses();

  console.log('1. 値 statusLabels の key から ArticleStatus 型を作る');
  console.log('draftLabel:', draftLabel);
  console.log('publishedLabel:', publishedLabel);

  console.log('');
  console.log('2. 実行時の Object.keys と型の境界を確認する');
  console.log('statuses:', statuses);

  assert.equal(draftLabel, '下書き');
  assert.equal(publishedLabel, '公開済み');
  assert.deepEqual(statuses, ['draft', 'reviewing', 'published']);
}
