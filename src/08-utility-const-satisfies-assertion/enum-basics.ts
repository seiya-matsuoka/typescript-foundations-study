import assert from 'node:assert/strict';

enum NumericTaskStatus {
  Todo,
  Doing,
  Done,
}

enum StringTaskStatus {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done',
}

const enum InternalTaskStatus {
  Draft = 'draft',
  Published = 'published',
}

function describeNumericStatus(status: NumericTaskStatus): string {
  // numeric enum は、値を明示しない場合 0, 1, 2... の数値になる。
  // JavaScript の実行時にも enum オブジェクトが生成される点が、literal union とは異なる。
  if (status === NumericTaskStatus.Done) {
    return '完了';
  }

  return '未完了';
}

function describeStringStatus(status: StringTaskStatus): string {
  // string enum は、実行時の値も読みやすい文字列になる。
  // API の値やログに出る値としては numeric enum より分かりやすい場合がある。
  return status === StringTaskStatus.Done ? '完了' : '未完了';
}

function readInternalStatus(): InternalTaskStatus {
  // const enum はコンパイル時に値へインライン展開される用途で使われる。
  // ただし、ビルド設定やライブラリ公開との相性に注意が必要なため、ここでは概要の確認に留める。
  return InternalTaskStatus.Draft;
}

export function runEnumBasics(): void {
  console.log('このファイルでは、enum の基本を確認する。');

  const numericDoneLabel = describeNumericStatus(NumericTaskStatus.Done);
  const stringDoingLabel = describeStringStatus(StringTaskStatus.Doing);
  const internalStatus = readInternalStatus();

  console.log('1. numeric enum');
  console.log('NumericTaskStatus.Done:', NumericTaskStatus.Done);
  console.log('numericDoneLabel:', numericDoneLabel);

  console.log('');
  console.log('2. string enum');
  console.log('StringTaskStatus.Doing:', StringTaskStatus.Doing);
  console.log('stringDoingLabel:', stringDoingLabel);

  console.log('');
  console.log('3. const enum の概要');
  console.log('internalStatus:', internalStatus);

  assert.equal(NumericTaskStatus.Done, 2);
  assert.equal(numericDoneLabel, '完了');
  assert.equal(StringTaskStatus.Doing, 'doing');
  assert.equal(stringDoingLabel, '未完了');
  assert.equal(internalStatus, 'draft');
}
