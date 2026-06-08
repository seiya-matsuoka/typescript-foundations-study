import assert from 'node:assert/strict';

type MemberProfile = {
  readonly id: string;
  readonly name: string;
};

type CustomerProfile = {
  readonly id: string;
  readonly name: string;
};

class JavaLikeMember {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}
}

function formatMember(profile: MemberProfile): string {
  // TypeScript は structural typing で判定する。
  // 型名が同じかどうかではなく、必要なプロパティを持っているかどうかで代入可能性が決まる。
  //
  // Java の nominal typing に慣れていると、MemberProfile と CustomerProfile の型名が違うのに
  // 同じ関数へ渡せる点が違和感になりやすい。
  return `${profile.id}: ${profile.name}`;
}

export function runStructuralTyping(): void {
  console.log('このファイルでは、structural typing と Java の感覚の違いを確認する。');

  const member: MemberProfile = {
    id: 'member-001',
    name: 'Sato',
  };

  const customer: CustomerProfile = {
    id: 'customer-001',
    name: 'Tanaka',
  };

  const classBasedMember = new JavaLikeMember('member-002', 'Suzuki');

  // MemberProfile と CustomerProfile は別名の型だが、構造は同じである。
  // そのため、CustomerProfile の値を MemberProfile を受け取る関数に渡せる。
  //
  // classBasedMember も JavaLikeMember のインスタンスだが、id / name を持つため渡せる。
  // TypeScript では、class の名前よりも、必要なプロパティを持つかどうかが重要になる場面が多い。
  const formattedMember = formatMember(member);
  const formattedCustomer = formatMember(customer);
  const formattedClassBasedMember = formatMember(classBasedMember);

  console.log('1. 同じ構造を持つ type 同士');
  console.log('formattedMember:', formattedMember);
  console.log('formattedCustomer:', formattedCustomer);

  console.log('');
  console.log('2. class のインスタンスも構造が合えば渡せる');
  console.log('formattedClassBasedMember:', formattedClassBasedMember);

  assert.equal(formattedMember, 'member-001: Sato');
  assert.equal(formattedCustomer, 'customer-001: Tanaka');
  assert.equal(formattedClassBasedMember, 'member-002: Suzuki');
}
