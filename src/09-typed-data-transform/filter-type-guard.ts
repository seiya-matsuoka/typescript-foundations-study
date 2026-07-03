import assert from 'node:assert/strict';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly dueDate?: string;
};

type TaskWithDueDate = Task & {
  readonly dueDate: string;
};

function hasDueDate(task: Task): task is TaskWithDueDate {
  // 戻り値の task is TaskWithDueDate が type predicate である。
  // ただの boolean ではなく「true の場合、この task は TaskWithDueDate として扱える」と TypeScript に伝える。
  //
  // exactOptionalPropertyTypes が有効なため、dueDate?: string は「省略される可能性がある」プロパティである。
  // dueDate !== undefined で確認すると、true 側では dueDate を string として扱える。
  return task.dueDate !== undefined;
}

function formatDueDateTask(task: TaskWithDueDate): string {
  // この関数は TaskWithDueDate を受け取るため、dueDate を string として安全に使える。
  // filter(hasDueDate) のあとに呼び出すと、配列要素が TaskWithDueDate に絞られていることが分かる。
  return `${task.title} (${task.dueDate})`;
}

export function runFilterTypeGuard(): void {
  console.log('このファイルでは、type guard を使った filter を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '設計する',
      dueDate: '2026-07-01',
    },
    {
      id: 'task-002',
      title: '実装する',
    },
    {
      id: 'task-003',
      title: '確認する',
      dueDate: '2026-07-05',
    },
  ];

  const tasksWithDueDate = tasks.filter(hasDueDate);
  const labels = tasksWithDueDate.map((task) => formatDueDateTask(task));

  console.log('1. filter(type guard) で dueDate を持つ Task に絞る');
  console.log('tasksWithDueDate:', tasksWithDueDate);

  console.log('');
  console.log('2. 絞り込み後は dueDate を string として扱える');
  console.log('labels:', labels);

  assert.deepEqual(
    tasksWithDueDate.map((task) => task.id),
    ['task-001', 'task-003'],
  );
  assert.deepEqual(labels, ['設計する (2026-07-01)', '確認する (2026-07-05)']);
}
