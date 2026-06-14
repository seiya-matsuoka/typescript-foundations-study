import assert from 'node:assert/strict';

const defaultSearchOptions = {
  keyword: '',
  page: 1,
  pageSize: 20,
  includeArchived: false,
};

type SearchOptions = typeof defaultSearchOptions;

function updateSearchOptions(current: SearchOptions, keyword: string): SearchOptions {
  // type の右側に出てくる typeof は、JavaScript の typeof 演算子とは別の読み方をする。
  // ここでは defaultSearchOptions という値の形から SearchOptions という型を作っている。
  //
  // 実務では、設定オブジェクトや初期 state から型を作る場面がある。
  // ただし何でも typeof で型を作ればよいわけではなく、
  // 「値を基準に型を派生させたい」場面で使うと読みやすい。
  return {
    ...current,
    keyword,
    page: 1,
  };
}

function describeRuntimeType(value: unknown): string {
  // こちらは実行時の typeof である。
  // value が実際に実行されたとき、'string' や 'number' のような文字列を返す。
  // Unit 05 で扱った narrowing は、この実行時 typeof を条件分岐に使っていた。
  if (typeof value === 'string') {
    return `string:${value}`;
  }

  if (typeof value === 'number') {
    return `number:${value}`;
  }

  return 'other';
}

export function runTypeofTypeContext(): void {
  console.log('このファイルでは、型コンテキストの typeof と実行時の typeof を確認する。');

  const updatedOptions = updateSearchOptions(defaultSearchOptions, 'typescript');
  const runtimeString = describeRuntimeType('hello');
  const runtimeNumber = describeRuntimeType(100);
  const runtimeObject = describeRuntimeType({ value: true });

  console.log('1. 値 defaultSearchOptions から SearchOptions 型を作る');
  console.log('updatedOptions:', updatedOptions);

  console.log('');
  console.log('2. 実行時の typeof で値の種類を判定する');
  console.log('runtimeString:', runtimeString);
  console.log('runtimeNumber:', runtimeNumber);
  console.log('runtimeObject:', runtimeObject);

  assert.deepEqual(updatedOptions, {
    keyword: 'typescript',
    page: 1,
    pageSize: 20,
    includeArchived: false,
  });
  assert.equal(runtimeString, 'string:hello');
  assert.equal(runtimeNumber, 'number:100');
  assert.equal(runtimeObject, 'other');
}
