import assert from 'node:assert/strict';

type User = {
  readonly id: string;
  readonly name: string;
};

type Project = {
  readonly id: string;
  readonly title: string;
};

async function fetchUser(): Promise<User> {
  return {
    id: 'user-001',
    name: 'Sato',
  };
}

async function fetchProjects(): Promise<readonly Project[]> {
  return [
    { id: 'project-001', title: 'Portfolio' },
    { id: 'project-002', title: 'Reading Log' },
  ];
}

type UserPromiseResult = Awaited<ReturnType<typeof fetchUser>>;
type ProjectsPromiseResult = Awaited<ReturnType<typeof fetchProjects>>;

export async function runAwaitedPromiseAll(): Promise<void> {
  console.log('このファイルでは、Awaited<T> と Promise.all を確認する。');

  const userResult: UserPromiseResult = await fetchUser();
  const projectsResult: ProjectsPromiseResult = await fetchProjects();

  // Promise.all は、複数の Promise を並列に待ち、すべて成功したときに配列として結果を返す。
  // TypeScript は [Promise<User>, Promise<readonly Project[]>] から、
  // await 後の型を [User, readonly Project[]] として推論できる。
  // API を複数同時に取得して、画面に必要なデータをまとめて作る場面でよく使う。
  const [user, projects] = await Promise.all([fetchUser(), fetchProjects()]);

  const projectTitles = projects.map((project) => project.title);

  console.log('1. Awaited<ReturnType<typeof 関数>> で await 後の型を取り出す');
  console.log('userResult:', userResult);
  console.log('projectsResult:', projectsResult);

  console.log('');
  console.log('2. Promise.all の結果を分割代入する');
  console.log('user:', user);
  console.log('projectTitles:', projectTitles);

  assert.deepEqual(userResult, { id: 'user-001', name: 'Sato' });
  assert.deepEqual(projectsResult, [
    { id: 'project-001', title: 'Portfolio' },
    { id: 'project-002', title: 'Reading Log' },
  ]);
  assert.deepEqual(user, { id: 'user-001', name: 'Sato' });
  assert.deepEqual(projectTitles, ['Portfolio', 'Reading Log']);
}
