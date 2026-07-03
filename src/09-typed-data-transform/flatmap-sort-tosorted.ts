import assert from 'node:assert/strict';

type Article = {
  readonly id: string;
  readonly title: string;
  readonly tags: readonly string[];
  readonly publishedAt: string;
};

function collectTags(articles: readonly Article[]): readonly string[] {
  // flatMap は「map してから1段階 flat にする」配列メソッドである。
  // callback の戻り値が string[] なので、最終的な戻り値は string[] として推論される。
  return articles.flatMap((article) => article.tags);
}

function sortByPublishedAtDesc(articles: readonly Article[]): readonly Article[] {
  // sort は元の配列を破壊的に並べ替える。
  // readonly array を受け取っている関数では、元配列を直接変更しない方が安全である。
  //
  // toSorted は元配列を変更せず、新しい配列を返す。
  // React の state 更新でも、元の配列を変更せず新しい配列を作る考え方が重要になる。
  return articles.toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function runFlatMapSortToSorted(): void {
  console.log('このファイルでは、flatMap / sort / toSorted を確認する。');

  const articles: readonly Article[] = [
    {
      id: 'article-001',
      title: 'TypeScript',
      tags: ['typescript', 'frontend'],
      publishedAt: '2026-07-02',
    },
    {
      id: 'article-002',
      title: 'React',
      tags: ['react', 'frontend'],
      publishedAt: '2026-07-05',
    },
  ];

  const tags = collectTags(articles);
  const sortedArticles = sortByPublishedAtDesc(articles);

  console.log('1. flatMap でタグ一覧を作る');
  console.log('tags:', tags);

  console.log('');
  console.log('2. toSorted で元配列を変更せずに並べ替える');
  console.log('sortedArticles:', sortedArticles);

  assert.deepEqual(tags, ['typescript', 'frontend', 'react', 'frontend']);
  assert.deepEqual(
    sortedArticles.map((article) => article.id),
    ['article-002', 'article-001'],
  );
  assert.deepEqual(
    articles.map((article) => article.id),
    ['article-001', 'article-002'],
  );
}
