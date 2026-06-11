import assert from 'node:assert/strict';

type Identifiable = {
  readonly id: string;
};

type User = Identifiable & {
  readonly name: string;
};

type Book = Identifiable & {
  readonly title: string;
};

function getId<TItem extends Identifiable>(item: TItem): string {
  // extends は、TItem が少なくとも Identifiable の構造を持つことを表す。
  // これにより、関数の中で item.id へ安全にアクセスできる。
  // 制約がない T では、TypeScript は id が存在するか判断できない。
  //
  // Java の extends から連想すると「継承」をイメージしやすいが、
  // ここでは class 継承ではなく「この形を少なくとも満たす」という型引数の制約である。
  // Unit 03 の structural typing と同じく、型名ではなく構造が重要になる。
  return item.id;
}

function toIdMap<TItem extends Identifiable>(items: readonly TItem[]): Map<string, TItem> {
  // constraints を使うと、配列内の要素型 TItem を保ったまま、
  // id をキーにした Map へ変換できる。
  // User[] を渡せば Map<string, User>、Book[] を渡せば Map<string, Book> になる。
  //
  // もし戻り値を Map<string, Identifiable> にしてしまうと、
  // User 固有の name や Book 固有の title の型情報が失われる。
  // TItem を戻り値にも残すことで、共通処理にしつつ具体的な型を保てる。
  return new Map(items.map((item) => [item.id, item]));
}

export function runConstraintsExtends(): void {
  console.log('このファイルでは、constraints と extends を確認する。');

  const user: User = {
    id: 'user-001',
    name: 'Sato',
  };

  const books: readonly Book[] = [
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
    },
    {
      id: 'book-002',
      title: 'React Basics',
    },
  ];

  const userId = getId(user);
  const bookMap = toIdMap(books);
  const firstBook = bookMap.get('book-001');

  console.log('1. TItem extends Identifiable により id を読める');
  console.log('userId:', userId);

  console.log('');
  console.log('2. TItem の具体的な型を保ったまま Map に変換する');
  console.log('firstBook:', firstBook);

  assert.equal(userId, 'user-001');
  assert.deepEqual(firstBook, {
    id: 'book-001',
    title: 'TypeScript Foundations',
  });
}
