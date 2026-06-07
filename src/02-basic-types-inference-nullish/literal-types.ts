import assert from 'node:assert/strict';

type PrimaryRole = 'admin';
type HttpMethod = 'GET' | 'POST';

function buildEndpoint(method: HttpMethod, path: string): string {
  return `${method} ${path}`;
}

export function runLiteralTypes(): void {
  console.log('[literal-types.ts]');
  console.log('literal type の入口を確認する');
  console.log('');

  const adminRole: PrimaryRole = 'admin';
  const inferredRole = 'member';

  // literal type は、string 全般ではなく特定の値だけを許可する型である。
  // 'admin' 型は、'admin' という1つの値だけを受け入れる。
  console.log('1. 特定の文字列だけを許可する型');
  console.log('adminRole:', adminRole);
  console.log('inferredRole:', inferredRole);
  console.log('');

  const getBooksEndpoint = buildEndpoint('GET', '/books');
  const createBookEndpoint = buildEndpoint('POST', '/books');

  // literal type は単体でも使えるが、実務では union type と組み合わせることが多い。
  // HttpMethod は 'GET' または 'POST' のどちらかだけを許可する。
  console.log('2. literal type を使った関数引数');
  console.log('getBooksEndpoint:', getBooksEndpoint);
  console.log('createBookEndpoint:', createBookEndpoint);
  console.log('');

  // @ts-expect-error: PrimaryRole は 'admin' だけを許可することを確認する。
  const invalidRole: PrimaryRole = 'member';

  // @ts-expect-error: HttpMethod に含まれない値は渡せないことを確認する。
  const invalidEndpoint = buildEndpoint('PATCH', '/books/1');

  console.log('3. 意図した型エラーの実行時の値');
  console.log('invalidRole runtime value:', invalidRole);
  console.log('invalidEndpoint runtime value:', invalidEndpoint);

  assert.equal(adminRole, 'admin');
  assert.equal(inferredRole, 'member');
  assert.equal(getBooksEndpoint, 'GET /books');
  assert.equal(createBookEndpoint, 'POST /books');
  assert.equal(invalidRole, 'member');
  assert.equal(invalidEndpoint, 'PATCH /books/1');
}
