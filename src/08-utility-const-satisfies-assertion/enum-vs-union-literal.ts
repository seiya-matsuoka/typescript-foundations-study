import assert from 'node:assert/strict';

enum ApiStatusEnum {
  Success = 'success',
  Error = 'error',
}

const apiStatuses = ['success', 'error'] as const;

type ApiStatusUnion = (typeof apiStatuses)[number];

const apiStatusObject = {
  success: 'success',
  error: 'error',
} as const;

type ApiStatusObjectValue = (typeof apiStatusObject)[keyof typeof apiStatusObject];

function formatEnumStatus(status: ApiStatusEnum): string {
  return `enum:${status}`;
}

function formatUnionStatus(status: ApiStatusUnion): string {
  // union literal は実行時のオブジェクトを作らず、型だけで 'success' | 'error' を表す。
  // as const 配列から union を作ると、値の一覧と型の一覧を同じ定義から作れる。
  return `union:${status}`;
}

function formatObjectStatus(status: ApiStatusObjectValue): string {
  // const object は、値を名前付きで参照したい場合に使いやすい。
  // enum と似た使い方ができるが、通常の JavaScript オブジェクトとして扱える。
  return `object:${status}`;
}

export function runEnumVsUnionLiteral(): void {
  console.log('このファイルでは、enum と union literal / const object の比較を確認する。');

  const enumStatus = formatEnumStatus(ApiStatusEnum.Success);
  const unionStatus = formatUnionStatus('success');
  const objectStatus = formatObjectStatus(apiStatusObject.error);

  console.log('1. enum は実行時の値としても存在する');
  console.log('enumStatus:', enumStatus);

  console.log('');
  console.log('2. union literal は型として軽く扱える');
  console.log('apiStatuses:', apiStatuses);
  console.log('unionStatus:', unionStatus);

  console.log('');
  console.log('3. const object は値の参照と型抽出を両立しやすい');
  console.log('apiStatusObject:', apiStatusObject);
  console.log('objectStatus:', objectStatus);

  assert.equal(enumStatus, 'enum:success');
  assert.equal(unionStatus, 'union:success');
  assert.equal(objectStatus, 'object:error');
}
