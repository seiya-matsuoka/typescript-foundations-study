import assert from 'node:assert/strict';

type TextInputEvent = {
  readonly currentTarget: {
    readonly value: string;
  };
};

type ClickEvent = {
  readonly currentTarget: {
    readonly dataset: {
      readonly id?: string;
    };
  };
};

type TextChangeHandler = (event: TextInputEvent) => void;
type ItemClickHandler = (event: ClickEvent) => void;

function createTextChangeLogger(logs: string[]): TextChangeHandler {
  // React 本体はこのリポジトリに入れないが、event handler の形は通常の関数型として読める。
  // event を受け取り、戻り値を利用しないため、(event) => void の形になる。
  // 実際の React では React.ChangeEvent<HTMLInputElement> のような型が登場する。
  return (event) => {
    logs.push(`input:${event.currentTarget.value}`);
  };
}

function createItemClickLogger(logs: string[]): ItemClickHandler {
  // callback props や event handler では、event から必要な値を取り出して処理することが多い。
  // dataset.id は optional property として扱っているため、undefined の可能性を考慮する。
  // Unit 03 の optional property と Unit 04 の function property がここでつながる。
  return (event) => {
    const id = event.currentTarget.dataset.id ?? 'unknown';
    logs.push(`click:${id}`);
  };
}

export function runReactEventHandlerConcepts(): void {
  console.log('このファイルでは、React の event handler 型につながる考え方を確認する。');

  const logs: string[] = [];
  const onTextChange = createTextChangeLogger(logs);
  const onItemClick = createItemClickLogger(logs);

  onTextChange({
    currentTarget: {
      value: 'typescript',
    },
  });

  onItemClick({
    currentTarget: {
      dataset: {
        id: 'item-001',
      },
    },
  });

  onItemClick({
    currentTarget: {
      dataset: {},
    },
  });

  console.log('1. event を受け取る handler');
  console.log('logs:', logs);

  assert.deepEqual(logs, ['input:typescript', 'click:item-001', 'click:unknown']);
}
