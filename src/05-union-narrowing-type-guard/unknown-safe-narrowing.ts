import assert from 'node:assert/strict';

type ProductPayload = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  // unknown は「まだ何か分からない値」であり、いきなりプロパティへアクセスできない。
  // まず object であること、かつ null ではないことを確認する。
  // Record<string, unknown> へ絞ることで、キーアクセスはできるが、各値はまだ unknown のまま残る。
  return typeof value === 'object' && value !== null;
}

function isProductPayload(value: unknown): value is ProductPayload {
  // 外部入力を安全に扱うときは、unknown から段階的に narrowing する。
  // ここでは「オブジェクトである」「各プロパティが期待する型である」を確認してから、
  // value is ProductPayload として呼び出し側に伝えている。
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number'
  );
}

function formatProductPayload(value: unknown): string {
  if (!isProductPayload(value)) {
    return 'invalid product payload';
  }

  // isProductPayload(value) が true だった後なので、ここでは value は ProductPayload として扱える。
  // API レスポンスや JSON.parse の結果を扱うときに、この段階的な絞り込みが重要になる。
  return `${value.title}: ${value.price.toLocaleString('ja-JP')}円`;
}

export function runUnknownSafeNarrowing(): void {
  console.log('このファイルでは、unknown から安全に型を絞る流れを確認する。');

  const validPayload: unknown = {
    id: 'product-001',
    title: 'TypeScript Book',
    price: 2800,
  };

  const invalidPayload: unknown = {
    id: 'product-002',
    title: 'Broken Product',
    price: '2800',
  };

  const nonObjectPayload: unknown = 'not object';

  const formattedValidPayload = formatProductPayload(validPayload);
  const formattedInvalidPayload = formatProductPayload(invalidPayload);
  const formattedNonObjectPayload = formatProductPayload(nonObjectPayload);

  console.log('1. unknown から ProductPayload へ絞る');
  console.log('formattedValidPayload:', formattedValidPayload);

  console.log('');
  console.log('2. 期待する形ではない値を弾く');
  console.log('formattedInvalidPayload:', formattedInvalidPayload);
  console.log('formattedNonObjectPayload:', formattedNonObjectPayload);

  assert.equal(formattedValidPayload, 'TypeScript Book: 2,800円');
  assert.equal(formattedInvalidPayload, 'invalid product payload');
  assert.equal(formattedNonObjectPayload, 'invalid product payload');
}
