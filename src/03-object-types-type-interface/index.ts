import { runApiDtoDomainViewModels } from './api-dto-domain-view-models.ts';
import { runExcessPropertyChecks } from './excess-property-checks.ts';
import { runFormValuesAndConfigObjects } from './form-values-and-config-objects.ts';
import { runIndexSignatureAndRecord } from './index-signature-and-record.ts';
import { runInterfaceBasics } from './interface-basics.ts';
import { runMethodAndFunctionProperties } from './method-and-function-properties.ts';
import { runNestedObjectTypes } from './nested-object-types.ts';
import { runObjectLiteralAndRuntimeObject } from './object-literal-and-runtime-object.ts';
import { runObjectTypeBasics } from './object-type-basics.ts';
import { runOptionalReadonlyProperties } from './optional-readonly-properties.ts';
import { runStructuralTyping } from './structural-typing.ts';
import { runTypeAliasBasics } from './type-alias-basics.ts';
import { runTypeVsInterface } from './type-vs-interface.ts';

const unitTitle = 'Unit 03. オブジェクト型・type / interface・構造的型付け';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 03 では、TypeScript の実務で頻出するオブジェクト型を厚めに扱う。
// API response、form values、props、config object など、実務コードで扱う多くの値は
// 「複数のプロパティを持つ object」として表現される。
const runners: readonly Runner[] = [
  { title: 'object type と具体的なプロパティを持つ型', run: runObjectTypeBasics },
  { title: 'type alias によるオブジェクト型', run: runTypeAliasBasics },
  { title: 'interface によるオブジェクト型', run: runInterfaceBasics },
  { title: 'type と interface の使い分けの入口', run: runTypeVsInterface },
  {
    title: 'optional property・readonly property・undefined との違い',
    run: runOptionalReadonlyProperties,
  },
  { title: 'nested object type', run: runNestedObjectTypes },
  { title: 'method property と function property', run: runMethodAndFunctionProperties },
  { title: 'index signature と Record<K, V> の入口', run: runIndexSignatureAndRecord },
  { title: 'object literal と excess property checks', run: runExcessPropertyChecks },
  { title: 'structural typing と Java の class / interface との違い', run: runStructuralTyping },
  { title: '型としての object と実行時の object', run: runObjectLiteralAndRuntimeObject },
  { title: 'DTO・domain model・view model・API response 的な型', run: runApiDtoDomainViewModels },
  { title: 'form values と設定オブジェクトの型', run: runFormValuesAndConfigObjects },
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
console.log('Unit 03 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、オブジェクト型の型チェック結果を確認する。');
