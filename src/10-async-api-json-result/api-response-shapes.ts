import assert from 'node:assert/strict';

type SuccessResponse<TData> = {
  readonly ok: true;
  readonly status: 200;
  readonly data: TData;
};

type ErrorResponse = {
  readonly ok: false;
  readonly status: 400 | 404 | 500;
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
};

type ApiResponse<TData> = SuccessResponse<TData> | ErrorResponse;

type TaskDto = {
  readonly id: string;
  readonly title: string;
};

function createSuccessResponse<TData>(data: TData): ApiResponse<TData> {
  // 成功レスポンスは data の型だけが API ごとに変わり、外側の形は共通になる。
  // Unit 06 の generics と Unit 05 の discriminated union を組み合わせた形である。
  return { ok: true, status: 200, data };
}

function createErrorResponse(
  status: ErrorResponse['status'],
  code: string,
  message: string,
): ErrorResponse {
  return {
    ok: false,
    status,
    error: { code, message },
  };
}

function formatTaskResponse(response: ApiResponse<TaskDto>): string {
  if (response.ok) {
    // ok: true によって SuccessResponse<TaskDto> へ narrowing される。
    // この分岐では response.data を安全に読める。
    // API response をこの形にしておくと、呼び出し側は HTTP status の数値だけでなく、型で成功/失敗を分岐できる。
    return `task:${response.data.title}`;
  }

  return `error:${response.error.message}`;
}

export function runApiResponseShapes(): void {
  console.log('このファイルでは、API response 型を確認する。');

  const successResponse = createSuccessResponse<TaskDto>({
    id: 'task-001',
    title: 'API 型を整理する',
  });
  const errorResponse = createErrorResponse(404, 'NOT_FOUND', 'タスクが見つかりません');
  const successMessage = formatTaskResponse(successResponse);
  const errorMessage = formatTaskResponse(errorResponse);

  console.log('1. 成功レスポンス');
  console.log('successResponse:', successResponse);
  console.log('successMessage:', successMessage);

  console.log('');
  console.log('2. 失敗レスポンス');
  console.log('errorResponse:', errorResponse);
  console.log('errorMessage:', errorMessage);

  assert.deepEqual(successResponse, {
    ok: true,
    status: 200,
    data: { id: 'task-001', title: 'API 型を整理する' },
  });
  assert.deepEqual(errorResponse, {
    ok: false,
    status: 404,
    error: { code: 'NOT_FOUND', message: 'タスクが見つかりません' },
  });
  assert.equal(successMessage, 'task:API 型を整理する');
  assert.equal(errorMessage, 'error:タスクが見つかりません');
}
