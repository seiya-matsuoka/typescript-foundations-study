import assert from 'node:assert/strict';

class Account {
  constructor(
    public readonly id: string,
    public displayName: string,
    private passwordHash: string,
    protected loginCount = 0,
  ) {
    // constructor は、new Account(...) で instance を作るときに呼ばれる。
    // TypeScript では constructor 引数にも型注釈を書ける。
    //
    // public / private / protected / readonly を constructor 引数へ直接付ける書き方は、
    // parameter properties と呼ばれる。member 宣言と this への代入をまとめて書ける。
    // Java の field 宣言と constructor 代入に近い処理を短く書けるが、
    // 引数が多くなる場合は object parameter へ分けた方が読みやすいこともある。
  }

  public rename(nextDisplayName: string): void {
    // public member は class の外側からも利用できる。
    // TypeScript では何も指定しない member も public だが、ここでは学習用に明示している。
    this.displayName = nextDisplayName;
  }

  public changePasswordHash(nextPasswordHash: string): void {
    // private member は、同じ class の中からだけ直接アクセスできる。
    // 外側から passwordHash を読むのではなく、必要な操作を public method として公開する。
    this.passwordHash = nextPasswordHash;
  }

  public verifyPasswordHash(passwordHash: string): boolean {
    return this.passwordHash === passwordHash;
  }

  protected incrementLoginCount(): void {
    // protected member は、同じ class と subclass の中からアクセスできる。
    // class の外側から直接呼び出すことはできない。
    this.loginCount += 1;
  }

  public getLoginCount(): number {
    return this.loginCount;
  }
}

class MemberAccount extends Account {
  public login(): number {
    this.incrementLoginCount();

    return this.loginCount;
  }
}

function createAccountLabel(account: Account): string {
  // class 名は、new Account(...) に使う値であると同時に、instance の型としても使える。
  // account: Account は Account instance が持つ public な構造を要求する。
  return `${account.id}:${account.displayName}`;
}

export function runClassBasicsAccess(): void {
  console.log(
    'このファイルでは、class・constructor・access modifier・parameter properties を確認する。',
  );

  const account = new MemberAccount('account-001', 'Sato', 'hash-001');
  const beforeLabel = createAccountLabel(account);
  const beforeLoginCount = account.getLoginCount();

  account.rename('Sato Taro');
  account.changePasswordHash('hash-002');
  const afterLoginCount = account.login();
  const afterLabel = createAccountLabel(account);
  const passwordVerified = account.verifyPasswordHash('hash-002');

  console.log('1. constructor と parameter properties で instance を作る');
  console.log('beforeLabel:', beforeLabel);
  console.log('afterLabel:', afterLabel);

  console.log('');
  console.log('2. public / private / protected / readonly を使い分ける');
  console.log('beforeLoginCount:', beforeLoginCount);
  console.log('afterLoginCount:', afterLoginCount);
  console.log('passwordVerified:', passwordVerified);

  assert.equal(account.id, 'account-001');
  assert.equal(beforeLabel, 'account-001:Sato');
  assert.equal(afterLabel, 'account-001:Sato Taro');
  assert.equal(beforeLoginCount, 0);
  assert.equal(afterLoginCount, 1);
  assert.equal(passwordVerified, true);
}
