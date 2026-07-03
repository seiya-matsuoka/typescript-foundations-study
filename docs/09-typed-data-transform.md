# 09. 配列・オブジェクト操作と型付きデータ変換

## 1. 学習対象

この単位では、JavaScript 学習で扱った配列・オブジェクト操作を、TypeScript の型付きコードとして再確認する。  
配列操作やオブジェクト変換は、実務の Web アプリケーションで非常に多く出てくる。

特に、API から取得した DTO を domain model や view model に変換する処理、フォーム入力値を整える処理、一覧表示用データを作る処理、React の list rendering に渡すデータを作る処理でよく使う。

JavaScript としては見慣れた `map`、`filter`、`reduce`、`find`、`Object.keys` でも、TypeScript では型として注意すべき点がある。  
この単位では、実行時の処理だけでなく、配列要素の型、callback の戻り値型、`undefined` が混ざる箇所、accumulator の型、辞書オブジェクトの型を意識して読む。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

- 型付き配列
- `readonly array`
- `tuple`
- `map` の型推論
- `filter` の型推論
- `type guard` を使った `filter`
- `reduce` の型注釈
- `find` と `undefined`
- `some`
- `every`
- `flatMap`
- `sort`
- `toSorted`
- `Object.keys` の型
- `Object.values` の型
- `Object.entries` の型
- `Object.fromEntries` の型
- 配列から辞書への変換
- 辞書から配列への変換
- `group by` 風処理
- 集計
- 表示用データへの変換
- `nullable` な値を含む配列
- `filter(Boolean)` の注意
- `mapper` / `predicate` / `formatter` / `normalizer` の型
- `React` の `list rendering` に渡すデータ型

この単位は厚めに扱う。  
特に、`reduce` の accumulator 型、`Object.keys` の戻り値、`find` の `undefined`、`filter(Boolean)` の注意点を重点的に扱う。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  09-typed-data-transform/
    index.ts
    typed-array-readonly-tuple.ts
    map-type-inference.ts
    filter-type-inference.ts
    filter-type-guard.ts
    reduce-accumulator-types.ts
    find-some-every.ts
    flatmap-sort-tosorted.ts
    object-keys-values-entries.ts
    from-entries-dictionary-transform.ts
    array-dictionary-conversion.ts
    group-by-aggregation.ts
    nullable-values-filter-boolean.ts
    mapper-predicate-formatter-normalizer.ts
    dto-domain-viewmodel-transform.ts
    react-list-rendering-data.ts

docs/
  09-typed-data-transform.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 09 のサンプルを順番に実行する入口。
- `typed-array-readonly-tuple.ts`
  - 型付き配列、readonly array、tuple を確認する。
- `map-type-inference.ts`
  - `map` の callback と戻り値型の推論を確認する。
- `filter-type-inference.ts`
  - boolean predicate による `filter` の型推論を確認する。
- `filter-type-guard.ts`
  - type guard を使った `filter` の narrowing を確認する。
- `reduce-accumulator-types.ts`
  - `reduce` の accumulator 型を明示する場面を確認する。
- `find-some-every.ts`
  - `find` の `undefined` と `some` / `every` を確認する。
- `flatmap-sort-tosorted.ts`
  - `flatMap`、破壊的な `sort`、非破壊の `toSorted` を確認する。
- `object-keys-values-entries.ts`
  - `Object.keys` / `Object.values` / `Object.entries` の型を確認する。
- `from-entries-dictionary-transform.ts`
  - `Object.fromEntries` と辞書オブジェクトの型を確認する。
- `array-dictionary-conversion.ts`
  - 配列から辞書へ、辞書から配列へ変換する。
- `group-by-aggregation.ts`
  - `group by` 風処理と集計を確認する。
- `nullable-values-filter-boolean.ts`
  - nullable な値を含む配列と `filter(Boolean)` の注意点を確認する。
- `mapper-predicate-formatter-normalizer.ts`
  - `mapper` / `predicate` / `formatter` / `normalizer` の型を確認する。
- `dto-domain-viewmodel-transform.ts`
  - DTO から domain model、view model へ変換する。
- `react-list-rendering-data.ts`
  - React の list rendering に渡すデータ型を確認する。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:09
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

この単位では、`npm run unit:09` で実行時の配列・オブジェクト変換結果を確認し、`npm run typecheck` で型の関係を確認する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/09-typed-data-transform/index.ts`
2. `src/09-typed-data-transform/typed-array-readonly-tuple.ts`
3. `src/09-typed-data-transform/map-type-inference.ts`
4. `src/09-typed-data-transform/filter-type-inference.ts`
5. `src/09-typed-data-transform/filter-type-guard.ts`
6. `src/09-typed-data-transform/reduce-accumulator-types.ts`
7. `src/09-typed-data-transform/find-some-every.ts`
8. `src/09-typed-data-transform/flatmap-sort-tosorted.ts`
9. `src/09-typed-data-transform/object-keys-values-entries.ts`
10. `src/09-typed-data-transform/from-entries-dictionary-transform.ts`
11. `src/09-typed-data-transform/array-dictionary-conversion.ts`
12. `src/09-typed-data-transform/group-by-aggregation.ts`
13. `src/09-typed-data-transform/nullable-values-filter-boolean.ts`
14. `src/09-typed-data-transform/mapper-predicate-formatter-normalizer.ts`
15. `src/09-typed-data-transform/dto-domain-viewmodel-transform.ts`
16. `src/09-typed-data-transform/react-list-rendering-data.ts`

最初に型付き配列と tuple を確認し、その後 `map`、`filter`、`reduce`、`find`、`Object.keys`、辞書変換、group by、nullable 配列、DTO 変換、React の list rendering へ進む。

## 6. 注目ポイント

### 6-1. `map` は callback の戻り値から変換後の配列型を作る

`map-type-inference.ts` では、`BookDto` から `BookCard` へ変換している。

```ts
function toBookCard(dto: BookDto): BookCard {
  return {
    key: dto.id,
    title: dto.title,
    priceLabel: `${dto.price.toLocaleString()}円`,
    tagCount: dto.tags.length,
  };
}
```

`books.map((book) => toBookCard(book))` の戻り値は、`BookCard[]` として推論される。  
`map` は、元配列の要素型と callback の戻り値型から、新しい配列の型を決める。

React の list rendering では、API DTO をそのまま表示するのではなく、カード表示用の props や view model に変換してから渡すことが多い。

### 6-2. `filter` と type guard は型の絞り込み方が違う

`filter-type-inference.ts` では、boolean を返す predicate を使っている。

```ts
const completedTasks = tasks.filter((task) => isCompletedTask(task));
```

この場合、配列の中身は条件に合う要素だけになるが、要素型は基本的に `Task` のままである。  
一方、`filter-type-guard.ts` では type guard を使っている。

```ts
function hasDueDate(task: Task): task is TaskWithDueDate {
  return task.dueDate !== undefined;
}

const tasksWithDueDate = tasks.filter(hasDueDate);
```

この場合、`tasksWithDueDate` の要素は `TaskWithDueDate` として扱える。  
`filter` で型も絞りたい場合は、戻り値を `value is Type` の形にした type guard を使う。

### 6-3. `reduce` では accumulator 型を明示すると読みやすい

`reduce-accumulator-types.ts` では、`reduce<TaskSummary>` と書いている。

```ts
return tasks.reduce<TaskSummary>((summary, task) => {
  const currentStatusCount = summary.countByStatus[task.status];

  return {
    totalCount: summary.totalCount + 1,
    totalPoint: summary.totalPoint + task.point,
    countByStatus: {
      ...summary.countByStatus,
      [task.status]: currentStatusCount + 1,
    },
  };
}, initialSummary);
```

`reduce` は、accumulator の型が分かりづらくなりやすい。  
特に、辞書オブジェクトや集計結果を作る場合は、accumulator の型を明示した方が読みやすい。

### 6-4. `find` は `undefined` を返す可能性がある

`find-some-every.ts` では、`findUserById` の戻り値を `User | undefined` にしている。

```ts
function findUserById(users: readonly User[], id: string): User | undefined {
  return users.find((user) => user.id === id);
}
```

`find` は、条件に一致する要素が見つからない可能性がある。  
そのため、戻り値をそのまま `User` として扱うことはできない。

```ts
if (user === undefined) {
  return 'unknown user';
}
```

`undefined` を先に処理すると、その後は `User` として扱える。  
これは Unit 05 の narrowing と同じ考え方である。

### 6-5. `Object.keys` は `string[]` として返る

`object-keys-values-entries.ts` では、`Object.keys(formValues)` を扱っている。

```ts
const rawKeys = Object.keys(formValues);
const formKeys = Object.keys(formValues) as Array<keyof FormValues>;
```

`Object.keys` の戻り値は `string[]` である。  
TypeScript は、実行時に余分なプロパティが混ざる可能性まで考えるため、自動で `Array<keyof FormValues>` にはしてくれない。

自分たちが管理しているオブジェクトで、キーが `keyof FormValues` であると判断できる場合に、型アサーションで補うことがある。

## 7. 引っかかりやすい点

### 7-1. `filter(Boolean)` は null / undefined だけを取り除くとは限らない

`nullable-values-filter-boolean.ts` では、`filter(Boolean)` の注意点を扱っている。

```ts
const scores: readonly (number | null | undefined)[] = [100, 0, null, 80, undefined];
const truthyScores = scores.filter(Boolean);
```

`filter(Boolean)` は、`null` や `undefined` だけでなく、`0`、空文字、`false` も取り除く。  
点数、数量、空文字を有効な値として扱う場合、意図しないデータ欠落につながる。

null / undefined だけを取り除きたい場合は、type guard を定義する。

```ts
function isNonNullableValue<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}
```

### 7-2. `sort` は破壊的、`toSorted` は非破壊

`flatmap-sort-tosorted.ts` では、`toSorted` を使っている。

```ts
return articles.toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
```

`sort` は元の配列を変更する。  
React の state や props で受け取った配列を直接変更すると、意図しない副作用につながることがある。

`toSorted` は元の配列を変更せず、新しい配列を返す。  
React の state 更新では、このような非破壊の変換が重要になる。

### 7-3. `Object.fromEntries` の戻り値型は広くなりやすい

`from-entries-dictionary-transform.ts` では、`Object.fromEntries` の戻り値を `Record<Role, Permission>` として扱っている。

```ts
return Object.fromEntries(entries) as Record<Role, Permission>;
```

実行時には期待した辞書オブジェクトが作れても、TypeScript がそのキーと値の関係を完全に追えるとは限らない。  
そのため、型アサーションが必要になる場面がある。

ただし、型アサーションは「コンパイラに任せきれない部分を人間が補っている」箇所である。  
実装と型がずれる危険性があるため、使いどころを意識する。

### 7-4. `Object.values` で辞書から配列へ戻すとキー情報は失われる

`array-dictionary-conversion.ts` では、`Object.values(dictionary)` を使って辞書から配列へ戻している。

```ts
const valuesFromDictionary = Object.values(dictionary);
```

`Object.values` は値の配列を返すため、キーの情報は失われる。  
値だけで十分な場面では便利だが、キーと値のペアを保ちたい場合は `Object.entries` を使う方がよい。

### 7-5. optional / nullable な値は表示用変換の境界で整理すると読みやすい

`dto-domain-viewmodel-transform.ts` では、`authorName: string | null` を view model に変換している。

```ts
authorLabel: book.authorName ?? '著者未設定',
```

nullable な値をコンポーネントの中で毎回処理すると、表示ロジックが散らばる。  
view model へ変換する段階でラベル化しておくと、React コンポーネント側は表示に集中できる。

## 8. 実務でよく使う場面

### 8-1. API DTO から画面表示用データへ変換する

`dto-domain-viewmodel-transform.ts` では、DTO、domain model、view model を分けている。

```ts
const books = dtos.map((dto) => toBook(dto));
const viewModels = books.map((book) => toBookViewModel(book));
```

API のレスポンスは、snake_case、文字列日付、nullable な値を含むことがある。  
画面側で扱いやすい形に変換することで、表示ロジックや props の型が読みやすくなる。

### 8-2. 一覧データを辞書化して検索しやすくする

`array-dictionary-conversion.ts` では、配列から辞書へ変換している。

```ts
function toDictionaryById<TItem extends { readonly id: string }>(
  items: readonly TItem[],
): Record<string, TItem> {
  return items.reduce<Record<string, TItem>>((dictionary, item) => {
    return {
      ...dictionary,
      [item.id]: item,
    };
  }, {});
}
```

ID からデータを引きたい場面では、配列より辞書の方が扱いやすいことがある。  
TypeScript では、辞書のキーと値の型を `Record` で表すことが多い。

### 8-3. group by と集計で dashboard 用データを作る

`group-by-aggregation.ts` では、注文をステータスごとにまとめ、金額を集計している。

```ts
const groupedOrders = groupByStatus(orders);
const totals = sumAmountByStatus(orders);
```

管理画面、dashboard、一覧のサマリー表示では、配列データをグループ化・集計する処理がよく出てくる。  
`Record<Status, number>` や `Record<Status, Item[]>` のような型で結果を表すと、表示側で扱いやすくなる。

### 8-4. mapper / predicate / formatter / normalizer で役割を分ける

`mapper-predicate-formatter-normalizer.ts` では、関数の役割を型で表している。

```ts
type Mapper<TInput, TOutput> = (input: TInput) => TOutput;
type Predicate<TInput> = (input: TInput) => boolean;
type Formatter<TInput> = (input: TInput) => string;
type Normalizer<TInput, TOutput> = (input: TInput) => TOutput;
```

実務では、データを変換する関数、条件判定する関数、表示文字列にする関数、入力値を正規化する関数を分けると読みやすくなる。  
関数の型に名前を付けることで、callback の役割が明確になる。

## 9. React につながるポイント

### 9-1. list rendering 用の配列を作る

`react-list-rendering-data.ts` では、`Task` から `TaskListItemProps` へ変換している。

```ts
const listItems = updatedTasks.map((task) => toTaskListItemProps(task));
```

React では、API や state のデータをそのまま表示するのではなく、コンポーネントが受け取りやすい props に変換してから渡すことが多い。  
この Unit の `map`、formatter、view model の考え方は、list rendering に直結する。

### 9-2. state 更新では元配列を直接変更しない

`updateTaskStatus` では、`map` を使って新しい配列を返している。

```ts
return tasks.map((task) => {
  if (task.id !== targetId) {
    return task;
  }

  return {
    ...task,
    status: nextStatus,
  };
});
```

React の state 更新では、元の配列やオブジェクトを直接変更せず、新しい値を返すことが重要である。  
`map`、`filter`、`toSorted` などの非破壊的な変換は、React の考え方と相性がよい。

### 9-3. nullable な値は props に渡す前に表示用に整える

`Task` では、`assigneeName` が `string | null` になっている。

```ts
assigneeLabel: task.assigneeName ?? '未割り当て',
```

コンポーネントの中で毎回 `null` を処理するより、list item props を作る段階で表示用ラベルにしておくと読みやすい。  
API DTO や domain model と、画面表示用 props を分ける考え方が重要である。

### 9-4. `Record` と union 型で表示ラベルを安全に管理できる

`react-list-rendering-data.ts` では、ステータス表示名を `Record<TaskStatus, string>` で定義している。

```ts
const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
};
```

`TaskStatus` に新しい値を追加した場合、`STATUS_LABELS` も更新が必要になる。  
このように union 型と `Record` を組み合わせると、表示ラベルの不足に気づきやすくなる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- 型付き配列と `readonly array` の違いを説明できる
- tuple が「順番と意味を持つ配列」であることを説明できる
- `map` の戻り値型が callback の戻り値から決まることを説明できる
- boolean predicate の `filter` と type guard の `filter` の違いを説明できる
- `reduce` の accumulator 型を明示する理由を説明できる
- `find` が `T | undefined` を返すことを説明できる
- `some` / `every` が boolean を返すことを説明できる
- `flatMap` が map と flat を組み合わせた処理であることを説明できる
- `sort` が破壊的で、`toSorted` が非破壊であることを説明できる
- `Object.keys` が `string[]` を返す理由を説明できる
- `Object.values` / `Object.entries` / `Object.fromEntries` の型の注意点を説明できる
- 配列から辞書へ、辞書から配列へ変換できる
- `group by` 風処理と集計を `Record` で表せる
- `filter(Boolean)` の注意点を説明できる
- `mapper` / `predicate` / `formatter` / `normalizer` の役割を説明できる
- DTO、domain model、view model を分ける理由を説明できる
- React の list rendering に渡すデータ型を作れる
