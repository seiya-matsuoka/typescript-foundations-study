# 06. generics の基本と実務的な使い方

## 1. 学習対象

この単位では、TypeScript の generics の基本と、実務でよく見る使い方を学ぶ。  
generics は、TypeScript 初学者がつまずきやすい一方で、避けると実務コードを読みづらくなる領域である。

この単位では、難しい conditional types や再帰的な型には進まない。  
関数、配列処理、API response、Result 型、repository 風関数、React の custom hook に近い状態型など、実務で自然に出てくる generics を中心に扱う。

Unit 02〜05 では、基本型、オブジェクト型、関数型、union 型、narrowing を確認した。  
Unit 06 では、それらを土台にして、「外側の形は共通で、中身の型だけ呼び出し側で変わる」コードを読めるようにする。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

- `generic function`
- `generic type alias`
- `generic interface`
- `generic class` の概要
- 型引数
- 型引数の推論
- 明示的な型引数
- `constraints`
- `extends`
- `default type parameter`
- `keyof` と組み合わせた `generics` の入口
- 配列処理での `generics`
- `mapper` / `selector` 関数での `generics`
- `API response` 型での `generics`
- `Result` 型での `generics`
- `repository` 風関数での `generics`
- `React` の `custom hook` 型につながる考え方

この単位は、Unit 02〜06 の基礎厚め Unit の最後にあたる。  
高度な型パズルではなく、実務コードを読むために必要な generics の読み方を重視する。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  06-generics-practical-basics/
    index.ts
    generic-function-basics.ts
    type-argument-inference.ts
    explicit-type-arguments.ts
    generic-type-alias-basics.ts
    generic-interface-basics.ts
    generic-class-overview.ts
    constraints-extends.ts
    default-type-parameters.ts
    keyof-generics-basics.ts
    array-processing-generics.ts
    mapper-selector-generics.ts
    api-response-generics.ts
    result-type-generics.ts
    repository-generics.ts
    react-custom-hook-concepts.ts

docs/
  06-generics-practical-basics.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 06 のサンプルを順番に実行する入口。
- `generic-function-basics.ts`
  - generic function の基本と、入力値の型を戻り値へつなげる考え方を確認する。
- `type-argument-inference.ts`
  - 呼び出し側の値から型引数が推論される流れを確認する。
- `explicit-type-arguments.ts`
  - 明示的な型引数が必要になる場面を確認する。
- `generic-type-alias-basics.ts`
  - `Box<T>`、`ListResponse<TItem>`、`Page<TItem>` のような generic type alias を確認する。
- `generic-interface-basics.ts`
  - `Store<TValue>` のような generic interface を確認する。
- `generic-class-overview.ts`
  - generic class の概要を確認する。
- `constraints-extends.ts`
  - `TItem extends Identifiable` のような constraints を確認する。
- `default-type-parameters.ts`
  - default type parameter を確認する。
- `keyof-generics-basics.ts`
  - `keyof` と generics を組み合わせた型の入口を確認する。
- `array-processing-generics.ts`
  - `uniqueBy`、`groupBy` のような配列処理で generics を確認する。
- `mapper-selector-generics.ts`
  - `mapper` / `selector` 関数の型を generics で表す。
- `api-response-generics.ts`
  - API response 型で generics を使う例を確認する。
- `result-type-generics.ts`
  - 成功 / 失敗を表す Result 型で generics を使う例を確認する。
- `repository-generics.ts`
  - repository 風関数で generics と constraints を使う例を確認する。
- `react-custom-hook-concepts.ts`
  - React の custom hook 型につながる状態型の考え方を確認する。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:06
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

この単位では、`npm run unit:06` で generics を使った実行時の値を確認し、`npm run typecheck` で型引数の関係を確認する。  
この Unit では実行時に壊れる型エラー例を置かず、実際に動くコードの中で generics の読み方を確認する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/06-generics-practical-basics/index.ts`
2. `src/06-generics-practical-basics/generic-function-basics.ts`
3. `src/06-generics-practical-basics/type-argument-inference.ts`
4. `src/06-generics-practical-basics/explicit-type-arguments.ts`
5. `src/06-generics-practical-basics/generic-type-alias-basics.ts`
6. `src/06-generics-practical-basics/generic-interface-basics.ts`
7. `src/06-generics-practical-basics/generic-class-overview.ts`
8. `src/06-generics-practical-basics/constraints-extends.ts`
9. `src/06-generics-practical-basics/default-type-parameters.ts`
10. `src/06-generics-practical-basics/keyof-generics-basics.ts`
11. `src/06-generics-practical-basics/array-processing-generics.ts`
12. `src/06-generics-practical-basics/mapper-selector-generics.ts`
13. `src/06-generics-practical-basics/api-response-generics.ts`
14. `src/06-generics-practical-basics/result-type-generics.ts`
15. `src/06-generics-practical-basics/repository-generics.ts`
16. `src/06-generics-practical-basics/react-custom-hook-concepts.ts`

最初に `index.ts` を読み、Unit 06 全体の実行順を確認する。  
その後、generic function、型引数の推論、明示的な型引数、type alias、interface、class、constraints、`keyof`、配列処理、API response、Result 型、repository、React の custom hook につながる型という順番で読む。

## 6. 注目ポイント

### 6-1. generics は「型の関係」を表すために使う

`generic-function-basics.ts` では、`createPair<T>` を使っている。

```ts
function createPair<T>(first: T, second: T): readonly [T, T] {
  return [first, second];
}
```

ここで重要なのは、`T` が単なる穴埋めではなく、`first` と `second` の型を結び付けている点である。  
`createPair('draft', 'published')` なら、2つの引数はどちらも文字列として扱われる。  
`createPair(10, 20)` なら、どちらも number として扱われる。

同じファイルでは、配列要素と fallback の型も `T` で結び付けている。

```ts
function firstOrFallback<T>(values: readonly T[], fallback: T): T {
  return values[0] ?? fallback;
}
```

`values` が `readonly string[]` なら、`fallback` も `string` である必要がある。  
このように、generics は「どこか1箇所の型」ではなく、「複数箇所の型の関係」を表すために使う。

### 6-2. 型引数は呼び出し側の値から推論される

`type-argument-inference.ts` では、`toReadonlyList<T>` を呼び出している。

```ts
const labels = toReadonlyList('下書き', '公開済み');
```

この呼び出しでは、`<T>` を明示していない。  
それでも TypeScript は、引数の値から `T` を推論する。

オブジェクトでも同じである。

```ts
const users = toReadonlyList(admin, member);
```

`admin` と `member` が `User` 型であれば、`T` は `User` として扱われる。  
generics のコードを読むときは、「この `T` はどの引数や戻り値から決まっているか」を追うことが重要となる。

### 6-3. 推論できない場合は明示的な型引数を書く

`explicit-type-arguments.ts` では、`createEmptyList<T>` を扱っている。

```ts
function createEmptyList<T>(): T[] {
  return [];
}
```

この関数は引数を持たないため、呼び出し時の値から `T` を推論できない。  
そのため、次のように呼び出し側で明示する。

```ts
const emptyIds = createEmptyList<string>();
```

明示的な型引数は、常に書くものではない。  
推論できる場合は推論に任せ、推論できない場合や意図を明確にしたい場合に書く。

### 6-4. constraints により、generic な値の中で安全にプロパティを読める

`constraints-extends.ts` では、`TItem extends Identifiable` を使っている。

```ts
type Identifiable = {
  readonly id: string;
};

function getId<TItem extends Identifiable>(item: TItem): string {
  return item.id;
}
```

制約なしの `TItem` では、`item.id` が存在するか分からない。  
`extends Identifiable` と書くことで、`TItem` は少なくとも `id: string` を持つことが分かる。

同じ制約は、repository 風関数でも出てくる。

```ts
interface Repository<TEntity extends Entity> {
  findAll(): readonly TEntity[];
  findById(id: string): TEntity | undefined;
  save(entity: TEntity): TEntity;
}
```

実務では、ID を持つデータを共通化する処理でこのような constraints を見ることがある。

### 6-5. `keyof` と組み合わせると、キーと値の関係を表せる

`keyof-generics-basics.ts` では、`pickValue` を定義している。

```ts
function pickValue<TObject, TKey extends keyof TObject>(object: TObject, key: TKey): TObject[TKey] {
  return object[key];
}
```

`TKey extends keyof TObject` は、`key` が `object` のプロパティ名のどれかであることを表す。  
戻り値を `TObject[TKey]` と書くことで、選んだキーに対応する値の型を返せる。

```ts
const userName = pickValue(user, 'name');
const userAge = pickValue(user, 'age');
```

`'name'` を選ぶと戻り値は string、`'age'` を選ぶと戻り値は number になる。  
この考え方は Unit 07 の `keyof` / `typeof` / indexed access types へつながる。

## 7. 引っかかりやすい点

### 7-1. generics は難しい型パズルではなく、値の型を保つ仕組みとして読む

`wrapValue<T>` は単純な例だが、generics の中心を表している。

```ts
function wrapValue<T>(value: T): { readonly value: T } {
  return {
    value,
  };
}
```

入力値が string なら、戻り値の `value` も string である。  
入力値が number なら、戻り値の `value` も number である。

このように、generics は「型を抽象化するもの」ではあるが、最初は「入力値の型を保ったまま別の形にする仕組み」と読むと理解しやすい。

### 7-2. `<T>` を毎回明示する必要はない

`type-argument-inference.ts` では、型引数を明示せずに `toReadonlyList` を呼び出している。

```ts
const labels = toReadonlyList('下書き', '公開済み');
```

TypeScript は、引数から `T` を推論できる。  
そのため、明らかに推論できる場面で毎回 `<string>` や `<User>` を書く必要はない。

一方で、`createEmptyList<T>` のように引数がなく、推論材料がない関数では明示が必要になる。

```ts
const emptyIds = createEmptyList<string>();
```

推論に任せる場面と、明示する場面を分けることが重要である。

### 7-3. `extends` は class 継承だけではない

Java 経験者にとって、`extends` は class 継承の印象が強い。  
TypeScript の generics で出てくる `extends` は、型引数の制約として使うことがある。

```ts
function getId<TItem extends Identifiable>(item: TItem): string {
  return item.id;
}
```

これは「TItem は Identifiable を継承した class でなければならない」という意味ではない。  
構造的に `id: string` を持っていればよい、という制約である。

Unit 03 の structural typing と合わせて読むと、TypeScript らしい `extends` の意味が理解しやすくなる。

### 7-4. 型引数名は意味が伝わる名前にすると読みやすい

`T` だけでも generic type parameter としては有効である。  
ただし、実務コードでは `TData`、`TError`、`TItem`、`TEntity` のように、役割を含めた名前の方が読みやすいことが多い。

```ts
type Result<TData, TError = string> = Success<TData> | Failure<TError>;
```

この型では、`TData` が成功時のデータ、`TError` が失敗時のエラーであることが名前から分かる。  
複数の型引数が出てくる場合は、`T`、`U`、`V` だけで並べるより、役割が分かる名前を使う方が読みやすい。

### 7-5. 型アサーションが必要になる箇所は境界として意識する

`keyof-generics-basics.ts` の `pickObject` では、`Object.fromEntries` の戻り値を `Pick<TObject, TKey>` として扱っている。

```ts
return Object.fromEntries(entries) as Pick<TObject, TKey>;
```

これは、JavaScript の実行時関数で作ったオブジェクトの形を、TypeScript が完全には追いきれないためである。  
型アサーションは便利だが、使う箇所は「TypeScript が分からないことを人間が補っている境界」として意識する必要がある。

Unit 06 では型アサーションの詳細には踏み込みすぎないが、実務コードではこのような境界に注意する。

## 8. 実務でよく使う場面

### 8-1. API response の外側の形を共通化する

`api-response-generics.ts` では、`ApiResponse<TData>` と `ApiListResponse<TItem>` を定義している。

```ts
type ApiResponse<TData> = {
  readonly status: 200;
  readonly data: TData;
};

type ApiListResponse<TItem> = ApiResponse<{
  readonly items: readonly TItem[];
  readonly totalCount: number;
}>;
```

API response は、外側の形が共通で、中身の `data` だけがエンドポイントごとに変わることが多い。  
そのようなとき、`ApiResponse<UserDto>`、`ApiResponse<BookDto>` のように generics で表せる。

### 8-2. Result 型で成功と失敗の中身を変えられる

`result-type-generics.ts` では、成功と失敗を表す Result 型を定義している。

```ts
type Result<TData, TError = string> = Success<TData> | Failure<TError>;
```

成功時の `data` と、失敗時の `error` は処理によって異なる。  
たとえば、保存処理では保存されたデータを返し、バリデーション処理ではフィールドごとのエラーを返すことがある。

```ts
const validationResult = failure<ValidationError>({
  field: 'title',
  message: 'タイトルを入力してください',
});
```

このように、Result 型を generic にしておくと、処理ごとの成功 / 失敗の中身を保てる。

### 8-3. repository 風関数で entity の型を保つ

`repository-generics.ts` では、`Repository<TEntity>` を定義している。

```ts
interface Repository<TEntity extends Entity> {
  findAll(): readonly TEntity[];
  findById(id: string): TEntity | undefined;
  save(entity: TEntity): TEntity;
}
```

Book repository なら `Book` を返し、User repository なら `User` を返す。  
同じ repository の形を使い回しながら、扱う entity の型は具体的に保てる。

```ts
const bookRepository = createMemoryRepository<Book>([
  {
    id: 'book-001',
    title: 'TypeScript Foundations',
  },
]);
```

このような形は、実際の DB アクセスや API client でも見ることがある。

### 8-4. 配列処理の汎用関数で要素型を保つ

`array-processing-generics.ts` では、`uniqueBy` と `groupBy` を定義している。

```ts
function uniqueBy<TItem, TKey extends string | number>(
  items: readonly TItem[],
  getKey: (item: TItem) => TKey,
): readonly TItem[] {
  // ...
}
```

`uniqueBy` は、入力された配列の要素型 `TItem` を保ったまま、重複を取り除いた配列を返す。  
`Task[]` を渡せば、戻り値も `Task[]` として扱える。

このような配列処理の helper は、一覧表示、検索結果、フォーム項目、選択肢の整形などでよく出てくる。

## 9. React につながるポイント

### 9-1. custom hook は generics と相性がよい

`react-custom-hook-concepts.ts` では、React の custom hook に近い戻り値型として `UseResourceResult<TData, TError>` を定義している。

```ts
type UseResourceResult<TData, TError = string> = {
  readonly state: AsyncState<TData, TError>;
  readonly reload: () => AsyncState<TData, TError>;
};
```

`useUser` のような hook では `TData` が `User` になり、`useBooks` のような hook では `TData` が `Book[]` になる。  
外側の状態管理の形は共通で、中身のデータ型だけが変わるため、generics と相性がよい。

### 9-2. Unit 05 の discriminated union と generics を組み合わせられる

同じファイルでは、`AsyncState<TData, TError>` を定義している。

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

これは Unit 05 の discriminated union と、Unit 06 の generics を組み合わせた形である。  
`status: 'success'` のときだけ `data: TData` が存在し、`status: 'error'` のときだけ `error: TError` が存在する。

React の API 取得状態やフォーム送信状態では、このような型設計がよく使われる。

### 9-3. mapper / selector は表示用データ作成につながる

`mapper-selector-generics.ts` では、`mapItems` と `selectValues` を扱っている。

```ts
function mapItems<TInput, TOutput>(
  items: readonly TInput[],
  mapper: Mapper<TInput, TOutput>,
): readonly TOutput[] {
  return items.map((item) => mapper(item));
}
```

React では、API から取得したデータをそのまま表示するのではなく、表示用の props や view model に変換することが多い。  
`Book` を `BookCard` に変換するような mapper は、React の list rendering にそのままつながる。

### 9-4. repository や API client の戻り値型が custom hook に渡っていく

実務では、repository や API client で取得したデータを custom hook が受け取り、画面コンポーネントへ渡す流れが多い。  
Unit 06 の `Repository<TEntity>`、`ApiResponse<TData>`、`AsyncState<TData>` は、それぞれ別々の話ではなく、次のようにつながる。

```ts
type ApiResponse<TData> = {
  readonly status: 200;
  readonly data: TData;
};

type AsyncState<TData, TError = string> =
  | {
      readonly status: 'success';
      readonly data: TData;
    }
  | {
      readonly status: 'error';
      readonly error: TError;
    };
```

API の戻り値、状態管理、props へ渡す表示用データの間で、`TData` を保つ感覚が重要になる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- generic function の基本形を説明できる
- 型引数が呼び出し側の値から推論される流れを説明できる
- 明示的な型引数を書く場面を説明できる
- generic type alias を使って、外側の形と中身の型を分けて表せる
- generic interface の基本を説明できる
- generic class の概要を説明できる
- `T extends SomeType` が型引数の制約であることを説明できる
- `extends` が Java の class 継承と同じ意味だけではないことを説明できる
- default type parameter を説明できる
- `keyof` と generics を組み合わせる入口を説明できる
- 配列処理で要素型を保つ generics の使い方を説明できる
- mapper / selector 関数の型を generics で表せる
- API response 型で generics を使う理由を説明できる
- Result 型で成功 / 失敗の中身を変えられることを説明できる
- repository 風関数で entity の型を保つ考え方を説明できる
- React の custom hook 型に generics がつながることを説明できる
