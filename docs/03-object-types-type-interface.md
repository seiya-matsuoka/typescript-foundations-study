# 03. オブジェクト型・type / interface・構造的型付け

## 1. 学習対象

この単位では、TypeScript の実務で頻出するオブジェクト型、`type`、`interface`、構造的型付けを学ぶ。  
API レスポンス、フォーム、props、設定オブジェクト、表示用データなど、TypeScript で扱う多くの値はオブジェクトとして表される。

Unit 02 では、基本型、型注釈、型推論、`null` / `undefined` を確認した。  
この単位では、それらの基本型をプロパティとして持つオブジェクトの形を定義し、用途に応じて DTO、domain model、view model、form values のように型を分ける考え方まで扱う。

単に `type User = { ... }` の文法を確認するだけではなく、実務でどのような単位で型を分けるか、Java の class / interface と TypeScript の type / interface の感覚がどう違うかも確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `object type`
- `type alias`
- `interface`
- `type` と `interface`
- `optional property`
- `readonly property`
- `nested object type`
- `method property`
- `function property`
- `index signature`
- `Record<K, V>` の入口
- `excess property checks`
- `structural typing`
- `object literal` と型の関係
- 型としての `object` と実際の `object` の違い
- DTO 的な型
- domain model 的な型
- view model 的な型
- form values 的な型
- API response 的な型
- `optional property` と `undefined` の違い
- Java の `class` / `interface` との感覚の違い

この単位は、Unit 02 に続く基礎の厚め Unit として扱う。  
オブジェクト型は後続の関数型、union 型、generics、API レスポンス、React の props / state の前提になるため、圧縮しすぎずに確認する。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  03-object-types-type-interface/
    index.ts
    object-type-basics.ts
    type-alias-basics.ts
    interface-basics.ts
    type-vs-interface.ts
    optional-readonly-properties.ts
    nested-object-types.ts
    method-and-function-properties.ts
    index-signature-and-record.ts
    excess-property-checks.ts
    structural-typing.ts
    object-literal-and-runtime-object.ts
    api-dto-domain-view-models.ts
    form-values-and-config-objects.ts

docs/
  03-object-types-type-interface.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 03 のサンプルを順番に実行する入口。
- `object-type-basics.ts`
  - `object` 型と、具体的なプロパティを持つオブジェクト型の違いを確認する。
- `type-alias-basics.ts`
  - `type` でオブジェクト型に名前を付け、用途の違う型へ変換する流れを確認する。
- `interface-basics.ts`
  - `interface` によるオブジェクト型と `extends` の入口を確認する。
- `type-vs-interface.ts`
  - `type` と `interface` の使い分けの入口を確認する。
- `optional-readonly-properties.ts`
  - `optional property`、`readonly property`、`undefined` との違いを確認する。
- `nested-object-types.ts`
  - ネストしたオブジェクト型を確認する。
- `method-and-function-properties.ts`
  - `method property` と `function property` の違いを確認する。
- `index-signature-and-record.ts`
  - `index signature` と `Record<K, V>` の入口を確認する。
- `excess-property-checks.ts`
  - `object literal` と `excess property checks` を確認する。
- `structural-typing.ts`
  - 構造的型付けと Java の class / interface との感覚の違いを確認する。
- `object-literal-and-runtime-object.ts`
  - 型としての `object` と、JavaScript 実行時の `object` の違いを確認する。
- `api-dto-domain-view-models.ts`
  - DTO、domain model、view model、API response 的な型を確認する。
- `form-values-and-config-objects.ts`
  - form values、form errors、設定オブジェクトの型を確認する。
- `03-object-types-type-interface.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:03
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

この単位では、`npm run unit:03` でオブジェクト型を使った実行時の値を確認し、`npm run typecheck` で型チェックを確認する。  
`@ts-expect-error` を使っている箇所は、意図した型エラーを学習コードとして残すためのものとする。  
実行すると値を書き換える可能性がある型エラー例や、型チェックだけを目的とした例は、Unit 実行時には呼び出さない補助関数として分けている。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/03-object-types-type-interface/index.ts`
2. `src/03-object-types-type-interface/object-type-basics.ts`
3. `src/03-object-types-type-interface/type-alias-basics.ts`
4. `src/03-object-types-type-interface/interface-basics.ts`
5. `src/03-object-types-type-interface/type-vs-interface.ts`
6. `src/03-object-types-type-interface/optional-readonly-properties.ts`
7. `src/03-object-types-type-interface/nested-object-types.ts`
8. `src/03-object-types-type-interface/method-and-function-properties.ts`
9. `src/03-object-types-type-interface/index-signature-and-record.ts`
10. `src/03-object-types-type-interface/excess-property-checks.ts`
11. `src/03-object-types-type-interface/structural-typing.ts`
12. `src/03-object-types-type-interface/object-literal-and-runtime-object.ts`
13. `src/03-object-types-type-interface/api-dto-domain-view-models.ts`
14. `src/03-object-types-type-interface/form-values-and-config-objects.ts`

最初に `index.ts` を読み、Unit 03 全体の実行順を確認する。  
その後、基本的なオブジェクト型、`type`、`interface`、プロパティの指定、ネスト、メソッド、辞書型、構造的型付け、実務寄りの型設計という順に読む。

## 6. 注目ポイント

### 6-1. `object` 型と具体的なオブジェクト型は役割が違う

`object-type-basics.ts` では、具体的なプロパティを持つ `BookSummary` と、広い `object` 型を並べている。

```ts
type BookSummary = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly inStock: boolean;
};

function formatBookSummary(book: BookSummary): string {
  return `${book.title} / ${book.price}円 / ${book.inStock ? '在庫あり' : '在庫なし'}`;
}
```

`BookSummary` は、`id`、`title`、`price`、`inStock` を持つ値を表す。  
関数の中では、これらのプロパティに安全にアクセスできる。

一方で、次の `object` 型はかなり広い。

```ts
function describeObject(value: object): string {
  return JSON.stringify(value);
}
```

`object` は「プリミティブではない値」程度の意味であり、具体的なプロパティ情報を持たない。  
実務でデータの形を表したい場合は、`object` よりも `{ id: string; name: string }` のような具体的な型を定義する方が扱いやすい。

### 6-2. `type` で用途に名前を付けられる

`type-alias-basics.ts` では、ユーザー情報と表示用カードを別の型として定義している。

```ts
type UserProfile = {
  readonly id: UserId;
  readonly displayName: string;
  readonly email: string;
  readonly role: 'admin' | 'member';
};

type UserProfileCard = {
  readonly title: string;
  readonly subtitle: string;
  readonly badge: string;
};
```

同じユーザーを扱っていても、保存・取得に使う形と、画面表示に使う形は異なる。  
`type` で名前を付けると、「このオブジェクトは何のための形か」を読み手に伝えやすくなる。

```ts
function toUserProfileCard(profile: UserProfile): UserProfileCard {
  return {
    title: profile.displayName,
    subtitle: profile.email,
    badge: profile.role === 'admin' ? '管理者' : 'メンバー',
  };
}
```

この変換では、元の `UserProfile` をそのまま画面へ渡すのではなく、表示に必要な `UserProfileCard` へ変換している。  
型を分けることで、役割の違いがコード上でも見えるようになる。

### 6-3. `interface` はオブジェクトの形を表しやすい

`interface-basics.ts` では、共通項目を持つ `RepositoryItem` と、それを拡張した `RepositorySummary` を定義している。

```ts
interface RepositoryItem {
  readonly id: string;
  readonly name: string;
  readonly updatedAt: Date;
}

interface RepositorySummary extends RepositoryItem {
  readonly visibility: 'public' | 'private';
  readonly starCount: number;
}
```

`interface` は、オブジェクトが持つべきプロパティの形を表す用途で読みやすい。  
`extends` を使うと、共通項目を持つ型を土台にして、別の型を作れる。

この考え方は、共通の ID や更新日時を持つ API response、一覧用と詳細用の型、props の共通部分などで使いやすい。

### 6-4. `optional property` は `undefined` を明示する型と同じではない

`optional-readonly-properties.ts` では、`description?: string` を持つ型を使っている。

```ts
type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly description?: string;
};
```

`description?: string` は、`description` プロパティが省略される可能性があることを表す。  
`exactOptionalPropertyTypes` が有効な環境では、`description: undefined` を明示的に入れる型とは区別される。

```ts
const description = task.description ?? '説明なし';
```

optional property を読むときは、値がない可能性を考慮して、`??` などでデフォルト値を用意する。  
この考え方は、フォームの任意項目や props の任意項目にもつながる。

### 6-5. `index signature` と `Record<K, V>` はキーの決まり方が違う

`index-signature-and-record.ts` では、キーが自由な `StockBySku` と、キーが固定された `MenuLabels` を並べている。

```ts
type StockBySku = {
  readonly [sku: string]: number | undefined;
};

type FixedMenuKey = 'home' | 'books' | 'settings';

type MenuLabels = Record<FixedMenuKey, string>;
```

`index signature` は、キーが事前に固定できない辞書型を表すときに使う。  
一方で、`Record<K, V>` は、決まったキー集合に対して値を持つオブジェクトを表す。

```ts
const stock = stockBySku[sku];

return stock === undefined ? '在庫情報なし' : `在庫: ${stock}`;
```

`noUncheckedIndexedAccess` が有効な環境では、辞書から値を読むと `undefined` の可能性が混ざる。  
そのため、存在しないキーを読む可能性を分岐で扱う必要がある。

## 7. 引っかかりやすい点

### 7-1. `type` と `interface` は完全に別用途というより、重なる部分が多い

`type-vs-interface.ts` では、`type` と `interface` を両方使っている。

```ts
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
```

`type` は union 型や intersection 型と組み合わせやすい。  
`interface` はオブジェクトが持つべき形を表す用途で読みやすい。

ただし、単純なオブジェクト型であれば、どちらでも表現できる場面が多い。  
最初から絶対的なルールとして覚えるより、プロジェクトの方針や型の用途に合わせて読むことが重要となる。

### 7-2. `readonly` は実行時に値を凍結するものではない

`optional-readonly-properties.ts` では、`readonly` を使って ID を書き換えない意図を表している。

```ts
type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly description?: string;
};
```

`readonly` は TypeScript の型チェック上、再代入を防ぐための指定である。  
JavaScript 実行時にオブジェクトを自動で凍結するものではない。

```ts
// @ts-expect-error: readonly property の id は書き換えられないことを確認する。
task.id = 'task-003';
```

この型エラー例は、Unit 実行時には呼び出さない補助関数に分けている。  
型チェック上は再代入を防げるが、実行時の不変性とは別物として考える必要がある。

### 7-3. object literal を直接渡すと余分なプロパティが検出されやすい

`excess-property-checks.ts` では、`UserCard` を受け取る関数を用意している。

```ts
type UserCard = {
  readonly id: string;
  readonly name: string;
};

function renderUserCard(card: UserCard): string {
  return `${card.id}: ${card.name}`;
}
```

object literal を直接 `UserCard` として作る場合、余分なプロパティは `excess property checks` で検出される。

```ts
const invalidCard: UserCard = {
  id: 'user-004',
  name: 'Suzuki',
  // @ts-expect-error: UserCard に存在しない age を object literal に含めると型エラーになることを確認する。
  age: 28,
};
```

一方で、余分なプロパティを持つ値をいったん変数に入れた場合、必要なプロパティを持っていれば渡せることがある。

```ts
const apiUser = {
  id: 'user-002',
  name: 'Tanaka',
  age: 30,
};

const renderedFromApiUser = renderUserCard(apiUser);
```

この違いは、TypeScript が構造的型付けで判定することと関係する。  
Java のように「型名が一致するか」だけで考えると混乱しやすい。

### 7-4. `object` 型にしてもプロパティへ安全にアクセスできるわけではない

`object-type-basics.ts` の `describeObject` は、広い `object` 型を受け取る。

```ts
function describeObject(value: object): string {
  return JSON.stringify(value);
}
```

この `value` は、オブジェクトであることしか分からない。  
`id` や `name` を持つとは限らないため、`value.id` のようなアクセスはできない。

データの形を表したいなら、次のように具体的なプロパティを持つ型を定義する。

```ts
type BookSummary = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly inStock: boolean;
};
```

`object` 型は、具体的なアプリケーションデータの型としては広すぎることが多い。

### 7-5. 構造的型付けは Java の感覚と違う

`structural-typing.ts` では、別名の型である `MemberProfile` と `CustomerProfile` を定義している。

```ts
type MemberProfile = {
  readonly id: string;
  readonly name: string;
};

type CustomerProfile = {
  readonly id: string;
  readonly name: string;
};
```

この2つは型名が違うが、構造は同じである。  
TypeScript では、必要なプロパティを持っていれば代入可能と判断される。

```ts
const formattedCustomer = formatMember(customer);
```

Java の class / interface では、明示的にその型を実装しているか、継承関係にあるかを意識することが多い。  
TypeScript では、型名よりも「構造が合っているか」を見るため、この違いを早めに押さえておく必要がある。

## 8. 実務でよく使う場面

### 8-1. API DTO とアプリ内部の domain model を分ける

`api-dto-domain-view-models.ts` では、API から来る形とアプリ内部で扱う形を分けている。

```ts
type UserApiDto = {
  readonly id: string;
  readonly display_name: string;
  readonly email: string;
  readonly plan: 'free' | 'pro';
  readonly created_at: string;
};

type UserDomainModel = {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly plan: 'free' | 'pro';
  readonly createdAt: Date;
};
```

API では `display_name` や `created_at` のような snake_case の値が来ることがある。  
アプリ内部では、`displayName` や `createdAt` のように camelCase で扱いたい場合がある。

```ts
function toDomainModel(dto: UserApiDto): UserDomainModel {
  return {
    id: dto.id,
    displayName: dto.display_name,
    email: dto.email,
    plan: dto.plan,
    createdAt: new Date(dto.created_at),
  };
}
```

DTO と domain model を分けることで、外部仕様と内部表現を混同しにくくなる。  
API の形が変わった場合も、変換関数の境界で影響を追いやすい。

### 8-2. 画面表示用の view model を作る

同じファイルでは、domain model から表示用の `UserViewModel` へ変換している。

```ts
type UserViewModel = {
  readonly title: string;
  readonly subtitle: string;
  readonly planLabel: string;
};

function toViewModel(user: UserDomainModel): UserViewModel {
  return {
    title: user.displayName,
    subtitle: user.email,
    planLabel: user.plan === 'pro' ? 'Pro プラン' : 'Free プラン',
  };
}
```

view model は、画面で使う文字列やラベルをあらかじめ整えた型である。  
API DTO をそのまま画面に渡すと、UI 側に変換処理が散らばりやすい。

表示用の型を作ることで、UI コンポーネントは「表示するだけ」に近づけられる。

### 8-3. form values と form errors を型で分ける

`form-values-and-config-objects.ts` では、フォーム入力値とエラー情報を別の型として表している。

```ts
type UserFormValues = {
  readonly name: string;
  readonly email: string;
  readonly memo?: string;
};

type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;
```

form values は、画面上の入力値そのものを表す。  
form errors は、入力項目ごとのエラーメッセージを表す。

```ts
function validateUserForm(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {};

  if (values.name.trim() === '') {
    errors.name = '名前を入力してください';
  }

  if (!values.email.includes('@')) {
    errors.email = 'メールアドレスを確認してください';
  }

  return errors;
}
```

このように型を分けると、フォーム入力値と検証結果を混同しにくくなる。  
React のフォーム実装でも、values、errors、touched、submit payload などを分けて考える土台になる。

### 8-4. 設定オブジェクトは読み取り専用のまとまりとして扱う

`form-values-and-config-objects.ts` では、設定オブジェクトも扱っている。

```ts
type FeatureFlags = {
  readonly enableSearch: boolean;
  readonly enableDarkMode: boolean;
  readonly maxVisibleItems: number;
};

type AppConfig = {
  readonly appName: string;
  readonly features: FeatureFlags;
};
```

設定値は、アプリ全体で参照するが、あちこちで書き換えたい値ではないことが多い。  
そのため、`readonly` を付けて「読み取り専用として扱う」意図を型に残すとよい。

```ts
function formatConfig(config: AppConfig): string {
  return `${config.appName}: search=${config.features.enableSearch}, dark=${config.features.enableDarkMode}`;
}
```

このような設定オブジェクトは、feature flag、画面表示設定、API endpoint 設定などでよく出てくる。

## 9. React につながるポイント

### 9-1. props はオブジェクト型として表す

React の props は、基本的にはオブジェクト型として表す。

```ts
type UserCardProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly planLabel: string;
};
```

Unit 03 の `UserViewModel` は、props に近い表示用の型として読める。

```ts
type UserViewModel = {
  readonly title: string;
  readonly subtitle: string;
  readonly planLabel: string;
};
```

props では、コンポーネントが表示に必要とする値だけを持たせることが多い。  
API DTO をそのまま props にするより、表示用に整えた型を渡す方が、コンポーネントの責務が小さくなる。

### 9-2. optional props と `undefined` の扱いは Unit 03 の optional property とつながる

React では、任意の props を次のように書くことがある。

```ts
type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};
```

これは Unit 03 の `description?: string` と同じ optional property の考え方である。

```ts
type Task = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly description?: string;
};
```

optional property は、値が省略される可能性を表す。  
`exactOptionalPropertyTypes` が有効な環境では、`disabled?: boolean` と `disabled: boolean | undefined` の感覚が異なるため、props 設計でも注意が必要になる。

### 9-3. event handler や callback props は function property として表す

`method-and-function-properties.ts` では、function property を次のように定義している。

```ts
type CartCalculator = {
  readonly items: readonly CartItem[];
  total(): number;
  formatItem: (item: CartItem) => string;
};
```

React の props では、次のような callback props をよく見る。

```ts
type SaveButtonProps = {
  readonly label: string;
  readonly onClick: () => void;
};
```

`formatItem: (item: CartItem) => string` と `onClick: () => void` は、どちらも「関数をプロパティとして持つ」形である。  
Unit 04 で関数型を厚めに扱う前に、オブジェクト型の中に関数プロパティが入る形を押さえておく。

### 9-4. form values と form errors は React のフォーム state に直結する

React でフォームを扱う場合、入力値とエラー情報を state として持つことが多い。

```ts
type UserFormValues = {
  readonly name: string;
  readonly email: string;
  readonly memo?: string;
};

type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;
```

Unit 03 の `UserFormValues` と `UserFormErrors` は、React のフォーム state にそのままつながる考え方である。  
values、errors、submit payload を同じ型で雑に扱うと、どの状態のデータなのかが分かりにくくなる。

そのため、React に進んだ後も、オブジェクト型を用途ごとに分ける感覚が重要になる。

### 9-5. 構造的型付けにより、props に余分な値を持つオブジェクトを渡せる場面がある

`excess-property-checks.ts` では、余分な `age` を持つ `apiUser` を `UserCard` を受け取る関数へ渡している。

```ts
const apiUser = {
  id: 'user-002',
  name: 'Tanaka',
  age: 30,
};

const renderedFromApiUser = renderUserCard(apiUser);
```

React でも、親側が大きなオブジェクトを持っていて、子コンポーネントがその一部だけを props として受け取る場面がある。  
ただし、何でもそのまま渡すとコンポーネントの責務が曖昧になるため、表示用の view model や props 型を分ける設計が役立つ。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `object` 型と、具体的なプロパティを持つオブジェクト型の違いを説明できる
- `type alias` でオブジェクト型に名前を付ける理由を説明できる
- `interface` でオブジェクトの形を表す方法を説明できる
- `type` と `interface` の重なる部分と違いの入口を説明できる
- `optional property` と `undefined` を明示する型の違いを説明できる
- `readonly property` が型チェック上の再代入防止であり、実行時の凍結ではないことを説明できる
- nested object type の読み方を説明できる
- `method property` と `function property` の違いを説明できる
- `index signature` と `Record<K, V>` の入口を説明できる
- `excess property checks` がどのような場面で働くか説明できる
- TypeScript の structural typing と Java の class / interface の感覚の違いを説明できる
- object literal と型の関係を説明できる
- DTO、domain model、view model、form values、API response 的な型の違いを説明できる
- React の props、optional props、callback props、form state に Unit 03 の内容がつながることを説明できる
