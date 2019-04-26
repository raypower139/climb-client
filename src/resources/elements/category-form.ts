import { bindable } from 'aurelia-framework';
import { Category } from '../../services/climb-types';

export class CategoryForm {
  Name: string;
  Location: string;
  @bindable
  categories: Category[];

  addCategory() {
    const category = {
      Name: this.Name,
      Location: this.Location,
    };
    this.categories.push(category);
    console.log(category);
  }
}
