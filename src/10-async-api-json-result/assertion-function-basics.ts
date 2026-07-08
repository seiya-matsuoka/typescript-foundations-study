import assert from 'node:assert/strict';

type ProfileDto = {
  readonly id: string;
  readonly displayName: string;
};

function assertProfileDto(value: unknown): asserts value is ProfileDto {
  if (typeof value !== 'object' || value === null) {
    throw new Error('ProfileDto must be an object');
  }

  if (!('id' in value) || typeof value.id !== 'string') {
    throw new Error('ProfileDto.id must be a string');
  }

  if (!('displayName' in value) || typeof value.displayName !== 'string') {
    throw new Error('ProfileDto.displayName must be a string');
  }

  // assertion function は、条件を満たさない場合に throw する関数として設計する。
  // 戻り値型の asserts value is ProfileDto により、
  // この関数を通過した後の value は ProfileDto として扱える。
  // type guard が boolean を返すのに対し、assertion function は失敗時に例外で止める設計になる。
}

function parseProfileDto(value: unknown): ProfileDto {
  assertProfileDto(value);

  // assertProfileDto が throw せずに通過したため、
  // この行以降では value が ProfileDto に narrowing されている。
  return value;
}

export function runAssertionFunctionBasics(): void {
  console.log('このファイルでは、assertion function の入口を確認する。');

  const rawProfile: unknown = {
    id: 'profile-001',
    displayName: 'Sato',
  };

  const profile = parseProfileDto(rawProfile);

  let errorMessage = '';
  try {
    parseProfileDto({
      id: 'profile-002',
      displayName: 100,
    });
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'unknown error';
  }

  console.log('1. assertion function で unknown を ProfileDto に絞る');
  console.log('profile:', profile);

  console.log('');
  console.log('2. 条件を満たさない場合は例外として扱う');
  console.log('errorMessage:', errorMessage);

  assert.deepEqual(profile, {
    id: 'profile-001',
    displayName: 'Sato',
  });
  assert.equal(errorMessage, 'ProfileDto.displayName must be a string');
}
