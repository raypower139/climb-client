import { bindable } from 'aurelia-framework';
import { Category } from '../../services/climb-types';

export class CategoryList {
  @bindable
  categories: Category[];
}
