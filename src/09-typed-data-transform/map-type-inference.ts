import assert from 'node:assert/strict';

type BookDto = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly tags: readonly string[];
};

type BookCard = {
  readonly key: string;
  readonly title: string;
  readonly priceLabel: string;
  readonly tagCount: number;
};

function toBookCard(dto: BookDto): BookCard {
  // map の callback の引数 dto は、元配列 books の要素型 BookDto から推論される。
  // 戻り値のオブジェクトは BookCard として明示しているため、
  // 表示用データに必要なプロパティが不足していないかを型チェックできる。
  return {
    key: dto.id,
    title: dto.title,
    priceLabel: `${dto.price.toLocaleString()}円`,
    tagCount: dto.tags.length,
  };
}

export function runMapTypeInference(): void {
  console.log('このファイルでは、map の型推論を確認する。');

  const books: readonly BookDto[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
      price: 2800,
      tags: ['typescript', 'frontend'],
    },
    {
      id: 'book-002',
      title: 'React Basics',
      price: 3200,
      tags: ['react'],
    },
  ];

  const cards = books.map((book) => toBookCard(book));

  // cards の型は BookCard[] として推論される。
  // map は「入力配列の要素型」と「callback の戻り値型」から、変換後の配列型を決める。
  // React の list rendering では、このように API DTO からカード表示用の props に変換することが多い。
  console.log('1. BookDto[] から BookCard[] へ変換する');
  console.log('cards:', cards);

  assert.deepEqual(cards, [
    {
      key: 'book-001',
      title: 'TypeScript Foundations',
      priceLabel: '2,800円',
      tagCount: 2,
    },
    {
      key: 'book-002',
      title: 'React Basics',
      priceLabel: '3,200円',
      tagCount: 1,
    },
  ]);
}
