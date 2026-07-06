import assert from 'node:assert/strict';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};

async function fetchCompletedTaskCount(): Promise<number> {
  // async function は、return した値を自動的に Promise で包む。
  // ここで return しているのは number だが、関数全体の戻り値型は Promise<number> になる。
  // 戻り値型を number と書くと、async function の実際の戻り値と合わない。
  return 3;
}

async function fetchTask(): Promise<Task> {
  // 公開 API や repository に近い関数では、戻り値型を明示すると読み手に意図が伝わりやすい。
  // async function の戻り値型を書く場合は Task ではなく Promise<Task> と書く。
  // 「この関数を呼ぶと Task がすぐ返る」のではなく「await すると Task が得られる」と読む。
  return {
    id: 'task-001',
    title: '非同期処理を確認する',
    completed: false,
  };
}

async function createTaskTitleLabel(taskId: string) {
  // 戻り値型を省略しているが、TypeScript は Promise<string> と推論する。
  // 小さな内部関数では推論に任せてもよい。
  // 一方、外部に公開する関数や、Result 型のように意図を明確にしたい関数では明示する方が読みやすい。
  const task = await fetchTask();

  return `${taskId}:${task.title}`;
}

export async function runAsyncFunctionReturnTypes(): Promise<void> {
  console.log('このファイルでは、async function の戻り値を確認する。');

  const completedTaskCount = await fetchCompletedTaskCount();
  const task = await fetchTask();
  const taskTitleLabel = await createTaskTitleLabel(task.id);

  console.log('1. async function の戻り値は Promise<T> になる');
  console.log('completedTaskCount:', completedTaskCount);

  console.log('');
  console.log('2. 戻り値型を明示した async function');
  console.log('task:', task);

  console.log('');
  console.log('3. 戻り値型を推論に任せた async function');
  console.log('taskTitleLabel:', taskTitleLabel);

  assert.equal(completedTaskCount, 3);
  assert.deepEqual(task, {
    id: 'task-001',
    title: '非同期処理を確認する',
    completed: false,
  });
  assert.equal(taskTitleLabel, 'task-001:非同期処理を確認する');
}
