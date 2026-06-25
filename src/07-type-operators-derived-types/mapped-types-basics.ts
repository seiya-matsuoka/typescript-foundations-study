import assert from 'node:assert/strict';

type FormValues = {
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
};

type FormErrors<TValues> = {
  readonly [Key in keyof TValues]?: string;
};

type FormTouched<TValues> = {
  readonly [Key in keyof TValues]: boolean;
};

function createEmptyErrors<TValues>(): FormErrors<TValues> {
  // mapped type は、keyof で取り出した key を順番に変換して新しい object type を作る。
  // FormErrors<FormValues> は title / description / dueDate を key に持ち、値は string になる。
  //
  // ここでは実行時には空オブジェクトを返している。
  // 型としては「FormValues と同じ key を持ちうるエラー object」として扱える。
  return {};
}

function createTouched<TValues extends Record<string, unknown>>(
  values: TValues,
): FormTouched<TValues> {
  const entries = Object.keys(values).map((key) => [key, false] as const);

  // Object.keys / Object.fromEntries は実行時の汎用関数であり、
  // TypeScript は「元の key と完全に対応している」ことまでは推論しきれない。
  // そのため、mapped type で表した FormTouched<TValues> として扱っている。
  return Object.fromEntries(entries) as FormTouched<TValues>;
}

export function runMappedTypesBasics(): void {
  console.log('このファイルでは、mapped types の基本を確認する。');

  const values: FormValues = {
    title: 'TypeScript を読む',
    description: 'mapped type の入口を確認する',
    dueDate: '2026-06-30',
  };

  const errors = createEmptyErrors<FormValues>();
  const touched = createTouched(values);

  console.log('1. FormValues の key から FormErrors を作る');
  console.log('errors:', errors);

  console.log('');
  console.log('2. FormValues と同じ key を持つ touched object を作る');
  console.log('touched:', touched);

  assert.deepEqual(errors, {});
  assert.deepEqual(touched, {
    title: false,
    description: false,
    dueDate: false,
  });
}
