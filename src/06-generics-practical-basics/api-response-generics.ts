import assert from 'node:assert/strict';

type ApiResponse<TData> = {
  readonly status: 200;
  readonly data: TData;
};

type ApiListResponse<TItem> = ApiResponse<{
  readonly items: readonly TItem[];
  readonly totalCount: number;
}>;

type UserDto = {
  readonly id: string;
  readonly display_name: string;
};

type UserViewModel = {
  readonly id: string;
  readonly displayName: string;
};

function createApiResponse<TData>(data: TData): ApiResponse<TData> {
  // API response の外側の形は共通で、中身の data だけがエンドポイントごとに変わる。
  // そのようなとき、ApiResponse<TData> のような generic type alias が読みやすい。
  //
  // TData を使わず data: unknown や data: object にしてしまうと、
  // 呼び出し側で response.data の中身を安全に扱いづらくなる。
  // generics を使うことで、外側のレスポンス形状と中身の具体型を両方残せる。
  return {
    status: 200,
    data,
  };
}

function createApiListResponse<TItem>(
  items: readonly TItem[],
  totalCount: number,
): ApiListResponse<TItem> {
  // 一覧 API は items の要素型だけが変わり、totalCount などの周辺情報は共通になりやすい。
  // UserDto の一覧なら ApiListResponse<UserDto>、BookDto の一覧なら ApiListResponse<BookDto> になる。
  //
  // TItem は items の1件分の型を表す。
  // API response の外側を共通化しても、items の中身が UserDto なのか BookDto なのかは失わない。
  return createApiResponse({
    items,
    totalCount,
  });
}

function toUserViewModel(dto: UserDto): UserViewModel {
  return {
    id: dto.id,
    displayName: dto.display_name,
  };
}

export function runApiResponseGenerics(): void {
  console.log('このファイルでは、API response 型での generics を確認する。');

  const response = createApiListResponse<UserDto>(
    [
      {
        id: 'user-001',
        display_name: 'Sato',
      },
      {
        id: 'user-002',
        display_name: 'Tanaka',
      },
    ],
    2,
  );

  const viewModels = response.data.items.map((dto) => toUserViewModel(dto));

  console.log('1. ApiListResponse<UserDto>');
  console.log('response:', response);

  console.log('');
  console.log('2. API DTO から表示用データへ変換する');
  console.log('viewModels:', viewModels);

  assert.deepEqual(response, {
    status: 200,
    data: {
      items: [
        {
          id: 'user-001',
          display_name: 'Sato',
        },
        {
          id: 'user-002',
          display_name: 'Tanaka',
        },
      ],
      totalCount: 2,
    },
  });
  assert.deepEqual(viewModels, [
    {
      id: 'user-001',
      displayName: 'Sato',
    },
    {
      id: 'user-002',
      displayName: 'Tanaka',
    },
  ]);
}
