import assert from 'node:assert/strict';

const fieldNames = ['title', 'description', 'status'] as const;

type FieldName = (typeof fieldNames)[number];
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

type FieldConfig = {
  readonly label: string;
  readonly required: boolean;
};

const fieldConfig = {
  title: {
    label: 'タイトル',
    required: true,
  },
  description: {
    label: '説明',
    required: false,
  },
  status: {
    label: 'ステータス',
    required: true,
  },
} as const satisfies Record<FieldName, FieldConfig>;

type FieldLabel = (typeof fieldConfig)[FieldName]['label'];

type ApiTaskDto = {
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly status: 'todo' | 'done';
  readonly created_at: string;
};

type TaskFormInitialValues = Pick<ApiTaskDto, 'title' | 'status'> & {
  readonly description: string;
};

function createInitialValues(dto: ApiTaskDto): TaskFormInitialValues {
  // Pick<T, K> で API DTO からフォームに必要な項目を取り出し、
  // null の可能性がある description はフォーム用に string へ変換している。
  // DTO、form values、React props を分ける考え方は Unit 03 から継続している。
  return {
    title: dto.title,
    description: dto.description ?? '',
    status: dto.status,
  };
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const fieldName of fieldNames) {
    const config = fieldConfig[fieldName];

    if (config.required && values[fieldName].trim() === '') {
      errors[fieldName] = `${config.label}を入力してください`;
    }
  }

  // FormErrors は Partial<Record<FieldName, string>> なので、エラーがある項目だけを持てる。
  // React の form state では、全項目の値を持つ FormValues と、エラーがある項目だけを持つ FormErrors を分けることが多い。
  return errors;
}

function createFieldLabels(): readonly FieldLabel[] {
  return fieldNames.map((fieldName) => fieldConfig[fieldName].label);
}

export function runPracticalReactConfigForm(): void {
  console.log(
    'このファイルでは、React props / config / form / API DTO につながる使い方を確認する。',
  );

  const dto: ApiTaskDto = {
    id: 'task-001',
    title: 'TypeScript を学習する',
    description: null,
    status: 'todo',
    created_at: '2026-06-25T00:00:00.000Z',
  };

  const initialValues = createInitialValues(dto);

  const formValues: FormValues = {
    title: '',
    description: initialValues.description,
    status: initialValues.status,
  };

  const errors = validateForm(formValues);
  const labels = createFieldLabels();

  console.log('1. API DTO から form initial values を作る');
  console.log('initialValues:', initialValues);

  console.log('');
  console.log('2. as const / satisfies / Record / Partial を form state に接続する');
  console.log('errors:', errors);
  console.log('labels:', labels);

  assert.deepEqual(initialValues, {
    title: 'TypeScript を学習する',
    description: '',
    status: 'todo',
  });
  assert.deepEqual(errors, {
    title: 'タイトルを入力してください',
  });
  assert.deepEqual(labels, ['タイトル', '説明', 'ステータス']);
}
