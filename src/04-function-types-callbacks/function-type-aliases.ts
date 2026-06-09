import assert from 'node:assert/strict';

type User = {
  readonly id: string;
  readonly name: string;
  readonly score: number;
};

type ScoreFormatter = (score: number) => string;
type UserFormatter = (user: User) => string;

function createUserSummary(
  user: User,
  formatScore: ScoreFormatter,
  formatUser: UserFormatter,
): string {
  // 関数型を type alias にすると、同じ関数の形に名前を付けられる。
  // ScoreFormatter や UserFormatter は、単なる関数型ではなく「何のための関数か」を伝える名前になる。
  // 実務では callback の引数が増えたとき、関数型の alias があると読みやすくなる。
  return `${formatUser(user)} / ${formatScore(user.score)}`;
}

export function runFunctionTypeAliases(): void {
  console.log('このファイルでは、関数型の type alias を確認する。');

  const user: User = {
    id: 'user-001',
    name: 'Sato',
    score: 87,
  };

  const formatScore: ScoreFormatter = (score) => `${score}点`;
  const formatUser: UserFormatter = (targetUser) => `${targetUser.name} (${targetUser.id})`;
  const summary = createUserSummary(user, formatScore, formatUser);

  console.log('1. 関数型に名前を付ける');
  console.log('summary:', summary);

  assert.equal(summary, 'Sato (user-001) / 87点');
}
