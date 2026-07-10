import assert from 'node:assert/strict';

type AsyncState<TData, TError = string> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: TData }
  | { readonly status: 'error'; readonly error: TError };

type ArticleCard = {
  readonly id: string;
  readonly title: string;
};

function renderArticleState(state: AsyncState<readonly ArticleCard[]>): string {
  // React コンポーネントでは、API 取得状態を status で分けて表示することが多い。
  // Unit 05 の discriminated union と Unit 06 の generics を組み合わせると、
  // success のときだけ data、error のときだけ error を持つ状態型を表せる。
  switch (state.status) {
    case 'idle':
      return 'idle';
    case 'loading':
      return 'loading...';
    case 'success':
      return state.data.map((article) => article.title).join(', ');
    case 'error':
      return `error:${state.error}`;
  }
}

async function fetchArticleCards(): Promise<AsyncState<readonly ArticleCard[]>> {
  const loadingState: AsyncState<readonly ArticleCard[]> = { status: 'loading' };

  // 実際の React では loadingState を setState し、その後 API 結果に応じて success / error に更新する。
  // このサンプルでは実行時の値としては返さないが、API 取得前に loading 状態を作る考え方を示す。
  console.log('loadingState:', loadingState);

  return {
    status: 'success',
    data: [
      { id: 'article-001', title: 'API 取得状態' },
      { id: 'article-002', title: 'Result 型と React' },
    ],
  };
}

export async function runReactApiStateConcepts(): Promise<void> {
  console.log('このファイルでは、React の API 取得状態につながる考え方を確認する。');

  const successState = await fetchArticleCards();
  const successMessage = renderArticleState(successState);
  const errorState: AsyncState<readonly ArticleCard[]> = {
    status: 'error',
    error: '記事の取得に失敗しました',
  };
  const errorMessage = renderArticleState(errorState);

  console.log('1. success state を表示用文字列に変換する');
  console.log('successState:', successState);
  console.log('successMessage:', successMessage);

  console.log('');
  console.log('2. error state を表示用文字列に変換する');
  console.log('errorState:', errorState);
  console.log('errorMessage:', errorMessage);

  assert.deepEqual(successState, {
    status: 'success',
    data: [
      { id: 'article-001', title: 'API 取得状態' },
      { id: 'article-002', title: 'Result 型と React' },
    ],
  });
  assert.equal(successMessage, 'API 取得状態, Result 型と React');
  assert.equal(errorMessage, 'error:記事の取得に失敗しました');
}
