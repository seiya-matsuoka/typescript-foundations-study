import { runAsConstArrayUnion } from './as-const-array-union.ts';
import { runAsConstObjectTypes } from './as-const-object-types.ts';
import { runEnumBasics } from './enum-basics.ts';
import { runEnumVsUnionLiteral } from './enum-vs-union-literal.ts';
import { runExcludeExtractNonNullable } from './exclude-extract-nonnullable.ts';
import { runNonNullAndDomAssertion } from './non-null-and-dom-assertion.ts';
import { runParametersReturnTypeAwaited } from './parameters-returntype-awaited.ts';
import { runPartialRequiredReadonly } from './partial-required-readonly.ts';
import { runPickOmitRecord } from './pick-omit-record.ts';
import { runPracticalReactConfigForm } from './practical-react-config-form.ts';
import { runSatisfiesBasics } from './satisfies-basics.ts';
import { runSatisfiesConfigMenu } from './satisfies-config-menu.ts';
import { runTypeAssertionBasics } from './type-assertion-basics.ts';

const unitTitle = 'Unit 08. utility types・as const・satisfies・型アサーション・enum';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 08 では、実務コードを読んでいると頻繁に出てくる TypeScript らしい書き方を扱う。
// utility types、as const、satisfies、型アサーション、enum はそれぞれ独立した機能に見えるが、
// 実際には「既存の値や型から、別の型を安全に作る」ために組み合わせて使うことが多い。
const runners: readonly Runner[] = [
  { title: 'Partial / Required / Readonly', run: runPartialRequiredReadonly },
  { title: 'Pick / Omit / Record', run: runPickOmitRecord },
  { title: 'Exclude / Extract / NonNullable', run: runExcludeExtractNonNullable },
  { title: 'Parameters / ReturnType / Awaited', run: runParametersReturnTypeAwaited },
  { title: 'as const と定数配列から union 型を作る', run: runAsConstArrayUnion },
  { title: 'as const と定数オブジェクトから型を作る', run: runAsConstObjectTypes },
  { title: 'satisfies の基本', run: runSatisfiesBasics },
  { title: 'satisfies と config / menu 定義', run: runSatisfiesConfigMenu },
  { title: '型アサーション as の基本と危険性', run: runTypeAssertionBasics },
  { title: 'non-null assertion と DOM 風の型アサーション', run: runNonNullAndDomAssertion },
  { title: 'enum の基本', run: runEnumBasics },
  { title: 'enum と union literal / const object の比較', run: runEnumVsUnionLiteral },
  {
    title: 'React props / config / form / API DTO につながる使い方',
    run: runPracticalReactConfigForm,
  },
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
console.log('Unit 08 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、utility types や as const から作った型を確認する。');
