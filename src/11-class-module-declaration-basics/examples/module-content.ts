export type UserDto = {
  readonly id: string;
  readonly display_name: string;
};

export type UserViewModel = {
  readonly id: string;
  readonly displayName: string;
};

export const moduleName = 'module-content';

export function createUserLabel(user: UserDto): string {
  return `${user.id}:${user.display_name}`;
}

export function calculateTaxIncludedPrice(price: number, taxRate: number): number {
  return Math.round(price * (1 + taxRate));
}

export function toUserViewModel(dto: UserDto): UserViewModel {
  return {
    id: dto.id,
    displayName: dto.display_name,
  };
}
