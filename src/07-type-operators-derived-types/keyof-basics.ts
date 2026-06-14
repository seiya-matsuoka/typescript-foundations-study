import assert from 'node:assert/strict';

type UserProfile = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly age: number;
};

type UserProfileKey = keyof UserProfile;

function getProfileValue(profile: UserProfile, key: UserProfileKey): string | number {
  // keyof UserProfile は、UserProfile のプロパティ名だけを集めた union 型になる。
  // ここでは 'id' | 'name' | 'email' | 'age' のように読める。
  //
  // JavaScript では key に任意の文字列を渡せてしまうが、
  // TypeScript では keyof を使うことで「存在するプロパティ名だけ」を受け取る関数にできる。
  // Unit 03 の object type と Unit 06 の generics を土台にして、
  // object の形から key の型を派生させている点に注目する。
  return profile[key];
}

function labelProfileKey(key: UserProfileKey): string {
  const labels: Record<UserProfileKey, string> = {
    id: 'ID',
    name: '名前',
    email: 'メールアドレス',
    age: '年齢',
  };

  // Record<UserProfileKey, string> とすることで、UserProfile の key すべてに label を用意する。
  // key を追加・削除したとき、label 側の対応漏れを型チェックで検出しやすくなる。
  return labels[key];
}

export function runKeyofBasics(): void {
  console.log('このファイルでは、keyof の基本を確認する。');

  const profile: UserProfile = {
    id: 'user-001',
    name: 'Sato',
    email: 'sato@example.com',
    age: 32,
  };

  const nameValue = getProfileValue(profile, 'name');
  const ageValue = getProfileValue(profile, 'age');
  const emailLabel = labelProfileKey('email');

  console.log('1. keyof で object type のプロパティ名を union 型にする');
  console.log('nameValue:', nameValue);
  console.log('ageValue:', ageValue);

  console.log('');
  console.log('2. keyof から作った key を Record のキーに使う');
  console.log('emailLabel:', emailLabel);

  assert.equal(nameValue, 'Sato');
  assert.equal(ageValue, 32);
  assert.equal(emailLabel, 'メールアドレス');
}
