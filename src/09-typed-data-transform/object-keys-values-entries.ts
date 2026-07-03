import assert from 'node:assert/strict';

type FormValues = {
  readonly title: string;
  readonly priority: 'low' | 'middle' | 'high';
  readonly published: boolean;
};

function formatFormValue(value: FormValues[keyof FormValues]): string {
  // FormValues[keyof FormValues] は、FormValues のすべてのプロパティ値の union 型になる。
  // ここでは string | boolean のような値を String(...) で表示用文字列にしている。
  return String(value);
}

export function runObjectKeysValuesEntries(): void {
  console.log('このファイルでは、Object.keys / values / entries の型を確認する。');

  const formValues: FormValues = {
    title: 'TypeScript Foundations',
    priority: 'high',
    published: true,
  };

  const rawKeys = Object.keys(formValues);
  const formKeys = Object.keys(formValues) as Array<keyof FormValues>;

  // Object.keys の戻り値は string[] である。
  // TypeScript は、実行時にオブジェクトへ余分なプロパティが混ざる可能性まで考えるため、
  // 自動で Array<keyof FormValues> にはしてくれない。
  //
  // ここでは formValues の形を自分たちが管理している前提で、Array<keyof FormValues> として扱っている。
  // 型アサーションを使う箇所は、なぜ安全と考えるのかをコメントで残すと読みやすい。
  const labels = formKeys.map((key) => `${key}: ${formatFormValue(formValues[key])}`);

  const values = Object.values(formValues);
  const entries = Object.entries(formValues);

  console.log('1. Object.keys はまず string[] として返る');
  console.log('rawKeys:', rawKeys);

  console.log('');
  console.log('2. keyof と組み合わせて安全にプロパティ値を読む');
  console.log('labels:', labels);

  console.log('');
  console.log('3. Object.values / Object.entries の実行時の形を確認する');
  console.log('values:', values);
  console.log('entries:', entries);

  assert.deepEqual(rawKeys, ['title', 'priority', 'published']);
  assert.deepEqual(labels, ['title: TypeScript Foundations', 'priority: high', 'published: true']);
  assert.deepEqual(values, ['TypeScript Foundations', 'high', true]);
  assert.deepEqual(entries, [
    ['title', 'TypeScript Foundations'],
    ['priority', 'high'],
    ['published', true],
  ]);
}
