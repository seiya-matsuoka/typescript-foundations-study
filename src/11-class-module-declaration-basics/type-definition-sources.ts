import assert from 'node:assert/strict';

type TypeDefinitionSource = {
  readonly environment: 'Node.js' | 'Browser DOM' | 'React';
  readonly source: '@types package' | 'TypeScript lib';
  readonly example: string;
};

type BrowserTitle = Document['title'];

function createSourceLabel(source: TypeDefinitionSource): string {
  return `${source.environment}:${source.source}`;
}

export function runTypeDefinitionSources(): void {
  console.log(
    'このファイルでは、@types/*・Node.js・ブラウザ・React の型定義が来る場所を確認する。',
  );

  const browserTitle: BrowserTitle = 'TypeScript Foundations Study';
  const nodeRuntimeName = process.release.name;

  const sources: readonly TypeDefinitionSource[] = [
    {
      environment: 'Node.js',
      source: '@types package',
      example: '@types/node により process や node:assert などの型を利用する',
    },
    {
      environment: 'Browser DOM',
      source: 'TypeScript lib',
      example: 'tsconfig の lib に DOM を含めると Document や Window などの型を利用する',
    },
    {
      environment: 'React',
      source: '@types package',
      example: '一般的な構成では @types/react や @types/react-dom から React 関連の型を利用する',
    },
  ];

  // 型定義は、すべて自分で .d.ts を書くわけではない。
  // Node.js のように DefinitelyTyped の @types package から入るもの、
  // ブラウザ DOM のように TypeScript の標準 lib から入るものがある。
  //
  // 型エラーを調査するときは、値の実装だけでなく「その型がどの package / lib から来ているか」を確認する。
  const sourceLabels = sources.map((source) => createSourceLabel(source));

  console.log('1. Node.js / DOM の型が実際に使えることを確認する');
  console.log('nodeRuntimeName:', nodeRuntimeName);
  console.log('browserTitle:', browserTitle);

  console.log('');
  console.log('2. 型定義の主な出どころを分類する');
  console.log('sourceLabels:', sourceLabels);

  assert.equal(nodeRuntimeName, 'node');
  assert.equal(browserTitle, 'TypeScript Foundations Study');
  assert.deepEqual(sourceLabels, [
    'Node.js:@types package',
    'Browser DOM:TypeScript lib',
    'React:@types package',
  ]);
}
