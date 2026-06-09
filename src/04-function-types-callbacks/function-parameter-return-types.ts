import assert from 'node:assert/strict';

type PriceInput = {
  readonly unitPrice: number;
  readonly quantity: number;
};

function calculateSubtotal(input: PriceInput): number {
  // 関数の引数には、必要な値の形を型として付ける。
  // Java のメソッド引数と似て見えるが、TypeScript では object の構造が合っていれば渡せる。
  // ここでは unitPrice と quantity が number であることを、コンパイル時に確認する。
  return input.unitPrice * input.quantity;
}

function formatPrice(price: number): string {
  // 戻り値の型を明示すると、この関数が外へ返す値を読み手に伝えられる。
  // 価格の計算結果を number のまま返す関数と、表示用 string に変換する関数を分けると、
  // 実務コードでも「計算」と「表示」の責務が読みやすくなる。
  return `${price.toLocaleString('ja-JP')}円`;
}

function buildOrderMessage(itemName: string, input: PriceInput): string {
  // 関数の中で別の関数を呼ぶ場合でも、引数と戻り値の型が分かっていると、
  // calculateSubtotal の結果が number、formatPrice の結果が string として読み進められる。
  const subtotal = calculateSubtotal(input);
  const formattedSubtotal = formatPrice(subtotal);

  return `${itemName}: ${formattedSubtotal}`;
}

export function runFunctionParameterReturnTypes(): void {
  console.log('このファイルでは、関数引数の型と戻り値の型を確認する。');

  const input: PriceInput = {
    unitPrice: 1200,
    quantity: 3,
  };

  const subtotal = calculateSubtotal(input);
  const formattedSubtotal = formatPrice(subtotal);
  const orderMessage = buildOrderMessage('TypeScript Book', input);

  console.log('1. 引数の型を持つ関数');
  console.log('input:', input);
  console.log('subtotal:', subtotal);

  console.log('');
  console.log('2. 戻り値の型を持つ関数');
  console.log('formattedSubtotal:', formattedSubtotal);
  console.log('orderMessage:', orderMessage);

  assert.equal(subtotal, 3600);
  assert.equal(formattedSubtotal, '3,600円');
  assert.equal(orderMessage, 'TypeScript Book: 3,600円');
}

export function functionParameterReturnTypeErrorExamples(): void {
  // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
  // 関数引数の型があることで、呼び出し側の間違いをコンパイル時に検出できる。
  // @ts-expect-error: quantity は number である必要があることを確認する。
  calculateSubtotal({ unitPrice: 1000, quantity: '2' });

  // 戻り値の型を明示している関数では、返す値が変わった場合も型チェックで気づきやすい。
  // @ts-expect-error: formatPrice は number を受け取るため、string は渡せないことを確認する。
  formatPrice('1000');
}
