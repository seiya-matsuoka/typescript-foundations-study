import assert from 'node:assert/strict';

type SearchOption = {
  readonly keyword: string;
  readonly limit: number;
};

function parseJsonLike<T>(value: unknown, fallback: T): T {
  // 実際の JSON.parse は実行時 validation を行わない。
  // ここでは「unknown の値を T として扱うには本来確認が必要」という前提を残しつつ、
  // Unit 06 では明示的な型引数の読み方に焦点を当てる。
  //
  // parseJsonLike<SearchOption>(...) と書くと、呼び出し側が T を SearchOption と決めている。
  // これは便利だが、実行時の値が本当に SearchOption かどうかを保証するわけではない。
  // API や JSON の境界では、Unit 05 の type guard や後続 Unit の validation の考え方が必要になる。
  if (typeof value === 'object' && value !== null) {
    return value as T;
  }

  return fallback;
}

function createEmptyList<T>(): T[] {
  // 引数から T を推論できない関数では、呼び出し側が <T> を明示する必要がある。
  // createEmptyList<string>() のように書くと、空配列でも string[] として扱える。
  //
  // 空配列 [] だけでは、要素として何を入れる予定なのか TypeScript が判断しづらい。
  // このような「推論の材料がない場面」では、型引数を明示することが読みやすさにもつながる。
  return [];
}

export function runExplicitTypeArguments(): void {
  console.log('このファイルでは、明示的な型引数を確認する。');

  const rawSearchOption: unknown = {
    keyword: 'typescript',
    limit: 20,
  };

  const fallbackSearchOption: SearchOption = {
    keyword: '',
    limit: 10,
  };

  const searchOption = parseJsonLike<SearchOption>(rawSearchOption, fallbackSearchOption);
  const emptyIds = createEmptyList<string>();
  emptyIds.push('user-001');

  console.log('1. 呼び出し側で <SearchOption> を明示する');
  console.log('searchOption:', searchOption);

  console.log('');
  console.log('2. 引数から推論できない T を明示する');
  console.log('emptyIds:', emptyIds);

  assert.deepEqual(searchOption, {
    keyword: 'typescript',
    limit: 20,
  });
  assert.deepEqual(emptyIds, ['user-001']);
}
