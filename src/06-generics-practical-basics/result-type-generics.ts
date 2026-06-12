import assert from 'node:assert/strict';

type Success<TData> = {
  readonly ok: true;
  readonly data: TData;
};

type Failure<TError> = {
  readonly ok: false;
  readonly error: TError;
};

type Result<TData, TError = string> = Success<TData> | Failure<TError>;

type ValidationError = {
  readonly field: string;
  readonly message: string;
};

function success<TData>(data: TData): Result<TData> {
  // Result<TData, TError> は、成功時の data と失敗時の error の型を呼び出し側で決められる。
  // 成功側だけを作る helper では TData が引数 data から推論される。
  //
  // Unit 05 で扱った discriminated union に、Unit 06 の generics を組み合わせている。
  // ok: true のときに存在する data の型を、処理ごとに変えられる点が重要である。
  return {
    ok: true,
    data,
  };
}

function failure<TError>(error: TError): Result<never, TError> {
  // 失敗側では成功データが存在しないため、TData に never を使っている。
  // Unit 05 の discriminated union と同じく、ok で分岐すると data / error を安全に扱える。
  //
  // never は「その値が存在しない」ことを表すために使っている。
  // ここでは高度な型テクニックではなく、失敗結果には成功データがないという意図を型で表している。
  return {
    ok: false,
    error,
  };
}

function formatResult<TData, TError>(
  result: Result<TData, TError>,
  formatData: (data: TData) => string,
  formatError: (error: TError) => string,
): string {
  if (result.ok) {
    return formatData(result.data);
  }

  return formatError(result.error);
}

export function runResultTypeGenerics(): void {
  console.log('このファイルでは、Result 型での generics を確認する。');

  const savedResult = success({
    id: 'task-001',
    title: 'generics を確認する',
  });

  const validationResult = failure<ValidationError>({
    field: 'title',
    message: 'タイトルを入力してください',
  });

  const savedMessage = formatResult(
    savedResult,
    (task) => `saved:${task.id}`,
    (error) => `error:${error}`,
  );

  const validationMessage = formatResult(
    validationResult,
    (value) => `saved:${value}`,
    (error) => `${error.field}:${error.message}`,
  );

  console.log('1. 成功側の data 型を保つ');
  console.log('savedResult:', savedResult);
  console.log('savedMessage:', savedMessage);

  console.log('');
  console.log('2. 失敗側の error 型を保つ');
  console.log('validationResult:', validationResult);
  console.log('validationMessage:', validationMessage);

  assert.deepEqual(savedResult, {
    ok: true,
    data: {
      id: 'task-001',
      title: 'generics を確認する',
    },
  });
  assert.deepEqual(validationResult, {
    ok: false,
    error: {
      field: 'title',
      message: 'タイトルを入力してください',
    },
  });
  assert.equal(savedMessage, 'saved:task-001');
  assert.equal(validationMessage, 'title:タイトルを入力してください');
}
