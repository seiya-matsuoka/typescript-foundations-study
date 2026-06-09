import assert from 'node:assert/strict';

type Book = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly tags: readonly string[];
};

type BookCard = {
  readonly title: string;
  readonly priceLabel: string;
};

type BookMapper = (book: Book) => BookCard;
type BookPredicate = (book: Book) => boolean;

function filterAndMapBooks(
  books: readonly Book[],
  predicate: BookPredicate,
  mapper: BookMapper,
): readonly BookCard[] {
  // mapper は「ある値を別の形へ変換する関数」である。
  // predicate は「条件を満たすかどうかを boolean で返す関数」である。
  // TypeScript では、それぞれの callback の入力と出力を型として明示できる。
  return books.filter(predicate).map(mapper);
}

export function runMapperPredicateFunctions(): void {
  console.log('このファイルでは、mapper / predicate 関数の型を確認する。');

  const books: readonly Book[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
      price: 2800,
      tags: ['typescript', 'frontend'],
    },
    {
      id: 'book-002',
      title: 'Java Basics',
      price: 2200,
      tags: ['java', 'backend'],
    },
    {
      id: 'book-003',
      title: 'React Practice',
      price: 3200,
      tags: ['react', 'frontend'],
    },
  ];

  const isFrontendBook: BookPredicate = (book) => book.tags.includes('frontend');
  const toBookCard: BookMapper = (book) => ({
    title: book.title,
    priceLabel: `${book.price.toLocaleString('ja-JP')}円`,
  });

  const frontendCards = filterAndMapBooks(books, isFrontendBook, toBookCard);

  console.log('1. predicate で絞り込む');
  console.log('frontend book count:', frontendCards.length);

  console.log('');
  console.log('2. mapper で表示用の形へ変換する');
  console.log('frontendCards:', frontendCards);

  assert.deepEqual(frontendCards, [
    {
      title: 'TypeScript Foundations',
      priceLabel: '2,800円',
    },
    {
      title: 'React Practice',
      priceLabel: '3,200円',
    },
  ]);
}
