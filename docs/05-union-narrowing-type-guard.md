# 05. union 型・narrowing・type guard・discriminated union

## 1. 学習対象

この単位では、TypeScript らしさが強く出る union 型、narrowing、type guard、discriminated union を学ぶ。  
JavaScript では、値の種類や状態に応じて `if` や `switch` で分岐する。  
TypeScript では、その分岐を型チェックと結び付けることで、「この分岐内ではこの型として扱える」という判断をコンパイル時に得られる。

Unit 02 では基本型と `null` / `undefined` を扱い、Unit 03 ではオブジェクト型、Unit 04 では関数の型を扱った。  
この単位では、それらを組み合わせて、状態・API レスポンス・外部入力・React の state / reducer action のような実務寄りの型表現を確認する。

特に、`status`、`kind`、`type` のような判別用プロパティを使う discriminated union は、React の画面状態、API の成功 / 失敗、フォーム状態、`useReducer` の action 型につながるため厚めに扱う。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `union type`
- `literal union`
- `nullable union`
- `typeof` による `narrowing`
- `in` による `narrowing`
- `instanceof` による `narrowing`
- `equality narrowing`
- `truthiness narrowing`
- `optional chaining` と `narrowing`
- `custom type guard`
- `type predicate`
- `value is Type`
- `discriminated union`
- `tag` / `kind` / `status` による分岐
- `exhaustive check`
- `never` を使った網羅性確認
- `unknown` から安全に型を絞る
- API レスポンスの成功 / 失敗表現
- `loading` / `success` / `error state`
- React の `useReducer` につながる `action` 型

この単位は、Unit 02〜06 の中でも TypeScript の型らしさが強く出る中心的な単位となる。  
単に `string | number` のような文法例に留めず、外部入力、API レスポンス、画面状態、reducer action まで扱う。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  05-union-narrowing-type-guard/
    index.ts
    union-type-basics.ts
    literal-nullable-unions.ts
    typeof-narrowing.ts
    equality-truthiness-narrowing.ts
    in-narrowing.ts
    instanceof-narrowing.ts
    optional-chaining-narrowing.ts
    custom-type-guards.ts
    unknown-safe-narrowing.ts
    discriminated-union-status.ts
    api-result-union.ts
    loading-success-error-state.ts
    reducer-action-union.ts
    exhaustive-check-never.ts

docs/
  05-union-narrowing-type-guard.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 05 のサンプルを順番に実行する入口。
- `union-type-basics.ts`
  - `string | number` などの基本的な union 型と、型を絞ってから扱う流れを確認する。
- `literal-nullable-unions.ts`
  - literal union と nullable union を確認する。
- `typeof-narrowing.ts`
  - `typeof` による narrowing と、`null` の扱いを確認する。
- `equality-truthiness-narrowing.ts`
  - equality narrowing、truthiness narrowing、nullish check の違いを確認する。
- `in-narrowing.ts`
  - `in` による narrowing と、`kind` による分岐の入口を確認する。
- `instanceof-narrowing.ts`
  - `Date` や `Error` class に対する `instanceof` narrowing を確認する。
- `optional-chaining-narrowing.ts`
  - optional chaining と narrowing、空文字と `undefined` の違いを確認する。
- `custom-type-guards.ts`
  - custom type guard、type predicate、`value is Type` の入口を確認する。
- `unknown-safe-narrowing.ts`
  - `unknown` から安全にオブジェクト型へ絞る流れを確認する。
- `discriminated-union-status.ts`
  - `status` による discriminated union を確認する。
- `api-result-union.ts`
  - API レスポンスの成功 / 失敗表現を確認する。
- `loading-success-error-state.ts`
  - `loading` / `success` / `error state` を確認する。
- `reducer-action-union.ts`
  - React の `useReducer` につながる action 型を確認する。
- `exhaustive-check-never.ts`
  - `never` を使った exhaustive check を確認する。
- `05-union-narrowing-type-guard.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:05
```

型チェックを確認する場合は次を実行する。

```bash
npm run typecheck
```

ESLint を確認する場合は次を実行する。

```bash
npm run lint
```

Prettier の整形チェックを行う場合は次を実行する。

```bash
npm run format:check
```

整形が必要な場合は次を実行する。

```bash
npm run format
```

この単位では、`npm run unit:05` で分岐ごとの実行結果を確認し、`npm run typecheck` で narrowing が型チェック上どのように効くかを確認する。  
`@ts-expect-error` は今回の実行サンプルには含めていない。実行時に壊れる型エラー例よりも、実際に動く narrowing の流れを優先している。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/05-union-narrowing-type-guard/index.ts`
2. `src/05-union-narrowing-type-guard/union-type-basics.ts`
3. `src/05-union-narrowing-type-guard/literal-nullable-unions.ts`
4. `src/05-union-narrowing-type-guard/typeof-narrowing.ts`
5. `src/05-union-narrowing-type-guard/equality-truthiness-narrowing.ts`
6. `src/05-union-narrowing-type-guard/in-narrowing.ts`
7. `src/05-union-narrowing-type-guard/instanceof-narrowing.ts`
8. `src/05-union-narrowing-type-guard/optional-chaining-narrowing.ts`
9. `src/05-union-narrowing-type-guard/custom-type-guards.ts`
10. `src/05-union-narrowing-type-guard/unknown-safe-narrowing.ts`
11. `src/05-union-narrowing-type-guard/discriminated-union-status.ts`
12. `src/05-union-narrowing-type-guard/api-result-union.ts`
13. `src/05-union-narrowing-type-guard/loading-success-error-state.ts`
14. `src/05-union-narrowing-type-guard/reducer-action-union.ts`
15. `src/05-union-narrowing-type-guard/exhaustive-check-never.ts`

最初に `index.ts` を読み、Unit 05 全体の実行順を確認する。  
その後、union 型の基本、各 narrowing、custom type guard、unknown の絞り込み、discriminated union、React につながる状態表現、exhaustive check の順に読む。

## 6. 注目ポイント

### 6-1. union 型は使う前に候補を絞る

`union-type-basics.ts` では、`UserId` を `string | number` として定義している。

```ts
type UserId = string | number;

function formatUserId(id: UserId): string {
  if (typeof id === 'string') {
    return `user:${id.toUpperCase()}`;
  }

  return `user:${id.toString().padStart(4, '0')}`;
}
```

`id` は `string` または `number` のどちらかである。  
そのまま `toUpperCase()` を呼ぶことはできないため、先に `typeof id === 'string'` で候補を絞っている。

このように union 型では、「複数候補を持つ値を受け取る」「分岐で候補を絞る」「絞った後の型専用の処理を行う」という流れが基本になる。

### 6-2. `typeof` / `in` / `instanceof` は narrowing の代表的な入口

`typeof-narrowing.ts` では、プリミティブ値を `typeof` で絞っている。

```ts
if (typeof value === 'string') {
  return `string:${value.toUpperCase()}`;
}

if (typeof value === 'number') {
  return `number:${value.toLocaleString('ja-JP')}`;
}
```

`in-narrowing.ts` では、プロパティの存在で候補を絞っている。

```ts
if ('email' in contact) {
  return `${contact.displayName} <${contact.email}>`;
}
```

`instanceof-narrowing.ts` では、class から作られた値かどうかで候補を絞っている。

```ts
const date = input instanceof Date ? input : new Date(input);
```

どれも JavaScript の実行時判定としては見慣れたものだが、TypeScript ではそれが型の絞り込みにもつながる。  
この「実行時の条件分岐が、コンパイル時の型にも影響する」点が Unit 05 の中心となる。

### 6-3. custom type guard は判定ロジックに型の意味を持たせる

`custom-type-guards.ts` では、`isAdminUser` を type predicate として定義している。

```ts
function isAdminUser(user: AppUser): user is AdminUser {
  return user.role === 'admin';
}
```

戻り値型の `user is AdminUser` は、「この関数が `true` を返した場合、`user` は `AdminUser` として扱える」という意味である。  
単なる `boolean` ではなく、型の絞り込みの意味を持つ戻り値型になっている。

```ts
const admins = users.filter(isAdminUser);
```

このように `filter` に渡すと、`admins` は `AdminUser` の配列として扱える。  
実務では、API レスポンス、権限判定、フォーム入力値、設定値の検証などで custom type guard が役立つ。

### 6-4. `unknown` は段階的に narrowing してから使う

`unknown-safe-narrowing.ts` では、外部から来た値を `unknown` として受け取り、段階的に絞っている。

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
```

まず、値がオブジェクトであり、`null` ではないことを確認する。  
その後、各プロパティの型を確認する。

```ts
return (
  typeof value.id === 'string' && typeof value.title === 'string' && typeof value.price === 'number'
);
```

`unknown` は面倒に見えるが、外部入力を安全に扱うためには重要である。  
`any` で受けると型チェックをすり抜けるが、`unknown` で受けると確認してから使う流れを強制できる。

### 6-5. discriminated union は状態とデータの不整合を減らす

`discriminated-union-status.ts` では、`status` によって payment の状態を分けている。

```ts
type PaymentState =
  | {
      readonly status: 'waiting';
      readonly message: string;
    }
  | {
      readonly status: 'paid';
      readonly receiptId: string;
      readonly paidAt: Date;
    }
  | {
      readonly status: 'failed';
      readonly reason: string;
      readonly retryable: boolean;
    };
```

`status` が `paid` のときだけ `receiptId` と `paidAt` を持つ。  
`status` が `failed` のときだけ `reason` と `retryable` を持つ。

```ts
switch (state.status) {
  case 'waiting':
    return `waiting:${state.message}`;
  case 'paid':
    return `paid:${state.receiptId}:${state.paidAt.toISOString()}`;
  case 'failed':
    return `failed:${state.reason}:${state.retryable ? 'retryable' : 'stop'}`;
}
```

この形にすると、「成功状態なのにエラーメッセージを持つ」「エラー状態なのに成功データを読む」といった不整合を減らせる。  
React の画面状態や API 取得状態でも、非常に重要な考え方になる。

## 7. 引っかかりやすい点

### 7-1. truthiness narrowing は空文字も false と扱う

`equality-truthiness-narrowing.ts` では、truthiness narrowing と nullish check の違いを確認している。

```ts
function formatMessageByTruthiness(message: OptionalMessage): string {
  if (message) {
    return `message:${message}`;
  }

  return 'messageなし';
}
```

`if (message)` は `null` や `undefined` だけでなく、空文字 `''` も false として扱う。  
そのため、空文字も有効な入力値として扱いたい場合には、この判定は適さない。

```ts
function formatMessageByNullishCheck(message: OptionalMessage): string {
  if (message == null) {
    return 'messageなし';
  }

  return `message:${message}`;
}
```

`message == null` は、`null` と `undefined` だけをまとめて判定する。  
フォーム入力や検索キーワードでは、空文字をどう扱うかが仕様に関わるため、truthiness に頼りすぎない方が安全である。

### 7-2. `typeof null` は `'object'` になる

`typeof-narrowing.ts` では、`null` を先に equality narrowing で処理している。

```ts
if (value === null) {
  return '';
}

if (typeof value === 'number') {
  return String(value);
}

return value.trim();
```

JavaScript では、`typeof null` が `'object'` になる。  
そのため、`typeof value === 'object'` のような判定を使う場合は、`value !== null` も合わせて確認する必要がある。

Unit 05 の `isRecord` でも、次のように `null` を除外している。

```ts
return typeof value === 'object' && value !== null;
```

### 7-3. `in` はプロパティの存在を見るが、設計上は判別用プロパティの方が読みやすいことがある

`in-narrowing.ts` では、`email` プロパティの存在で `EmailContact` へ絞っている。

```ts
if ('email' in contact) {
  return `${contact.displayName} <${contact.email}>`;
}
```

この方法は便利だが、プロパティの有無だけで型を分けるため、型の設計意図が見えにくくなる場合もある。  
同じファイルでは、`kind` を使った分岐も示している。

```ts
if (contact.kind === 'email') {
  return `email:${contact.email}`;
}
```

`kind` や `status` のような判別用プロパティがあると、「この値はどの種類なのか」を明示できる。  
状態やイベントの種類を分けるなら、discriminated union として設計する方が読みやすいことが多い。

### 7-4. `unknown` を `Record<string, unknown>` に絞っても、各プロパティはまだ `unknown`

`unknown-safe-narrowing.ts` では、まず `isRecord` でオブジェクトかどうかを確認している。

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
```

この時点で、`value.id` のようなキーアクセスはできるようになる。  
ただし、`value.id` の型はまだ `unknown` である。

```ts
return (
  typeof value.id === 'string' && typeof value.title === 'string' && typeof value.price === 'number'
);
```

各プロパティを使うには、それぞれの型も確認する必要がある。  
`Record<string, unknown>` に絞っただけで、`ProductPayload` になったわけではない点に注意する。

### 7-5. `never` を使う網羅性確認は、後から union に候補が増えたときに効く

`exhaustive-check-never.ts` では、`assertNever` を使っている。

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
```

`formatNotificationTarget` では、`target.kind` のすべての候補を `switch` で処理している。

```ts
switch (target.kind) {
  case 'email':
    return `email:${target.address}`;
  case 'sms':
    return `sms:${target.phoneNumber}`;
  case 'push':
    return `push:${target.deviceToken}`;
  default:
    return assertNever(target);
}
```

今は `email`、`sms`、`push` をすべて処理しているため、`default` に来る `target` は `never` になる。  
後から `kind: 'slack'` のような候補を追加した場合、`switch` に `case 'slack'` を追加しなければ `assertNever(target)` の箇所で型エラーになる。

## 8. 実務でよく使う場面

### 8-1. API レスポンスの成功 / 失敗を union 型で表す

`api-result-union.ts` では、API レスポンスを `ok: true` / `ok: false` で分けている。

```ts
type ApiResult<TData> =
  | {
      readonly ok: true;
      readonly data: TData;
    }
  | {
      readonly ok: false;
      readonly error: ApiError;
    };
```

成功時は `data` を持ち、失敗時は `error` を持つ。  
この形にすると、成功時にだけ `data` を読み、失敗時にだけ `error` を読む流れを型で表現できる。

```ts
if (result.ok) {
  return `book:${result.data.id}:${result.data.title}`;
}

return `error:${result.error.code}:${result.error.message}`;
```

API レスポンスを単に `data?: T` や `error?: Error` のようにすると、成功なのに `data` がない、失敗なのに `error` がない、といった不整合が入りやすい。  
discriminated union を使うと、状態とデータを結び付けやすい。

### 8-2. 画面状態を `loading` / `success` / `error` で分ける

`loading-success-error-state.ts` では、書籍一覧の状態を `BookListState` として定義している。

```ts
type BookListState =
  | {
      readonly status: 'idle';
    }
  | {
      readonly status: 'loading';
    }
  | {
      readonly status: 'success';
      readonly books: readonly Book[];
    }
  | {
      readonly status: 'error';
      readonly message: string;
    };
```

画面状態を1つのオブジェクトにまとめる場合、`status` と対応するデータを union 型で表すと不整合を減らせる。  
`success` のときだけ `books` があり、`error` のときだけ `message` がある、という関係を型で表せるためである。

React で API 取得状態を管理するときにも、この形はよく使う。

### 8-3. reducer action を discriminated union で表す

`reducer-action-union.ts` では、`CounterAction` を `type` で分けている。

```ts
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
```

`increment` と `decrement` は `amount` と `actor` を持つ。  
`reset` はそれらを持たない。

```ts
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
```

このように書くと、`reset` の分岐で存在しない `action.amount` を読もうとするミスを防ぎやすい。  
React の `useReducer` に進んだときにも、そのまま使える考え方である。

### 8-4. 外部入力を `unknown` で受けて type guard で確認する

API、localStorage、URL query、フォーム入力、ファイル読み込みなど、外部から来る値は実行時に期待通りとは限らない。

`unknown-safe-narrowing.ts` では、外部入力を `unknown` として受け取っている。

```ts
function formatProductPayload(value: unknown): string {
  if (!isProductPayload(value)) {
    return 'invalid product payload';
  }

  return `${value.title}: ${value.price.toLocaleString('ja-JP')}円`;
}
```

`isProductPayload` が true を返した後だけ、`value` を `ProductPayload` として扱う。  
この形にしておくと、実行時に形が崩れた値が来た場合でも、安全に弾ける。

### 8-5. 状態とデータを optional で雑に持つより、union で分ける

画面状態を次のように表すこともできる。

```ts
type LooseState = {
  readonly loading: boolean;
  readonly data?: string;
  readonly error?: string;
};
```

ただし、この形だと「`loading: true` なのに `data` がある」「`data` と `error` が同時にある」といった状態を表せてしまう。  
Unit 05 の `BookListState` のように、`status` で分けると、状態ごとに必要なデータだけを持てる。

この違いは、実務の状態設計で非常に重要になる。

## 9. React につながるポイント

### 9-1. API 取得状態は discriminated union と相性がよい

React で API 取得状態を扱う場合、`loading`、`success`、`error` のような状態を持つことが多い。

```ts
type BookListState =
  | {
      readonly status: 'idle';
    }
  | {
      readonly status: 'loading';
    }
  | {
      readonly status: 'success';
      readonly books: readonly Book[];
    }
  | {
      readonly status: 'error';
      readonly message: string;
    };
```

この形は React の `useState` でそのまま使える。  
`status === 'success'` のときだけ `books` を読む、`status === 'error'` のときだけ `message` を読む、という表示分岐を型で支えられる。

### 9-2. `useReducer` の action 型は `type` で分ける

React の `useReducer` では、action を discriminated union で表すことが多い。

```ts
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
```

`action.type` を見れば、その action がどのプロパティを持つか分かる。  
そのため、reducer の中で安全に `amount` や `actor` を読める。

Unit 05 の reducer サンプルは、React をまだ導入しない状態で、`useReducer` の型設計だけを先に確認するためのものと考える。

### 9-3. props の variant や status は literal union で表せる

React の props では、表示パターンを文字列で受け取ることがある。

```ts
type ButtonProps = {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'danger';
};
```

Unit 05 の `UserRole` や `ThemeMode` と同じように、許可する文字列だけを literal union で定義する。  
これにより、存在しない variant を渡すミスを型チェックで防げる。

### 9-4. type guard は props や外部データの境界で使える

React コンポーネント内で外部データを扱う場合、API から来た値や URL query の値をそのまま信用しない方がよい。

```ts
function isProductPayload(value: unknown): value is ProductPayload {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number'
  );
}
```

このような type guard を境界で使うと、コンポーネント内部では確認済みの型として扱いやすくなる。  
React の学習に進んでも、外部入力を `unknown` として受け、type guard で絞る考え方は重要になる。

### 9-5. exhaustive check は reducer や表示分岐の保守性につながる

React の state や action が増えると、表示分岐や reducer の分岐漏れが起きやすくなる。  
Unit 05 の `assertNever` は、その漏れを型チェックで検出しやすくするための考え方である。

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
```

候補が増えたときに、`switch` の処理漏れが型エラーとして見えるようになる。  
React の reducer、画面状態の render 分岐、通知種類の分岐などで役立つ。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- union 型が「複数候補のどれか」を表すことを説明できる
- literal union を使って許可する文字列を限定できることを説明できる
- nullable union では、`null` を使う前に分岐する必要があることを説明できる
- `typeof` による narrowing を説明できる
- `in` による narrowing を説明できる
- `instanceof` による narrowing を説明できる
- equality narrowing と truthiness narrowing の違いを説明できる
- optional chaining で得られる値に `undefined` が混ざることを説明できる
- custom type guard と type predicate の役割を説明できる
- `value is Type` の意味を説明できる
- `unknown` から安全に型を絞る流れを説明できる
- discriminated union の判別用プロパティを説明できる
- `status` / `kind` / `type` による分岐を説明できる
- API レスポンスの成功 / 失敗を union 型で表す利点を説明できる
- `loading` / `success` / `error state` を union 型で表す利点を説明できる
- React の `useReducer` に action 型がつながることを説明できる
- `never` を使った exhaustive check の目的を説明できる
