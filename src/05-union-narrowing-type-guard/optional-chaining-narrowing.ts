import assert from 'node:assert/strict';

type UserProfile = {
  readonly displayName: string;
  readonly bio?: string;
  readonly tags?: readonly string[];
};

type UserDetail = {
  readonly id: string;
  readonly profile?: UserProfile;
};

function getUserSummary(user: UserDetail): string {
  // optional chaining は、途中のプロパティが undefined の可能性を考慮して安全に読む構文である。
  // user.profile?.displayName は string | undefined になるため、
  // ?? でデフォルト値を用意してから表示用文字列にしている。
  const displayName = user.profile?.displayName ?? '名前未設定';
  const firstTag = user.profile?.tags?.[0] ?? 'タグなし';

  return `${displayName} / ${firstTag}`;
}

function formatBio(user: UserDetail): string {
  // optional chaining と truthiness narrowing を組み合わせると、値がある場合だけ処理できる。
  // ただし、bio が空文字の場合は false と扱われるため、空文字も有効な値なら別の判定が必要になる。
  if (user.profile?.bio) {
    return `bio:${user.profile.bio}`;
  }

  return 'bioなし';
}

function formatBioByNullish(user: UserDetail): string {
  // undefined だけを除外したい場合は、!== undefined のように明示する。
  // ここでは bio が空文字でも「値は存在する」として扱うため、truthiness ではなく undefined 比較を使う。
  if (user.profile?.bio !== undefined) {
    return `bio:${user.profile.bio}`;
  }

  return 'bioなし';
}

export function runOptionalChainingNarrowing(): void {
  console.log('このファイルでは、optional chaining と narrowing を確認する。');

  const fullUser: UserDetail = {
    id: 'user-001',
    profile: {
      displayName: 'Sato',
      bio: 'TypeScript を学習中',
      tags: ['typescript', 'react'],
    },
  };

  const emptyBioUser: UserDetail = {
    id: 'user-002',
    profile: {
      displayName: 'Tanaka',
      bio: '',
    },
  };

  const noProfileUser: UserDetail = {
    id: 'user-003',
  };

  const fullSummary = getUserSummary(fullUser);
  const noProfileSummary = getUserSummary(noProfileUser);
  const fullBio = formatBio(fullUser);
  const emptyBioByTruthiness = formatBio(emptyBioUser);
  const emptyBioByNullish = formatBioByNullish(emptyBioUser);

  console.log('1. optional chaining で安全に読む');
  console.log('fullSummary:', fullSummary);
  console.log('noProfileSummary:', noProfileSummary);

  console.log('');
  console.log('2. truthiness と undefined 比較の違い');
  console.log('fullBio:', fullBio);
  console.log('emptyBioByTruthiness:', emptyBioByTruthiness);
  console.log('emptyBioByNullish:', emptyBioByNullish);

  assert.equal(fullSummary, 'Sato / typescript');
  assert.equal(noProfileSummary, '名前未設定 / タグなし');
  assert.equal(fullBio, 'bio:TypeScript を学習中');
  assert.equal(emptyBioByTruthiness, 'bioなし');
  assert.equal(emptyBioByNullish, 'bio:');
}
