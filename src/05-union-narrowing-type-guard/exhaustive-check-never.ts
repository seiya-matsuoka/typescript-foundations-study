import assert from 'node:assert/strict';

type NotificationTarget =
  | {
      readonly kind: 'email';
      readonly address: string;
    }
  | {
      readonly kind: 'sms';
      readonly phoneNumber: string;
    }
  | {
      readonly kind: 'push';
      readonly deviceToken: string;
    };

function assertNever(value: never): never {
  // never は「ここには到達しないはずの型」を表す。
  // exhaustive check では、すべての union 候補を switch で処理しきった後、
  // default に残る値が never になることを利用する。
  // 後から union に新しい kind を追加した場合、この関数呼び出し箇所で型エラーになり、処理漏れに気づける。
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function formatNotificationTarget(target: NotificationTarget): string {
  // kind は discriminated union の判別用プロパティである。
  // すべての case を処理した後の default で assertNever を呼ぶことで、網羅性を型で確認する。
  switch (target.kind) {
    case 'email':
      return `email:${target.address}`;
    case 'sms':
      return `sms:${target.phoneNumber}`;
    case 'push':
      return `push:${target.deviceToken}`;
    default:
      return assertNever(target);
  }
}

export function runExhaustiveCheckNever(): void {
  console.log('このファイルでは、exhaustive check と never を確認する。');

  const emailTarget: NotificationTarget = {
    kind: 'email',
    address: 'sato@example.com',
  };

  const smsTarget: NotificationTarget = {
    kind: 'sms',
    phoneNumber: '090-0000-0000',
  };

  const pushTarget: NotificationTarget = {
    kind: 'push',
    deviceToken: 'device-token-001',
  };

  const formattedEmailTarget = formatNotificationTarget(emailTarget);
  const formattedSmsTarget = formatNotificationTarget(smsTarget);
  const formattedPushTarget = formatNotificationTarget(pushTarget);

  console.log('1. kind ごとに処理する');
  console.log('formattedEmailTarget:', formattedEmailTarget);
  console.log('formattedSmsTarget:', formattedSmsTarget);
  console.log('formattedPushTarget:', formattedPushTarget);

  console.log('');
  console.log('2. union の候補を追加した場合、assertNever により処理漏れを検出しやすくなる');

  assert.equal(formattedEmailTarget, 'email:sato@example.com');
  assert.equal(formattedSmsTarget, 'sms:090-0000-0000');
  assert.equal(formattedPushTarget, 'push:device-token-001');
}
