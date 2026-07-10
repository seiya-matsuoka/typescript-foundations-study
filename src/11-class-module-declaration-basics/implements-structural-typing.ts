import assert from 'node:assert/strict';

interface Formatter<TValue> {
  format(value: TValue): string;
}

type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};

class TaskFormatter implements Formatter<Task> {
  format(task: Task): string {
    // implements は、class が Formatter<Task> の形を満たすかを型チェックする。
    // Java の interface 実装に似た見た目だが、TypeScript の interface は実行時には残らない。
    // 実行時の継承関係を作るのではなく、必要な method の構造を確認している。
    return `${task.completed ? 'done' : 'todo'}:${task.title}`;
  }
}

class TextFormatter {
  format(value: string): string {
    // この class は Formatter<string> を明示的に implements していない。
    // それでも format(value: string): string を持つため、構造が一致すれば Formatter<string> として扱える。
    return value.trim().toUpperCase();
  }
}

function formatWith<TValue>(formatter: Formatter<TValue>, value: TValue): string {
  // TypeScript は structural typing が基本である。
  // class instance でも object literal でも、Formatter<TValue> と同じ構造を持てば渡せる。
  // Java のように、必ず明示的な implements 関係が必要というわけではない。
  return formatter.format(value);
}

export function runImplementsStructuralTyping(): void {
  console.log('このファイルでは、implements・interface・structural typing を確認する。');

  const taskLabel = formatWith(new TaskFormatter(), {
    id: 'task-001',
    title: 'implements を確認する',
    completed: false,
  });

  const textLabel = formatWith(new TextFormatter(), '  typescript  ');

  const pointFormatter: Formatter<number> = {
    format(value) {
      return `${value}pt`;
    },
  };
  const pointLabel = formatWith(pointFormatter, 80);

  console.log('1. class が interface を implements する');
  console.log('taskLabel:', taskLabel);

  console.log('');
  console.log('2. 明示的な implements がなくても構造が一致すれば扱える');
  console.log('textLabel:', textLabel);
  console.log('pointLabel:', pointLabel);

  assert.equal(taskLabel, 'todo:implements を確認する');
  assert.equal(textLabel, 'TYPESCRIPT');
  assert.equal(pointLabel, '80pt');
}
