import { CreateEntityI } from '../create-entity';
import { SubcategoryUpdateI } from './subcategory-update';

export interface SubcategoryCreateI extends CreateEntityI<SubcategoryUpdateI> {}
