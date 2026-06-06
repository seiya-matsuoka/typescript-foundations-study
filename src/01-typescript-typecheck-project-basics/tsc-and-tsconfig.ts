import assert from 'node:assert/strict';

type CompilerOptionSummary = {
  readonly name: string;
  readonly category: 'typecheck' | 'emit' | 'module' | 'file-scope' | 'library';
  readonly role: string;
};

type TypecheckCommand = {
  readonly command: string;
  readonly purpose: string;
  readonly emitsFiles: boolean;
};

const typecheckCommand: TypecheckCommand = {
  command: 'tsc --noEmit',
  purpose: '型チェックだけを行う',
  emitsFiles: false,
};

const compilerOptions: readonly CompilerOptionSummary[] = [
  {
    name: 'strict',
    category: 'typecheck',
    role: '型チェックを厳しめにする',
  },
  {
    name: 'target',
    category: 'emit',
    role: '出力される JavaScript の構文レベルを決める',
  },
  {
    name: 'module',
    category: 'module',
    role: 'モジュール形式を決める',
  },
  {
    name: 'moduleResolution',
    category: 'module',
    role: 'import の解決方法を決める',
  },
  {
    name: 'lib',
    category: 'library',
    role: '利用できる標準 API や DOM API の型定義を決める',
  },
  {
    name: 'include',
    category: 'file-scope',
    role: '型チェック対象に含めるファイルを決める',
  },
  {
    name: 'exclude',
    category: 'file-scope',
    role: '型チェック対象から外すファイルを決める',
  },
  {
    name: 'noEmit',
    category: 'emit',
    role: 'JavaScript ファイルなどの出力を行わない',
  },
  {
    name: 'outDir',
    category: 'emit',
    role: '出力ファイルの配置先を決める',
  },
  {
    name: 'rootDir',
    category: 'file-scope',
    role: '入力ファイルのルートディレクトリを決める',
  },
];

function printOptionsByCategory(category: CompilerOptionSummary['category']): void {
  const matchedOptions = compilerOptions.filter((option) => option.category === category);

  // filter の結果は CompilerOptionSummary[] として扱われる。
  // ここでは型の細かい話より、設定項目をカテゴリごとに整理して読むことを重視する。
  for (const option of matchedOptions) {
    console.log(`- ${option.name}: ${option.role}`);
  }
}

export function runTscAndTsconfig(): void {
  console.log('このファイルでは、tsc --noEmit と tsconfig.json の主要項目を確認する。');

  // tsc は TypeScript コンパイラである。
  // このリポジトリでは、JavaScript ファイルの出力ではなく、型チェックを目的として tsc --noEmit を使う。
  console.log('型チェックコマンド:', typecheckCommand.command);
  console.log('目的:', typecheckCommand.purpose);
  console.log('ファイルを出力するか:', typecheckCommand.emitsFiles);

  console.log('型チェックに関係する設定:');
  printOptionsByCategory('typecheck');

  console.log('出力に関係する設定:');
  printOptionsByCategory('emit');

  console.log('モジュールに関係する設定:');
  printOptionsByCategory('module');

  console.log('対象ファイルに関係する設定:');
  printOptionsByCategory('file-scope');

  console.log('利用できる API の型定義に関係する設定:');
  printOptionsByCategory('library');

  const noEmitOption = compilerOptions.find((option) => option.name === 'noEmit');
  const rootDirOption = compilerOptions.find((option) => option.name === 'rootDir');
  const includeOption = compilerOptions.find((option) => option.name === 'include');

  assert.equal(typecheckCommand.emitsFiles, false);
  assert.equal(compilerOptions.length, 10);
  assert.equal(noEmitOption?.role, 'JavaScript ファイルなどの出力を行わない');
  assert.equal(rootDirOption?.category, 'file-scope');
  assert.equal(includeOption?.category, 'file-scope');
}
