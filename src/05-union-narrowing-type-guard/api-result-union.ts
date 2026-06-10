import assert from 'node:assert/strict';

type ApiError = {
  readonly code: string;
  readonly message: string;
};

type ApiResult<TData> =
  | {
      readonly ok: true;
      readonly data: TData;
    }
  | {
      readonly ok: false;
      readonly error: ApiError;
    };

type BookDto = {
  readonly id: string;
  readonly title: string;
};

function formatBookResult(result: ApiResult<BookDto>): string {
  // ok: true / ok: false を判別用プロパティにすると、成功時と失敗時を1つの型で表せる。
  // result.ok が true の分岐では data が読める。
  // result.ok が false の分岐では error が読める。
  if (result.ok) {
    return `book:${result.data.id}:${result.data.title}`;
  }

  return `error:${result.error.code}:${result.error.message}`;
}

export function runApiResultUnion(): void {
  console.log('このファイルでは、API レスポンスの成功 / 失敗表現を確認する。');

  const successResult: ApiResult<BookDto> = {
    ok: true,
    data: {
      id: 'book-001',
      title: 'TypeScript Foundations',
    },
  };

  const failureResult: ApiResult<BookDto> = {
    ok: false,
    error: {
      code: 'NOT_FOUND',
      message: '書籍が見つかりません',
    },
  };

  const successText = formatBookResult(successResult);
  const failureText = formatBookResult(failureResult);

  console.log('1. ok: true の成功レスポンス');
  console.log('successText:', successText);

  console.log('');
  console.log('2. ok: false の失敗レスポンス');
  console.log('failureText:', failureText);

  assert.equal(successText, 'book:book-001:TypeScript Foundations');
  assert.equal(failureText, 'error:NOT_FOUND:書籍が見つかりません');
}
