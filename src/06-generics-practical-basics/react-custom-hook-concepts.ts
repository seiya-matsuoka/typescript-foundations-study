import assert from 'node:assert/strict';

type AsyncState<TData, TError = string> =
  | {
      readonly status: 'idle';
    }
  | {
      readonly status: 'loading';
    }
  | {
      readonly status: 'success';
      readonly data: TData;
    }
  | {
      readonly status: 'error';
      readonly error: TError;
    };

type UseResourceResult<TData, TError = string> = {
  readonly state: AsyncState<TData, TError>;
  readonly reload: () => AsyncState<TData, TError>;
};

type User = {
  readonly id: string;
  readonly name: string;
};

function createResourceResult<TData, TError = string>(
  state: AsyncState<TData, TError>,
): UseResourceResult<TData, TError> {
  // React の custom hook はここでは実装しない。
  // ただし、useUser や useBooks のような hook は、
  // 「状態の外側の形は共通で、中身の data 型だけが変わる」ことが多い。
  // そのため、AsyncState<TData, TError> のような generic な状態型が役に立つ。
  //
  // たとえば User を取得する hook なら TData は User、
  // Book[] を取得する hook なら TData は readonly Book[] のように考えられる。
  // loading / success / error の状態表現は共通化しつつ、成功時の data 型だけを差し替えられる。
  return {
    state,
    reload: () => state,
  };
}

function formatAsyncState<TData, TError>(
  state: AsyncState<TData, TError>,
  formatData: (data: TData) => string,
  formatError: (error: TError) => string,
): string {
  // Unit 05 で扱った discriminated union と、Unit 06 の generics を組み合わせている。
  // status で narrowing すると、success では data、error では error を安全に扱える。
  // TData / TError の具体型は呼び出し側の state から決まる。
  //
  // formatData と formatError の callback も、それぞれ TData / TError を受け取る。
  // つまり、状態型と callback の引数型が generics によってつながっている。
  // React の render helper や custom hook の戻り値を設計するときに、この関係が重要になる。
  switch (state.status) {
    case 'idle':
      return 'idle';
    case 'loading':
      return 'loading';
    case 'success':
      return formatData(state.data);
    case 'error':
      return formatError(state.error);
  }
}

export function runReactCustomHookConcepts(): void {
  console.log('このファイルでは、React の custom hook 型につながる考え方を確認する。');

  const userState: AsyncState<User> = {
    status: 'success',
    data: {
      id: 'user-001',
      name: 'Sato',
    },
  };

  const resourceResult = createResourceResult(userState);

  const message = formatAsyncState(
    resourceResult.state,
    (user) => `user:${user.name}`,
    (error) => `error:${error}`,
  );

  const reloadedState = resourceResult.reload();

  console.log('1. AsyncState<User>');
  console.log('resourceResult:', resourceResult);

  console.log('');
  console.log('2. status で narrowing しながら TData を扱う');
  console.log('message:', message);
  console.log('reloadedState:', reloadedState);

  assert.deepEqual(resourceResult.state, {
    status: 'success',
    data: {
      id: 'user-001',
      name: 'Sato',
    },
  });
  assert.equal(message, 'user:Sato');
  assert.deepEqual(reloadedState, userState);
}
