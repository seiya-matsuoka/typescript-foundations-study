import assert from 'node:assert/strict';

type AppConfig = {
  readonly appName: string;
  readonly port: number;
  readonly mode: 'development' | 'production';
};

function createServerUrl(config: AppConfig): string {
  // config.port は number として型付けされているため、呼び出し側で文字列を渡すと型エラーになる。
  // ここでは戻り値の型を string と明示し、関数が何を返すのかを読みやすくしている。
  return `http://localhost:${config.port}/${config.appName}`;
}

export function runTypecheckAndRuntimeValues(): void {
  console.log('このファイルでは、型チェックと実行時の値の違いを確認する。');

  const config: AppConfig = {
    appName: 'typescript-foundations-study',
    port: 3000,
    mode: 'development',
  };

  const serverUrl = createServerUrl(config);

  // TypeScript は config が AppConfig の形に合っているかをコンパイル時に確認する。
  // 実行時に console.log で見えるのは、型そのものではなく JavaScript のオブジェクトと文字列である。
  console.log('アプリ設定:', config);
  console.log('生成した URL:', serverUrl);
  console.log('port の実行時 typeof:', typeof config.port);

  // @ts-expect-error: number の場所に string を代入すると型エラーになることを確認する。
  const invalidPort: number = '3000';

  // 上の行は型チェック上はエラーになるが、@ts-expect-error により「意図した型エラー」として残している。
  // 実行時には TypeScript の型注釈は消えるため、invalidPort には文字列の値が入っている。
  // この例は、型チェックと実行時の値が別の観点であることを確認するためのもの。
  console.log('@ts-expect-error で残した値:', invalidPort);
  console.log('invalidPort の実行時 typeof:', typeof invalidPort);

  // TypeScript の型は、外部から来た値を実行時に自動で検証するものではない。
  // API レスポンスや JSON のような外部入力は、後続 Unit で unknown や type guard を使って扱う。
  const externalValue: unknown = {
    appName: 'from-api',
    port: '3000',
  };

  console.log('外部入力として受け取った値:', externalValue);

  assert.equal(serverUrl, 'http://localhost:3000/typescript-foundations-study');
  assert.equal(typeof config.port, 'number');
  assert.equal(typeof invalidPort, 'string');
  assert.equal(typeof externalValue, 'object');
}
