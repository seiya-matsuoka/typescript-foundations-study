import assert from 'node:assert/strict';

type Box<T> = {
  readonly value: T;
};

type ListResponse<TItem> = {
  readonly items: readonly TItem[];
  readonly totalCount: number;
};

type Page<TItem> = {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly response: ListResponse<TItem>;
};

type BookSummary = {
  readonly id: string;
  readonly title: string;
};

function createBox<T>(value: T): Box<T> {
  // generic type alias は、外側の形は同じで中身だけ変えたいときに使う。
  // Box<string> なら value は string、Box<BookSummary> なら value は BookSummary になる。
  //
  // Unit 03 では用途ごとに type alias で名前を付けた。
  // Unit 06 ではさらに一歩進めて、「名前を付けた型の一部を型引数で差し替える」読み方をする。
  return {
    value,
  };
}

function createPage<TItem>(
  items: readonly TItem[],
  totalCount: number,
  currentPage: number,
  pageSize: number,
): Page<TItem> {
  // ListResponse<TItem> や Page<TItem> のように、TItem を複数の型で共有できる。
  // 一覧 API のレスポンスやページング結果では、このような形をよく見る。
  //
  // TItem は items の要素型として使われるだけでなく、
  // Page 全体が「何の一覧ページなのか」を表す情報にもなる。
  // BookSummary のページなら Page<BookSummary>、UserSummary のページなら Page<UserSummary> になる。
  return {
    currentPage,
    pageSize,
    response: {
      items,
      totalCount,
    },
  };
}

export function runGenericTypeAliasBasics(): void {
  console.log('このファイルでは、generic type alias を確認する。');

  const messageBox = createBox('保存しました');

  const books: readonly BookSummary[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
    },
    {
      id: 'book-002',
      title: 'React Basics',
    },
  ];

  const bookPage = createPage(books, 2, 1, 10);

  console.log('1. Box<T> で中身の型を保つ');
  console.log('messageBox:', messageBox);

  console.log('');
  console.log('2. Page<TItem> で一覧レスポンスの形を共通化する');
  console.log('bookPage:', bookPage);

  assert.deepEqual(messageBox, { value: '保存しました' });
  assert.deepEqual(bookPage, {
    currentPage: 1,
    pageSize: 10,
    response: {
      items: books,
      totalCount: 2,
    },
  });
}
