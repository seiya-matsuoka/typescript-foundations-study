import assert from 'node:assert/strict';

const routeConfig = {
  home: {
    path: '/',
    title: 'ホーム',
  },
  books: {
    path: '/books',
    title: '書籍一覧',
  },
  settings: {
    path: '/settings',
    title: '設定',
  },
} as const;

type RouteName = keyof typeof routeConfig;
type RoutePath = (typeof routeConfig)[RouteName]['path'];
type RouteTitle = (typeof routeConfig)[RouteName]['title'];

function buildLink(name: RouteName): { readonly path: RoutePath; readonly title: RouteTitle } {
  // object から union 型を作る場合、key の union と value の union の両方を取り出せる。
  // keyof typeof routeConfig は 'home' | 'books' | 'settings' になる。
  // (typeof routeConfig)[RouteName]['path'] は '/' | '/books' | '/settings' になる。
  //
  // ルーティング設定、画面名、メニュー設定、権限定義など、
  // 実務では「設定オブジェクトを1つ置き、そこから型を派生させる」形がよく使われる。
  return routeConfig[name];
}

function getRouteNames(): readonly RouteName[] {
  return Object.keys(routeConfig) as RouteName[];
}

export function runObjectToUnion(): void {
  console.log('このファイルでは、オブジェクトから union 型を作る方法を確認する。');

  const booksLink = buildLink('books');
  const routeNames = getRouteNames();

  console.log('1. routeConfig の key から RouteName を作る');
  console.log('routeNames:', routeNames);

  console.log('');
  console.log('2. routeConfig の value から path / title の union を作る');
  console.log('booksLink:', booksLink);

  assert.deepEqual(routeNames, ['home', 'books', 'settings']);
  assert.deepEqual(booksLink, {
    path: '/books',
    title: '書籍一覧',
  });
}
