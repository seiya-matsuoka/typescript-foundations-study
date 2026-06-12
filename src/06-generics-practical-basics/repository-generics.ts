import assert from 'node:assert/strict';

type Entity = {
  readonly id: string;
};

type Book = Entity & {
  readonly title: string;
};

type User = Entity & {
  readonly name: string;
};

interface Repository<TEntity extends Entity> {
  findAll(): readonly TEntity[];
  findById(id: string): TEntity | undefined;
  save(entity: TEntity): TEntity;
}

function createMemoryRepository<TEntity extends Entity>(
  initialEntities: readonly TEntity[],
): Repository<TEntity> {
  let entities = [...initialEntities];

  // repository 風関数では、id を持つ Entity を constraints として要求する。
  // TEntity extends Entity により、findById / save の中で entity.id を安全に使える。
  // Book repository なら Book を返し、User repository なら User を返す関係が保たれる。
  //
  // もし Repository<Entity> としてしまうと、Book の title や User の name などの情報が失われる。
  // TEntity を使うことで、共通の repository 形状を使いながら、具体的な entity の型を保持できる。
  // 実務の repository / API client / mock store でも、この読み方はよく使う。
  return {
    findAll() {
      return entities;
    },
    findById(id) {
      return entities.find((entity) => entity.id === id);
    },
    save(entity) {
      const withoutSameId = entities.filter((current) => current.id !== entity.id);
      entities = [...withoutSameId, entity];

      return entity;
    },
  };
}

export function runRepositoryGenerics(): void {
  console.log('このファイルでは、repository 風関数での generics を確認する。');

  const bookRepository = createMemoryRepository<Book>([
    {
      id: 'book-001',
      title: 'TypeScript Foundations',
    },
  ]);

  const userRepository = createMemoryRepository<User>([
    {
      id: 'user-001',
      name: 'Sato',
    },
  ]);

  const savedBook = bookRepository.save({
    id: 'book-002',
    title: 'React Basics',
  });

  const foundBook = bookRepository.findById('book-002');
  const foundUser = userRepository.findById('user-001');

  console.log('1. Repository<Book>');
  console.log('savedBook:', savedBook);
  console.log('foundBook:', foundBook);

  console.log('');
  console.log('2. Repository<User>');
  console.log('foundUser:', foundUser);

  assert.deepEqual(savedBook, {
    id: 'book-002',
    title: 'React Basics',
  });
  assert.deepEqual(foundBook, {
    id: 'book-002',
    title: 'React Basics',
  });
  assert.deepEqual(foundUser, {
    id: 'user-001',
    name: 'Sato',
  });
}
