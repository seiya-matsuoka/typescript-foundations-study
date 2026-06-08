import assert from 'node:assert/strict';

type StockBySku = {
  readonly [sku: string]: number | undefined;
};

type FixedMenuKey = 'home' | 'books' | 'settings';

type MenuLabels = Record<FixedMenuKey, string>;

function getStockLabel(stockBySku: StockBySku, sku: string): string {
  // index signature は、キー名が事前に固定できないオブジェクトを表すときに使う。
  // 商品 SKU、ユーザー ID、カテゴリ ID のように、実行時にキーが決まる辞書型で見ることがある。
  //
  // noUncheckedIndexedAccess が有効な環境では、stockBySku[sku] は number | undefined として扱われる。
  // 存在しないキーを読んだ場合は undefined になるため、分岐してから使う。
  const stock = stockBySku[sku];

  return stock === undefined ? '在庫情報なし' : `在庫: ${stock}`;
}

function getMenuLabel(labels: MenuLabels, key: FixedMenuKey): string {
  // Record<K, V> は、決まったキー集合 K に対して値 V を持つオブジェクトを表す。
  // MenuLabels は home / books / settings の3つのキーを必ず持つ。
  //
  // キーが固定されている場合は、広い index signature よりも Record の方が安全に扱いやすい。
  // React の画面ラベル、ステータスラベル、設定値のマップなどでもよく使う。
  return labels[key];
}

export function runIndexSignatureAndRecord(): void {
  console.log('このファイルでは、index signature と Record<K, V> の入口を確認する。');

  const stockBySku: StockBySku = {
    'book-ts': 10,
    'book-react': 0,
  };

  const menuLabels: MenuLabels = {
    home: 'ホーム',
    books: '書籍一覧',
    settings: '設定',
  };

  // stockBySku は任意の string キーで読めるが、存在しないキーでは undefined になる。
  // menuLabels は FixedMenuKey で定義したキーだけを扱うため、キーの候補を型で限定できる。
  const tsStockLabel = getStockLabel(stockBySku, 'book-ts');
  const missingStockLabel = getStockLabel(stockBySku, 'book-vue');
  const booksLabel = getMenuLabel(menuLabels, 'books');

  console.log('1. index signature');
  console.log('tsStockLabel:', tsStockLabel);
  console.log('missingStockLabel:', missingStockLabel);

  console.log('');
  console.log('2. Record<K, V>');
  console.log('booksLabel:', booksLabel);

  assert.equal(tsStockLabel, '在庫: 10');
  assert.equal(missingStockLabel, '在庫情報なし');
  assert.equal(booksLabel, '書籍一覧');
}
