# 10. 非同期処理・API レスポンス・JSON・エラー処理・Result 型

## 1. 学習対象

この単位では、TypeScript で非同期処理、API response、JSON、エラー処理、Result 型を扱う。  
JavaScript 学習で確認した Promise、async / await、JSON.parse、try-catch を、TypeScript の型付きコードとして読み直す。

実務や React では、API から値を取得し、JSON を受け取り、成功 / 失敗を分岐し、画面状態へ反映する流れが非常に多い。  
この単位では、その流れを TypeScript でどう表すかを確認する。

Unit 05 では union 型と narrowing、Unit 06 では generics、Unit 09 では配列・オブジェクト変換を扱った。  
Unit 10 ではそれらを組み合わせて、外部入力、API DTO、Result 型、画面状態へ接続する。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

### 非同期処理

- `Promise<T>`
- `async function` の戻り値
- `Awaited<T>`
- `Promise.all`
- `Promise.allSettled`
- `async` / `await` と型
- 非同期関数のエラー

### `fetch` / `API response`

- `fetch` の型
- `response handling`
- `JSON.parse` の型
- `API response` 型
- `nullable` な `API` データ
- `optional` な `API` データ
- 成功レスポンス
- 失敗レスポンス
- `pagination response`
- `list response`
- `detail response`

### `JSON` / `unknown`

- `JSON.parse`
- 外部入力は最初 `unknown` として扱う考え方
- TypeScript の型だけでは実行時 `validation` にならないこと
- `type guard` による簡易検証
- `assertion function` の入口

### エラー処理

- `try-catch`
- `catch` した `error` の型
- `unknown` としての `error`
- `custom error class`
- `API error`
- `validation error`
- `domain error`

### `Result` 型

- `Result` 型風の成功 / 失敗表現
- `validation result`
- `API result`
- 例外で扱う失敗
- 戻り値で扱う失敗

この Unit は厚めに扱う。  
React の API 取得状態、フォーム検証、エラー表示にかなりつながるため、実務寄りの型として整理する。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  10-async-api-json-result/
    index.ts
    promise-basics.ts
    async-function-return-types.ts
    awaited-promise-all.ts
    promise-allsettled.ts
    fetch-response-handling.ts
    json-unknown-boundary.ts
    type-guard-validation.ts
    assertion-function-basics.ts
    api-response-shapes.ts
    nullable-optional-api-data.ts
    pagination-list-detail-response.ts
    try-catch-unknown-error.ts
    custom-error-classes.ts
    result-type-basics.ts
    api-validation-result.ts
    react-api-state-concepts.ts

docs/
  10-async-api-json-result.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 10 のサンプルを順番に実行する入口。
- `promise-basics.ts`
  - `Promise<T>` の基本を確認する。
- `async-function-return-types.ts`
  - async function の戻り値型と推論を確認する。
- `awaited-promise-all.ts`
  - `Awaited<T>` と `Promise.all` を確認する。
- `promise-allsettled.ts`
  - `Promise.allSettled` と fulfilled / rejected の分岐を確認する。
- `fetch-response-handling.ts`
  - fetch 風の response handling と success / error response を確認する。
- `json-unknown-boundary.ts`
  - `JSON.parse` の戻り値を `unknown` として扱う考え方を確認する。
- `type-guard-validation.ts`
  - type guard による簡易 validation を確認する。
- `assertion-function-basics.ts`
  - assertion function の入口を確認する。
- `api-response-shapes.ts`
  - API response 型と成功 / 失敗の discriminated union を確認する。
- `nullable-optional-api-data.ts`
  - nullable / optional な API データを扱う。
- `pagination-list-detail-response.ts`
  - pagination / list / detail response を扱う。
- `try-catch-unknown-error.ts`
  - catch した error を unknown として扱う。
- `custom-error-classes.ts`
  - custom error class と instanceof narrowing を確認する。
- `result-type-basics.ts`
  - Result 型風の成功 / 失敗表現を確認する。
- `api-validation-result.ts`
  - validation result と API result をまとめて扱う。
- `react-api-state-concepts.ts`
  - React の API 取得状態につながる型設計を確認する。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:10
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

この単位では、`npm run unit:10` で Promise / async / Result 型の実行時の値を確認し、`npm run typecheck` で API 境界や unknown の扱いを確認する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/10-async-api-json-result/index.ts`
2. `src/10-async-api-json-result/promise-basics.ts`
3. `src/10-async-api-json-result/async-function-return-types.ts`
4. `src/10-async-api-json-result/awaited-promise-all.ts`
5. `src/10-async-api-json-result/promise-allsettled.ts`
6. `src/10-async-api-json-result/fetch-response-handling.ts`
7. `src/10-async-api-json-result/json-unknown-boundary.ts`
8. `src/10-async-api-json-result/type-guard-validation.ts`
9. `src/10-async-api-json-result/assertion-function-basics.ts`
10. `src/10-async-api-json-result/api-response-shapes.ts`
11. `src/10-async-api-json-result/nullable-optional-api-data.ts`
12. `src/10-async-api-json-result/pagination-list-detail-response.ts`
13. `src/10-async-api-json-result/try-catch-unknown-error.ts`
14. `src/10-async-api-json-result/custom-error-classes.ts`
15. `src/10-async-api-json-result/result-type-basics.ts`
16. `src/10-async-api-json-result/api-validation-result.ts`
17. `src/10-async-api-json-result/react-api-state-concepts.ts`

最初に `Promise<T>` と async function の戻り値を確認する。  
その後、`Promise.all`、`Promise.allSettled`、fetch 風 response、JSON / unknown、type guard、assertion function、API response、Result 型、React の状態型へ進む。

## 6. 注目ポイント

### 6-1. `Promise<T>` の `T` は await 後の値の型を表す

`promise-basics.ts` では、`fetchUserName` を定義している。

```ts
function fetchUserName(): Promise<string> {
  return Promise.resolve('Sato');
}
```

`Promise<string>` は、今すぐ string があるという意味ではない。  
将来 resolve されたときに string が得られる非同期値を表す。

`await` すると、`Promise<string>` から string を取り出せる。

```ts
const userName = await fetchUserName();
```

このとき、`userName` は string として扱える。  
API client や repository 風関数では、戻り値が `Promise<T>` になることが多い。

### 6-2. async function の戻り値型は `Promise<T>` になる

`async-function-return-types.ts` では、async function の戻り値を確認している。

```ts
async function fetchCompletedTaskCount(): Promise<number> {
  return 3;
}
```

関数内では number を return しているが、async function 全体の戻り値型は `Promise<number>` である。

公開 API や repository に近い関数では、戻り値型を明示すると読み手に意図が伝わりやすい。

```ts
async function fetchTask(): Promise<Task> {
  return {
    id: 'task-001',
    title: '非同期処理を確認する',
    completed: false,
  };
}
```

内部の小さな関数では推論に任せてもよいが、外部に公開する関数や Result 型を返す関数では、戻り値型を明示する方が安全で読みやすい。

### 6-3. 外部入力は最初 `unknown` として扱う

`json-unknown-boundary.ts` では、`JSON.parse` の戻り値を unknown として扱っている。

```ts
function parseJson(jsonText: string): unknown {
  return JSON.parse(jsonText) as unknown;
}
```

TypeScript の型は実行時 validation ではない。  
そのため、JSON や API response のような外部入力を、いきなり DTO 型として扱うのは危険である。

```ts
const parsed = parseJson(jsonText);

if (!isBookDto(parsed)) {
  return undefined;
}
```

unknown として受け取り、type guard で確認してから DTO として扱う流れが重要となる。

### 6-4. API response は成功 / 失敗を型で分けると扱いやすい

`api-response-shapes.ts` では、成功レスポンスと失敗レスポンスを union 型で表している。

```ts
type ApiResponse<TData> = SuccessResponse<TData> | ErrorResponse;
```

成功側は `ok: true` と `data` を持つ。  
失敗側は `ok: false` と `error` を持つ。

```ts
if (response.ok) {
  return `task:${response.data.title}`;
}

return `error:${response.error.message}`;
```

`ok` による分岐で narrowing されるため、成功時だけ `data`、失敗時だけ `error` を安全に扱える。

### 6-5. Result 型は戻り値で失敗を表す

`result-type-basics.ts` では、Result 型風の成功 / 失敗表現を扱っている。

```ts
type Result<TData, TError> = Success<TData> | Failure<TError>;
```

例外を投げる代わりに、戻り値として成功 / 失敗を返す。  
フォーム validation や API response validation では、この形が扱いやすいことがある。

```ts
if (trimmedTitle.length === 0) {
  return {
    ok: false,
    error: {
      code: 'EMPTY_TITLE',
      message: 'タイトルを入力してください',
    },
  };
}
```

呼び出し側は `ok` で分岐し、成功時の `data` と失敗時の `error` を安全に扱う。

## 7. 引っかかりやすい点

### 7-1. `Promise<T>` と `T` を混同しない

`Promise<User>` と `User` は同じではない。  
`Promise<User>` は非同期値であり、`await` してはじめて `User` として扱える。

```ts
const user = await fetchUser();
```

React の data fetching や API client では、関数の戻り値が `Promise<T>` になり、状態に入れる値が `T` になる。  
この違いを混同すると、型エラーや非同期処理の設計ミスにつながる。

### 7-2. `JSON.parse` に型注釈を付けても実行時 validation にはならない

`JSON.parse` の結果を `BookDto` と書いても、実行時に形式が検証されるわけではない。  
TypeScript の型はコンパイル時の仕組みであり、実行時の値を自動でチェックしない。

```ts
function parseBookDto(jsonText: string): BookDto | undefined {
  const parsed = parseJson(jsonText);

  if (!isBookDto(parsed)) {
    return undefined;
  }

  return parsed;
}
```

外部入力は unknown として受け、type guard や validation を通す方が安全である。

### 7-3. optional と nullable は違う

`nullable-optional-api-data.ts` では、optional property と nullable property を扱っている。

```ts
type UserDto = {
  readonly id: string;
  readonly name: string;
  readonly nickname?: string;
  readonly lastLoginAt: string | null;
};
```

`nickname?: string` は、プロパティ自体が省略される可能性を表す。  
`lastLoginAt: string | null` は、プロパティは存在するが値が null の可能性を表す。

API DTO ではこの2つが混在しやすいため、変換処理で意味を分けて扱う必要がある。

### 7-4. catch した error をすぐ `Error` と決めつけない

JavaScript では、`throw` できる値は `Error` だけではない。  
そのため、catch した値は unknown として扱い、`instanceof Error` で絞る。

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'unknown error';
}
```

実務では、外部ライブラリや古いコードから Error 以外が投げられる可能性もある。  
安全に扱うためには、まず unknown として受ける感覚が重要である。

### 7-5. 例外で扱う失敗と戻り値で扱う失敗を分ける

すべての失敗を例外で扱う必要はない。  
入力 validation のように想定内の失敗は、Result 型で戻り値として表す方が扱いやすい場合がある。

一方、システム上の予期しない失敗や、処理を継続できない失敗は例外として扱うこともある。  
Unit 10 では、custom error class と Result 型の両方を扱い、失敗の表現を分けている。

## 8. 実務でよく使う場面

### 8-1. API client の戻り値型を `Promise<T>` で表す

実務では、API client の関数が `Promise<T>` を返すことが多い。

```ts
async function fetchTask(): Promise<Task> {
  return {
    id: 'task-001',
    title: '非同期処理を確認する',
    completed: false,
  };
}
```

API client では、戻り値型を明示することで、呼び出し側が何を受け取るのか分かりやすくなる。

### 8-2. API DTO から view model へ変換する

`pagination-list-detail-response.ts` では、API DTO を表示用の型へ変換している。

```ts
function toRepositoryCard(dto: RepositoryDto): RepositoryCard {
  return {
    id: dto.id,
    title: dto.name,
    starLabel: `${dto.star_count} stars`,
  };
}
```

API の命名や形式をそのまま画面へ持ち込むのではなく、表示に使いやすい型へ変換する。  
これは Unit 03、Unit 09 と同じく、実務で非常に多い処理である。

### 8-3. type guard で API response validation を行う

`api-validation-result.ts` では、API から返った unknown を `LoginDto` に絞っている。

```ts
if (!isLoginDto(responseBody)) {
  return {
    ok: false,
    error: {
      type: 'api',
      message: 'ログイン API のレスポンス形式が不正です',
    },
  };
}
```

TypeScript の型だけでは API response の実行時 validation にはならない。  
必要に応じて type guard や validation library を使い、外部入力を確認する。

### 8-4. Result 型でフォーム validation の失敗を表す

フォーム入力では、空文字、形式不正、文字数超過など、想定内の失敗が多い。  
そのような失敗は例外よりも Result 型で返す方が扱いやすい場合がある。

```ts
return {
  ok: false,
  error: {
    code: 'EMPTY_TITLE',
    message: 'タイトルを入力してください',
  },
};
```

React のフォームでは、このような error を state に入れ、画面へ表示することが多い。

## 9. React につながるポイント

### 9-1. API 取得状態は discriminated union と相性がよい

`react-api-state-concepts.ts` では、`AsyncState<TData, TError>` を定義している。

```ts
type AsyncState<TData, TError = string> =
  | {
      readonly status: 'idle';
    }
  | {
      readonly status: 'loading';
    }
  | {
      readonly status: 'success';
      readonly data: TData;
    }
  | {
      readonly status: 'error';
      readonly error: TError;
    };
```

React の API 取得では、idle、loading、success、error のような状態を扱うことが多い。  
`status` を discriminant として使うと、状態ごとに存在するプロパティを安全に扱える。

### 9-2. custom hook の戻り値型へつながる

`AsyncState<TData, TError>` は、custom hook の戻り値型につながる。

```ts
async function fetchArticleCards(): Promise<AsyncState<readonly ArticleCard[]>> {
  return {
    status: 'success',
    data: [
      {
        id: 'article-001',
        title: 'API 取得状態',
      },
    ],
  };
}
```

実際の React では、`useArticles` のような hook がこのような state を返すことがある。  
Unit 10 では React 自体は実装しないが、API 取得状態の型設計は React と強くつながる。

### 9-3. エラー表示は error 型の設計に影響を受ける

`error: string` としてシンプルに扱うこともできるが、実務では code、field、status などを持つ error 型を使うこともある。

```ts
type LoginError = {
  readonly type: 'api' | 'validation';
  readonly message: string;
};
```

React でエラー表示を行う場合、どの画面に何を表示するかは error 型の設計に影響される。  
そのため、API error、validation error、domain error を分けておくと扱いやすくなることがある。

### 9-4. API DTO をそのまま props に渡さない設計につながる

API DTO は外部システムの形に合わせた型であり、画面にとって使いやすい型とは限らない。  
Unit 10 では、DTO を view model に変換してから使う流れを扱った。

```ts
type RepositoryCard = {
  readonly id: string;
  readonly title: string;
  readonly starLabel: string;
};
```

React の props には、このような表示用の型を渡すと、コンポーネント側の責務が明確になりやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `Promise<T>` の `T` が await 後の値の型であることを説明できる
- async function の戻り値型が `Promise<T>` になることを説明できる
- `Awaited<T>` の基本的な読み方を説明できる
- `Promise.all` の戻り値型を説明できる
- `Promise.allSettled` の fulfilled / rejected を分岐できる
- fetch 風の response handling を説明できる
- `JSON.parse` の戻り値を unknown として扱う理由を説明できる
- TypeScript の型が実行時 validation ではないことを説明できる
- type guard による簡易 validation を説明できる
- assertion function の基本を説明できる
- 成功 / 失敗の API response 型を説明できる
- nullable と optional の違いを説明できる
- pagination / list / detail response を説明できる
- catch した error を unknown として扱う理由を説明できる
- custom error class を使った narrowing を説明できる
- Result 型で成功 / 失敗を戻り値として表せる
- validation result と API result の違いを説明できる
- React の API 取得状態に `AsyncState<TData>` がつながることを説明できる
