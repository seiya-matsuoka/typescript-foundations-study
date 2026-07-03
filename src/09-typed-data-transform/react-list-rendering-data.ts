import assert from 'node:assert/strict';

type TaskStatus = 'todo' | 'doing' | 'done';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus;
  readonly assigneeName: string | null;
};

type TaskListItemProps = {
  readonly key: string;
  readonly title: string;
  readonly statusLabel: string;
  readonly assigneeLabel: string;
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
};

function toTaskListItemProps(task: Task): TaskListItemProps {
  // React の list rendering では、配列の各要素に key が必要になる。
  // 実際の React コンポーネントでは key は props として直接渡さないことも多いが、
  // ここでは表示用データとして key を含め、一覧表示に必要な形へ変換している。
  //
  // statusLabel は Record<TaskStatus, string> から取り出す。
  // TaskStatus が union 型なので、STATUS_LABELS[task.status] は string として安全に扱える。
  return {
    key: task.id,
    title: task.title,
    statusLabel: STATUS_LABELS[task.status],
    assigneeLabel: task.assigneeName ?? '未割り当て',
  };
}

function updateTaskStatus(
  tasks: readonly Task[],
  targetId: string,
  nextStatus: TaskStatus,
): readonly Task[] {
  // React の state 更新では、元配列や元オブジェクトを直接変更せず、新しい配列・オブジェクトを返す。
  // map を使うと、対象の要素だけを差し替え、それ以外はそのまま返す処理を書きやすい。
  return tasks.map((task) => {
    if (task.id !== targetId) {
      return task;
    }

    return {
      ...task,
      status: nextStatus,
    };
  });
}

export function runReactListRenderingData(): void {
  console.log('このファイルでは、React の list rendering に渡すデータ型を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '設計する',
      status: 'todo',
      assigneeName: 'Sato',
    },
    {
      id: 'task-002',
      title: '実装する',
      status: 'doing',
      assigneeName: null,
    },
  ];

  const updatedTasks = updateTaskStatus(tasks, 'task-001', 'done');
  const listItems = updatedTasks.map((task) => toTaskListItemProps(task));

  console.log('1. map で state 更新に近い配列変換を行う');
  console.log('updatedTasks:', updatedTasks);

  console.log('');
  console.log('2. React の list rendering に渡しやすい表示用データを作る');
  console.log('listItems:', listItems);

  assert.deepEqual(
    updatedTasks.map((task) => ({
      id: task.id,
      status: task.status,
    })),
    [
      {
        id: 'task-001',
        status: 'done',
      },
      {
        id: 'task-002',
        status: 'doing',
      },
    ],
  );
  assert.deepEqual(listItems, [
    {
      key: 'task-001',
      title: '設計する',
      statusLabel: '完了',
      assigneeLabel: 'Sato',
    },
    {
      key: 'task-002',
      title: '実装する',
      statusLabel: '進行中',
      assigneeLabel: '未割り当て',
    },
  ]);
}
