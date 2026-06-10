import assert from 'node:assert/strict';

type Book = {
  readonly id: string;
  readonly title: string;
};

type BookListState =
  | {
      readonly status: 'idle';
    }
  | {
      readonly status: 'loading';
    }
  | {
      readonly status: 'success';
      readonly books: readonly Book[];
    }
  | {
      readonly status: 'error';
      readonly message: string;
    };

function renderBookListState(state: BookListState): string {
  // loading / success / error state は React の state 表現でよく使う discriminated union である。
  // status を見れば、どのプロパティが存在するかが分かる。
  // success のときだけ books を持ち、error のときだけ message を持つため、状態とデータの不整合を減らせる。
  switch (state.status) {
    case 'idle':
      return 'まだ読み込んでいません';
    case 'loading':
      return '読み込み中...';
    case 'success':
      return `書籍数: ${state.books.length}`;
    case 'error':
      return `エラー: ${state.message}`;
  }
}

export function runLoadingSuccessErrorState(): void {
  console.log('このファイルでは、loading / success / error state を確認する。');

  const states: readonly BookListState[] = [
    {
      status: 'idle',
    },
    {
      status: 'loading',
    },
    {
      status: 'success',
      books: [
        {
          id: 'book-001',
          title: 'TypeScript Foundations',
        },
        {
          id: 'book-002',
          title: 'React Practice',
        },
      ],
    },
    {
      status: 'error',
      message: '通信に失敗しました',
    },
  ];

  const renderedStates = states.map((state) => renderBookListState(state));

  console.log('1. 画面状態を status で分ける');
  console.log('renderedStates:', renderedStates);

  assert.deepEqual(renderedStates, [
    'まだ読み込んでいません',
    '読み込み中...',
    '書籍数: 2',
    'エラー: 通信に失敗しました',
  ]);
}
