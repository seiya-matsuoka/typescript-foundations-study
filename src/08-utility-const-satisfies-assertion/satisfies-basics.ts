import assert from 'node:assert/strict';

type Tone = 'primary' | 'secondary' | 'danger';

type ButtonConfig = {
  readonly label: string;
  readonly tone: Tone;
  readonly disabled?: boolean;
};

const saveButton = {
  label: '保存',
  tone: 'primary',
} satisfies ButtonConfig;

const deleteButton = {
  label: '削除',
  tone: 'danger',
  disabled: true,
} as const satisfies ButtonConfig;

const annotatedButton: ButtonConfig = {
  label: '戻る',
  tone: 'secondary',
};

function renderButton(config: ButtonConfig): string {
  return `${config.label}:${config.tone}:${config.disabled ?? false}`;
}

export function runSatisfiesBasics(): void {
  console.log('このファイルでは、satisfies の基本を確認する。');

  // satisfies は、値が ButtonConfig の形を満たしているか確認する。
  // 型注釈とは違い、値そのものの型を必要以上に広げにくい。
  // 型アサーション as ButtonConfig とも違い、形が合わない場合は型エラーになる。
  const saveButtonText = renderButton(saveButton);
  const deleteButtonText = renderButton(deleteButton);
  const annotatedButtonText = renderButton(annotatedButton);

  console.log('1. satisfies で形を検証する');
  console.log('saveButton:', saveButton);
  console.log('saveButtonText:', saveButtonText);

  console.log('');
  console.log('2. as const satisfies で literal 型を保ちながら形を検証する');
  console.log('deleteButton:', deleteButton);
  console.log('deleteButtonText:', deleteButtonText);

  console.log('');
  console.log('3. 型注釈との違いを確認する');
  console.log('annotatedButton:', annotatedButton);
  console.log('annotatedButtonText:', annotatedButtonText);

  assert.equal(saveButtonText, '保存:primary:false');
  assert.equal(deleteButtonText, '削除:danger:true');
  assert.equal(annotatedButtonText, '戻る:secondary:false');
}
