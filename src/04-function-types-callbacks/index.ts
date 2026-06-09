import { runArrayMethodFunctionTypes } from './array-method-function-types.ts';
import { runCallbackTypeBasics } from './callback-type-basics.ts';
import { runFunctionOverloadOverview } from './function-overload-overview.ts';
import { runFunctionParameterReturnTypes } from './function-parameter-return-types.ts';
import { runFunctionTypeAliases } from './function-type-aliases.ts';
import { runFunctionTypeExpressions } from './function-type-expressions.ts';
import { runHigherOrderFunctions } from './higher-order-functions.ts';
import { runMapperPredicateFunctions } from './mapper-predicate-functions.ts';
import { runOptionalDefaultRestParameters } from './optional-default-rest-parameters.ts';
import { runReactEventHandlerConcepts } from './react-event-handler-concepts.ts';
import { runReturnTypeAnnotationDecisions } from './return-type-annotation-decisions.ts';
import { runValidatorFormatterFunctions } from './validator-formatter-functions.ts';
import { runVoidAndNeverFunctions } from './void-and-never-functions.ts';

const unitTitle = 'Unit 04. 関数の型・callback・高階関数';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 04 では、関数・callback・高階関数を、TypeScript の型付きコードとして読み直す。
// 関数の型は、配列処理、validator、formatter、React の event handler、callback props、
// 後続 Unit の generics まで広くつながるため、厚めに扱う。
const runners: readonly Runner[] = [
  { title: '関数引数の型と戻り値の型', run: runFunctionParameterReturnTypes },
  { title: '戻り値型を書く場面・推論に任せる場面', run: runReturnTypeAnnotationDecisions },
  { title: 'optional / default / rest parameter', run: runOptionalDefaultRestParameters },
  { title: 'function type expression', run: runFunctionTypeExpressions },
  { title: '関数型の type alias', run: runFunctionTypeAliases },
  { title: 'callback の型', run: runCallbackTypeBasics },
  { title: 'higher-order function の型', run: runHigherOrderFunctions },
  { title: 'mapper / predicate 関数の型', run: runMapperPredicateFunctions },
  { title: 'validator / formatter 関数の型', run: runValidatorFormatterFunctions },
  { title: 'void / never', run: runVoidAndNeverFunctions },
  { title: 'overload の概要', run: runFunctionOverloadOverview },
  { title: '配列メソッドと関数型', run: runArrayMethodFunctionTypes },
  { title: 'React の event handler 型につながる考え方', run: runReactEventHandlerConcepts },
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
console.log('Unit 04 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、関数の型チェック結果を確認する。');
