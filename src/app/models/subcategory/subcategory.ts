import { CategoryI } from '../category/category';

export interface SubcategoryI {
  id: number;
  category: CategoryI;
  name: string;
}
