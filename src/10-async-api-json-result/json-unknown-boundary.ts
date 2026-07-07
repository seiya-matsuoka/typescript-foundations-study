import assert from 'node:assert/strict';

type BookDto = {
  readonly id: string;
  readonly title: string;
  readonly publishedYear: number;
};

function parseJson(jsonText: string): unknown {
  // JSON.parse の戻り値をいきなり BookDto として扱うのは危険である。
  // TypeScript の型は実行時 validation ではないため、外部入力はまず unknown として受ける。
  // unknown は「型が分からない値」なので、プロパティを読むには narrowing が必要になる。
  return JSON.parse(jsonText) as unknown;
}

function isBookDto(value: unknown): value is BookDto {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'id' in value &&
    'title' in value &&
    'publishedYear' in value &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.publishedYear === 'number'
  );
}

function parseBookDto(jsonText: string): BookDto | undefined {
  const parsed = parseJson(jsonText);

  if (!isBookDto(parsed)) {
    return undefined;
  }

  // isBookDto が true の分岐では parsed が BookDto に narrowing される。
  // ここで初めて、id / title / publishedYear を安全に持つ値として扱える。
  return parsed;
}

export function runJsonUnknownBoundary(): void {
  console.log('このファイルでは、JSON.parse と unknown 境界を確認する。');

  const validJson = JSON.stringify({
    id: 'book-001',
    title: 'TypeScript Foundations',
    publishedYear: 2026,
  });

  const invalidJson = JSON.stringify({
    id: 'book-002',
    title: 'Invalid Book',
    publishedYear: '2026',
  });

  const validBook = parseBookDto(validJson);
  const invalidBook = parseBookDto(invalidJson);

  console.log('1. JSON.parse の戻り値を unknown として受ける');
  console.log('validBook:', validBook);

  console.log('');
  console.log('2. 形式が違う JSON は BookDto として扱わない');
  console.log('invalidBook:', invalidBook);

  assert.deepEqual(validBook, {
    id: 'book-001',
    title: 'TypeScript Foundations',
    publishedYear: 2026,
  });
  assert.equal(invalidBook, undefined);
}
