import assert from 'node:assert/strict';

class TypeScriptPrivateCounter {
  private count = 0;

  increment(): number {
    this.count += 1;

    return this.count;
  }

  getCount(): number {
    return this.count;
  }
}

class JavaScriptPrivateCounter {
  #count = 0;

  increment(): number {
    this.#count += 1;

    return this.#count;
  }

  getCount(): number {
    return this.#count;
  }
}

export function runPrivateFieldComparison(): void {
  console.log('このファイルでは、TypeScript private と JavaScript #private を確認する。');

  const typeScriptCounter = new TypeScriptPrivateCounter();
  const javaScriptCounter = new JavaScriptPrivateCounter();

  const typeScriptCount = typeScriptCounter.increment();
  const javaScriptCount = javaScriptCounter.increment();

  // TypeScript の private は、TypeScript の型チェックによるアクセス制御である。
  // コンパイル後の JavaScript では通常の property に変換される場合がある。
  //
  // JavaScript の #private field は、JavaScript 自体の実行時仕様として外側からアクセスできない。
  // Java の private と完全に同じ実装ではないため、実務コードでは private と # の違いを意識して読む。
  const currentTypeScriptCount = typeScriptCounter.getCount();
  const currentJavaScriptCount = javaScriptCounter.getCount();

  console.log('1. TypeScript private を使った counter');
  console.log('typeScriptCount:', typeScriptCount);
  console.log('currentTypeScriptCount:', currentTypeScriptCount);

  console.log('');
  console.log('2. JavaScript #private field を使った counter');
  console.log('javaScriptCount:', javaScriptCount);
  console.log('currentJavaScriptCount:', currentJavaScriptCount);

  assert.equal(typeScriptCount, 1);
  assert.equal(javaScriptCount, 1);
  assert.equal(currentTypeScriptCount, 1);
  assert.equal(currentJavaScriptCount, 1);
}
