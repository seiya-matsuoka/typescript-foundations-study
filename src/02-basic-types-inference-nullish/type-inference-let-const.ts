import assert from 'node:assert/strict';

type PublishStatus = 'draft' | 'published' | 'archived';

function acceptPublishStatus(status: PublishStatus): string {
  return `status:${status}`;
}

export function runTypeInferenceLetConst(): void {
  console.log('[type-inference-let-const.ts]');
  console.log('型推論・let / const・literal widening を確認する');
  console.log('');

  const inferredUserName = 'Tanaka';
  const inferredLoginCount = 3;
  const inferredActive = true;

  // 初期値から明らかに型が分かる場合、TypeScript は型を推論する。
  // このような単純な const 変数では、型注釈を省略しても読みづらくならない。
  console.log('1. 初期値から推論される基本型');
  console.log('inferredUserName:', inferredUserName);
  console.log('inferredLoginCount:', inferredLoginCount);
  console.log('inferredActive:', inferredActive);
  console.log('');

  let mutableStatus = 'draft';
  const initialMutableStatus = mutableStatus;

  const fixedStatus = 'published';

  // let で宣言した mutableStatus は、あとから別の文字列を代入できる。
  // そのため、初期値は 'draft' でも、型は string へ広がる。
  // 初期値を一度使ってから再代入することで、値の変化と型の広がりを両方確認できる。
  mutableStatus = 'archived';
  const changedMutableStatus = mutableStatus;

  // const で宣言した fixedStatus は再代入できない。
  // そのため、型は string ではなく 'published' という literal type として推論される。
  const acceptedFixedStatus = acceptPublishStatus(fixedStatus);

  console.log('2. let と const の推論の違い');
  console.log('initialMutableStatus:', initialMutableStatus);
  console.log('changedMutableStatus:', changedMutableStatus);
  console.log('fixedStatus:', fixedStatus);
  console.log('acceptedFixedStatus:', acceptedFixedStatus);
  console.log('');

  const statusList = ['draft', 'published'];
  const fixedStatusList = ['draft', 'published'] as const;

  // 配列リテラルは、何もしないと string[] として推論される。
  // as const を使うと、配列全体が readonly tuple になり、各要素の literal type が保たれる。
  console.log('3. 配列リテラルの推論と as const');
  console.log('statusList:', statusList.join(', '));
  console.log('fixedStatusList:', fixedStatusList.join(', '));
  console.log('');

  // @ts-expect-error: mutableStatus は string に広がるため、PublishStatus としてはそのまま渡せないことを確認する。
  const rejectedMutableStatus = acceptPublishStatus(mutableStatus);

  console.log('4. literal widening による型の広がり');
  console.log('rejectedMutableStatus runtime value:', rejectedMutableStatus);

  assert.equal(inferredUserName, 'Tanaka');
  assert.equal(inferredLoginCount, 3);
  assert.equal(inferredActive, true);
  assert.equal(initialMutableStatus, 'draft');
  assert.equal(changedMutableStatus, 'archived');
  assert.equal(mutableStatus, 'archived');
  assert.equal(fixedStatus, 'published');
  assert.equal(acceptedFixedStatus, 'status:published');
  assert.deepEqual(statusList, ['draft', 'published']);
  assert.deepEqual(fixedStatusList, ['draft', 'published']);
  assert.equal(rejectedMutableStatus, 'status:archived');
}
