import assert from 'node:assert/strict';

type CounterState = {
  readonly count: number;
  readonly lastUpdatedBy: string | null;
};

type CounterAction =
  | {
      readonly type: 'increment';
      readonly amount: number;
      readonly actor: string;
    }
  | {
      readonly type: 'decrement';
      readonly amount: number;
      readonly actor: string;
    }
  | {
      readonly type: 'reset';
    };

function reduceCounter(state: CounterState, action: CounterAction): CounterState {
  // React の useReducer では、action を discriminated union で表すことが多い。
  // action.type を見れば、amount や actor が存在するかどうかが決まる。
  // reset には amount が存在しないため、誤って action.amount を読むようなコードを型で防ぎやすい。
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + action.amount,
        lastUpdatedBy: action.actor,
      };
    case 'decrement':
      return {
        count: state.count - action.amount,
        lastUpdatedBy: action.actor,
      };
    case 'reset':
      return {
        count: 0,
        lastUpdatedBy: null,
      };
  }
}

export function runReducerActionUnion(): void {
  console.log('このファイルでは、React の useReducer につながる action 型を確認する。');

  const initialState: CounterState = {
    count: 0,
    lastUpdatedBy: null,
  };

  const incrementedState = reduceCounter(initialState, {
    type: 'increment',
    amount: 3,
    actor: 'Sato',
  });

  const decrementedState = reduceCounter(incrementedState, {
    type: 'decrement',
    amount: 1,
    actor: 'Tanaka',
  });

  const resetState = reduceCounter(decrementedState, {
    type: 'reset',
  });

  console.log('1. action.type による分岐');
  console.log('incrementedState:', incrementedState);
  console.log('decrementedState:', decrementedState);
  console.log('resetState:', resetState);

  assert.deepEqual(incrementedState, {
    count: 3,
    lastUpdatedBy: 'Sato',
  });
  assert.deepEqual(decrementedState, {
    count: 2,
    lastUpdatedBy: 'Tanaka',
  });
  assert.deepEqual(resetState, {
    count: 0,
    lastUpdatedBy: null,
  });
}
