import assert from 'node:assert/strict';

type TaskStatus = 'todo' | 'doing' | 'done';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus;
  readonly point: number;
};

type TaskSummary = {
  readonly totalCount: number;
  readonly totalPoint: number;
  readonly countByStatus: Record<TaskStatus, number>;
};

function summarizeTasks(tasks: readonly Task[]): TaskSummary {
  const initialSummary: TaskSummary = {
    totalCount: 0,
    totalPoint: 0,
    countByStatus: {
      todo: 0,
      doing: 0,
      done: 0,
    },
  };

  // reduce は TypeScript 初学者がつまずきやすい配列メソッドの1つである。
  // accumulator の型を明示しないと、初期値の形から狭すぎる型や意図しない型に推論されることがある。
  //
  // ここでは reduce<TaskSummary> と明示して、
  // accumulator が常に TaskSummary の形を持つことを読みやすくしている。
  // 実務でも、集計結果・辞書・表示用オブジェクトを reduce で作る場合は、
  // accumulator 型を明示した方が読みやすいことが多い。
  return tasks.reduce<TaskSummary>((summary, task) => {
    const currentStatusCount = summary.countByStatus[task.status];

    return {
      totalCount: summary.totalCount + 1,
      totalPoint: summary.totalPoint + task.point,
      countByStatus: {
        ...summary.countByStatus,
        [task.status]: currentStatusCount + 1,
      },
    };
  }, initialSummary);
}

export function runReduceAccumulatorTypes(): void {
  console.log('このファイルでは、reduce の accumulator 型を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '設計する',
      status: 'todo',
      point: 3,
    },
    {
      id: 'task-002',
      title: '実装する',
      status: 'doing',
      point: 5,
    },
    {
      id: 'task-003',
      title: '確認する',
      status: 'done',
      point: 2,
    },
    {
      id: 'task-004',
      title: '修正する',
      status: 'doing',
      point: 4,
    },
  ];

  const summary = summarizeTasks(tasks);

  console.log('1. reduce<TaskSummary> で集計結果の型を明示する');
  console.log('summary:', summary);

  assert.deepEqual(summary, {
    totalCount: 4,
    totalPoint: 14,
    countByStatus: {
      todo: 1,
      doing: 2,
      done: 1,
    },
  });
}
