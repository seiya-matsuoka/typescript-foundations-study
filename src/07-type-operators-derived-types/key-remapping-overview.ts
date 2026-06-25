import assert from 'node:assert/strict';

type FormValues = {
  readonly title: string;
  readonly dueDate: string;
};

type ChangeHandlers<TValues> = {
  readonly [Key in keyof TValues as `on${Capitalize<string & Key>}Change`]: (
    value: TValues[Key],
  ) => void;
};

function createFormHandlers(logs: string[]): ChangeHandlers<FormValues> {
  // key remapping は、mapped type の key を別の名前に変換する機能である。
  // ここでは title から onTitleChange、dueDate から onDueDateChange という key を作っている。
  //
  // string & Key は、Capitalize に渡すために Key を文字列として扱うための書き方である。
  // Unit 07 では細部を深追いせず、「元の key から別の key 名を組み立てている」と読む。
  return {
    onTitleChange(value) {
      logs.push(`title:${value}`);
    },
    onDueDateChange(value) {
      logs.push(`dueDate:${value}`);
    },
  };
}

export function runKeyRemappingOverview(): void {
  console.log('このファイルでは、key remapping の概要を確認する。');

  const logs: string[] = [];
  const handlers = createFormHandlers(logs);

  handlers.onTitleChange('TypeScript を読む');
  handlers.onDueDateChange('2026-06-30');

  console.log('1. form values の key から handler 名を作る');
  console.log('logs:', logs);

  assert.deepEqual(logs, ['title:TypeScript を読む', 'dueDate:2026-06-30']);
}
