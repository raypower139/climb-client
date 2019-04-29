import { inject } from 'aurelia-framework';
import { ClimbService } from '../services/climb-service';

@inject(ClimbService)
export class Logout {
constructor(private ds: ClimbService) {}

attached() {
this.ds.logout();
}
}
