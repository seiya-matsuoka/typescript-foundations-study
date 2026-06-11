import assert from 'node:assert/strict';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};

interface Reader<TValue> {
  read(): TValue;
}

interface Writer<TValue> {
  write(value: TValue): TValue;
}

interface Store<TValue> extends Reader<TValue>, Writer<TValue> {
  readonly name: string;
}

function createMemoryStore<TValue>(name: string, initialValue: TValue): Store<TValue> {
  let currentValue = initialValue;

  // generic interface は、実装する値やオブジェクトが扱うデータ型を外側から決めたいときに使う。
  // Store<Task> なら read / write は Task を扱い、Store<string> なら string を扱う。
  //
  // interface 自体は「read と write を持つ」という外側の形を決める。
  // TValue は、その interface を具体的に使うときに「何を読み書きする Store なのか」を決める。
  // Java の interface と似た読み方もできるが、TypeScript では構造が合えば実装として扱える点も意識する。
  return {
    name,
    read() {
      return currentValue;
    },
    write(value) {
      currentValue = value;
      return currentValue;
    },
  };
}

export function runGenericInterfaceBasics(): void {
  console.log('このファイルでは、generic interface を確認する。');

  const taskStore = createMemoryStore<Task>('task-store', {
    id: 'task-001',
    title: 'generics を読む',
    completed: false,
  });

  const initialTask = taskStore.read();
  const updatedTask = taskStore.write({
    ...initialTask,
    completed: true,
  });

  const messageStore = createMemoryStore('message-store', '未保存');
  const updatedMessage = messageStore.write('保存済み');

  console.log('1. Store<Task> として扱う');
  console.log('initialTask:', initialTask);
  console.log('updatedTask:', updatedTask);

  console.log('');
  console.log('2. 同じ Store<TValue> を string でも使う');
  console.log('updatedMessage:', updatedMessage);

  assert.deepEqual(initialTask, {
    id: 'task-001',
    title: 'generics を読む',
    completed: false,
  });
  assert.deepEqual(updatedTask, {
    id: 'task-001',
    title: 'generics を読む',
    completed: true,
  });
  assert.equal(updatedMessage, '保存済み');
}
