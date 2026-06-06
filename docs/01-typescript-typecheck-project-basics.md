# 01. TypeScript の位置づけ・型チェック・プロジェクト設定の基本

## 1. 学習対象

この単位では、TypeScript が何をしているのか、JavaScript と何が違うのか、どのように型チェックするのかを整理する。  
また、このリポジトリで使用する `tsc --noEmit`、`tsconfig.json`、`npm scripts`、ESLint、Prettier、VS Code 上での型エラー確認の位置づけも確認する。

この単位は、以降の Unit で TypeScript の型注釈、型推論、オブジェクト型、関数型、union 型、generics などを読んでいくための前提を作る位置づけとなる。  
特定の型機能を深く扱うというより、TypeScript の型チェックと JavaScript としての実行を分けて理解する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- TypeScript と JavaScript の関係
- TypeScript は最終的に JavaScript として実行されること
- 型情報は基本的に実行時には消えること
- コンパイル時の型チェックと実行時の値の違い
- `tsc` の役割
- `tsc --noEmit`
- `tsconfig.json`
- `strict`
- `target`
- `module`
- `moduleResolution`
- `lib`
- `include`
- `exclude`
- `noEmit`
- `outDir`
- `rootDir`
- Node.js で TypeScript を実行する基本方針
- `npm scripts`
- ESLint / Prettier の位置づけ
- VS Code 上での型エラー確認
- JavaScript との相互運用の概要
  - `allowJs`
  - `checkJs`
  - `// @ts-check`
  - JSDoc 型注釈の存在

JavaScript との相互運用は概要のみ扱う。  
このリポジトリでは、実装サンプルの中心は TypeScript とする。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  01-typescript-typecheck-project-basics/
    index.ts
    language-and-runtime.ts
    typecheck-and-runtime-values.ts
    tsc-and-tsconfig.ts
    node-npm-tooling.ts
    vscode-and-javascript-interop.ts

docs/
  01-typescript-typecheck-project-basics.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 01 のサンプルを順番に実行する入口。
- `language-and-runtime.ts`
  - TypeScript と JavaScript の関係、型情報が実行時には基本的に残らないことを確認する。
- `typecheck-and-runtime-values.ts`
  - コンパイル時の型チェックと実行時の値の違いを確認する。
- `tsc-and-tsconfig.ts`
  - `tsc --noEmit` と `tsconfig.json` の主要項目を確認する。
- `node-npm-tooling.ts`
  - Node.js 実行、ES Modules、`npm scripts`、ESLint、Prettier の役割を確認する。
- `vscode-and-javascript-interop.ts`
  - VS Code 上での型エラー確認と、JavaScript との相互運用の入口を確認する。
- `01-typescript-typecheck-project-basics.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:01
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

この単位では、`npm run unit:01` で実行時の値を確認し、`npm run typecheck` で型チェックを確認する。  
TypeScript 学習では、この2つを分けて考える。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/01-typescript-typecheck-project-basics/index.ts`
2. `src/01-typescript-typecheck-project-basics/language-and-runtime.ts`
3. `src/01-typescript-typecheck-project-basics/typecheck-and-runtime-values.ts`
4. `src/01-typescript-typecheck-project-basics/tsc-and-tsconfig.ts`
5. `src/01-typescript-typecheck-project-basics/node-npm-tooling.ts`
6. `src/01-typescript-typecheck-project-basics/vscode-and-javascript-interop.ts`

最初に `index.ts` を読み、Unit 01 全体の実行順を確認する。  
その後、TypeScript と JavaScript の関係、型チェックと実行時の違い、`tsc --noEmit` と `tsconfig.json`、Node.js 実行と開発ツール、VS Code と JavaScript 連携の順に読む。

## 6. 注目ポイント

### 6-1. TypeScript は JavaScript として実行される

`language-and-runtime.ts` では、TypeScript で書いたファイルが最終的には JavaScript として実行されることを確認する。

```ts
type SourceFile = {
  readonly fileName: string;
  readonly sourceLanguage: 'TypeScript';
  readonly runtimeLanguage: 'JavaScript';
  readonly executedBy: 'Node.js';
};
```

この型では、開発時に書く言語と実行時に動く言語を分けて表している。  
TypeScript は型を使ってコードを検査するが、実行時の主役は JavaScript の値である。

```ts
console.log('開発時に書く言語:', sourceFile.sourceLanguage);
console.log('実行時に動く言語:', sourceFile.runtimeLanguage);
console.log('実行環境:', sourceFile.executedBy);
```

この出力では、TypeScript と JavaScript の関係を値として確認している。  
実行時に表示されるのは文字列の値であり、型そのものではない。

### 6-2. 型情報は実行時には基本的に残らない

`language-and-runtime.ts` では、`User` 型を使って関数の引数を表している。

```ts
type User = {
  readonly id: string;
  readonly name: string;
  readonly role: 'admin' | 'member';
};

function formatUser(user: User): string {
  return `${user.name} (${user.role})`;
}
```

`User` 型は、`formatUser` に渡す値の形をコンパイル時に確認するために使う。  
しかし、実行時に `typeof user` を確認しても、得られるのは JavaScript の `object` である。

```ts
console.log('typeof user:', typeof user);
console.log('実行時に存在するプロパティ:', Object.keys(user));
```

実行時には、`id`、`name`、`role` というプロパティを持つオブジェクトとして扱われる。  
`User` という型名が実行時にそのまま残るわけではない。

### 6-3. `tsc --noEmit` は型チェックだけを行う

`tsc-and-tsconfig.ts` では、`tsc --noEmit` の役割をデータとして表している。

```ts
const typecheckCommand: TypecheckCommand = {
  command: 'tsc --noEmit',
  purpose: '型チェックだけを行う',
  emitsFiles: false,
};
```

`tsc --noEmit` は、TypeScript の型チェックを行うが、JavaScript ファイルは出力しない。  
このリポジトリでは、実行は `tsx`、型チェックは `tsc --noEmit` という役割分担にする。

## 7. 引っかかりやすい点

### 7-1. TypeScript の型は実行時の検証ではない

TypeScript の型は、基本的にコンパイル時の検査に使われる。  
たとえば、`typecheck-and-runtime-values.ts` では、`AppConfig` 型で `port` を `number` として定義している。

```ts
type AppConfig = {
  readonly appName: string;
  readonly port: number;
  readonly mode: 'development' | 'production';
};
```

この型により、`port` には `number` を渡すべきだと分かる。

```ts
const config: AppConfig = {
  appName: 'typescript-foundations-study',
  port: 3000,
  mode: 'development',
};
```

ただし、TypeScript の型は、外部から来た値を実行時に自動で検証するものではない。

```ts
const externalValue: unknown = {
  appName: 'from-api',
  port: '3000',
};
```

API レスポンスや JSON のように実行時に来る値は、後続の Unit で扱う `unknown`、type guard、validation の考え方が必要になる。

### 7-2. `@ts-expect-error` は型エラーを無視するためではなく、意図を残すために使う

`typecheck-and-runtime-values.ts` では、意図した型エラーを確認するために `@ts-expect-error` を使っている。

```ts
// @ts-expect-error: number の場所に string を代入すると型エラーになることを確認する。
const invalidPort: number = '3000';
```

これは、型エラーを雑に無視するためのものではない。  
「ここでは型エラーが起きることを確認したい」という意図を、学習コードとして残すために使う。

また、この値は実行時には文字列として存在する。

```ts
console.log('@ts-expect-error で残した値:', invalidPort);
console.log('invalidPort の実行時 typeof:', typeof invalidPort);
```

ここから、型チェックで検出される問題と、JavaScript として実行される値は別の観点であることが分かる。

### 7-3. `tsconfig.json` は暗記するものではなく、役割を読めるようにするもの

`tsc-and-tsconfig.ts` では、主要な設定項目をカテゴリごとに整理している。

```ts
const compilerOptions: readonly CompilerOptionSummary[] = [
  {
    name: 'strict',
    category: 'typecheck',
    role: '型チェックを厳しめにする',
  },
  {
    name: 'target',
    category: 'emit',
    role: '出力される JavaScript の構文レベルを決める',
  },
];
```

`tsconfig.json` は設定項目が多いため、最初からすべてを暗記しようとすると重い。  
まずは、`strict` は型チェックの厳しさ、`target` は JavaScript の構文レベル、`module` はモジュール形式の指定というように、何を決める項目なのかを読む。

## 8. 実務でよく使う場面

### 8-1. 実行コマンドと型チェックコマンドを分ける

`node-npm-tooling.ts` では、npm scripts ごとの役割を明確に分けている。

```ts
const scriptRoles: readonly ScriptRole[] = [
  {
    scriptName: 'unit:01',
    command: 'tsx src/01-typescript-typecheck-project-basics/index.ts',
    role: 'Unit 01 の TypeScript ファイルを実行する',
  },
  {
    scriptName: 'typecheck',
    command: 'tsc --noEmit',
    role: 'TypeScript の型チェックを行う',
  },
];
```

実務でも、TypeScript ファイルの実行、型チェック、Lint、Format は別の役割として扱う。  
すべてを1つのコマンドで済ませるのではなく、何を確認しているのかを分けておくと、問題が起きたときに原因を切り分けやすい。

たとえば、次のような npm scripts を用意しておくと、確認対象が明確になる。

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format:check": "prettier --check ."
  }
}
```

### 8-2. `tsconfig.json` の主要項目を読めることは実務でも重要

実務では、既存プロジェクトの `tsconfig.json` を読む場面がある。  
そのとき、各設定を完全に暗記していなくても、主要項目の意味が分かれば、プロジェクトの前提を把握しやすい。

```ts
const noEmitOption = compilerOptions.find((option) => option.name === 'noEmit');
const rootDirOption = compilerOptions.find((option) => option.name === 'rootDir');
const includeOption = compilerOptions.find((option) => option.name === 'include');
```

このサンプルでは、`noEmit`、`rootDir`、`include` を設定項目として扱っている。  
実務では、型チェック対象にどのファイルが含まれるか、出力するのかしないのか、どのディレクトリ構成を前提にしているかを確認するために `tsconfig.json` を読む。

### 8-3. JavaScript との相互運用は既存プロジェクトで出てくる

`vscode-and-javascript-interop.ts` では、JavaScript との相互運用に関係する項目を概要として扱っている。

```ts
const interopTopics: readonly InteropTopic[] = [
  {
    name: 'allowJs',
    summary: 'JavaScript ファイルを TypeScript プロジェクトに含める設定',
    depth: 'overview',
  },
  {
    name: 'checkJs',
    summary: 'JavaScript ファイルにも型チェックを適用する設定',
    depth: 'overview',
  },
];
```

今回の学習では JavaScript から TypeScript への移行は深追いしない。  
ただし、実務では既存 JavaScript を少しずつ TypeScript 化するケースがある。  
そのため、`allowJs`、`checkJs`、`// @ts-check`、JSDoc 型注釈という入口だけは知っておく。

## 9. React につながるポイント

### 9-1. React でも型チェックと実行時の値は分けて考える

React で TypeScript を使う場合も、型はコンパイル時の検査に使われる。  
たとえば、次のような props 型があったとする。

```ts
type UserCardProps = {
  name: string;
  role: 'admin' | 'member';
};
```

この型により、`UserCard` に渡す props の形をコンパイル時に確認できる。  
ただし、外部 API から取得したデータが本当にこの形かどうかを、TypeScript が実行時に自動検証してくれるわけではない。

そのため、React で API データを扱うときも、後続 Unit で扱う `unknown`、type guard、Result 型の考え方が必要になる。

### 9-2. `tsconfig.json` の設定は React の書き方にも影響する

`strict` や `exactOptionalPropertyTypes` のような設定は、React の props 設計にも影響する。

```ts
type ButtonProps = {
  label: string;
  disabled?: boolean;
};
```

`disabled?: boolean` は、プロパティが省略できることを表す。  
この optional property の扱いは、`exactOptionalPropertyTypes` の有無によって感覚が変わる。  
今回の学習では、このような optional property と `undefined` の違いを後続 Unit で厚めに扱う。

### 9-3. npm scripts の分離は React プロジェクトでも使う

React プロジェクトでも、実行、型チェック、Lint、Format は別々のコマンドとして用意されることが多い。

```json
{
  "scripts": {
    "dev": "vite",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format:check": "prettier --check ."
  }
}
```

今回の学習リポジトリでは React や Vite は入れないが、`typecheck`、`lint`、`format:check` を分ける考え方は React 学習にもそのままつながる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- TypeScript は最終的に JavaScript として実行されることを説明できる
- 型情報は実行時には基本的に残らないことを説明できる
- コンパイル時の型チェックと実行時の値を分けて考えられる
- `tsc --noEmit` が何をするコマンドか説明できる
- `tsx` と `tsc --noEmit` の役割の違いを説明できる
- `tsconfig.json` の主要項目が何を決めるものか大まかに説明できる
- `strict`、`target`、`module`、`moduleResolution`、`lib`、`include`、`exclude`、`noEmit`、`outDir`、`rootDir` の役割を大まかに説明できる
- npm scripts を使って、実行・型チェック・Lint・Format を分ける意味を説明できる
- ESLint と Prettier の役割の違いを説明できる
- VS Code 上でも TypeScript の型エラーを確認できることを理解している
- JavaScript との相互運用に `allowJs`、`checkJs`、`// @ts-check`、JSDoc 型注釈が関係することを知っている
- React に進んでも、型チェックと実行時の値を分けて考える必要があることを理解している
