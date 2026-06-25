import assert from 'node:assert/strict';

const actionDefinitions = [
  {
    type: 'task/add',
    label: 'タスク追加',
  },
  {
    type: 'task/toggle',
    label: '完了切り替え',
  },
  {
    type: 'task/remove',
    label: 'タスク削除',
  },
] as const;

type ActionDefinition = (typeof actionDefinitions)[number];
type ActionType = ActionDefinition['type'];
type ActionLabel = ActionDefinition['label'];

function getActionLabel(type: ActionType): ActionLabel {
  // as const により、配列内の object の type / label が string ではなく文字列リテラルとして保持される。
  // その結果、ActionType は 'task/add' | 'task/toggle' | 'task/remove' として派生できる。
  //
  // これは React の reducer action、メニュー項目、フォーム項目、権限定義などでよく見る形である。
  // 値の一覧を1箇所に置き、そこから union 型を作ることで、値と型の二重管理を減らせる。
  const foundAction = actionDefinitions.find((action) => action.type === type);

  if (foundAction === undefined) {
    // type が ActionType である以上、通常この分岐には入らない。
    // ただし Array#find の戻り値は見つからない可能性を含むため、実装上は fallback を用意する。
    return 'タスク追加';
  }

  return foundAction.label;
}

export function runAsConstTypeExtraction(): void {
  console.log('このファイルでは、as const と組み合わせた型抽出の入口を確認する。');

  const addLabel = getActionLabel('task/add');
  const removeLabel = getActionLabel('task/remove');

  console.log('1. as const の配列から action type union を作る');
  console.log('addLabel:', addLabel);
  console.log('removeLabel:', removeLabel);

  assert.equal(addLabel, 'タスク追加');
  assert.equal(removeLabel, 'タスク削除');
}
