import { runAnyBasics } from './any-basics.ts';
import { runArrayAndTupleTypes } from './array-and-tuple-types.ts';
import { runBasicPrimitiveTypes } from './basic-primitive-types.ts';
import { runLiteralTypes } from './literal-types.ts';
import { runNeverAndVoid } from './never-and-void.ts';
import { runNullAndUndefined } from './null-and-undefined.ts';
import { runObjectTypeBasics } from './object-type-basics.ts';
import { runRuntimeTypeof } from './runtime-typeof.ts';
import { runStrictOptionBasics } from './strict-option-basics.ts';
import { runTypeAnnotations } from './type-annotations.ts';
import { runTypeInferenceLetConst } from './type-inference-let-const.ts';
import { runUnionTypeBasics } from './union-type-basics.ts';
import { runUnknownBasics } from './unknown-basics.ts';

const unitTitle = 'Unit 02. 基本型・型注釈・型推論・null / undefined';

type UnitSection = {
  readonly number: number;
  readonly title: string;
  readonly run: () => void;
};

const sections: readonly UnitSection[] = [
  { number: 1, title: '基本のプリミティブ型', run: runBasicPrimitiveTypes },
  { number: 2, title: '型注釈を書く場面', run: runTypeAnnotations },
  { number: 3, title: '型推論・let / const・literal widening', run: runTypeInferenceLetConst },
  { number: 4, title: '配列・Array<T>・tuple・readonly tuple', run: runArrayAndTupleTypes },
  { number: 5, title: 'object 型と具体的なオブジェクト型', run: runObjectTypeBasics },
  { number: 6, title: 'literal type の入口', run: runLiteralTypes },
  { number: 7, title: 'union type の入口', run: runUnionTypeBasics },
  { number: 8, title: 'null / undefined・nullable・optional', run: runNullAndUndefined },
  { number: 9, title: 'strict 系設定の入口', run: runStrictOptionBasics },
  { number: 10, title: 'any の危険性', run: runAnyBasics },
  { number: 11, title: 'unknown の安全な扱い', run: runUnknownBasics },
  { number: 12, title: 'never / void', run: runNeverAndVoid },
  { number: 13, title: '実行時の typeof と TypeScript の型', run: runRuntimeTypeof },
];

function printUnitHeader(): void {
  console.log('='.repeat(80));
  console.log(unitTitle);
  console.log('='.repeat(80));
}

function printSectionHeader(section: UnitSection): void {
  const sectionNumber = String(section.number).padStart(2, '0');

  console.log('');
  console.log('-'.repeat(80));
  console.log(`${sectionNumber}. ${section.title}`);
  console.log('-'.repeat(80));
}

function printUnitFooter(): void {
  console.log('');
  console.log('='.repeat(80));
  console.log('Unit 02 のサンプル実行が完了');
  console.log('='.repeat(80));
}

printUnitHeader();

for (const section of sections) {
  printSectionHeader(section);
  section.run();
}

printUnitFooter();
