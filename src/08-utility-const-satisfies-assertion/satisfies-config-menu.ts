import assert from 'node:assert/strict';

type RoutePath = '/' | '/projects' | '/settings';
type MenuItem = {
  readonly label: string;
  readonly path: RoutePath;
  readonly requiresAuth: boolean;
};

const menuConfig = {
  home: {
    label: 'Home',
    path: '/',
    requiresAuth: false,
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    requiresAuth: false,
  },
  settings: {
    label: 'Settings',
    path: '/settings',
    requiresAuth: true,
  },
} as const satisfies Record<string, MenuItem>;

type MenuKey = keyof typeof menuConfig;
type MenuPath = (typeof menuConfig)[MenuKey]['path'];

function createMenuLinks(): readonly string[] {
  // satisfies を使うと、menuConfig が Record<string, MenuItem> の形を満たすことを確認しつつ、
  // home / projects / settings という具体的なキーや、'/' | '/projects' | '/settings' という値の literal 型を保ちやすい。
  // config object、menu、route、status、options 定義では、この組み合わせをよく見る。
  return Object.values(menuConfig).map((item) => `${item.label}:${item.path}`);
}

function isMenuPath(path: string): path is MenuPath {
  const menuPaths = Object.values(menuConfig).map((item) => item.path);

  return (menuPaths as readonly string[]).includes(path);
}

export function runSatisfiesConfigMenu(): void {
  console.log('このファイルでは、satisfies と config / menu 定義を確認する。');

  const menuLinks = createMenuLinks();
  const settingsPathCheck = isMenuPath('/settings');
  const unknownPathCheck = isMenuPath('/admin');

  console.log('1. menuConfig から menu link を作る');
  console.log('menuLinks:', menuLinks);

  console.log('');
  console.log('2. config の値から MenuPath union を作る');
  console.log('settingsPathCheck:', settingsPathCheck);
  console.log('unknownPathCheck:', unknownPathCheck);

  assert.deepEqual(menuLinks, ['Home:/', 'Projects:/projects', 'Settings:/settings']);
  assert.equal(settingsPathCheck, true);
  assert.equal(unknownPathCheck, false);
}
