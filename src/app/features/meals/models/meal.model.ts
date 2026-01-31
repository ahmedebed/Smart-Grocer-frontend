export interface Meal {
  id: number;
  externalId: string;
  name: string;
  category: string;
  area: string;
  thumbnail: string;
  instructions: string;
  price: number;
  calories: number;
  approved: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
