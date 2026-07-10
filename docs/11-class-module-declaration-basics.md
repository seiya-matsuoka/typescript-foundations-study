# 11. class・implements・module・型定義ファイルの基本

## 1. 学習対象

この単位では、TypeScript の class、implements、module、型定義ファイルの基本を学ぶ。  
Java 経験者にとって class や interface は馴染みがあるが、TypeScript では Java と同じ感覚だけで読むと混同しやすい点がある。

TypeScript / React の実務コードでは、class だけを中心に設計するとは限らない。  
関数、object type、interface、type alias、module を組み合わせたコードも多いため、この単位では class の細かな機能を広げすぎず、既存コードを読み、必要な場面で使える標準レベルに絞る。

Unit 03 では interface と structural typing、Unit 06 では generics、Unit 10 では custom error class を扱った。  
Unit 11 では、それらを class / module / 型定義ファイルの観点から整理し直す。

## 2. この単位で扱う主な内容

この単位で扱う主な内容は次の通り。

### class / interface

- class の型
- constructor
- `public`
- `private`
- `protected`
- `readonly`
- parameter properties
- `implements`
- abstract class
- class と interface
- static member
- class generic
- private field `#`
- JavaScript の private と TypeScript の private の違い
- Java の class / interface との違い
- structural typing と class

### module

- `import`
- `export`
- named export
- default export
- `import type`
- `export type`
- type-only import
- value import と type import の違い
- barrel file の概要
- module resolution の概要
- path alias の概要

### 型定義ファイル

- `.d.ts`
- ambient declaration の概要
- `declare`
- `@types/*`
- Node.js / ブラウザ / React の型定義がどこから来るか

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  11-class-module-declaration-basics/
    index.ts
    class-basics-access.ts
    implements-structural-typing.ts
    abstract-static-generic.ts
    private-field-comparison.ts
    module-import-export.ts
    module-resolution-barrel-overview.ts
    declaration-files-basics.ts
    type-definition-sources.ts
    examples/
      module-content.ts
      default-formatter.ts
      sample-library.d.ts
      ambient-globals.d.ts
      barrel/
        index.ts
        project-values.ts

docs/
  11-class-module-declaration-basics.md
```

各ファイルの役割は次の通り。

- `index.ts`
  - Unit 11 のサンプルを順番に実行する入口。
- `class-basics-access.ts`
  - class の型、constructor、public / private / protected / readonly、parameter properties をまとめて確認する。
- `implements-structural-typing.ts`
  - implements、interface、class と structural typing、Java の interface との違いを確認する。
- `abstract-static-generic.ts`
  - abstract class、override、static member、class generic を確認する。
- `private-field-comparison.ts`
  - TypeScript の private と JavaScript の `#private` field の違いを確認する。
- `module-import-export.ts`
  - import / export、named export、default export、import type / export type を確認する。
- `module-resolution-barrel-overview.ts`
  - barrel file、module resolution、path alias の概要を確認する。
- `declaration-files-basics.ts`
  - `.d.ts`、declare、ambient declaration の基本を確認する。
- `type-definition-sources.ts`
  - `@types/*`、Node.js、ブラウザ、React の型定義がどこから来るかを確認する。
- `examples/`
  - module 間の import / export と型定義ファイルを確認するための補助ファイル。

## 4. 実行方法

サンプルコードは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:11
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

この単位では、`npm run unit:11` で class instance、module の import / export、型定義を利用した値を確認する。  
`.d.ts` に宣言した外部関数や global 値は実装を持たないため、実行時には直接呼び出さず、型としてだけ利用する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/11-class-module-declaration-basics/index.ts`
2. `src/11-class-module-declaration-basics/class-basics-access.ts`
3. `src/11-class-module-declaration-basics/implements-structural-typing.ts`
4. `src/11-class-module-declaration-basics/abstract-static-generic.ts`
5. `src/11-class-module-declaration-basics/private-field-comparison.ts`
6. `src/11-class-module-declaration-basics/module-import-export.ts`
7. `src/11-class-module-declaration-basics/module-resolution-barrel-overview.ts`
8. `src/11-class-module-declaration-basics/declaration-files-basics.ts`
9. `src/11-class-module-declaration-basics/type-definition-sources.ts`

最初に class の基本と interface との関係を確認する。  
その後、abstract class / static / generic、private field、module、type-only import、barrel file、最後に `.d.ts` と型定義の出どころを読む。

## 6. 注目ポイント

### 6-1. class 名は値でもあり instance の型でもある

`class-basics-access.ts` では、`Account` class を定義している。

```ts
class Account {
  constructor(
    public readonly id: string,
    public displayName: string,
    private passwordHash: string,
    protected loginCount = 0,
  ) {}
}
```

`Account` は、`new Account(...)` に使う constructor という値である。  
同時に、`account: Account` のように instance の型としても使える。

constructor 引数へ access modifier を付けた部分は parameter properties である。  
member 宣言と constructor 内の代入をまとめて書ける。

### 6-2. implements は interface の構造を確認する

`implements-structural-typing.ts` では、`TaskFormatter` が `Formatter<Task>` を implements している。

```ts
class TaskFormatter implements Formatter<Task> {
  format(task: Task): string {
    return `${task.completed ? 'done' : 'todo'}:${task.title}`;
  }
}
```

implements は、class が interface の形を満たしているかを TypeScript に確認させる。  
interface の実装コードが class へ追加されるわけではない。

同じファイルでは、明示的に implements していない `TextFormatter` も `Formatter<string>` として渡している。

```ts
class TextFormatter {
  format(value: string): string {
    return value.trim().toUpperCase();
  }
}
```

TypeScript は structural typing が基本であるため、必要な構造を持っていれば同じ型として扱える。

### 6-3. abstract class は共通実装を持てる

`abstract-static-generic.ts` では、`NotificationSender` を定義している。

```ts
abstract class NotificationSender {
  abstract send(message: string): string;

  describe(): string {
    return `sender:${this.serviceName}`;
  }
}
```

interface は主に構造を表すが、abstract class は共通の field や method 実装を持てる。  
一部の method だけを subclass に任せたい場合に使える。

ただし、TypeScript / React の日常的なコードでは、interface や関数で十分な場面も多い。  
継承階層を作ること自体を目的にせず、共通実装が本当に必要かを考える。

### 6-4. type import と value import は実行時の有無が違う

`module-import-export.ts` では、型と値の import を分けている。

```ts
import type { UserDto, UserViewModel } from './examples/module-content.ts';
import { toUserViewModel } from './examples/module-content.ts';
```

`UserDto` / `UserViewModel` は型としてだけ使うため、`import type` を使う。  
型は JavaScript の実行時には存在しない。

`toUserViewModel` は実行時に呼び出す関数なので、通常の value import が必要になる。  
`verbatimModuleSyntax` が有効な環境では、この違いを明示することが特に重要となる。

### 6-5. `.d.ts` は実装ではなく型の説明である

`declaration-files-basics.ts` では、`sample-library.d.ts` で宣言された型を参照している。

```ts
declare namespace StudyLibrary {
  type User = {
    readonly id: string;
    readonly name: string;
  };
}
```

`.d.ts` は、JavaScript の実装や外部 library に対する型情報を TypeScript へ伝えるファイルである。  
`declare function` が書かれていても、その関数の実装が自動的に作られるわけではない。

## 7. 引っかかりやすい点

### 7-1. TypeScript の interface は Java の interface と同じ感覚ではない

Java では、class が interface を実装する関係を明示的に宣言する。  
TypeScript では、明示的な implements がなくても、構造が一致すれば interface 型として扱える。

```ts
function formatWith<TValue>(formatter: Formatter<TValue>, value: TValue): string {
  return formatter.format(value);
}
```

class instance だけでなく、同じ構造の object literal も渡せる。  
型名や継承関係より、必要な property / method の構造を見ることが重要となる。

### 7-2. readonly は object 全体を実行時に凍結しない

```ts
public readonly id: string
```

readonly は、TypeScript の型チェック上で property の再代入を防ぐ。  
JavaScript の `Object.freeze` のように、実行時に object 全体を凍結する機能ではない。

### 7-3. TypeScript private と JavaScript `#private` は仕組みが違う

```ts
class TypeScriptPrivateCounter {
  private count = 0;
}

class JavaScriptPrivateCounter {
  #count = 0;
}
```

TypeScript の private は、TypeScript の型チェックによるアクセス制御である。  
JavaScript の `#private` field は、実行時の JavaScript 仕様として外側からアクセスできない。

見た目の目的は似ていても、実行時に残る仕組みが違う。

### 7-4. static member は instance の member ではない

```ts
NotificationSender.createdCount;
```

static member は class 自体に属し、instance から呼び出すものではない。  
また、generic class の static member は class instance の型引数を直接使えないため、必要なら static method 側に型引数を定義する。

### 7-5. path alias は TypeScript の設定だけで完結しない場合がある

path alias は長い相対 import を短く書くために使える。  
ただし、TypeScript が型チェック時に alias を解決できても、Node.js や bundler が同じ alias を理解できるとは限らない。

実際に導入するときは、tsconfig だけでなく、実行環境や build tool の設定も確認する。

### 7-6. `declare` は値を作らない

```ts
declare const __APP_VERSION__: string;
```

この宣言は、`__APP_VERSION__` という値を実行時に作るものではない。  
外部で値が提供される前提を TypeScript へ伝えるだけである。

実装が存在しない値や関数を実行時に呼び出すとエラーになるため、型情報と実装を混同しない。

## 8. 実務でよく使う場面

### 8-1. class で状態と操作をまとめる

`class-basics-access.ts` では、account の状態と操作を同じ class にまとめている。

```ts
account.rename('Sato Taro');
account.changePasswordHash('hash-002');
```

repository、service、domain object、custom error などでは class を見ることがある。  
一方、単純なデータだけなら object type や type alias の方が軽く扱えるため、用途に応じて選ぶ。

### 8-2. `import type` で型だけの依存を明確にする

```ts
import type { UserDto } from './examples/module-content.ts';
```

API DTO、props、view model などの型だけを共有するとき、`import type` を使う。  
実行時に必要な import と型だけの import を分けることで、依存関係を読みやすくできる。

### 8-3. barrel file で公開口をまとめる

```ts
export { createProjectLabel, projectStatusLabels } from './project-values.ts';
export type { ProjectSummary } from './project-values.ts';
```

barrel file は、関連する value / type の公開口を `index.ts` にまとめる。  
component、feature、utility などのまとまりで使えるが、依存関係が追いづらくならない範囲で使う。

### 8-4. 外部 library の型を `.d.ts` や `@types/*` から受け取る

JavaScript library が型を同梱していない場合、`@types/*` package や自作の `.d.ts` から型情報を補うことがある。  
型エラーを調べる際は、実装 package だけでなく、型定義 package や tsconfig の `types` / `lib` も確認する。

## 9. React につながるポイント

### 9-1. React では class だけでなく関数と型を多く使う

TypeScript の class を学ぶことは、既存の service、error、model などを読むために役立つ。  
一方、React component や hooks 周辺では、関数、type alias、interface、discriminated union を組み合わせる場面も多い。

class を使えることと、すべてを class にすることは別である。

### 9-2. props や view model の型で `import type` を使う

```ts
import type { UserViewModel } from './examples/module-content.ts';
```

component が受け取る props 型や、API から変換した view model 型を別 module から読み込むときに、type-only import を使える。

### 9-3. barrel file は component / feature の公開口にも使える

component や feature の `index.ts` から、外部へ公開する component と props 型だけを re-export する構成がある。  
ただし、すべての内部ファイルを無条件に公開するのではなく、公開範囲を整理する意識が必要となる。

### 9-4. React とブラウザの型は外部の型定義から提供される

DOM event や `HTMLElement` などのブラウザ型は TypeScript の DOM lib から提供される。  
React 固有の props、event、component に関する型は、一般的な構成では React 用の型定義 package から提供される。

型名が見つからない場合は、import の有無だけでなく、必要な型定義 package や tsconfig の設定も確認する。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- class 名が値でもあり instance の型でもあることを説明できる
- constructor と parameter properties の基本を説明できる
- public / private / protected / readonly の違いを説明できる
- implements が interface の構造確認であることを説明できる
- TypeScript の interface が Java の interface と同じ感覚ではないことを説明できる
- structural typing と class の関係を説明できる
- abstract class と interface の違いを説明できる
- static member と class generic の基本を説明できる
- TypeScript private と JavaScript `#private` の違いを説明できる
- named export と default export の違いを説明できる
- import type / export type を説明できる
- value import と type import の違いを説明できる
- barrel file の概要を説明できる
- module resolution と path alias の概要を説明できる
- `.d.ts` が実装ではなく型の説明であることを説明できる
- ambient declaration と declare の概要を説明できる
- `@types/*`、Node.js、ブラウザ、React の型定義がどこから来るかを説明できる
