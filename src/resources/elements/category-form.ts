import { bindable } from 'aurelia-framework';
import { Category } from '../../services/climb-types';
import { inject } from 'aurelia-framework';
import { ClimbService } from '../../services/climb-service';

@inject(ClimbService)
export class CategoryForm {
  category_name: string;
  category_location: string;
  _id: string;
  @bindable
  @bindable categories: Category[];

  constructor(private ds: ClimbService) {}

  addCategory() {
    this.ds.createCategory(this.category_name, this.category_location);

  //addCategory() {
  //  const category = {
  //    category_name: this.category_name,
  //    category_location: this.category_location,
  //    _id:''
  //  };
  //  // @ts-ignore
  //  this.categories.push(category);
  //  console.log(category);
  }
}
