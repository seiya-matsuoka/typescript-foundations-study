import assert from 'node:assert/strict';

interface RepositoryItem {
  readonly id: string;
  readonly name: string;
  readonly updatedAt: Date;
}

interface RepositorySummary extends RepositoryItem {
  readonly visibility: 'public' | 'private';
  readonly starCount: number;
}

function formatRepositorySummary(repository: RepositorySummary): string {
  // interface は、オブジェクトが持つプロパティやメソッドの形を表す。
  // extends を使うと、既存の interface を土台にしてプロパティを追加できる。
  //
  // RepositorySummary は RepositoryItem の id / name / updatedAt を引き継ぎ、
  // visibility / starCount を追加している。
  // 一覧用データ、詳細用データ、共通レスポンスなどでこの考え方が出てくる。
  return `${repository.name} / ${repository.visibility} / ★${repository.starCount}`;
}

export function runInterfaceBasics(): void {
  console.log('このファイルでは、interface によるオブジェクト型を確認する。');

  const repository: RepositorySummary = {
    id: 'repo-001',
    name: 'typescript-foundations-study',
    updatedAt: new Date('2026-06-07T00:00:00.000Z'),
    visibility: 'public',
    starCount: 12,
  };

  // RepositorySummary 型の値は、RepositoryItem 由来のプロパティと、
  // RepositorySummary で追加したプロパティの両方を持つ必要がある。
  // Java の interface と似て見えるが、TypeScript では実装宣言がなくても構造が合えば扱える。
  const formatted = formatRepositorySummary(repository);

  console.log('1. interface で表したリポジトリ情報');
  console.log('repository:', {
    ...repository,
    updatedAt: repository.updatedAt.toISOString(),
  });

  console.log('');
  console.log('2. interface extends による共通項目の再利用');
  console.log('formatted:', formatted);

  assert.equal(repository.id, 'repo-001');
  assert.equal(repository.updatedAt.toISOString(), '2026-06-07T00:00:00.000Z');
  assert.equal(formatted, 'typescript-foundations-study / public / ★12');
}
