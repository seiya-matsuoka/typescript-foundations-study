# 02. 基本型・型注釈・型推論・null / undefined

## 1. 学習対象

この単位では、TypeScript の基本型、型注釈、型推論、`null` / `undefined` の扱いを学ぶ。  
TypeScript では、JavaScript の値に対して型を付けることで、コンパイル時に誤りを検出できる。  
ただし、すべてに型注釈を書くことが正解ではなく、型推論に任せる場面と明示的に型を書く場面を分けて考える必要がある。

この単位は、後続のオブジェクト型、関数型、union 型、generics の前提となる。  
そのため、基本型を単なる一覧として確認するだけではなく、実務や React でよく出る値の扱いにつながるように、多めのコードで確認する。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

- 型注釈
- 型推論
- `string`
- `number`
- `boolean`
- `bigint`
- `symbol`
- `null`
- `undefined`
- `object`
- `Array<T>`
- `T[]`
- `tuple`
- `readonly tuple` の入口
- `literal type`
- `union type` の入口
- `any`
- `unknown`
- `never`
- `void`
- `let` と `const` の推論の違い
- `literal widening`
- `nullable` な値
- `optional` な値
- `strictNullChecks`
- `noImplicitAny`
- `noUncheckedIndexedAccess` の入口
- `exactOptionalPropertyTypes` の入口
- 型注釈を書くべき場面
- 型推論に任せるべき場面
- 実行時の `typeof` と TypeScript の型の違い

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  02-basic-types-inference-nullish/
    index.ts
    basic-primitive-types.ts
    type-annotations.ts
    type-inference-let-const.ts
    array-and-tuple-types.ts
    object-type-basics.ts
    literal-types.ts
    union-type-basics.ts
    null-and-undefined.ts
    strict-option-basics.ts
    any-basics.ts
    unknown-basics.ts
    never-and-void.ts
    runtime-typeof.ts

docs/
  02-basic-types-inference-nullish.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - この単位の入口となるファイル
  - 各サンプルファイルを順番に実行する
- `basic-primitive-types.ts`
  - `string`、`number`、`boolean`、`bigint`、`symbol`、`null`、`undefined` を確認する
- `type-annotations.ts`
  - 型注釈を書く場面を確認する
- `type-inference-let-const.ts`
  - 型推論、`let` と `const` の推論の違い、`literal widening` を確認する
- `array-and-tuple-types.ts`
  - `Array<T>`、`T[]`、`tuple`、`readonly tuple`、配列アクセスの `undefined` を確認する
- `object-type-basics.ts`
  - `object` 型と具体的なオブジェクト型の違いを確認する
- `literal-types.ts`
  - `literal type` の入口を確認する
- `union-type-basics.ts`
  - `union type` の入口を確認する
- `null-and-undefined.ts`
  - `null` / `undefined`、`nullable` な値、`optional` な値を確認する
- `strict-option-basics.ts`
  - `strictNullChecks`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes` の入口を確認する
- `any-basics.ts`
  - `any` の危険性を確認する
- `unknown-basics.ts`
  - `unknown` の安全な扱いを確認する
- `never-and-void.ts`
  - `never` と `void` を確認する
- `runtime-typeof.ts`
  - 実行時の `typeof` と TypeScript の型の違いを確認する

## 4. 実行方法

この単位のサンプルコードは、次のコマンドで実行する。

```bash
npm run unit:02
```

型チェックは次のコマンドで実行する。

```bash
npm run typecheck
```

ESLint は次のコマンドで実行する。

```bash
npm run lint
```

Prettier の確認は次のコマンドで実行する。

```bash
npm run format:check
```

整形が必要な場合は、次を実行する。

```bash
npm run format
```

この単位では、`npm run unit:02` で実行時の値を確認し、`npm run typecheck` で型チェックを確認する。  
`@ts-expect-error` を使っている箇所は、意図した型エラーを学習コードとして残すためのものとする。  
実行するとエラーになる可能性がある型エラー例は、型チェック対象には含めるが、Unit 実行時には呼び出さない補助関数として分けている。

## 5. コードを読む順番

コードは次の順番で読む。

1. `index.ts`
2. `basic-primitive-types.ts`
3. `type-annotations.ts`
4. `type-inference-let-const.ts`
5. `array-and-tuple-types.ts`
6. `object-type-basics.ts`
7. `literal-types.ts`
8. `union-type-basics.ts`
9. `null-and-undefined.ts`
10. `strict-option-basics.ts`
11. `any-basics.ts`
12. `unknown-basics.ts`
13. `never-and-void.ts`
14. `runtime-typeof.ts`

最初に `index.ts` を読み、Unit 全体の実行順とセクション構成を確認する。  
その後、基本のプリミティブ型、型注釈、型推論、配列と tuple、object 型、literal type、union type、`null` / `undefined`、strict 系設定、`any` / `unknown`、`never` / `void`、実行時の `typeof` という順番で読む。

## 6. 注目ポイント

### 6-1. 基本型は値の種類と型の制約を結びつけて読む

`basic-primitive-types.ts` では、基本のプリミティブ型を明示的な型注釈付きで並べている。

```ts
const userName: string = 'Sato';
const loginCount: number = 12;
const isActive: boolean = true;
const largeId: bigint = 9007199254740993n;
const cacheKey: symbol = Symbol('user-cache');
const emptyValue: null = null;
const notAssigned: undefined = undefined;
```

ここでは、TypeScript の基本型を「値の種類」と「代入できる値の制約」として確認する。  
たとえば、`userName` は `string` として扱われるため、文字列のメソッドを使える。  
一方で、`string` の変数に `number` を代入しようとすると型エラーになる。

```ts
// @ts-expect-error: string 型の変数に number は代入できないことを確認する。
const invalidName: string = 100;
```

`@ts-expect-error` は、型エラーを雑に無視するためではなく、ここで型エラーが起きることを学習コードとして残すために使う。

### 6-2. 型注釈を書く場面と推論に任せる場面を分ける

`type-annotations.ts` では、関数の引数と戻り値に型注釈を書いている。

```ts
function createUserSummary(id: string, name: string, role: UserRole): UserSummary {
  return {
    id,
    name,
    role,
  };
}
```

関数は、呼び出し側との境界になる。  
そのため、引数と戻り値の型を明示すると、どの値を受け取り、どの形で返すかが読みやすくなる。

一方で、単純な初期値を持つ変数は、型推論に任せられる。

```ts
const inferredUserName = 'Tanaka';
const inferredLoginCount = 3;
const inferredActive = true;
```

このように、初期値から明らかに型が分かる場合は、型注釈を書かなくても TypeScript が型を推論する。  
「型注釈を書くほど読みやすくなる場所」と「推論に任せた方が読みやすい場所」を分けることが重要である。

### 6-3. `let` と `const` は推論される型の広さが変わる

`type-inference-let-const.ts` では、`let` と `const` の推論の違いを確認している。

```ts
let mutableStatus = 'draft';
const fixedStatus = 'published';
```

`mutableStatus` は、あとから別の文字列を代入できるため、`string` として広く推論される。  
`fixedStatus` は再代入できないため、`'published'` という literal type として狭く推論される。

```ts
mutableStatus = 'archived';
const acceptedFixedStatus = acceptPublishStatus(fixedStatus);
```

この違いは、後続の union 型、`as const`、React の props 設計にもつながる。  
単なる文字列として扱うのか、決まった候補の1つとして扱うのかで、型の読み方が変わる。

### 6-4. 配列と tuple は同じ「配列っぽい値」でも型の意味が違う

`array-and-tuple-types.ts` では、配列と tuple を並べて確認している。

```ts
const scores: number[] = [80, 92, 76];
const labels: Array<string> = ['下書き', '公開済み', 'アーカイブ済み'];
```

`number[]` と `Array<string>` はどちらも配列を表す。  
一方で、tuple は位置ごとに型と意味を持つ。

```ts
const responsePair: [number, string] = [200, 'OK'];
const statusCode = responsePair[0];
const statusMessage = responsePair[1];
```

`responsePair` は、0番目が `number`、1番目が `string` であることを型として持つ。  
単なる `Array<number | string>` よりも、位置に意味がある値を表しやすい。

### 6-5. `as const` は readonly tuple の入口として重要

同じファイルでは、`as const` を使って `readonly tuple` の入口も扱っている。

```ts
const route = ['/books', 'GET'] as const;
```

`as const` を付けると、`route` は単なる `string[]` ではなく、固定された値の組として扱われる。  
また、readonly になるため値を書き換えられない。

```ts
// @ts-expect-error: readonly tuple の値は書き換えられないことを確認する。
route[0] = '/users';
```

`as const` は Unit 08 で詳しく扱う。  
この単位では、値を狭く保つことと、読み取り専用になることを入口として押さえる。

## 7. 引っかかりやすい点

### 7-1. `object` 型はプロパティの情報をほとんど持たない

`object-type-basics.ts` では、`object` 型と具体的なオブジェクト型を分けている。

```ts
const rawObject: object = {
  id: 'b001',
  title: 'TypeScript Foundations',
};
```

`object` 型は、プリミティブではない値を表す広い型である。  
そのため、`id` や `title` というプロパティを持つことまでは TypeScript が把握できない。

実務では、次のように具体的なプロパティを持つ型を定義することが多い。

```ts
type BookSummary = {
  readonly id: string;
  readonly title: string;
  readonly price: number;
};
```

このように型を定義すると、どのプロパティを使えるかがコードから読み取れる。  
`object` 型は便利そうに見えるが、実務でデータの形を表すには広すぎることが多い。

### 7-2. `any` は TypeScript の利点を失いやすい

`any-basics.ts` では、`any` の危険性を確認している。

```ts
// any の危険性を確認するため、このサンプルでは意図的に any を使う。
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any の危険性を確認するため意図的に使う。
let unsafeValue: any = 'typescript';

console.log('unsafeValue length:', unsafeValue.length);

unsafeValue = 100;
const missingProperty = unsafeValue.missingProperty;
```

`any` を使うと、TypeScript の型チェックをほぼ無効化する。  
このサンプルでは `any` の危険性を確認するため、該当箇所だけ ESLint の `no-explicit-any` を局所的に許可している。  
`number` に対して存在しないプロパティを読んでも、TypeScript は止められない。

```ts
const unsafeUpperCase = unsafeValue.toUpperCase;
```

このコードも、`any` であるため型チェック上は通る。  
しかし、実行時には `undefined` になり、呼び出せばエラーになる可能性がある。  
外部入力や API レスポンスのように型が分からない値には、まず `unknown` を使う方が安全である。

### 7-3. `unknown` は確認するまで使えない

`unknown-basics.ts` では、`unknown` を安全に扱うために `typeof` で確認している。

```ts
function parseUnknownValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  if (typeof value === 'number') {
    return `number:${value}`;
  }

  if (typeof value === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }

  return 'unsupported';
}
```

`unknown` は、そのままプロパティやメソッドを使えない。  
使う前に型を確認する必要がある。  
この制約は面倒に見えるが、外部から来た値を安全に扱うためには重要である。

```ts
// @ts-expect-error: unknown の値は型を確認する前に string のメソッドを使えないことを確認する。
const invalidUpperCase = unknownText.toUpperCase();
```

この例のように、確認前の `unknown` に対して文字列メソッドを使おうとすると型エラーになる。

### 7-4. 配列アクセスでは `undefined` の可能性を考える

`array-and-tuple-types.ts` では、存在しない位置を読む例を扱っている。

```ts
const scores: number[] = [80, 92, 76];

const firstScore = scores[0];
const missingScore = scores[10];
```

`noUncheckedIndexedAccess` が有効な環境では、配列アクセスの結果は `number | undefined` として扱われる。  
存在しない添字を読んだ場合、実行時には `undefined` になるためである。

```ts
console.log('firstScore:', firstScore ?? '点数なし');
console.log('missingScore:', missingScore ?? '点数なし');
```

このように、配列から取り出した値は、存在しない可能性を考慮して扱う。  
React で一覧や選択状態を扱うときにも、この考え方は重要になる。

### 7-5. optional property と `undefined` の明示代入は同じではない

`strict-option-basics.ts` では、`exactOptionalPropertyTypes` の入口を扱っている。

```ts
type SearchCondition = {
  readonly keyword?: string;
  readonly categoryId: string | null;
};
```

`keyword?: string` は、`keyword` を省略できることを表す。  
`keyword: undefined` を明示的に入れることと同じではない。

```ts
// @ts-expect-error: exactOptionalPropertyTypes が有効なため、keyword?: string に undefined を明示代入できないことを確認する。
const invalidCondition: SearchCondition = {
  keyword: undefined,
  categoryId: null,
};
```

この違いは、フォーム値や API リクエストの型を設計するときに重要になる。  
「プロパティが存在しない」のか、「値として `undefined` が入っている」のかを分けて考える。

## 8. 実務でよく使う場面

### 8-1. 関数の境界では型注釈を書くことが多い

`type-annotations.ts` では、関数の引数と戻り値に型を書いている。

```ts
function createUserSummary(id: string, name: string, role: UserRole): UserSummary {
  return {
    id,
    name,
    role,
  };
}
```

実務では、関数の内部だけで完結する変数は型推論に任せることが多い。  
一方で、関数の引数や戻り値は外部との境界になるため、型注釈を書くと読みやすくなる。

特に、mapper、formatter、validator のように他の場所から呼び出される関数では、戻り値型を明示しておくと変更に気づきやすい。

### 8-2. ステータスや種別は union 型で表す

`union-type-basics.ts` では、公開状態や通知レベルを union 型で表している。

```ts
type PublishStatus = 'draft' | 'published' | 'archived';
type NotificationLevel = 'info' | 'warning' | 'error';
```

実務では、ステータス、権限、表示モード、ソート条件など、決まった候補だけを許可したい値がよく出てくる。  
そのような値を単なる `string` にすると、存在しない値を渡しても型チェックで防げない。

```ts
function formatNotification(level: NotificationLevel, message: string): string {
  return `[${level}] ${message}`;
}
```

このように union 型を使うと、呼び出し側で誤った文字列を渡しにくくなる。

### 8-3. API やフォームでは `null` と `undefined` の意味を分ける

`null-and-undefined.ts` では、検索条件の型を使って `null` と `undefined` の違いを確認している。

```ts
type SearchCondition = {
  readonly keyword?: string;
  readonly categoryId: string | null;
};
```

`keyword?: string` は、キーワードを省略できることを表す。  
一方で、`categoryId: string | null` は、プロパティ自体は存在し、値がない場合に `null` を入れる設計である。

実務では、API の仕様やフォームの初期値によって、`null` を使うのか、`undefined` を使うのかが変わる。  
この違いを曖昧にすると、後から条件分岐や初期値処理が分かりにくくなる。

### 8-4. 外部入力は `unknown` から始めると安全に扱いやすい

`unknown-basics.ts` では、`unknown` を確認してから使う例を扱っている。

```ts
const unknownText: unknown = 'typescript';
const parsedText = parseUnknownValue(unknownText);
```

API レスポンス、`JSON.parse`、フォームから組み立てた値など、実行時に入ってくる値は最初から完全に信用できない。  
そのような値を `any` として扱うと、型チェックの助けが弱くなる。

```ts
function parseUnknownValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  return 'unsupported';
}
```

`unknown` から始め、確認してから使う方が、後続の validation や API レスポンス処理につなげやすい。

### 8-5. `void` はイベント処理やログ出力でよく見る

`never-and-void.ts` では、戻り値を使わない関数として `logMessage` を定義している。

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

`void` は、戻り値を利用しない関数でよく出てくる。  
実務では、ログ出力、イベントハンドラ、画面操作など、副作用を目的とする関数で見ることが多い。

## 9. React につながるポイント

### 9-1. props の選択肢には union 型が使える

React の props でも、決まった選択肢だけを許可したい場面がある。

```ts
type ButtonProps = {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
};
```

このように `variant` を union 型にすると、存在しない表示パターンを渡すミスを型チェックで防げる。  
Unit 02 の `PublishStatus` や `NotificationLevel` は、この props 設計の土台になる。

### 9-2. `useState` の初期値から型が推論される

React では、`useState` の初期値から state の型が推論される。

```ts
const [keyword, setKeyword] = useState('');
```

この場合、`keyword` は `string` として推論される。  
一方で、初期値が `null` の場合は、明示的な型指定が必要になることがある。

```ts
const [selectedId, setSelectedId] = useState<string | null>(null);
```

Unit 02 で扱う `null` / `undefined`、型注釈、型推論の理解は、React の state 設計にもつながる。

### 9-3. optional props は `undefined` の可能性を持つ

React の props では、省略可能な値を扱うことが多い。

```ts
type UserCardProps = {
  name: string;
  description?: string;
};
```

`description?: string` は、props として渡されない可能性があることを表す。  
そのため、表示するときは `undefined` の可能性を考慮する。

```ts
const descriptionText = props.description ?? '説明なし';
```

Unit 02 の optional な値と `undefined` の扱いは、React の props 設計に直接つながる。

### 9-4. API 取得直後の値は `unknown` として考える視点が役立つ

React で API データを取得する場合、外部から来た値をそのまま信用すると危険である。  
TypeScript の型は、実行時の API レスポンスを自動で検証してくれるわけではない。

```ts
const responseBody: unknown = await response.json();
```

このように、最初は `unknown` として受け取り、type guard や validation で確認してから使う考え方が重要になる。  
Unit 02 の `unknown` の扱いは、後続の API レスポンス処理や React のデータ取得状態につながる。

### 9-5. イベントハンドラでは `void` の感覚が出てくる

React のイベントハンドラは、戻り値を使うよりも、副作用として state 更新や送信処理を行うことが多い。

```ts
function handleClick(): void {
  console.log('clicked');
}
```

実際の React ではイベント型も関係するが、戻り値を使わない関数として `void` が出てくる感覚は Unit 02 の内容とつながる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- TypeScript の基本型を大まかに説明できる
- 型注釈を書く場面と、型推論に任せる場面を分けて考えられる
- `let` と `const` で推論される型の違いを説明できる
- `literal widening` により、文字列リテラルが `string` に広がる場面を説明できる
- `string` と `'admin'` のような literal type の違いを説明できる
- `Array<T>` と `T[]` がどちらも配列の型を表すことを説明できる
- tuple と配列の違いを説明できる
- `readonly tuple` の入口として `as const` の効果を説明できる
- `object` 型と具体的なオブジェクト型の違いを説明できる
- union 型が、許可する値の候補を限定するために使えることを説明できる
- `null` と `undefined` の意味の違いを説明できる
- `strictNullChecks`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes` の入口を説明できる
- `any` と `unknown` の違いを説明できる
- `void` と `never` がどのような関数で出てくるか説明できる
- 実行時の `typeof` と TypeScript の型が別物であることを説明できる
- React の props や state でも、Unit 02 の内容が土台になることを説明できる
