import assert from 'node:assert/strict';

type UserDto = {
  readonly id: string;
  readonly name: string;
  readonly nickname?: string;
  readonly lastLoginAt: string | null;
};

type UserViewModel = {
  readonly id: string;
  readonly displayName: string;
  readonly lastLoginLabel: string;
};

function toUserViewModel(dto: UserDto): UserViewModel {
  // optional property の nickname は、プロパティ自体が省略される可能性がある。
  // nullable な lastLoginAt は、プロパティは存在するが値が null の可能性がある。
  // API DTO では optional と nullable が混在しやすいため、変換時に意味を分けて扱う。
  const displayName = dto.nickname ?? dto.name;
  const lastLoginLabel = dto.lastLoginAt === null ? '未ログイン' : dto.lastLoginAt;

  return {
    id: dto.id,
    displayName,
    lastLoginLabel,
  };
}

export function runNullableOptionalApiData(): void {
  console.log('このファイルでは、nullable / optional な API データを確認する。');

  const userWithNickname: UserDto = {
    id: 'user-001',
    name: 'Sato',
    nickname: 'さとう',
    lastLoginAt: '2026-07-01',
  };

  const userWithoutNickname: UserDto = {
    id: 'user-002',
    name: 'Tanaka',
    lastLoginAt: null,
  };

  const viewModels = [userWithNickname, userWithoutNickname].map((user) => toUserViewModel(user));

  console.log('1. optional property と nullable property を分けて扱う');
  console.log('viewModels:', viewModels);

  assert.deepEqual(viewModels, [
    { id: 'user-001', displayName: 'さとう', lastLoginLabel: '2026-07-01' },
    { id: 'user-002', displayName: 'Tanaka', lastLoginLabel: '未ログイン' },
  ]);
}
