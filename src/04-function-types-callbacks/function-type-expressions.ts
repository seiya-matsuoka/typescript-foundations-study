import assert from 'node:assert/strict';

type Product = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

function applyDiscount(
  product: Product,
  discountRate: number,
  calculate: (price: number, rate: number) => number,
): Product {
  // (price: number, rate: number) => number は function type expression である。
  // 「number と number を受け取り、number を返す関数」を引数として受け取る。
  // JavaScript では関数を値として渡せるが、TypeScript ではその関数の引数と戻り値も型で表せる。
  const discountedPrice = calculate(product.price, discountRate);

  return {
    ...product,
    price: discountedPrice,
  };
}

export function runFunctionTypeExpressions(): void {
  console.log('このファイルでは、function type expression を確認する。');

  const product: Product = {
    id: 'product-001',
    name: 'TypeScript Book',
    price: 3000,
  };

  const calculateTenPercentOff = (price: number, rate: number): number => {
    // コールバックとして渡す関数にも、引数と戻り値の型を書ける。
    // ここでは戻り値型を明示しているが、式が単純であれば推論に任せる選択もできる。
    return Math.round(price * (1 - rate));
  };

  const discountedProduct = applyDiscount(product, 0.1, calculateTenPercentOff);

  console.log('1. 関数を引数として受け取る');
  console.log('product:', product);
  console.log('discountedProduct:', discountedProduct);

  assert.deepEqual(discountedProduct, {
    id: 'product-001',
    name: 'TypeScript Book',
    price: 2700,
  });
}

export function functionTypeExpressionErrorExamples(): void {
  const product: Product = {
    id: 'product-002',
    name: 'React Book',
    price: 3200,
  };

  // この関数は型チェック用の例であり、Unit 実行時には呼び出さない。
  // calculate の戻り値は number である必要がある。
  // @ts-expect-error: calculate は number を返す必要があることを確認する。
  applyDiscount(product, 0.1, (price: number) => `${price}`);
}
