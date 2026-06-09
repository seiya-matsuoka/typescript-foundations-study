import assert from 'node:assert/strict';

type Order = {
  readonly id: string;
  readonly customerName: string;
  readonly totalPrice: number;
  readonly paid: boolean;
};

type OrderSummary = {
  readonly label: string;
  readonly paidLabel: string;
};

export function runArrayMethodFunctionTypes(): void {
  console.log('このファイルでは、配列メソッドと関数型を確認する。');

  const orders: readonly Order[] = [
    {
      id: 'order-001',
      customerName: 'Sato',
      totalPrice: 5000,
      paid: true,
    },
    {
      id: 'order-002',
      customerName: 'Tanaka',
      totalPrice: 1800,
      paid: false,
    },
    {
      id: 'order-003',
      customerName: 'Suzuki',
      totalPrice: 3200,
      paid: true,
    },
  ];

  const paidOrders = orders.filter((order) => {
    // filter の callback は、各要素を受け取り boolean を返す関数である。
    // order の型は readonly Order[] から Order として推論される。
    // 配列メソッドでは、型注釈を書かなくても callback 引数の型が流れてくる場面が多い。
    return order.paid;
  });

  const summaries = paidOrders.map((order): OrderSummary => {
    // map の callback は、各要素を別の値へ変換する関数である。
    // ここでは戻り値型を OrderSummary と明示し、表示用の形へ変換していることを示す。
    return {
      label: `${order.id} / ${order.customerName}`,
      paidLabel: order.paid ? '支払い済み' : '未払い',
    };
  });

  const totalPaidPrice = paidOrders.reduce((sum, order) => {
    // reduce の callback は、累積値と現在の要素を受け取り、次の累積値を返す関数である。
    // 初期値 0 から sum は number と推論される。
    return sum + order.totalPrice;
  }, 0);

  const firstLargeOrder = orders.find((order) => order.totalPrice >= 3000);

  console.log('1. filter / map');
  console.log('paidOrders:', paidOrders);
  console.log('summaries:', summaries);

  console.log('');
  console.log('2. reduce / find');
  console.log('totalPaidPrice:', totalPaidPrice);
  console.log('firstLargeOrder:', firstLargeOrder);

  assert.deepEqual(
    paidOrders.map((order) => order.id),
    ['order-001', 'order-003'],
  );
  assert.deepEqual(summaries, [
    {
      label: 'order-001 / Sato',
      paidLabel: '支払い済み',
    },
    {
      label: 'order-003 / Suzuki',
      paidLabel: '支払い済み',
    },
  ]);
  assert.equal(totalPaidPrice, 8200);
  assert.deepEqual(firstLargeOrder, {
    id: 'order-001',
    customerName: 'Sato',
    totalPrice: 5000,
    paid: true,
  });
}
