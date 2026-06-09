import { runApiResultUnion } from './api-result-union.ts';
import { runCustomTypeGuards } from './custom-type-guards.ts';
import { runDiscriminatedUnionStatus } from './discriminated-union-status.ts';
import { runEqualityTruthinessNarrowing } from './equality-truthiness-narrowing.ts';
import { runExhaustiveCheckNever } from './exhaustive-check-never.ts';
import { runInNarrowing } from './in-narrowing.ts';
import { runInstanceofNarrowing } from './instanceof-narrowing.ts';
import { runLiteralNullableUnions } from './literal-nullable-unions.ts';
import { runLoadingSuccessErrorState } from './loading-success-error-state.ts';
import { runOptionalChainingNarrowing } from './optional-chaining-narrowing.ts';
import { runReducerActionUnion } from './reducer-action-union.ts';
import { runTypeofNarrowing } from './typeof-narrowing.ts';
import { runUnionTypeBasics } from './union-type-basics.ts';
import { runUnknownSafeNarrowing } from './unknown-safe-narrowing.ts';

const unitTitle = 'Unit 05. union 型・narrowing・type guard・discriminated union';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 05 では、TypeScript らしさが強く出る union 型と narrowing を厚めに扱う。
// JavaScript では実行時の if / switch として書いていた分岐に対して、
// TypeScript が「この分岐内ではこの型として扱える」と判断する流れを読む。
const runners: readonly Runner[] = [
  { title: 'union type の基本', run: runUnionTypeBasics },
  { title: 'literal union と nullable union', run: runLiteralNullableUnions },
  { title: 'typeof による narrowing', run: runTypeofNarrowing },
  { title: 'equality narrowing と truthiness narrowing', run: runEqualityTruthinessNarrowing },
  { title: 'in による narrowing', run: runInNarrowing },
  { title: 'instanceof による narrowing', run: runInstanceofNarrowing },
  { title: 'optional chaining と narrowing', run: runOptionalChainingNarrowing },
  { title: 'custom type guard と type predicate', run: runCustomTypeGuards },
  { title: 'unknown から安全に型を絞る', run: runUnknownSafeNarrowing },
  { title: 'status による discriminated union', run: runDiscriminatedUnionStatus },
  { title: 'API レスポンスの成功 / 失敗表現', run: runApiResultUnion },
  { title: 'loading / success / error state', run: runLoadingSuccessErrorState },
  { title: 'React の useReducer につながる action 型', run: runReducerActionUnion },
  { title: 'exhaustive check と never', run: runExhaustiveCheckNever },
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
console.log('Unit 05 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、union 型と narrowing の型チェック結果を確認する。');
