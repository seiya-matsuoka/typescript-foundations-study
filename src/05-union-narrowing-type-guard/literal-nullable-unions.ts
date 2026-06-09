import assert from 'node:assert/strict';

type UserRole = 'admin' | 'member' | 'guest';
type ThemeMode = 'light' | 'dark' | 'system';
type SelectedProjectId = string | null;

function getRoleLabel(role: UserRole): string {
  // literal union は、許可する具体的な値を限定するために使う。
  // role を単なる string にすると 'owner' や 'unknown' なども渡せてしまう。
  // 'admin' | 'member' | 'guest' と書くことで、選択肢を型として固定できる。
  if (role === 'admin') {
    return '管理者';
  }

  if (role === 'member') {
    return 'メンバー';
  }

  return 'ゲスト';
}

function getThemeLabel(mode: ThemeMode): string {
  // UI の表示モードや状態のように、候補が決まっている値は literal union と相性がよい。
  // React の props や state でも、variant や status のような値で頻繁に使う。
  switch (mode) {
    case 'light':
      return 'ライト';
    case 'dark':
      return 'ダーク';
    case 'system':
      return 'システム設定';
  }
}

function formatSelectedProject(projectId: SelectedProjectId): string {
  // nullable union は、値がある場合とない場合を型で表す。
  // null を候補に含めた場合、使う前に null ではないことを確認する必要がある。
  if (projectId === null) {
    return 'プロジェクト未選択';
  }

  return `選択中: ${projectId}`;
}

export function runLiteralNullableUnions(): void {
  console.log('このファイルでは、literal union と nullable union を確認する。');

  const roleLabel = getRoleLabel('admin');
  const themeLabel = getThemeLabel('system');
  const selectedProjectLabel = formatSelectedProject('project-001');
  const emptyProjectLabel = formatSelectedProject(null);

  console.log('1. literal union');
  console.log('roleLabel:', roleLabel);
  console.log('themeLabel:', themeLabel);

  console.log('');
  console.log('2. nullable union');
  console.log('selectedProjectLabel:', selectedProjectLabel);
  console.log('emptyProjectLabel:', emptyProjectLabel);

  assert.equal(roleLabel, '管理者');
  assert.equal(themeLabel, 'システム設定');
  assert.equal(selectedProjectLabel, '選択中: project-001');
  assert.equal(emptyProjectLabel, 'プロジェクト未選択');
}
