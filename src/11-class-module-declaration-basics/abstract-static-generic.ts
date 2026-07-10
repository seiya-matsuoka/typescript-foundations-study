import assert from 'node:assert/strict';

abstract class NotificationSender {
  static createdCount = 0;

  constructor(protected readonly serviceName: string) {
    // static member は instance ではなく class 自体に属する。
    // new NotificationSender(...) の回数ではなく、subclass の constructor から共通の値を更新する例として使う。
    NotificationSender.createdCount += 1;
  }

  abstract send(message: string): string;

  describe(): string {
    // abstract class は、共通実装を持ちながら、一部の処理を subclass に任せたいときに使う。
    // interface と違い、describe のような実装を共有できる。
    return `sender:${this.serviceName}`;
  }
}

class EmailNotificationSender extends NotificationSender {
  override send(message: string): string {
    // noImplicitOverride が有効なため、基底 class の method を上書きするときは override を付ける。
    // 基底 class 側で method 名が変更された場合に、意図しない別 method になっていないか確認しやすくなる。
    return `email:${message}`;
  }
}

type Identifiable = {
  readonly id: string;
};

class EntityCollection<TEntity extends Identifiable> {
  static from<TEntity extends Identifiable>(
    entities: readonly TEntity[],
  ): EntityCollection<TEntity> {
    // static method は class instance の型引数を直接使えないため、method 側にも型引数を定義している。
    // EntityCollection.from<User>(...) の呼び出しでは、TEntity が User として決まる。
    return new EntityCollection(entities);
  }

  constructor(private readonly entities: readonly TEntity[]) {}

  findById(id: string): TEntity | undefined {
    // TEntity extends Identifiable により、generic class の中で entity.id を安全に読める。
    // find の結果は存在しない可能性があるため、戻り値には undefined が含まれる。
    return this.entities.find((entity) => entity.id === id);
  }
}

type User = Identifiable & {
  readonly name: string;
};

export function runAbstractStaticGeneric(): void {
  console.log('このファイルでは、abstract class・static member・class generic を確認する。');

  const sender = new EmailNotificationSender('email');
  const senderDescription = sender.describe();
  const sentMessage = sender.send('レビュー依頼があります');

  const users = EntityCollection.from<User>([
    { id: 'user-001', name: 'Sato' },
    { id: 'user-002', name: 'Tanaka' },
  ]);
  const foundUser = users.findById('user-002');

  console.log('1. abstract class の共通実装と subclass の実装を使う');
  console.log('senderDescription:', senderDescription);
  console.log('sentMessage:', sentMessage);
  console.log('createdCount:', NotificationSender.createdCount);

  console.log('');
  console.log('2. generic class で entity の型を保つ');
  console.log('foundUser:', foundUser);

  assert.equal(senderDescription, 'sender:email');
  assert.equal(sentMessage, 'email:レビュー依頼があります');
  assert.equal(NotificationSender.createdCount, 1);
  assert.deepEqual(foundUser, { id: 'user-002', name: 'Tanaka' });
}
