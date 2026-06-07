import assert from 'node:assert/strict';

type BookSummary = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly inStock: boolean;
};

function formatBookSummary(book: BookSummary): string {
  // BookSummary は「この関数が必要としているオブジェクトの形」を表す。
  // Java の class のように、実行時に new して作る設計図ではない。
  // TypeScript の type はコンパイル時にだけ使われ、JavaScript 実行時には残らない。
  //
  // ここでは book.title / book.price / book.inStock に安全にアクセスできる。
  // それは BookSummary が、それらのプロパティを持つことを TypeScript が把握しているためである。
  return `${book.title} / ${book.price}円 / ${book.inStock ? '在庫あり' : '在庫なし'}`;
}

function describeObject(value: object): string {
  // object 型は「プリミティブではない値」を表す広い型である。
  // { id: string } のような具体的なプロパティ情報は持たない。
  //
  // JavaScript の object として扱えることは分かるが、value.id のようなアクセスはできない。
  // データの中身を使いたい場合は、BookSummary のような具体的な object type を定義する。
  return JSON.stringify(value);
}

export function runObjectTypeBasics(): void {
  console.log('このファイルでは、object type と具体的なプロパティを持つ型を確認する。');

  const book: BookSummary = {
    id: 'book-001',
    title: 'TypeScript Foundations',
    price: 2800,
    inStock: true,
  };

  // book は object literal だが、BookSummary 型として必要なプロパティをすべて持っている。
  // そのため、formatBookSummary に渡すことができる。
  const formattedBook = formatBookSummary(book);

  // 同じ book を広い object 型として扱うこともできる。
  // ただし describeObject の中では、BookSummary 固有のプロパティ情報は使えない。
  const describedBook = describeObject(book);

  console.log('1. 具体的なプロパティを持つオブジェクト型');
  console.log('book:', book);
  console.log('formattedBook:', formattedBook);

  console.log('');
  console.log('2. 広い object 型');
  console.log('describedBook:', describedBook);

  // object 型は広い型なので、配列や関数も object として渡せる。
  // これは「object 型 = アプリケーション上のデータ型」とは限らないことを示す。
  // 具体的な業務データを表す型として object だけを使うと、型情報が不足しやすい。
  const describedArray = describeObject(['typescript', 'react']);
  const describedFunction = describeObject(() => 'hello');

  console.log('describedArray:', describedArray);
  console.log('describedFunction:', describedFunction);

  assert.equal(formattedBook, 'TypeScript Foundations / 2800円 / 在庫あり');
  assert.equal(
    describedBook,
    '{"id":"book-001","title":"TypeScript Foundations","price":2800,"inStock":true}',
  );
  assert.equal(describedArray, '["typescript","react"]');
  assert.equal(describedFunction, undefined);
}
