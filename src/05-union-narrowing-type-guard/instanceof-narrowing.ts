import assert from 'node:assert/strict';

class ValidationError extends Error {
  constructor(
    readonly field: string,
    message: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

type AppError = ValidationError | NetworkError | Error;
type DateInput = string | Date;

function formatDateInput(input: DateInput): string {
  // instanceof による narrowing は、class から作られたインスタンスかどうかで型を絞る。
  // input instanceof Date の中では、input は Date として扱える。
  // Date や Error など、実行時に class / constructor が存在する値に対して使いやすい。
  const date = input instanceof Date ? input : new Date(input);

  return date.toISOString().slice(0, 10);
}

function formatAppError(error: AppError): string {
  // instanceof は Error の種類を分けるときにも使える。
  // ValidationError の分岐では field を読めるようになり、
  // NetworkError の分岐では statusCode を読めるようになる。
  if (error instanceof ValidationError) {
    return `validation:${error.field}:${error.message}`;
  }

  if (error instanceof NetworkError) {
    return `network:${error.statusCode}:${error.message}`;
  }

  return `error:${error.message}`;
}

export function runInstanceofNarrowing(): void {
  console.log('このファイルでは、instanceof による narrowing を確認する。');

  const formattedDateObject = formatDateInput(new Date('2026-06-09T00:00:00.000Z'));
  const formattedDateString = formatDateInput('2026-06-10T00:00:00.000Z');

  console.log('1. Date に対する instanceof narrowing');
  console.log('formattedDateObject:', formattedDateObject);
  console.log('formattedDateString:', formattedDateString);

  const validationError = new ValidationError('email', 'メールアドレスを確認してください');
  const networkError = new NetworkError(503, 'Service Unavailable');
  const plainError = new Error('unknown error');

  const formattedValidationError = formatAppError(validationError);
  const formattedNetworkError = formatAppError(networkError);
  const formattedPlainError = formatAppError(plainError);

  console.log('');
  console.log('2. Error class に対する instanceof narrowing');
  console.log('formattedValidationError:', formattedValidationError);
  console.log('formattedNetworkError:', formattedNetworkError);
  console.log('formattedPlainError:', formattedPlainError);

  assert.equal(formattedDateObject, '2026-06-09');
  assert.equal(formattedDateString, '2026-06-10');
  assert.equal(formattedValidationError, 'validation:email:メールアドレスを確認してください');
  assert.equal(formattedNetworkError, 'network:503:Service Unavailable');
  assert.equal(formattedPlainError, 'error:unknown error');
}
