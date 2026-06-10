import assert from 'node:assert/strict';

type EmailContact = {
  readonly kind: 'email';
  readonly email: string;
  readonly displayName: string;
};

type PhoneContact = {
  readonly kind: 'phone';
  readonly phoneNumber: string;
  readonly displayName: string;
};

type Contact = EmailContact | PhoneContact;

function formatContactByIn(contact: Contact): string {
  // in による narrowing は、特定のプロパティが存在するかどうかで union の候補を絞る。
  // 'email' in contact の中では、contact は EmailContact として扱える。
  // プロパティの有無で型を分けられる場合に使えるが、判別用プロパティがあるなら kind / status で分ける方が読みやすいことも多い。
  if ('email' in contact) {
    return `${contact.displayName} <${contact.email}>`;
  }

  return `${contact.displayName} (${contact.phoneNumber})`;
}

function formatContactByKind(contact: Contact): string {
  // Contact には kind という共通の判別用プロパティもある。
  // kind を使った分岐は discriminated union の入口になる。
  // Unit 05 後半では、この考え方を status / type / kind で厚めに扱う。
  if (contact.kind === 'email') {
    return `email:${contact.email}`;
  }

  return `phone:${contact.phoneNumber}`;
}

export function runInNarrowing(): void {
  console.log('このファイルでは、in による narrowing を確認する。');

  const emailContact: Contact = {
    kind: 'email',
    email: 'sato@example.com',
    displayName: 'Sato',
  };

  const phoneContact: Contact = {
    kind: 'phone',
    phoneNumber: '090-0000-0000',
    displayName: 'Tanaka',
  };

  const formattedEmailByIn = formatContactByIn(emailContact);
  const formattedPhoneByIn = formatContactByIn(phoneContact);
  const formattedEmailByKind = formatContactByKind(emailContact);
  const formattedPhoneByKind = formatContactByKind(phoneContact);

  console.log('1. in による narrowing');
  console.log('formattedEmailByIn:', formattedEmailByIn);
  console.log('formattedPhoneByIn:', formattedPhoneByIn);

  console.log('');
  console.log('2. kind による分岐との比較');
  console.log('formattedEmailByKind:', formattedEmailByKind);
  console.log('formattedPhoneByKind:', formattedPhoneByKind);

  assert.equal(formattedEmailByIn, 'Sato <sato@example.com>');
  assert.equal(formattedPhoneByIn, 'Tanaka (090-0000-0000)');
  assert.equal(formattedEmailByKind, 'email:sato@example.com');
  assert.equal(formattedPhoneByKind, 'phone:090-0000-0000');
}
