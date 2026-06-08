import assert from 'node:assert/strict';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly description?: string;
};

type EditableTaskInput = {
  readonly title: string;
  readonly description?: string;
};

function formatTask(task: Task): string {
  // optional property は「そのプロパティが存在しない可能性」を型で表す。
  // description?: string は、description を省略できるという意味である。
  // Unit 02 の undefined の話とつながっており、読み出すと string | undefined として扱う必要がある。
  //
  // ?? を使うと、undefined の場合だけデフォルト値を使える。
  // フォームの任意入力や、React の optional props でも同じ考え方が出てくる。
  const description = task.description ?? '説明なし';

  return `${task.completed ? '[x]' : '[ ]'} ${task.title} - ${description}`;
}

function createTask(input: EditableTaskInput): Task {
  // readonly property は、作成後に外側から書き換えない値を表すときに使う。
  // React の props や API から取得した値のように、受け取った側で直接変更しないデータに向いている。
  //
  // exactOptionalPropertyTypes が有効な環境では、
  // description?: string は「description プロパティを省略できる」という意味になる。
  // description: undefined を明示的に入れるのではなく、
  // 値がない場合は description プロパティ自体を作らない形にする。
  const baseTask = {
    id: 'task-001',
    title: input.title,
    completed: false,
  };

  if (input.description === undefined) {
    return baseTask;
  }

  return {
    ...baseTask,
    description: input.description,
  };
}

export function runOptionalReadonlyProperties(): void {
  console.log('このファイルでは、optional property と readonly property を確認する。');

  const taskWithoutDescription: Task = {
    id: 'task-001',
    title: 'Unit 03 を読む',
    completed: false,
  };

  const taskWithDescription = createTask({
    title: 'コメントの意味を確認する',
    description: 'optional property と undefined の違いも確認する',
  });

  // taskWithoutDescription は description を持たない。
  // taskWithDescription は createTask の中で description がある場合だけプロパティを追加している。
  // どちらも Task 型として扱えるが、読み出す側は description がない可能性を考慮する必要がある。
  const formattedWithoutDescription = formatTask(taskWithoutDescription);
  const formattedWithDescription = formatTask(taskWithDescription);

  console.log('1. optional property を省略した値');
  console.log('formattedWithoutDescription:', formattedWithoutDescription);

  console.log('');
  console.log('2. optional property に値がある場合');
  console.log('formattedWithDescription:', formattedWithDescription);

  console.log('');
  console.log('3. readonly property は意図しない代入を防ぐ');
  console.log('task id:', taskWithDescription.id);

  assert.equal(formattedWithoutDescription, '[ ] Unit 03 を読む - 説明なし');
  assert.equal(
    formattedWithDescription,
    '[ ] コメントの意味を確認する - optional property と undefined の違いも確認する',
  );
  assert.equal(taskWithDescription.id, 'task-001');
}

export function optionalReadonlyTypeErrorExamples(): void {
  const task: Task = {
    id: 'task-002',
    title: '型エラー例',
    completed: false,
  };

  // readonly property は再代入できない。
  // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
  // 実行時に object が自動で凍結されるわけではないが、TypeScript の型チェック上は再代入を防げる。
  // @ts-expect-error: readonly property の id は書き換えられないことを確認する。
  task.id = 'task-003';

  // exactOptionalPropertyTypes が有効な環境では、
  // description?: string は「省略できる」を表し、undefined を明示代入する型とは区別される。
  // @ts-expect-error: description?: string に undefined を明示代入できないことを確認する。
  const invalidInput: EditableTaskInput = {
    title: 'invalid optional',
    description: undefined,
  };

  void task;
  void invalidInput;
}
