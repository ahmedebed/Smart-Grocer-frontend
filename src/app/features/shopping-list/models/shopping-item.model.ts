export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
}

export interface MealInfo {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
}

export interface ShoppingItem {
  id: number;
  user: UserInfo;
  meal: MealInfo;
  quantity: number;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
export class ShoppingListModule {}
