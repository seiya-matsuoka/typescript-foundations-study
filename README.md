# TypeScript Foundations Study

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=ffffff">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Study-3178C6?logo=typescript&logoColor=ffffff">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=ffffff">
  <img alt="npm" src="https://img.shields.io/badge/npm-Scripts-CB3837?logo=npm&logoColor=ffffff">
</p>

TypeScript の基礎を、コードリーディング中心で体系的に学習するためのリポジトリ。  
基本型だけでなく、**オブジェクト型 / 関数型 / union 型 / narrowing / generics / 派生型 / utility types / 型付きデータ変換 / API レスポンス / Result 型 / class / module / 型定義ファイル** を扱う。  
各 Unit ごとにソースコードとドキュメントを用意し、コード、コメント、出力、確認用の `assert`、型チェック、ドキュメントを対応づけながら見返せる形で整理している。

---

## このリポジトリの位置づけ

このリポジトリは、JavaScript の基礎、実務寄りの書き方を一通り確認した後、TypeScript の型の読み書きを体系的に学習するための `typescript-foundations-study` である。

TypeScript は JavaScript を土台とし、値、オブジェクト、配列、関数、非同期処理などに型情報を加える。  
そのため、このリポジトリでは JavaScript の構文を最初から学び直すのではなく、JavaScript のコードへどのように型を付け、型推論、narrowing、generics、派生型などを使って安全に扱うかを中心に確認する。

高度な型パズルを広く扱うのではなく、実務コードを読むために必要となる基礎から頻出の型を、多めのサンプルコードで段階的に学習する。  
また、React の props、state、event handler、reducer、API 取得状態などにつながる型の考え方も各 Unit で確認する。

---

## 学習目的

このリポジトリでは、主に次の内容を目的として学習を行う。

- TypeScript の位置づけ、型チェック、プロジェクト設定の基本を理解する
- 型注釈と型推論の違いを理解し、書く場面と推論に任せる場面を判断できるようにする
- 基本型、literal 型、`null` / `undefined`、optional / nullable な値を安全に扱えるようにする
- オブジェクト型、`type`、`interface`、構造的型付けを理解する
- 関数、callback、高階関数の型を読めるようにする
- union 型、narrowing、type guard、discriminated union を理解する
- generics の型引数がどこから決まるかを追えるようにする
- `keyof` / `typeof` / indexed access、mapped types、conditional types の入口を理解する
- utility types、`as const`、`satisfies`、型アサーションを実務的に使えるようにする
- 配列・オブジェクト操作と型付きデータ変換を読めるようにする
- Promise、API レスポンス、JSON、`unknown`、エラー処理、Result 型を安全に扱う考え方を理解する
- class、implements、module、type-only import、型定義ファイルの基本を理解する
- ソースコード、コメント、出力、`assert`、型チェック、ドキュメントを対応させながら処理を追えるようにする

---

## 学習範囲

このリポジトリで扱う Unit は次の通り。

| Unit | 内容                                                         |
| ---- | ------------------------------------------------------------ |
| 01   | TypeScript の位置づけ・型チェック・プロジェクト設定の基本    |
| 02   | 基本型・型注釈・型推論・`null` / `undefined`                 |
| 03   | オブジェクト型・`type` / `interface`・構造的型付け           |
| 04   | 関数の型・callback・高階関数                                 |
| 05   | union 型・narrowing・type guard・discriminated union         |
| 06   | generics の基本と実務的な使い方                              |
| 07   | `keyof` / `typeof` / indexed access・派生型の入口            |
| 08   | utility types・`as const`・`satisfies`・型アサーション・enum |
| 09   | 配列・オブジェクト操作と型付きデータ変換                     |
| 10   | 非同期処理・API レスポンス・JSON・エラー処理・Result 型      |
| 11   | class・implements・module・型定義ファイルの基本              |

### 各 Unit の位置づけ

- **Unit 01: TypeScript の位置づけ・型チェック・プロジェクト設定の基本**  
  TypeScript と JavaScript の関係、型チェックと実行の違い、`tsconfig.json`、strict mode、ES Modules、tsx、npm scripts、意図した型エラーの確認方法を扱う。

- **Unit 02: 基本型・型注釈・型推論・`null` / `undefined`**  
  primitive 型、配列、tuple、literal 型、型注釈、型推論、`any` / `unknown`、`null` / `undefined`、optional parameter、nullish coalescing など、後続 Unit の土台となる基本を扱う。

- **Unit 03: オブジェクト型・`type` / `interface`・構造的型付け**  
  object type、type alias、interface、optional / readonly property、nested object、index signature、`Record`、excess property checks、structural typing、DTO / domain model / view model / form values を扱う。

- **Unit 04: 関数の型・callback・高階関数**  
  関数引数と戻り値の型、optional / default / rest parameter、function type expression、関数型の type alias、callback、高階関数、mapper / predicate / validator / formatter、`void` / `never`、overload の概要を扱う。

- **Unit 05: union 型・narrowing・type guard・discriminated union**  
  union / literal / nullable union、`typeof` / `in` / `instanceof` / equality / truthiness による narrowing、custom type guard、unknown の絞り込み、discriminated union、exhaustive check、reducer の action 型を扱う。

- **Unit 06: generics の基本と実務的な使い方**  
  generic function / type alias / interface / class、型引数の推論と明示、constraints、default type parameter、`keyof` との組み合わせ、配列処理、API response、Result 型、repository 風関数を扱う。

- **Unit 07: `keyof` / `typeof` / indexed access・派生型の入口**  
  `keyof`、型コンテキストの `typeof`、indexed access types、`T[K]`、`keyof typeof`、配列・オブジェクトからの union 型抽出、mapped types、conditional types、`infer`、template literal types の入口を扱う。

- **Unit 08: utility types・`as const`・`satisfies`・型アサーション・enum**  
  `Partial` / `Required` / `Readonly` / `Pick` / `Omit` / `Record` などの utility types、const assertion、`satisfies`、型アサーション、non-null assertion、enum と union literal の使い分けを扱う。

- **Unit 09: 配列・オブジェクト操作と型付きデータ変換**  
  型付き配列、readonly array、tuple、`map` / `filter` / `reduce` / `find` / `flatMap` / `sort`、`Object.keys` / `values` / `entries` / `fromEntries`、辞書変換、group by、集計、DTO から表示用データへの変換を扱う。

- **Unit 10: 非同期処理・API レスポンス・JSON・エラー処理・Result 型**  
  `Promise<T>`、async function、`Awaited<T>`、`Promise.all` / `allSettled`、fetch 風 response handling、JSON / unknown、type guard、assertion function、API response、custom error、Result 型、API 取得状態を扱う。

- **Unit 11: class・implements・module・型定義ファイルの基本**  
  class、constructor、access modifier、parameter properties、implements、abstract class、class generic、private field、structural typing、import / export、type-only import、barrel file、module resolution、`.d.ts`、ambient declaration、`@types/*` を扱う。

---

## 学習の進め方

基本的な進め方は次の通り。

1. `docs/` の対象 Unit の Markdown を読む
2. `npm run unit:XX` で対象 Unit を実行する
3. `src/<unit>/index.ts` から呼び出される各テーマ別ファイルを読む
4. ソースコード内のコメントと出力結果を対応させながら処理を追う
5. 各ファイル末尾の `assert` で、期待値との対応を確認する
6. `npm run typecheck` で、型推論や型エラーを確認する
7. 必要に応じて値や型を書き換え、実行結果と型チェック結果の変化を確認する

このリポジトリでは、ソースコード単体でも学習できるようにコメントを多めに記載している。  
ドキュメントは、各 Unit の学習対象、読む順番、注目ポイント、引っかかりやすい点、実務でよく使う場面、React につながるポイントを確認するための補助資料として使う。

ソースコード内の `@ts-expect-error` は、意図した型エラーが発生することを確認するために使用している。  
実行時にエラーとなるサンプルは、Unit の通常実行では呼び出さない補助関数へ分けている。

---

## 前提環境

- Node.js 24 系
- npm
- TypeScript
- tsx
- VS Code
- ESLint
- Prettier

このリポジトリでは、Node.js 24 系を前提にする。  
ソースコードは ES Modules として構成し、tsx を使って TypeScript ファイルを直接実行する。

型チェックには `tsc --noEmit` を使用する。  
テストフレームワークは使わず、Node.js 標準の `node:assert/strict` を使って期待値を確認する。  
コード品質の確認には ESLint Flat Config と Prettier を使用する。

---

## セットアップ

### 1. Node.js のバージョンを確認

```bash
node -v
```

想定するメジャーバージョンは次の通り。

```text
v24.x.x
```

### 2. npm のバージョンを確認

```bash
npm -v
```

### 3. `.nvmrc` を使って Node.js を切り替える

nvm を使っている場合は、リポジトリ直下で次を実行する。

```bash
nvm use
```

### 4. 依存関係をインストール

```bash
npm ci
```

---

## 実行方法

### Unit 01: TypeScript の位置づけ・型チェック・プロジェクト設定の基本

```bash
npm run unit:01
```

### Unit 02: 基本型・型注釈・型推論・`null` / `undefined`

```bash
npm run unit:02
```

### Unit 03: オブジェクト型・`type` / `interface`・構造的型付け

```bash
npm run unit:03
```

### Unit 04: 関数の型・callback・高階関数

```bash
npm run unit:04
```

### Unit 05: union 型・narrowing・type guard・discriminated union

```bash
npm run unit:05
```

### Unit 06: generics の基本と実務的な使い方

```bash
npm run unit:06
```

### Unit 07: `keyof` / `typeof` / indexed access・派生型の入口

```bash
npm run unit:07
```

### Unit 08: utility types・`as const`・`satisfies`・型アサーション・enum

```bash
npm run unit:08
```

### Unit 09: 配列・オブジェクト操作と型付きデータ変換

```bash
npm run unit:09
```

### Unit 10: 非同期処理・API レスポンス・JSON・エラー処理・Result 型

```bash
npm run unit:10
```

### Unit 11: class・implements・module・型定義ファイルの基本

```bash
npm run unit:11
```

---

## Type Check / Lint / Format

TypeScript の型チェックを行う場合は次を実行する。

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

---

## リポジトリ構成

主要な構成は次の通り。

```text
.
├─ docs/
│  ├─ 01-typescript-typecheck-project-basics.md
│  ├─ 02-basic-types-inference-nullish.md
│  ├─ 03-object-types-type-interface.md
│  ├─ 04-function-types-callbacks.md
│  ├─ 05-union-narrowing-type-guard.md
│  ├─ 06-generics-practical-basics.md
│  ├─ 07-type-operators-derived-types.md
│  ├─ 08-utility-const-satisfies-assertion.md
│  ├─ 09-typed-data-transform.md
│  ├─ 10-async-api-json-result.md
│  └─ 11-class-module-declaration-basics.md
│
├─ src/
│  ├─ 01-typescript-typecheck-project-basics/
│  ├─ 02-basic-types-inference-nullish/
│  ├─ 03-object-types-type-interface/
│  ├─ 04-function-types-callbacks/
│  ├─ 05-union-narrowing-type-guard/
│  ├─ 06-generics-practical-basics/
│  ├─ 07-type-operators-derived-types/
│  ├─ 08-utility-const-satisfies-assertion/
│  ├─ 09-typed-data-transform/
│  ├─ 10-async-api-json-result/
│  └─ 11-class-module-declaration-basics/
│
├─ .vscode/
├─ .nvmrc
├─ eslint.config.js
├─ package.json
├─ package-lock.json
├─ tsconfig.json
└─ README.md
```

### 各ディレクトリ・ファイルの役割

- `docs/`
  - 各 Unit の学習対象、ファイル構成、実行方法、読む順番、注目ポイント、引っかかりやすい点、実務でよく使う場面、React につながるポイントをまとめた Markdown ドキュメントを置く
- `src/`
  - Unit ごとの TypeScript ソースコードを置く
- `src/<unit>/index.ts`
  - 各 Unit の実行入口
- `src/<unit>/*.ts`
  - Unit 内のテーマ別サンプルを置く
- `.vscode/`
  - VS Code の推奨拡張機能、保存時整形、TypeScript の編集設定などを置く
- `.nvmrc`
  - このリポジトリで使用する Node.js のメジャーバージョンを示す
- `eslint.config.js`
  - TypeScript 向けの ESLint Flat Config を定義する
- `package.json`
  - npm scripts、ES Modules 設定、開発用依存関係を定義する
- `package-lock.json`
  - npm の lock ファイル
- `tsconfig.json`
  - TypeScript の型チェック、module、strict mode などのコンパイラ設定を定義する

---

## ドキュメント

各 Unit の詳細は次の Markdown にまとめている。

- TypeScript の位置づけ・型チェック・プロジェクト設定の基本: [`docs/01-typescript-typecheck-project-basics.md`](docs/01-typescript-typecheck-project-basics.md)
- 基本型・型注釈・型推論・`null` / `undefined`: [`docs/02-basic-types-inference-nullish.md`](docs/02-basic-types-inference-nullish.md)
- オブジェクト型・`type` / `interface`・構造的型付け: [`docs/03-object-types-type-interface.md`](docs/03-object-types-type-interface.md)
- 関数の型・callback・高階関数: [`docs/04-function-types-callbacks.md`](docs/04-function-types-callbacks.md)
- union 型・narrowing・type guard・discriminated union: [`docs/05-union-narrowing-type-guard.md`](docs/05-union-narrowing-type-guard.md)
- generics の基本と実務的な使い方: [`docs/06-generics-practical-basics.md`](docs/06-generics-practical-basics.md)
- `keyof` / `typeof` / indexed access・派生型の入口: [`docs/07-type-operators-derived-types.md`](docs/07-type-operators-derived-types.md)
- utility types・`as const`・`satisfies`・型アサーション・enum: [`docs/08-utility-const-satisfies-assertion.md`](docs/08-utility-const-satisfies-assertion.md)
- 配列・オブジェクト操作と型付きデータ変換: [`docs/09-typed-data-transform.md`](docs/09-typed-data-transform.md)
- 非同期処理・API レスポンス・JSON・エラー処理・Result 型: [`docs/10-async-api-json-result.md`](docs/10-async-api-json-result.md)
- class・implements・module・型定義ファイルの基本: [`docs/11-class-module-declaration-basics.md`](docs/11-class-module-declaration-basics.md)

---

## このリポジトリで確認できること

このリポジトリでは、次の内容をコードとドキュメントで確認できる。

- TypeScript と JavaScript の関係、型チェックと実行の違い
- `tsconfig.json`、strict mode、ES Modules、tsx の基本
- 基本型、literal 型、型注釈、型推論
- `any` と `unknown` の違い
- `null` / `undefined`、optional / nullable な値の扱い
- object type、type alias、interface
- optional / readonly property、nested object、index signature
- structural typing、excess property checks
- DTO、domain model、view model、form values の型
- 関数引数と戻り値、callback、高階関数の型
- mapper / predicate / validator / formatter の型
- union 型、narrowing、custom type guard
- discriminated union、exhaustive check、`never`
- generics、型引数の推論、constraints、default type parameter
- `keyof` / `typeof` / indexed access types
- mapped types、conditional types、template literal types の入口
- utility types、`as const`、`satisfies`
- 型アサーション、non-null assertion の注意点
- enum と union literal の使い分け
- 型付き配列、readonly array、tuple
- `map` / `filter` / `reduce` / `find` と型推論
- `Object.keys` / `values` / `entries` / `fromEntries` の型
- 配列・辞書・API DTO・表示用データの変換
- `Promise<T>`、async function、`Awaited<T>`
- JSON / unknown、type guard、assertion function
- API response、nullable / optional な API データ
- custom error、Result 型、API 取得状態
- class、constructor、access modifier、implements、abstract class
- import / export、type-only import、barrel file
- `.d.ts`、ambient declaration、`@types/*`
- ソースコード、コメント、出力、`assert`、型チェック、ドキュメントを対応させながら挙動を確認できる

---

## React への接続

このリポジトリで扱う TypeScript の内容は、React の学習にもつながる。

- object type、type alias、interface は props や state の型定義につながる
- optional / readonly property は optional props や受け取った値を直接変更しない設計につながる
- 関数型と callback は event handler や callback props につながる
- union 型と discriminated union は画面状態や reducer の action 型につながる
- generics は custom hook、共通コンポーネント、API response の型につながる
- `keyof`、indexed access、utility types は既存の props やフォーム型から必要な型を派生させる場面につながる
- `as const` と `satisfies` は route、menu、status、options などの設定オブジェクトにつながる
- readonly array と非破壊的なデータ変換は React state の更新方法につながる
- API response、Result 型、`AsyncState<TData>` は data fetching の状態管理につながる
- module と type-only import は React コンポーネントや型定義を分割する実務コードにつながる

このリポジトリでは React コンポーネント自体は実装せず、React 学習で必要になる TypeScript の型の基礎を扱っている。
