import { runApiResponseShapes } from './api-response-shapes.ts';
import { runApiValidationResult } from './api-validation-result.ts';
import { runAssertionFunctionBasics } from './assertion-function-basics.ts';
import { runAsyncFunctionReturnTypes } from './async-function-return-types.ts';
import { runAwaitedPromiseAll } from './awaited-promise-all.ts';
import { runCustomErrorClasses } from './custom-error-classes.ts';
import { runFetchResponseHandling } from './fetch-response-handling.ts';
import { runJsonUnknownBoundary } from './json-unknown-boundary.ts';
import { runNullableOptionalApiData } from './nullable-optional-api-data.ts';
import { runPaginationListDetailResponse } from './pagination-list-detail-response.ts';
import { runPromiseAllSettled } from './promise-allsettled.ts';
import { runPromiseBasics } from './promise-basics.ts';
import { runReactApiStateConcepts } from './react-api-state-concepts.ts';
import { runResultTypeBasics } from './result-type-basics.ts';
import { runTryCatchUnknownError } from './try-catch-unknown-error.ts';
import { runTypeGuardValidation } from './type-guard-validation.ts';

const unitTitle = 'Unit 10. 非同期処理・API レスポンス・JSON・エラー処理・Result 型';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 10 では、JavaScript 学習で扱った Promise / async / await / JSON / エラー処理を、
// TypeScript の型付きコードとして読み直す。
// 非同期処理そのものは JavaScript の仕組みだが、TypeScript では Promise<T>、unknown、Result 型、
// discriminated union などを使って「まだ来ていない値」「外部入力」「失敗する可能性」を型で表す。
//
// この Unit では、API 境界で unknown を使う理由、try-catch の error を安全に扱う理由、
// 例外ではなく Result 型で失敗を返す場面を、React のデータ取得状態へつながる形で確認する。
const runners: readonly Runner[] = [
  { title: 'Promise<T> の基本', run: runPromiseBasics },
  { title: 'async function の戻り値', run: runAsyncFunctionReturnTypes },
  { title: 'Awaited<T> と Promise.all', run: runAwaitedPromiseAll },
  { title: 'Promise.allSettled', run: runPromiseAllSettled },
  { title: 'fetch 風 response handling', run: runFetchResponseHandling },
  { title: 'JSON.parse と unknown 境界', run: runJsonUnknownBoundary },
  { title: 'type guard による簡易 validation', run: runTypeGuardValidation },
  { title: 'assertion function の入口', run: runAssertionFunctionBasics },
  { title: 'API response 型', run: runApiResponseShapes },
  { title: 'nullable / optional な API データ', run: runNullableOptionalApiData },
  { title: 'pagination / list / detail response', run: runPaginationListDetailResponse },
  { title: 'try-catch と unknown error', run: runTryCatchUnknownError },
  { title: 'custom error class', run: runCustomErrorClasses },
  { title: 'Result 型風の成功 / 失敗表現', run: runResultTypeBasics },
  { title: 'API result と validation result', run: runApiValidationResult },
  { title: 'React の API 取得状態につながる考え方', run: runReactApiStateConcepts },
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
console.log('Unit 10 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、非同期処理と API 境界の型チェック結果を確認する。');
