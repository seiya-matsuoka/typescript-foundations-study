import assert from 'node:assert/strict';

type ApiErrorBody = {
  readonly code: string;
  readonly message: string;
};

type ApiResult =
  | {
      readonly ok: true;
      readonly data: string;
    }
  | {
      readonly ok: false;
      readonly error: ApiErrorBody;
    };

interface Clickable {
  readonly label: string;
  click(): string;
}

interface DisabledState {
  readonly disabled: boolean;
}

type ButtonModel = Clickable & DisabledState;

function formatApiResult(result: ApiResult): string {
  // type alias は、オブジェクト型だけでなく union 型や intersection 型にも名前を付けられる。
  // ApiResult は ok: true の成功パターンと、ok: false の失敗パターンを union 型で表している。
  // Unit 05 で discriminated union を厚めに扱うが、ここでは「type は union にも使いやすい」入口として見る。
  if (result.ok) {
    return `success:${result.data}`;
  }

  // result.ok が false の側では、TypeScript が error を持つ形だと narrowing してくれる。
  // ここでは Unit 05 ほど深追いしないが、object type と union type が組み合わさる例として読む。
  return `error:${result.error.code}`;
}

function runButtonClick(button: ButtonModel): string {
  // interface は「このオブジェクトが持つべき形」を表す用途で読みやすい。
  // ButtonModel は Clickable と DisabledState を intersection で合わせている。
  // intersection 型は「両方の構造を持つ値」として読む。
  return button.disabled ? 'disabled' : button.click();
}

export function runTypeVsInterface(): void {
  console.log('このファイルでは、type と interface の使い分けの入口を確認する。');

  const successResult: ApiResult = {
    ok: true,
    data: 'created',
  };

  const errorResult: ApiResult = {
    ok: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: '入力内容を確認してください',
    },
  };

  const button: ButtonModel = {
    label: '保存',
    disabled: false,
    click: () => 'clicked:保存',
  };

  // type と interface は、単純なオブジェクト型であればどちらでも書ける場面がある。
  // ただし、union 型のような表現は type alias の方が自然に扱える。
  // 一方で、オブジェクトの形だけを表す場合は interface も読みやすい。
  const successText = formatApiResult(successResult);
  const errorText = formatApiResult(errorResult);
  const clickResult = runButtonClick(button);

  console.log('1. type alias は union 型も表せる');
  console.log('successText:', successText);
  console.log('errorText:', errorText);

  console.log('');
  console.log('2. interface はオブジェクトの形を表しやすい');
  console.log('button label:', button.label);
  console.log('clickResult:', clickResult);

  assert.equal(successText, 'success:created');
  assert.equal(errorText, 'error:VALIDATION_ERROR');
  assert.equal(clickResult, 'clicked:保存');
}
