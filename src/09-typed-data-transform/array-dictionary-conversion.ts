import assert from 'node:assert/strict';

type Product = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

type ProductOption = {
  readonly value: string;
  readonly label: string;
};

function toDictionaryById<TItem extends { readonly id: string }>(
  items: readonly TItem[],
): Record<string, TItem> {
  // Unit 06 の generics と constraints を、配列から辞書への変換に使っている。
  // TItem extends { id: string } により、item.id を辞書キーとして安全に使える。
  // Product[] を渡せば Record<string, Product>、User[] を渡せば Record<string, User> になる。
  return items.reduce<Record<string, TItem>>((dictionary, item) => {
    return {
      ...dictionary,
      [item.id]: item,
    };
  }, {});
}

function toOptions(products: readonly Product[]): readonly ProductOption[] {
  // 辞書から配列へ戻すときや、選択肢の配列を作るときは map がよく使われる。
  // React の select options や checkbox options では、value / label の形に変換することが多い。
  return products.map((product) => ({
    value: product.id,
    label: `${product.name} (${product.price.toLocaleString()}円)`,
  }));
}

export function runArrayDictionaryConversion(): void {
  console.log('このファイルでは、配列から辞書へ・辞書から配列への変換を確認する。');

  const products: readonly Product[] = [
    {
      id: 'product-001',
      name: 'Keyboard',
      price: 12000,
    },
    {
      id: 'product-002',
      name: 'Mouse',
      price: 6000,
    },
  ];

  const dictionary = toDictionaryById(products);
  const valuesFromDictionary = Object.values(dictionary);
  const options = toOptions(valuesFromDictionary);

  console.log('1. Product[] から Record<string, Product> を作る');
  console.log('dictionary:', dictionary);

  console.log('');
  console.log('2. 辞書から配列へ戻し、表示用 options に変換する');
  console.log('options:', options);

  assert.deepEqual(dictionary, {
    'product-001': {
      id: 'product-001',
      name: 'Keyboard',
      price: 12000,
    },
    'product-002': {
      id: 'product-002',
      name: 'Mouse',
      price: 6000,
    },
  });
  assert.deepEqual(options, [
    {
      value: 'product-001',
      label: 'Keyboard (12,000円)',
    },
    {
      value: 'product-002',
      label: 'Mouse (6,000円)',
    },
  ]);
}
