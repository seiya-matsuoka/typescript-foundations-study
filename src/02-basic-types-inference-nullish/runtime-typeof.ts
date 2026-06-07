import assert from 'node:assert/strict';

type Profile = {
  readonly id: string;
  readonly name: string;
};

export function runRuntimeTypeof(): void {
  console.log('[runtime-typeof.ts]');
  console.log('実行時の typeof と TypeScript の型の違いを確認する');
  console.log('');

  const profile: Profile = {
    id: 'p001',
    name: 'Sato',
  };

  const roles = ['admin', 'member'] as const;
  const selectedRole = roles[0];

  // Profile 型や roles の readonly tuple 型は、コンパイル時の検査に使われる。
  // 実行時に typeof で確認できるのは、JavaScript が持っている値の種類だけである。
  console.log('1. TypeScript の型は typeof では見えない');
  console.log('typeof profile:', typeof profile);
  console.log('Array.isArray(roles):', Array.isArray(roles));
  console.log('selectedRole:', selectedRole);
  console.log('typeof selectedRole:', typeof selectedRole);
  console.log('');

  const emptyValue: null = null;
  const notAssigned: undefined = undefined;

  // null は JavaScript の歴史的な仕様により typeof null が 'object' になる。
  // TypeScript の null 型と、実行時の typeof の結果を混同しないようにする。
  console.log('2. null / undefined の実行時の typeof');
  console.log('typeof null:', typeof emptyValue);
  console.log('typeof undefined:', typeof notAssigned);

  assert.equal(typeof profile, 'object');
  assert.equal(Array.isArray(roles), true);
  assert.equal(selectedRole, 'admin');
  assert.equal(typeof selectedRole, 'string');
  assert.equal(typeof emptyValue, 'object');
  assert.equal(typeof notAssigned, 'undefined');
}
