import assert from 'node:assert/strict';

function createPair<T>(first: T, second: T): readonly [T, T] {
  // <T> は、この関数を呼び出すときに決まる型引数である。
  // first と second の型を同じ T として結び付けることで、
  // 「2つの値は同じ種類の値として扱う」という関係を型で表している。
  //
  // Java の generic method と似ている部分もあるが、
  // TypeScript では呼び出し側の値から T が推論される場面が非常に多い。
  // まずは「T は関数定義時に固定されている型名ではなく、
  // 呼び出しごとに決まる仮の型名」と読むと理解しやすい。
  return [first, second];
}

function firstOrFallback<T>(values: readonly T[], fallback: T): T {
  // T は配列の要素型と fallback の型を結び付ける。
  // values が string[] なら T は string、number[] なら T は number になる。
  // noUncheckedIndexedAccess が有効なため values[0] は T | undefined として扱われる。
  //
  // ここで fallback も T にしているため、
  // 「配列が空だった場合に返す値」も配列要素と同じ型でなければならない。
  // generics は、このように複数の引数や戻り値の型を連動させるときに役立つ。
  return values[0] ?? fallback;
}

function wrapValue<T>(value: T): { readonly value: T } {
  // 戻り値の中にも T を使うことで、入力値の型を保持したまま別の形へ包める。
  // 実務では API response や Result 型、フォーム状態のように、
  // 「中身の型は呼び出し側で決まるが、外側の形は共通」という場面で generics を使う。
  //
  // value を unknown や any にしてしまうと、包む前の型情報が失われる。
  // T を使うことで、包んだあとも string なら string、number なら number として追跡できる。
  return {
    value,
  };
}

export function runGenericFunctionBasics(): void {
  console.log('このファイルでは、generic function の基本を確認する。');

  const stringPair = createPair('draft', 'published');
  const numberPair = createPair(10, 20);

  const firstName = firstOrFallback(['Sato', 'Tanaka'], 'Guest');
  const fallbackName = firstOrFallback([], 'Guest');

  const wrappedUserId = wrapValue('user-001');
  const wrappedCount = wrapValue(3);

  console.log('1. 2つの引数を同じ型 T として扱う');
  console.log('stringPair:', stringPair);
  console.log('numberPair:', numberPair);

  console.log('');
  console.log('2. 配列要素と fallback を同じ型 T として扱う');
  console.log('firstName:', firstName);
  console.log('fallbackName:', fallbackName);

  console.log('');
  console.log('3. 入力値の型を保ったまま別の形へ包む');
  console.log('wrappedUserId:', wrappedUserId);
  console.log('wrappedCount:', wrappedCount);

  assert.deepEqual(stringPair, ['draft', 'published']);
  assert.deepEqual(numberPair, [10, 20]);
  assert.equal(firstName, 'Sato');
  assert.equal(fallbackName, 'Guest');
  assert.deepEqual(wrappedUserId, { value: 'user-001' });
  assert.deepEqual(wrappedCount, { value: 3 });
}
