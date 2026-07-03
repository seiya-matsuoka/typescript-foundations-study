import assert from 'node:assert/strict';

type OrderStatus = 'new' | 'paid' | 'shipped';

type Order = {
  readonly id: string;
  readonly status: OrderStatus;
  readonly amount: number;
};

function groupByStatus(orders: readonly Order[]): Record<OrderStatus, Order[]> {
  const initialGroups: Record<OrderStatus, Order[]> = {
    new: [],
    paid: [],
    shipped: [],
  };

  // group by 風処理は、reduce の accumulator と Record を組み合わせる典型例である。
  // OrderStatus をキーにすることで、new / paid / shipped のグループが必ず存在する形にできる。
  return orders.reduce<Record<OrderStatus, Order[]>>((groups, order) => {
    return {
      ...groups,
      [order.status]: [...groups[order.status], order],
    };
  }, initialGroups);
}

function sumAmountByStatus(orders: readonly Order[]): Record<OrderStatus, number> {
  const initialTotals: Record<OrderStatus, number> = {
    new: 0,
    paid: 0,
    shipped: 0,
  };

  // 集計処理でも accumulator の型を明示すると読みやすい。
  // groups[order.status] や totals[order.status] は、OrderStatus をキーにした Record なので number として扱える。
  return orders.reduce<Record<OrderStatus, number>>((totals, order) => {
    return {
      ...totals,
      [order.status]: totals[order.status] + order.amount,
    };
  }, initialTotals);
}

export function runGroupByAggregation(): void {
  console.log('このファイルでは、group by 風処理と集計を確認する。');

  const orders: readonly Order[] = [
    {
      id: 'order-001',
      status: 'new',
      amount: 1000,
    },
    {
      id: 'order-002',
      status: 'paid',
      amount: 2500,
    },
    {
      id: 'order-003',
      status: 'paid',
      amount: 1500,
    },
    {
      id: 'order-004',
      status: 'shipped',
      amount: 3000,
    },
  ];

  const groupedOrders = groupByStatus(orders);
  const totals = sumAmountByStatus(orders);

  console.log('1. status ごとに注文をまとめる');
  console.log('groupedOrders:', groupedOrders);

  console.log('');
  console.log('2. status ごとに金額を集計する');
  console.log('totals:', totals);

  assert.deepEqual(
    Object.fromEntries(
      Object.entries(groupedOrders).map(([status, statusOrders]) => [
        status,
        statusOrders.map((order) => order.id),
      ]),
    ),
    {
      new: ['order-001'],
      paid: ['order-002', 'order-003'],
      shipped: ['order-004'],
    },
  );
  assert.deepEqual(totals, {
    new: 1000,
    paid: 4000,
    shipped: 3000,
  });
}
