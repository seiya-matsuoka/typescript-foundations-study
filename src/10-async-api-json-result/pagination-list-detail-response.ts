import assert from 'node:assert/strict';

type PaginationMeta = {
  readonly page: number;
  readonly pageSize: number;
  readonly totalCount: number;
};

type ListResponse<TItem> = {
  readonly items: readonly TItem[];
  readonly pagination: PaginationMeta;
};

type DetailResponse<TItem> = {
  readonly item: TItem;
};

type RepositoryDto = {
  readonly id: string;
  readonly name: string;
  readonly star_count: number;
};

type RepositoryCard = {
  readonly id: string;
  readonly title: string;
  readonly starLabel: string;
};

function toRepositoryCard(dto: RepositoryDto): RepositoryCard {
  return {
    id: dto.id,
    title: dto.name,
    starLabel: `${dto.star_count} stars`,
  };
}

function createRepositoryListResponse(): ListResponse<RepositoryDto> {
  return {
    items: [{ id: 'repo-001', name: 'typescript-foundations-study', star_count: 12 }],
    pagination: { page: 1, pageSize: 20, totalCount: 1 },
  };
}

function createRepositoryDetailResponse(): DetailResponse<RepositoryDto> {
  return { item: { id: 'repo-001', name: 'typescript-foundations-study', star_count: 12 } };
}

export function runPaginationListDetailResponse(): void {
  console.log('このファイルでは、pagination / list / detail response を確認する。');

  const listResponse = createRepositoryListResponse();
  const detailResponse = createRepositoryDetailResponse();

  // list response は items の配列と pagination を持つ。
  // detail response は単一の item を持つ。
  // どちらも API DTO をそのまま画面へ渡すのではなく、表示用の型へ変換することが多い。
  // Unit 09 の DTO → view model 変換を、API response の形と組み合わせている。
  const cards = listResponse.items.map((repository) => toRepositoryCard(repository));
  const detailCard = toRepositoryCard(detailResponse.item);

  console.log('1. list response から表示用カード配列へ変換する');
  console.log('cards:', cards);

  console.log('');
  console.log('2. detail response から表示用カードへ変換する');
  console.log('detailCard:', detailCard);

  assert.deepEqual(cards, [
    { id: 'repo-001', title: 'typescript-foundations-study', starLabel: '12 stars' },
  ]);
  assert.deepEqual(detailCard, {
    id: 'repo-001',
    title: 'typescript-foundations-study',
    starLabel: '12 stars',
  });
}
