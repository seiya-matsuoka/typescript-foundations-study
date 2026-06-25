import assert from 'node:assert/strict';

type IsString<TValue> = TValue extends string ? true : false;
type ElementType<TValue> = TValue extends readonly (infer Item)[] ? Item : TValue;

type StringCheck = IsString<'hello'>;
type NumberCheck = IsString<100>;
type TagElement = ElementType<readonly ['typescript', 'react']>;
type PlainElement = ElementType<number>;

function describeStringCheck(value: StringCheck): string {
  // conditional type は、T extends U ? X : Y という形で読む。
  // IsString<'hello'> は 'hello' extends string が成り立つため true になる。
  // これは実行時の if ではなく、型レベルの条件分岐である。
  return value ? 'string type' : 'not string type';
}

function createElementExamples(): {
  readonly tag: TagElement;
  readonly plain: PlainElement;
  readonly numberCheck: NumberCheck;
} {
  // ElementType<TValue> は、配列なら要素型を取り出し、配列でなければそのままの型にする。
  // infer は次のファイルでも扱うが、ここでは「条件に合った部分の型を取り出している」と読む。
  return {
    tag: 'typescript',
    plain: 100,
    numberCheck: false,
  };
}

export function runConditionalTypesBasics(): void {
  console.log('このファイルでは、conditional types の基本を確認する。');

  const message = describeStringCheck(true);
  const examples = createElementExamples();

  console.log('1. T extends U ? X : Y の形を読む');
  console.log('message:', message);

  console.log('');
  console.log('2. 条件に応じて型を切り替える');
  console.log('examples:', examples);

  assert.equal(message, 'string type');
  assert.deepEqual(examples, {
    tag: 'typescript',
    plain: 100,
    numberCheck: false,
  });
}
