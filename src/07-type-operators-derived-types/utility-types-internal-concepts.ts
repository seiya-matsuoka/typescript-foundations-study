import assert from 'node:assert/strict';

type Book = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly published: boolean;
};

type MyPick<TValue, TKey extends keyof TValue> = {
  readonly [Key in TKey]: TValue[Key];
};

type MyPartial<TValue> = {
  readonly [Key in keyof TValue]?: TValue[Key];
};

type MyReadonly<TValue> = {
  readonly [Key in keyof TValue]: TValue[Key];
};

type BookCard = MyPick<Book, 'id' | 'title'>;
type BookPatch = MyPartial<Book>;
type ReadonlyBookCard = MyReadonly<BookCard>;

function toBookCard(book: Book): ReadonlyBookCard {
  // MyPick は、keyof / indexed access / mapped type を組み合わせた形である。
  // 実際の Utility Types の Pick も、基本的にはこのような発想で読める。
  //
  // Unit 07 の目的は、Utility Types を暗記することではなく、
  // 「この型は元の object type から key を選んで派生している」と読めるようになることである。
  return {
    id: book.id,
    title: book.title,
  };
}

function applyBookPatch(book: Book, patch: BookPatch): Book {
  // MyPartial<Book> は、Book の各プロパティを optional にした型である。
  // PATCH API やフォームの一部更新では、すべての項目を必ず送るとは限らない。
  // そのような「一部だけ更新する」データを表すときに Partial 的な型が使われる。
  return {
    ...book,
    ...patch,
  };
}

export function runUtilityTypesInternalConcepts(): void {
  console.log('このファイルでは、utility types の内部理解につながる考え方を確認する。');

  const book: Book = {
    id: 'book-001',
    title: 'TypeScript Foundations',
    price: 2800,
    published: false,
  };

  const card = toBookCard(book);
  const patchedBook = applyBookPatch(book, {
    price: 3000,
    published: true,
  });

  console.log('1. Pick 的な型で表示用の一部だけを取り出す');
  console.log('card:', card);

  console.log('');
  console.log('2. Partial 的な型で一部更新を表す');
  console.log('patchedBook:', patchedBook);

  assert.deepEqual(card, {
    id: 'book-001',
    title: 'TypeScript Foundations',
  });
  assert.deepEqual(patchedBook, {
    id: 'book-001',
    title: 'TypeScript Foundations',
    price: 3000,
    published: true,
  });
}
