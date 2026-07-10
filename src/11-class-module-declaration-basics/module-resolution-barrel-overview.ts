import assert from 'node:assert/strict';

import type { ProjectSummary } from './examples/barrel/index.ts';
import { createProjectLabel, projectStatusLabels } from './examples/barrel/index.ts';

type ModuleSettingOverview = {
  readonly topic: 'module resolution' | 'path alias';
  readonly summary: string;
};

export function runModuleResolutionBarrelOverview(): void {
  console.log('このファイルでは、barrel file・module resolution・path alias の概要を確認する。');

  const project: ProjectSummary = {
    id: 'project-001',
    title: 'Portfolio',
    status: 'active',
  };

  // barrel file は、複数ファイルの export を index.ts へまとめた公開口である。
  // import 側は個別ファイルではなく barrel file から値や型を読み込める。
  // 小規模なまとまりでは便利だが、使いすぎると依存元が見えづらくなるため、用途を決めて使う。
  const projectLabel = createProjectLabel(project);
  const statusLabel = projectStatusLabels[project.status];

  const settings: readonly ModuleSettingOverview[] = [
    {
      topic: 'module resolution',
      summary: 'import の指定から、どのファイルや package を読み込むかを解決する仕組み',
    },
    {
      topic: 'path alias',
      summary:
        '長い相対 path を短い別名で書くための設定。TypeScript 以外の実行環境側にも設定が必要になる場合がある',
    },
  ];

  // このリポジトリは NodeNext と allowImportingTsExtensions を使っているため、相対 import に .ts を付けている。
  // module resolution や path alias は tsconfig、bundler、実行環境の設定が関係するため、
  // Unit 11 では実際の alias 導入までは行わず、import が解決される仕組みの概要に留める。
  const settingLabels = settings.map((setting) => `${setting.topic}:${setting.summary}`);

  console.log('1. barrel file から value / type を import する');
  console.log('projectLabel:', projectLabel);
  console.log('statusLabel:', statusLabel);

  console.log('');
  console.log('2. module resolution と path alias の概要を確認する');
  console.log('settingLabels:', settingLabels);

  assert.equal(projectLabel, 'project-001:Portfolio');
  assert.equal(statusLabel, '進行中');
  assert.equal(settingLabels.length, 2);
}
