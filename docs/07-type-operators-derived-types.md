# 07. keyof / typeof / indexed access・派生型の入口

## 1. 学習対象

この単位では、TypeScript の型を読む力をつけるために、`keyof`、型コンテキストの `typeof`、indexed access types、派生型の入口を学ぶ。  
実務コードや utility types の内部に出てくる型を見たときに、「元の型から key や value の型を取り出している」と読めるようにすることを目的とする。

Unit 06 では、generics を使って型引数がどこから決まるかを確認した。  
Unit 07 では、object type や値から型を取り出し、別の型を派生させる読み方を確認する。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

- `keyof`
- 型コンテキストの `typeof`
- 実行時の `typeof` との違い
- `indexed access types`
- `T[K]`
- `keyof typeof`
- 配列から `union` 型を作る
- オブジェクトから `union` 型を作る
- `as const` と組み合わせた型抽出の入口
- `mapped types`
- `readonly` modifier
- `?` modifier
- `key remapping` の概要
- `conditional types`
- `T extends U ? X : Y`
- `distributive conditional types` の概要
- `infer` の概要
- `template literal types`
- 文字列 `union` の組み立て
- `utility types` の内部理解につながる考え方

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  07-type-operators-derived-types/
    index.ts
    keyof-basics.ts
    typeof-type-context.ts
    indexed-access-types.ts
    keyof-typeof-basics.ts
    array-to-union.ts
    object-to-union.ts
    as-const-type-extraction.ts
    mapped-types-basics.ts
    mapped-type-modifiers.ts
    key-remapping-overview.ts
    conditional-types-basics.ts
    distributive-conditional-infer.ts
    template-literal-types.ts
    utility-types-internal-concepts.ts

docs/
  07-type-operators-derived-types.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 07 のサンプルを順番に実行する入口。
- `keyof-basics.ts`
  - `keyof` で object type の key を union 型にする基本を確認する。
- `typeof-type-context.ts`
  - 型コンテキストの `typeof` と実行時の `typeof` の違いを確認する。
- `indexed-access-types.ts`
  - `Article['title']` や `TObject[TKey]` のような indexed access types を確認する。
- `keyof-typeof-basics.ts`
  - 値として定義した object から `keyof typeof` で key の union を作る。
- `array-to-union.ts`
  - `const roles = [...] as const` から union 型を作る。
- `object-to-union.ts`
  - 設定オブジェクトから key / value の union 型を作る。
- `as-const-type-extraction.ts`
  - `as const` の配列から object 要素の union 型やプロパティの union 型を取り出す。
- `mapped-types-basics.ts`
  - `keyof` と mapped types で form errors / touched object を作る。
- `mapped-type-modifiers.ts`
  - `-readonly` と `-?` modifier の入口を確認する。
- `key-remapping-overview.ts`
  - mapped type の key remapping の概要を確認する。
- `conditional-types-basics.ts`
  - `T extends U ? X : Y` の基本を確認する。
- `distributive-conditional-infer.ts`
  - distributive conditional types と `infer` の概要を確認する。
- `template-literal-types.ts`
  - template literal types で文字列 union を組み立てる。
- `utility-types-internal-concepts.ts`
  - `Pick` / `Partial` / `Readonly` 的な型の内部理解につながる考え方を確認する。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:07
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

この単位では、実行時の値そのものよりも、型がどこから派生しているかが重要である。  
`npm run unit:07` で値の流れを確認し、`npm run typecheck` で型チェックが通ることを確認する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/07-type-operators-derived-types/index.ts`
2. `src/07-type-operators-derived-types/keyof-basics.ts`
3. `src/07-type-operators-derived-types/typeof-type-context.ts`
4. `src/07-type-operators-derived-types/indexed-access-types.ts`
5. `src/07-type-operators-derived-types/keyof-typeof-basics.ts`
6. `src/07-type-operators-derived-types/array-to-union.ts`
7. `src/07-type-operators-derived-types/object-to-union.ts`
8. `src/07-type-operators-derived-types/as-const-type-extraction.ts`
9. `src/07-type-operators-derived-types/mapped-types-basics.ts`
10. `src/07-type-operators-derived-types/mapped-type-modifiers.ts`
11. `src/07-type-operators-derived-types/key-remapping-overview.ts`
12. `src/07-type-operators-derived-types/conditional-types-basics.ts`
13. `src/07-type-operators-derived-types/distributive-conditional-infer.ts`
14. `src/07-type-operators-derived-types/template-literal-types.ts`
15. `src/07-type-operators-derived-types/utility-types-internal-concepts.ts`

最初に `keyof`、型コンテキストの `typeof`、indexed access types を読む。  
その後、配列やオブジェクトから union 型を作るパターンを確認する。  
最後に、mapped types、conditional types、infer、template literal types、utility types の内部理解につながる型を読む。

## 6. 注目ポイント

### 6-1. `keyof` は object type の key を union 型にする

`keyof-basics.ts` では、`keyof UserProfile` を使っている。

```ts
type UserProfileKey = keyof UserProfile;
```

これは、`UserProfile` のプロパティ名を union 型として取り出す。  
`UserProfile` が `id`、`name`、`email`、`age` を持つ場合、`UserProfileKey` はそれらの key の union として読める。

`keyof` は、object type から key の型を派生させるための基本である。  
Unit 06 の generics と組み合わせると、`TKey extends keyof TObject` のような形でよく出てくる。

### 6-2. 型コンテキストの `typeof` は値から型を作る

`typeof-type-context.ts` では、値 `defaultSearchOptions` から型 `SearchOptions` を作っている。

```ts
const defaultSearchOptions = {
  keyword: '',
  page: 1,
  pageSize: 20,
  includeArchived: false,
};

type SearchOptions = typeof defaultSearchOptions;
```

これは実行時の `typeof value === 'string'` とは違う。  
型コンテキストの `typeof` は、値の形を型として取り出す。

設定オブジェクト、初期 state、定数 map から型を派生させたい場面でよく使う。

### 6-3. indexed access types はプロパティの型を取り出す

`indexed-access-types.ts` では、次のような型を定義している。

```ts
type ArticleTitle = Article['title'];
type ArticleAuthorName = Article['author']['name'];
type ArticleTag = Article['tags'][number];
```

`Article['title']` は、`Article` の `title` プロパティの型を取り出す。  
`Article['author']['name']` のように、ネストした object type の一部も取り出せる。  
`Article['tags'][number]` は、配列の要素型を取り出す。

元の型から一部の型を派生させるため、手書きの重複を減らせる。

### 6-4. `keyof typeof` は値から key の union 型を作る定番パターン

`keyof-typeof-basics.ts` では、値 `statusLabels` から `ArticleStatus` 型を作っている。

```ts
const statusLabels = {
  draft: '下書き',
  reviewing: 'レビュー中',
  published: '公開済み',
} as const;

type ArticleStatus = keyof typeof statusLabels;
```

`typeof statusLabels` で値の型を取り出し、`keyof` で key を union 型にしている。  
値を1箇所に定義し、そこから型を作るため、値と型の二重管理を減らせる。

### 6-5. 配列から union 型を作るには `(typeof values)[number]` を使う

`array-to-union.ts` では、次のように `UserRole` を作っている。

```ts
const userRoles = ['admin', 'member', 'viewer'] as const;

type UserRole = (typeof userRoles)[number];
```

`typeof userRoles` で配列の型を取り出し、`[number]` で配列要素の型を取り出す。  
`as const` があるため、要素は `string` ではなく `'admin' | 'member' | 'viewer'` として保持される。

この形は、権限、状態、カテゴリ、タブ名、メニュー名などでよく使う。

## 7. 引っかかりやすい点

### 7-1. 型コンテキストの `typeof` と実行時の `typeof` は役割が違う

同じ `typeof` でも、使う場所によって意味が違う。

```ts
type SearchOptions = typeof defaultSearchOptions;
```

これは型を作るための `typeof` である。

一方で、次は実行時に値の種類を判定する `typeof` である。

```ts
if (typeof value === 'string') {
  return `string:${value}`;
}
```

Unit 05 の narrowing で使ったのは実行時の `typeof` である。  
Unit 07 で扱う型コンテキストの `typeof` は、値から型を取り出すために使う。

### 7-2. 型は実行時には存在しない

`array-to-union.ts` では、`UserRole` 型を作っている。

```ts
type UserRole = (typeof userRoles)[number];
```

ただし、`UserRole` は実行時には存在しない。  
そのため、実行時の文字列が `UserRole` かどうかを確認するには、実際の値 `userRoles` を使う必要がある。

```ts
function hasRole(role: string): role is UserRole {
  return (userRoles as readonly string[]).includes(role);
}
```

型と値の境界を意識することが重要である。

### 7-3. `as const` がないと union が広がりやすい

`const userRoles = ['admin', 'member', 'viewer']` だけだと、TypeScript は多くの場合 `string[]` として扱う。  
その場合、`(typeof userRoles)[number]` は `string` になり、`'admin' | 'member' | 'viewer'` にはならない。

`as const` を付けることで、配列要素を具体的な文字列リテラルとして保持できる。

```ts
const userRoles = ['admin', 'member', 'viewer'] as const;
```

Unit 08 で `as const` はさらに扱うが、Unit 07 では型抽出と組み合わせる入口として読む。

### 7-4. `Object.keys` や `Object.fromEntries` は型情報を広くしやすい

`keyof-typeof-basics.ts` では、`Object.keys(statusLabels)` を `ArticleStatus[]` として扱っている。

```ts
return Object.keys(statusLabels) as ArticleStatus[];
```

実行時には `statusLabels` の key だけが返るが、TypeScript の標準的な型では `Object.keys` の戻り値は広い `string[]` になりやすい。  
このような場面では型アサーションが必要になることがある。

ただし、型アサーションは実装と型のずれを隠す可能性がある。  
どこで使っているかを意識する必要がある。

### 7-5. conditional types は実行時の if ではない

`conditional-types-basics.ts` では、次の型を定義している。

```ts
type IsString<TValue> = TValue extends string ? true : false;
```

これは型レベルの条件分岐である。  
JavaScript の `if` 文のように実行時に分岐するものではない。

Unit 07 では、conditional types を「型を条件に応じて切り替える書き方」として読む。  
複雑な conditional types の設計には踏み込まない。

## 8. 実務でよく使う場面

### 8-1. 設定オブジェクトから型を派生させる

`object-to-union.ts` では、`routeConfig` から `RouteName` や `RoutePath` を作っている。

```ts
const routeConfig = {
  home: {
    path: '/',
    title: 'ホーム',
  },
  books: {
    path: '/books',
    title: '書籍一覧',
  },
  settings: {
    path: '/settings',
    title: '設定',
  },
} as const;

type RouteName = keyof typeof routeConfig;
type RoutePath = (typeof routeConfig)[RouteName]['path'];
```

ルーティング、メニュー、権限、ステータス表示など、設定オブジェクトを1つ置いて、そこから型を派生させる場面は多い。

### 8-2. フォームの errors / touched object を mapped types で作る

`mapped-types-basics.ts` では、`FormValues` から `FormErrors<TValues>` と `FormTouched<TValues>` を作っている。

```ts
type FormErrors<TValues> = {
  readonly [Key in keyof TValues]?: string;
};

type FormTouched<TValues> = {
  readonly [Key in keyof TValues]: boolean;
};
```

フォームの値、エラー、入力済み状態は同じ key を共有することが多い。  
mapped types を使うと、元の form values の key を基準に派生型を作れる。

### 8-3. Utility Types の内部を読めるようになる

`utility-types-internal-concepts.ts` では、`MyPick`、`MyPartial`、`MyReadonly` を定義している。

```ts
type MyPick<TValue, TKey extends keyof TValue> = {
  readonly [Key in TKey]: TValue[Key];
};

type MyPartial<TValue> = {
  readonly [Key in keyof TValue]?: TValue[Key];
};
```

これは、TypeScript 標準の Utility Types を完全に再実装する目的ではない。  
`Pick` や `Partial` が、`keyof`、indexed access、mapped types の組み合わせで読めることを確認するためである。

### 8-4. 文字列の命名規則を型で表す

`template-literal-types.ts` では、権限名を template literal types で作っている。

```ts
type ResourceName = 'user' | 'book';
type ActionName = 'read' | 'write';
type PermissionName = `${ResourceName}:${ActionName}`;
```

`PermissionName` は、`'user:read' | 'user:write' | 'book:read' | 'book:write'` のような union 型になる。  
権限名、イベント名、CSS class 名、API path の一部など、命名規則がある文字列で使われることがある。

## 9. React につながるポイント

### 9-1. props や state の key から派生型を作れる

React では、props や state の key を使って、エラー表示や変更ハンドラを作ることがある。  
Unit 07 の `keyof`、mapped types、key remapping は、その基礎になる。

```ts
type ChangeHandlers<TValues> = {
  readonly [Key in keyof TValues as `on${Capitalize<string & Key>}Change`]: (
    value: TValues[Key],
  ) => void;
};
```

これは、form values の key から `onTitleChange` のような handler 名を作る例である。

### 9-2. reducer action やメニュー定義を値から型にできる

`as-const-type-extraction.ts` では、action 定義の配列から `ActionType` を作っている。

```ts
const actionDefinitions = [
  {
    type: 'task/add',
    label: 'タスク追加',
  },
  {
    type: 'task/toggle',
    label: '完了切り替え',
  },
] as const;

type ActionDefinition = (typeof actionDefinitions)[number];
type ActionType = ActionDefinition['type'];
```

React の reducer action、メニュー定義、タブ定義などでは、値の一覧から型を作ると二重管理を減らせる。

### 9-3. form values から errors / touched / handlers を派生できる

フォームでは、values、errors、touched、handlers が同じ key を共有しやすい。  
Unit 07 の mapped types を使うと、values の key を基準に他の型を派生できる。

```ts
type FormErrors<TValues> = {
  readonly [Key in keyof TValues]?: string;
};
```

この考え方は、React Hook Form や自作 form state の型を読むときにも役立つ。

### 9-4. Utility Types を読めると React の型も読みやすくなる

React 周辺の型には、`Pick`、`Partial`、`Readonly`、`Record` などの Utility Types がよく出てくる。  
Unit 07 で `keyof`、indexed access、mapped types の入口を押さえておくと、こうした Utility Types を単なる暗記ではなく、派生型として読めるようになる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `keyof` が object type の key を union 型にすることを説明できる
- 型コンテキストの `typeof` と実行時の `typeof` の違いを説明できる
- indexed access types でプロパティの型を取り出せる
- `T[K]` の基本的な読み方を説明できる
- `keyof typeof` の定番パターンを説明できる
- 配列から `(typeof values)[number]` で union 型を作れる
- オブジェクトから key / value の union 型を作れる
- `as const` と型抽出の関係を説明できる
- mapped types の基本形を説明できる
- `readonly` modifier と `?` modifier の入口を説明できる
- key remapping の概要を説明できる
- conditional types の `T extends U ? X : Y` を読める
- distributive conditional types の概要を説明できる
- `infer` が条件に合う部分の型を取り出すものだと説明できる
- template literal types で文字列 union を組み立てられることを説明できる
- utility types の内部理解に `keyof` / indexed access / mapped types がつながることを説明できる
