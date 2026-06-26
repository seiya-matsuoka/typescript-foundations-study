# 08. utility types・as const・satisfies・型アサーション・enum

## 1. 学習対象

この単位では、TypeScript の実務コードで頻出する utility types、as const、satisfies、型アサーション、enum を学ぶ。  
これらは個別の文法として覚えるだけではなく、API DTO、フォーム、設定オブジェクト、React props、メニュー定義、状態値などで組み合わせて使うことが多い。

Unit 07 では、keyof、typeof、indexed access types、mapped types、conditional types の入口を扱った。  
Unit 08 では、それらの考え方を土台にして、標準 utility types や実務寄りの定数定義を読めるようにする。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

### utility types

- `Partial<T>`
- `Required<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Omit<T, K>`
- `Record<K, T>`
- `Exclude<T, U>`
- `Extract<T, U>`
- `NonNullable<T>`
- `Parameters<T>`
- `ReturnType<T>`
- `Awaited<T>`

### as const

- const assertion
- literal type を保つ
- readonly tuple 化
- 定数配列から union 型を作る
- 定数オブジェクトから型を作る

### satisfies

- satisfies の基本
- 型注釈との違い
- 型アサーションとの違い
- literal type を保ったまま形を検証する
- config object
- menu / route / status / options 定義

### 型アサーション

- `as`
- type assertion
- non-null assertion `!`
- `as` の使いすぎの危険性
- `unknown` から絞る方が安全な場面
- DOM や外部入力で型アサーションが出る場面

### enum と union literal

- `enum`
- string enum
- numeric enum
- const enum の概要
- union literal
- as const 配列から union を作る
- enum を使う場面
- union literal を使う場面

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  08-utility-const-satisfies-assertion/
    index.ts
    partial-required-readonly.ts
    pick-omit-record.ts
    exclude-extract-nonnullable.ts
    parameters-returntype-awaited.ts
    as-const-array-union.ts
    as-const-object-types.ts
    satisfies-basics.ts
    satisfies-config-menu.ts
    type-assertion-basics.ts
    non-null-and-dom-assertion.ts
    enum-basics.ts
    enum-vs-union-literal.ts
    practical-react-config-form.ts

docs/
  08-utility-const-satisfies-assertion.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 08 のサンプルを順番に実行する入口。
- `partial-required-readonly.ts`
  - `Partial<T>`、`Required<T>`、`Readonly<T>` を確認する。
- `pick-omit-record.ts`
  - `Pick<T, K>`、`Omit<T, K>`、`Record<K, T>` を確認する。
- `exclude-extract-nonnullable.ts`
  - `Exclude<T, U>`、`Extract<T, U>`、`NonNullable<T>` を確認する。
- `parameters-returntype-awaited.ts`
  - `Parameters<T>`、`ReturnType<T>`、`Awaited<T>` を確認する。
- `as-const-array-union.ts`
  - as const 配列から union 型を作る流れを確認する。
- `as-const-object-types.ts`
  - as const オブジェクトから key / value の union 型を作る流れを確認する。
- `satisfies-basics.ts`
  - satisfies の基本、型注釈・型アサーションとの違いを確認する。
- `satisfies-config-menu.ts`
  - satisfies を config / menu / route 定義に使う例を確認する。
- `type-assertion-basics.ts`
  - `as` の基本と危険性、unknown から絞る方が安全な場面を確認する。
- `non-null-and-dom-assertion.ts`
  - non-null assertion と DOM 風の型アサーションを確認する。
- `enum-basics.ts`
  - numeric enum、string enum、const enum の概要を確認する。
- `enum-vs-union-literal.ts`
  - enum と union literal / const object の比較を確認する。
- `practical-react-config-form.ts`
  - React props / config / form / API DTO につながる使い方を確認する。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:08
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

この単位では、`npm run unit:08` で実行時の値を確認し、`npm run typecheck` で派生型や utility types の型チェックを確認する。  
型アサーションの危険性を説明するサンプルは入れているが、Unit 実行時に意図的に壊れるコードは含めていない。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/08-utility-const-satisfies-assertion/index.ts`
2. `src/08-utility-const-satisfies-assertion/partial-required-readonly.ts`
3. `src/08-utility-const-satisfies-assertion/pick-omit-record.ts`
4. `src/08-utility-const-satisfies-assertion/exclude-extract-nonnullable.ts`
5. `src/08-utility-const-satisfies-assertion/parameters-returntype-awaited.ts`
6. `src/08-utility-const-satisfies-assertion/as-const-array-union.ts`
7. `src/08-utility-const-satisfies-assertion/as-const-object-types.ts`
8. `src/08-utility-const-satisfies-assertion/satisfies-basics.ts`
9. `src/08-utility-const-satisfies-assertion/satisfies-config-menu.ts`
10. `src/08-utility-const-satisfies-assertion/type-assertion-basics.ts`
11. `src/08-utility-const-satisfies-assertion/non-null-and-dom-assertion.ts`
12. `src/08-utility-const-satisfies-assertion/enum-basics.ts`
13. `src/08-utility-const-satisfies-assertion/enum-vs-union-literal.ts`
14. `src/08-utility-const-satisfies-assertion/practical-react-config-form.ts`

最初に utility types を読み、次に as const と satisfies で値から型を作る流れを確認する。  
その後、型アサーションの危険性、enum と union literal の比較、最後に React / form / config / API DTO につながる例を読む。

## 6. 注目ポイント

### 6-1. utility types は既存の型から別の型を作る

`partial-required-readonly.ts` では、`UserProfile` から更新用、補完済み、読み取り専用の型を作っている。

```ts
type UserProfilePatch = Partial<Pick<UserProfile, 'name' | 'email' | 'bio'>>;
type CompletedUserProfile = Required<UserProfile>;
type FrozenUserProfile = Readonly<UserProfile>;
```

`Partial<T>` は、すべてのプロパティを optional にする。  
`Required<T>` は、optional property を必須にする。  
`Readonly<T>` は、プロパティの再代入を型チェック上防ぐ。

これらは新しいデータ構造を作るというより、既存の型を用途に合わせて変形する機能である。

### 6-2. Pick / Omit / Record は実務で特によく使う

`pick-omit-record.ts` では、`Account` から公開用の型と作成入力用の型を作っている。

```ts
type PublicAccount = Pick<Account, 'id' | 'displayName' | 'role'>;
type AccountCreateInput = Omit<Account, 'id' | 'passwordHash'> & {
  readonly password: string;
};
```

`Pick<T, K>` は必要なプロパティだけを抜き出す。  
`Omit<T, K>` は不要なプロパティを除外する。

同じファイルでは、role ごとの表示ラベルを `Record<K, T>` で表している。

```ts
type Role = Account['role'];
type RoleLabelMap = Record<Role, string>;
```

`Record<Role, string>` と書くことで、すべての role に対応する文字列があることを型で確認できる。

### 6-3. as const は literal 型を保つ

`as-const-array-union.ts` では、定数配列から union 型を作っている。

```ts
const roles = ['admin', 'member', 'guest'] as const;

type Role = (typeof roles)[number];
```

`as const` がない場合、配列の要素は広く `string` と推論されやすい。  
`as const` を付けると、`readonly ['admin', 'member', 'guest']` のような tuple として扱われる。

その結果、`(typeof roles)[number]` から `'admin' | 'member' | 'guest'` という union 型を作れる。

### 6-4. オブジェクトからも key / value の union 型を作れる

`as-const-object-types.ts` では、定数オブジェクトから key と value の union 型を作っている。

```ts
const statusConfig = {
  draft: {
    label: '下書き',
    tone: 'muted',
  },
  published: {
    label: '公開済み',
    tone: 'success',
  },
  archived: {
    label: 'アーカイブ',
    tone: 'warning',
  },
} as const;

type Status = keyof typeof statusConfig;
type StatusLabel = (typeof statusConfig)[Status]['label'];
type StatusTone = (typeof statusConfig)[Status]['tone'];
```

`keyof typeof statusConfig` でキーの union 型を作る。  
さらに indexed access types を使うと、label や tone の union 型も作れる。

Unit 07 の `keyof` / `typeof` / indexed access の理解が、そのまま as const の実務的な使い方につながる。

### 6-5. satisfies は形を確認しながら値の具体性を保ちやすい

`satisfies-basics.ts` では、ButtonConfig の形を満たすか確認している。

```ts
const saveButton = {
  label: '保存',
  tone: 'primary',
} satisfies ButtonConfig;
```

`satisfies` は、値が指定した型を満たしているかを確認する。  
型注釈とは違い、値そのものの型を必要以上に広げにくい。  
型アサーションとも違い、形が合わない場合は型エラーになる。

設定オブジェクト、メニュー定義、ルート定義、ステータス定義などでは、`as const satisfies ...` の形をよく見る。

## 7. 引っかかりやすい点

### 7-1. utility types は実行時の値を変えない

`Partial<T>`、`Required<T>`、`Readonly<T>` などは、TypeScript の型を変形するだけである。  
実行時の JavaScript オブジェクトを自動で変換するわけではない。

```ts
function completeProfile(profile: UserProfile): CompletedUserProfile {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email ?? 'not-set@example.com',
    bio: profile.bio ?? '',
  };
}
```

`Required<T>` を使っても、実行時に optional property が自動で埋まるわけではない。  
必要な値は自分で補完する必要がある。

### 7-2. as const は readonly 化も行う

`as const` は literal 型を保つだけではない。  
配列は readonly tuple になり、オブジェクトのプロパティも readonly として扱われる。

```ts
const roles = ['admin', 'member', 'guest'] as const;
```

この `roles` は、通常の `string[]` ではなく、読み取り専用の tuple として扱われる。  
後から `push` して変更するような用途ではなく、定数定義として使うものだと考える。

### 7-3. satisfies は as の代わりではない

`satisfies` は、値が指定した型を満たすか確認するための機能である。  
一方で `as` は、値を指定した型として扱う型アサーションである。

```ts
const saveButton = {
  label: '保存',
  tone: 'primary',
} satisfies ButtonConfig;
```

`satisfies` は形が合わなければ型エラーになる。  
`as ButtonConfig` は、間違った値でもコンパイラに通してしまう危険がある。

### 7-4. 型アサーションは実行時チェックではない

`type-assertion-basics.ts` では、unknown を UserDto として扱う例を示している。

```ts
const user = value as UserDto;
```

これは、実行時に value が UserDto か確認しているわけではない。  
外部入力や JSON に対して安易に使うと、型チェックは通っても実行時に壊れる可能性がある。

安全に扱うには、type guard で narrowing する。

```ts
if (!isUserDto(value)) {
  return 'unknown user';
}

return value.name;
```

### 7-5. non-null assertion は存在確認ではない

`non-null-and-dom-assertion.ts` では、`foundBook!.title` を扱っている。

```ts
return foundBook!.title;
```

`!` は、TypeScript に「これは null / undefined ではない」と伝えるだけである。  
実行時に存在確認をしているわけではない。

通常は、分岐で undefined を処理する方が安全である。

```ts
if (foundBook === undefined) {
  return 'not found';
}

return foundBook.title;
```

## 8. 実務でよく使う場面

### 8-1. API DTO から公開用・表示用・入力用の型を作る

`Pick<T, K>` や `Omit<T, K>` は、API DTO や DB entity から用途別の型を作るときによく使う。

```ts
type PublicAccount = Pick<Account, 'id' | 'displayName' | 'role'>;
type AccountCreateInput = Omit<Account, 'id' | 'passwordHash'> & {
  readonly password: string;
};
```

元の型を直接使い回すのではなく、公開用、作成用、更新用、表示用に分けることで、意図が読みやすくなる。

### 8-2. 更新用 input や form errors を Partial / Record で表す

`Partial<T>` と `Record<K, T>` は、フォームや更新 API でよく使う。

```ts
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
```

`FormValues` は全項目の値を持つ。  
`FormErrors` はエラーがある項目だけを持つ。

このように、同じフィールド名の union 型から、値の型とエラーの型を作れる。

### 8-3. config object / menu / route / status 定義で as const satisfies を使う

`satisfies-config-menu.ts` では、menuConfig を定義している。

```ts
const menuConfig = {
  home: {
    label: 'Home',
    path: '/',
    requiresAuth: false,
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    requiresAuth: false,
  },
  settings: {
    label: 'Settings',
    path: '/settings',
    requiresAuth: true,
  },
} as const satisfies Record<string, MenuItem>;
```

この形にすると、menuConfig が MenuItem の形を満たすことを確認しつつ、具体的なキーや path の literal 型を保てる。

### 8-4. 関数の引数・戻り値から型を取り出す

`Parameters<T>`、`ReturnType<T>`、`Awaited<T>` は、既存関数の型と別の関数の型を揃えたいときに便利である。

```ts
type SearchQueryArgs = Parameters<typeof buildSearchQuery>;
type SearchQuery = ReturnType<typeof buildSearchQuery>;
type FetchedBook = Awaited<ReturnType<typeof fetchBook>>;
```

API client、repository、wrapper 関数、test helper などで、元の関数と型を同期させたい場合に使う。

## 9. React につながるポイント

### 9-1. props や form state の型を utility types で作れる

React では、API から取得した DTO をそのまま props や form state に使うとは限らない。  
表示に必要な項目だけを `Pick<T, K>` で抜き出したり、フォーム用に `Omit<T, K>` で不要な項目を除外したりする。

```ts
type TaskFormInitialValues = Pick<ApiTaskDto, 'title' | 'status'> & {
  readonly description: string;
};
```

DTO、domain model、view model、form values を分ける考え方は Unit 03 から継続している。

### 9-2. fieldNames から form values / errors を作れる

`practical-react-config-form.ts` では、fieldNames から FieldName union 型を作っている。

```ts
const fieldNames = ['title', 'description', 'status'] as const;

type FieldName = (typeof fieldNames)[number];
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
```

フィールド名の一覧を値として持ちつつ、同じ定義から型も作れる。  
フォーム項目が増えた場合も、fieldNames を中心に関連する型を更新しやすい。

### 9-3. config を satisfies で検証しながら literal 型を保つ

同じファイルでは、fieldConfig に `as const satisfies` を使っている。

```ts
const fieldConfig = {
  title: {
    label: 'タイトル',
    required: true,
  },
  description: {
    label: '説明',
    required: false,
  },
  status: {
    label: 'ステータス',
    required: true,
  },
} as const satisfies Record<FieldName, FieldConfig>;
```

これにより、すべての FieldName に設定があることを確認しつつ、label や required の具体的な値も保ちやすい。  
React のフォーム定義、メニュー定義、タブ定義、ステータス表示設定などに応用できる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `Partial<T>` が何を表すか説明できる
- `Required<T>` が何を表すか説明できる
- `Readonly<T>` が型チェック上の readonly であり、実行時 freeze ではないことを説明できる
- `Pick<T, K>` と `Omit<T, K>` の違いを説明できる
- `Record<K, T>` を role / status / form field のような union 型と組み合わせて使える
- `Exclude<T, U>` と `Extract<T, U>` の違いを説明できる
- `NonNullable<T>` と実行時 fallback の違いを説明できる
- `Parameters<T>`、`ReturnType<T>`、`Awaited<T>` の用途を説明できる
- as const が literal 型を保ち、readonly tuple / readonly object にすることを説明できる
- 定数配列から union 型を作る流れを説明できる
- 定数オブジェクトから key / value の union 型を作る流れを説明できる
- satisfies が型注釈や型アサーションとどう違うか説明できる
- `as` は実行時チェックではないことを説明できる
- unknown から type guard で絞る方が安全な場面を説明できる
- non-null assertion `!` の危険性を説明できる
- numeric enum / string enum / const enum の概要を説明できる
- enum と union literal / const object の違いを説明できる
- React props / config / form / API DTO に utility types や as const satisfies がつながることを説明できる
