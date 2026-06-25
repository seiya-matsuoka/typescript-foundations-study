import assert from 'node:assert/strict';

type ToArray<TValue> = TValue extends unknown ? TValue[] : never;
type UnwrapPromise<TValue> = TValue extends Promise<infer Result> ? Result : TValue;
type FunctionReturn<TFunction> = TFunction extends (...args: never[]) => infer Result
  ? Result
  : never;

type StringOrNumberArray = ToArray<string | number>;
type LoadedUser = UnwrapPromise<Promise<{ readonly id: string; readonly name: string }>>;
type FormatterReturn = FunctionReturn<() => string>;

function createDistributedValues(): {
  readonly stringArray: StringOrNumberArray;
  readonly numberArray: StringOrNumberArray;
} {
  // conditional type に union 型を渡すと、各要素へ分配されることがある。
  // ToArray<string | number> は、(string | number)[] ではなく string[] | number[] として読める。
  // Unit 07 では挙動の入口だけ確認し、複雑な型設計には踏み込まない。
  return {
    stringArray: ['a', 'b'],
    numberArray: [1, 2],
  };
}

function createInferExamples(): {
  readonly user: LoadedUser;
  readonly formatterReturn: FormatterReturn;
} {
  // infer は、conditional type の条件に一致した部分の型を仮の名前として取り出す機能である。
  // UnwrapPromise<Promise<User>> では Promise の中身を Result として取り出している。
  // FunctionReturn<() => string> では、関数の戻り値型を Result として取り出している。
  return {
    user: {
      id: 'user-001',
      name: 'Sato',
    },
    formatterReturn: 'formatted',
  };
}

export function runDistributiveConditionalInfer(): void {
  console.log('このファイルでは、distributive conditional types と infer の概要を確認する。');

  const distributedValues = createDistributedValues();
  const inferExamples = createInferExamples();

  console.log('1. union 型に conditional type が分配される入口を確認する');
  console.log('distributedValues:', distributedValues);

  console.log('');
  console.log('2. infer で Promise の中身や関数の戻り値型を取り出す');
  console.log('inferExamples:', inferExamples);

  assert.deepEqual(distributedValues, {
    stringArray: ['a', 'b'],
    numberArray: [1, 2],
  });
  assert.deepEqual(inferExamples, {
    user: {
      id: 'user-001',
      name: 'Sato',
    },
    formatterReturn: 'formatted',
  });
}
