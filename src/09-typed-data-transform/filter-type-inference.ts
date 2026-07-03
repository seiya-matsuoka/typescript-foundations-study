import assert from 'node:assert/strict';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};

function isCompletedTask(task: Task): boolean {
  // 戻り値が boolean の predicate 関数である。
  // この関数は「true / false を返す」ことは分かるが、
  // task の型そのものを別の型へ narrowing するわけではない。
  return task.completed;
}

export function runFilterTypeInference(): void {
  console.log('このファイルでは、filter の型推論を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '設計する',
      completed: true,
    },
    {
      id: 'task-002',
      title: '実装する',
      completed: false,
    },
    {
      id: 'task-003',
      title: '確認する',
      completed: true,
    },
  ];

  const completedTasks = tasks.filter((task) => isCompletedTask(task));
  const incompleteTasks = tasks.filter((task) => !task.completed);

  // filter の callback が boolean を返す場合、配列要素の型は基本的に Task のままである。
  // 「条件に合う Task だけに絞った配列」にはなるが、
  // completed: true のようなリテラル型まで自動で絞られるわけではない。
  console.log('1. boolean predicate で Task[] を絞り込む');
  console.log('completedTasks:', completedTasks);

  console.log('');
  console.log('2. 否定条件でも戻り値の要素型は Task のまま');
  console.log('incompleteTasks:', incompleteTasks);

  assert.deepEqual(
    completedTasks.map((task) => task.id),
    ['task-001', 'task-003'],
  );
  assert.deepEqual(
    incompleteTasks.map((task) => task.id),
    ['task-002'],
  );
}
