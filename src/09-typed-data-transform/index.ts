import { runArrayDictionaryConversion } from './array-dictionary-conversion.ts';
import { runDtoDomainViewModelTransform } from './dto-domain-viewmodel-transform.ts';
import { runFilterTypeGuard } from './filter-type-guard.ts';
import { runFilterTypeInference } from './filter-type-inference.ts';
import { runFindSomeEvery } from './find-some-every.ts';
import { runFlatMapSortToSorted } from './flatmap-sort-tosorted.ts';
import { runFromEntriesDictionaryTransform } from './from-entries-dictionary-transform.ts';
import { runGroupByAggregation } from './group-by-aggregation.ts';
import { runMapTypeInference } from './map-type-inference.ts';
import { runMapperPredicateFormatterNormalizer } from './mapper-predicate-formatter-normalizer.ts';
import { runNullableValuesFilterBoolean } from './nullable-values-filter-boolean.ts';
import { runObjectKeysValuesEntries } from './object-keys-values-entries.ts';
import { runReactListRenderingData } from './react-list-rendering-data.ts';
import { runReduceAccumulatorTypes } from './reduce-accumulator-types.ts';
import { runTypedArrayReadonlyTuple } from './typed-array-readonly-tuple.ts';

const unitTitle = 'Unit 09. 配列・オブジェクト操作と型付きデータ変換';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 09 では、JavaScript 学習で扱った配列・オブジェクト操作を、
// TypeScript の型付きコードとして読み直す。
// map / filter / reduce / find / Object.keys などは JavaScript としては見慣れていても、
// TypeScript では「戻り値に undefined が混ざるか」「callback の戻り値から型がどう推論されるか」
// 「Object.keys の戻り値がなぜ string[] になるか」など、型として確認すべき点が増える。
//
// 実務では、API DTO を画面表示用の view model に変換したり、
// 一覧データを辞書化・グループ化・集計したり、React の list rendering 用データを作ったりする。
// この Unit では、それらの処理を細かく分けて、コードだけでも読み進められるようにする。
const runners: readonly Runner[] = [
  { title: '型付き配列・readonly array・tuple', run: runTypedArrayReadonlyTuple },
  { title: 'map の型推論', run: runMapTypeInference },
  { title: 'filter の型推論', run: runFilterTypeInference },
  { title: 'type guard を使った filter', run: runFilterTypeGuard },
  { title: 'reduce の accumulator 型', run: runReduceAccumulatorTypes },
  { title: 'find と undefined / some / every', run: runFindSomeEvery },
  { title: 'flatMap / sort / toSorted', run: runFlatMapSortToSorted },
  { title: 'Object.keys / values / entries の型', run: runObjectKeysValuesEntries },
  { title: 'Object.fromEntries の型', run: runFromEntriesDictionaryTransform },
  { title: '配列から辞書へ・辞書から配列へ', run: runArrayDictionaryConversion },
  { title: 'group by 風処理と集計', run: runGroupByAggregation },
  {
    title: 'nullable な値を含む配列と filter(Boolean) の注意',
    run: runNullableValuesFilterBoolean,
  },
  {
    title: 'mapper / predicate / formatter / normalizer の型',
    run: runMapperPredicateFormatterNormalizer,
  },
  { title: 'DTO から domain model / view model への変換', run: runDtoDomainViewModelTransform },
  { title: 'React の list rendering に渡すデータ型', run: runReactListRenderingData },
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
console.log('Unit 09 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、配列・オブジェクト操作の型チェック結果を確認する。');
