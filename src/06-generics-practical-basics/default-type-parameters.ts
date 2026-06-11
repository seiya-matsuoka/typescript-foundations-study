import assert from 'node:assert/strict';

type ApiMeta = {
  readonly requestId: string;
};

type ApiEnvelope<TData, TMeta = ApiMeta> = {
  readonly data: TData;
  readonly meta: TMeta;
};

type SimpleMessage = {
  readonly message: string;
};

type PaginationMeta = ApiMeta & {
  readonly page: number;
  readonly totalCount: number;
};

function createEnvelope<TData>(data: TData, requestId: string): ApiEnvelope<TData> {
  // TMeta には default type parameter として ApiMeta が指定されている。
  // そのため、ApiEnvelope<TData> と書くだけで meta は ApiMeta として扱われる。
  //
  // default type parameter は、毎回指定するほどではない型引数に既定値を置くために使う。
  // よく使う標準形を短く書ける一方で、必要なときだけ別の型へ差し替えられる。
  return {
    data,
    meta: {
      requestId,
    },
  };
}

function createPagedEnvelope<TData>(
  data: TData,
  requestId: string,
  page: number,
  totalCount: number,
): ApiEnvelope<TData, PaginationMeta> {
  // default では足りない場合は、第2型引数 TMeta を明示して別の meta 型にできる。
  // ページング付き API response のように、共通 meta に追加情報がある場面で使いやすい。
  //
  // TData は data の型、TMeta は meta の型というように、
  // 複数の型引数にはそれぞれ別の役割がある。
  // 名前を T / U だけにせず TData / TMeta としているのは、読み手が役割を追いやすくするためでもある。
  return {
    data,
    meta: {
      requestId,
      page,
      totalCount,
    },
  };
}

export function runDefaultTypeParameters(): void {
  console.log('このファイルでは、default type parameter を確認する。');

  const messageEnvelope = createEnvelope<SimpleMessage>(
    {
      message: '保存しました',
    },
    'req-001',
  );

  const pagedEnvelope = createPagedEnvelope(
    [
      {
        id: 'book-001',
        title: 'TypeScript Foundations',
      },
    ],
    'req-002',
    1,
    20,
  );

  console.log('1. TMeta を省略して default の ApiMeta を使う');
  console.log('messageEnvelope:', messageEnvelope);

  console.log('');
  console.log('2. TMeta を明示して PaginationMeta を使う');
  console.log('pagedEnvelope:', pagedEnvelope);

  assert.deepEqual(messageEnvelope, {
    data: {
      message: '保存しました',
    },
    meta: {
      requestId: 'req-001',
    },
  });
  assert.deepEqual(pagedEnvelope, {
    data: [
      {
        id: 'book-001',
        title: 'TypeScript Foundations',
      },
    ],
    meta: {
      requestId: 'req-002',
      page: 1,
      totalCount: 20,
    },
  });
}
