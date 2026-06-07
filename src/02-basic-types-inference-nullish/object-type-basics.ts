import assert from 'node:assert/strict';

type BookSummary = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
};

function formatBook(book: BookSummary): string {
  return `${book.title} / ${book.price}円`;
}

export function runObjectTypeBasics(): void {
  console.log('[object-type-basics.ts]');
  console.log('object 型と具体的なオブジェクト型の違いを確認する');
  console.log('');

  const rawObject: object = {
    id: 'b001',
    title: 'TypeScript Foundations',
  };

  // object 型は「プリミティブではない値」を表す広い型である。
  // そのため、id や title というプロパティを持つことまでは TypeScript が把握できない。
  console.log('1. object 型は広い型');
  console.log('rawObject keys:', Object.keys(rawObject).join(', '));
  console.log('');

  const book: BookSummary = {
    id: 'b001',
    title: 'TypeScript Foundations',
    price: 2800,
  };

  // 実務では、object 型よりも具体的なプロパティを持つ型を定義することが多い。
  // BookSummary のような型にすると、どのプロパティを使えるかがコードから読み取れる。
  const formattedBook = formatBook(book);

  console.log('2. 具体的なオブジェクト型');
  console.log('book:', book);
  console.log('formattedBook:', formattedBook);
  console.log('');

  const bookTable: Record<string, BookSummary> = {
    [book.id]: book,
  };

  // Record<K, V> は Unit 08 で詳しく扱うが、ここでは「キーと値の型を持つオブジェクト」の入口として使う。
  // オブジェクトを辞書のように扱う場合、値の型を明確にできる。
  console.log('3. Record の入口');
  console.log('bookTable keys:', Object.keys(bookTable).join(', '));

  assert.deepEqual(Object.keys(rawObject), ['id', 'title']);
  assert.equal(formattedBook, 'TypeScript Foundations / 2800円');
  assert.deepEqual(bookTable.b001, book);
}
