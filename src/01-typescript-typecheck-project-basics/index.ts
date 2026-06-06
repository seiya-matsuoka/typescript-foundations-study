import { runLanguageAndRuntime } from './language-and-runtime.ts';
import { runNodeNpmTooling } from './node-npm-tooling.ts';
import { runTscAndTsconfig } from './tsc-and-tsconfig.ts';
import { runTypecheckAndRuntimeValues } from './typecheck-and-runtime-values.ts';
import { runVscodeAndJavaScriptInterop } from './vscode-and-javascript-interop.ts';

const unitTitle = 'Unit 01. TypeScript の位置づけ・型チェック・プロジェクト設定の基本';

type Runner = {
  readonly title: string;
  readonly run: () => void | Promise<void>;
};

// Unit 01 では、TypeScript の文法そのものを深掘りする前に、
// 「何が型チェックで、何が実行時の値なのか」を読むための前提を確認する。
// index.ts は Unit 全体の入口として、各テーマの実行順とコンソール出力の区切りを管理する。
const runners: readonly Runner[] = [
  { title: 'TypeScript と JavaScript の関係・実行時に残る値', run: runLanguageAndRuntime },
  { title: '型チェックと実行時の値の違い', run: runTypecheckAndRuntimeValues },
  { title: 'tsc --noEmit と tsconfig.json の基本', run: runTscAndTsconfig },
  { title: 'Node.js 実行・npm scripts・開発ツールの役割', run: runNodeNpmTooling },
  { title: 'VS Code 上の型エラー確認と JavaScript 連携の入口', run: runVscodeAndJavaScriptInterop },
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

// 各ファイルの run 関数は同期処理として作っているが、
// 今後の Unit では非同期処理を扱う可能性がある。
// top-level await を使うことで、同期・非同期どちらの run 関数でも同じ形で呼び出せる。
for (const [index, runner] of runners.entries()) {
  printSectionHeader(index + 1, runner.title);
  await runner.run();
}

console.log('');
console.log('Unit 01 のサンプルをすべて実行した。');
console.log('次は npm run typecheck で、実行結果とは別に型チェックの結果を確認する。');
