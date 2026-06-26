import assert from 'node:assert/strict';

type Book = {
  readonly id: string;
  readonly title: string;
};

function buildSearchQuery(keyword: string, page: number, includeArchived = false): string {
  const encodedKeyword = encodeURIComponent(keyword);
  const archivedQuery = includeArchived ? '&archived=true' : '';

  return `/books?keyword=${encodedKeyword}&page=${page}${archivedQuery}`;
}

async function fetchBook(id: string): Promise<Book> {
  // Unit 08 では実際の HTTP 通信は行わず、Promise を返す関数の戻り値型から Awaited<T> を確認する。
  // 実務では fetch / axios / repository 関数の戻り値からデータ型を取り出す場面で似た考え方を使う。
  return {
    id,
    title: 'TypeScript Foundations',
  };
}

type SearchQueryArgs = Parameters<typeof buildSearchQuery>;
type SearchQuery = ReturnType<typeof buildSearchQuery>;
type FetchedBook = Awaited<ReturnType<typeof fetchBook>>;

function buildQueryFromArgs(args: SearchQueryArgs): SearchQuery {
  // Parameters<T> は関数型 T の引数型を tuple として取り出す。
  // ReturnType<T> は関数型 T の戻り値型を取り出す。
  // 既存関数と wrapper 関数の引数・戻り値を揃えたいときに使いやすい。
  return buildSearchQuery(...args);
}

export async function runParametersReturnTypeAwaited(): Promise<void> {
  console.log('このファイルでは、Parameters / ReturnType / Awaited を確認する。');

  const args: SearchQueryArgs = ['typescript', 1, true];
  const query = buildQueryFromArgs(args);
  const fetchedBook: FetchedBook = await fetchBook('book-001');

  console.log('1. Parameters<T> で関数の引数型を取り出す');
  console.log('args:', args);

  console.log('');
  console.log('2. ReturnType<T> で戻り値型を取り出す');
  console.log('query:', query);

  console.log('');
  console.log('3. Awaited<T> で Promise の中身の型を取り出す');
  console.log('fetchedBook:', fetchedBook);

  assert.deepEqual(args, ['typescript', 1, true]);
  assert.equal(query, '/books?keyword=typescript&page=1&archived=true');
  assert.deepEqual(fetchedBook, {
    id: 'book-001',
    title: 'TypeScript Foundations',
  });
}
