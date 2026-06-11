import { runApiResponseGenerics } from './api-response-generics.ts';
import { runArrayProcessingGenerics } from './array-processing-generics.ts';
import { runConstraintsExtends } from './constraints-extends.ts';
import { runDefaultTypeParameters } from './default-type-parameters.ts';
import { runExplicitTypeArguments } from './explicit-type-arguments.ts';
import { runGenericClassOverview } from './generic-class-overview.ts';
import { runGenericFunctionBasics } from './generic-function-basics.ts';
import { runGenericInterfaceBasics } from './generic-interface-basics.ts';
import { runGenericTypeAliasBasics } from './generic-type-alias-basics.ts';
import { runKeyofGenericsBasics } from './keyof-generics-basics.ts';
import { runMapperSelectorGenerics } from './mapper-selector-generics.ts';
import { runReactCustomHookConcepts } from './react-custom-hook-concepts.ts';
import { runRepositoryGenerics } from './repository-generics.ts';
import { runResultTypeGenerics } from './result-type-generics.ts';
import { runTypeArgumentInference } from './type-argument-inference.ts';

const unitTitle = 'Unit 06. generics の基本と実務的な使い方';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 06 では、generics を「型パズル」ではなく、
// 関数・配列処理・API response・Result 型・repository 風関数で自然に使うものとして確認する。
// それぞれのファイルでは、型引数 T や TData がどこから決まるのかをコメントで追えるようにする。
//
// JavaScript の関数では、値を受け取って値を返す流れだけを追えばよかった。
// TypeScript の generics では、それに加えて「その値に対応する型がどこへ受け渡されるか」も読む。
// そのため、各サンプルでは T / TItem / TData / TError / TEntity などの名前が、
// どの引数・戻り値・callback・外側の型と結び付いているかを意識する。
const runners: readonly Runner[] = [
  { title: 'generic function の基本', run: runGenericFunctionBasics },
  { title: '型引数の推論', run: runTypeArgumentInference },
  { title: '明示的な型引数', run: runExplicitTypeArguments },
  { title: 'generic type alias', run: runGenericTypeAliasBasics },
  { title: 'generic interface', run: runGenericInterfaceBasics },
  { title: 'generic class の概要', run: runGenericClassOverview },
  { title: 'constraints と extends', run: runConstraintsExtends },
  { title: 'default type parameter', run: runDefaultTypeParameters },
  { title: 'keyof と組み合わせた generics の入口', run: runKeyofGenericsBasics },
  { title: '配列処理での generics', run: runArrayProcessingGenerics },
  { title: 'mapper / selector 関数での generics', run: runMapperSelectorGenerics },
  { title: 'API response 型での generics', run: runApiResponseGenerics },
  { title: 'Result 型での generics', run: runResultTypeGenerics },
  { title: 'repository 風関数での generics', run: runRepositoryGenerics },
  { title: 'React の custom hook 型につながる考え方', run: runReactCustomHookConcepts },
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
console.log('Unit 06 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、generics の型チェック結果を確認する。');
