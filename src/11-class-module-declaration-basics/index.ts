import { runAbstractStaticGeneric } from './abstract-static-generic.ts';
import { runClassBasicsAccess } from './class-basics-access.ts';
import { runDeclarationFilesBasics } from './declaration-files-basics.ts';
import { runImplementsStructuralTyping } from './implements-structural-typing.ts';
import { runModuleImportExport } from './module-import-export.ts';
import { runModuleResolutionBarrelOverview } from './module-resolution-barrel-overview.ts';
import { runPrivateFieldComparison } from './private-field-comparison.ts';
import { runTypeDefinitionSources } from './type-definition-sources.ts';

const unitTitle = 'Unit 11. class・implements・module・型定義ファイルの基本';

type Runner = {
  readonly title: string;
  readonly run: () => void;
};

// Unit 11 では、TypeScript の class、module、型定義ファイルを標準レベルで確認する。
// Java 経験者にとって class / interface は馴染みがある一方、
// TypeScript は structural typing が基本であり、Java と同じ感覚だけでは読めない箇所がある。
//
// React を含む TypeScript の実務コードでは、class だけを中心に設計するとは限らない。
// そのため、class の細かな機能を広げすぎず、既存コードを読み、必要な場面で使える範囲に絞る。
const runners: readonly Runner[] = [
  { title: 'class・constructor・access modifier・parameter properties', run: runClassBasicsAccess },
  { title: 'implements・interface・structural typing', run: runImplementsStructuralTyping },
  { title: 'abstract class・static member・class generic', run: runAbstractStaticGeneric },
  { title: 'TypeScript private と JavaScript #private', run: runPrivateFieldComparison },
  { title: 'import / export・named / default・type-only import', run: runModuleImportExport },
  {
    title: 'barrel file・module resolution・path alias の概要',
    run: runModuleResolutionBarrelOverview,
  },
  { title: '.d.ts・declare・ambient declaration', run: runDeclarationFilesBasics },
  { title: '@types/*・Node.js・ブラウザ・React の型定義', run: runTypeDefinitionSources },
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
  runner.run();
}

console.log('');
console.log('Unit 11 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、class・module・型定義ファイルの型チェック結果を確認する。');
