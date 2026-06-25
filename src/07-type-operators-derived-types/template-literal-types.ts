import assert from 'node:assert/strict';

type ResourceName = 'user' | 'book';
type ActionName = 'read' | 'write';
type PermissionName = `${ResourceName}:${ActionName}`;

type EventName = 'click' | 'submit';
type HandlerName = `on${Capitalize<EventName>}`;

const permissionLabels: Record<PermissionName, string> = {
  'user:read': 'ユーザー閲覧',
  'user:write': 'ユーザー更新',
  'book:read': '書籍閲覧',
  'book:write': '書籍更新',
};

const handlerDescriptions: Record<HandlerName, string> = {
  onClick: 'クリック時に実行する',
  onSubmit: '送信時に実行する',
};

function describePermission(permission: PermissionName): string {
  // template literal types は、文字列 literal union を組み合わせて新しい文字列 union を作る。
  // `${ResourceName}:${ActionName}` は、'user:read' | 'user:write' | 'book:read' | 'book:write' になる。
  //
  // 権限名、イベント名、CSS class 名、API path の一部など、
  // 文字列の命名規則を型で表したいときに使われる。
  return permissionLabels[permission];
}

function describeHandler(handlerName: HandlerName): string {
  // Capitalize は TypeScript が用意している文字列操作系の utility type である。
  // Unit 07 では、template literal types と組み合わせて handler 名を組み立てる入口だけ確認する。
  return handlerDescriptions[handlerName];
}

export function runTemplateLiteralTypes(): void {
  console.log('このファイルでは、template literal types と文字列 union の組み立てを確認する。');

  const readUserLabel = describePermission('user:read');
  const writeBookLabel = describePermission('book:write');
  const clickDescription = describeHandler('onClick');

  console.log('1. ResourceName と ActionName から PermissionName を作る');
  console.log('readUserLabel:', readUserLabel);
  console.log('writeBookLabel:', writeBookLabel);

  console.log('');
  console.log('2. EventName から handler 名を組み立てる');
  console.log('clickDescription:', clickDescription);

  assert.equal(readUserLabel, 'ユーザー閲覧');
  assert.equal(writeBookLabel, '書籍更新');
  assert.equal(clickDescription, 'クリック時に実行する');
}
