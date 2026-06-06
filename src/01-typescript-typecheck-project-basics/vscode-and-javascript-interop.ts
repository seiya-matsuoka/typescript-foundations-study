import assert from 'node:assert/strict';

type EditorCheckPoint = {
  readonly name: string;
  readonly description: string;
};

type InteropTopic = {
  readonly name: string;
  readonly summary: string;
  readonly depth: 'overview';
};

const editorCheckPoints: readonly EditorCheckPoint[] = [
  {
    name: 'TypeScript の型エラー表示',
    description: 'VS Code 上で赤い波線や Problems から型エラーを確認する',
  },
  {
    name: 'ワークスペースの TypeScript',
    description: 'typescript.tsdk により node_modules 配下の TypeScript を使う',
  },
  {
    name: 'ESLint / Prettier',
    description: '保存時の整形や明らかなミスの検出を補助する',
  },
];

const interopTopics: readonly InteropTopic[] = [
  {
    name: 'allowJs',
    summary: 'JavaScript ファイルを TypeScript プロジェクトに含める設定',
    depth: 'overview',
  },
  {
    name: 'checkJs',
    summary: 'JavaScript ファイルにも型チェックを適用する設定',
    depth: 'overview',
  },
  {
    name: '// @ts-check',
    summary: 'JavaScript ファイル単位で型チェックを有効にするコメント',
    depth: 'overview',
  },
  {
    name: 'JSDoc',
    summary: 'JavaScript に型情報のヒントを書くためのコメント記法',
    depth: 'overview',
  },
];

export function runVscodeAndJavaScriptInterop(): void {
  console.log('このファイルでは、VS Code 上の確認観点と JavaScript 連携の入口を確認する。');

  // VS Code では、npm run typecheck を実行しなくても、エディタ上で型エラーを確認できる。
  // ただし、最終確認としてはターミナルで npm run typecheck を実行する方が確実である。
  console.log('VS Code 上で確認すること:');
  for (const checkPoint of editorCheckPoints) {
    console.log(`- ${checkPoint.name}: ${checkPoint.description}`);
  }

  // 今回の学習では、JavaScript から TypeScript への移行は深追いしない。
  // 既存 JavaScript と TypeScript を一緒に扱うための設定がある、という入口だけを押さえる。
  console.log('JavaScript との相互運用の入口:');
  for (const topic of interopTopics) {
    console.log(`- ${topic.name}: ${topic.summary}`);
  }

  assert.equal(editorCheckPoints.length, 3);
  assert.equal(interopTopics.length, 4);
  assert.ok(interopTopics.every((topic) => topic.depth === 'overview'));
}
