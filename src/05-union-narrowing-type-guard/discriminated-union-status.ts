import assert from 'node:assert/strict';

type PaymentState =
  | {
      readonly status: 'waiting';
      readonly message: string;
    }
  | {
      readonly status: 'paid';
      readonly receiptId: string;
      readonly paidAt: Date;
    }
  | {
      readonly status: 'failed';
      readonly reason: string;
      readonly retryable: boolean;
    };

function formatPaymentState(state: PaymentState): string {
  // discriminated union は、共通の判別用プロパティによって union の候補を分ける型である。
  // ここでは status が 'waiting' / 'paid' / 'failed' のどれかを表す。
  // switch (state.status) の各 case 内では、state の型が対応する候補へ narrowing される。
  switch (state.status) {
    case 'waiting':
      return `waiting:${state.message}`;
    case 'paid':
      return `paid:${state.receiptId}:${state.paidAt.toISOString()}`;
    case 'failed':
      return `failed:${state.reason}:${state.retryable ? 'retryable' : 'stop'}`;
  }
}

export function runDiscriminatedUnionStatus(): void {
  console.log('このファイルでは、status による discriminated union を確認する。');

  const waitingState: PaymentState = {
    status: 'waiting',
    message: '支払い待ち',
  };

  const paidState: PaymentState = {
    status: 'paid',
    receiptId: 'receipt-001',
    paidAt: new Date('2026-06-09T00:00:00.000Z'),
  };

  const failedState: PaymentState = {
    status: 'failed',
    reason: 'カードが利用できません',
    retryable: true,
  };

  const waitingText = formatPaymentState(waitingState);
  const paidText = formatPaymentState(paidState);
  const failedText = formatPaymentState(failedState);

  console.log('1. status ごとに異なるプロパティを持つ状態');
  console.log('waitingText:', waitingText);
  console.log('paidText:', paidText);
  console.log('failedText:', failedText);

  assert.equal(waitingText, 'waiting:支払い待ち');
  assert.equal(paidText, 'paid:receipt-001:2026-06-09T00:00:00.000Z');
  assert.equal(failedText, 'failed:カードが利用できません:retryable');
}
