import assert from 'node:assert/strict';

import formatTitle from './examples/default-formatter.ts';
import type { UserDto, UserViewModel } from './examples/module-content.ts';
import {
  calculateTaxIncludedPrice,
  createUserLabel,
  moduleName,
  toUserViewModel,
} from './examples/module-content.ts';

export type UserLabel = {
  readonly id: string;
  readonly label: string;
};

function toUserLabel(viewModel: UserViewModel): UserLabel {
  return {
    id: viewModel.id,
    label: viewModel.displayName,
  };
}

export function runModuleImportExport(): void {
  console.log('このファイルでは、import / export・named / default・type-only import を確認する。');

  const dto: UserDto = {
    id: 'user-001',
    display_name: 'Sato',
  };

  // named export は、export 元の名前を指定して import する。
  // default export は、import 側で任意の名前を付けられる。
  // どちらを使うかはプロジェクト方針によるため、両方を読めるようにしておく。
  const userLabelText = createUserLabel(dto);
  const price = calculateTaxIncludedPrice(1000, 0.1);
  const title = formatTitle('  TypeScript Module  ');

  // UserDto / UserViewModel は型としてだけ使うため import type で読み込む。
  // toUserViewModel は実行時に呼び出す関数なので、通常の value import が必要になる。
  // export type も同じく、型だけを別 module へ公開するときに使う。
  const viewModel = toUserViewModel(dto);
  const userLabel = toUserLabel(viewModel);

  console.log('1. named export と default export を import する');
  console.log('moduleName:', moduleName);
  console.log('userLabelText:', userLabelText);
  console.log('price:', price);
  console.log('title:', title);

  console.log('');
  console.log('2. type import と value import を分ける');
  console.log('viewModel:', viewModel);
  console.log('userLabel:', userLabel);

  assert.equal(moduleName, 'module-content');
  assert.equal(userLabelText, 'user-001:Sato');
  assert.equal(price, 1100);
  assert.equal(title, 'TYPESCRIPT MODULE');
  assert.deepEqual(viewModel, { id: 'user-001', displayName: 'Sato' });
  assert.deepEqual(userLabel, { id: 'user-001', label: 'Sato' });
}
