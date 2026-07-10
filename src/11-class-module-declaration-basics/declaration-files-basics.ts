import './examples/ambient-globals.d.ts';
import './examples/sample-library.d.ts';

import assert from 'node:assert/strict';

type ExternalUser = StudyLibrary.User;

type RuntimeInfo = {
  readonly version: typeof __APP_VERSION__;
  readonly appName: NonNullable<Window['studyAppName']>;
};

function createExternalUserLabel(user: ExternalUser): string {
  // sample-library.d.ts の declare namespace により、StudyLibrary.User という型を参照できる。
  // .d.ts は実行時の処理を書くファイルではなく、既に存在する値や library の型を説明するファイルである。
  return `${user.id}:${user.name}`;
}

function createRuntimeInfo(version: string, appName: string): RuntimeInfo {
  // ambient declaration は、現在の module の外側に存在する global な値や型を宣言する。
  // declare const __APP_VERSION__: string は、実行時に値を作るのではなく、
  // 「その名前の string 値が外部に存在する」という前提を TypeScript へ伝える。
  //
  // このサンプルでは global 値を実際に読み込まず、typeof __APP_VERSION__ を型としてだけ利用する。
  return {
    version,
    appName,
  };
}

export function runDeclarationFilesBasics(): void {
  console.log('このファイルでは、.d.ts・declare・ambient declaration を確認する。');

  const user: ExternalUser = {
    id: 'user-001',
    name: 'Sato',
  };
  const userLabel = createExternalUserLabel(user);
  const runtimeInfo = createRuntimeInfo('1.0.0', 'typescript-foundations-study');

  console.log('1. .d.ts で説明された型を参照する');
  console.log('user:', user);
  console.log('userLabel:', userLabel);

  console.log('');
  console.log('2. ambient declaration を型コンテキストで使う');
  console.log('runtimeInfo:', runtimeInfo);

  assert.deepEqual(user, { id: 'user-001', name: 'Sato' });
  assert.equal(userLabel, 'user-001:Sato');
  assert.deepEqual(runtimeInfo, {
    version: '1.0.0',
    appName: 'typescript-foundations-study',
  });
}
