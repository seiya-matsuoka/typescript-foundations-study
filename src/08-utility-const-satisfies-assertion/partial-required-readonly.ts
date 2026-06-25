import assert from 'node:assert/strict';

type UserProfile = {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly bio?: string;
};

type UserProfilePatch = Partial<Pick<UserProfile, 'name' | 'email' | 'bio'>>;
type CompletedUserProfile = Required<UserProfile>;
type FrozenUserProfile = Readonly<UserProfile>;

function applyUserProfilePatch(profile: UserProfile, patch: UserProfilePatch): UserProfile {
  // Partial<T> は、T の各プロパティを optional にした型を作る。
  // ここではプロフィール編集フォームの「変更された項目だけ送る」値を表している。
  // exactOptionalPropertyTypes が有効な環境では、optional property は「省略できる」という意味が強い。
  // そのため、値がない場合は undefined を明示的に詰めるより、プロパティ自体を省略する設計に寄せる。
  return {
    ...profile,
    ...patch,
  };
}

function completeProfile(profile: UserProfile): CompletedUserProfile {
  // Required<T> は optional property を必須にする。
  // 実務では「DB から取得した時点では必須」「画面表示前に fallback を補完済み」のように、
  // 元の型よりも強い前提を持つ型を作る場面で使う。
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email ?? 'not-set@example.com',
    bio: profile.bio ?? '',
  };
}

function freezeProfile(profile: UserProfile): FrozenUserProfile {
  // Readonly<T> は、型チェック上はプロパティの再代入を防ぐ。
  // ただし、JavaScript の実行時に Object.freeze するわけではない。
  // React の props や API から受け取った値のように、受け取った側で直接変更しないデータに向いている。
  return profile;
}

export function runPartialRequiredReadonly(): void {
  console.log('このファイルでは、Partial / Required / Readonly を確認する。');

  const profile: UserProfile = {
    id: 'user-001',
    name: 'Sato',
  };

  const patchedProfile = applyUserProfilePatch(profile, {
    name: 'Sato Seiya',
    bio: 'TypeScript を学習中',
  });

  const completedProfile = completeProfile(patchedProfile);
  const frozenProfile = freezeProfile(completedProfile);

  console.log('1. Partial<T> で更新用の部分的な型を作る');
  console.log('patchedProfile:', patchedProfile);

  console.log('');
  console.log('2. Required<T> で表示前に必須項目を補完する');
  console.log('completedProfile:', completedProfile);

  console.log('');
  console.log('3. Readonly<T> で受け取った側の直接変更を防ぐ');
  console.log('frozenProfile:', frozenProfile);

  assert.deepEqual(patchedProfile, {
    id: 'user-001',
    name: 'Sato Seiya',
    bio: 'TypeScript を学習中',
  });
  assert.deepEqual(completedProfile, {
    id: 'user-001',
    name: 'Sato Seiya',
    email: 'not-set@example.com',
    bio: 'TypeScript を学習中',
  });
  assert.deepEqual(frozenProfile, completedProfile);
}
