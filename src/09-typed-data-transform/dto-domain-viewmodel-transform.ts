import assert from 'node:assert/strict';

type BookDto = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly published_at: string;
  readonly author_name: string | null;
};

type Book = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly publishedAt: Date;
  readonly authorName: string | null;
};

type BookViewModel = {
  readonly key: string;
  readonly title: string;
  readonly priceLabel: string;
  readonly publishedDateLabel: string;
  readonly authorLabel: string;
};

function toBook(dto: BookDto): Book {
  // API DTO は、snake_case や string 日付、nullable な値を含むことがある。
  // domain model では、アプリ内で扱いやすい camelCase や Date に変換する。
  // TypeScript では、この変換境界で型を分けると、どの層のデータなのかが読みやすくなる。
  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    publishedAt: new Date(dto.published_at),
    authorName: dto.author_name,
  };
}

function toBookViewModel(book: Book): BookViewModel {
  // view model は画面表示に必要な形へ整えたデータである。
  // React の props に渡す前に、価格や日付、未設定ラベルをここで作っておくと、
  // コンポーネント側の責務を軽くできる。
  return {
    key: book.id,
    title: book.title,
    priceLabel: `${book.price.toLocaleString()}円`,
    publishedDateLabel: book.publishedAt.toISOString().slice(0, 10),
    authorLabel: book.authorName ?? '著者未設定',
  };
}

export function runDtoDomainViewModelTransform(): void {
  console.log('このファイルでは、DTO から domain model / view model への変換を確認する。');

  const dtos: readonly BookDto[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
      price: 2800,
      published_at: '2026-07-01T00:00:00.000Z',
      author_name: 'Sato',
    },
    {
      id: 'book-002',
      title: 'React Basics',
      price: 3200,
      published_at: '2026-07-03T00:00:00.000Z',
      author_name: null,
    },
  ];

  const books = dtos.map((dto) => toBook(dto));
  const viewModels = books.map((book) => toBookViewModel(book));

  console.log('1. API DTO から domain model へ変換する');
  console.log('books:', books);

  console.log('');
  console.log('2. domain model から view model へ変換する');
  console.log('viewModels:', viewModels);

  assert.deepEqual(
    books.map((book) => ({
      id: book.id,
      title: book.title,
      publishedAt: book.publishedAt.toISOString(),
      authorName: book.authorName,
    })),
    [
      {
        id: 'book-001',
        title: 'TypeScript Foundations',
        publishedAt: '2026-07-01T00:00:00.000Z',
        authorName: 'Sato',
      },
      {
        id: 'book-002',
        title: 'React Basics',
        publishedAt: '2026-07-03T00:00:00.000Z',
        authorName: null,
      },
    ],
  );
  assert.deepEqual(viewModels, [
    {
      key: 'book-001',
      title: 'TypeScript Foundations',
      priceLabel: '2,800円',
      publishedDateLabel: '2026-07-01',
      authorLabel: 'Sato',
    },
    {
      key: 'book-002',
      title: 'React Basics',
      priceLabel: '3,200円',
      publishedDateLabel: '2026-07-03',
      authorLabel: '著者未設定',
    },
  ]);
}
