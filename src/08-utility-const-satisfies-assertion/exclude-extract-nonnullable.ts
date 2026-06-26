import assert from 'node:assert/strict';

type ProjectStatus = 'draft' | 'published' | 'archived' | 'deleted';
type VisibleStatus = Exclude<ProjectStatus, 'deleted'>;
type TerminalStatus = Extract<ProjectStatus, 'archived' | 'deleted'>;
type MaybeMessage = string | null | undefined;
type Message = NonNullable<MaybeMessage>;

function toVisibleStatus(status: ProjectStatus): VisibleStatus {
  // Exclude<T, U> は、union 型 T から U に含まれる型を取り除く。
  // ここでは deleted を画面表示の対象外にしている。
  if (status === 'deleted') {
    return 'archived';
  }

  return status;
}

function isTerminalStatus(status: ProjectStatus): status is TerminalStatus {
  // Extract<T, U> は、union 型 T のうち U と重なる型だけを取り出す。
  // type guard の戻り値に使うことで、分岐後の status を TerminalStatus に narrowing できる。
  return status === 'archived' || status === 'deleted';
}

function normalizeMessage(message: MaybeMessage): Message {
  // NonNullable<T> は、T から null と undefined を取り除く。
  // ただし、型だけで null / undefined が消えるわけではない。
  // 実行時に fallback を用意して、返す値を必ず string にしている。
  return message ?? '';
}

export function runExcludeExtractNonNullable(): void {
  console.log('このファイルでは、Exclude / Extract / NonNullable を確認する。');

  const visibleStatus = toVisibleStatus('deleted');
  const statuses: readonly ProjectStatus[] = ['draft', 'archived', 'deleted'];
  const terminalStatuses = statuses.filter(isTerminalStatus);
  const normalizedMessage = normalizeMessage(null);

  console.log('1. Exclude<T, U> で union から特定の値を除外する');
  console.log('visibleStatus:', visibleStatus);

  console.log('');
  console.log('2. Extract<T, U> と type guard を組み合わせる');
  console.log('terminalStatuses:', terminalStatuses);

  console.log('');
  console.log('3. NonNullable<T> と実行時 fallback を組み合わせる');
  console.log('normalizedMessage:', normalizedMessage);

  assert.equal(visibleStatus, 'archived');
  assert.deepEqual(terminalStatuses, ['archived', 'deleted']);
  assert.equal(normalizedMessage, '');
}
