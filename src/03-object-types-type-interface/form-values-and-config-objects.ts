import assert from 'node:assert/strict';

type UserFormValues = {
  readonly name: string;
  readonly email: string;
  readonly memo?: string;
};

type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

type FeatureFlags = {
  readonly enableSearch: boolean;
  readonly enableDarkMode: boolean;
  readonly maxVisibleItems: number;
};

type AppConfig = {
  readonly appName: string;
  readonly features: FeatureFlags;
};

function validateUserForm(values: UserFormValues): UserFormErrors {
  // form values 的な型では、画面上の入力値をそのまま表す。
  // name / email / memo は、フォーム入力欄に対応する値として読める。
  //
  // UserFormErrors は、入力項目名をキーにしてエラーメッセージを持つ型である。
  // Partial<Record<keyof UserFormValues, string>> は少し先の内容も含むが、
  // 「フォームの各項目に対して、エラーがある場合だけ文字列を持つ」と読む。
  const errors: UserFormErrors = {};

  if (values.name.trim() === '') {
    errors.name = '名前を入力してください';
  }

  if (!values.email.includes('@')) {
    errors.email = 'メールアドレスを確認してください';
  }

  return errors;
}

function formatConfig(config: AppConfig): string {
  // 設定オブジェクトは、アプリ全体で参照される値をまとめる用途で使う。
  // nested object type と readonly property を組み合わせると、
  // 設定値を読み取り専用のまとまりとして扱いやすい。
  //
  // config.features.enableSearch のような読み方は、ネストした object type の典型例である。
  return `${config.appName}: search=${config.features.enableSearch}, dark=${config.features.enableDarkMode}`;
}

export function runFormValuesAndConfigObjects(): void {
  console.log('このファイルでは、form values と設定オブジェクトの型を確認する。');

  const validValues: UserFormValues = {
    name: 'Sato',
    email: 'sato@example.com',
  };

  const invalidValues: UserFormValues = {
    name: '',
    email: 'invalid-email',
    memo: '連絡先の確認が必要',
  };

  // values と errors は似たような object に見えても役割が違う。
  // values は入力値、errors は検証結果である。
  // React のフォーム state では、このような役割の違いを型で分けることが重要になる。
  const validErrors = validateUserForm(validValues);
  const invalidErrors = validateUserForm(invalidValues);

  const config: AppConfig = {
    appName: 'typescript-foundations-study',
    features: {
      enableSearch: true,
      enableDarkMode: false,
      maxVisibleItems: 20,
    },
  };

  const formattedConfig = formatConfig(config);

  console.log('1. form values 的な型');
  console.log('validValues:', validValues);
  console.log('invalidValues:', invalidValues);

  console.log('');
  console.log('2. form errors 的な型');
  console.log('validErrors:', validErrors);
  console.log('invalidErrors:', invalidErrors);

  console.log('');
  console.log('3. 設定オブジェクトの型');
  console.log('formattedConfig:', formattedConfig);

  assert.deepEqual(validErrors, {});
  assert.deepEqual(invalidErrors, {
    name: '名前を入力してください',
    email: 'メールアドレスを確認してください',
  });
  assert.equal(formattedConfig, 'typescript-foundations-study: search=true, dark=false');
}
