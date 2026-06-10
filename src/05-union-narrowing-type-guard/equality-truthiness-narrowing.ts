import assert from 'node:assert/strict';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'failed';
type OptionalMessage = string | null | undefined;

function getSaveStatusLabel(status: SaveStatus): string {
  // equality narrowing は、=== や !== によって literal union の候補を絞る仕組みである。
  // status === 'saving' の中では、status は 'saving' であると判断される。
  if (status === 'idle') {
    return '未保存';
  }

  if (status === 'saving') {
    return '保存中';
  }

  if (status === 'saved') {
    return '保存済み';
  }

  return '保存失敗';
}

function formatMessageByTruthiness(message: OptionalMessage): string {
  // truthiness narrowing は、if (message) のような真偽値判定で型を絞る仕組みである。
  // ただし、空文字 '' も false として扱われるため、
  // 「null / undefined ではない」ことだけを確認したい場合には注意が必要になる。
  if (message) {
    return `message:${message}`;
  }

  return 'messageなし';
}

function formatMessageByNullishCheck(message: OptionalMessage): string {
  // null / undefined だけを除外したい場合は、message == null や message !== undefined などを使う。
  // ここでは message == null により、null と undefined をまとめて判定している。
  // 空文字は値として残るため、truthiness narrowing との違いを確認できる。
  if (message == null) {
    return 'messageなし';
  }

  return `message:${message}`;
}

export function runEqualityTruthinessNarrowing(): void {
  console.log('このファイルでは、equality narrowing と truthiness narrowing を確認する。');

  const savingLabel = getSaveStatusLabel('saving');
  const failedLabel = getSaveStatusLabel('failed');

  console.log('1. equality narrowing');
  console.log('savingLabel:', savingLabel);
  console.log('failedLabel:', failedLabel);

  const truthyMessage = formatMessageByTruthiness('保存しました');
  const emptyByTruthiness = formatMessageByTruthiness('');
  const emptyByNullishCheck = formatMessageByNullishCheck('');
  const undefinedByNullishCheck = formatMessageByNullishCheck(undefined);

  console.log('');
  console.log('2. truthiness narrowing と nullish check の違い');
  console.log('truthyMessage:', truthyMessage);
  console.log('emptyByTruthiness:', emptyByTruthiness);
  console.log('emptyByNullishCheck:', emptyByNullishCheck);
  console.log('undefinedByNullishCheck:', undefinedByNullishCheck);

  assert.equal(savingLabel, '保存中');
  assert.equal(failedLabel, '保存失敗');
  assert.equal(truthyMessage, 'message:保存しました');
  assert.equal(emptyByTruthiness, 'messageなし');
  assert.equal(emptyByNullishCheck, 'message:');
  assert.equal(undefinedByNullishCheck, 'messageなし');
}
