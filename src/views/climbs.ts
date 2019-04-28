import { inject } from 'aurelia-framework';
import {Category, Climb} from "../services/climb-types";
import {ClimbService} from "../services/climb-service";

@inject(ClimbService)
export class Climbs {
  climbs: Climb[];
  categories: Category[];
  total = 0;

  constructor(private ds: ClimbService) {
    this.categories = ds.categories;
    this.climbs = ds.climbs;
    this.total = ds.total;
  }
}
