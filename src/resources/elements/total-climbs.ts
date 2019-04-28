import { inject } from 'aurelia-framework';
import { ClimbService } from '../../services/climb-service';
import { bindable } from 'aurelia-framework';

@inject(ClimbService)
export class TotalClimbs {
  @bindable
  total = 0;

  constructor(private ds: ClimbService) {}
}
