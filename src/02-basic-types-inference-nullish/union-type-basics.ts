import assert from 'node:assert/strict';

type PublishStatus = 'draft' | 'published' | 'archived';
type NotificationLevel = 'info' | 'warning' | 'error';

function getStatusLabel(status: PublishStatus): string {
  if (status === 'draft') {
    return '下書き';
  }

  if (status === 'published') {
    return '公開済み';
  }

  return 'アーカイブ済み';
}

function formatNotification(level: NotificationLevel, message: string): string {
  return `[${level}] ${message}`;
}

export function runUnionTypeBasics(): void {
  console.log('[union-type-basics.ts]');
  console.log('union type の入口を確認する');
  console.log('');

  const draftStatus: PublishStatus = 'draft';
  const publishedStatus: PublishStatus = 'published';
  const archivedStatus: PublishStatus = 'archived';

  // union type は、許可する型や値の候補を | で並べる。
  // status や role のような決まった選択肢を扱う場合、単なる string より安全に表現できる。
  console.log('1. 許可する値の候補を限定する');
  console.log('draft:', getStatusLabel(draftStatus));
  console.log('published:', getStatusLabel(publishedStatus));
  console.log('archived:', getStatusLabel(archivedStatus));
  console.log('');

  const infoMessage = formatNotification('info', '保存しました');
  const warningMessage = formatNotification('warning', '入力内容を確認してください');
  const errorMessage = formatNotification('error', '保存に失敗しました');

  // 関数の引数に union type を使うと、呼び出し側で誤った文字列を渡しにくくなる。
  // 後続の Unit 05 では、この union type を条件分岐で絞り込む narrowing を扱う。
  console.log('2. 関数引数で union type を使う');
  console.log(infoMessage);
  console.log(warningMessage);
  console.log(errorMessage);
  console.log('');

  // @ts-expect-error: PublishStatus に含まれない文字列は代入できないことを確認する。
  const invalidStatus: PublishStatus = 'deleted';

  // @ts-expect-error: NotificationLevel に含まれない文字列は渡せないことを確認する。
  const invalidMessage = formatNotification('success', '完了しました');

  console.log('3. 意図した型エラーの実行時の値');
  console.log('invalidStatus runtime value:', invalidStatus);
  console.log('invalidMessage runtime value:', invalidMessage);

  assert.equal(getStatusLabel(draftStatus), '下書き');
  assert.equal(getStatusLabel(publishedStatus), '公開済み');
  assert.equal(getStatusLabel(archivedStatus), 'アーカイブ済み');
  assert.equal(infoMessage, '[info] 保存しました');
  assert.equal(warningMessage, '[warning] 入力内容を確認してください');
  assert.equal(errorMessage, '[error] 保存に失敗しました');
  assert.equal(invalidStatus, 'deleted');
  assert.equal(invalidMessage, '[success] 完了しました');
}
