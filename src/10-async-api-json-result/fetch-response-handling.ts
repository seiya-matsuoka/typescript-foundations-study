import assert from 'node:assert/strict';

type MockResponse = {
  readonly ok: boolean;
  readonly status: number;
  readonly json: () => Promise<unknown>;
};

type ArticleDto = {
  readonly id: string;
  readonly title: string;
};

type ApiErrorBody = {
  readonly message: string;
};

async function mockFetchArticleResponse(articleId: string): Promise<MockResponse> {
  if (articleId === 'article-001') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ id: 'article-001', title: 'TypeScript と API 境界' }),
    };
  }

  return {
    ok: false,
    status: 404,
    json: async () => ({ message: '記事が見つかりません' }),
  };
}

function isArticleDto(value: unknown): value is ArticleDto {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'id' in value &&
    'title' in value &&
    typeof value.id === 'string' &&
    typeof value.title === 'string'
  );
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== 'object' || value === null) return false;

  return 'message' in value && typeof value.message === 'string';
}

async function fetchArticleTitle(articleId: string): Promise<string> {
  const response = await mockFetchArticleResponse(articleId);
  const body: unknown = await response.json();

  // fetch の response.json() は、実行時には外部入力を返す。
  // TypeScript の型だけでは、その JSON が ArticleDto かどうかは保証できない。
  // そのため、unknown として受け取り、type guard で確認してから使う。
  // 実務では Zod などの validation library を使うこともあるが、ここでは type guard の入口として扱う。
  if (response.ok) {
    if (!isArticleDto(body)) {
      throw new Error('記事レスポンスの形式が不正です');
    }

    return body.title;
  }

  if (isApiErrorBody(body)) {
    throw new Error(`API error ${response.status}: ${body.message}`);
  }

  throw new Error(`API error ${response.status}: unknown body`);
}

export async function runFetchResponseHandling(): Promise<void> {
  console.log('このファイルでは、fetch 風 response handling を確認する。');

  const title = await fetchArticleTitle('article-001');

  let errorMessage = '';
  try {
    await fetchArticleTitle('missing');
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'unknown error';
  }

  console.log('1. response.ok が true の場合に成功レスポンスを扱う');
  console.log('title:', title);

  console.log('');
  console.log('2. response.ok が false の場合に失敗レスポンスを扱う');
  console.log('errorMessage:', errorMessage);

  assert.equal(title, 'TypeScript と API 境界');
  assert.equal(errorMessage, 'API error 404: 記事が見つかりません');
}
