import assert from 'node:assert/strict';

type Address = {
  readonly postalCode: string;
  readonly prefecture: string;
  readonly city: string;
};

type Company = {
  readonly id: string;
  readonly name: string;
  readonly address: Address;
};

type Employee = {
  readonly id: string;
  readonly name: string;
  readonly company: Company;
};

function formatEmployeeLocation(employee: Employee): string {
  // nested object type は、オブジェクトの中に別のオブジェクトが入る形を表す。
  // 住所、会社、ユーザー詳細、API の detail response などでよく出てくる。
  //
  // employee.company.address.prefecture のように深いプロパティへアクセスするときは、
  // どの階層の型を読んでいるかを意識する。
  // 深いネストが増えすぎると扱いづらくなるため、実務では必要に応じて型を分ける。
  return `${employee.name} / ${employee.company.name} / ${employee.company.address.prefecture}${employee.company.address.city}`;
}

export function runNestedObjectTypes(): void {
  console.log('このファイルでは、nested object type を確認する。');

  const employee: Employee = {
    id: 'emp-001',
    name: 'Suzuki',
    company: {
      id: 'company-001',
      name: 'Example Inc.',
      address: {
        postalCode: '100-0001',
        prefecture: '東京都',
        city: '千代田区',
      },
    },
  };

  // Employee は Company を持ち、Company は Address を持つ。
  // 型を小さく分けておくと、住所だけを別の場所で再利用しやすい。
  // React の props でも、親コンポーネントから詳細な object を渡すか、表示に必要な値だけを渡すかを考える土台になる。
  const location = formatEmployeeLocation(employee);

  console.log('1. ネストしたオブジェクト');
  console.log('employee:', employee);

  console.log('');
  console.log('2. ネストしたプロパティを使った表示文字列');
  console.log('location:', location);

  assert.equal(employee.company.address.postalCode, '100-0001');
  assert.equal(location, 'Suzuki / Example Inc. / 東京都千代田区');
}
