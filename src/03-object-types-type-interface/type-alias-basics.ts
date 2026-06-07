import assert from 'node:assert/strict';

type UserId = string;

type UserProfile = {
  readonly id: UserId;
  readonly displayName: string;
  readonly email: string;
  readonly role: 'admin' | 'member';
};

type UserProfileCard = {
  readonly title: string;
  readonly subtitle: string;
  readonly badge: string;
};

function toUserProfileCard(profile: UserProfile): UserProfileCard {
  // type alias は、オブジェクト型に名前を付けるときによく使う。
  // UserProfile は「アプリ内部で扱うユーザー情報」、UserProfileCard は「画面表示用の情報」として分けている。
  //
  // 同じユーザーを扱っていても、用途ごとに必要なプロパティは異なる。
  // 型を分けることで、API から来た値、内部で扱う値、画面に渡す値を混同しにくくなる。
  // React に進むと、この UserProfileCard のような型は props に近い役割を持つ。
  return {
    title: profile.displayName,
    subtitle: profile.email,
    badge: profile.role === 'admin' ? '管理者' : 'メンバー',
  };
}

export function runTypeAliasBasics(): void {
  console.log('このファイルでは、type alias でオブジェクト型に名前を付ける方法を確認する。');

  const profile: UserProfile = {
    id: 'user-001',
    displayName: 'Sato',
    email: 'sato@example.com',
    role: 'admin',
  };

  // profile は UserProfile 型として扱う。
  // role は string ではなく 'admin' | 'member' に限定しているため、許可された値だけを入れられる。
  // Unit 02 の literal type / union type が、オブジェクトのプロパティにも入っている例である。
  const card = toUserProfileCard(profile);

  console.log('1. type alias で表したユーザー情報');
  console.log('profile:', profile);

  console.log('');
  console.log('2. 表示用の型へ変換した値');
  console.log('card:', card);

  // UserId は string の別名であり、実行時に専用の型として残るわけではない。
  // それでも UserId と名前を付けることで、単なる string よりも「ユーザー ID として使う値」だと読み取れる。
  // このように type alias は、型の再利用だけでなく、コード上の意図を表す目的でも使う。
  const copiedId: UserId = profile.id;

  console.log('');
  console.log('3. 型に名前を付けることで意図を表す');
  console.log('copiedId:', copiedId);

  assert.deepEqual(profile, {
    id: 'user-001',
    displayName: 'Sato',
    email: 'sato@example.com',
    role: 'admin',
  });
  assert.deepEqual(card, {
    title: 'Sato',
    subtitle: 'sato@example.com',
    badge: '管理者',
  });
  assert.equal(copiedId, 'user-001');
}
