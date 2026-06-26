import assert from 'node:assert/strict';

type Book = {
  readonly id: string;
  readonly title: string;
};

function findBookTitleUnsafe(books: readonly Book[], id: string): string {
  const foundBook = books.find((book) => book.id === id);

  // non-null assertion の ! は、null / undefined ではないと TypeScript に伝える。
  // ただし、実行時に値が存在することを確認しているわけではない。
  // ここでは呼び出し側が必ず存在する id を渡す前提の例として扱う。
  return foundBook!.title;
}

function findBookTitleSafe(books: readonly Book[], id: string): string {
  const foundBook = books.find((book) => book.id === id);

  // 通常は、! で押し切るよりも分岐で undefined を処理する方が安全である。
  // API 取得結果、検索結果、DOM 要素取得結果など、存在しない可能性がある値では特に重要になる。
  if (foundBook === undefined) {
    return 'not found';
  }

  return foundBook.title;
}

function readInputValue(target: EventTarget | null): string {
  // DOM のイベントでは、event.target が EventTarget | null のように広い型で表されることがある。
  // 実務の React では React.ChangeEvent<HTMLInputElement> のように型を付ける場面が多いが、
  // 生の DOM API や外部ライブラリでは、HTMLInputElement として型アサーションする例も見る。
  const input = target as HTMLInputElement | null;

  return input?.value ?? '';
}

export function runNonNullAndDomAssertion(): void {
  console.log('このファイルでは、non-null assertion と DOM 風の型アサーションを確認する。');

  const books: readonly Book[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
    },
  ];

  const unsafeTitle = findBookTitleUnsafe(books, 'book-001');
  const safeTitle = findBookTitleSafe(books, 'book-002');

  const fakeInput = {
    value: 'typescript',
  } as HTMLInputElement;

  const inputValue = readInputValue(fakeInput);

  console.log('1. non-null assertion は存在確認ではない');
  console.log('unsafeTitle:', unsafeTitle);
  console.log('safeTitle:', safeTitle);

  console.log('');
  console.log('2. DOM 風の値で型アサーションが出る場面を確認する');
  console.log('inputValue:', inputValue);

  assert.equal(unsafeTitle, 'TypeScript Foundations');
  assert.equal(safeTitle, 'not found');
  assert.equal(inputValue, 'typescript');
}
