import assert from 'node:assert/strict';

type RuntimePlan = {
  readonly runtime: 'Node.js';
  readonly moduleSystem: 'ES Modules';
  readonly packageType: 'module';
  readonly entryFile: string;
};

type ScriptRole = {
  readonly scriptName: string;
  readonly command: string;
  readonly role: string;
};

const runtimePlan: RuntimePlan = {
  runtime: 'Node.js',
  moduleSystem: 'ES Modules',
  packageType: 'module',
  entryFile: 'src/01-typescript-typecheck-project-basics/index.ts',
};

const scriptRoles: readonly ScriptRole[] = [
  {
    scriptName: 'unit:01',
    command: 'tsx src/01-typescript-typecheck-project-basics/index.ts',
    role: 'Unit 01 の TypeScript ファイルを実行する',
  },
  {
    scriptName: 'typecheck',
    command: 'tsc --noEmit',
    role: 'TypeScript の型チェックを行う',
  },
  {
    scriptName: 'lint',
    command: 'eslint .',
    role: '明らかなミスや未使用変数を見つける',
  },
  {
    scriptName: 'format:check',
    command: 'prettier --check .',
    role: '整形が必要なファイルがないか確認する',
  },
];

export function runNodeNpmTooling(): void {
  console.log('このファイルでは、Node.js 実行・npm scripts・開発ツールの役割を確認する。');

  // package.json に type: "module" を指定しているため、このリポジトリは ES Modules 前提でコードを書く。
  // import / export は TypeScript のためだけの構文ではなく、JavaScript のモジュールとして実行される。
  console.log('実行環境:', runtimePlan.runtime);
  console.log('モジュール形式:', runtimePlan.moduleSystem);
  console.log('package.json の type:', runtimePlan.packageType);
  console.log('実行入口:', runtimePlan.entryFile);

  // npm scripts は、よく使うコマンドに名前を付けるための仕組みである。
  // 学習中も「実行」「型チェック」「Lint」「Format」を分けると、何を確認しているのかが明確になる。
  console.log('npm scripts の役割:');
  for (const script of scriptRoles) {
    console.log(`- npm run ${script.scriptName}: ${script.command}`);
    console.log(`  ${script.role}`);
  }

  assert.equal(runtimePlan.runtime, 'Node.js');
  assert.equal(runtimePlan.moduleSystem, 'ES Modules');
  assert.equal(scriptRoles[0]?.scriptName, 'unit:01');
  assert.equal(scriptRoles[1]?.command, 'tsc --noEmit');
}
