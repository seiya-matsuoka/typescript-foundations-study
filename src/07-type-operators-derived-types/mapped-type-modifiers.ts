import assert from 'node:assert/strict';

type SavedTask = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly completed: boolean;
};

type Mutable<TValue> = {
  -readonly [Key in keyof TValue]: TValue[Key];
};

type RequiredFields<TValue> = {
  readonly [Key in keyof TValue]-?: TValue[Key];
};

type EditableTask = Mutable<SavedTask>;
type CompleteTaskSnapshot = RequiredFields<SavedTask>;

function renameTask(task: EditableTask, title: string): EditableTask {
  // -readonly modifier は、mapped type の中で readonly を外す書き方である。
  // SavedTask は読み取り専用として扱うが、編集画面の一時状態では書き換え可能な型が欲しいことがある。
  //
  // 実務では「保存済みデータ」と「フォームで編集中のデータ」を分けるために、
  // readonly を付けたり外したりする派生型を読む場面がある。
  task.title = title;
  return task;
}

function createCompleteSnapshot(task: SavedTask): CompleteTaskSnapshot {
  // -? modifier は、mapped type の中で optional を外す書き方である。
  // description?: string は省略可能だが、snapshot では必ず description を持つ形にしている。
  // exactOptionalPropertyTypes が有効な環境では、optional は「undefined を入れる」ではなく「省略できる」と読む。
  return {
    ...task,
    description: task.description ?? '',
  };
}

export function runMappedTypeModifiers(): void {
  console.log('このファイルでは、readonly / ? modifier の入口を確認する。');

  const savedTask: SavedTask = {
    id: 'task-001',
    title: '旧タイトル',
    completed: false,
  };

  const editableTask: EditableTask = {
    id: savedTask.id,
    title: savedTask.title,
    completed: savedTask.completed,
  };

  const renamedTask = renameTask(editableTask, '新タイトル');
  const snapshot = createCompleteSnapshot(savedTask);

  console.log('1. -readonly で編集用の型を作る');
  console.log('renamedTask:', renamedTask);

  console.log('');
  console.log('2. -? で optional を外した snapshot 型を作る');
  console.log('snapshot:', snapshot);

  assert.deepEqual(renamedTask, {
    id: 'task-001',
    title: '新タイトル',
    completed: false,
  });
  assert.deepEqual(snapshot, {
    id: 'task-001',
    title: '旧タイトル',
    description: '',
    completed: false,
  });
}
