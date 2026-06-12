import assert from 'node:assert/strict';

type Mapper<TInput, TOutput> = (input: TInput) => TOutput;
type Selector<TObject, TResult> = (object: TObject) => TResult;

type Book = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
};

type BookCard = {
  readonly title: string;
  readonly priceLabel: string;
};

function mapItems<TInput, TOutput>(
  items: readonly TInput[],
  mapper: Mapper<TInput, TOutput>,
): readonly TOutput[] {
  // TInput は入力配列の要素型、TOutput は mapper の戻り値型から決まる。
  // mapper 関数の型を alias にしておくと、関数の役割が読みやすくなる。
  //
  // Book を BookCard に変換する場合、TInput は Book、TOutput は BookCard になる。
  // mapItems の実装は1つでも、呼び出し側の mapper によって変換後の型が変わる。
  return items.map((item) => mapper(item));
}

function selectValues<TObject, TResult>(
  items: readonly TObject[],
  selector: Selector<TObject, TResult>,
): readonly TResult[] {
  // selector は、オブジェクトから一部の値を取り出す関数としてよく使う。
  // React の表示用データ作成や、API response から必要な値だけを取り出す場面につながる。
  //
  // selector の戻り値が string なら TResult は string、number なら TResult は number になる。
  // callback の戻り値から型引数が決まる点は、Unit 04 の関数型の理解ともつながる。
  return items.map((item) => selector(item));
}

export function runMapperSelectorGenerics(): void {
  console.log('このファイルでは、mapper / selector 関数での generics を確認する。');

  const books: readonly Book[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
      price: 2800,
    },
    {
      id: 'book-002',
      title: 'React Basics',
      price: 3200,
    },
  ];

  const cards = mapItems<Book, BookCard>(books, (book) => ({
    title: book.title,
    priceLabel: `${book.price}円`,
  }));

  const titles = selectValues(books, (book) => book.title);
  const prices = selectValues(books, (book) => book.price);

  console.log('1. mapper で Book から BookCard へ変換する');
  console.log('cards:', cards);

  console.log('');
  console.log('2. selector で必要な値だけを取り出す');
  console.log('titles:', titles);
  console.log('prices:', prices);

  assert.deepEqual(cards, [
    {
      title: 'TypeScript Foundations',
      priceLabel: '2800円',
    },
    {
      title: 'React Basics',
      priceLabel: '3200円',
    },
  ]);
  assert.deepEqual(titles, ['TypeScript Foundations', 'React Basics']);
  assert.deepEqual(prices, [2800, 3200]);
}
