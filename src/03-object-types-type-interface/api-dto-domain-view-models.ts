import assert from 'node:assert/strict';

type UserApiDto = {
  readonly id: string;
  readonly display_name: string;
  readonly email: string;
  readonly plan: 'free' | 'pro';
  readonly created_at: string;
};

type UserDomainModel = {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly plan: 'free' | 'pro';
  readonly createdAt: Date;
};

type UserViewModel = {
  readonly title: string;
  readonly subtitle: string;
  readonly planLabel: string;
};

type ApiResponse<TData> = {
  readonly data: TData;
  readonly receivedAt: string;
};

function toDomainModel(dto: UserApiDto): UserDomainModel {
  // DTO は API から来る形、domain model はアプリ内部で扱いやすい形として分ける。
  // ここでは snake_case の display_name / created_at を、内部向けに camelCase と Date へ変換する。
  //
  // API DTO をそのままアプリ全体へ広げると、外部仕様の都合が UI やロジックに漏れやすい。
  // 境界で domain model へ変換すると、外部仕様と内部表現を分けて考えられる。
  return {
    id: dto.id,
    displayName: dto.display_name,
    email: dto.email,
    plan: dto.plan,
    createdAt: new Date(dto.created_at),
  };
}

function toViewModel(user: UserDomainModel): UserViewModel {
  // view model は、画面表示に必要な形へ整えた型として使う。
  // API DTO や domain model をそのまま UI に渡すのではなく、表示用の文字列へ変換しておく。
  //
  // React に進むと、この UserViewModel は props に渡すデータの形に近い。
  // UI 側で plan === 'pro' の判定を散らばらせず、変換関数に閉じ込められる。
  return {
    title: user.displayName,
    subtitle: user.email,
    planLabel: user.plan === 'pro' ? 'Pro プラン' : 'Free プラン',
  };
}

export function runApiDtoDomainViewModels(): void {
  console.log('このファイルでは、DTO・domain model・view model・API response 的な型を確認する。');

  const response: ApiResponse<UserApiDto> = {
    data: {
      id: 'user-001',
      display_name: 'Sato',
      email: 'sato@example.com',
      plan: 'pro',
      created_at: '2026-06-07T00:00:00.000Z',
    },
    receivedAt: '2026-06-07T00:00:01.000Z',
  };

  // ApiResponse<TData> は generics の入口にも見えるが、ここでは深追いしない。
  // 「API response の data に何が入るかを型として差し込める」程度に読む。
  // generics は Unit 06 で厚めに扱う。
  const domainUser = toDomainModel(response.data);
  const viewModel = toViewModel(domainUser);

  console.log('1. API response 的な型');
  console.log('response:', response);

  console.log('');
  console.log('2. DTO から domain model へ変換した値');
  console.log('domainUser:', {
    ...domainUser,
    createdAt: domainUser.createdAt.toISOString(),
  });

  console.log('');
  console.log('3. domain model から view model へ変換した値');
  console.log('viewModel:', viewModel);

  assert.equal(response.data.display_name, 'Sato');
  assert.equal(domainUser.displayName, 'Sato');
  assert.equal(domainUser.createdAt.toISOString(), '2026-06-07T00:00:00.000Z');
  assert.deepEqual(viewModel, {
    title: 'Sato',
    subtitle: 'sato@example.com',
    planLabel: 'Pro プラン',
  });
}
