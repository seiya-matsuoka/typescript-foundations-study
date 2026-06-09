import assert from 'node:assert/strict';

type LoginFormValues = {
  readonly email: string;
  readonly password: string;
};

type ValidationResult = {
  readonly valid: boolean;
  readonly messages: readonly string[];
};

type LoginValidator = (values: LoginFormValues) => ValidationResult;
type MessageFormatter = (messages: readonly string[]) => string;

const validateLoginForm: LoginValidator = (values) => {
  // validator は、入力値を受け取り、検証結果を返す関数として扱う。
  // React のフォームでも、values を受け取って errors や validation result を返す関数をよく作る。
  // 戻り値の形を ValidationResult として固定しておくと、呼び出し側が結果を扱いやすい。
  const messages: string[] = [];

  if (!values.email.includes('@')) {
    messages.push('メールアドレスを確認してください');
  }

  if (values.password.length < 8) {
    messages.push('パスワードは8文字以上で入力してください');
  }

  return {
    valid: messages.length === 0,
    messages,
  };
};

const formatMessages: MessageFormatter = (messages) => {
  // formatter は、値を表示用の文字列へ整える関数として扱う。
  // validator と formatter を分けると、検証ロジックと表示ロジックが混ざりにくい。
  return messages.length === 0 ? 'エラーなし' : messages.join(' / ');
};

export function runValidatorFormatterFunctions(): void {
  console.log('このファイルでは、validator / formatter 関数の型を確認する。');

  const invalidValues: LoginFormValues = {
    email: 'invalid-email',
    password: 'short',
  };

  const validValues: LoginFormValues = {
    email: 'sato@example.com',
    password: 'secure-password',
  };

  const invalidResult = validateLoginForm(invalidValues);
  const validResult = validateLoginForm(validValues);
  const invalidMessage = formatMessages(invalidResult.messages);
  const validMessage = formatMessages(validResult.messages);

  console.log('1. validator 関数');
  console.log('invalidResult:', invalidResult);
  console.log('validResult:', validResult);

  console.log('');
  console.log('2. formatter 関数');
  console.log('invalidMessage:', invalidMessage);
  console.log('validMessage:', validMessage);

  assert.deepEqual(invalidResult, {
    valid: false,
    messages: ['メールアドレスを確認してください', 'パスワードは8文字以上で入力してください'],
  });
  assert.deepEqual(validResult, {
    valid: true,
    messages: [],
  });
  assert.equal(
    invalidMessage,
    'メールアドレスを確認してください / パスワードは8文字以上で入力してください',
  );
  assert.equal(validMessage, 'エラーなし');
}
