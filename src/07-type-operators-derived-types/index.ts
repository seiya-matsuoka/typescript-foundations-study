import { runArrayToUnion } from './array-to-union.ts';
import { runAsConstTypeExtraction } from './as-const-type-extraction.ts';
import { runConditionalTypesBasics } from './conditional-types-basics.ts';
import { runDistributiveConditionalInfer } from './distributive-conditional-infer.ts';
import { runIndexedAccessTypes } from './indexed-access-types.ts';
import { runKeyRemappingOverview } from './key-remapping-overview.ts';
import { runKeyofBasics } from './keyof-basics.ts';
import { runKeyofTypeofBasics } from './keyof-typeof-basics.ts';
import { runMappedTypeModifiers } from './mapped-type-modifiers.ts';
import { runMappedTypesBasics } from './mapped-types-basics.ts';
import { runObjectToUnion } from './object-to-union.ts';
import { runTemplateLiteralTypes } from './template-literal-types.ts';
import { runTypeofTypeContext } from './typeof-type-context.ts';
import { runUtilityTypesInternalConcepts } from './utility-types-internal-concepts.ts';

const unitTitle = 'Unit 07. keyof / typeof / indexed access・派生型の入口';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 07 は、TypeScript の型を「自力で複雑に作る」ことよりも、
// 実務コードや utility types に出てくる型を読めるようにするための Unit である。
//
// Unit 06 の generics では T / TItem / TData のような型引数を読んだ。
// Unit 07 では、その型引数や object type から、key や value の型を取り出す読み方を扱う。
// たとえば keyof User、typeof config、User['name']、(typeof roles)[number] のような型は、
// React / API client / form / config object / utility types の内部で頻繁に見かける。
const runners: readonly Runner[] = [
  { title: 'keyof の基本', run: runKeyofBasics },
  { title: '型コンテキストの typeof と実行時の typeof', run: runTypeofTypeContext },
  { title: 'indexed access types と T[K]', run: runIndexedAccessTypes },
  { title: 'keyof typeof の基本', run: runKeyofTypeofBasics },
  { title: '配列から union 型を作る', run: runArrayToUnion },
  { title: 'オブジェクトから union 型を作る', run: runObjectToUnion },
  { title: 'as const と組み合わせた型抽出の入口', run: runAsConstTypeExtraction },
  { title: 'mapped types の基本', run: runMappedTypesBasics },
  { title: 'readonly / ? modifier の入口', run: runMappedTypeModifiers },
  { title: 'key remapping の概要', run: runKeyRemappingOverview },
  { title: 'conditional types の基本', run: runConditionalTypesBasics },
  { title: 'distributive conditional types と infer の概要', run: runDistributiveConditionalInfer },
  { title: 'template literal types と文字列 union の組み立て', run: runTemplateLiteralTypes },
  { title: 'utility types の内部理解につながる考え方', run: runUtilityTypesInternalConcepts },
];

function printUnitHeader(): void {
  const line = '='.repeat(80);

  console.log(line);
  console.log(unitTitle);
  console.log(line);
}

function printSectionHeader(sectionNumber: number, title: string): void {
  const line = '-'.repeat(80);

  console.log('');
  console.log(line);
  console.log(`${sectionNumber}. ${title}`);
  console.log(line);
}

printUnitHeader();

for (const [index, runner] of runners.entries()) {
  printSectionHeader(index + 1, runner.title);
  await runner.run();
}

console.log('');
console.log('Unit 07 のサンプルをすべて実行した。');
console.log(
  '次は npm run typecheck で、keyof / typeof / indexed access の型チェック結果を確認する。',
);
