import assert from 'node:assert/strict';

type CartItem = {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
};

type CartCalculator = {
  readonly items: readonly CartItem[];
  total(): number;
  formatItem: (item: CartItem) => string;
};

function createCartCalculator(items: readonly CartItem[]): CartCalculator {
  // method property は total(): number のように、オブジェクトに属する振る舞いとして書ける。
  // function property は formatItem: (item) => string のように、関数値をプロパティとして持つ形で書ける。
  //
  // どちらも「オブジェクトが関数を持つ」点では似ている。
  // React の props では onClick: () => void のような function property を頻繁に見るため、
  // オブジェクト型の中に関数型が入る読み方に慣れておくとよい。
  return {
    items,
    total() {
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    formatItem: (item) => `${item.name} x ${item.quantity}`,
  };
}

export function runMethodAndFunctionProperties(): void {
  console.log('このファイルでは、method property と function property を確認する。');

  const items: readonly CartItem[] = [
    {
      name: 'TypeScript Book',
      price: 2800,
      quantity: 1,
    },
    {
      name: 'React Book',
      price: 3200,
      quantity: 2,
    },
  ];

  // items は readonly CartItem[] として扱う。
  // 配列そのものを書き換えることを目的にしていないため、読み取り専用の配列として渡している。
  // Unit 02 の readonly tuple / readonly array の考え方がここにもつながる。
  const calculator = createCartCalculator(items);
  const total = calculator.total();
  const formattedItems = calculator.items.map((item) => calculator.formatItem(item));

  console.log('1. method property');
  console.log('total:', total);

  console.log('');
  console.log('2. function property');
  console.log('formattedItems:', formattedItems);

  assert.equal(total, 9200);
  assert.deepEqual(formattedItems, ['TypeScript Book x 1', 'React Book x 2']);
}
