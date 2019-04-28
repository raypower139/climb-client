import { inject } from 'aurelia-framework';
import { ClimbService } from '../../services/climb-service';
import { bindable } from 'aurelia-framework';
import { TotalUpdate } from '../../services/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(ClimbService, EventAggregator)
export class TotalClimbs {
  total = 0;

  constructor(private ds: ClimbService, private ea: EventAggregator ) {
    this.total = ds.total;
    ea.subscribe(TotalUpdate, msg => {
      this.total = msg.total;

    });
  }
}
