import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Category, Climb } from '../../services/climb-types';
import {ClimbService} from "../../services/climb-service";

@inject(ClimbService)
export class ClimbForm {
  @bindable
  categories: Category[];

  selectedCategory : Category = null;
  private climb_name: string;
  private climb_description: string;
  private climb_lat: number;
  private climb_long: number;

  constructor (private ds: ClimbService) {}

  addClimb() {
    this.ds.addClimb(this.climb_name,this.climb_description, this.climb_lat, this.climb_long, this.selectedCategory);
  }
}
