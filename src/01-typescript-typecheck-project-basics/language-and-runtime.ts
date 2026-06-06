import assert from 'node:assert/strict';

type SourceFile = {
  readonly fileName: string;
  readonly sourceLanguage: 'TypeScript';
  readonly runtimeLanguage: 'JavaScript';
  readonly executedBy: 'Node.js';
};

type User = {
  readonly id: string;
  readonly name: string;
  readonly role: 'admin' | 'member';
};

function formatUser(user: User): string {
  // User という型は、引数として渡すオブジェクトの形をコンパイル時に確認するために使う。
  // 実行時に残るのは user.name や user.role などの JavaScript の値であり、User という型名ではない。
  return `${user.name} (${user.role})`;
}

export function runLanguageAndRuntime(): void {
  console.log('このファイルでは、TypeScript と JavaScript の関係を確認する。');

  const sourceFile: SourceFile = {
    fileName: 'language-and-runtime.ts',
    sourceLanguage: 'TypeScript',
    runtimeLanguage: 'JavaScript',
    executedBy: 'Node.js',
  };

  // TypeScript は、JavaScript に型の表現を追加して開発時の安全性を高めるために使う。
  // ただし、TypeScript 独自の型情報がそのまま実行時の値として残るわけではない。
  // このリポジトリでは .ts ファイルを tsx で実行し、最終的な実行環境は Node.js として扱う。
  console.log('ソースファイル:', sourceFile.fileName);
  console.log('開発時に書く言語:', sourceFile.sourceLanguage);
  console.log('実行時に動く言語:', sourceFile.runtimeLanguage);
  console.log('実行環境:', sourceFile.executedBy);

  const user: User = {
    id: 'u001',
    name: 'Sato',
    role: 'admin',
  };

  const formattedUser = formatUser(user);

  // typeof は JavaScript の実行時演算子である。
  // TypeScript の User 型を確認しているのではなく、実行時の値が object であることを確認している。
  console.log('整形したユーザー:', formattedUser);
  console.log('typeof user:', typeof user);
  console.log('実行時に存在するプロパティ:', Object.keys(user));

  // TypeScript の型は、開発時・コンパイル時に間違いを検出するために使う。
  // 実行時のオブジェクトには id / name / role というプロパティが残るが、User という型名は残らない。
  assert.equal(sourceFile.sourceLanguage, 'TypeScript');
  assert.equal(sourceFile.runtimeLanguage, 'JavaScript');
  assert.equal(formattedUser, 'Sato (admin)');
  assert.equal(typeof user, 'object');
  assert.deepEqual(Object.keys(user), ['id', 'name', 'role']);
}
