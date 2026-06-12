import assert from 'node:assert/strict';

function uniqueBy<TItem, TKey extends string | number>(
  items: readonly TItem[],
  getKey: (item: TItem) => TKey,
): readonly TItem[] {
  const seenKeys = new Set<TKey>();
  const results: TItem[] = [];

  for (const item of items) {
    const key = getKey(item);

    if (seenKeys.has(key)) {
      continue;
    }

    seenKeys.add(key);
    results.push(item);
  }

  // TItem は入力配列の要素型から決まる。
  // getKey の引数 item も TItem になるため、呼び出し側では item.id や item.email などを安全に読める。
  //
  // uniqueBy 自体は Task 専用ではない。
  // それでも tasks を渡した呼び出しでは TItem が Task として推論されるため、
  // callback 内の task も Task として補完・型チェックされる。
  return results;
}

function groupBy<TItem, TKey extends string>(
  items: readonly TItem[],
  getKey: (item: TItem) => TKey,
): Record<TKey, TItem[]> {
  const groups = {} as Record<TKey, TItem[]>;

  for (const item of items) {
    const key = getKey(item);
    const currentGroup = groups[key] ?? [];
    groups[key] = [...currentGroup, item];
  }

  // groupBy は配列要素型 TItem と、グループキー TKey の両方を型引数として扱う。
  // 実務では一覧データをカテゴリ別、ステータス別、日付別にまとめる処理で似た形を見る。
  //
  // TKey を string に制約しているのは、Record<TKey, TItem[]> のキーとして使うためである。
  // Unit 05 の literal union と組み合わせると、'todo' | 'done' のようなキーを保ったまま扱える。
  return groups;
}

type Task = {
  readonly id: string;
  readonly title: string;
  readonly status: 'todo' | 'done';
};

export function runArrayProcessingGenerics(): void {
  console.log('このファイルでは、配列処理での generics を確認する。');

  const tasks: readonly Task[] = [
    {
      id: 'task-001',
      title: '設計する',
      status: 'todo',
    },
    {
      id: 'task-001',
      title: '設計する',
      status: 'todo',
    },
    {
      id: 'task-002',
      title: '実装する',
      status: 'done',
    },
  ];

  const uniqueTasks = uniqueBy(tasks, (task) => task.id);
  const groupedTasks = groupBy(tasks, (task) => task.status);

  console.log('1. uniqueBy<TItem, TKey> で重複を取り除く');
  console.log('uniqueTasks:', uniqueTasks);

  console.log('');
  console.log('2. groupBy<TItem, TKey> でステータス別にまとめる');
  console.log('groupedTasks:', groupedTasks);

  assert.deepEqual(uniqueTasks, [
    {
      id: 'task-001',
      title: '設計する',
      status: 'todo',
    },
    {
      id: 'task-002',
      title: '実装する',
      status: 'done',
    },
  ]);
  assert.deepEqual(groupedTasks, {
    todo: [
      {
        id: 'task-001',
        title: '設計する',
        status: 'todo',
      },
      {
        id: 'task-001',
        title: '設計する',
        status: 'todo',
      },
    ],
    done: [
      {
        id: 'task-002',
        title: '実装する',
        status: 'done',
      },
    ],
  });
}
