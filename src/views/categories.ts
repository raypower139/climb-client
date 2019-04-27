import { inject } from 'aurelia-framework';
import { Category } from '../services/climb-types';
import { ClimbService } from '../services/climb-service';

@inject(ClimbService)
export class Categories {
  categories: Category[] = [];

  constructor(private ds: ClimbService) {
    this.categories = ds.categories;
  }
}
