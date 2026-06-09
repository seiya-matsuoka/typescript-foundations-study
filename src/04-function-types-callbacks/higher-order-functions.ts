import assert from 'node:assert/strict';

type TextNormalizer = (text: string) => string;
type TextFormatter = (text: string) => string;

function createPrefixFormatter(prefix: string): TextFormatter {
  // 関数を戻り値として返す関数は、高階関数の代表例である。
  // 戻り値の TextFormatter は、string を受け取り string を返す関数として扱える。
  // prefix は外側の関数の引数だが、返した関数の中からも参照できる。
  return (text) => `${prefix}: ${text}`;
}

function composeTextFormatter(normalize: TextNormalizer, format: TextFormatter): TextFormatter {
  // 関数を引数に取り、関数を返す形も高階関数である。
  // JavaScript でもよく使う compose 的な考え方を、TypeScript では関数型で読みやすくできる。
  // Unit 06 の generics では、この「関数の形を保つ」考え方をより汎用化する。
  return (text) => format(normalize(text));
}

export function runHigherOrderFunctions(): void {
  console.log('このファイルでは、higher-order function の型を確認する。');

  const trimText: TextNormalizer = (text) => text.trim();
  const upperText: TextNormalizer = (text) => text.toUpperCase();
  const prefixFormatter = createPrefixFormatter('RESULT');

  const trimAndPrefix = composeTextFormatter(trimText, prefixFormatter);
  const upperAndPrefix = composeTextFormatter(upperText, prefixFormatter);

  const trimmedResult = trimAndPrefix('  typescript  ');
  const upperResult = upperAndPrefix('typescript');

  console.log('1. 関数を戻り値として返す');
  console.log('prefixFormatter:', prefixFormatter('callback'));

  console.log('');
  console.log('2. 関数を引数に取り、関数を返す');
  console.log('trimmedResult:', trimmedResult);
  console.log('upperResult:', upperResult);

  assert.equal(prefixFormatter('callback'), 'RESULT: callback');
  assert.equal(trimmedResult, 'RESULT: typescript');
  assert.equal(upperResult, 'RESULT: TYPESCRIPT');
}
