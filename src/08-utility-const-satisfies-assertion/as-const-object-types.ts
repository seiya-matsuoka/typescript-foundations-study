import assert from 'node:assert/strict';

const statusConfig = {
  draft: {
    label: '下書き',
    tone: 'muted',
  },
  published: {
    label: '公開済み',
    tone: 'success',
  },
  archived: {
    label: 'アーカイブ',
    tone: 'warning',
  },
} as const;

type Status = keyof typeof statusConfig;
type StatusLabel = (typeof statusConfig)[Status]['label'];
type StatusTone = (typeof statusConfig)[Status]['tone'];

function formatStatus(status: Status): `${StatusLabel} (${StatusTone})` {
  // keyof typeof statusConfig で、オブジェクトのキーから Status union を作っている。
  // indexed access type を重ねると、各 status の label や tone の union も作れる。
  const config = statusConfig[status];

  return `${config.label} (${config.tone})`;
}

export function runAsConstObjectTypes(): void {
  console.log('このファイルでは、as const と定数オブジェクトから型を作る流れを確認する。');

  const publishedLabel = statusConfig.published.label;
  const formattedStatus = formatStatus('published');

  console.log('1. 定数オブジェクトから Status / StatusLabel / StatusTone を作る');
  console.log('statusConfig:', statusConfig);

  console.log('');
  console.log('2. status に対応する表示文言を作る');
  console.log('publishedLabel:', publishedLabel);
  console.log('formattedStatus:', formattedStatus);

  assert.equal(publishedLabel, '公開済み');
  assert.equal(formattedStatus, '公開済み (success)');
}
