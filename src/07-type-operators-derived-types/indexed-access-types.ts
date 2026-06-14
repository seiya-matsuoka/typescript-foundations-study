import assert from 'node:assert/strict';

type Article = {
  readonly id: string;
  readonly title: string;
  readonly author: {
    readonly id: string;
    readonly name: string;
  };
  readonly tags: readonly string[];
};

type ArticleTitle = Article['title'];
type ArticleAuthor = Article['author'];
type ArticleAuthorName = Article['author']['name'];
type ArticleTag = Article['tags'][number];

function getArticleTitle(article: Article): ArticleTitle {
  // Article['title'] は、Article 型の title プロパティの型を取り出す indexed access type である。
  // この例では ArticleTitle は string になる。
  //
  // 型を別々に手書きすると、元の Article とずれる可能性がある。
  // indexed access types を使うと、元の型から必要な一部を派生させられる。
  return article.title;
}

function getArticleAuthor(article: Article): ArticleAuthor {
  // ネストした object type でも、Article['author'] のように一部の型を取り出せる。
  // API response の一部だけを別の関数で扱いたいときに、この読み方が出てくる。
  return article.author;
}

function getProperty<TObject, TKey extends keyof TObject>(
  object: TObject,
  key: TKey,
): TObject[TKey] {
  // T[K] は、generic な indexed access type である。
  // key が 'title' なら戻り値は Article['title']、key が 'author' なら Article['author'] になる。
  // Unit 06 の generics と組み合わせると、選んだ key に応じて戻り値型が変わる関数を表せる。
  return object[key];
}

export function runIndexedAccessTypes(): void {
  console.log('このファイルでは、indexed access types と T[K] を確認する。');

  const article: Article = {
    id: 'article-001',
    title: 'TypeScript の型を読む',
    author: {
      id: 'user-001',
      name: 'Sato',
    },
    tags: ['typescript', 'frontend'],
  };

  const title = getArticleTitle(article);
  const author = getArticleAuthor(article);
  const authorName: ArticleAuthorName = author.name;
  const firstTag: ArticleTag = article.tags[0] ?? 'untagged';
  const selectedAuthor = getProperty(article, 'author');

  console.log("1. Article['title'] で title の型を取り出す");
  console.log('title:', title);

  console.log('');
  console.log('2. ネストした型や配列要素の型を取り出す');
  console.log('authorName:', authorName);
  console.log('firstTag:', firstTag);

  console.log('');
  console.log('3. T[K] で key に対応した値の型を返す');
  console.log('selectedAuthor:', selectedAuthor);

  assert.equal(title, 'TypeScript の型を読む');
  assert.deepEqual(author, {
    id: 'user-001',
    name: 'Sato',
  });
  assert.equal(authorName, 'Sato');
  assert.equal(firstTag, 'typescript');
  assert.deepEqual(selectedAuthor, {
    id: 'user-001',
    name: 'Sato',
  });
}
