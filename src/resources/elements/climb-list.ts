import { bindable } from 'aurelia-framework';
import {Climb} from "../../services/climb-types";

export class ClimbList {
  @bindable
  climbs : Climb[];
}
