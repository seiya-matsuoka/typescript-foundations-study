# 04. 関数の型・callback・高階関数

## 1. 学習対象

この単位では、関数、callback、高階関数を TypeScript の型付きコードとして学ぶ。  
関数は、引数の型、戻り値の型、callback の型、関数を受け取る関数、関数を返す関数という形で、TypeScript の実務コードに頻繁に出てくる。

Unit 02 では基本型、Unit 03 ではオブジェクト型を扱った。  
この単位では、それらの型を関数の引数や戻り値として使い、どの値を受け取り、どの値を返す関数なのかを型で読めるようにする。

関数の型は、配列処理、validator、formatter、React の event handler、callback props、custom hook の戻り値にもつながる。  
そのため、単に `(x: number) => number` のような文法例だけでなく、実務で見る mapper、predicate、validator、formatter、event handler 風の関数まで扱う。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- 関数引数の型
- 戻り値の型
- 戻り値型を書く場面
- 戻り値型を推論に任せる場面
- `optional parameter`
- `default parameter`
- `rest parameter`
- `function type expression`
- 関数型の `type alias`
- `callback` の型
- `higher-order function` の型
- `mapper` 関数の型
- `predicate` 関数の型
- `validator` 関数の型
- `formatter` 関数の型
- `void`
- `never`
- `overload` の概要
- 関数を引数に取る関数
- 関数を戻り値として返す関数
- 配列メソッドと関数型
- React の `event handler` 型につながる考え方

この単位は、Unit 02〜06 の基礎固めの中でも重要な厚め Unit として扱う。  
ただし、generics は深追いしすぎず、Unit 06 で扱うための橋渡しとして必要な範囲に留める。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  04-function-types-callbacks/
    index.ts
    function-parameter-return-types.ts
    return-type-annotation-decisions.ts
    optional-default-rest-parameters.ts
    function-type-expressions.ts
    function-type-aliases.ts
    callback-type-basics.ts
    higher-order-functions.ts
    mapper-predicate-functions.ts
    validator-formatter-functions.ts
    void-and-never-functions.ts
    function-overload-overview.ts
    array-method-function-types.ts
    react-event-handler-concepts.ts

docs/
  04-function-types-callbacks.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 04 のサンプルを順番に実行する入口。
- `function-parameter-return-types.ts`
  - 関数引数の型と戻り値の型を確認する。
- `return-type-annotation-decisions.ts`
  - 戻り値型を書く場面と、型推論に任せる場面を確認する。
- `optional-default-rest-parameters.ts`
  - `optional parameter`、`default parameter`、`rest parameter` を確認する。
- `function-type-expressions.ts`
  - `function type expression` で関数を引数として扱う方法を確認する。
- `function-type-aliases.ts`
  - 関数型の `type alias` を確認する。
- `callback-type-basics.ts`
  - callback の引数と戻り値の型を確認する。
- `higher-order-functions.ts`
  - 関数を引数に取る関数、関数を戻り値として返す関数を確認する。
- `mapper-predicate-functions.ts`
  - `mapper` 関数と `predicate` 関数の型を確認する。
- `validator-formatter-functions.ts`
  - `validator` 関数と `formatter` 関数の型を確認する。
- `void-and-never-functions.ts`
  - `void` と `never` を返す関数を確認する。
- `function-overload-overview.ts`
  - `overload` の概要を確認する。
- `array-method-function-types.ts`
  - 配列メソッドと callback の型推論を確認する。
- `react-event-handler-concepts.ts`
  - React の event handler 型につながる考え方を確認する。
- `04-function-types-callbacks.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:04
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

この単位では、`npm run unit:04` で関数を値として渡す処理や配列メソッドの実行結果を確認し、`npm run typecheck` で関数の引数・戻り値・callback の型チェックを確認する。  
`@ts-expect-error` を使っている箇所は、意図した型エラーを学習コードとして残すためのものとする。  
実行するとエラーになる可能性がある型エラー例は、型チェック対象には含めるが、Unit 実行時には呼び出さない補助関数として分けている。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/04-function-types-callbacks/index.ts`
2. `src/04-function-types-callbacks/function-parameter-return-types.ts`
3. `src/04-function-types-callbacks/return-type-annotation-decisions.ts`
4. `src/04-function-types-callbacks/optional-default-rest-parameters.ts`
5. `src/04-function-types-callbacks/function-type-expressions.ts`
6. `src/04-function-types-callbacks/function-type-aliases.ts`
7. `src/04-function-types-callbacks/callback-type-basics.ts`
8. `src/04-function-types-callbacks/higher-order-functions.ts`
9. `src/04-function-types-callbacks/mapper-predicate-functions.ts`
10. `src/04-function-types-callbacks/validator-formatter-functions.ts`
11. `src/04-function-types-callbacks/void-and-never-functions.ts`
12. `src/04-function-types-callbacks/function-overload-overview.ts`
13. `src/04-function-types-callbacks/array-method-function-types.ts`
14. `src/04-function-types-callbacks/react-event-handler-concepts.ts`

最初に `index.ts` を読み、Unit 04 全体の実行順を確認する。  
その後、関数引数と戻り値、戻り値型を書く判断、optional / default / rest parameter、関数型の表現、callback、高階関数、配列メソッド、React の event handler へ進む。

## 6. 注目ポイント

### 6-1. 関数引数の型と戻り値の型は、呼び出し側と実装側の両方を守る

`function-parameter-return-types.ts` では、価格計算と表示用文字列への変換を別の関数として定義している。

```ts
function calculateSubtotal(input: PriceInput): number {
  return input.unitPrice * input.quantity;
}

function formatPrice(price: number): string {
  return `${price.toLocaleString('ja-JP')}円`;
}
```

`calculateSubtotal` は `PriceInput` を受け取り、`number` を返す。  
`formatPrice` は `number` を受け取り、`string` を返す。

このように引数と戻り値の型が明確だと、呼び出し側は「何を渡せばよいか」を読みやすくなる。  
実装側も、「この関数は最終的に何を返すべきか」を型チェックで守れる。

Java のメソッド定義に近い感覚で読めるが、TypeScript ではオブジェクトの型は構造で判断される。  
そのため、`PriceInput` と同じプロパティ構造を持つ値であれば渡せる点は、Unit 03 の structural typing とつながる。

### 6-2. 戻り値型を書く場面と推論に任せる場面を分ける

`return-type-annotation-decisions.ts` では、戻り値型を明示した関数と、推論に任せた関数を並べている。

```ts
function createUserBadge(user: UserAccount): UserBadge {
  return {
    label: user.role === 'admin' ? '管理者' : 'メンバー',
    tone: user.role === 'admin' ? 'strong' : 'normal',
  };
}
```

`createUserBadge` は、外部から使われる表示用の値を返す関数である。  
このような関数では、戻り値型を `UserBadge` と明示することで、関数の仕様を読み手に伝えやすくなる。

一方で、小さく閉じた関数では推論に任せてもよい場面がある。

```ts
function isActiveAdmin(user: UserAccount) {
  return user.active && user.role === 'admin';
}
```

この戻り値は比較演算の結果から `boolean` と推論される。  
すべての関数に機械的に戻り値型を書くのではなく、公開される関数、複雑な変換関数、仕様として戻り値を固定したい関数では明示する、という判断が重要になる。

### 6-3. `function type expression` は関数を値として渡すときの形を表す

`function-type-expressions.ts` では、割引計算を行う関数を引数として渡している。

```ts
function applyDiscount(
  product: Product,
  discountRate: number,
  calculate: (price: number, rate: number) => number,
): Product {
  const discountedPrice = calculate(product.price, discountRate);

  return {
    ...product,
    price: discountedPrice,
  };
}
```

`calculate: (price: number, rate: number) => number` は、`number` と `number` を受け取り、`number` を返す関数を表す。  
JavaScript では関数を値として渡せるが、TypeScript ではその関数の引数と戻り値も型として表せる。

この読み方は、配列の `map` / `filter` / `reduce`、validator、formatter、React の callback props へそのままつながる。

### 6-4. 関数型に名前を付けると callback の意図が読みやすくなる

`function-type-aliases.ts` では、関数型に名前を付けている。

```ts
type ScoreFormatter = (score: number) => string;
type UserFormatter = (user: User) => string;
```

この2つはどちらも関数型だが、名前によって役割が分かる。  
`ScoreFormatter` は点数を表示文字列へ変換する関数であり、`UserFormatter` はユーザーを表示文字列へ変換する関数である。

```ts
function createUserSummary(
  user: User,
  formatScore: ScoreFormatter,
  formatUser: UserFormatter,
): string {
  return `${formatUser(user)} / ${formatScore(user.score)}`;
}
```

引数に関数が複数出てくる場合、毎回 `(x: T) => U` を直接書くと読みづらくなる。  
関数型の `type alias` を使うと、関数の形だけでなく、関数の用途も名前で伝えられる。

### 6-5. 高階関数は、関数を受け取る・関数を返す処理として読む

`higher-order-functions.ts` では、関数を返す関数と、関数を引数に取る関数を扱っている。

```ts
function createPrefixFormatter(prefix: string): TextFormatter {
  return (text) => `${prefix}: ${text}`;
}

function composeTextFormatter(normalize: TextNormalizer, format: TextFormatter): TextFormatter {
  return (text) => format(normalize(text));
}
```

`createPrefixFormatter` は、`prefix` を受け取り、`TextFormatter` を返す。  
`composeTextFormatter` は、2つの関数を受け取り、新しい `TextFormatter` を返す。

JavaScript では関数を値として扱う書き方が多いため、TypeScript ではその「関数値の形」を型として読める必要がある。  
Unit 04 では generics を深追いしないが、Unit 06 ではこのような関数の型をより汎用的に扱う。

## 7. 引っかかりやすい点

### 7-1. optional parameter は関数内部では `undefined` の可能性がある

`optional-default-rest-parameters.ts` では、`limit?: number` を使っている。

```ts
function formatSearchCondition(keyword: string, limit?: number): string {
  const resolvedLimit = limit ?? 20;

  return `${keyword} / limit=${resolvedLimit}`;
}
```

`limit?: number` は、呼び出し側が第2引数を省略できることを表す。  
関数内部では、`limit` は `number | undefined` として扱う必要がある。

そのため、`limit` をそのまま数値として使うのではなく、`??` でデフォルト値を用意している。  
Unit 02 の `undefined`、Unit 03 の optional property と同じく、「省略される可能性」を意識する必要がある。

### 7-2. `void` は「何も起きない」ではなく、戻り値を使わないという意味で読む

`void-and-never-functions.ts` では、`pushLog` が `void` を返す。

```ts
function pushLog(logs: LogEntry[], level: LogLevel, message: string): void {
  logs.push({ level, message });
}
```

この関数は、`logs` 配列へ値を追加する副作用を持つ。  
つまり、`void` は「処理が何もしない」という意味ではない。  
戻り値を呼び出し側で利用しない、という意味で読む。

React の event handler でも、戻り値を使わず、state 更新やイベント処理という副作用を行う関数が多い。  
そのため、`() => void` は React に進んだときも頻繁に見る。

### 7-3. `never` は「ありえない値」ではなく、戻ってこない処理として出てくる

同じファイルでは、`fail` が `never` を返す。

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

`never` は、正常に値を返して戻ってこない関数の戻り値型として使われる。  
ここでは例外を投げるため、呼び出し元へ通常の値を返さない。

後続 Unit では、union 型の網羅性チェックでも `never` が登場する。  
この単位では、まず「throw する関数は `never` になり得る」と押さえる。

### 7-4. overload は便利だが、複雑にしすぎると読みにくい

`function-overload-overview.ts` では、`findUser` に overload を定義している。

```ts
function findUser(query: string): UserLookup | undefined;
function findUser(query: { readonly id: string }): UserLookup | undefined;
function findUser(query: string | { readonly id: string }): UserLookup | undefined {
  if (typeof query === 'string') {
    return users.find((user) => user.name === query);
  }

  return users.find((user) => user.id === query.id);
}
```

overload を使うと、呼び出し方ごとに型を分けられる。  
一方で、実装本体では union 型として受け取り、分岐して扱う必要がある。

実務では、overload よりも union 型や options object の方が読みやすい場面もある。  
この Unit では overload の概要だけを扱い、複雑な overload 設計には進まない。

### 7-5. 配列メソッドの callback 引数は型推論されることが多い

`array-method-function-types.ts` では、`filter` や `map` の callback 引数に明示的な型を書いていない。

```ts
const paidOrders = orders.filter((order) => {
  return order.paid;
});
```

`orders` が `readonly Order[]` なので、`order` は `Order` として推論される。  
配列メソッドでは、このように文脈から callback 引数の型が流れてくる場面が多い。

無理にすべての callback 引数へ型注釈を書くと、かえって冗長になることがある。  
一方で、関数を別変数へ切り出す場合や、引数の型が文脈から分かりにくい場合は、関数型の alias を使うと読みやすくなる。

## 8. 実務でよく使う場面

### 8-1. validator 関数で入力値と検証結果を分ける

`validator-formatter-functions.ts` では、フォーム値を受け取り、検証結果を返す validator を定義している。

```ts
type LoginValidator = (values: LoginFormValues) => ValidationResult;

const validateLoginForm: LoginValidator = (values) => {
  const messages: string[] = [];

  if (!values.email.includes('@')) {
    messages.push('メールアドレスを確認してください');
  }

  if (values.password.length < 8) {
    messages.push('パスワードは8文字以上で入力してください');
  }

  return {
    valid: messages.length === 0,
    messages,
  };
};
```

validator は、入力値を受け取り、検証結果を返す関数として実務でよく使う。  
`LoginFormValues` と `ValidationResult` を分けることで、入力値と検証結果を混同しにくくなる。

この考え方は、React のフォームや API request body の検証にもつながる。

### 8-2. formatter 関数で表示用文字列を作る

同じファイルでは、検証メッセージを表示用文字列へ変換している。

```ts
type MessageFormatter = (messages: readonly string[]) => string;

const formatMessages: MessageFormatter = (messages) => {
  return messages.length === 0 ? 'エラーなし' : messages.join(' / ');
};
```

formatter は、値を表示に適した形へ整える関数である。  
日付、金額、ステータスラベル、検証メッセージなど、実務では formatter を切り出す場面が多い。

formatter の型を明確にすると、表示用の変換処理がどの値を受け取り、どの値を返すかが読みやすくなる。

### 8-3. mapper / predicate は一覧表示や検索条件でよく使う

`mapper-predicate-functions.ts` では、predicate で絞り込み、mapper で表示用カードへ変換している。

```ts
type BookMapper = (book: Book) => BookCard;
type BookPredicate = (book: Book) => boolean;

function filterAndMapBooks(
  books: readonly Book[],
  predicate: BookPredicate,
  mapper: BookMapper,
): readonly BookCard[] {
  return books.filter(predicate).map(mapper);
}
```

predicate は条件判定、mapper は変換を担当する。  
一覧表示、検索結果、カード表示、テーブル表示などで頻繁に使う考え方である。

関数型を分けておくと、「条件を表す関数」と「表示用データへ変換する関数」の役割が明確になる。

### 8-4. 高階関数で処理の組み合わせを作る

`higher-order-functions.ts` では、文字列の正規化と表示用フォーマットを組み合わせている。

```ts
function composeTextFormatter(normalize: TextNormalizer, format: TextFormatter): TextFormatter {
  return (text) => format(normalize(text));
}
```

実務では、共通処理を関数として切り出し、別の処理と組み合わせる場面がある。  
ただし、高階関数は便利な一方で、抽象化しすぎると読みづらくなる。

この Unit では、まず「関数を値として受け取り、別の関数を返せる」ことを型付きで読めるようにする。

## 9. React につながるポイント

### 9-1. event handler は `(event) => void` の形で読む

`react-event-handler-concepts.ts` では、React の event handler に近い型を自前で定義している。

```ts
type TextChangeHandler = (event: TextInputEvent) => void;
```

React では、入力変更やクリックの処理で event handler を props として渡す。  
戻り値は通常使わないため、`void` が出てくることが多い。

実際の React では、次のような型を見ることになる。

```ts
type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
```

このリポジトリでは React 本体を入れないが、関数型としては Unit 04 の内容と同じである。

### 9-2. callback props は function property として扱う

React の props では、親から子へ callback を渡すことが多い。

```ts
type SaveButtonProps = {
  readonly label: string;
  readonly onClick: () => void;
};
```

これは Unit 03 の function property と、Unit 04 の関数型が組み合わさった形である。  
`onClick` は引数なしで戻り値を使わない関数、つまり `() => void` として読める。

引数を受け取る callback props なら、次のように書ける。

```ts
type SelectItemProps = {
  readonly onSelect: (id: string) => void;
};
```

Unit 04 の callback 型を理解しておくと、React の props 型が読みやすくなる。

### 9-3. `useState` の setter に渡す関数も callback として読める

React の `useState` では、前の state を受け取って次の state を返す関数を渡すことがある。

```ts
setCount((current) => current + 1);
```

この形は、「関数を引数として渡す」callback の一種として読める。  
Unit 04 の `function type expression` や高階関数の考え方が、React の state 更新にもつながる。

ただし、React の具体的な型は React 学習で扱う。  
ここでは、関数を値として渡すこと、引数と戻り値を型で読むことを押さえる。

### 9-4. 配列メソッドの callback は list rendering の前処理に使う

React では、一覧表示の前に `filter` や `map` でデータを整えることが多い。

```ts
const visibleItems = items.filter((item) => item.visible);
const itemCards = visibleItems.map((item) => ({
  title: item.name,
  subtitle: item.description,
}));
```

Unit 04 の `array-method-function-types.ts` では、同じ考え方で `Order` を `OrderSummary` へ変換している。  
配列メソッドの callback 引数は元配列から型推論されるため、React のコンポーネント内でも型注釈を書きすぎずに安全に扱える場面が多い。

### 9-5. custom hook の戻り値にも関数が含まれる

React の custom hook では、値と関数をまとめて返すことがある。

```ts
type UseSearchResult = {
  readonly keyword: string;
  readonly setKeyword: (keyword: string) => void;
  readonly clearKeyword: () => void;
};
```

このような型では、オブジェクト型の中に関数型が入る。  
Unit 03 の object type と Unit 04 の function type が組み合わさる例である。

React に進む前に、関数型を props や戻り値の一部として読めるようにしておくと、custom hook の型も理解しやすくなる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- 関数引数の型と戻り値の型を説明できる
- 戻り値型を書く場面と、推論に任せる場面を分けて考えられる
- `optional parameter` が関数内部では `undefined` の可能性を持つことを説明できる
- `default parameter` で初期値を指定する意味を説明できる
- `rest parameter` が残りの引数を配列として受け取ることを説明できる
- `function type expression` の読み方を説明できる
- 関数型の `type alias` を使う理由を説明できる
- callback の引数と戻り値の型を説明できる
- higher-order function が、関数を引数に取る関数や関数を返す関数であることを説明できる
- `mapper`、`predicate`、`validator`、`formatter` の役割を説明できる
- `void` と `never` の違いを説明できる
- overload の概要と、深追いしすぎない理由を説明できる
- 配列メソッドの callback 引数が型推論されることを説明できる
- React の event handler、callback props、custom hook の型に Unit 04 の内容がつながることを説明できる
