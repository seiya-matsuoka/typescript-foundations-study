import assert from 'node:assert/strict';

type TaskStatus = 'todo' | 'doing' | 'done';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus;
};

// readonly array は「配列の要素をこの関数の中で追加・削除・差し替えしない」ことを表す。
// React の props や API から受け取った一覧を、そのまま加工せず読む関数ではよく使う。
function countTasks(tasks: readonly Task[]): number {
  return tasks.length;
}

function createStatusPair(status: TaskStatus, label: string): readonly [TaskStatus, string] {
  // tuple は「何番目に何の型が入るか」が決まっている配列である。
  // [TaskStatus, string] は、ただの string[] よりも順番と意味が強く表現される。
  // Object.entries や Map の entries のように、ペアを扱う場面でも tuple の読み方が出てくる。
  return [status, label];
}

export function runTypedArrayReadonlyTuple(): void {
  console.log('このファイルでは、型付き配列・readonly array・tuple を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '要件を整理する',
      status: 'todo',
    },
    {
      id: 'task-002',
      title: '実装する',
      status: 'doing',
    },
  ];

  const taskCount = countTasks(tasks);
  const statusPair = createStatusPair('done', '完了');

  console.log('1. readonly Task[] を受け取る');
  console.log('taskCount:', taskCount);

  console.log('');
  console.log('2. tuple で順番と意味を持つペアを表す');
  console.log('statusPair:', statusPair);

  assert.equal(taskCount, 2);
  assert.deepEqual(statusPair, ['done', '完了']);
}
