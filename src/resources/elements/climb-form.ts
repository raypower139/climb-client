import { bindable } from 'aurelia-framework';
import { Climb } from '../../services/climb-types';

export class ClimbForm {
  climb_name: string;
  climb_description: string;
  climb_lat: number;
  climb_long: number;
  @bindable
  climbs: Climb[];

  addClimb() {
    const climb = {
      climb_name: this.climb_name,
      climb_description: this.climb_description,
      climb_lat: this.climb_lat,
      climb_long: this.climb_long,
    };
    this.climbs.push(climb);
    console.log(climb);
  }
}
