import assert from 'node:assert/strict';

type Mapper<TInput, TOutput> = (input: TInput) => TOutput;
type Predicate<TInput> = (input: TInput) => boolean;
type Formatter<TInput> = (input: TInput) => string;
type Normalizer<TInput, TOutput> = (input: TInput) => TOutput;

type UserInput = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly active: boolean;
};

type NormalizedUser = {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
};

function transformItems<TInput, TOutput>(
  items: readonly TInput[],
  predicate: Predicate<TInput>,
  mapper: Mapper<TInput, TOutput>,
): readonly TOutput[] {
  // predicate と mapper は、Unit 04 の callback 型、Unit 06 の generics とつながる。
  // TInput は入力配列の要素型から決まり、TOutput は mapper の戻り値から決まる。
  // filter と map を組み合わせる処理を、役割名付きの関数型で読みやすくしている。
  return items.filter((item) => predicate(item)).map((item) => mapper(item));
}

export function runMapperPredicateFormatterNormalizer(): void {
  console.log('このファイルでは、mapper / predicate / formatter / normalizer の型を確認する。');

  const users: readonly UserInput[] = [
    {
      id: ' user-001 ',
      name: ' sato ',
      email: 'SATO@example.com',
      active: true,
    },
    {
      id: ' user-002 ',
      name: ' tanaka ',
      email: 'TANAKA@example.com',
      active: false,
    },
  ];

  const isActive: Predicate<UserInput> = (user) => user.active;

  const normalizeUser: Normalizer<UserInput, NormalizedUser> = (user) => ({
    id: user.id.trim(),
    displayName: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
  });

  const formatUser: Formatter<NormalizedUser> = (user) => `${user.displayName} <${user.email}>`;

  const normalizedUsers = transformItems(users, isActive, normalizeUser);
  const labels = normalizedUsers.map((user) => formatUser(user));

  console.log('1. predicate と normalizer を組み合わせて配列を変換する');
  console.log('normalizedUsers:', normalizedUsers);

  console.log('');
  console.log('2. formatter で表示用文字列へ変換する');
  console.log('labels:', labels);

  assert.deepEqual(normalizedUsers, [
    {
      id: 'user-001',
      displayName: 'SATO',
      email: 'sato@example.com',
    },
  ]);
  assert.deepEqual(labels, ['SATO <sato@example.com>']);
}
