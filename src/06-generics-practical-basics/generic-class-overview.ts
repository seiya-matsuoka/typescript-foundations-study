import assert from 'node:assert/strict';

class MemoryCache<TKey extends string, TValue> {
  private readonly values = new Map<TKey, TValue>();

  constructor(readonly cacheName: string) {}

  set(key: TKey, value: TValue): void {
    // generic class では、インスタンスを作るときに TKey と TValue が決まる。
    // MemoryCache<'currentUser' | 'theme', string> なら、使えるキーと値の型が固定される。
    //
    // 関数の generics は「呼び出しごと」に型引数が決まる。
    // class の generics は、基本的に「インスタンスごと」に型引数が決まると読むと分かりやすい。
    // ここでは settingsCache というインスタンスの中で、TKey と TValue の関係が保たれる。
    this.values.set(key, value);
  }

  get(key: TKey): TValue | undefined {
    // Map#get は値が存在しない可能性があるため、戻り値は TValue | undefined になる。
    // noUncheckedIndexedAccess と同じように、取得できない可能性を型で扱う。
    //
    // TValue が string でも、get の戻り値は string ではなく string | undefined になる。
    // generics を使っていても、「値が存在しない可能性」は消えない点に注意する。
    return this.values.get(key);
  }

  entries(): readonly (readonly [TKey, TValue])[] {
    return [...this.values.entries()];
  }
}

export function runGenericClassOverview(): void {
  console.log('このファイルでは、generic class の概要を確認する。');

  type SettingKey = 'currentUser' | 'theme';

  const settingsCache = new MemoryCache<SettingKey, string>('settings-cache');
  settingsCache.set('currentUser', 'user-001');
  settingsCache.set('theme', 'dark');

  const currentUser = settingsCache.get('currentUser');
  const theme = settingsCache.get('theme');
  const entries = settingsCache.entries();

  console.log('1. class のインスタンス作成時に型引数を決める');
  console.log('cacheName:', settingsCache.cacheName);
  console.log('currentUser:', currentUser);
  console.log('theme:', theme);

  console.log('');
  console.log('2. entries でも TKey / TValue の関係が保たれる');
  console.log('entries:', entries);

  assert.equal(settingsCache.cacheName, 'settings-cache');
  assert.equal(currentUser, 'user-001');
  assert.equal(theme, 'dark');
  assert.deepEqual(entries, [
    ['currentUser', 'user-001'],
    ['theme', 'dark'],
  ]);
}
