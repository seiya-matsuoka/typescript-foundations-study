import assert from 'node:assert/strict';

type SearchOptions = {
  readonly keyword: string;
  readonly limit?: number;
};

function formatSearchCondition(keyword: string, limit?: number): string {
  // optional parameter は、呼び出し側がその引数を省略できることを表す。
  // limit?: number は、関数内部では number | undefined として読む必要がある。
  // Unit 02 の optional property と同様、undefined の可能性を分岐やデフォルト値で扱う。
  const resolvedLimit = limit ?? 20;

  return `${keyword} / limit=${resolvedLimit}`;
}

function createSearchOptions(keyword: string, limit = 20): SearchOptions {
  // default parameter は、引数が省略されたときの初期値を関数定義側で決める。
  // limit の型は、デフォルト値 20 から number として推論される。
  // ただし、外部公開する関数では読みやすさのために型注釈を書く場面もある。
  return {
    keyword,
    limit,
  };
}

function joinTags(prefix: string, ...tags: readonly string[]): string {
  // rest parameter は、残りの引数を配列として受け取る。
  // ...tags: readonly string[] と書くことで、受け取ったタグを関数内で書き換えない意図も表している。
  // React の className 生成や検索条件の組み立てでも、似た形の関数を見ることがある。
  return `${prefix}: ${tags.join(', ')}`;
}

export function runOptionalDefaultRestParameters(): void {
  console.log('このファイルでは、optional / default / rest parameter を確認する。');

  const conditionWithLimit = formatSearchCondition('typescript', 10);
  const conditionWithoutLimit = formatSearchCondition('react');
  const defaultOptions = createSearchOptions('function types');
  const customOptions = createSearchOptions('callback', 5);
  const joinedTags = joinTags('topics', 'function', 'callback', 'higher-order');

  console.log('1. optional parameter');
  console.log('conditionWithLimit:', conditionWithLimit);
  console.log('conditionWithoutLimit:', conditionWithoutLimit);

  console.log('');
  console.log('2. default parameter');
  console.log('defaultOptions:', defaultOptions);
  console.log('customOptions:', customOptions);

  console.log('');
  console.log('3. rest parameter');
  console.log('joinedTags:', joinedTags);

  assert.equal(conditionWithLimit, 'typescript / limit=10');
  assert.equal(conditionWithoutLimit, 'react / limit=20');
  assert.deepEqual(defaultOptions, { keyword: 'function types', limit: 20 });
  assert.deepEqual(customOptions, { keyword: 'callback', limit: 5 });
  assert.equal(joinedTags, 'topics: function, callback, higher-order');
}
